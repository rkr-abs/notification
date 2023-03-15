const PDFParser = require('pdf-parse');
const { map } = require('@laufire/utils/collection');
const fs = require('fs');
const phoneRegex = /(?:\+?\d{1,3}[- ]?)?\d{10}/g;
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/gi;
const folderPath = './temp';

const temp = async (file) => {
	const dataBuffer = fs.readFileSync(`${ folderPath }/${ file }`);
	const res = await PDFParser(dataBuffer);
	const phoneNumbers = res.text.match(phoneRegex);
	const emailAddresses = res.text.match(emailRegex);

	return {
		phoneNumbers,
		emailAddresses,
	};
};
const pdfParser = async (files) => {
	const dummy = await Promise.all(map(files, (file) => temp(file)));

	return dummy;
};

const files = fs.readdirSync(folderPath);

const main = async () => {
	const result = await pdfParser(files);

	return result;
};

main();
module.exports = pdfParser;
