/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import { peek } from '@laufire/utils/debug';
import { values } from '@laufire/utils/lib';
import { React, useState } from 'react';
import './App.scss';
import PermissionStore from './services/PermissionsStore';

const App = (context) => {
	const { config: { permissions, requestPermissions }} = context;
	const [state, setState] = useState({});

	const pipe = (data) => {
		peek(data);
		setState(() => data.data);

		return alert(data.status);
	};

	return <div className="App">
		<img
			src="https://www.mordeo.org/files/uploads/2020/09/Iron-Man-Fortnite-4K-Ultra-HD-Mobile-Wallpaper-950x1689.jpg"
			alt="no-lll"
			height="250px"
		/><h1>ReadPermissions</h1>
		{permissions.map((permission, key) =>
			<span key={ key }>
				<button
					style={ { margin: '10px' } }
					onClick={ async () => {
						await PermissionStore({ data: {}, pipe: pipe })({
							action: 'read',
							entity: 'permissions', data: { id: permission },
						});
					} }
				>{permission}</button>
			</span>)}<hr/>
		<h1>RequestPermissions</h1>
		{requestPermissions.map((permission, key) =>
			<span key={ key }>
				<button
					style={ { margin: '10px' } }
					onClick={ async () => {
						await PermissionStore({ data: {}, pipe: pipe })({
							action: 'update',
							entity: 'permissions', data: { id: permission },
						});
					} }
				>{permission}
				</button></span>)}
		<div>a{navigator.userAgent}</div>
		<button onClick={ () => navigator.contacts.getProperties() }> Contact</button>
		<div>{values(state).map((e, key) => <h1 key={ key }>{`${ e }`}</h1>)}</div>
	</div>;
};

export default App;
