import { peek } from '@laufire/utils/debug';
import { React } from 'react';
import './App.scss';
import PermissionStore from './services/PermissionsStore';

const App = (context) => <div className="App">
	<button onClick={ () => {
		const { config: { permissionsName }} = context;

		permissionsName.map((permission) =>
			PermissionStore({ data: '', pipe: peek })({
				action: 'read', entity: permission,
			}));
	} }
	>Click</button>
	<div id="video"/>
</div>;

export default App;
