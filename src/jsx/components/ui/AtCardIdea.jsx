import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import '../../../styles/ui/at-card.scss'
import '../../../styles/ui/at-card-idea.scss'

//embedded images
import loader from '../../../images/loader.svg'
import loaderBK from '../../../images/loader-bk.svg'

import AtTags from './AtTags';

import IdeaIcon from '../../../images/note-idea.svg?react'


// state
import ReactFlow, {
	Handle,
	NodeResizer
} from 'reactflow';


export default class AtCardIdea extends React.Component {
	timer = null
	container = React.createRef()
	parentNode = null
	state = {
		loading : false,
		selected : false,
		overflow : false,
		resizing : false
	}

	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.parentNode = $(this.container.current).parent();
		this.onResize();
	}
	componentDidUpdate() {
	}

	onResize = (e) => {
		// Trunc
		let currentDOM = $(this.container.current);
		let descDOM = currentDOM.find(".at__card__content");
		let textDOM = descDOM.find("p");

		let isCurrentOverflow = false;
		if (descDOM.outerHeight() < textDOM.outerHeight()) {
			isCurrentOverflow = true;
		}

		if (this.state.overflow != isCurrentOverflow) this.setState({ overflow : isCurrentOverflow });

		this.parentNode.css({ "max-height" :  (this.getExpandedHight()-0.2) + "px" });

		return;
		/*
		let currentDOM = $(this.container.current);
		let textDOM = currentDOM.find("p");
		textDOM.text(this.props.data.description);
		var divh = currentDOM.height();
		while (textDOM.outerHeight() > Math.max(divh-23, 23)) {
		    textDOM.text(function (index, text) {
		    	let txt = text.replace(/\W*\s(\S)*$/, '...');
		        return txt;
		    });
		}*/
	}

	expand = (e) => {
		this.parentNode.css({ height : this.getExpandedHight() + "px" });
		this.setState({ overflow : false });
	}

	getExpandedHight = (e) => {
		// Trunc
		let currentDOM = $(this.container.current);
		let descDOM = currentDOM.find(".at__card__content");
		let textDOM = descDOM.find("p");
		let delta = textDOM.outerHeight() - descDOM.outerHeight() + 14;
		return (this.parentNode.outerHeight() + delta);
	}

	onResizeEnd = (e) => {
		this.setState({ resizing : false });
		this.parentNode.css( {transition : ""} );
		this.parentNode.css({ "max-height" :  this.getExpandedHight() + "px" });

	}

	onResizeStart = (e) => {
		this.setState({ resizing : true });
		this.parentNode.css( {transition : "none"}  );
	}
	
	render() {
		

		const classnames = classNames({
			"at__card" : true,
			"at__card--active" : this.state.loaded,
			"at__card--overflow" : this.state.overflow,
			"at__card--resizing" : this.state.resizing,
			"at__card--dragging" : this.props.dragging,

			"at__card-idea" : true
		})

		return (
			<div className={classnames} ref={this.container} onClick={this.props.data.click}>
				<div className="at__card__content-container" >
					<div className="at__card__label">
						<div className="at__card__ico"><IdeaIcon /></div>
						<div className="at__card__title">{ this.props.data.title }</div>
					</div>
					<div className="at__card__content"><p>{ this.props.data.description }</p></div>
					<div className="at__card__content-overflow" onClick={this.expand}>...</div>
					<div className="at__card__content-tags"><AtTags tags={this.props.data.tags} /></div>
				</div>
				<div className="at__card__date">{ this.props.data.date }</div>
				<NodeResizer minWidth={100} minHeight={30} onResize={this.onResize} onResizeStart={this.onResizeStart} onResizeEnd={this.onResizeEnd} />
				<div className="at__card-idea__bk-card-cont">
					<div className="at__card-idea__bk-card"></div>
					<div className="at__card-idea__bk-card"></div>
					<div className="at__card-idea__bk-card"></div>
				</div>
				<Handle type="target" position="left" />
				<Handle type="source" position="right" />


				
			</div>
		)
	}
}

