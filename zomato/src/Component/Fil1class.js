import React from "react";
import "./Styles/Filter.css";
import axios from "axios";
import queryString from 'query-string'




class Filter extends React.Component {
    //while we desturcture the mealtype we get in string format,QS-used to convert the string into an object.
    constructor() {
        super();
        this.state = {
            restaurants: [],
            locations: [],
            mealtype: undefined,
            location: undefined,
            cuisine: [],
            hcost: undefined,
            lcost: undefined,
            sort:1,
            page: 1,
            pageCount: []
        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        // const {mealtype}=qs; querstring will not read if we destructure multiple values
        // const { mealtype } = qs
        const { mealtype, location } = qs
        //passing Json to the data
        //Keyname has to be the same as backend
        const filterObj = {
            mealtype: Number(mealtype),
            location: location,
        }

        axios({
            method: 'POST',
            url: `http://localhost:2000/api/filter`,
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            // .then(response=>console.log(response))
            .then(response => this.setState({ restaurants: response.data.restaurants,mealtype,pageCount:response.data.pageCount}))
            .catch(err => console.log(err));

        axios({
            method: 'GET',
            url: 'http://localhost:2000/getAllLocations',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => this.setState({ locations: response.data.locations}))
            .catch(err => console.log(err));
    }

    // setRestaurants=(previousRestaurants)=>{return !previousRestaurants,location}

    handleLocation = (event) => {

        const location = event.target.value;

        const { mealtype, cuisine, hcost, lcost, sort, page } = this.state

        let filterObj = {
            mealtype: Number(mealtype),
            location,
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            lcost,
            hcost,
            sort,
            page
        }

        axios({
            method: 'POST',
            url: `http://localhost:2000/api/filter`,
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            // .then(response=>console.log(response))
            .then(response => this.setState({ restaurants: response.data.restaurants, location,pageCount:response.data.pageCount }))
            .catch(err => console.log(err));
    }

    handleCusinechange = (CuisineId) => {
        // console.log('hello')

        const { mealtype, cuisine, location, hcost, lcost, sort, page } = this.state
        //   console.log(CuisineId)
        const index = cuisine.indexOf(CuisineId);
        //-1 when items not in the cuisine
        if (index == -1) { cuisine.push(CuisineId) } else { cuisine.splice(index, 1) }

        let filterObj = {
            mealtype: Number(mealtype),
            location,
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            lcost,
            hcost,
            sort,
            page
        }

        axios({
            method: 'POST',
            url: `http://localhost:2000/api/filter`,
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            // .then(response=>console.log(response))
            .then(response => this.setState({ restaurants: response.data.restaurants, cuisine,pageCount:response.data.pageCount }))
            .catch(err => console.log(err));
    }

    handleSortChange = (sort) => {

        const { mealtype, cuisine, location, hcost, lcost, page } = this.state

        let filterObj = {
            mealtype: Number(mealtype),
            location,
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            lcost,
            hcost,
            sort,
            page
        }

        axios({
            method: 'POST',
            url: `http://localhost:2000/api/filter`,
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            // .then(response=>console.log(response))
            .then(response => this.setState({ restaurants: response.data.restaurants, sort,pageCount:response.data.pageCount }))
            .catch(err => console.log(err));
    }

    handleCostChange = (lcost, hcost) => {

        const { mealtype, cuisine, location, sort, page } = this.state

        let filterObj = {
            mealtype: Number(mealtype),
            location,
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            lcost,
            hcost,
            sort,
            page
        }

        axios({
            method: 'POST',
            url: `http://localhost:2000/api/filter`,
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            // .then(response=>console.log(response))
            .then(response => this.setState({ restaurants: response.data.restaurants, hcost, lcost,pageCount:response.data.pageCount}))
            .catch(err => console.log(err));
    }

    handlePagechange = (page) => {

        const { mealtype, cuisine, location, sort, hcost, lcost } = this.state

        let filterObj = {
            mealtype: Number(mealtype),
            location,
            cuisine: cuisine.length == 0 ? undefined : cuisine,
            lcost,
            hcost,
            sort,
            page
        }

        axios({
            method: 'POST',
            url: `http://localhost:2000/api/filter`,
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            // .then(response=>console.log(response))
            .then(response => this.setState({ restaurants: response.data.restaurants, page,pageCount:response.data.pageCount }))
            .catch(err => console.log(err));
    }

    handleResNavigate=(resId)=>{
        this.props.history.push(`/details?restaurant=${resId}`);
        console.log(resId)
    }

    render() {
        const { restaurants, locations, pageCount } = this.state;
        // console.log(locations)
        return (
            <div>
                <div className="container">
                    {/* <div className="taskbar" style={{ backgroundColor: "rgb(196, 241, 127)", height: "50px", boxShadow: "0 3px 0 6px rgb(245, 241, 241)" }}>
                    <button className="loginfil">Login</button>
                    <button className="accountfil">create an account</button>
                    <div className="logofil"> e!</div>
                </div> */}
                    {/* <!--top section over-->
<!--Left section--> */}
                    <div className="heading">
                        <h2>Breakfast Places in Coimbatore</h2>
                    </div>
                    <div className="midsection">
                        <div className="filterpanel">
                            {/* <input list="cities" type="text" placeholder=" Filters / Select Location" className="dd" /> */}
                            <select id="cities" onChange={this.handleLocation}>

                                <option value='0'>select</option>
                                {locations && locations.map((item, index) => {
                                    return <option key={index} value={item.location_id}  >{`${item.name},${item.city}`}</option>
                                })}
                            </select>
                        </div>
                        <br />
                        <div className="verticalgrid">

                            <div className="cusine">Cusine</div>
                            <div className="checkbox" >
                                <input type="checkbox" onChange={() => this.handleCusinechange(1)} /> North Indian<br />
                                <input type="checkbox" onChange={() => this.handleCusinechange(2)} /> South Indian<br />
                                <input type="checkbox" onChange={() => this.handleCusinechange(3)} /> Chinese<br />
                                <input type="checkbox" onChange={() => this.handleCusinechange(4)} /> Fast Food<br />
                                <input type="checkbox" onChange={() => this.handleCusinechange(5)} /> Street Food
                            </div>

                            <div className="cost">Cost For Two</div>
                            <div className="radio">
                                <input type="radio" name="cost" onChange={() => { this.handleCostChange(1, 500) }} /> Less than &#8377;500<br />
                                <input type="radio" name="cost" onChange={() => { this.handleCostChange(500, 1000) }} /> &#8377;500-&#8377;1000<br />
                                <input type="radio" name="cost" onChange={() => { this.handleCostChange(1000, 1500) }} /> &#8377;1000-&#8377;1500<br />
                                <input type="radio" name="cost" onChange={() => { this.handleCostChange(1500, 2000) }} /> &#8377;1500-&#8377;2000<br />
                                <input type="radio" name="cost" onChange={() => { this.handleCostChange(2000, 50000) }} /> above &#8377;2000

                            </div>
                            <div className="sort">Sort</div>
                            <div className="radio">
                                <input type="radio" name='sort' onChange={() => { this.handleSortChange(1) }} /> Price Low to High<br />
                                <input type="radio" name='sort' onChange={() => { this.handleSortChange(-1) }} /> Price High to Low<br />

                            </div>
                        </div>
                        {/* <!--right section--> */}
                        <br />
                        <div className="restaurants">
                            <br />
                            <div className="food">
                                {restaurants.length > 0 ? restaurants.map((item) => {
                                    return <div className="food-content-fil" onClick={()=>{this.handleResNavigate(item._id)}}>
                                        <img src={`./${item.image}`} className="img-fil" alt="Wait for the Feast" height='150' width='140' />
                                        <h1 className="h4-fil"><strong>{item.name}</strong></h1>
                                        <br />
                                        <div className="description-fil">{item.locality}
                                            <h5><strong>{item.city}</strong></h5>
                                            <hr style={{ width: "auto", border: "solid 1px rgb(245, 241, 241)" }} />
                                            <strong>Cusines:</strong><mark> {item.cuisine.map((cuisineitem) => { return `${cuisineitem.name},` })} </mark><br />
                                            <b>Cost for two:</b> &#8377;{item.min_price}
                                        </div>
                                    </div>
                                }) : <div className="lowersection-fil"><h1>We are very SORRY!!!<br /> No records Found!</h1></div>}
                                {/* <!--pagination panel--> */}
                                {restaurants.length > 0 ?
                                    <div className="buttons-fil">

                                        <button>&laquo;</button>
                                        {/* <button onChange={() => { this.handlePagechange(1) }}>1</button>
                                        <button onChange={() => { this.handlePagechange(2) }}>2</button> */}
                                        {pageCount.map((PageNo)=>{return <button>{PageNo}</button>})}
                                        <button>&raquo;</button>
                                    </div> : null}
                            </div>





                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Filter;