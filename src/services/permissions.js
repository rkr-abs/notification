
const permissions = {
	read: async (context) => {
		const { entity: permissionType } = context;
		const types = {
			foregroundLocation: ({ pipe }) => {
				navigator.geolocation.getCurrentPosition((data) =>
					pipe(data));
			},
			camera: () => navigator.mediaDevices.getUserMedia({ video: true }),
			microphone: () => navigator.mediaDevices
				.getUserMedia({ audio: true }),
			hid: () => navigator.hid.getDevices(),
			usb: () => navigator.usb.getDevices(),

		};

		return { data: await types[permissionType](context) };
	},

};

export default permissions;
