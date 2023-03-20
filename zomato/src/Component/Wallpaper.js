import React from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import './Styles/Wallpaper.css';


class Wallpaper extends React.Component {

  constructor() {
    super();
    this.state = {
      Restaurants: [],
      inputText: '',
      suggestions: []
    }
  }
  handleLocation = (event) => {
    const locationId = event.target.value;
    sessionStorage.setItem('locationId',locationId);
    axios({
      method: 'GET',
      url: `http://localhost:2000/api/getAllRestaurants/location/${locationId}`,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        this.setState({ Restaurants: response.data.Restaurants })
      })
      .catch(err => console.log(err));
  }
  handleSearch = (event) => {
    let inputText = event.target.value;
    const { Restaurants } = this.state;
    const suggestions = Restaurants.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase())); //istead of includes we can use == to get exact match
    this.setState({ suggestions, inputText });
  }

  showSuggestions = () => {
    const { suggestions, inputText } = this.state;
    if (suggestions.length == 0 && inputText == undefined) {
      return null;
    }
    if (suggestions.length > 0 && inputText == '') {
      return null;
    }
    if (suggestions.length == 0 && inputText) {
      return <ul>
        <li>No Search Results Found</li>
      </ul>
    }
    return (
      <ul>
        {
          suggestions.map((item, index) => (
            <li key={index} onClick={
              () => this.selectingRestaurant(item)
            }>
              {`${item.name} -  ${item.locality},${item.city}`}
            </li>))
        }
      </ul>
    );
  }

  selectingRestaurant = (resObj) => {
    this.props.history.push(`/details?restaurant=${resObj._id}`);
  }

  render() {
    const { locationsData } = this.props;
    return (
      <div>
        <div className="home">
          <div className="logo"> e!</div>
          <div className="location">Find the best restaraunt,cafes and bars</div>
          <div className="search">
            <span className="search1">
              <select onChange={this.handleLocation}>
              <option value="0">select</option>
                {locationsData.map((item, index) => {
                  return <option key={index} value={item.location_id}>{`${item.name},${item.city}`}</option>
                })}
              </select>
              <span id='notebooks'>
                <input id='query' type="text" className="searchInput" placeholder="&#xF002; search for any restaurants" list="Restaraunts" onChange={this.handleSearch} />
                {this.showSuggestions()}
              </span>
            </span>
          </div>
        </div>
      </div>


    )
  }


}

export default withRouter(Wallpaper);

//whenever you work with the component for navigation which is not a directly part of main router you need to import withrouter.
//child component of parent components do not use router.