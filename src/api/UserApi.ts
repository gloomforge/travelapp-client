import axios from 'axios';
import UserResponse from '../models/output/UserResponse';
import {API_URL} from "../config/BaseUrl";

class UserApi {
    async getMe(): Promise<UserResponse> {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('Authentication token not found');
        }
        
        const { data } = await axios.get<UserResponse>(`${API_URL}/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return data;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserApi();
