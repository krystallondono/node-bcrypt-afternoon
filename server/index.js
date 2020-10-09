require('dotenv').config();

const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      authCtrl = require('./controllers/authController'),
      treasureCtrl = require('./controllers/treasureController'),
      const auth = require('./middleware/authMiddleware'),
      bcrypt = require('bcryptjs'),
      app = express();


const {SESSION_SECRET, CONNECTION_STRING} = process.env;

const PORT = 4000;

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  }).then(db => {
    app.set('db', db);
    console.log('db connected');
  });

  // Authentication endpoints 
  app.post('/auth/register', authCtrl.register);
  app.post('/auth/login', authCtrl.login);
  app.get('/auth/logout', authCtrl.logout);

  // Treasure endpoints

  app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
  app.get('/api/treasure/user', treasureCtrl.getUserTreasure);

  // user only endpoints, cannot access without logging in
  app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure);
  app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure);
  app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure);


  app.use(
    session({
      resave: true,
      saveUninitialized: false,
      secret: SESSION_SECRET,
    })
  );

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));