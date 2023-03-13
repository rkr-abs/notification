/* eslint-disable max-lines-per-function */
import { map } from '@laufire/utils/collection';
import { peek } from '@laufire/utils/debug';

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

		const mediaDevices = async (data) => {
			const { res = 'granted' } = await navigator.mediaDevices
				.getUserMedia(data)
				.catch(() => ({ res: 'denied' }));

			return res;
		};

		const requestPermissions = {
			notifications: () => Notification.requestPermission(),
			foregroundLocation: ({ pipe }) => {
				const success = () => {
					const resp = { status: 'granted',
						id: 'foregroundLocation', canAskAgain: true };

					pipe(resp);
				};

				const error = () => {
					const resp = { status: 'denied',
						id: 'foregroundLocation', canAskAgain: false };

					pipe(resp);
				};

				navigator.geolocation.getCurrentPosition(success, error);
			},
			camera: () => mediaDevices({ video: true }),
			microphone: () => mediaDevices({ audio: true }),
			midi: async () => {
				peek(await navigator.requestMIDIAccess().catch(() => 'denied'));
				const res = permissionStatus('midi');

				return res.state ;
			},
			localFonts: async () => {
				await window.queryLocalFonts();
				const res = await permissionStatus('local-fonts');

				return res.state;
			},
			hid: async () => {
				const res = await navigator.hid.requestDevice({ filters: [] });

				return res.length ? 'granted' : 'denied';
			},
			clipboard: async () => {
				await navigator.clipboard.read().catch(() => 'denied');
				const res = await permissionStatus('clipboard-read');

				return res.state;
			},
			usb: async () => {
				const { res = 'granted' } = await navigator.usb
					.requestDevice({ filters: [] })
					.catch(() => ({ res: 'denied' }));

				return res ;
			},
		};
		const requestedStatus = await requestPermissions[id](context);

		return requestedStatus
			? { data: { status: requestedStatus,
				id: id, canAskAgain: requestedStatus === 'granted' },
			status: 'completed' }
			: {};
	},
};

export default actions;
