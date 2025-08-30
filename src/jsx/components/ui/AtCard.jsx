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
	state = {
		loading : false,
		selected : false
	}

	constructor(props) {
		super(props);
		console.log(props);
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
			<div className={classnames} ref={this.container} onClick={this.props.data.click}>
				<div className="at__card__content-container" >
					<div className="at__card__label">
						<div className="at__card__ico">ICO</div>
						<div className="at__card__title">Title</div>
					</div>
					<div className="at__card__content">
						lalalalala
					</div>
				</div>
				<NodeResizer minWidth={100} minHeight={30} />
				<Handle type="target" position="left" />
				<Handle type="source" position="right" />
			</div>
		)
	}
}

