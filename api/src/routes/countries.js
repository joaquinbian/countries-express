const express = require("express")
const router = express.Router()
const {Country, Activity} = require("../db")//requerimos las tablas para mostrar su contenido
const {Op} = require("sequelize")
const {URL_ALL} = require("../link_api/constants")
const fetch = require("node-fetch")


router.get("/", (req, res) => {
     const {name_query} = req.query
  
Country.findAll({include:Activity})
.then((countries)=>{ //trae el array con todos los countries( esta vacio primero)
    if(countries.length < 1){
        fetch(URL_ALL)
        .then(response => response.json())
        .then((country)=>{
            country.forEach((c)=>{
                Country.findOrCreate({ 
                        where:{
                        id:c.alpha3Code,
                        name:c.name,
                        flag:c.flag,
                        continent:c.region,
                        capital:c.capital,
                        subregion:c.subregion,
                        area:c.area,
                        population:c.population
                    }
                })
            })
        })
        .then(()=>{
             Country.findAll({include:Activity})
            .then(c =>c ? res.status(200).send(c) : res.status(400).send("The countries were not found"))
            .catch(err => console.error(err))
        })
        .catch((err)=>console.error(err))
    } else{ //acá entra en el caso de q la longitud de countries sea mayor a 1
        if(!name_query){
            countries ? res.status(200).send(countries) :res.status(400).send("the countries were not found")//en countries van a estar los paises del findAll de arriba
            }else{
                Country.findAll({where:{name:{[Op.iLike]:`%${name_query}%`}}, include:Activity})
                .then(rta=>{
                    rta.length ? res.status(200).send(rta) : res.status(400).send({error: "No match found"})
                    console.log(name_query)
                })
                .catch(err => console.error(err))
            }
    }
})
.catch((err)=> res.send(err))
        
})
router.get("/:id", (req, res)=>{
    const{id}=req.params
    Country.findOne({where: {id: `${id.toUpperCase()}`}, include:Activity})
    .then(rta=> rta ? res.send(rta) : res.status(400).send("The country id were not found"))
    .catch(err=>console.error(err))
})



module.exports = router
  // Country.count()
    // .then(rta =>{
    //     if(rta < 1){
    //         fetch(URL_ALL)
    //         .then(response => response.json())
    //         .then(countries => {
    //             countries.forEach((c)=>{
    //                 Country.findOrCreate({
    //                     where :{
    //                     id:c.alpha3Code,
    //                     name:c.name,
    //                     flag:c.flag,
    //                     continent:c.region,
    //                     capital:c.capital,
    //                     subregion:c.subregion,
    //                     area:c.area,
    //                     population:c.population
    //                     }
    //                 })
    //             })
    //         })
    //     } 
    // })
    // .then(()=>{
    //     if(name_query){
    //         Country.findOne({where: {name:{[Op.iLike]:`%${name_query}%`}}, include:Activity})
    //         .then((c)=> c ? res.send(c) : res.status(400).send("No se ha encontrado el pais"))
    //         .catch((err)=> console.error(err))
    //     } else {
    //         Country.findAll({include:Activity})
    //         .then((c)=> c.length ? res.send(c) : res.send())
    //         .catch(err => console.error(err))
    //     }
    // })
    // .catch((err) => console.error(err))




// Country.findAll({include:Activity})
//     .then(countries => {
//         if(countries.length < 1){
//             fetch(`${URL_ALL}`)
//             .then(response=> response.json())
//             .then(rta =>{
//                 // console.log(rta) rta tiene los paises  
//                 countries.push("hola")
//                 countriesList = rta
//             //    rta.forEach((c)=>{
//             //        Country.create({
//             //         id:c.alpha3Code,
//             //         name:c.name,
//             //         flag:c.flag,
//             //         continent:c.region,
//             //         capital:c.capital,
//             //         subregion:c.subregion,
//             //         area:c.area,
//             //         population:c.population
//             //        })
//             //    })
//             })
//             .catch(err=>console.error(err))
//         }
        
//         //countries = countries.concat(countriesList)
//         console.log(countries)
//         if(name_query){
//             Country.findOne({where : {name: {[Op.iLike]:`%${name_query}%`}}, include: Activity})
//             .then(rta => rta ? res.send(rta) : res.status(400).send("No hay ningún pais que coincida con su busqueda"))
//             .catch(err => console.error(err))
//         } else {
//             countries ? res.send(countries) : res.status(400).send("No se han encontrado los paises")
//         }   
//     })
//     .catch(err => console.error(err))






//**************************************** 


    // if(name_query){
    //     Country.findAll({where: {name:{[Op.iLike]:`%${name_query}%`}}, include:Activity})
    //     .then(rta=> rta.length >= 1 ? res.send(rta) : res.status(400).send("No se ha encontrado ningún pais"))
    //     .catch(err=>console.error(err))
    // }else{
    // Country.findAll({include:Activity})
    // .then(countries =>countries ? res.send(countries) : res.status(400).send("No se han encontrado los paises"))
    // .catch(err=>console.log(err))}

//lo de arriba es el codigo con el sync
// *************************************