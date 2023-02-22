
const PermissionStore = (data) => {
	const { entity: defaultEntity } = data;

	const actions = {
		read: async ({ entity }) => {
			const permissionName = {
				location: 'geolocation',
				notification: 'notifications',
			};
			const permissionStatus = await navigator
				.permissions.query({ name: permissionName[entity] });

			return {
				[entity]: { allowed: permissionStatus.state === 'granted' },
			};
		},
	};

	const store = ({ action, entity, data: storeData }) =>
		actions[action]({ entity: entity || defaultEntity, data: storeData });

	return store;
};

export default PermissionStore;
