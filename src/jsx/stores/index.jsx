import { makeAutoObservable } from "mobx";
import { makePersistable } from 'mobx-persist-store';

class appState {
	data = {
		name : "Hello",
		address : 14,
		items : [
			{
				id : 0,
				name : "b"
			},
			{
				id : 1,
				name : "a"
			}
		]
	}

	constructor() {
		makeAutoObservable(this)
		makePersistable(this, {
			name: 'AppState',
			properties: ['data'],
			storage: window.localStorage
		});
	}

	setName(username) {
		this.data.name = username
	}
	get getState() {
		return this.data;
	}
}

const AppState = new appState();

export {
	AppState
}