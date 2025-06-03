import { CreateTripRequest } from '../models/input/TripRequest';
import TripResponse from '../models/output/TripResponse';
import { CreateRouteRequest } from '../models/input/RouteRequest';
import { API_URL } from '../config/BaseUrl';
import { RouteApi } from './RouteApi';
import { AuthService } from '../services/AuthService';

export class TripApi {
    static async createTrip(tripData: CreateTripRequest): Promise<TripResponse> {
        const response = await fetch(`${API_URL}/Trip`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(tripData),
        });

        if (!response.ok) {
            throw new Error('Failed to create trip');
        }

        return response.json();
    }

    static async getCurrentUserTrips(): Promise<TripResponse[]> {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        const userId = AuthService.getCurrentUserId();
        console.log('Current User ID:', userId);
        
        if (!userId) {
            throw new Error('Unable to determine current user');
        }

        try {
            return await this.getTripsByUserId(userId);
        } catch (error) {
            console.error('Detailed error in getCurrentUserTrips:', error);
            throw new Error('Failed to fetch your trips. Please try again later.');
        }
    }

    static async getTripsByUserId(userId: number): Promise<TripResponse[]> {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const url = `${API_URL}/Trip`;
        
        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            console.log('Response status:', response.status);
            
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Please log in to view your trips');
                }
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error(`Failed to fetch trips: ${errorText}`);
            }

            const data = await response.json();
            console.log('Response data:', data);
            return data;
        } catch (error) {
            console.error('Error details:', error);
            throw error;
        }
    }

    static async createTripWithRoutes(
        tripData: Omit<CreateTripRequest, 'userId'>, 
        routes: Omit<CreateRouteRequest, 'tripId'>[],
        userId: number
    ): Promise<void> {
        try {
            const tripResponse = await this.createTrip({
                ...tripData,
                userId,
            });

            await Promise.all(
                routes.map(route =>
                    RouteApi.createRoute({
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
