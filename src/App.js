import { peek } from '@laufire/utils/debug';
import { React, useEffect } from 'react';
import './App.scss';

const notify = () => {
	const options = {
		body: 'Hi',

	};

	Notification.permission === 'granted'
		? peek(new Notification('title', options))
		: Notification.requestPermission();

	navigator.mediaDevices
		.getUserMedia({ audio: true, video: false })
		.then((stream) => {
			window.localStream = stream;
			window.localAudio.srcObject = stream;
			window.localAudio.autoplay = true;
		});
};
const App = () => {
	useEffect(notify, []);
	return <div className="App">
		<button onClick={ notify }>Click</button>
	</div>;
};

export default App;
