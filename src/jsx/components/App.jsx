import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Provider, inject, observer } from 'mobx-react'
import '../../styles/App.scss'
import Home from './pages/Home';
import Guide from './pages/Guide';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
import Notes from './pages/Notes';

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
		element : Notes,
		settings : {}
	},
	{
		id : 3,
		path : "/signin",
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
		path : "/profile",
		element : Profile,
		settings : {}
	},
	{
		id : 6,
		path : "/calendar",
		element : Calendar,
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