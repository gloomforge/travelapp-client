import React from 'react';
import { RouteData } from '../../../../models/input/CreateRouteRequest';

interface RouteFormProps {
    routes: RouteData[];
    onRouteChange: (index: number, field: keyof RouteData, value: string) => void;
    onAddRoute: () => void;
    onRemoveRoute: (index: number) => void;
    isSubmitting: boolean;
}

const RouteForm: React.FC<RouteFormProps> = ({
    routes,
    onRouteChange,
    onAddRoute,
    onRemoveRoute,
    isSubmitting,
}) => {
    return (
        <div className="route-management">
            <h2 className="section-title">Routes</h2>
            {routes.map((route, index) => (
                <div key={index} className="route-container">
                    <div className="route-header">
                        <h3>Route {index + 1}</h3>
                        {routes.length > 1 && (
                            <button
                                type="button"
                                onClick={() => onRemoveRoute(index)}
                                className="remove-route-button"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                    <div className="route-fields">
                        <div className="route-field">
                            <label htmlFor={`locationName-${index}`} className="form-label">
                                Location Name
                            </label>
                            <input
                                type="text"
                                id={`locationName-${index}`}
                                className="form-input"
                                value={route.locationName}
                                onChange={(e) => onRouteChange(index, "locationName", e.target.value)}
                                required
                                placeholder="Enter location name"
                            />
                        </div>
                        <div className="route-field">
                            <label htmlFor={`country-${index}`} className="form-label">
                                Country
                            </label>
                            <input
                                type="text"
                                id={`country-${index}`}
                                className="form-input"
                                value={route.country}
                                onChange={(e) => onRouteChange(index, "country", e.target.value)}
                                required
                                placeholder="Enter country"
                            />
                        </div>
                        <div className="route-field">
                            <label htmlFor={`city-${index}`} className="form-label">
                                City
                            </label>
                            <input
                                type="text"
                                id={`city-${index}`}
                                className="form-input"
                                value={route.city}
                                onChange={(e) => onRouteChange(index, "city", e.target.value)}
                                required
                                placeholder="Enter city"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={onAddRoute}
                className="add-route-button"
            >
                Add Another Route
            </button>

            <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Creating Trip..." : "Create Trip"}
            </button>
        </div>
    );
};

export default RouteForm;
