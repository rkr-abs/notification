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
const permissions = {
	read: async ({ data: { id }}) => {
		const getStatus = async (provider) => {
			const enhancedPermissions = {
				foregroundLocation: 'geolocation',
			};
			const config = enhancedPermissions[provider] || provider;

			const permissionStatus = await navigator
				.permissions.query({ name: config });

			return {
				id: provider,
				status: permissionStatus.state,
				canAskAgain: permissionStatus.state === 'prompt',
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

export default permissions;
