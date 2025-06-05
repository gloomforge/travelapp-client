import './JournalCard.css';
import React from 'react';
import { IconType } from 'react-icons';
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import TripResponse from '../../../../models/output/TripResponse';
import { formatDateRange } from '../../../../utils/dateUtils';

interface JournalCardProps {
    trip: TripResponse;
    onClick?: () => void;
}

const renderIcon = (Icon: IconType, props: { className?: string; size?: number }) => {
    return React.createElement('span', { className: props.className }, 
        React.createElement(Icon as any, { size: props.size })
    );
};

const JournalCard: React.FC<JournalCardProps> = ({ trip, onClick }) => {
    return (
        <div 
            className="journal-card" 
            onClick={onClick}
        >
            <div className="journal-card-content">
                <h2 className="journal-card-title">{trip.title}</h2>
                
                <div className="journal-card-metadata">
                    <div className="journal-card-info">
                        {renderIcon(FaCalendarAlt, { className: 'journal-card-icon', size: 14 })}
                        <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                    </div>
                    
                    {trip.routes && trip.routes.length > 0 && (
                        <div className="journal-card-info">
                            {renderIcon(FaMapMarkerAlt, { className: 'journal-card-icon', size: 14 })}
                            <span className="journal-card-cities">
                                {trip.routes.map((route) => route.city).join(' • ')}
                            </span>
                        </div>
                    )}
                </div>

                <p className="journal-card-description">{trip.description}</p>

                <div className="journal-card-footer">
                    <span className="journal-card-destinations">
                        {trip.routes?.length || 0} {trip.routes?.length === 1 ? 'destination' : 'destinations'}
                    </span>
                    {renderIcon(FaChevronRight, { className: 'journal-card-chevron', size: 14 })}
                </div>
            </div>
        </div>
    );
};

export default JournalCard;