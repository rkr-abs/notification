import double from './double';

describe('double', () => {
	const two = 2;
	const expectations = [[two, 'number'], ['ram', 'string']];

	test.each(expectations)('Test for double when the input is  %%p',
		(data, inputType) => {
			const multiplier = 2;
			const input = data;
			const type = {
				number: input * multiplier,
				string: input + input,
			};
			const expected = type[inputType] ;
			const result = double(input);

			expect(result).toEqual(expected);
		});
});
