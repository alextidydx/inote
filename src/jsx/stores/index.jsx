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
				linkedBoard : "1",
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
			alias : "1",
			position: { x: 550, y: 100 }, 
			board : 0
		},
		{
			id : "5",
			alias : "2",
			position: { x: 180, y: 345 }, 
			board : 0
		},
		{
			id : "6",
			alias : "3",
			position: { x: 1050, y: 445 }, 
			board : 0
		},
		{
			id : "7",
			alias : "3",
			position: { x: 610, y: 645 }, 
			board : 1
		},
		{
			id : "8",
			alias : "1",
			position: { x: 780, y: 345 }, 
			board : 1
		}
	]

	edges = [
		{ id: 'e5-4', source: '5', target: '4', type: 'step', board : 0 },
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


	// EDGES ////////////////////////////////////////////////////
	
	addEdge(boardId, data) {
		console.log("-addEdge", data);
		//check if we have this edge
		let newId = "e" + data.source + "-" + data.target;
		let haveEdge = this.edges.some(edge => (edge.id === newId) && (edge.board == boardId ));

		if (haveEdge) return 0;

		// TO DO use a class
		let newEdge = {
			id: newId, 
			source: data.source, 
			target: data.target, 
			type: 'step',
			board: boardId
		}
		//immutable
		this.edges = [...this.edges, newEdge];
		return 1;
	}
	removeEdges(boardId, data) {
		//let haveEdge = this.edges.some(edge => edge.id === data[0].id);
		//if (!haveEdge) return 0;
		//immutable
		const edgeIdsToRemove = data.map(item => item.id);
		this.edges = this.edges.filter(edge => !edgeIdsToRemove.includes(edge.id));
		return 1;
	}



	// NODES ////////////////////////////////////////////////////
	addNode(boardId, data) {
		console.log("-addNodeByID", data);
	}
	changeNodesPositions(boardId, positionUpdates) {
		let nodes = [...this.nodeWrappers]; // Create new array
		positionUpdates.forEach(update => {
			const index = nodes.findIndex(node => (node.id === update.id));
			if (index !== -1) {
				nodes[index].position.x = update.position.x;
				nodes[index].position.y = update.position.y;
			}
		});
		
		//this.edges = newEdges; // Update observable

	}
	removeNodes(boardId, data) {
		const nodeIdsToRemove = data.map(item => item.id);
		this.nodeWrappers = this.nodeWrappers.filter(nodeW => !nodeIdsToRemove.includes(nodeW.id));
	}
	

	// TODO delete a node if there're no nodeWrappers

	
}

const AppState = new appState();

export {
	AppState
}