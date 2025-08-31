import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Provider, inject, observer } from 'mobx-react'
import '../../styles/App.scss'
import Home from './pages/Home';
// Store
import { AppState } from '../stores'
const stores = { AppState };

// Global sitemap with routes and payloads
const sitemap = [
	{
		id : 0,
		path : "*",
		element : Home,
		settings : {}
	},
	{
		id : 1,
		path : "/*",
		element : Home,
		settings : {}
	}
];

const App = observer(() => {
	return (
		<Provider {...stores}>
			<BrowserRouter>
				<Routes>
					{
						sitemap.map((page, index) => {
							const Component = inject("AppState")(observer(page.element)); // MobX wrapper
							return <Route path={page.path} key={page.id} element={<Component settings={page.settings} />}  />;
						})
					}
				</Routes>
			</BrowserRouter>
		</Provider>
	);
})




export default App;