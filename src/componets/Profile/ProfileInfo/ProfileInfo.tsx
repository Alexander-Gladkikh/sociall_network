import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import ProfileStatusWidthHooks from "./ProfileStatusWidthHooks";


export const ProfileInfo:React.FC<any> = ({profile, status, updateStatus}) => {


  if (!profile) {
      return <Preloader/>
  }

    return (
        <div className={s.content}>
            <div>
                <img src={'https://www.imgcorporations.com/images/bg-img.jpg'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={'https://social-network.samuraijs.com/activecontent/images/users/26825/user-small.jpg?v=0'}/>
                ava + description
            </div>
            <ProfileStatusWidthHooks status={status} updateStatus={updateStatus}/>
        </div>
    )
}