import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import moment from 'moment';
import '../../../styles/ui/WidgetImage.scss'

import DotsIcon from '../../../icons/dots-v.svg?react'
import Bubble from './Bubble';
import Timer from '../utils/Timer.jsx'

export default class WidgetImage extends React.Component {
	container = React.createRef()
	timer = null
	state = {};
	

	constructor(props) {
		super(props);
		//custom_modified
	}
	componentDidMount() {
		this.timer = new Timer(1, 100);
		this.timer.finished = this.deleteItemHideCallback;
	}
	componentDidUpdate() {
	}
	
	selectItem = (e) => {
		if (this.props.showDots) {
			e.stopPropagation();
			this.props.showDots(this.props.data.id);
		} 
	}

	deleteItem = (e) => {
		if (this.props.deleteItem) {
			e.stopPropagation();
			this.props.deleteItem(this.props.data.id);
		} 
		$(this.container.current).css( { height : $(this.container.current).height() + 'px' } );
		this.timer.start();
	}
	toggleChart = (e) => {
		if (this.props.toggleChart) {
			e.stopPropagation();
			this.props.toggleChart(this.props.data.id);
		} 
		$(this.container.current).find(".at__widget-chart__value").slideToggle();
	}

	deleteItemHideCallback = () => {
		$(this.container.current).css( { height : '0px' } );
	}
	
	render() {
		// travolta
		const classnames = classNames({
			"at__widget" : true,
			"at__widget--selected" : this.props.selected,
			"at__widget--deleted" : !this.props.data.display,
			"at__widget-image--fullsize" :  !this.props.data.canRemove,
			"at__widget-image" : true
		})
		
		return (
			<div className={classnames} ref={this.container}>
				{
					(this.props.data.canRemove) ?
						<div className="at__widget-dots" >
							<DotsIcon onClick={this.selectItem} />
							<Bubble active={this.props.selected} key={this.props.data.id} >
								<div className="at__bubble-delete" onClick={this.deleteItem}>Удалить</div>
							</Bubble>
						</div>
					:
						<></>
				}
				<div className="at__widget-image__header"></div>
				<div className="at__widget-image__value"  style={{ paddingTop : this.props.data.padding }} ><img src={this.props.data.url}/></div>
				{
					(this.props.data.canRemove) ?
						<div className="at__widget-image__date">{moment(this.props.data.created).format("DD/MM/YYYY")}</div>
					:
						<></>
				}
			</div>
		)
	}
}

