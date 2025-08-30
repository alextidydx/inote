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


import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
// state








const initialNodes = [
	{ id: '1', position: { x: 400, y: 400 }, data: { label: '1' } },
	{ id: '2', position: { x: 800, y: 400 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function Flow() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

	return (
	<ReactFlow
		nodes={nodes}
		edges={edges}
		onNodesChange={onNodesChange}
		onEdgesChange={onEdgesChange}
		onConnect={onConnect}
	>
		<Controls />
		<Background />
	</ReactFlow>
	);
}






export default class AtBoard extends React.Component {
	state = {}
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

	
	render() {
		return (
			<div className="at__board" ref={this.container} >
				<Flow />
			</div>
		)
	}
}

