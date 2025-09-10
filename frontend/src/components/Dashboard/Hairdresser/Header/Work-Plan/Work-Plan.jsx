// src/components/Dashboard/Hairdresser/Pages/WorkPlan/WorkPlan.jsx
import React, { useState } from 'react';
import './Work-Plan.css';

const HairdresserWorkPlanPage = () => {
    const [workDays, setWorkDays] = useState({
        Saturday: { active: true, from: '09:00', to: '18:00', status: 'full' },
        Sunday: { active: true, from: '09:00', to: '18:00', status: 'full' },
        Monday: { active: true, from: '09:00', to: '18:00', status: 'full' },
        Tuesday: { active: true, from: '09:00', to: '18:00', status: 'full' },
        Wednesday: { active: true, from: '09:00', to: '18:00', status: 'full' },
        Thursday: { active: true, from: '09:00', to: '14:00', status: 'half' },
        Friday: { active: false, from: '', to: '', status: 'off' }
    });

    const handleToggleDay = (day) => {
        setWorkDays(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                active: !prev[day].active,
                status: !prev[day].active ? 'full' : 'off',
                from: !prev[day].active ? '09:00' : '',
                to: !prev[day].active ? '18:00' : ''
            }
        }));
    };

    const handleStatusChange = (day, status) => {
        let from = '', to = '';
        if (status === 'full') {
            from = '09:00';
            to = '18:00';
        } else if (status === 'half') {
            from = '09:00';
            to = '14:00';
        }

        setWorkDays(prev => ({
            ...prev,
            [day]: { ...prev[day], status, from, to }
        }));
    };

    const handleTimeChange = (day, field, value) => {
        setWorkDays(prev => ({
            ...prev,
            [day]: { ...prev[day], [field]: value }
        }));
    };

    const days = [
        { key: 'Saturday', name: 'شنبه' },
        { key: 'Sunday', name: 'یکشنبه' },
        { key: 'Monday', name: 'دوشنبه' },
        { key: 'Tuesday', name: 'سه‌شنبه' },
        { key: 'Wednesday', name: 'چهارشنبه' },
        { key: 'Thursday', name: 'پنجشنبه' },
        { key: 'Friday', name: 'جمعه' }
    ];

    return (
        <main className="hairdresser-work-plan-page">
            <div className="work-plan-header">
                <h1>برنامه کاری</h1>
                <p>مدیریت ساعت‌ها و تعطیلات هفتگی شما</p>
            </div>

            {/* لیست روزها */}
            <div className="work-plan-grid">
                {days.map(({ key, name }) => {
                    const day = workDays[key];
                    return (
                        <div key={key} className={`work-day-card ${day.active ? 'active' : 'off'}`}>
                            {/* هدر روز */}
                            <div className="day-header">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={day.active}
                                        onChange={() => handleToggleDay(key)}
                                    />
                                    <span className="slider"></span>
                                </label>
                                <h3>{name}</h3>
                                <div className={`status-badge ${day.status}`}>
                                    {day.status === 'full' && '🟢 فعال'}
                                    {day.status === 'half' && '🟡 نیمه‌کار'}
                                    {day.status === 'off' && '🔴 تعطیل'}
                                </div>
                            </div>

                            {/* تنظیمات وقتی روز فعاله */}
                            {day.active && (
                                <div className="day-settings">
                                    <div className="status-selector">
                                        <label>
                                            <input
                                                type="radio"
                                                checked={day.status === 'full'}
                                                onChange={() => handleStatusChange(key, 'full')}
                                            />
                                            کار تمام‌وقت
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                checked={day.status === 'half'}
                                                onChange={() => handleStatusChange(key, 'half')}
                                            />
                                            نیمه‌کار (صبح)
                                        </label>
                                    </div>

                                    <div className="time-inputs">
                                        <div>
                                            <label>از ساعت</label>
                                            <input
                                                type="time"
                                                value={day.from}
                                                onChange={(e) => handleTimeChange(key, 'from', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label>تا ساعت</label>
                                            <input
                                                type="time"
                                                value={day.to}
                                                onChange={(e) => handleTimeChange(key, 'to', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* نکته مهم */}
            <div className="work-plan-note">
                <i className="fas fa-info-circle"></i>
                تغییرات به صورت خودکار ذخیره میشن. مشتریان فقط زمان‌های فعال می‌تونن نوبت بگیرن.
            </div>
        </main>
    );
};

export default HairdresserWorkPlanPage;