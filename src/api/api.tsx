import axios from "axios";

const instance = axios.create({
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            'API-KEY': "88732962-7d6b-4220-9742-a71d3b763549"
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

    getProfile(profileId: any) {
        console.warn("Obsolete method. Please profileAPI object")
        return ProfileAPI.getProfile(profileId)
    }
}

export const ProfileAPI = {
    getProfile(profileId: any) {
        return instance.get(`profile/` + profileId)
    },
    getStatus(profileId: any) {
        return instance.get('profile/status/' + profileId)
    },
    updateStatus (status: any) {
        return instance.put('profile/status/', {status: status})
    }

}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => response.data)

    },
    login(email: any, password: any, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe})
    },

    logout() {
        return instance.delete('auth/login' )
    }
}







