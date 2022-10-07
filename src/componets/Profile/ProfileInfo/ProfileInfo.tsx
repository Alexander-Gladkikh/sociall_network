import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";


export const ProfileInfo = (props: any) => {
    if(!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={s.content}>
            <div>
                <img src={'https://www.imgcorporations.com/images/bg-img.jpg'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                ava + description</div>
        </div>
    )
}