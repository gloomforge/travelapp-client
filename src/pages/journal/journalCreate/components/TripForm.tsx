import React from 'react';
import './TripForm.css';

interface TripFormProps {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TripForm: React.FC<TripFormProps> = ({
    title,
    description,
    startDate,
    endDate,
    onInputChange,
}) => {
    return (
        <div className="trip-form-container">
            <div className="trip-form-header">
                <h2 className="trip-form-title">Trip Details</h2>
                <p className="trip-form-subtitle">Fill in the basic information about your trip</p>
            </div>

            <div className="trip-form-fields">
                <div className="trip-form-field">
                    <label htmlFor="title" className="trip-form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="input"
                        value={title}
                        onChange={onInputChange}
                        required
                        placeholder="Enter trip title"
                    />
                </div>

                <div className="trip-form-field">
                    <label htmlFor="description" className="trip-form-label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="input trip-form-textarea"
                        value={description}
                        onChange={onInputChange}
                        required
                        placeholder="Describe your trip"
                    />
                </div>

                <div className="trip-form-date-container">
                    <div className="trip-form-field">
                        <label htmlFor="startDate" className="trip-form-label">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="input"
                            value={startDate}
                            onChange={onInputChange}
                            required
                        />
                    </div>

                    <div className="trip-form-field">
                        <label htmlFor="endDate" className="trip-form-label">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="input"
                            value={endDate}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripForm;
