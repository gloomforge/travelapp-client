import './JournalCard.css';
import React from 'react';
import { IconType } from 'react-icons';
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import TripResponse from '../../../../models/output/TripResponse';

interface JournalCardProps {
    trip: TripResponse;
    onClick?: () => void;
}

const renderIcon = (Icon: IconType, props: { className?: string; size?: number }) => {
    return React.createElement('span', { className: props.className }, 
        React.createElement(Icon as any, { size: props.size })
    );
};

const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.getFullYear() === end.getFullYear()) {
        if (start.getMonth() === end.getMonth()) {
            return `${start.getDate()} - ${end.getDate()} ${start.toLocaleString('default', { month: 'long' })} ${start.getFullYear()}`;
        }
        return `${start.toLocaleString('default', { month: 'short' })} ${start.getDate()} - ${end.toLocaleString('default', { month: 'short' })} ${end.getDate()}, ${start.getFullYear()}`;
    }
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
};

const JournalCard: React.FC<JournalCardProps> = ({ trip, onClick }) => {
    return (
        <div className="journal-card" onClick={onClick}>
            <div className="journal-card-content">
                <h2>{trip.title}</h2>
                <div className="journal-meta">
                    <div className="meta-item">
                        {renderIcon(FaCalendarAlt, { className: "meta-icon", size: 16 })}
                        <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                    </div>
                    {trip.routes && trip.routes.length > 0 && (
                        <div className="meta-item locations">
                            {renderIcon(FaMapMarkerAlt, { className: "meta-icon", size: 16 })}
                            <span>
                                {trip.routes.map((route) => route.city).join(' • ')}
                            </span>
                        </div>
                    )}
                </div>
                <p className="trip-description">{trip.description}</p>
                <div className="card-footer">
                    <span className="route-count">
                        {trip.routes?.length || 0} {trip.routes?.length === 1 ? 'destination' : 'destinations'}
                    </span>
                    {renderIcon(FaChevronRight, { className: "chevron-icon", size: 14 })}
                </div>
            </div>
        </div>
    );
};

export default JournalCard;