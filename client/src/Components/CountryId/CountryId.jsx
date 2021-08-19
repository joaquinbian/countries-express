import React, { useEffect } from "react"
import {connect} from "react-redux"
import { getCountryDetail } from "../../actions/actions"
import style from "./countryId.module.css"
import {Link} from "react-router-dom"
import Activity from "../Activity/Activity"

const CountryId = ({countryDetail, getCountryDetail, match}) =>{
    useEffect(()=>{
        const id = match.params.id
        getCountryDetail(id)
        console.log(match)
    }, [])
    return (
        <div className={style.windowContainer}>
        <div className={style.countryIdContainer}>
            <div className={style.linkContainer}>
            <Link className={style.link} to="/countries">Back to countries</Link>
            </div>
            <h1>{countryDetail.name}</h1>
            <h5>{countryDetail.id}</h5>
            <img src={countryDetail.flag} alt=""/>
            <h3>Capital: {countryDetail.capital}</h3> 
            <h3>Subregion: {countryDetail.subregion}</h3>
            <h4>Area: {countryDetail.area}</h4>
            <h4>Population: {countryDetail.population}</h4>
            <hr/>
            <Activity countryName={countryDetail.name} activities={countryDetail.activities}/>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        countryDetail: state.countryDetail
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getCountryDetail: id => dispatch(getCountryDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryId)