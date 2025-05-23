import AuthResponse from "../models/output/AuthResponse";
import RegisterRequest from "../models/input/RegisterRequest";
import LoginRequest from "../models/input/LoginRequest";
import axios from "axios";
import {API_URL} from "../config/BaseUrl";

class AuthApi {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const { data: result } = await axios.post<AuthResponse>(`${API_URL}/auth/login`, data);
    return result;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const { data: result } = await axios.post<AuthResponse>(`${API_URL}/auth/register`, data);
    return result;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthApi();
