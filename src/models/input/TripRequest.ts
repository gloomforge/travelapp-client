export interface TripRequest {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    userId: number;
}

export interface CreateTripRequest extends TripRequest {}
