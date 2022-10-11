import axios from "axios";

const instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': "4cbc2eb2-7280-4c19-b411-06affe5406dc"
        }
    }
)

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,)
            .then(response => response.data)
    },
    unfollow(id:any) {
        return instance.delete(`follow/${id}`,)
            .then(response => response.data)
    },
    follow(id:any) {
        return instance.post(`follow/${id}`,)
            .then(response => response.data)
    },
    login() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    getProfile(profileId: any) {
        return instance.get(`profile/` + profileId)
    }
}








