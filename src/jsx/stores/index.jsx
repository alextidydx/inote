import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

import ReactFlow, {
	Position
} from 'reactflow';

class appState {
	// mocked data
	nodes = [
		{ 
			nid: "1", 
			data: { 
				click : () => { console.log("click");},
				title : "Simple Note 1",
				description : "Lorem Ipsum🙂 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap ",
				date : "1d ago",
				tags : [
					"Commerce",
					"Forex"
				]
			 },
			type: 'simepleCard',
			className: 'custom-node',
			sourcePosition: Position.Right,
			targetPosition: Position.Left,
			//selectable: false
		},
		{ 
			nid: "2", 
			data: { 
				click : () => { console.log("click");},
				title : "Idea Node",
				description : "Lorem Ipsum is simply dummy text of",
				date : "2d ago",
				tags : [
					"Idea"
				]
			 },
			type: 'ideaCard',
			className: 'at__node-idea',
			sourcePosition: Position.Right,
			targetPosition: Position.Left
		},
		{ 
			nid: "3", 
			data: { 
				click : () => { console.log("click");},
				title : "Simple Note 2",
				description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
				date : "3d ago",
				tags : [
					"Commerce"
				]
			 },
			type: 'simepleCard',
			sourcePosition: Position.Right,
			targetPosition: Position.Left,
		}
	]

	nodeWrappers = [
		{
			id : "4",
			alias : 1,
			position: { x: 280, y: 400 }, 
			board : 0
		},
		{
			id : "5",
			alias : 2,
			position: { x: 800, y: 545 }, 
			board : 0
		},
		{
			id : "6",
			alias : 3,
			position: { x: 600, y: 745 }, 
			board : 0
		},
		{
			id : "7",
			alias : 3,
			position: { x: 600, y: 745 }, 
			board : 1
		},
		{
			id : "8",
			alias : 2,
			position: { x: 800, y: 545 }, 
			board : 1
		}
	]

	edges = [
		{ id: 'e4-5', source: '4', target: '5', type: 'step', board : 0 },
		{ id: 'e4-6', source: '4', target: '6', type: 'step', board : 0 },
		{ id: 'e7-8', source: '7', target: '8', type: 'step', board : 1 }
	]

	boards = [
		{
			id : "0",
			name : "Mainboard",
			main : true
			// nodes            
		},
		{
			id : "1",
			name : "Mainboard",
			main : false
			// nodes            
		}
	]



		
	// persistance 
	constructor() {
		makeAutoObservable(this)
		makePersistable(this, {
			name: 'AppState',
			properties: ['nodes', 'nodeWrappers', 'edges', 'boards'],
			storage: window.localStorage
		});

	}

	getBoardById(boardId) {
		//get all nodes with parent = boardId
		let board = this.boards.find(board => board.id == boardId);
		let nodesWrappers = this.nodeWrappers.filter(nodeW => nodeW.board == boardId);
		let nodeObj = [];
		nodesWrappers.forEach(nodeW => {
			const nodeI = this.nodes.findIndex(node => node.nid == nodeW.alias);
			if (nodeI !== -1) {
				nodeObj.push({ ...nodeW, ...this.nodes[nodeI] });
			}
		});
		console.log(nodeObj[0].position.x);
		let edges = this.edges.filter(edge => edge.board == boardId);
		let boardData = { 
			...board,
			nodes : nodeObj,
			edges : edges
		}
		console.log(boardData);

		return boardData;
	}

	getNodeWrapperWithObj(wrapperId) {
		let nodeWrapper = this.nodes.findIndex(node => node.id === nodeId);

		let node = this.nodes.findIndex(node => node.id === nodeId);

	}

	// EDGES ////////////////////////////////////////////////////
	/*
	addEdge(data) {
		console.log("-addEdge", data);
		//check if we have this edge
		let newId = "e" + data.source + "-" + data.target;
		let haveEdge = this.edges.some(edge => edge.id === newId);

		if (haveEdge) return 0;

		// TO DO use a class
		let newEdge = {
			id: newId, 
			source: data.source, 
			target: data.target, 
			type: 'step'
		}
		//immutable
		this.edges = [...this.edges, newEdge];
		return 1;
	}
	removeEdges(data) {
		//let haveEdge = this.edges.some(edge => edge.id === data[0].id);
		//if (!haveEdge) return 0;
		//immutable
		const edgeIdsToRemove = data.map(item => item.id);
		this.edges = this.edges.filter(edge => !edgeIdsToRemove.includes(edge.id));
		return 1;
	}



	// NODES ////////////////////////////////////////////////////
	addNode(data) {
		console.log("-addNodeByID", data);
	}
	changeNodesPositions(positionUpdates) {
		let nodes = [...this.nodes]; // Create new array
		positionUpdates.forEach(update => {
			const index = nodes.findIndex(node => node.id === update.id);
			if (index !== -1) {
				nodes[index].position.x = update.position.x;
				nodes[index].position.y = update.position.y;
			}
		});
		
		//this.edges = newEdges; // Update observable

	}
	removeNodes(data) {
		const nodeIdsToRemove = data.map(item => item.id);
		this.nodes = this.nodes.filter(edge => !nodeIdsToRemove.includes(edge.id));
	}
	*/

	
}

const AppState = new appState();

export {
	AppState
}