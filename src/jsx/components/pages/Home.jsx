import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import $ from "jquery";
import moment from 'moment';
import { useState } from 'react'
import '../../../styles/pages/Home.scss'
import Menu from '../ui/Menu';
import Feed from '../ui/Feed';


export default (props) => (
    <Home {...props} payload={useParams()} history={useLocation()} navigate={useNavigate()} />
);


const notesData = [
	{
		id : 0,
		element : "text",
		title : "Мой текстовый виджет",
		noteId : 0,
		display : true,
		canRemove : false,
		text : "Съешь ещё этих мягких французских булок, да выпей же чаю",
		created : moment().format()
	},
	{
		id : 1,
		element : "text",
		title : "Мой текстовый виджет",
		noteId : 0,
		display : true,
		canRemove : false,
		text : "Съешь ещё этих мягких французских булок, да выпей же чаю",
		created : moment().format()
	},
	{
		id : 2,
		element : "text",
		title : "Мой текстовый виджет",
		noteId : 0,
		display : true,
		canRemove : false,
		text : "Съешь ещё этих мягких французских булок, да выпей же чаю",
		created : moment().format()
	},
	{
		id : 3,
		element : "text",
		title : "Мой текстовый виджет",
		noteId : 0,
		display : true,
		canRemove : false,
		text : "Съешь ещё этих мягких французских булок, да выпей же чаю",
		created : moment().format()
	},
	{
		id : 4,
		element : "text",
		title : "Мой текстовый виджет",
		noteId : 0,
		display : true,
		canRemove : false,
		text : "Съешь ещё этих мягких французских булок, да выпей же чаю",
		created : moment().format()
	},
	{
		id : 5,
		element : "text",
		title : "Мой текстовый виджет",
		noteId : 0,
		display : true,
		canRemove : false,
		text : "Съешь ещё этих мягких французских булок, да выпей же чаю",
		created : moment().format()
	},
	{
		id : 6,
		element : "text",
		title : "Мой текстовый виджет",
		noteId : 0,
		display : true,
		canRemove : false,
		text : "Съешь ещё этих мягких французских булок, да выпей же чаю",
		created : moment().format()
	}
]


class Home extends React.Component {
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