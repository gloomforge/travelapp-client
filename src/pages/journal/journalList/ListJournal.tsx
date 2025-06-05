import { useState, useEffect } from "react";
import { TripApi } from "../../../api/TripApi";
import { RouteApi } from "../../../api/RouteApi";
import JournalCard from "./components/JournalCard";
import JournalItem from "../journalItem/JournalItem";
import TripResponse from "../../../models/output/TripResponse";
import { Link } from "react-router-dom";
import "./ListJournal.css";

const ListJournal = () => {
    const [trips, setTrips] = useState<TripResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTrip, setSelectedTrip] = useState<TripResponse | null>(null);
    
    useEffect(() => {
        const fetchTripsAndRoutes = async () => {
            try {
                const tripsData = await TripApi.getCurrentUserTrips();

                const tripsWithRoutes = await Promise.all(
                    tripsData.map(async (trip) => {
                        try {
                            const routes = await RouteApi.getRoutesByTripId(trip.id);
                            return {
                                ...trip,
                                routes
                            };
                        } catch (error) {
                            console.error(`Failed to fetch routes for trip ${trip.id}:`, error);
                            return {
                                ...trip,
                                routes: []
                            };
                        }
                    })
                );

                setTrips(tripsWithRoutes);
                setError(null);
            } catch (err: any) {
                console.error('Detailed fetch error:', err);
                if (err.message === 'No authentication token found' || err.message === 'Unable to determine current user') {
                    setError('Please log in to view your trips.');
                } else {
                    setError(err.message || 'Failed to fetch trips. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTripsAndRoutes();
    }, []);

    const handleTripClick = (trip: TripResponse) => {
        setSelectedTrip(trip);
    };

    const handleCloseDialog = () => {
        setSelectedTrip(null);
    };

    if (loading) {
        return (
            <div className="journal-list-container">
                <div className="journal-list-loading">
                    <p className="journal-list-loading-text">Loading trips...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="journal-list-container">
                <div className="journal-list-error">
                    <div className="journal-list-error-container">
                        <p className="journal-list-error-text">{error}</p>
                        <Link to="/account/auth/login" className="btn btn-primary">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="journal-list-container">
            <div className="journal-list-header">
                <div>
                    <h1 className="journal-list-title">My travel journals</h1>
                    <p className="journal-list-subtitle">Your collection of travel memories</p>
                </div>
                <Link to="/create" className="btn btn-primary journal-list-new-button">
                    <span className="journal-list-plus-icon">+</span> New Journal
                </Link>
            </div>

            {trips.length > 0 ? (
                <div className="journal-list-grid">
                    {trips.map((trip) => (
                        <JournalCard 
                            key={trip.id} 
                            trip={trip} 
                            onClick={() => handleTripClick(trip)}
                        />
                    ))}
                </div>
            ) : (
                <div className="journal-list-empty">
                    <p className="journal-list-empty-text">No travel journals found. Create your first journal!</p>
                    <Link to="/create" className="btn btn-primary journal-list-new-button">
                        <span className="journal-list-plus-icon">+</span> Create Journal
                    </Link>
                </div>
            )}

            {selectedTrip && (
                <JournalItem
                    trip={selectedTrip}
                    isOpen={true}
                    onClose={handleCloseDialog}
                />
            )}
        </div>
    );
};

export default ListJournal;