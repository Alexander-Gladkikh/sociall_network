import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import ProfileStatusWidthHooks from "./ProfileStatusWidthHooks";
import userPhoto from "../../../assets/images/pngtree-users-vector-icon-png-image_3725294.jpg";


export const ProfileInfo:React.FC<any> = ({profile, status, updateStatus, isOwner, savePhoto}) => {


  if (!profile) {
      return <Preloader/>
  }

  const onMainPhotoSelected = (e: any) => {
      if (e.target.files.length) {
          savePhoto(e.target.files[0])
      }
  }

    return (
        <div className={s.content}>
            <div>
                <img src={'https://www.imgcorporations.com/images/bg-img.jpg'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img className={s.mainPhoto} src={profile.photos.large || userPhoto}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            </div>
            <ProfileStatusWidthHooks status={status} updateStatus={updateStatus}/>
        </div>
    )
}