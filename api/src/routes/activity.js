const express = require("express")
const router = express.Router()
const {Country, Activity} = require("../db")

router.post("/", (req, res)=>{
    const {name, dificulty, duration, season, countryId} = req.body
   

    if(name, dificulty, duration, season, countryId){
        Activity.create({
            name,
            dificulty,
            season,
            duration
        })
        .then(act=>{
            if(typeof countryId === "object"){
                countryId.forEach((c)=>{
                    Country.findOne({where:{id: c.id}})
                    .then((ctry)=>{
                       console.log(ctry)
                       act.addCountry(ctry)
                   })
                   .catch((err)=> console.error(err))
               })
              return res.send("agregado")
            } else {
                return res.status(400).send("CountryId needs to be an Array")
            }
        })
        .catch(err=>console.error(err))
    } else{
        return res.status(400).send("the necessary data was not send")
    }
}) 

module.exports = router