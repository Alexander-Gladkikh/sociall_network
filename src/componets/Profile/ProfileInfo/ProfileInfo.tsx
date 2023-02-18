import React, {useState} from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import ProfileStatusWidthHooks from "./ProfileStatusWidthHooks";
import userPhoto from "../../../assets/images/pngtree-users-vector-icon-png-image_3725294.jpg";
import ProfileDataForm from "./ProfileDataForm";
import ProfileDataFormReduxForm from "./ProfileDataForm";


export const ProfileInfo: React.FC<any> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

const [editMode, setEditMode] = useState<boolean>(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: any) => {
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

const Contacts: React.FC<any> = ({contactsTitle, contactsValue}) => {
    return (
        <div>
            <b>{contactsTitle} :</b>{contactsValue}
        </div>
    )
}

const ProfileData:React.FC<any> = ({profile, isOwner, goToEditMode}) => {
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
                return <Contacts key={key} contactsTitle={key} contactsValue={profile.contacts[key]}/>
            })
        }
        </div>
        <div>
        </div>
    </div>
}

