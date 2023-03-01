import actions from './actions';

// eslint-disable-next-line max-lines-per-function
const PermissionStore = (data) => {
	const { entity: defaultEntity, pipe } = data;

	const store = async ({ action, entity, data: storeData }) => {
		const value = await actions[action]({
			entity: entity || defaultEntity, data: storeData,
		});

		pipe(value);
	};

	return store;
};

export default PermissionStore;
