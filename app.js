const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5ebf6604a09a0822172f1c81')
   .then(user => {
     req.user = new User(user.name, user.email, user.cart, user._id);
     next();
    })
   .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

 // Place this with other requires (like 'path' and 'express')
 app.set('port', process.env.PORT || 5000)
  .use(express.static(__dirname + '/public'))
  .set('views', __dirname + '/views')
  .set('view engine', 'ejs')
  .get('/', jsonEngine.processJson)
  .listen(app.get('port'), function() {
  	console.log('Listening on port: ' + app.get('port'));
  });
const corsOptions = {
    origin: "https://great-books-store.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://nstratford_test:Brandnewrules76@cluster0-hi2mo.mongodb.net/shop?retryWrites=true&w=majority";


mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
     // This should be your user handling code implement following the course videos
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });

//mongoConnect(() => {
  
  //app.listen(3000);
//});

