import actions from './actions';

const PermissionStore = (data) => {
	const { entity: defaultEntity, pipe } = data;

	const store = async (context) => {
		const { action, entity } = context;

		await pipe({ action: action, status: 'pending' });

		const wrapper = (resp) => pipe({ action: action,
			status: status, data: resp, ...rest });

		const {
			status = 'completed',
			data: response,
			...rest
		} = await actions[action]({ ...context,
			entity: entity || defaultEntity,
			pipe: wrapper });

		response.status && wrapper(response);
	};

	return store;
};

export default PermissionStore;
