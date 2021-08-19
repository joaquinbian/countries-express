import React from "react"
import style from "./pagination.module.css"
const Pagination = ({countriesPerPage, totalCountries, changePage, currentPage}) =>{
    const pageNumbers = []
    console.log(totalCountries)
    for(let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <div className={style.paginationContainer}>
            <div>
                <p className={style.indexPage}>Page {currentPage}</p>
            </div>
            <div className={style.pagesContainer}>
                {pageNumbers.map((n)=>
                    <div key={n}>
                        <a  href="#" className={style.page} onClick={()=>changePage(n)}>{n}</a>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Pagination