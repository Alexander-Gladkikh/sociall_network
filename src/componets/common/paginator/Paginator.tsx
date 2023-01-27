import React from "react";
import s from './Paginator.module.css';


type PaginationPropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount: number
    pageSize: number
}

export const Paginator:React.FC<PaginationPropsType> = ({totalUsersCount,pageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {pages.map(p => <span className={currentPage === p ? s.selectedPage : ''}
                              onClick={() => onPageChanged(p)}>{p}</span>)}
    </div>
}