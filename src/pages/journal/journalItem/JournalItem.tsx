import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';
import { FaMapMarkerAlt, FaCalendarAlt, FaTimes, FaRoute } from 'react-icons/fa';
import TripResponse from '../../../models/output/TripResponse';
import { formatDateRange } from '../../../utils/dateUtils';
import './JournalItem.css';

interface JournalItemProps {
    trip: TripResponse;
    isOpen: boolean;
    onClose: () => void;
}

const JournalItem: React.FC<JournalItemProps> = ({ trip, isOpen, onClose }) => {
    if (!isOpen) return null;

    const renderIcon = (Icon: IconType, props: IconBaseProps = {}) => {
        const IconComponent = Icon as React.ComponentType<IconBaseProps>;
        return <IconComponent {...props} />;
    };

    return (
        <div className="journal-item-overlay" onClick={onClose}>
            <div 
                className="journal-item-modal" 
                onClick={e => e.stopPropagation()}
            >
                <div className="journal-item-header">
                    <h2 className="journal-item-title">{trip.title}</h2>
                    <button 
                        className="journal-item-close-button" 
                        onClick={onClose}
                    >
                        {renderIcon(FaTimes, { size: 20 })}
                    </button>
                </div>
                
                <div className="journal-item-content">
                    <div className="journal-item-meta">
                        <div className="journal-item-meta-item">
                            {renderIcon(FaCalendarAlt, { className: "journal-item-icon", size: 14 })}
                            <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                        </div>
                        {trip.routes && trip.routes.length > 0 && (
                            <div className="journal-item-meta-item">
                                {renderIcon(FaRoute, { className: "journal-item-icon", size: 14 })}
                                <span>{trip.routes.length} {trip.routes.length === 1 ? 'destination' : 'destinations'}</span>
                            </div>
                        )}
                    </div>

                    <div className="journal-item-sections">
                        <div>
                            <h3 className="journal-item-section-title">About this trip</h3>
                            <p className="journal-item-description">{trip.description}</p>
                        </div>

                        {trip.routes && trip.routes.length > 0 && (
                            <div>
                                <h3 className="journal-item-section-title">Travel Route</h3>
                                <div className="journal-item-routes">
                                    {trip.routes.map((route, index) => (
                                        <div key={route.id} className="journal-item-route">
                                            <div className="journal-item-route-number">
                                                {index + 1}
                                            </div>
                                            <div className="journal-item-route-content">
                                                <h4 className="journal-item-route-name">{route.locationName}</h4>
                                                <div className="journal-item-route-location">
                                                    {renderIcon(FaMapMarkerAlt, { className: "journal-item-icon", size: 14 })}
                                                    <span>{route.city}, {route.country}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JournalItem;