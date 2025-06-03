import { CreateRouteRequest } from '../models/input/RouteRequest';
import RouteResponse from '../models/output/RouteResponse';
import { API_URL } from '../config/BaseUrl';

export class RouteApi {
    static async createRoute(routeData: CreateRouteRequest): Promise<RouteResponse> {
        const response = await fetch(`${API_URL}/Route`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(routeData),
        });

        if (!response.ok) {
            throw new Error('Failed to create route');
        }

        return response.json();
    }

    static async getRoutesByTripId(tripId: number): Promise<RouteResponse[]> {
        const response = await fetch(`${API_URL}/Route/trip/${tripId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch routes');
        }

        return response.json();
    }
}
