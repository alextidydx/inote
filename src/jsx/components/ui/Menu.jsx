import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'

import '../../../styles/ui/menu.scss'

import PenIcon from '../../../icons/pen.svg?react'
import HomeIcon from '../../../icons/home.svg?react'
import CalIcon from '../../../icons/calendar.svg?react'
import FolderIcon from '../../../icons/folder.svg?react'
import ProfileIcon from '../../../icons/profile.svg?react'
// state


export default class Menu extends React.Component {
	container = React.createRef()
	state = {};
	

	constructor(props) {
		super(props);
		//custom_modified
	}
	componentDidMount() {
		this.setState({  });
	}
	componentDidUpdate() {}
	
	toFeed = () => {
		this.props.navigate("/feed");
	}
	toNotes = () => {
		this.props.navigate("/notes");
	}
	createNew = () => {
		//this.props.navigate("/feed");
	}
	toCalendar = () => {
		this.props.navigate("/calendar");
	}
	toProfile = () => {
		this.props.navigate("/profile");
	}
	
	render() {
		// travolta
		const classnames = classNames({
			"at__menu" : true
		})
		
		return (
			<div className={classnames} ref={this.container}>
				<div className="at__menu-bar-container " >
					<div className="at__menu-button" onClick={this.toFeed} ><HomeIcon /><p>Фид</p></div>
					<div className="at__menu-button" onClick={this.toNotes} ><FolderIcon /><p>Заметки</p></div>
					<div className="at__menu-button at__menu-button--main" onClick={this.createNew} ><PenIcon /><p>Написать</p></div>
					<div className="at__menu-button" onClick={this.toCalendar} ><CalIcon /><p>Даты</p></div>
					<div className="at__menu-button" onClick={this.toProfile} ><ProfileIcon /><p>Профиль</p></div>
				</div>
			</div>
		)
	}
}

