import TripResponse from "../models/output/TripResponse";
import CreateTripRequest from "../models/input/CreateTripRequest";
import {
    CreateRouteRequest,
    RouteData
} from "../models/input/CreateRouteRequest";
import {API_URL} from "../config/BaseUrl";

export class TripApi {
    static async createTrip(tripData: CreateTripRequest): Promise<TripResponse> {
        const response = await fetch(`${API_URL}/Trip`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tripData),
        });

        if (!response.ok) {
            throw new Error('Failed to create trip');
        }

        return response.json();
    }

    static async createRoute(routeData: CreateRouteRequest): Promise<void> {
        const response = await fetch(`${API_URL}/Route`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(routeData),
        });

        if (!response.ok) {
            throw new Error('Failed to create route');
        }
    }

    static async createTripWithRoutes(
        tripData: Omit<CreateTripRequest, 'userId'>, 
        routes: RouteData[], 
        userId: number
    ): Promise<void> {
        try {
            const tripResponse = await this.createTrip({
                ...tripData,
                userId,
                startDate: new Date(tripData.startDate).toISOString(),
                endDate: new Date(tripData.endDate).toISOString(),
            });

            await Promise.all(
                routes.map(route =>
                    this.createRoute({
                        ...route,
                        tripId: tripResponse.id,
                    })
                )
            );
        } catch (error) {
            console.error('Error in createTripWithRoutes:', error);
            throw error;
        }
    }
}
