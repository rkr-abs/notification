import actions from './actions';

const entities = {
	permissions: (context) => {
		const { action } = context;

		return actions[action](context);
	},
	foregroundLocation: async ({ pipe }) => {
		const res = await navigator.geolocation.getCurrentPosition((data) =>
			pipe(data));

		return { data: res };
	},
};

export default entities;
