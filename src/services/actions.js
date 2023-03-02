import { equals, map } from '@laufire/utils/collection';

const permissionsName = [
	'camera',
	'foregroundLocation',
	'microphone',
	'midi',
	'notifications',
	'magnetometer',
	'accelerometer',
	'gyroscope',
	'background-sync',
	'payment-handler',
	'local-fonts',
	'clipboard-read',
];
const actions = {
	read: ({ data: { id }}) => {
		const getPermission = async (provider) => {
			const permissions = {
				foregroundLocation: 'geolocation',
			};
			const config = permissions[provider] || provider;
			const permissionStatus = await navigator
				.permissions.query({ name: config });

			return {
				[provider]: {
					allowed: equals(permissionStatus.state, 'granted'),
				},
			};
		};

		const readAll = Promise.all(map(permissionsName, (provider) =>
			getPermission(provider)));

		const response = id ? getPermission(id) : readAll;

		return response;
	},

	create: async ({ entity, data }) => {
		const permissions = {
			notifications: () => Notification.requestPermission(),
			foregroundLocation: () => {
				navigator.geolocation.watchPosition(() => {});
			},
			media: (storeData) =>
				navigator.mediaDevices.getUserMedia(storeData),
			midi: () => navigator.requestMIDIAccess(),
			localFonts: () => window.queryLocalFonts(),
			hid: () => navigator.hid.requestDevice(),
			clipboard: () => navigator.clipboard.read(),
			usb: () => navigator.usb.getDevices(),
		};

		return {
			[entity]: { allowed: await permissions[entity](data) },
		};
	},
};

export default actions;
