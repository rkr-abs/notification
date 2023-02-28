
// eslint-disable-next-line max-lines-per-function
const PermissionStore = (data) => {
	const { entity: defaultEntity, pipe } = data;

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
	};

	const store = async ({ action, entity, data: storeData }) => {
		const temp = await actions[action]({
			entity: entity || defaultEntity, data: storeData,
		});

		pipe(temp);
	};

	return store;
};

export default PermissionStore;
