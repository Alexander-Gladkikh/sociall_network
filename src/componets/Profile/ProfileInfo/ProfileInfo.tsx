import React from "react";
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus";


export const ProfileInfo = (props: any) => {

    return (
        <div className={s.content}>
            <div>
                <img src={'https://www.imgcorporations.com/images/bg-img.jpg'}/>
            </div>
            {/*/!*<div className={s.descriptionBlock}>*!/*/}
            {/*/!*    <img src={'../../assets/images/dsd.png'}/>*!/*/}
            {/*/!*    ava + description*!/*/}
            {/*/!*</div>*!/*/}
            <ProfileStatus/>
        </div>
    )
}