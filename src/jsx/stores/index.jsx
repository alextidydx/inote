import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

import ReactFlow, {
	Position
} from 'reactflow';

class appState {
	nodes = [
		{ 
			id: '1', 
			position: { x: 280, y: 400 }, 
			data: { 
				click : () => { console.log("click");},
				title : "Node Example",
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
			id: '2', 
			position: { x: 800, y: 545 }, 
			data: { label: '2' },
			sourcePosition: Position.Right,
			targetPosition: Position.Left
		},
	]
	edges = [
		{ id: 'e1-2', source: '1', target: '2', type: 'step' }
	]

	constructor() {
		makeAutoObservable(this)
		makePersistable(this, {
			name: 'AppState',
			properties: ['nodes', 'edges'],
			storage: window.localStorage
		});

	}

	// Edge
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
		this.edges = [...this.edges, newEdge];
		console.log("added edge");
		return 1;
	}
	removeEdge(data) {
		console.log("-removeEdge", data);
		let haveEdge = this.edges.some(edge => edge.id === data[0].id);
		if (!haveEdge) return 0;

		this.edges = this.edges.filter(edge => edge.id !== data[0].id);
		console.log("removed edge");
		return 1;
	}

	// Node
	addNodeByID(data) {
		console.log("-addNodeByID", data);
	}
	removeNodeByID(data) {
		console.log("-removeNodeByID", data);
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