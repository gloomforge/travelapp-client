import React from 'react';

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
        <div className="trip-details">
            <h2 className="section-title">Trip Details</h2>
            <div className="form-group">
                <label htmlFor="title" className="form-label">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-input"
                    value={title}
                    onChange={onInputChange}
                    required
                    placeholder="Enter trip title"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="form-input form-textarea"
                    value={description}
                    onChange={onInputChange}
                    required
                    placeholder="Describe your trip"
                />
            </div>

            <div className="form-group date-inputs">
                <div>
                    <label htmlFor="startDate" className="form-label">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="form-input"
                        value={startDate}
                        onChange={onInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="endDate" className="form-label">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="form-input"
                        value={endDate}
                        onChange={onInputChange}
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default TripForm;
