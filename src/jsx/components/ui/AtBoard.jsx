import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import Timer from '../utils/Timer.jsx'

import '../../../styles/ui/at-board.scss'

//embedded images
import loader from '../../../images/loader.svg'
import loaderBK from '../../../images/loader-bk.svg'


// state


export default class AtBoard extends React.Component {
	state = {}
	container = React.createRef()

	constructor(props) {
		super(props);
		$(window).resize(this.onResize);
	}
	onResize = (e) => {}

	componentDidMount() {
		this.onResize();
	}
	componentDidUpdate() {}

	setHTMLData = (_data) => {
		$(this.htmlContainer.current).html(_data);
		$(this.htmlContainer.current).scrollTop(0);
		this.setImgOnLoad();
	}

	
	render() {
		return (
			<div className="at__board" ref={this.container} >
				board
			</div>
		)
	}
}

