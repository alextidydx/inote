import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, Link } from "react-router-dom"
import $ from "jquery";

import { useState } from 'react'
import '../../../styles/ui/Home.scss'

//componentsfff
import AtWork from './../ui/AtWork.jsx'
import AtPreview from './../ui/AtPreview.jsx'

//embedded images
import nppLogo from '../../../images/logo.svg'

export default (props) => (
    <Home {...props} payload={useParams()} history={useLocation()} />
);



class Home extends React.Component {

	worksData = null
	container = null
	preview = null
	previewActive = false
	works = {
		dataJSON : null,
		currentWork : null
	}

	constructor(props) {
		super(props);
		this.container = React.createRef();
		this.preview = React.createRef();
		this.loadWorksData();

		
	}
	componentDidMount() {
		setTimeout(() => {
			$(this.container.current).find(".at__works").addClass("at__works--show");
			this.checkSlug();
		}, 100);
	}
	componentDidUpdate() {
		this.printVars();
		this.checkSlug();
	}
	
	checkSlug = () => {
		// check works
		let foundWork = this.works.dataJSON.some((obj) => {
			if (this.props.history.pathname.indexOf(obj.slug) >= 0) {
				this.showWork(obj);
				return true;
			}
		});
		if ((!foundWork) && (this.previewActive)) {
			this.preview.current.hideWork();
		}
	}



	printVars = () => {
		return 0;
		console.log("Settings", this.props.settings);
		console.log("Payload", this.props.payload);
		console.log("Location", this.props.history);		
	}

	// works functionality
	loadWorksData = () => {
		// get works data
		this.works.dataJSON = JSON.parse($('#data-obj').html());
		this.works.dataJSON.forEach(function(obj, i) {
			obj.domObj = React.createRef();
		});
	}
	showWork = (_work) => {
		gtag('event', 'work_view', { 'a_work': _work.title });
		this.works.currentWork = _work;
		this.works.currentWork.domObj.current.showLoading();
		this.preview.current.showWork(_work);
		this.previewActive = true;
		this.lock();
	}
	hideWork = () => {
		this.previewActive = false;
		this.works.currentWork.domObj.current.hideLoading();
		this.unlock();
		this.works.currentWork = null;
	}	

	lock = () => {
		$(document.body).addClass("at__body--locked");
	}	
	unlock = () => {
		$(document.body).removeClass("at__body--locked");
	}	

	// main animation functionality
	startAnimation = () => {}
	stopAnimation = () => {}	

    render() {
    	let Preview = this.preview;
		return (
		<>
			<div className="at__main-container" ref={this.container}>
				<div className="at__firstscreen">
					<div className="at__logo">
							<img src={nppLogo} alt="AT logo" />
					</div>
					<div className="at__description">
						<div className="at__description-strike">
							<span className="at__description-word-1">Alex </span>
							<span className="at__description-word-2">Tidy</span>
							<span className="at__description-word-3">
								<span className="at__description-cursor">|</span>
							</span>
							</div>
						<div className="at__description-tech"> &lt; Design with mathematical precision &gt;</div>
						<div className="at__description-contacts">
							<a className="at__description-mail" href="mailto:q@alextidydx.com">q@alextidydx.com</a>
						</div>
					</div>
				</div>
				<div className="at__clients at__description-word-6">
					<div>
						<img src="/assets/images/clients_0.png" className="at__clients-img" />
						<img src="/assets/images/clients_1.png" className="at__clients-img" />
						<img src="/assets/images/clients_2.png" className="at__clients-img" />
					</div>
				</div>
				<div className="at__skills ">
					<div className="at__skills__container__skill at__description-word-7">
						<img className="skills__container__skill__icon" src="/assets/images/skills-1.svg"/>
						<div className="skills__container__skill__title">Strategy and Research</div>
						<div className="skills__container__skill__description">Boosting products by digging into research and using business analysis tricks.</div>
					</div>
					<div className="at__skills__container__skill at__description-word-8">
						<img className="skills__container__skill__icon" src="/assets/images/skills-2.svg"/>
						<div className="skills__container__skill__title">Design and Prototype</div>
						<div className="skills__container__skill__description">Designing mockups and animations, developing hi-fi ReactJS,  Figma prototypes. Find a link on the sidebar in the cases.</div>
					</div>
					<div className="at__skills__container__skill at__description-word-9">
						<img className="skills__container__skill__icon" src="/assets/images/skills-3.svg"/>
						<div className="skills__container__skill__title">Illustrations and 3D</div>
						<div className="skills__container__skill__description">Creating crisp visuals with a bunch of artsy tools.</div>
					</div>
				</div>
				<div className="at__works">
					<div className="at__works-cont">
						<div className="at__works-line at__works-line--2">
							<AtWork data={this.works.dataJSON[9]} showW={this.showWork} ref={this.works.dataJSON[9].domObj} />
							<AtWork data={this.works.dataJSON[1]} showW={this.showWork} ref={this.works.dataJSON[1].domObj} />
						</div>
						<div className="at__works-line at__works-line--32">
							<AtWork data={this.works.dataJSON[2]} showW={this.showWork} ref={this.works.dataJSON[2].domObj} />
							<AtWork data={this.works.dataJSON[0]} showW={this.showWork} ref={this.works.dataJSON[0].domObj} />
							<AtWork data={this.works.dataJSON[4]} showW={this.showWork} ref={this.works.dataJSON[4].domObj} />
						</div>
						<div className="at__works-line at__works-line--4">
							<AtWork data={this.works.dataJSON[3]} showW={this.showWork} ref={this.works.dataJSON[3].domObj} />
							<AtWork data={this.works.dataJSON[6]} showW={this.showWork} ref={this.works.dataJSON[6].domObj} />
							<AtWork data={this.works.dataJSON[7]} showW={this.showWork} ref={this.works.dataJSON[7].domObj} />
							<AtWork data={this.works.dataJSON[8]} showW={this.showWork} ref={this.works.dataJSON[8].domObj} />
						</div>
					</div>
					<div className="at__logo at__logo--bottom">
							<img src={nppLogo} alt="AT logo" />&nbsp;&nbsp;Alexander Tidy, 2025
					</div>
				</div>

				<AtPreview ref={this.preview}  hideW={this.hideWork} />
			</div>
		</>
		)
	}
}