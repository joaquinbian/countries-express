import React from "react"
import {Link} from "react-router-dom"
import style from "./landingPage.module.css"
const LandingPage = () => {
    return (
        <div className={style.landingPageContainer}>
            <div className={style.messageContainer}>
                <div>
                    <h1>PI- Countries</h1>
                    <hr/>
                <p className={style.parrafo}>
                    With this app you can organize your next trip looking for the details about your destination. You can also organize
                    activities during the trip. Please, to get in, press the button.
                </p>
                </div>
                {/* <Link  to="/countries" className={style.btnIn}  ><button type="submit" value="Ingesar">Ingresar</button></Link> */}
                <div>
                    <Link to="/countries"><button className={style.link}>Enter</button></Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage