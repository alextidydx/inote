import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import '../../../styles/ui/Bubble.scss'

export default class Bubble extends React.Component {
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
	
	selectItem = () => {
		console.log(this.props);
	}
	
	render() {
		// travolta
		const classnames = classNames({
			"at__bubble" : true,
			"at__bubble--active" : this.props.active
		})
		
		return (
			<div className={classnames} ref={this.container}>
				{this.props.children}
			</div>
		)
	}
}

