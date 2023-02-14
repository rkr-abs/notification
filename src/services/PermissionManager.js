import permissions from './permissions';

const create = async ({ type, data }) => {
	await permissions[type](data);
};

const PermissionManager = { create };

export default PermissionManager;
