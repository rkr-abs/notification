/* eslint-disable max-len */
import { React } from 'react';
import './App.scss';
import PermissionStore from './services/PermissionsStore';

const App = () => {
	alert('HELLO Nirupan :)');
	const pipe = (data) => alert(data.status);

	return <div className="App">
		<button onClick={ async () => {
			await PermissionStore({ data: {}, pipe: pipe })({
				action: 'update',
				entity: 'permissions', data: { id: 'camera' },
			});
		} }
		>Click</button>
		<img src="https://www.mordeo.org/files/uploads/2020/09/Iron-Man-Fortnite-4K-Ultra-HD-Mobile-Wallpaper-950x1689.jpg" alt="no-lll"/>
		<h1>HELLo</h1>
	</div>;
};

export default App;
