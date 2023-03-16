/* eslint-disable no-console */
/* eslint-disable max-len */

/* eslint-disable func-style */
function hasGetUserMedia () {
	return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
if(hasGetUserMedia()) {
	// Good to go!
}
else
	alert('getUserMedia() is not supported by your browser');

let selectedCamera = '';

export function askForPermission () {
	const constraints = { video: true };

	navigator.mediaDevices.getUserMedia(constraints)
		.then(() => {
			// alert("Permission Granted!");
			populateCameraList();
		})
		.catch(() => {
			alert('TODO: write error message for when camera permisison is denied!');
		});
}
document.addEventListener('DOMContentLoaded', () => {

	//     populateCameraList();
});
function populateCameraList () {
	document.querySelector('#camera-select').innerHTML = '';
	navigator.mediaDevices.enumerateDevices().then((deviceList) => {
		console.log(deviceList);
		selectedCamera = deviceList.filter((x) => x.kind === 'videoinput')[0].deviceId;
		setCamera();
		deviceList.forEach((device) => {
			if(device.kind === 'videoinput') {
				console.log(device.label);
				const item = document.createElement('option');

				// item.setAttribute("value", device.label);
				item.value = device.deviceId;
				item.innerHTML = device.label;
				document.querySelector('#camera-select').appendChild(item);
			}
		});
	});
}
export function setCamera () {
	const constraints = {
		video: { deviceId: selectedCamera },
	};

	navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
		const video = document.querySelector('#webcam-output');

		video.srcObject = stream;
		video.play();
	});
}
