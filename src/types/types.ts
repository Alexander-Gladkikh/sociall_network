export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
export type PostsType = {
    id: number
    message: string
    countLike: number
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
    location: UsersLocationType
}
export type UsersLocationType = {
    city: string
    country: string
}

export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
    profile?: ProfileType | null,
    status?: string
}

export enum ResultCodes  {
    Success = 0,
    Error= 1
}

export enum ResultCodeForCaptcha  {
    CaptchaIsRequired = 10,
}

