import { React } from 'react';
import './App.scss';
import PermissionManager from './services/PermissionManager';

const notify = () => {
	PermissionManager.create({
		type: 'media', data: {
			audio: true,
			video: { width: 1280, height: 720 },
		},
	});
};
const App = () => <div className="App">
	<button onClick={ notify }>Click</button>
	<div id="video"/>
</div>;

export default App;
