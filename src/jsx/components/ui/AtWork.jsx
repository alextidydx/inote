import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import Timer from '../utils/Timer.jsx'

import '../../../styles/ui/at-work.scss'

//embedded images
import loader from '../../../images/loader.svg'
import loaderBK from '../../../images/loader-bk.svg'


// state


export default class AtWork extends React.Component {
	timer = null
	container = React.createRef()
	state = {
		loading : false,
		loaded : false
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

	imageLoaded = (e) => {
		this.setState({ loaded: true });
		if (e.type == "error") {
			console.log("Error", e);
			let url = e.target.src;
			e.target.src = "";
			$(e.target).trigger('load');
			e.target.src = url;
			$(e.target).trigger('load');
		}
	}
	imageError = (e) => {
		console.log("imageError", e.target);
		
	}
	
	render() {
		// travolta
		let anim = (this.props.data.anim == "" ) ?  { backgroundImage: "url('assets/images/works/test.gif')" }  :  {};
		let link = "/work/" + this.props.data.slug;
		let target = "_self";
		if (this.props.data.outsideUrl) {
			link = this.props.data.outsideUrl;
			target = "_blank";
		}

		const classnames = classNames({
			"at__at-work__container" : true,
			"at__at-work__container--loaded" : this.state.loaded,
			"at__at-work__container--loading" : this.state.loading
		})

		return (
			<div className={classnames} ref={this.container}>
				<Link className="at__at-work" alt={this.props.data.name} to={link} target={target}  >
					<div className="at__at-work__loader">
							<img src={loaderBK} className="at__at-work__loader-loader-bk" />
							<img src={loader} className="at__at-work__loader-loader-circle" />
					</div>
					<div className="at__at-work__thumb">
						<img src={this.props.data.imgPreview} onLoad={this.imageLoaded} onError={this.imageLoaded} />
					</div>
					<div className="at__at-work__anim" style={anim}>
						{
							(this.props.data.vidPreview != "" ) ?
								<video loop autoPlay muted className="at__at-work__video">
									<source src={this.props.data.vidPreview } type="video/mp4" />
								</video>
							:
								<></>
						}
						
					</div>

					<div className="at__at-work__overlay" ></div>

					<div className="at__at-work__title">
						<div className="at__at-work__title-name">{this.props.data.title}</div><br/>
						<div className="at__at-work__tags">{this.props.data.tags}</div>
					</div>
				</Link>
			</div>
		)
	}
}

