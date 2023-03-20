import React from "react";
import Quicksearch from "./Quicksearch";


import axios from "axios";

import "./Styles/style.css";

import Wallpaper from "./Wallpaper";



class Home extends React.Component{
    constructor(){
        super()
        this.state={
            locations:[],
            mealTypes:[]
        }
    }
    // handlelocationChange=(event)=>{
    //     const locationId=event.target.value;
    //     sessionStorage.setItem('locationId',locationId);
    //     axios({
    //                 method:'GET',
    //                 url:`http://localhost:2000/getAllLocations/${locationId}`,
    //                 headers:{Accept:'application/json'}
    //             })
    //             .then(response=>{
    //                 this.setState(console.log({locations:response.data.locations}))
    //             })
    //             .catch(err=>console.log(err));
    // }
    componentDidMount(){
        sessionStorage.clear();//should goto only mealtype if we click,session storage location clears
        axios({
            method:'GET',
            url:'http://localhost:2000/getAllLocations',
            headers:{'Content-Type':'application/json'}
        })
        .then(response=>{
            this.setState({locations:response.data.locations})
        })
        .catch(err=>console.log(err));

        axios({
            method:'GET',
            url:'http://localhost:2000/getAllMealType',
            headers:{'Content-Type':'application/json'}
        })
        .then(response=>
            this.setState({mealTypes:response.data.MealTypes}))
           
        .catch(err=>console.log(err));
}
    render(){
        const {locations,mealTypes} =this.state;
        return(
        <div> 
           <Wallpaper locationsData={locations}/>
           <Quicksearch mealTypes={mealTypes}/>
    
        </div>
        )
    }
}

export default Home;
