const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const port = process.env.port || 3000;
var Candidat = require('./models/Candidat');
const bcrypt = require('bcrypt');
var cors = require('cors');
const app = express();
var multer = require('multer');
const morgan = require('morgan');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
var upload = multer({storage: storage});

var db = mongoose.connect('mongodb://localhost:27017/eventAuthentication', {
  useNewUrlParser: true,
  useCreateIndex: true,
}, (err) => {
  if (!err) {
    console.log('connected to database successfully');
  } else {
    console.log('Error while connection:' + err);
  }
});
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.send('helloooo');
});
app.post('/fileUpload', upload.single('image'), (req, res, next) => {

      insertDocuments(db, 'public/images/uploads/' + req.body.imagePath, () => {
          db.close();
          res.json({message: 'File uploaded successfully'});
      });
  });
var insertDocuments = function(db, filePath, callback) {

  insertOne({'imagePath' : filePath }, (err, result) => {
      assert.equal(err, null);
      callback(result);
  });
}
app.post('/login', async (req, res) => {
  resultLogin = await Candidat.findOne({email: req.body.email});
  if (!resultLogin) {
    res.send({message: 'user not found'});
  }
  if ( resultLogin.password !== req.body.password) {
    res.send({message: 'bad password'})
  } else {
    res.send({message: 'OK'})
  }

})
app.post('/register', async (req, res) => {
  var candidat = new Candidat();
  candidat.firstname = req.body.firstnameValue;
  candidat.lastname = req.body.lastnameValue;
  resultRegister = await Candidat.findOne({email: req.body.email});
  if (!resultRegister) {
    candidat.email = req.body.emailValue;
    req.body.password = bcrypt.hashSync(req.body.passwordValue, 10);
    candidat.password = req.body.passwordValue;
    candidat.save((err, doc) => {
      if (!err) {
        res.send({success: "a new user is successfully added", status: 200});
      } else {
        if (err.name === 'ValidationError') {
          handleValidationError(err, req.body);
        }
        console.log("there is an error while adding user in DB:" + err);
        res.send({success: "failed to add new user", status: 500});
      }
    })
  } else {
    res.send({success: "email already exists !!!", status: 500})
  }


});


function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case 'firstname':
        body['firstnameError'] = err.errors[field].message;
        break;
      case 'lastname':
        body['lastnameError'] = err.errors[field].message;
        break;
      case 'email':
        body['emailError'] = err.errors[field].message;
        break;
      case 'password':
        body['passwordError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}


app.listen(port, function (err, response) {
  console.log('started at port number : ', port);
});
