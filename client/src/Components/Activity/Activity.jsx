import React from "react"
import style from "./activity.module.css"

const Activity = ({activities, countryName}) =>{
    
    if(activities&& activities.length){
        console.log(activities)
    return(
        <div style={style.activityContainer}>
            <h2>Activities to do in {countryName}</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Duration (hours)</th>
                    <th>Season</th>
                    <th>Difficulty</th>
                </tr>
                </thead>
                <tbody>
                {activities && activities.map((a)=>
                <tr key={a.id} className={style.activities}>
                    <td>{a.name}</td>
                    <td>{a.duration}</td>
                    <td>{a.season}</td>
                    <td>{a.dificulty}</td>
                </tr>
                )}
                </tbody>
            </table>
        </div>
    )
    } else{
        return (
            <h2>You didnt organize anything yet...</h2>
        )
    }
}



export default Activity