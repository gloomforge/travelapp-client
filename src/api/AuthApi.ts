import AuthResponse from "../models/output/AuthResponse";
import RegisterRequest from "../models/input/RegisterRequest";
import LoginRequest from "../models/input/LoginRequest";
import axiosInstance from "../config/AxiosConfig";
import {API_URL} from "../config/BaseUrl";

class AuthApi {
    async login(data: LoginRequest): Promise<AuthResponse> {
        const { data: result } = await axiosInstance.post<AuthResponse>(`${API_URL}/auth/login`, data);
        return result;
    }

    async register(data: RegisterRequest): Promise<AuthResponse> {
        const { data: result } = await axiosInstance.post<AuthResponse>(`${API_URL}/auth/register`, data);
        return result;
    }

    static async refreshToken(refreshToken: string): Promise<AuthResponse> {
        const { data: result } = await axiosInstance.post<AuthResponse>(`/auth/refresh`, { refreshToken });
        return result;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthApi();
