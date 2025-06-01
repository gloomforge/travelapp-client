
export interface RouteData {
    locationName: string;
    country: string;
    city: string;
}

export interface CreateRouteRequest extends RouteData {
    tripId: number;
}