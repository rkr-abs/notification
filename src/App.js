/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import { React, useState } from 'react';
import './App.scss';
import PermissionStore from './services/PermissionsStore';

const App = () => {
	const [state, setState] = useState([]);

	const pipe = (context) => {
		setState(() => context.data);

		return alert(context.status);
	};

	return <div className="App">
		<img
			src="https://www.mordeo.org/files/uploads/2020/09/Iron-Man-Fortnite-4K-Ultra-HD-Mobile-Wallpaper-950x1689.jpg"
			alt="no-lll"
			height="250px"
		/>
		<h1>HELLO</h1>
		<button onClick={ async () => {
			await PermissionStore({ data: {}, pipe: pipe })({
				action: 'read',
				entity: 'permissions', data: { },
			});
		} }
		>RequestPermissions</button>
		<div>{
			state.map((e, key) => <h1 key={ key }>{e.id} : {e.status}</h1>)
		}</div>
	</div>;
};

export default App;
