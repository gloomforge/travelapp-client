import axiosInstance from '../config/AxiosConfig';
import UserResponse from '../models/output/UserResponse';

export class UserApi {
    static async getMe(): Promise<UserResponse> {
        const { data } = await axiosInstance.get<UserResponse>(`/user/me`);
        return data;
    }
}