import AuthResponse from "../models/output/AuthResponse";
import RegisterRequest from "../models/input/RegisterRequest";
import LoginRequest from "../models/input/LoginRequest";
import axios from "axios";

const API_BASE_URL = process.env.API_URL || 'http://localhost:5105/api';

interface AuthApi {
  login(data: LoginRequest): Promise<AuthResponse>;
  register(data: RegisterRequest): Promise<AuthResponse>;
}

class AuthApiImpl implements AuthApi {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const { data: result } = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, data);
    return result;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const { data: result } = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, data);
    return result;
  }
}

export default new AuthApiImpl();
