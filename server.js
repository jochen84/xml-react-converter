const express = require('express');
const fileUpload = require('express-fileupload');
const converter = require('./converterModule');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(fileUpload());

app.post('/upload', (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ msg: 'No file uploaded' });
	}

	const file = req.files.file;
	file.mv(`${__dirname}/client/src/assets/uploads/konvertera.txt`, err => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
		res.json({ fileName: file.name, filePath: `/uploads/konvertera.txt` });
	});
});

app.post('/convert', (req, res) => {
	converter.init.init();
});

app.listen(PORT, () =>{
	console.log(`Listening at port ${PORT}`);
});

