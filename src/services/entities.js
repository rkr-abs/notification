import permissions from './permissions';

const entities = {
	permissions: permissions,
	foregroundLocation: {
		read: async ({ pipe }) => {
			const res = await navigator.geolocation.getCurrentPosition((data) =>
				pipe(data));

			return { data: res };
		},
	},
	hid: { read: async () => ({ data: await navigator.hid.getDevices() }) },
	usb: { read: async () => ({ data: await navigator.usb.getDevices() }) },
	battery: { read: async () => ({ data: await navigator.getBattery() }) },
};

export default entities;
