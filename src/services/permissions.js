import { peek } from '@laufire/utils/debug';

const permissions = {
	notification: () => Notification.requestPermission(),
	location: () => {
	 navigator.geolocation.watchPosition((e) =>
			peek(e.coords.accuracy));
	},
	media: (data) => navigator.mediaDevices.getUserMedia(data),
	midi: () => navigator.permissions.query({ name: 'geolocation' }),

};

export default permissions;
