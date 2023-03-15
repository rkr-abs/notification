const XlsExport = require('xlsexport');
const pdfParser = require('./pdfPraser');
const fs = require('fs');
const folderPath = './temp';
const files = fs.readdirSync(folderPath);

const cvtArrayToExl = async () => {
	const data = await pdfParser(files);
	const xls = new XlsExport(data, 'title');

	xls.exportToXLS('export.xls');
};

cvtArrayToExl();
