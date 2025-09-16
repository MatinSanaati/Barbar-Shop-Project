import React, { useState, useEffect } from 'react';
import CalendarModal from '../../../Calendar-Modal/Calendar-Modal';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MyTurns.css';

const MyTurns = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [bookedDates, setBookedDates] = useState([]);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/appointments/me", { credentials: 'include' });
            if (!res.ok) throw new Error('خطا در دریافت نوبت‌ها');
            const data = await res.json();
            // ✅ فقط نوبت‌های غیر لغو شده
            const activeAppointments = (data.appointments || []).filter(a => a.status !== 'canceled');
            setAppointments(activeAppointments);
            setBookedDates(activeAppointments.map(a => a.date));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAppointments(); }, []);

    // لغو نوبت با PATCH
    const cancelAppointment = async (id) => {
        if (!window.confirm('آیا مطمئن هستید می‌خواهید لغو کنید؟')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/appointments/${id}/cancel`, {
                method: 'PATCH',
                credentials: 'include'
            });

            const data = await res.json();
            console.log('Server response:', data); // لاگ پاسخ سرور

            if (!res.ok) throw new Error(data.error || 'خطا در لغو نوبت');

            await fetchAppointments();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <>
            <Header />

            <div className="myturns-page" dir="rtl">
                <div className="myturns-container">
                    <h2 className="page-title">نوبت‌های من</h2>

                    {/* پیام‌ها */}
                    {loading ? (
                        <div className="loading">در حال بارگذاری...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : appointments.length === 0 ? (
                        <div className="no-appointments animated-message">شما هنوز نوبتی نگرفته‌اید.</div>
                    ) : null}

                    {/* شبکه کارت‌های نوبت */}
                    {appointments.length > 0 && (
                        <div className="appointments-grid">
                            {appointments.map(a => (
                                <div key={a.id} className={`appointment-card ${a.status}`}>
                                    <h3 className="service">{a.service}</h3>
                                    <p><strong>تاریخ:</strong> {a.date}</p>
                                    <p><strong>ساعت:</strong> {a.time}</p>
                                    <p>
                                        <strong>وضعیت:</strong>{" "}
                                        <span className={`status ${a.status}`}>{a.status}</span>
                                    </p>
                                    {a.status === 'pending' && (
                                        <button
                                            className="cancel-btn"
                                            onClick={() => cancelAppointment(a.id)}
                                        >
                                            لغو
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* مودال تقویم */}
                    {showCalendar && (
                        <CalendarModal
                            bookedDates={bookedDates}
                            onClose={() => setShowCalendar(false)}
                            onSelectDate={(d) => alert('تاریخ انتخاب شد: ' + d)}
                        />
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default MyTurns;