import React from "react"
// import { render, screen, cleanup, fireEvent, queryByTitle} from "@testing-library/react"
import Country from "../Components/Countries/Country"
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {BrowserRouter, Link, Router} from "react-router-dom"
Enzyme.configure({ adapter: new Adapter() });

describe("<Country />", ()=>{
    let component
    let flag
    let name
    let continent
    let id
    beforeEach(()=>{
            flag= "https://restcountries.eu/data/atf.svg"
            name= "French Southern Territories"
            continent = "Africa"
            id="ATF"
        component = mount(
            <BrowserRouter>
            <Country 
            flag={flag}
            name={name}
            continent = {continent}
            id={id}/>
            </BrowserRouter>)
    })
    it("should render the component", ()=>{
        expect(component).toBeTruthy()
    })
    it("should contain a h1 tag with the name of the country created", ()=>{
        expect(component.contains(<h1>{name}</h1>)).toEqual(true)
    })
    it("should contain a h3 tag with the continent of the country created", ()=>{
        expect(component.contains(<h3>{continent}</h3>)).toEqual(true)
    })
    it("should contain a Link tag", ()=>{
        let link = component.find(Link)
        expect(link.length).toEqual(1)
    })
    it("should contain a Link with a property 'to' and redirect to countries/:id", ()=>{
        let link = component.find(Link)
        expect(link.prop("to")).toEqual("/countries/ATF")
    })
    it("should contain a img tag with the flag of the country created", ()=>{
        let img = component.find("img")
        expect(img.prop("src")).toEqual(flag)
    })

})





        
    

