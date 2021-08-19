import React from "react"
// import { render, screen, cleanup, fireEvent, queryByTitle} from "@testing-library/react"
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Activity from "../Components/Activity/Activity";
Enzyme.configure({ adapter: new Adapter() });

describe("<Activity />", ()=>{
    let component
    let name
    let activities = [ 
        {
        "id": 1,
        "name": "museo",
        "dificulty": 3,
        "duration": 7,
        "season": "winter",
        "Country_Activity": {
        "createdAt": "2021-04-20T23:18:34.430Z",
        "updatedAt": "2021-04-20T23:18:34.430Z",
        "activityId": 1,
        "countryId": "USA"
            }
        },
        {
        "id": 2,
        "name": "restaurante",
        "dificulty": 4,
        "duration": 6,
        "season": "autumn",
        "Country_Activity": {
        "createdAt": "2021-04-20T23:18:34.430Z",
        "updatedAt": "2021-04-20T23:18:34.430Z",
        "activityId": 1,
        "countryId": "USA"
           }
        }
    ]
    beforeEach(()=>{
        name="United States of America"
        component = shallow(
            <Activity activities={activities} countryName={name} />
        )
    })
    it("should render <Activity />", ()=>{
        expect(component).toBeTruthy()
    })
    it("contains an array of activities in props", ()=>{
        expect(component.contains(<h2>{name}</h2>)).toBeTruthy()
    })
    it("it contains a table", ()=>{
        expect(component.find("table")).toBeTruthy()
    })
    it("the head of the table contains a thead with the information we want to show", ()=>{
        expect(component.find("thead")).toBeTruthy()
        expect(component.find("tr")).toBeTruthy()
        expect(component.find("tr").at(0).children().first().type()).toEqual("th")
        let th = component.find("th")
        expect(th.length).toEqual(4)
    })
    it("each of th tags contains the title of the information they show",()=>{
        expect(component.contains(<th>Name</th>)).toBeTruthy()
        expect(component.contains(<th>Duration</th>)).toBeTruthy()
        expect(component.contains(<th>Difficulty</th>)).toBeTruthy()
        expect(component.contains(<th>Season</th>)).toBeTruthy()
    })
    it("in the body, the table should contain one tr tag per activity", ()=>{
        expect( component.find(".activities")).toHaveLength(2)
    })
    it("the td tags should contain the information of the activities they recieve by props", ()=>{
        let info = component.find("td").map((a)=> a.text())
        console.log(info) //retorna un array
        expect(info[0]).toEqual(activities[0].name)
        expect(parseInt( info[1])).toEqual(activities[0].duration)
        expect(info[2]).toEqual(activities[0].season)
        expect(parseInt (info[3])).toEqual(activities[0].dificulty)
    })
    it("if activities not exist should return a div explains that the user didnt organize an activity so far", ()=>{
        let wrapper = shallow(<Activity activities={[]} name={name}/>)
        expect(wrapper.find("h2").at(1)).toBeTruthy()
        expect(wrapper.find("h2").last().text()).toEqual("You didnt organize anything yet...") //si ponía at(1) me dabaerror
    })
})