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
	Handle
} from 'reactflow';


export default class AtCard extends React.Component {
	timer = null
	container = React.createRef()
	state = {
		loading : false,
		selected : false
	}

	constructor(props) {
		super(props);
	}
	componentDidMount() {}
	componentDidUpdate() {}

		
	showLoading = () => {
		this.setState({ loading: true });
	}

	hideLoading = () => {
		this.setState({ loading: false });
	}

	
	render() {
		

		const classnames = classNames({
			"at__card" : true,
			"at__card--active" : this.state.loaded
		})

		return (
			<div className={classnames} ref={this.container}>
				cardssssss
				<Handle type="target" position="left" />
				<Handle type="source" position="right" />
			</div>
		)
	}
}

