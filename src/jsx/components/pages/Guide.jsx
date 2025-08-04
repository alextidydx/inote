import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import $ from "jquery";

import { useState } from 'react'
import '../../../styles/pages/Guide.scss'
import '../../../styles/ui/slick/slick.min.css'
import '../../../styles/ui/slick/slick-theme.min.css'
import ReactArrow from '../../../icons/arrow.svg?react'




const cards = [
	{
		id : 0,
		title : "Давайте знакомиться!",
		img : "./assets/images/guide/step-1.png",
		desc : "Я универсальная и умная записная книжка, которая поможет вам вести ваши сделки."
	},
	{
		id : 1,
		title : "Я слежу за всем",
		img : "./assets/images/guide/step-2.png",
		desc : "Мои друзья агенты информируют меня о событиях на рынках и я будут с делиться вами."
	},
	{
		id : 2,
		title : "Я всегда с вами",
		img : "./assets/images/guide/step-3.png",
		desc : "Я смогу заменить много других приложений и помочь вам сфокусировать."
	}
];


export default (props) => (
    <Guide {...props} payload={useParams()} history={useLocation()} navigate={useNavigate()} />
);


import Slider from "react-slick";




class Guide extends React.Component {
	state = {
		currentCard : 0
	}
	minSwipeDistance = 50

	constructor(props) {
		super(props);
		this.container = React.createRef()
		
		
	}
	componentDidMount() {
		
	}
	componentDidUpdate() {
		this.printVars();
		this.checkSlug();
	}
	
	checkSlug = () => {

	}



	printVars = () => {
		return 0;
		console.log("Settings", this.props.settings);
		console.log("Payload", this.props.payload);
		console.log("Location", this.props.history);		
	}


	//swipe events
	onTouchStart = (e) => {
		setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX)
	}

	onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

	onTouchEnd = () => {
		if (!touchStart || !touchEnd) return
		const distance = touchStart - touchEnd
		const isLeftSwipe = distance > minSwipeDistance
		const isRightSwipe = distance < -minSwipeDistance
		if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
		// add your conditional logic here
	}

	goToApp = () => {
		this.props.navigate("/feed");
	}

    render() {
    	var sliderSettings = {
			dots: true,
			infinite: false,
			arrows: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};



		return (
		<>

			<div className="at__guide-container" ref={this.container} >
				
				{
					(cards.length > 0) ?
						<>	
							<Slider {...sliderSettings} className="at__guide-cards" >
								{
									cards.map((card,i) => {
										return <div className="at__guide-card" key={i}>
											<div className="at__guide-card__image"><img src={card.img} className="at__guide-card__image-img" /></div>
											<h1>{card.title}</h1>
											<div className="at__guide-card__desc">{card.desc}</div>
										</div>
									})
								}
							</Slider>
							<div className="at__button_container">
								<button className="at__button" type="submit" onClick={this.goToApp}>К приложению <ReactArrow /></button>
							</div>
						</>
					:
						<p>Nothing to show</p>
				}
			</div>
		</>
		)
	}
}