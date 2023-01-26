import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWidthHooks from "./ProfileStatusWidthHooks";


export const ProfileInfo = (props: any) => {


  if (!props.profile) {
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
            <ProfileStatusWidthHooks status={props.status} updateStatus={props.updateStatus}/>
        </div>
    )
}