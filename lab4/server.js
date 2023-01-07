const express = require('express');
const bookRoutes = require('./src/knjiga/routes');
const path = require('path');

const app = express();
const port = 3000;

const homeRouter = require('./routes/home.routes');
const loginRoute = require('./routes/login.routes');
const logoutRoute = require('./routes/logout.routes');
const userRoute = require('./routes/user.routes');
const downloadRoute = require('./routes/download.routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: '7ldE2N1tira9jgi9QiRAZ2co8tUPfY7e',
  issuerBaseURL: 'https://dev-wu5yttlsjwl5kxac.eu.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

const { requiresAuth } = require('express-openid-connect');

app.get('./routes/user.routes', requiresAuth(), (req, res) => {
    // res.send(JSON.stringify(req.oidc.user));
});

app.get('./routes/download.routes', requiresAuth(), (req, res) => {
});

app.use("/api/knjige/", bookRoutes);
app.use('/', homeRouter);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/user', userRoute);
app.use('/download', downloadRoute);

app.listen(port, () => console.log(`app listening on port ${port}`));