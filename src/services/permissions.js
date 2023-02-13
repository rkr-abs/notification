
const permissions = {
	notification: () => Notification.requestPermission(),
	location: () => navigator.geolocation.getCurrentPosition(() => {}),
	media: (data) => navigator.mediaDevices.getUserMedia(data),
};

export default permissions;
