
const permissions = {
	notification: () => Notification.requestPermission(),
	location: () => navigator.geolocation.getCurrentPosition(() => {}),
	media: (data) => navigator.mediaDevices.getUserMedia(data),
	sensor: (data) => navigator.permissions.query(data)
	,
};

export default permissions;
