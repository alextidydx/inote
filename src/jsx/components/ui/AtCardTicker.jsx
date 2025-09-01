import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import '../../../styles/ui/at-card.scss'
import '../../../styles/ui/at-card-ticker.scss'

//embedded images
import loader from '../../../images/loader.svg'
import loaderBK from '../../../images/loader-bk.svg'

import AtTags from './AtTags';

import TickerIcon from '../../../images/note-ticker.svg?react'
import ForwardIco from '../../../images/forward.svg?react'

// state
import ReactFlow, {
	Handle,
	NodeResizer
} from 'reactflow';


export default class AtCardTicker extends React.Component {
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
		
	}

	expand = (e) => {
		this.parentNode.css({ height : this.getExpandedHight() + "px" });
		this.setState({ overflow : false });
	}

	getExpandedHight = (e) => {
		// Trunc
		let currentDOM = $(this.container.current);
		let descDOM = currentDOM.find(".at__card__content");
		let textDOM = descDOM.find(".at__card__content-wrapper");
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
			"at__card-ticker" : true,
			"at__card--active" : this.state.loaded,
			"at__card--overflow" : this.state.overflow,
			"at__card--resizing" : this.state.resizing,
			"at__card--dragging" : this.props.dragging
		})

		return (
			<div className={classnames} ref={this.container} onClick={this.props.data.click}>
				<div className="at__card__content-container" >
					<div className="at__card__label">
						<div className="at__card__ico"><TickerIcon /></div>
						<div className="at__card__title">{ this.props.data.title }</div>
					</div>
					<div className="at__card__content">
						<div className="at__card__content-wrapper">
							<div className="at__card-ticker__img" style={{ backgroundImage: "url(" + this.props.data.imgSrc + ")" }}></div>
						</div>
					</div>
					<div className="at__card__content-overflow" onClick={this.expand}>...</div>
					<div className="at__card__content-tags"><AtTags tags={this.props.data.tags} /></div>
				</div>
				<div className="at__card__date">{ this.props.data.date }</div>
				<NodeResizer minWidth={100} minHeight={30} onResize={this.onResize} onResizeStart={this.onResizeStart} onResizeEnd={this.onResizeEnd} />
				<Handle type="target" position="left" />
				<Handle type="source" position="right" />
			</div>
		)
	}
}

