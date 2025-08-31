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
		selectedNodes: []
    }
	container = React.createRef()
	appData = null

	constructor(props) {
		super(props);
		$(window).resize(this.onResize);
		this.appData = this.props.AppState;
		console.log("board", this.appData);
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
		    }
		]
		*/
		if (changes[0].type == "remove") {
			this.appData.removeEdge(changes);
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
	}

	onSelectionChange({ nodes }) {
		console.log('Selected nodes:', nodes.map((node) => node.id));
		this.setState({
			selectedNodes: nodes.map((node) => node.id)
		});
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

