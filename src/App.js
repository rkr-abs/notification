import { React } from 'react';
import './App.scss';
import permissions from './services/permissions';

const App = () => <div className="App">
	<button onClick={ async () => {
		await permissions.location();
	} }
	>Click</button>
	<div id="video"/>
</div>;

export default App;
