import React from "react";
import {withRouter} from 'react-router-dom'



 function Quicksearchitems(props){
  // const {quicksearchitemData}=props; 
  const {name,content,image,meal_type}=props.quicksearchitemData;
  const handleNavigate=()=>{
    const locationId=sessionStorage.getItem('locationId');
    if(locationId){
      props.history.push(`/filter?mealtype=${meal_type}&location=${locationId}`);
    }else{
      props.history.push(`/filter?mealtype=${meal_type}`);
    }
    
    // setmeal_type({mealtypeId})
  }


    return (
     
      <div>
<span className="qs-box col-12 col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4" onClick={handleNavigate}>
        <div className="food-content">
           {/* <img src={`/${image}`} className="img" alt="Wait for the Feast" height='150' width='140'/> */}
          
          <img src={`/${image}`} className="img" alt="Wait for the Feast" height='150' width='140'/>
           <h4 className="h4">{name}</h4>
            <p className="description">{content}</p> 
    </div></span>
        </div>
    ); 
  }

export default withRouter(Quicksearchitems);
// {`./${image}`} 