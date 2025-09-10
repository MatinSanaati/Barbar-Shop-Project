// src/components/Admin/ui/StatCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './StatCard.css';

const StatCard = ({ icon, title, value, link, linkText }) => {
    return (
        <div className="stat-card">
            <i className={`${icon} stat-icon`}></i>
            <h3>{title}</h3>
            <p>{value}</p>
            <Link to={link} className="btn btn-primary">{linkText}</Link>
        </div>
    );
};

export default StatCard;