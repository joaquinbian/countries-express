const {Activity, conn} = require("../../src/db.js")
const {expect} = require("chai")

describe("Activity Model", ()=>{
    before(()=> conn.authenticate()
    .catch((err)=>{
        console.error("unable to connect to database", err)
    }))
    describe("validators", ()=>{
        beforeEach(()=>Activity.sync({force:true}))
        describe("type of data", ()=>{
            it("show throw an error if season is different from winter, spring, autumn or summer", (done)=>{
                Activity.create({
                    name: "museo",
                    dificulty: 3,
                    duration: 3,
                    season: "Otoño"
                })
                .then(()=> done(new Error("invalid input sintax for season")))
                .catch(()=> done())
            })
            it("it returns an error if type of duration is not an integer", (done)=>{
                Activity.create({
                    name:"restaurant",
                    dificulty: 5,
                    duration:"re",
                    season:"spring"
                })
                .then(()=> done(new Error("invalid input sintax for duration")))
                .catch(()=>done())
            })
            it("should return an error if duration contains a letter", (done)=>{
                Activity.create({
                    name:"paseo",
                    dificulty:3,
                    duration: "2 horas",
                    season:"autumn"
                })
                .then(()=> done(new Error("Invalid input sintax for duration")))
                .catch(()=> done())
            })
            it("returns an error if type of difficulty is not an integer", (done)=>{
                Activity.create({
                    name:"jugar a la pelota",
                    dificulty: "re",
                    duration:12,
                    season:"winter"
                })
                .then(()=> done(new Error("invalid input sintax for difficulty")))
                .catch(()=> done())
            })
            it("returns an error if duration is bigger than 5", (done)=>{
                Activity.create({
                    name:"ir a correr",
                    dificulty: 8,
                    duration: 13,
                    season:"autumn"
                })
                .then(()=>done(new Error("the maximum allowed value is 5")))
                .catch(()=> done())
            })
        })
        describe("Adding activities", ()=>{
            it("should add an activity", ()=>{
                return Activity.create({
                    name:"jugar al tenis",
                    dificulty: 5,
                    duration: 13,
                    season: "summer"
                })
                .then(()=>{
                    return Activity.findOne({where:{name:"jugar al tenis"}})
                })
                .then((a)=>{
                    expect(a).to.exist
                })
            })
            it("should set the values correctly", ()=>{
                 Activity.create({
                    name:"ir al cine",
                    dificulty: 1,
                    duration:3,
                    season:"winter"
                })
                .then((activity)=>{
                   expect(activity.name).to.equal("ir al sdd")
                    
                })
                .catch((err)=> console.log(err))
            })
            
        })
    })
   
})
