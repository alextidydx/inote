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
		nodes: [
			{ 
				id: '1', 
				position: { x: 400, y: 400 }, 
				data: { 
					click : () => { console.log("click");},
					title : "Node Example",
					description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap ",
					date : "1d ago"
				 },
				type: 'simepleCard'
			},
			{ 
				id: '2', 
				position: { x: 800, y: 400 }, 
				data: { label: '2' },
				sourcePosition: Position.Right,
				targetPosition: Position.Left
			},
		],
		edges: [
			{ id: 'e1-2', source: '1', target: '2', type: 'step' }
		]
    }
	container = React.createRef()

	constructor(props) {
		super(props);
		$(window).resize(this.onResize);

	}
	onResize = (e) => {}

	componentDidMount() {
		this.onResize();
	}
	componentDidUpdate() {}

	setHTMLData = (_data) => {
		$(this.htmlContainer.current).html(_data);
		$(this.htmlContainer.current).scrollTop(0);
		this.setImgOnLoad();
	}

	// Handle node changes
	onNodesChange = (changes) =>  {
		this.setState((prevState) => ({
			nodes: applyNodeChanges(changes, prevState.nodes),
		}));
	}

	// Handle edge changes
	onEdgesChange = (changes) =>  {
		this.setState((prevState) => ({
			edges: applyEdgeChanges(changes, prevState.edges),
		}));
	}

	// Handle new connections
	onConnect = (params) =>  {
		this.setState((prevState) => ({
			edges: addEdge(params, prevState.edges),
		}));
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
	}

	render() {
		const { nodes, edges } = this.state;
		return (
			<div className="at__board" ref={this.container} >
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					onNodesChange={this.onNodesChange}
					onEdgesChange={this.onEdgesChange}
					onConnect={this.onConnect}
					onNodeClick={this.onNodeClick}
					fitView
				>
					<Background />
					<Controls />
				</ReactFlow>
			</div>
		)
	}
}

