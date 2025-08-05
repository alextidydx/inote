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

import VoiceIcon from '../../../icons/mic.svg?react'
import TextIcon from '../../../icons/text.svg?react'
import PhotoIcon from '../../../icons/image.svg?react'
import CloseIcon from '../../../icons/close.svg?react'

export default class Menu extends React.Component {
	container = React.createRef()
	state = {
		showCreate : false
	};
	

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
	toggleCreate = () => {
		this.setState({
			showCreate : !this.state.showCreate
		})
	}
	
	render() {
		// travolta
		const classnames = classNames({
			"at__menu" : true,
			"at__menu--create" : this.state.showCreate,
		})
		
		return (
			<div className={classnames} ref={this.container}>
				<div className="at__menu-bar-container " >
					<div className="at__menu-button" onClick={this.toFeed} ><HomeIcon /><p>Фид</p></div>
					<div className="at__menu-button" onClick={this.toNotes} ><FolderIcon /><p>Заметки</p></div>
					<div className="at__menu-button at__menu-button--main" onClick={this.toggleCreate} ><PenIcon /><p>Написать</p></div>
					<div className="at__menu-button" onClick={this.toCalendar} ><CalIcon /><p>Даты</p></div>
					<div className="at__menu-button" onClick={this.toProfile} ><ProfileIcon /><p>Профиль</p></div>
				</div>
				<div className="at__menu-bar__create-container">
					<div className="at__menu-bar__create-btn"><VoiceIcon /></div>
					<div className="at__menu-bar__create-btn"><TextIcon /></div>
					<div className="at__menu-bar__create-btn"><PhotoIcon /></div>
					<div className="at__menu-button at__menu-button--main" onClick={this.toggleCreate} ><CloseIcon /><p>Закрыть</p></div>
				</div>
			</div>
		)
	}
}

