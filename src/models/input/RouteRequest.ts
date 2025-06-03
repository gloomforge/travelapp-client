export interface RouteRequest {
    locationName: string;
    country: string;
    city: string;
    tripId: number;
}

export interface CreateRouteRequest extends RouteRequest {}