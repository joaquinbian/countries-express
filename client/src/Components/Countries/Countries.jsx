import React, { useEffect, useState } from "react"
import style from "./countries.module.css"

import Country from "./Country"
const Countries = ({currentCountries}) => {
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        let interval = null
        interval = setTimeout(()=>{
            setLoading(true)
        }, 4000)
        return ()=> {
            clearTimeout(interval)
            setLoading(false)
        }
    }, [currentCountries])

        if(currentCountries.length){
    return (
        <div >
            <div className={style.countriesRealContainer}>
            {currentCountries && currentCountries.map((c)=>
                <Country id={c.id} flag={c.flag} key={c.id}name={c.name} continent={c.continent} />
            )}
            </div>

        </div>
    )} 
    else{
        return (
            <div>
                {loading
                ?<div className={style.errorCountriesContainer}>
                    <h3>Error!</h3>
                    <p>it seems that the country that you try to find doesnt appear in the list. Please, try it again</p>
                </div>
                
                :<h2>Loading...</h2>}
            </div>
        )
    }  
    
}

export default Countries

