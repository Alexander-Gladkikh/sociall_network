import React from "react";
import s from './Post.module.css'

export type PostPropsType = {
    message: string
    countLike: number
}

export const Posts: React.FC<PostPropsType> = (props) => {
    return (
        <>
            <div className={s.item}>
                <img src={'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg'}/>
                {props.message}
            </div>
            <span>Like {props.countLike}</span>
        </>
    )
}