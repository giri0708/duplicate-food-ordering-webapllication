import React from "react";
import { Route, BrowserRouter } from "react-router-dom"
import Home from "./Home";
// import Filter from "./Filter";
import Filter from "./Fil1class";
import Details from "./Details";
import Header from "./Header";



function Router() {
    return (
        <div>
            <BrowserRouter>
                <Route path='*' component={Header} />
                <Route exact path='/' component={Home} />
                <Route path='/filter' component={Filter} />
                <Route path='/details' component={Details} />
                </BrowserRouter>
        </div>
    )
}

export default Router;