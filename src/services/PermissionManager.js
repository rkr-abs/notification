import { peek } from '@laufire/utils/debug';

const PermissionStore = ({ data }) => {
	const { entity: defaultEntity } = data;
	const actions = {
		read: () => ({
			location: { allowed: true },
		}),
	};

	const store = ({ action, entity, data: storeData }) =>
		actions[action]({});

	return store;
};

peek(PermissionStore({ data: '' })({ action: 'read' }));

export default PermissionStore;
