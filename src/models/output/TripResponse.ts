import { RouteData } from "../input/CreateRouteRequest";

interface TripResponse {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    userId: number;
    routes: RouteData[];
}

export default TripResponse;