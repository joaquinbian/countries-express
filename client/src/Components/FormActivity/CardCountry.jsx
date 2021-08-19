import style from "./cardCountry.module.css"
const  CardCountry = ({name, flag, id, countriesHandlerFalse, countriesHandlerTrue}) => {



        return (
        <div className={style.cardCountryContainer}>
            <div className={ style.nameImgContainer}>
                <img className={style.img} src={flag}/>
                <div className={style.name}>
                    <p>{name}</p>
                </div>
                <div className={style.btnContainer}>
                    <button onClick={countriesHandlerTrue} className={style.btnAdd} >Add</button>
                    <button  onClick={countriesHandlerFalse} className={style.btnDelete} >Delete</button>
                </div>
                
            </div>
        </div>
    )
}

export default CardCountry