import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, Link } from "react-router-dom"
import $ from "jquery";

import { useState } from 'react'
import '../../../styles/ui/Home.scss'



export default (props) => (
    <Home {...props} payload={useParams()} history={useLocation()} />
);



class Home extends React.Component {

	worksData = null
	container = null
	preview = null
	previewActive = false
	works = {
		dataJSON : null,
		currentWork : null
	}

	constructor(props) {
		super(props);
		this.container = React.createRef();
	}

	componentDidMount() {}
	componentDidUpdate() {
		this.printVars();
		this.checkSlug();
	}
	
	checkSlug = () => {}



	printVars = () => {
		return 0;
		console.log("Settings", this.props.settings);
		console.log("Payload", this.props.payload);
		console.log("Location", this.props.history);		
	}

	// works functionality
	loadWorksData = () => {
		// get works data
		this.works.dataJSON = JSON.parse($('#data-obj').html());
		this.works.dataJSON.forEach(function(obj, i) {
			obj.domObj = React.createRef();
		});
	}
	showWork = (_work) => {}
	hideWork = () => {}	

	lock = () => {
		$(document.body).addClass("at__body--locked");
	}	
	unlock = () => {
		$(document.body).removeClass("at__body--locked");
	}	

	// main animation functionality
	startAnimation = () => {}
	stopAnimation = () => {}	

    render() {
		return (
		<>
			<div className="at__home" ref={this.container}>
				<div className="at__home__menu-l" >
					<img src="/assets/images/menu-left-top.png" />
					<img src="/assets/images/menu-left-bottom.png"  />
				</div>
				<div className="at__home__block-r" >
					<div className="at__home__menu-t" >
						<img src="/assets/images/menu-top-left.png" />
						<img src="/assets/images/menu-top-right.png"  />
					</div>
					<div className="at__home__diagram" >

					</div>
				</div>
			</div>
		</>
		)
	}
}