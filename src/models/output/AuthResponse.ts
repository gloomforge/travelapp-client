import UserResponse from "./UserResponse";

interface AuthResponse {
    token: string;
    refreshToken: string;
    user: UserResponse;
}

export default AuthResponse;