import "./JournalItem.css"
import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';
import { FaMapMarkerAlt, FaCalendarAlt, FaTimes, FaRoute } from 'react-icons/fa';
import TripResponse from '../../../models/output/TripResponse';

interface JournalItemProps {
    trip: TripResponse;
    isOpen: boolean;
    onClose: () => void;
}

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

const JournalItem: React.FC<JournalItemProps> = ({ trip, isOpen, onClose }) => {
    if (!isOpen) return null;

    const renderIcon = (Icon: IconType, props: IconBaseProps = {}) => {
        const IconComponent = Icon as React.ComponentType<IconBaseProps>;
        return <IconComponent {...props} />;
    };

    return (
        <div className="journal-dialog-overlay" onClick={onClose}>
            <div className="journal-dialog" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    {renderIcon(FaTimes, { size: 20 })}
                </button>
                
                <div className="dialog-header">
                    <h2>{trip.title}</h2>
                    <div className="meta-info">
                        <div className="meta-item">
                            {renderIcon(FaCalendarAlt, { className: "meta-icon", size: 16 })}
                            <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                        </div>
                        {trip.routes && trip.routes.length > 0 && (
                            <div className="meta-item">
                                {renderIcon(FaRoute, { className: "meta-icon", size: 16 })}
                                <span>{trip.routes.length} {trip.routes.length === 1 ? 'destination' : 'destinations'}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="dialog-content">
                    <div className="trip-description">
                        <p>{trip.description}</p>
                    </div>

                    {trip.routes && trip.routes.length > 0 && (
                        <div className="routes-section">
                            <h3>Travel Route</h3>
                            <div className="routes-list">
                                {trip.routes.map((route, index) => (
                                    <div key={route.id} className="route-item">
                                        <div className="route-number">{index + 1}</div>
                                        <div className="route-content">
                                            <h4>{route.locationName}</h4>
                                            <div className="route-location">
                                                {renderIcon(FaMapMarkerAlt, { className: "meta-icon", size: 14 })}
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
    );
};

export default JournalItem;