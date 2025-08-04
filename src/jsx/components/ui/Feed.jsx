import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom"
import classNames from "classnames";
import $ from "jquery";
import moment from 'moment';
import update from 'react-addons-update';
import { useState } from 'react'
import '../../../styles/ui/Feed.scss'

import Menu from '../ui/Menu';
import WidgetText from '../ui/WidgetText';



export default class  Feed extends React.Component {
	state = {
		notes : null,
		selectedItem : -1
	}
	constructor(props) {
		super(props);
		this.container = React.createRef();

	}
	componentDidMount() {
		this.setState({ 
			notes : this.props.notes
		});
		this.checkBubbleScroll();
		$(this.container.current).bind( "scroll", this.checkBubbleScroll );

	}
	componentDidUpdate() {
		this.printVars();
		this.checkSlug();
		this.checkBubbleScroll();
	}
	componentWillUnmount() {
		$(this.container.current).unbind( "scroll", this.checkBubbleScroll );
	}

	checkSlug = () => {

	}

	checkBubbleScroll = () => {
		// check bubbles and their position in the viewport
		var elems = $(this.container.current).find(".at__widget");
		elems.map((i, elem) => { 
			let widget = $(elem);
			var eTop = widget.offset().top;
			if (eTop > $(window).height() * 0.5) {
				widget.addClass("at__widget--top");
				widget.removeClass("at__widget--bottom");
			} else {
				widget.removeClass("at__widget--top");
				widget.addClass("at__widget--bottom");
			}
		});
	}
	

	printVars = () => {
		return 0;
		console.log("Settings", this.props.settings);
		console.log("Payload", this.props.payload);
		console.log("Location", this.props.history);		
	}

	checkSelection = (id) => {
		if (id == this.state.selectedItem){
			this.setState({ 
				selectedItem : -1
			});
			return -1;
		} 
		this.setState({ 
			selectedItem : id
		});
	}

	deleteItem = (id) => {
		let elemWithId = -1;
		elemWithId = this.state.notes.findIndex(x => x.id === id);
		if ((elemWithId == undefined) || (elemWithId == -1)) return 0;

		this.setState({
			selectedItem : -1,
			notes: update(this.state.notes, { [elemWithId]: { display: {$set: false} }})
		})
	}

    render() {
		// travolta
		const classnames = classNames({
			"at__feed" : true
		})
		
		return (
			<div className={classnames} ref={this.container} onClick={() => { this.checkSelection(-1) } }>
				{
					(this.state.notes) ?
						this.state.notes.map((widget, i) => {
							let object = null;
							if (widget.type == "text") object = WidgetText; 

							return <WidgetText 
								key={widget.id} 
								data={widget} 
								selected={i == this.state.selectedItem} 
								showDots={this.checkSelection}
								deleteItem={this.deleteItem}
							 />
						})
					:
						<p>Ничего нет</p>
				}
			</div>
		)
	}
}