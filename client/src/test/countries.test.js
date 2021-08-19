import React from "react"
// import { render, screen, cleanup, fireEvent, queryByTitle} from "@testing-library/react"
import Countries from "../Components/Countries/Countries"
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {BrowserRouter, Link, Router} from "react-router-dom"
Enzyme.configure({ adapter: new Adapter() });

describe("<Countries />", ()=>{
    let countriesFiltered = [{
        "id": "TZA",
        "name": "Tanzania, United Republic of",
        "flag": "https://restcountries.eu/data/tza.svg",
        "continent": "Africa",
        "capital": "Dodoma",
        "subregion": "Eastern Africa",
        "area": 945087,
        "population": 55155000,
        "activities": [
                {
                "id": 1,
                "name": "daadsadsad",
                "dificulty": 3,
                "duration": 7,
                "season": "winter",
                "Country_Activity": {
                "createdAt": "2021-04-20T23:18:34.421Z",
                "updatedAt": "2021-04-20T23:18:34.421Z",
                "activityId": 1,
                "countryId": "TZA"
                    }
                }
            ]
        },
        {
        "id": "USA",
        "name": "United States of America",
        "flag": "https://restcountries.eu/data/usa.svg",
        "continent": "Americas",
        "capital": "Washington, D.C.",
        "subregion": "Northern America",
        "area": 9629091,
        "population": 323947000,
        "activities": [
                {
                "id": 1,
                "name": "daadsadsad",
                "dificulty": 3,
                "duration": 7,
                "season": "winter",
                "Country_Activity": {
                "createdAt": "2021-04-20T23:18:34.430Z",
                "updatedAt": "2021-04-20T23:18:34.430Z",
                "activityId": 1,
                "countryId": "USA"
                    }
                }
            ]
        },
        {
        "id": "ARE",
        "name": "United Arab Emirates",
        "flag": "https://restcountries.eu/data/are.svg",
        "continent": "Asia",
        "capital": "Abu Dhabi",
        "subregion": "Western Asia",
        "area": 83600,
        "population": 9856000,
        "activities": [
                {
                "id": 1,
                "name": "daadsadsad",
                "dificulty": 3,
                "duration": 7,
                "season": "winter",
                "Country_Activity": {
                "createdAt": "2021-04-20T23:18:34.432Z",
                "updatedAt": "2021-04-20T23:18:34.432Z",
                "activityId": 1,
                "countryId": "ARE"
                    }
                }
            ]
        },
        {
        "id": "UMI",
        "name": "United States Minor Outlying Islands",
        "flag": "https://restcountries.eu/data/umi.svg",
        "continent": "Americas",
        "capital": "",
        "subregion": "Northern America",
        "area": null,
        "population": 300,
        "activities": [
                {
                "id": 1,
                "name": "daadsadsad",
                "dificulty": 3,
                "duration": 7,
                "season": "winter",
                "Country_Activity": {
                "createdAt": "2021-04-20T23:18:34.433Z",
                "updatedAt": "2021-04-20T23:18:34.433Z",
                "activityId": 1,
                "countryId": "UMI"
                    }
                }
            ]
        }]
    let component
    beforeEach(()=>{ 
        component = shallow(
                // <BrowserRouter>
                    <Countries currentCountries={countriesFiltered}/>   
                // </BrowserRouter>
        )
    })
    it("should render <Countries />", ()=>{
        expect(component).toBeTruthy()
    })
    it("it should render one <Country /> per countrieFiltered", ()=>{
        expect(component.find("Country")).toHaveLength(4)
    })
    it("should pass the array received as props to 'Country'", ()=>{
        let country = component.find("Country").at(0)
        expect(country.prop("name")).toEqual("Tanzania, United Republic of")
    })
    it("should render a h2 tag with the message 'Loading...' if countries.length is 0", ()=>{
        let wrapper = shallow(<Countries currentCountries={[]}/>)
        expect(wrapper.find("h2")).toHaveLength(1)
        expect(wrapper.find("h2").text()).toEqual("Loading...")

    })
})