import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import Timer from '../utils/Timer.jsx'

import '../../../styles/ui/at-work-preview.scss'

//embedded images
import loader from '../../../images/loader.svg'
import loaderBK from '../../../images/loader-bk.svg'


// state


export default class AtPreview extends React.Component {
	state = {
		active : false
	}
	timer = null

	overlayTimer = null
	container = React.createRef()
	htmlContainer = React.createRef()
	descContainer = React.createRef()
	previewAttr = {
		width : "",
		height : "",
		top : '',
		left : '',
		opacity : ""
	}
	currentWork = null

	constructor(props) {
		super(props);
		
		// rollover timer
		this.timer = new Timer(1, 60);
		this.timer.finished = this.workRollOver;
		$(window).resize(this.onResize);
	}
	onResize = (e) => {
		$(this.container.current).css({ width : $(window).width() + 'px'});
	}

	componentDidMount() {
		this.onResize();
	}
	componentDidUpdate() {

	}

	/// need tap with setTimeOut clear
	showWork = (_work, _firstTime) => {
		if (this.state.active) return false;
		this.setState({ active: true });
		this.currentWork = _work;

		let thumbContainer = _work.domObj.current.container.current;
		$(this.container.current).removeClass("at__at-work__preview--active");
		if (!_firstTime) {
			//set initial pos
			$(this.container.current).css({
				transition : "none",
				top : Math.trunc(thumbContainer.offsetTop - $(window).scrollTop() + thumbContainer.getBoundingClientRect().height*0.5) + 'px',
				left : Math.trunc(thumbContainer.offsetLeft - $(window).scrollLeft() + thumbContainer.getBoundingClientRect().width*0.5) + 'px'
			});
		} else {

		}
		 
		this.timer.reset();
		this.timer.start();




		return false;
	}
	hideWork = () => {
		this.setState({
			active: false
		});
		let thumbContainer = this.currentWork.domObj.current.container.current;
		$(this.container.current).css({
			top : (thumbContainer.offsetTop - $(window).scrollTop() + thumbContainer.getBoundingClientRect().height*0.5) + 'px',
			left : (thumbContainer.offsetLeft - $(window).scrollLeft() + thumbContainer.getBoundingClientRect().width*0.5) + 'px'
		});
		this.timer.reset();
		this.timer.start();

		return false;
	}

	workRollOver = (_timer) => {
		if (this.state.active) {
			$(this.container.current).addClass("at__at-work__preview--active");
			$(this.container.current).css({
				transition : "",
				left : "",
				top : ""
			});

			this.setHTMLData(this.currentWork.html);
			// start work animation module
			if (window.ATWorkModule) {
				window.ATWorkModule.start();
			}
			
		} else {
			let thumbContainer = this.currentWork.domObj.current.container.current;
			$(this.container.current).css({
				transition : "",
				top : (thumbContainer.offsetTop - $(window).scrollTop() + thumbContainer.getBoundingClientRect().height*0.5) + 'px',
				left : (thumbContainer.offsetLeft - $(window).scrollLeft() + thumbContainer.getBoundingClientRect().width*0.5) + 'px'
			});
			$(this.container.current).removeClass("at__at-work__preview--active");
			// stop work animation module
			if (window.ATWorkModule) {
				window.ATWorkModule.stop();
				window.ATWorkModule = null;
			}
			if (this.props.hideW) { this.props.hideW(); }
		}
	}

	setHTMLData = (_data) => {
		$(this.htmlContainer.current).html(_data);
		$(this.htmlContainer.current).scrollTop(0);
		this.setImgOnLoad();
	}

	setImgOnLoad = () => {
		$(this.htmlContainer.current).find("img").one("load", (e) => {
				// do stuff
				$(e.target).addClass("at__at-work__preview__projimg--loaded");
			}).each(function() {
				if(this.complete) {
					//$(this).load(); // For jQuery < 3.0 
					$(this).trigger('load'); // For jQuery >= 3.0 
				}
		});
	}

	clearHTMLData = () => {

	}


	
	render() {

		return (
			<div className="at__at-work__preview" ref={this.container} >
				{
					(this.currentWork) ?
					<div className="at__at-work__preview-holder" >
						<div className="at__at-work__preview-html" ref={this.htmlContainer}></div>
						<div className="at__at-work__preview-side" ref={this.descContainer}>
							<Link to="/" className="at__at-work__preview-back" ><div className="at__icon-back"></div> Back to Works</Link>
							<div className="at__at-work__preview-side-title">{this.currentWork.title}</div>
							<div className="at__at-work__preview-side-tags">{this.currentWork.tags}</div>
							<div className="at__at-work__preview-side-desc" dangerouslySetInnerHTML={{__html: this.currentWork.description }} ></div>
						</div>
					</div>
					:
						<></>
				}
			</div>
		)
	}
}

