import React, {useState} from "react"
import {connect} from "react-redux"
import {getCountriesByName} from "../../actions/actions"
import style from "./searcher.module.css"
const Searcher = ({getCountriesByName, changePage}) =>{
    const[state, setState] = useState("") 

    const setStateHandler = (e) => {
        e.preventDefault()
        setState(e.target.value)
        console.log(state)
    }
    
    
    const setInputHandler = (e) =>{
        e.preventDefault()
         changePage(1)
        getCountriesByName(state)
        setState("")
    }
    return (
            <form onSubmit={(e)=>setInputHandler(e)} className={style.inputsContainer}>
                <input className={style.inputText} type="text" placeholder="find your country..." name="input" value={state} onChange={setStateHandler}></input>
                {/* <input type="submit" className={style.inputBtn} ></input> */}
            </form>
    )
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getCountriesByName: name => dispatch(getCountriesByName(name))
    }
}

export default connect(null, mapDispatchToProps)(Searcher)