import axiosInstance from '../config/AxiosConfig';
import UserResponse from '../models/output/UserResponse';

class UserApi {
    async getMe(): Promise<UserResponse> {
        const { data } = await axiosInstance.get<UserResponse>(`/user/me`);
        return data;
    }
}

export default new UserApi();
