import actions from './actions';

const PermissionStore = (data) => {
	const { entity: defaultEntity, pipe } = data;

	const store = async (context) => {
		const { action, entity } = context;

		await pipe({ ...context, status: 'pending' });

		const wrapper = (resp) => pipe({ ...context,
			status: status, data: resp, ...rest });

		const {
			status = 'completed',
			data: response,
			...rest
		} = await actions[action]({ ...context,
			entity: entity || defaultEntity,
			pipe: wrapper }).catch((error) => ({
			status: 'failed', data: context.data, error: error,
		}));

		response && wrapper(response);
	};

	return store;
};

export default PermissionStore;
