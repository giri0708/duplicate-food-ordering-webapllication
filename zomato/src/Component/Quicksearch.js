import React from "react";
import "react-bootstrap";

import "../Component/Styles/style.css"



import Quicksearchitems from "./QuicksearchItems";

export default function Quicksearch(props) {
    const { mealTypes } = props;
    return (
        <div>

            <h2 className="quick">   Quick Searches  </h2><br />
            <h3 className="text">Discover restaraunts by type of meal</h3><br />
            <div className="qs-boxes-container row justify-content-between d-flex">
                {mealTypes.map((item, index) => {
                    return <div>
                           <Quicksearchitems key={index} quicksearchitemData={item}/>
                                                                                </div>

                })}

            </div>
        </div>

    )
}

{/*         
    <Quicksearchitems title="Starters" detail="Start your day with exclusive starter options" im={starters}/>
    <Quicksearchitems title="Breakfast" detail="Start your day with exclusive breakfast options" im={bf}/>
    <Quicksearchitems title="Meals" detail="Start your day with exclusive meals options" im={meals}/>
    <Quicksearchitems title="Dinner" detail="Start your day with exclusive dinner options" im={din}/>
    <Quicksearchitems title="Snacks" detail="Start your day with exclusive snack options" im={snacks}/>
    <Quicksearchitems title="Beverages" detail="Start your day with exclusive beverages options" im={beverages}/> */}
