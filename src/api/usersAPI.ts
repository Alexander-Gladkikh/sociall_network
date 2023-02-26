import {GetItemsType, instance, APIResponseType} from "./api";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`,)
            .then(res => res.data)
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`,)
            .then(res => res.data) as Promise<APIResponseType>
    },
    follow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`,)
            .then(res => res.data)
    },

    // getProfile(profileId: number) {
    //     console.warn("Obsolete method. Please profileAPI object")
    //     return ProfileAPI.getProfile(profileId)
    // }
}