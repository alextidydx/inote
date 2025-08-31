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
	SelectionMode,
	Position,
	Controls,
} from 'reactflow';


// custom nodes
import AtCard from './AtCard';
import AtCardIdea from './AtCardIdea';

const nodeTypes = {
	simepleCard: AtCard,
	ideaCard: AtCardIdea
};




export default class AtBoard extends React.Component {
	state = {
		nodes : this.props.AppState.nodes,
		edges : this.props.AppState.edges,
		selectedNodes: [],
		smoothZoom : false,
		reactFlowInstance : null
    }
	container = React.createRef()
	controls = null
	appData = null
	isMac = false // used for controls
	aTimer = null

	constructor(props) {
		super(props);
		$(window).resize(this.onResize);
		this.appData = this.props.AppState;
		this.isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

		// animation timer
		this.aTimer = new Timer(30, 30);
		this.aTimer.progress = this.focusOnNodeProcess;
		this.aTimer.finished = this.focusOnNodeFinished;
	}
	onResize = (e) => {}
	componentDidMount() {this.onResize();}
	componentDidUpdate() {}

	//

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
		console.log('Node clicked:', node);
		// Update node label on click
		this.setState((prevState) => ({
			nodes: prevState.nodes.map((n) =>
				n.id === node.id ? { ...n, data: { ...n.data, label: `${n.data.label} (Clicked)` } } : n
			),
		}));

		//focus on the node
		//this.getCenterPosition();

		this.state.reactFlowInstance.setCenter(node.position.x + node.width*0.5, node.position.y + node.height*0.5, { zoom: 1.3, duration: 500 })

	}
	// nodes selection
	onSelectionChange = (nodes) => {
		//console.log('Selected nodes:', nodes.map((node) => node.id));
		this.setState({
			selectedNodes: nodes.map((node) => node.id)
		});
	}


	
	// react flow init
	handleInit = (reactFlowInstance) => {
		this.setState({ reactFlowInstance });
		console.log("reactFlowInstance", reactFlowInstance.getViewport());
		//smooth zoom
		this.controls = $(this.container.current).find(".react-flow__controls");
		console.log("this.controls", this.controls);
		this.controls.mouseenter(this.addSmoothZoom).mouseleave(this.removeSmoothZoom);
	}



	/// control the pane
	zoomIn() {
		if (this.state.reactFlowInstance) {
			this.state.reactFlowInstance.zoomIn();
		}
	}

	zoomOut() {
		if (this.state.reactFlowInstance) {
		this.state.reactFlowInstance.zoomOut();
		}
	}

	movePane() {
		if (this.state.reactFlowInstance) {
			this.state.reactFlowInstance.setViewport({ x: 200, y: 150, zoom: 1 }); // Move to x:200, y:150, zoom:1
		}
	}
	// smooth zoom for the side controls
	addSmoothZoom = (nodes) => {
		console.log("smooth");
		this.setState({ smoothZoom: true })
	}
	removeSmoothZoom = (nodes) => {
		console.log("not smooth");
		this.setState({ smoothZoom: false })
	}


	// focus zoom
	focusOnNodeProcess = (e) => {
	}
	focusOnNodeFinished = (e) => {
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
					//onNodeClick={this.onNodeClick}
					onNodeDoubleClick={this.onNodeClick}
					defaultEdgeOptions={{ type: 'step' }}
					minZoom={0.5}
					maxZoom={1.3}
					selectionOnDrag={true} // Enable rectangle selection
          			deleteKeyCode={'Delete'}

          			//panOnDrag={[1]}

					panOnScroll={this.isMac} //pan on scroll for MAC
					selectionOnDrag
					panOnDrag={[1, 2]}
					selectionMode={SelectionMode.Partial}
					fitView
				>
					<Background />
					<Controls />
				</ReactFlow>
			</div>
		)
	}
}

