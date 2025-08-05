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
		type : "image",
		title : "",
		noteId : 0,
		display : true,
		canRemove : false,
		padding : "99%",
		url : "./assets/images/greeting.jpg",
		created : moment().format()
	},
	{
		id : 1,
		type : "text",
		title : "",
		noteId : 0,
		display : true,
		canRemove : true,
		text : "Расширенный динамический диапазон HDR10 гарантирует точность передачи цветовой палитры.",
		created : moment().format()
	},
	{
		id : 2,
		type : "voice",
		title : "",
		noteId : 0,
		display : true,
		canRemove : true,
		duration : 59,
		recognized : false,
		text : "На достижение необычного рекорда «Формулой-1» обратили внимание в Deadline.",
		created : moment().format()
	},
	{
		id : 3,
		type : "chart",
		title : "",
		noteId : 0,
		display : true,
		canRemove : true,
		collapsed : false,
		ticker : "APPL",
		value : "+1.2%",
		created : moment().format()
	},
	{
		id : 4,
		type : "image",
		title : "",
		noteId : 0,
		display : true,
		canRemove : true,
		padding : "64%",
		url : "./assets/images/mock.jpg",
		created : moment().format()
	},
	{
		id : 5,
		type : "text",
		title : "",
		noteId : 0,
		display : true,
		canRemove : true,
		text : "В пятёрку также входят «Троя» (497 миллионов), «Мистер и миссис Смит» (487 миллионов) и «Одиннадцать друзей Оушена» (450,7 миллиона.",
		created : moment().format()
	},
	{
		id : 6,
		type : "text",
		title : "",
		noteId : 0,
		display : true,
		canRemove : true,
		text : "Для запуска Battlefield 6 на ПК требуется включить Secure Boot в UEFI — у некоторых игроков возникли с этим трудности",
		created : moment().format()
	},
	{
		id : 7,
		type : "text",
		title : "",
		noteId : 0,
		display : true,
		canRemove : true,
		text : "Требование включать Secure Boot привело к недовольству некоторых игроков, которые призвали EA отказаться от использования этой функции.",
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