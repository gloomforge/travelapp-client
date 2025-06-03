import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    id: number;
    exp: number;
    [key: string]: any;
}

export class AuthService {
    static getCurrentUserId(): number | null {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                return null;
            }

            if (typeof decoded.id === 'number') {
                console.log('Using numeric ID from token:', decoded.id);
                return decoded.id;
            }

            console.log('No valid user ID found in token claims');
            return null;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
} 