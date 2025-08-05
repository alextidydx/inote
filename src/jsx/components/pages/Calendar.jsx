import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import $ from "jquery";
import moment from 'moment';
import { useState } from 'react'
import '../../../styles/pages/Profile.scss'
import Menu from '../ui/Menu';
import Feed from '../ui/Feed';


export default (props) => (
    <Calendar {...props} payload={useParams()} history={useLocation()} navigate={useNavigate()} />
);


const notesData = [
	{
		id : 0,
		type : "image",
		title : "Мой текстовый виджет",
		noteId : 0,
		display : true,
		canRemove : false,
		padding : "120%",
		url : "./assets/images/calendar.png",
		created : moment().format()
	}
]


class Calendar extends React.Component {
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

    render() {
    	let Preview = this.preview;
		return (
		<>
			<div className="at__feed-container" ref={this.container}>
				<Feed notes={notesData} selectedItem={-1} />
				<Menu history={this.props.history} navigate={this.props.navigate}  />
			</div>
		</>
		)
	}
}