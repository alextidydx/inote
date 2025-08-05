import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import moment from 'moment';
import '../../../styles/ui/WidgetVoice.scss'

import DotsIcon from '../../../icons/dots-v.svg?react'
import SoundMock from '../../../icons/sound-mock.svg?react'
import Bubble from './Bubble';
import Timer from '../utils/Timer.jsx'

export default class WidgetVoice extends React.Component {
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
	recognizeItem = (e) => {
		if (this.props.recognizeItem) {
			e.stopPropagation();
			this.props.recognizeItem(this.props.data.id);
		} 
		$(this.container.current).find(".at__widget-voice__value").slideToggle();
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
			"at__widget-voice--recognized" : !this.props.data.recognized,
			"at__widget-voice" : true
		})
		
		return (
			<div className={classnames} ref={this.container}>
				{
					(this.props.data.canRemove || !this.props.data.recognized) ?
						<div className="at__widget-dots" >
							<DotsIcon onClick={this.selectItem} />
							<Bubble active={this.props.selected} key={this.props.data.id} >
								{
									(this.props.data.canRemove) ?
										<div className="at__bubble-delete" onClick={this.deleteItem}>Удалить</div>
									:
										<></>
								}
								
								{
									(!this.props.data.recognized) ?
										<div className="at__bubble-normal" onClick={this.recognizeItem}>В текст</div>
									:
										<></>
								}
							</Bubble>
						</div>
					:
						<></>
				}
				<div className="at__widget-voice__mock"><SoundMock /></div>
				<div className="at__widget-voice__value">{this.props.data.text}</div>
				<div className="at__widget-voice__date">{moment(this.props.data.created).format("DD/MM/YYYY")}</div>
			</div>
		)
	}
}

