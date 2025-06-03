import "./ListJournal.css";
import { useState, useEffect } from "react";
import { TripApi } from "../../../api/TripApi";
import { RouteApi } from "../../../api/RouteApi";
import JournalCard from "./components/JournalCard";
import JournalItem from "../journalItem/JournalItem";
import TripResponse from "../../../models/output/TripResponse";

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

    const handleCreateTrip = () => {
        // TODO: Implement navigation to create trip page
        console.log('Navigate to create trip page');
    };

    const handleTripClick = (trip: TripResponse) => {
        setSelectedTrip(trip);
    };

    const handleCloseDialog = () => {
        setSelectedTrip(null);
    };

    if (loading) {
        return (
            <div className="journal-list-container">
                <div className="loading-state">Loading trips...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="journal-list-container">
                <div className="error-state">{error}</div>
            </div>
        );
    }

    return (
        <div className="journal-list-container">
            <header className="journal-header">
                <h1>Travel Journals</h1>
                <button className="new-journal-btn" onClick={handleCreateTrip}>
                    New Journal
                </button>
            </header>
            <div className="journals-grid">
                {trips.map((trip) => (
                    <JournalCard 
                        key={trip.id} 
                        trip={trip} 
                        onClick={() => handleTripClick(trip)}
                    />
                ))}
            </div>
            {trips.length === 0 && (
                <div className="empty-state">
                    No travel journals found. Create your first journal!
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