import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import moment from 'moment';
import '../../../styles/ui/WidgetChart.scss'

import DotsIcon from '../../../icons/dots-v.svg?react'
import PickIcon from '../../../icons/expand-collapse.svg?react'
import Bubble from './Bubble';
import TradingViewWidget from './TradingViewWidget';
import Timer from '../utils/Timer.jsx'

export default class WidgetChart extends React.Component {
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
			"at__widget-chart--collapsed" : this.props.data.collapsed,
			"at__widget-chart" : true
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
				<div className="at__widget-chart__header"><PickIcon onClick={this.toggleChart} /><p>{this.props.data.ticker}</p> <p>{this.props.data.value}</p></div>
				<div className="at__widget-chart__value"><TradingViewWidget /></div>
				<div className="at__widget-chart__date">{moment(this.props.data.created).format("DD/MM/YYYY")}</div>
			</div>
		)
	}
}

