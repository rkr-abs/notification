import { peek } from '@laufire/utils/debug';

const permissions = {
	notification: () => Notification.requestPermission(),
	location: () => navigator.geolocation.getCurrentPosition(() => {}),
	media: (data) => navigator.mediaDevices.getUserMedia(data)
		.then((mediaStream) => {
			const video = document.querySelector('#video');

			video.srcObject = mediaStream;
			video.onloadedmetadata = () => {
				video.play();
			};
		})
		.catch((err) => {
		// always check for errors at the end.
			peek(`${ err.name }: ${ err.message }`);
		}),
	sensor: (data) => navigator.permissions.query(data)

	,
};

export default permissions;
