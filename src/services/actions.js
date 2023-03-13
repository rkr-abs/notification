import { map } from '@laufire/utils/collection';
import requestPermissions from './requestPermissions';

const permissionsList = [
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

		const readAll = Promise.all(map(permissionsList, (permissionName) =>
			getStatus(permissionName)));

		const response = id ? getStatus(id) : readAll;

		return { data: await response };
	},

	update: async (context) => {
		const { data: { id }} = context;

		const requestedStatus = await requestPermissions[id](context);

		return requestedStatus
			? { data: { status: requestedStatus,
				id: id, canAskAgain: requestedStatus === 'granted' },
			status: 'completed' }
			: {};
	},
};

export default actions;
