import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import '../../../styles/ui/at-card.scss'

//embedded images
import loader from '../../../images/loader.svg'
import loaderBK from '../../../images/loader-bk.svg'


// state
import ReactFlow, {
	Handle,
	NodeResizer
} from 'reactflow';


export default class AtCard extends React.Component {
	timer = null
	container = React.createRef()
	parentNode = null
	state = {
		loading : false,
		selected : false,
		overflow :false
	}

	constructor(props) {
		super(props);
		console.log(props);
	}
	componentDidMount() {
		this.parentNode = $(this.container.current).parent();
		this.onResize();
	}
	componentDidUpdate() {}

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
		this.onResize();
	}

	getExpandedHight = (e) => {
		// Trunc
		let currentDOM = $(this.container.current);
		let descDOM = currentDOM.find(".at__card__content");
		let textDOM = descDOM.find("p");
		let delta = textDOM.outerHeight() - descDOM.outerHeight() + 23;
		return (this.parentNode.outerHeight() + delta);
	}

	
	render() {
		

		const classnames = classNames({
			"at__card" : true,
			"at__card--active" : this.state.loaded,
			"at__card--overflow" : this.state.overflow
		})

		return (
			<div className={classnames} ref={this.container} onClick={this.props.data.click}>
				<div className="at__card__content-container" >
					<div className="at__card__label">
						<div className="at__card__ico">ICO</div>
						<div className="at__card__title">{ this.props.data.title }</div>
					</div>
					<div className="at__card__content"><p>{ this.props.data.description }</p></div>
					<div className="at__card__content-overflow" onClick={this.expand}>...</div>
				</div>
				<div className="at__card__date">{ this.props.data.date }</div>
				<NodeResizer minWidth={100} minHeight={30} onResize={this.onResize}  />
				<Handle type="target" position="left" />
				<Handle type="source" position="right" />
			</div>
		)
	}
}

