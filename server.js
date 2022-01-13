require('dotenv').config();
const express = require('express');
const app = express()
const cors = require('cors');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Request logger:
app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

app.post('/api/fileanalyse', upload.single('upfile'), async function (req, res, next) {
  const file = req.file;

  res.json( {name: file.originalname, type: file.mimetype, size: file.size} );
  // req.file is the `upfile` file
  // req.body will hold the text fields, if there were any
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
