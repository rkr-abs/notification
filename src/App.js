/* eslint-disable max-len */
import { peek } from '@laufire/utils/debug';
import { React } from 'react';
import './App.scss';

const App = () => {
	alert('HELLO Nirupan :)');
	const pipe = (data) => {
		peek(data);
		return alert(data.status);
	};

	return <div className="App">
		<button onClick={ async () => {
			const res = await navigator.mediaDevices.getUserMedia({ video: true });

			alert(res.id);
		} }
		>Click</button>
		<img src="https://www.mordeo.org/files/uploads/2020/09/Iron-Man-Fortnite-4K-Ultra-HD-Mobile-Wallpaper-950x1689.jpg" alt="no-lll"/>
		<h1>HELLo</h1>
	</div>;
};

export default App;
