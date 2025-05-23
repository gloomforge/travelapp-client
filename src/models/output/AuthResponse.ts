import UserResponse from "./UserResponse";

interface AuthResponse {
    token: string;
    user: UserResponse;
}

export default AuthResponse;