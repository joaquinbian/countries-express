import React from "react"
import style from "./country.module.css"
import {Link} from "react-router-dom"
const Country = ({flag, name, continent, id}) =>{
    return (
            <Link className={style.link} to={`/countries/${id}`}>
        <div className={style.countryContainer}>
            <h1>{name}</h1>   
            <div className={style.imgContainer}>
                <img src={flag} alt=""/>
            </div>
            <h3>{continent}</h3>
        </div></Link>
        
    )
}

export default Country