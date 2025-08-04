import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Provider, inject, observer } from 'mobx-react'
import '../../styles/App.scss'
import Home from './pages/Home';
import Guide from './pages/Guide';
import NotFound from './pages/NotFound';

// Store
import { AppState } from '../stores'
const stores = { AppState };

// Global sitemap with routes and payloads
const sitemap = [
	{
		id : 0,
		path : "*",
		element : Guide,
		settings : {}
	},
	{
		id : 1,
		path : "/feed",
		element : Home,
		settings : {}
	},
	{
		id : 2,
		path : "/notes",
		element : NotFound,
		settings : {}
	},
	{
		id : 3,
		path : "/notes",
		element : NotFound,
		settings : {}
	},
	{
		id : 4,
		path : "/signin",
		element : NotFound,
		settings : {}
	},
	{
		id : 5,
		path : "/signin",
		element : NotFound,
		settings : {}
	},
	{
		id : 6,
		path : "/profile",
		element : NotFound,
		settings : {}
	},
	{
		id : 7,
		path : "/calendar",
		element : NotFound,
		settings : {}
	},
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