import { useEffect, useState } from 'react';
import './Calendar-Modal.css';

const CalendarModal = ({ onSelectDate, onClose }) => {
    const [currentMonth, setCurrentMonth] = useState(1);
    const [currentYear, setCurrentYear] = useState(1403);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    const months = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];

    const daysInMonth = (month, year) => {
        if (month <= 6) return 31;
        if (month <= 11) return 30;
        return (year % 4 === 3) ? 30 : 29;
    };

    const getDays = () => {
        const totalDays = daysInMonth(currentMonth, currentYear);
        const daysArray = [];
        for (let i = 1; i <= totalDays; i++) {
            const dayOfWeek = (i + 5) % 7;
            daysArray.push({
                number: i,
                isWeekend: dayOfWeek === 6 || dayOfWeek === 0
            });
        }
        return daysArray;
    };

    const days = getDays();

    // قفل اسکرول
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 400); // باید با duration انیمیشن یکی باشه
    };

    const handleSelect = () => {
        if (!selectedDay) return;
        const dateStr = `${currentYear}/${String(currentMonth).padStart(2, '0')}/${String(selectedDay).padStart(2, '0')}`;
        onSelectDate(dateStr);
        handleClose();
    };

    const goToPrevMonth = () => {
        if (currentMonth > 1) setCurrentMonth(m => m - 1);
        else {
            setCurrentMonth(12);
            setCurrentYear(y => y - 1);
        }
    };

    const goToNextMonth = () => {
        if (currentMonth < 12) setCurrentMonth(m => m + 1);
        else {
            setCurrentMonth(1);
            setCurrentYear(y => y + 1);
        }
    };

    const goToPrevYear = () => setCurrentYear(y => y - 1);
    const goToNextYear = () => setCurrentYear(y => y + 1);

    return (
        <div
            className={`calendar-modal-overlay ${isVisible ? 'show' : 'hide'}`}
            onClick={handleClose}
        >
            <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
                <header className="calendar-header">
                    <h3>{months[currentMonth - 1]}</h3>
                    <p>روزهای ماه {months[currentMonth - 1]} سال {currentYear}</p>
                    <div className="calendar-navigation">
                        <button className="calendar-nav-btn" onClick={goToPrevMonth}>‹</button>
                        <button className="calendar-nav-btn" onClick={goToNextMonth}>›</button>
                    </div>
                </header>

                <div className="year-selector">
                    <button className="year-btn" onClick={goToPrevYear}>‹</button>
                    <span style={{ color: '#d4af37', fontSize: '1.2rem' }}>{currentYear}</span>
                    <button className="year-btn" onClick={goToNextYear}>›</button>
                </div>

                <div className="calendar-body">
                    {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
                        <div key={weekIndex} className="week-container">
                            <div className="week-days">
                                {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map(day => (
                                    <div key={day} className="day-header">{day}</div>
                                ))}
                                {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map(({ number, isWeekend }) => (
                                    <div
                                        key={number}
                                        className={`calendar-day ${isWeekend ? 'weekend' : ''} ${selectedDay === number ? 'selected' : ''}`}
                                        onClick={() => setSelectedDay(number)}
                                    >
                                        {number}
                                    </div>
                                ))}
                                {Array.from({ length: 7 - (days.slice(weekIndex * 7, (weekIndex + 1) * 7).length % 7 || 7) }).map((_, i) => (
                                    <div key={`empty-${i}`} className="calendar-day disabled"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="calendar-footer">
                    <button className="calendar-btn btn-cancel" onClick={handleClose}>لغو</button>
                    <button
                        className="calendar-btn btn-select"
                        onClick={handleSelect}
                        disabled={!selectedDay}
                        style={{ opacity: selectedDay ? 1 : 0.5 }}
                    >
                        انتخاب تاریخ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarModal;