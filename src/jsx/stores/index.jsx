import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

import ReactFlow, {
	Position
} from 'reactflow';

class appState {
	// mocked data
	nodes = [
		{ 
			id: '1', 
			position: { x: 280, y: 400 }, 
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
			id: '2', 
			position: { x: 800, y: 545 }, 
			data: { 
				click : () => { console.log("click");},
				title : "Idea Node",
				description : "Lorem Ipsum🙂 is simply dummy text of",
				date : "2d ago",
				tags : [
					"Idea"
				]
			 },
			type: 'ideaCard',
			className: 'at__node-idea',
			sourcePosition: Position.Right,
			targetPosition: Position.Left,
			children: {
				nodes : [
					{
						id: 4,
						position: { x: 200, y: 200},
						alias: 1
					},
					{
						id: 5,
						position: { x: 500, y: 200},
						alias: 3
					}
				],
				edges : [
					{ id: 'e1-3', source: '1', target: '3', type: 'step' }
				]
			}
		},
		{ 
			id: '3', 
			position: { x: 600, y: 745 }, 
			data: { 
				click : () => { console.log("click");},
				title : "Simple Note 2",
				description : "Lorem Ipsum🙂 is simply dummy text of the printing and typesetting industry. ",
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
	edges = [
		{ id: 'e1-2', source: '1', target: '2', type: 'step' },
		{ id: 'e1-3', source: '1', target: '3', type: 'step' }
	]

	// persistance 
	constructor() {
		makeAutoObservable(this)
		makePersistable(this, {
			name: 'AppState',
			properties: ['nodes', 'edges'],
			storage: window.localStorage
		});

	}

	// EDGES ////////////////////////////////////////////////////
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

	get getNodes() {
		return this.nodes;
	}
	get getEdges() {
		return this.nodes;
	}
}

const AppState = new appState();

export {
	AppState
}