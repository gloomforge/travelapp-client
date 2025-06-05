import React from 'react';
import { RouteData } from '../../../../models/input/CreateRouteRequest';
import './RouteForm.css';

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
        <div className="route-form-container">
            <div className="route-form-header">
                <h2 className="route-form-title">Routes</h2>
                <p className="route-form-subtitle">Add the locations you plan to visit</p>
            </div>

            <div className="route-list">
                {routes.map((route, index) => (
                    <div key={index} className="route-item">
                        <div className="route-item-header">
                            <h3 className="route-item-title">Route {index + 1}</h3>
                            {routes.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => onRemoveRoute(index)}
                                    className="route-item-remove"
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="route-item-fields">
                            <div className="route-item-field">
                                <label htmlFor={`locationName-${index}`} className="route-item-label">
                                    Location Name
                                </label>
                                <input
                                    type="text"
                                    id={`locationName-${index}`}
                                    className="input"
                                    value={route.locationName}
                                    onChange={(e) => onRouteChange(index, "locationName", e.target.value)}
                                    required
                                    placeholder="Enter location name"
                                />
                            </div>

                            <div className="route-item-field">
                                <label htmlFor={`country-${index}`} className="route-item-label">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id={`country-${index}`}
                                    className="input"
                                    value={route.country}
                                    onChange={(e) => onRouteChange(index, "country", e.target.value)}
                                    required
                                    placeholder="Enter country"
                                />
                            </div>

                            <div className="route-item-field">
                                <label htmlFor={`city-${index}`} className="route-item-label">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id={`city-${index}`}
                                    className="input"
                                    value={route.city}
                                    onChange={(e) => onRouteChange(index, "city", e.target.value)}
                                    required
                                    placeholder="Enter city"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="route-form-actions">
                <button
                    type="button"
                    onClick={onAddRoute}
                    className="btn btn-outline route-form-button-full"
                >
                    Add Another Route
                </button>

                <button
                    type="submit"
                    className="btn btn-primary route-form-button-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating Trip..." : "Create Trip"}
                </button>
            </div>
        </div>
    );
};

export default RouteForm;
