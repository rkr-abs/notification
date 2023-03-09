const double = (input) => {
	const multiplier = 2;
	const type = {
		string: input * multiplier,
		number: input + input,
	};

	return type[typeof input];
};

export default double;
