import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import '../../../styles/ui/at-tags.scss'

import closeIco from '../../../images/close.svg'

export default class AtTags extends React.Component {
	container = React.createRef()
	state = {}

	constructor(props) {
		super(props);
		console.log(props);
	}
	componentDidMount() {}
	componentDidUpdate() {}

	onResize = (e) => {}

	
	render() {
		const classnames = classNames({
			"at__tags" : true
		})

		return (
			<div className={classnames} ref={this.container} >
				{
					this.props.tags.map((tag, i) => {
						return <div className="at__tag" key={i} >{tag}<img src={closeIco} className="at__at-work__loader-loader-bk" /></div>
					})
				}
			</div>
		)
	}
}

