import entities from './entities';

const PermissionStore = (data) => {
	const { entity: defaultEntity, pipe } = data;

	const store = async (context) => {
		const { entity, action } = context;

		const wrapper = (resp) => pipe({ ...context,
			status: status, data: resp, ...rest });

		const { status = 'completed',
			data: response,
			...rest }
			= await entities[entity || defaultEntity][action]({ ...context,
				pipe: wrapper })
				.catch((error) => ({ status: 'failed',
					data: { ...context.data, status: 'undetermined' },
					error: error }));

		response && wrapper(response);
	};

	return store;
};

export default PermissionStore;
