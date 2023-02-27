import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import ProfileStatusWidthHooks from "./ProfileStatusWidthHooks";
import userPhoto from "../../../assets/images/pngtree-users-vector-icon-png-image_3725294.jpg";
import ProfileDataFormReduxForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";


type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status:  string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
export const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

const [editMode, setEditMode] = useState<boolean>(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div className={s.content}>
            <div>
                <img src={'https://www.imgcorporations.com/images/bg-img.jpg'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img className={s.mainPhoto} src={profile.photos.large || userPhoto}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataFormReduxForm initialValues={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => setEditMode(true)} profile={profile} isOwner={isOwner}/>}

                <ProfileStatusWidthHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

type ContactsProps = {
    contactsTitle: string
    contactsValue: string
}

const Contacts: React.FC<ContactsProps> = ({contactsTitle, contactsValue}) => {
    return (
        <div>
            <b>{contactsTitle} :</b>{contactsValue}
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData:React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
        <div>
            <b>Full name </b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job </b>: {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b> : {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b> : {
            Object.keys(profile.contacts).map(key => {
                return <Contacts key={key} contactsTitle={key} contactsValue={profile.contacts[key as keyof ContactsType]}/>
            })
        }
        </div>
        <div>
        </div>
    </div>
}

