/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import { React, useEffect } from 'react';
import { askForPermission, setCamera } from '../services/webView';

const WebView = () => {
	useEffect(() => {
		askForPermission();
		document.querySelector('#camera-select').onchange = () => {
		// console.log("New selection!")
			let selectedCamera = '';

			const newSelection = document.querySelector('#camera-select').children[
				document.querySelector('#camera-select').selectedIndex
			].value;

			selectedCamera = newSelection;
			console.log(selectedCamera);
			setCamera();
		};
	});
	return <div>
		<h1>WebView</h1>
		<h1>Webcam Test Page</h1>
		<select id="camera-select" name="camera-select"/>        <br/>
		<video id="webcam-output"/><br/>

	</div>;
}
  ;

export default WebView;
