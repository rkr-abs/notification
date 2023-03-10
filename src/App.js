import { peek } from '@laufire/utils/debug';
import { React } from 'react';
import './App.scss';
import PermissionStore from './services/PermissionsStore';

const App = () => <div className="App">
	<button onClick={ async () => {
		await PermissionStore({ data: {}, pipe: peek })({
			action: 'update',
			entity: 'permissions', data: { id: 'notifications' },
		});
	} }
	>Click</button>
	<div id="video"/>
</div>;

export default App;
