const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const upload = multer({ dest: './public/uploads' });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
	try {
		if (!req.file) throw new Error('Missing file');

		const file = req.file;

		res.status(200).json(file);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Your app is listening on port ' + port);
});
