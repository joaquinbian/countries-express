import React, { useEffect, useState } from "react"
import style from "./formActivity.module.css"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import { getCountries, getCountriesByName} from "../../actions/actions"
import CardCountry from "./CardCountry"
import {post} from "../../post/index"
const axios = require("axios")

const FormActivity = ({countriesFiltered, getCountries, getCountriesByName}) => {
    const [input, setInput] = useState("")
    const [dataForm, setDataForm] = useState({
        name:"",
        dificulty: 1,
        duration: "",
        season:"",
        countryId:[]//acá voy a ir agregando los id de los paises q esten seleccionados en el option
                    //donde voy a mostrar los países
    })
    const [error, setError] = useState({})

    useEffect(()=> {
        getCountries() 
    }, [])

    useEffect(()=>{
        if(!dataForm.name){
            setError({ ...error, name: "you need to specify the name of the activity"})
        }
        else if(!dataForm.duration.length ){
            setError({...error, duration: "please specify the duration"})
        }
        else if(/[a-zA-Z]+/g.test(dataForm.duration)){
            setError({...error, duration: "it only accept numbers. (f.e: 6)"})
        }
        else if( parseInt(dataForm.duration) > 24){
            setError({...error, duration: "the activity cant take more than 24 hours"})
        }
        else if (!dataForm.season.length){
            setError({...error, season: "please specify the season of the activity"})
        }
        else if(!dataForm.countryId.length){
            setError({...error, countryId: "please add at least one country"})
        }
    }, [dataForm])

    const stateReset = () =>{
        setDataForm({
            name: "",
            dificulty: 1,
            duration:"",
            season:"",
            countryId: []
        })
        
        setInput("")
        
    }

    const setDataHandler = (e) =>{
        
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
        setError({...error, [e.target.name]: ""})
    }


 
    const countriesHandlerTrue = (e, id) => {
        e.preventDefault()
        for(let i = 0; i < countriesFiltered.length; i++){
            if(countriesFiltered[i].id === id && !dataForm.countryId.includes(countriesFiltered[i])){
                setDataForm({
                    ...dataForm,
                    countryId: [...dataForm.countryId, countriesFiltered[i]]
                })
            }
        }
        setError({...error, ["countryId"]: ""})
    }

    const countriesHandlerFalse = (e, id) => {
        e.preventDefault()
        for(let i = 0; i < dataForm.countryId.length; i++){
            if(dataForm.countryId[i].id === id){
                setDataForm({
                    ...dataForm,
                    countryId: dataForm.countryId.filter((c)=> c.id !== id )
                })
                return
            }
        }
    }



    const setInputHandler = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }


    const filterCountriesHandler = (e) =>{
        e.preventDefault()
        getCountriesByName(input)
    }
    
    
    const submitForm =(e)=>{        
        e.preventDefault()
        var form = true

        Object.entries(error).forEach(([key, value])=>{
            if(value.length > 0) {
                form = false
            }
        })

        if(form){
            post(dataForm)
            .then(()=> stateReset())
            .then(()=> alert("Activity added"))
            .then(()=>console.log("SE HIZO EL POST"))
            .catch(err => console.log(err))
        }
        else{
            return alert("Please, fix your errors before submit")
        }

}


      return(
        <div className={style.activityContainer}>
            <div className={style.formContainer}>
                {/* <h1>New activity!</h1> */}
            <form onSubmit={(e)=>submitForm(e)}>
            <div className={style.btnContainer}>
            <Link className={style.link} to="/countries">Back to countries</Link>
            </div>
            <div className={style.nameInputContainer}>
                <label>Name of activity: </label>
                    {error.name && <p className={style.danger}>{error.name}</p>}
                <input type="text" name="name" value={dataForm.name} onChange={setDataHandler} className={error.name && style.danger}></input>
            </div>
            <div className={style.dificultyOptionContainer}>
                <label>difficulty: </label>
                <select name="dificulty" name="dificulty" type="text" onChange={setDataHandler} required>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div className={style.durationSelectContainer}>
                <label htmlFor="">Duration (hours): </label>
                    {error.duration && <p className={style.danger}>{error.duration}</p>}
                <input type="text" name="duration" value={dataForm.duration} onChange={setDataHandler} className={error.duration && style.danger}/>
            </div>
            <div className={style.seasonOptionContainer}>
                <label>Season: </label>
                    {error.season && <p className={style.danger}>{error.season}</p>}
                <select name="season" type="text" onChange={setDataHandler} className={error.season && style.danger} required>
                    <option value="" >-</option>
                    <option value="autumn">Autumn</option> 
                    <option value="winter">Winter</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                </select>
            </div>
            <div className={style.countriesContainer}>
                <label>Countries: </label>
                        {error.countryId && <p className={style.danger}>{error.countryId}</p>}
                    {/* <div className={style.CountriesInputBtnContainer}> */}
                        <input placeholder="find your country..." name="countryId" value={input} onChange={setInputHandler} className={ error.countryId && style.danger} />
                        <div >
                            <input type="submit" onClick={filterCountriesHandler} className={style.countriesBtn}/>
                        </div>
                <div className={style.countriesOptionContainer}>
                    {/* <select  type="text" onChange={countriesHandler} multiple required> */}
                        {countriesFiltered.length 
                        ? countriesFiltered.map((c)=>
                             <CardCountry key={c.id} name={c.name} flag={c.flag} countriesHandlerTrue={(e)=>countriesHandlerTrue(e, c.id)} countriesHandlerFalse={(e)=>countriesHandlerFalse(e, c.id)} /> )
                        :    <div className={style.errorContainer}>
                                <h3>Error</h3>
                                <p>it seems that the country that you try to find doesnt appear in the list. Please, try it again</p>
                            </div>
                        }
                </div>
            </div>
                <div className={style.countriesActivitiesContainer}>
                    <div className={style.countriesList}>
                        <p>You want to add this activity to:</p>
                        <hr/>
                        {dataForm.countryId && dataForm.countryId.map((c)=>
                         <span>{`${c.name} - `}</span>
                        )}
                    </div>
                </div>
                <div className={style.btnSubmitContainer}>
                    <input type="submit" value="add activity"/>
                </div>
            </form>
            </div>
        </div>
        )
}
const mapStateToProps = (state) =>{
    return {
        countriesFiltered: state.countriesFiltered
        // countries: state.countries
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCountries: ()=> dispatch(getCountries()),
         getCountriesByName: name => dispatch(getCountriesByName(name))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormActivity)