import permissions from './permissions';

const create = ({ type, data }) => {
	permissions[type](data);
};

const PermissionManager = { create };

export default PermissionManager;
