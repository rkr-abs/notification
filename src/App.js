import { React } from 'react';
import './App.scss';
import PermissionManager from './services/PermissionManager';

const notify = () => {
	PermissionManager.create({
		type: 'sensor', data: { name: 'accelerometer' },
	});
};
const App = () => <div className="App">
	<button onClick={ notify }>Click</button>
</div>;

export default App;
