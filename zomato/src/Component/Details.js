import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {Carousel} from "react-bootstrap/Carousel";
import { Carousel } from 'react-responsive-carousel'
import queryString from 'query-string'
import "./Styles/Details.css";
import Modal from 'react-modal';
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import GooglePayButton from '@google-pay/button-react';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "lavenderblush",
        border: "solid 2px lightpink",
        boxShadow: "3px 3px 3px 3px lightpink"
    },
};

class Details extends React.Component {

    constructor() {
        super();
        this.state = {
            restaurant: {},//gives detail of single entity so object declaration
            menuItems: [],
            resId: undefined,
            menuItemsModalIsOpen: false,
            galleryModalIsOpen: false,
            formModalIsOpen: false,
            subTotal: 0,
            userEmail: undefined,
            userName: undefined,
            Address: undefined,
            userContact: undefined
        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        //give access to the values which we pass after the question mark as an object
        const { restaurant } = qs;

        axios({
            method: 'GET',
            url: `http://localhost:2000/api/getAllRestaurants/${restaurant}`,
            headers: { 'Content-type': 'application/json' }
        })
            .then(response => {

                this.setState({ restaurant: response.data.restaraunt, resId: restaurant });

            }
            )

            .catch(err => console.log(err));
    }

    // handleOrder = (resId) => {
    //     axios({
    //         method: 'GET',
    //         url: `http://localhost:2000/menuItems/${resId}`,
    //         headers: { 'Content-type': 'application/json' }
    //     })
    //         .then(response => {
    //             console.log(response)
    //             // this.setState({ menuItems: response.data.menuItems });

    //         }
    //         )

    //         .catch(err => console.log(err));
    // }

    //1st parameter is variable name,to convert as state using[]
    handleModal = (state, value) => {
        // console.log(state,value)
        const { resId } = this.state;


        if (state == 'menuItemsModalIsOpen' && value == true) {

            axios({
                method: 'GET',
                url: `http://localhost:2000/menuItems/${resId}`,
                headers: { 'Content-type': 'application/json' }
            })
                .then(response => {
                    // console.log(response)
                    this.setState({ menuItems: response.data.menuItems });

                }
                )

                .catch(err => console.log(err));
        }

        this.setState({ [state]: value });
    }

    addItems = (index, operationType) => {
        let total = 0;
        const items = [...this.state.menuItems];
        // console.log(items)
        const item = items[index];
        // console.log(item)
        if (operationType == 'add') {
            item.qty += 1;
        } else {
            item.qty -= 1;
        }
        items[index] = item;
        //    console.log(items[index]);
        items.map((item) => {
            // console.log(item)
            total += item.qty * item.Price;
        })
        // console.log(total)
        this.setState({ menuItems: items, subTotal: total });

    }

    // getData = async (data) => {
    //     try {
    //         const response = await fetch(`http://localhost:2000/api/payment`, {
    //             method: "POST",
    //             headers: {
    //                 Accept: 'application/json',
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(data)
    //         });
    //         return await response.json();
    //     } catch (err) {
    //         return console.log(err);
    //     }
    // }


    handleFormDataChange = (event, state) => {
        this.setState({ [state]: event.target.value })
    }

    isDate(val) {
        //cross realm compatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', 'key')
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })
        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    getData = (data) => {
        return fetch(`http://localhost:2000/payment`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .catch(err => console.log(err));
    }


    handlePayment = () => {
        const { subTotal, userEmail } = this.state;
        if (!userEmail) {
            alert('Please fill this field and then Proceed');
        }
        else {
            //Payment API Call
            const paymentObj = {
                amount: subTotal,
                email: userEmail
            };
            this.getData(paymentObj).then(response => {
                var information = {
                    action: "https://securegw-stage.paytm.in/order/process",
                    params: response
                }
                this.post(information)
            }).catch(err => console.log(err))
        }
    }


    render() {
        const { restaurant, menuItems, menuItemsModalIsOpen, galleryModalIsOpen, formModalIsOpen, subTotal } = this.state;
        // console.log(menuItems)

        return (
            <div>
                <div>
                    {/* <img src={`./${restaurant.image}`} alt="Wait for the Feast" height='350' width='1000' /> */}
                    <button className="button-d" onClick={() => { this.handleModal('galleryModalIsOpen', true) }}>Click to see Image Gallery</button>
                </div>


                <div className="heading-d">{restaurant && restaurant.name}</div>
                <button className="btn-order" onClick={() => { this.handleModal('menuItemsModalIsOpen', true) }}>Place Online Order</button>
                <div>
                    <Tabs style={{ color: "blue" }}>
                        <TabList style={{ borderBottom: "2px solid red" }}>
                            <Tab>About</Tab>
                            <Tab>Cuisine</Tab>
                            <Tab >Price</Tab>
                            <Tab>PhoneNumber</Tab>
                            <Tab >Address</Tab>
                        </TabList>
                        <TabPanel>
                            <h3 className="head">{restaurant.name}</h3>
                        </TabPanel>
                        <TabPanel>
                            {restaurant.cuisine && restaurant.cuisine.map((item, ind) => (
                                <div key={ind}>
                                    <input type="checkbox" /> {item.name}
                                </div>
                            ))}
                        </TabPanel>

                        <TabPanel className="value">
                            Average Cost<br /><br />
                            &#8377;{restaurant.min_price} for two(approx)
                        </TabPanel>
                        <TabPanel className="value">
                            {restaurant.contact_number}
                        </TabPanel>
                        <TabPanel className="value">
                            {`${restaurant.locality},${restaurant.city}`}
                        </TabPanel>
                    </Tabs>
                </div>
                <Modal
                    isOpen={galleryModalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div>
                        <div className="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }} onClick={() => { this.handleModal('galleryModalIsOpen', false) }}></div>
                        <Carousel showThumbs={false}>
                            {/* {restaurant.thumb && restaurant.thumb.map((item) => {
                                    return <div>
                                        <img src={`/${item}`} height='500px' width='500px' alt="Wait for the Feast" />
                                    </div>
                                })} */}
                            <div>
                                <img src={require('./Styles/pongal.webp')} alt="Wait for the Feast" height='150' width='140' />
                            </div>
                        </Carousel>
                    </div>

                </Modal>
                <Modal
                    isOpen={menuItemsModalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div>
                        <span className="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }} onClick={() => { this.handleModal('menuItemsModalIsOpen', false) }}></span>
                        <h3>{restaurant.name}</h3>
                        <h4>SubTotal:{subTotal}</h4>
                        {/* <Button variant="danger" onClick={() => {
                                this.handleModal('menuItemsModalIsOpen', false)
                                this.handleModal('formModalIsOpen', true)
                            }}>PayNow</Button> */}
                        <GooglePayButton
                            environment="TEST"
                            paymentRequest={{
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                allowedPaymentMethods: [
                                    {
                                        type: 'CARD',
                                        parameters: {
                                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                        },
                                        tokenizationSpecification: {
                                            type: 'PAYMENT_GATEWAY',
                                            parameters: {
                                                gateway: 'example',
                                                gatewayMerchantId: 'exampleGatewayMerchantId',
                                            },
                                        },
                                    },
                                ],
                                merchantInfo: {
                                    merchantId: '12345678901234567890',
                                    merchantName: 'Demo Merchant',
                                },
                                transactionInfo: {
                                    totalPriceStatus: 'FINAL',
                                    totalPriceLabel: 'Total',
                                    totalPrice: '100.00',
                                    currencyCode: 'USD',
                                    countryCode: 'US',
                                },
                            }}
                            onLoadPaymentData={paymentRequest => {
                                console.log('load payment data', paymentRequest);
                            }}
                        />

                        {menuItems.map((item, index) => {
                            return <div>

                                <div>
                                    <h5>{item.name}</h5>
                                    <h5 style={{ display: "inline-block" }}>&#8377;{item.Price}</h5>
                                    <span>
                                        <Card.Img variant="right" src={`../${item.image}`} height='100px' width='100px' alt="Wait for the Feast" style={{ float: 'right', borderRadius: '25px', marginTop: '-50px', marginLeft: '35px', paddingTop: '10px' }}
                                        // ,marginTop:'30px',marginLeft:'35px'  
                                        />   <div style={{ float: 'right' }}>
                                            {item.qty == 0 ?

                                                <button onClick={() => { this.addItems(index, 'add') }}>Add</button>
                                                : <>
                                                    <button className='add-number' onClick={() => { this.addItems(index, 'subtract') }}>-</button>
                                                    <span className='add-qty'>{item.qty}</span>
                                                    <button className='sub-number' onClick={() => { this.addItems(index, 'add') }}>+</button>
                                                </>
                                            }</div>
                                        {/* <div className='add-button'>
                                        </div> */}
                                    </span>
                                    <h6>{item.description}</h6>
                                </div>
                                <hr style={{ width: 'auto', borderColor: 'GrayText' }} />
                            </div>
                        })}
                    </div>
                </Modal>
                <Modal
                    isOpen={formModalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div>
                        <span className="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }} onClick={() => { this.handleModal('formModalIsOpen', false) }}></span>
                        <br />
                        <h5>{restaurant.name}</h5>
                        <span>Name: </span>
                        <br /><br />
                        <input type="text" className="box" onChange={(event) => { this.handleFormDataChange(event, 'userName') }} />
                        <br /><br />
                        <span>Email: </span>
                        <br /><br />
                        <input type="text" className="box" onChange={(event) => { this.handleFormDataChange(event, 'userEmail') }} />
                        <br />
                        <br />
                        <span>Address: </span>
                        <br /><br />
                        <input type="number" className="box" onChange={(event) => { this.handleFormDataChange(event, 'Address') }} />
                        <br /><br />
                        <span>Contact Number: </span>
                        <br /><br />
                        <input type="text" className="box" onChange={(event) => { this.handleFormDataChange(event, 'userContact') }} />
                        <Button variant="success" onClick={this.handlePayment}>Proceed</Button>
                    </div>

                </Modal>

            </div>
        )
    }
}

export default Details;