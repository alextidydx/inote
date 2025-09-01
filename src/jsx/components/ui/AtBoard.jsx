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
import BackIcon from '../../../images/back.svg?react'
import PenIcon from '../../../images/note-pen.svg?react'
import AiIcon from '../../../images/ai.svg?react'


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
import AtCardArticle from './AtCardArticle';
import AtCardVoice from './AtCardVoice';

const nodeTypes = {
	simepleCard: AtCard,
	ideaCard: AtCardIdea,
	articleCard: AtCardArticle,
	voiceCard: AtCardVoice
};




export default class AtBoard extends React.Component {
	state = {
		board : this.props.board,
		nodes : this.props.nodes,
		edges : this.props.edges,
		selectedNodes: [],
		smoothZoom : false,
		reactFlowInstance : null,
		showChat : false,
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
	componentDidMount() {
		this.showBoard(0);
	}
	componentDidUpdate() {}

	//

	backClicked  = (changes) =>  {
		this.showBoard(0);
	}

	// Handle node changes
	onNodesChange = (changes) =>  {
		//console.log("onNodesChange", changes);
		let boardId = this.state.board.id;
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
			this.appData.removeNodes(boardId, toDelete);
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
			this.appData.changeNodesPositions(boardId, toMove);
		}

		
	}

	// Handle edge changes
	onEdgesChange = (changes) =>  {
		//console.log("onEdgesChange", changes);
		let boardId = this.state.board.id;
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
			this.appData.removeEdges(boardId, toDelete);
		}

	}

	// Handle new connections
	onConnect = (params) =>  {
		//console.log("onConnect", params);
		let boardId = this.state.board.id;
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
		this.appData.addEdge(boardId, params);
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

		if (node.data.linkedBoard) {
			this.showBoard(node.data.linkedBoard);
			return;
		}

		//focus on the node
		//this.getCenterPosition();
		//
		this.state.reactFlowInstance.setCenter(node.position.x + node.width*0.5, node.position.y + node.height*0.5, { zoom: 1.3, duration: 500 })

	}



	showBoard = (boardId) => {
		let board = this.props.AppState.getBoardById(boardId);
    	let nodes = board.nodes;
    	let edges = board.edges;
    	
    	this.setState({
    		board : board,
    		nodes : nodes,
    		edges : edges
    	});
		this.onResize();

		if (this.state.reactFlowInstance)
			setTimeout(() => {
				this.state.reactFlowInstance.fitView({ zoom: 1.3, duration: 500, minZoom: 1.3});
			},100);
			
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

	toggleChat = (nodes) => {
		this.setState({ showChat: !this.state.showChat })
	}


	// focus zoom
	focusOnNodeProcess = (e) => {
	}
	focusOnNodeFinished = (e) => {
	}



	render() {
		const { nodes, edges } = this.state;
		let showBack = false;
		if (this.state.board) showBack = this.state.board.id != "0";


			
		const classnames = classNames({
			"at__board" : true,
			"at__board--smooth" : this.state.smoothZoom,
			"at__board__back--active" : showBack,
			"at__board__back--chat-open" : this.state.showChat
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

				<div className="at__board__back" onClick={this.backClicked}><BackIcon />Back</div>
				<div className="at__board__create" >
					<div className="at__board__create-note at__board__create-btn"><PenIcon /></div>
					<div className="at__board__create-ai at__board__create-btn" onClick={this.toggleChat}><AiIcon />
						<div className="at__board__create-ai-popup"><img src="./assets/images/ai-chat.png" /></div>
					</div>
				</div>
			</div>
		)
	}
}

