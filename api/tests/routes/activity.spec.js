const {expect} = require("chai")
const session  = require("supertest-session")
const app = require("../../src/app.js")
const {Activity, Country, conn} = require("../../src/db.js")

const agent = session(app)

describe("Test routes /activity", ()=>{
    before(()=> conn.authenticate() 
    .catch((err)=>{
        console.error("unable to connect to the database", err)
    }))
    beforeEach(()=> Activity.sync({force: true}))
    describe("POST /activity", ()=>{
        it("it should responds with 200", ()=>
        agent.post("/activity")
        .send({name:"museo", duration: 3, dificulty: 3, countryId:[
                {
                "id": "ATF",
                "name": "French Southern Territories",
                "flag": "https://restcountries.eu/data/atf.svg",
                "continent": "Africa",
                "capital": "Port-aux-Français",
                "subregion": "Southern Africa",
                "area": 7747,
                "population": 140,
                "activities": []
                }]
            })
            .expect(200)
        )
        it("should return an error if type of countryId isnt an array", ()=>
            agent.post("/activity")
            .send({name:"restaurant", duration: 4, dificulty: 5, countryId:"ARG, GBR, FRA"})
            .expect(400)
        )
        it("creates an activity in database", ()=>{
            agent.post("/activity")
            .send({name: "museo", duration: 3, dificulty: 3, season: "spring", countryId:[
                {
                "id": "ATF",
                "name": "French Southern Territories",
                "flag": "https://restcountries.eu/data/atf.svg",
                "continent": "Africa",
                "capital": "Port-aux-Français",
                "subregion": "Southern Africa",
                "area": 7747,
                "population": 140,
                "activities": []
                }]
            })
            .then(()=>{
                return Activity.findOne({
                    where:{
                        name:"museo"
                    }
                })
            })
            .then((act)=>{
                expect(act).to.exist
            })
        })
        it("returns an error if one of the properties expected was not send", ()=>{
            agent.post("/activity")
            .send({name:"tour", dificulty: 3, countryId:[
                {
                "id": "ATF",
                "name": "French Southern Territories",
                "flag": "https://restcountries.eu/data/atf.svg",
                "continent": "Africa",
                "capital": "Port-aux-Français",
                "subregion": "Southern Africa",
                "area": 7747,
                "population": 140,
                "activities": []
                }]
            })
            .expect(400)
        })
    })
})
