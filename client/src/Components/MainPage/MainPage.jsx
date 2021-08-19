import React, { useEffect, useState } from "react"
import style from "./mainPage.module.css"
import NavBar from "../NavBar/NavBar"
import Countries from "../Countries/Countries"
import Pagination from "../Pagination/Pagination"
import {connect} from "react-redux"
import {  getCountries, getCountriesByName } from "../../actions/actions"
import Searcher from "./Searcher"
// import {Link} from "react-router-dom"

const MainPage = ({getCountries, countriesFiltered, getCounriesByName}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(7)
    
    useEffect(()=>{
        getCountries()
    }, [])
    
    const changePage = (n) => setCurrentPage(n) 
    try { 
        const indexOfLastCountry = currentPage * countriesPerPage //1 * 7, 2*7, 3*7....
        const indexOfFirstCountry = indexOfLastCountry - countriesPerPage //7-7, 14-7, 21-7...
        const currentCountries = countriesFiltered.slice(indexOfFirstCountry, indexOfLastCountry )
        console.log(currentCountries) 
        return (
            <div className={style.mainPageContainer}>
                <div className={style.secondMainPageContainer}>
                        <NavBar changePage={setCurrentPage}/>
                    <div className={style.searcherContainer}>
                        <Searcher changePage={changePage} getCounriesByName={getCountriesByName} />
                    </div>
                    <div >
                        <Countries currentCountries={currentCountries} />
                        <div>
                            <Pagination countriesPerPage={countriesPerPage} currentPage={currentPage} totalCountries={countriesFiltered.length} changePage={changePage}/>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
         catch{
            return(
                <div className={style.mainPageContainer}>
                        <NavBar changePage={changePage} />
                        <Searcher changePage={changePage} getCounriesByName={getCountriesByName} />
                    <div className={style.errorContainer}>
                        <h3>Error!</h3>
                        <p>it seems that the country that you try to find doesnt appear in the list. Please, try it again</p>
                    </div>
                </div>
            )
         }
}
const mapStateToProps = (state) =>{
    return {
        countriesFiltered: state.countriesFiltered,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getCountries: ()=> dispatch(getCountries()),
        getCounriesByName: id => dispatch(getCountriesByName(id))
        // addActivity: act => dispatch(addActivity(act))
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(MainPage)