import RouteResponse from './RouteResponse';

interface TripResponse {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    userId: number;
    routes?: RouteResponse[];
}

export default TripResponse;