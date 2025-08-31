import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import $ from "jquery";
import { useState } from 'react'
import Timer from '../utils/Timer.jsx'

//styles
import 'reactflow/dist/base.css';
import '../../../styles/ui/at-board.scss'


//embedded images
import loader from '../../../images/loader.svg'
import loaderBK from '../../../images/loader-bk.svg'




import ReactFlow, {
	addEdge,
	applyNodeChanges,
	applyEdgeChanges,
	Background,
	Position,
	Controls,
} from 'reactflow';
// custom nodes
import AtCard from './AtCard';

const nodeTypes = {
	simepleCard: AtCard,
};




export default class AtBoard extends React.Component {
	state = {
		nodes : this.props.AppState.nodes,
		edges : this.props.AppState.edges,
		selectedNodes: [],
		smoothZoom : false
    }
	container = React.createRef()
	controls = null
	appData = null

	constructor(props) {
		super(props);
		$(window).resize(this.onResize);
		this.appData = this.props.AppState;
	}
	onResize = (e) => {}

	componentDidMount() {
		this.onResize();
		
	}
	componentDidUpdate() {
		console.log("componentDidUpdate");
	}
	setHTMLData = (_data) => {
		$(this.htmlContainer.current).html(_data);
		$(this.htmlContainer.current).scrollTop(0);
		this.setImgOnLoad();
	}

	// Handle node changes
	onNodesChange = (changes) =>  {
		//console.log("onNodesChange", changes);
		this.setState((prevState) => ({
			nodes: applyNodeChanges(changes, prevState.nodes),
		}));
		/* Remove
		[
		    {
		        "id": "2",
		        "type": "remove"
		    },
		    {
		        "id": "3",
		        "type": "remove"
		    }
		]
		*/
		let toDelete = changes.filter(node => node.type == "remove");
		if (toDelete.length > 0) {
			this.appData.removeNodes(toDelete);
		}

		/* Position
		 [
		    {
		        "id": "2",
		        "type": "position",
		        "dragging": false
		    },
		    {
		        "id": "3",
		        "type": "position",
		        "dragging": false
		    }
		]
		*/
		let toMoveIds = changes.map(item => item.id);
		let toMove = this.state.nodes.filter(node => toMoveIds.includes(node.id));
		if (toMove.length > 0) {
			this.appData.changeNodesPositions(toMove);
		}

		
	}

	// Handle edge changes
	onEdgesChange = (changes) =>  {
		//console.log("onEdgesChange", changes);
		this.setState((prevState) => ({
			edges: applyEdgeChanges(changes, prevState.edges),
		}));

		/* Delete
		[
		    {
		        "id": "e1-2",
		        "type": "remove"
		    },
		    {
		        "id": "e2-1",
		        "type": "remove"
		    }
		]
		*/
		let toDelete = changes.filter(edge => edge.type == "remove");
		//console.log("Delete edges", toDelete);
		if (toDelete.length > 0) {
			this.appData.removeEdges(toDelete);
		}

	}

	// Handle new connections
	onConnect = (params) =>  {
		//console.log("onConnect", params);
		this.setState((prevState) => ({
			edges: addEdge(params, prevState.edges),
		}));

		/*
		{
		    "type": "step",
		    "source": "1",
		    "sourceHandle": null,
		    "target": "2",
		    "targetHandle": null
		}
		*/

		// check if we already have the same edge
		this.appData.addEdge(params);
	}

	// Handle node click
	onNodeClick = (event, node) => {
		//console.log('Node clicked:', node);
		// Update node label on click
		this.setState((prevState) => ({
			nodes: prevState.nodes.map((n) =>
				n.id === node.id ? { ...n, data: { ...n.data, label: `${n.data.label} (Clicked)` } } : n
			),
		}));
	}

	onSelectionChange = (nodes) => {
		//console.log('Selected nodes:', nodes.map((node) => node.id));
		this.setState({
			selectedNodes: nodes.map((node) => node.id)
		});
	}


	addSmoothZoom = (nodes) => {
		console.log("smooth");
		this.setState({ smoothZoom: true })
	}
	removeSmoothZoom = (nodes) => {
		console.log("not smooth");
		this.setState({ smoothZoom: false })
	}

	handleInit = (e) => {
		//smooth zoom
		this.controls = $(this.container.current).find(".react-flow__controls");
		console.log("this.controls", this.controls);
		this.controls.mouseenter(this.addSmoothZoom).mouseleave(this.removeSmoothZoom);
	} 
	

	render() {
		const { nodes, edges } = this.state;
		const classnames = classNames({
			"at__board" : true,
			"at__board--smooth" : this.state.smoothZoom
		})
		return (
			<div className={classnames} ref={this.container} >
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					onNodesChange={this.onNodesChange}
					onEdgesChange={this.onEdgesChange}
					onInit={this.handleInit}
					onConnect={this.onConnect}
					onNodeClick={this.onNodeClick}
					defaultEdgeOptions={{ type: 'step' }}
					minZoom={0.5}
					maxZoom={1.3}
					selectionOnDrag={true} // Enable rectangle selection
          			deleteKeyCode={'Delete'}
          			panOnDrag={[1]}
					fitView
				>
					<Background />
					<Controls />
				</ReactFlow>
			</div>
		)
	}
}

