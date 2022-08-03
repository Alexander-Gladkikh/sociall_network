import React from "react";
import s from './ProfileInfo.module.css'


export const ProfileInfo = () => {
    return (
        <div className={s.content}>
            <div>
                <img src={'https://www.imgcorporations.com/images/bg-img.jpg'}/>
            </div>
            <div className={s.descriptionBlock}>ava + description</div>
        </div>
    )
}