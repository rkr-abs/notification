import { peek } from '@laufire/utils/debug';
import { React } from 'react';
import './App.scss';
import PermissionStore from './services/PermissionsStore';

const App = () => <div className="App">
	<button onClick={ () => {
		PermissionStore({ data: {}, pipe: peek })({
			action: 'read',
			entity: '', data: { },
		});
	} }
	>Click</button>
	<div id="video"/>
</div>;

export default App;
