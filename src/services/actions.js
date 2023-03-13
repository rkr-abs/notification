/* eslint-disable max-lines-per-function */
import { map } from '@laufire/utils/collection';

const permissionNames = [
	'camera',
	'foregroundLocation',
	'microphone',
	'midi',
	'notifications',
	'local-fonts',
	'clipboard-read',
	'magnetometer',
	'accelerometer',
	'gyroscope',
	'background-sync',
	'payment-handler',
];
const actions = {
	read: async ({ data: { id }}) => {
		const getStatus = async (provider) => {
			const permissions = {
				foregroundLocation: 'geolocation',
			};
			const config = permissions[provider] || provider;

			const permissionStatus = await navigator
				.permissions.query({ name: config });

			return {
				id: provider,
				status: permissionStatus.state,
			};
		};

		const readAll = Promise.all(map(permissionNames, (permissionName) =>
			getStatus(permissionName)));

		const response = id ? getStatus(id) : readAll;

		return { data: await response };
	},

	update: async (context) => {
		const { data: { id }} = context;

		const permissionStatus = (config) => navigator
			.permissions.query({ name: config });

		const requestPermissions = {
			notifications: () => Notification.requestPermission(),
			foregroundLocation: ({ pipe }) => {
				const success = () => {
					const resp = { status: 'granted',
						id: 'foregroundLocation' };

					pipe(resp);
				};

				const error = () => {
					const resp = { status: 'denied',
						id: 'foregroundLocation' };

					pipe(resp);
				};

				navigator.geolocation.getCurrentPosition(success, error);
			},
			camera: () => navigator.mediaDevices.getUserMedia({ video: true }),
			microphone: () =>
				navigator.mediaDevices.getUserMedia({ audio: true }),
			midi: () => navigator.requestMIDIAccess(),
			localFonts: async () => {
				await window.queryLocalFonts();
				const res = await permissionStatus('local-fonts');

				return res.state;
			},
			hid: () => {
				const res = navigator.hid.requestDevice({ filters: [] });

				return res === [] ? 'granted' : 'denied';
			},
			clipboard: async () => {
				await navigator.clipboard.read();
				const res = await permissionStatus('clipboard-read');

				return res.state;
			},
			usb: () => navigator.usb.requestDevice({ filters: [] }),
		};
		const requestedStatus = await requestPermissions[id](context);

		return requestedStatus
			? { data: { status: requestedStatus, id: id },
				status: 'completed' }
			: {};
	},
};

export default actions;
