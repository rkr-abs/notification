import { React } from 'react';
import './App.scss';
import PermissionManager from './services/PermissionManager';

const notify = () => {
	PermissionManager.create({
		type: 'location', data: { audio: true, video: true },
	});
};
const App = () => <div className="App">
	<button onClick={ notify }>Click</button>
</div>;

export default App;
