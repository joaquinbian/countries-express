import React, { useEffect, useState} from "react"
import {Link} from "react-router-dom"
import style from ".//navBar.module.css"
import {connect} from "react-redux"
import {getCountries, sortAlphabetically, filterByContinent, sortAlphabeticallyZa, filterByActivity, sortByPopulation, sortByPopulationDesc} from "../../actions/actions"

const NavBar = ({sortAlphabetically, getCountries, sortAlphabeticallyZa, filterByContinent, filterByActivity, changePage, sortByPopulation, sortByPopulationDesc}) =>{
    const[sort, setOrder] = useState("")
    const[activity, setActivity] = useState("")
    const [continent, setContinent] = useState("")
     

    useEffect(()=>{
        changePage(1)
         if(continent){
           console.log("hola soy el continente", continent)
            if(continent === "all") getCountries()
            else if (continent !== "all"){
            filterByContinent(continent)
            }
        }
    console.log(continent)
        
    }, [continent])


   useEffect(()=>{
        if(sort === "all") getCountries()
        else if(sort === "a-z") sortAlphabetically()
        else if(sort === "z-a") sortAlphabeticallyZa()
        else if(sort === "↑ population") sortByPopulation()
        else if (sort === "↓ population") sortByPopulationDesc()
        console.log("hola estoy en orden")
    },[sort])

    const inputActivityHandler = (e) =>{
        e.preventDefault()
        
        setActivity(e.target.value)
    }
    const setInputHandler = (e)=>{
        e.preventDefault()
        changePage(1)
        filterByActivity(activity)
        setActivity("")
    }
    
    return (
        <div className={style.navBarContainer}>
                <Link to="/"className={style.link}><p>App Countries</p></Link>
               
                    <div className={style.sortContainer}>
                    <p>Sort by</p>
                        <select onChange={(e)=>setOrder(e.target.value)}>
                            <option value="all">-</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                            <option value="↑ population">↑ population</option>
                            <option value="↓ population">↓ population</option>
                        </select>
                    </div>
                    <div className={style.filtersContainer}>
                        <p>Filter by </p>
                        <div className={style.selectContainer}>
                        <p>Continent</p>
                            <select onChange={(e)=>setContinent(e.target.value)}>
                                <option value="all">All</option>
                                <option value="Americas">Americas</option>
                                <option value="Europe">Europe</option>
                                <option value="Africa">Africa</option>
                                <option value="Oceania">Oceania</option>
                                <option value="Asia">Asia</option>
                            </select>
                        </div>
                        <div className={style.inputActivityContainer}>
                                <label>Activity</label>
                                <form onSubmit={setInputHandler}>
                                    <input className={style.inputText} placeholder="find by activity and enter..." type="text" value={activity} onChange={inputActivityHandler}/>
                                </form>
                        </div>
                    </div>     
                {/* </div> */}
                <Link to="/activities" className={style.link}><p>Add your activity</p></Link>
        </div>
    )}

const mapDispatchToProps = (dispatch) =>{
    return {
        sortAlphabetically: () => dispatch(sortAlphabetically()),
        getCountries: ()=> dispatch(getCountries()),
        filterByContinent: continent => dispatch(filterByContinent(continent)),
        sortAlphabeticallyZa: ()=> dispatch(sortAlphabeticallyZa()),
        filterByActivity: paylaod => dispatch(filterByActivity(paylaod)),
        sortByPopulation: () => dispatch(sortByPopulation()),
        sortByPopulationDesc: () => dispatch(sortByPopulationDesc())
    }
}
const mapStateToProps = (state) =>{
    return {
        countriesFiltered: state.countriesFiltered,
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(NavBar);

          