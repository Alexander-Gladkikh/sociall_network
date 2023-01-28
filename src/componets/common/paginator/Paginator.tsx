import React, {useState} from "react";
import s from './Paginator.module.css';


type PaginationPropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    totalItemCount: number
    pageSize: number
    portionSize: number
}

export const Paginator: React.FC<PaginationPropsType> = ({
                                                             totalItemCount
                                                             , pageSize
                                                             , currentPage
                                                             , onPageChanged,
                                                             portionSize = 10
                                                         }) => {

    let pagesCount = Math.ceil(totalItemCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={s.pagination}>
        {portionNumber > 1 &&
            <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => <span className={currentPage === p ? s.selectedPage : ''}
                              onClick={() => onPageChanged(p)}>{p}</span>)}

        {portionCount > portionNumber &&
            <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
    </div>
}