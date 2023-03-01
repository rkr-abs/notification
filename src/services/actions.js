const actions = {
	read: async ({ entity }) => {
		const permissionName = {
			location: 'geolocation',
		};
		const config = permissionName[entity] || entity;
		const permissionStatus = await navigator
			.permissions.query({ name: config });

		return {
			[entity]: { allowed: permissionStatus.state === 'granted' },
		};
	},
	create: async ({ entity, data }) => {
		const permission = {
			notification: () => Notification.requestPermission(),
			location: () => {
				navigator.geolocation.watchPosition(() => {});
			},
			media: (storeData) => navigator.mediaDevices
				.getUserMedia(storeData),
			midi: () => navigator.requestMIDIAccess(),
			localFonts: () => window.queryLocalFonts(),
			hid: () => navigator.hid.requestDevice(),
			clipboard: () => navigator.clipboard.read(),
			usb: () => navigator.usb.getDevices(),
		};

		return {
			[entity]: { allowed: await permission[entity](data) },
		};
	},
};

export default actions;
