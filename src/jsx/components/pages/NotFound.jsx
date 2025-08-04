import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import $ from "jquery";

import { useState } from 'react'
import '../../../styles/pages/NotFound.scss'
import ReactArrow from '../../../icons/arrow.svg?react'

export default (props) => (
    <NotFound {...props} payload={useParams()} history={useLocation()} navigate={useNavigate()}  />
);



class NotFound extends React.Component {

	constructor(props) {
		super(props);
		this.container = React.createRef();

		
	}
	componentDidMount() {
		
	}
	componentDidUpdate() {
		this.printVars();
		this.checkSlug();
	}
	
	checkSlug = () => {

	}



	printVars = () => {
		return 0;
		console.log("Settings", this.props.settings);
		console.log("Payload", this.props.payload);
		console.log("Location", this.props.history);		
	}

	goBack = () => {	
		this.props.navigate(-1);
	} 

    render() {
    	
		return (
		<>
			<div className="at__not-found-container" ref={this.container}>
				<img src="./assets/images/error.png" className="at__not-found-card__image" />
				<h1>Произошла ошибка</h1>
				<p>Что-то пошло не так, но я все поправлю.</p>
				<div className="at__button_container">
					<button className="at__button" type="submit" onClick={this.goBack} ><ReactArrow /> Вернуться обратно</button>
				</div>
			</div>
		</>
		)
	}
}