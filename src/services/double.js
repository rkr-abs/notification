const double = (input) => {
	const multiplier = 2;
	const type = {
		number: input * multiplier,
		string: input + input,
	};

	return type[typeof input];
};

export default double;
