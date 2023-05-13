var app = require("express")();
require("dotenv").config();
var express = require("express");
var path = require("path");
var http = require("http").Server(app);
var validator = require("express-validator");

// import controller
var AuthController = require("./controllers/AuthController");

// import Router file
var pageRouter = require("./routers/route");
var userRouter = require("./routers/route_user");

var session = require("express-session");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var i18n = require("i18n-express");
app.set("trust proxy", 1); // trust first proxy
app.use(bodyParser.json());
var urlencodeParser = bodyParser.urlencoded({ extended: true });

app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1200000,
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  session({ resave: false, saveUninitialized: true, secret: "nodedemo" })
);
app.use(flash());
app.use(
  i18n({
    translationsPath: path.join(__dirname, "i18n"), // <--- use here. Specify translations files path.
    siteLangs: ["es", "en", "de", "ru", "it", "fr"],
    textsVarName: "translation",
  })
);

app.use("/public", express.static("public"));

app.get("/layouts/", function (req, res) {
  res.render("view");
});


const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "laravel"
  });
  
  connection.connect((err) => {
	if (err) {
	  console.error("Error connecting to database: ", err);
	} else {
	  console.log("Connected to database!");
	}
  });



AuthController(app,connection);

var expressLayouts = require("express-ejs-layouts");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

pageRouter(app,connection);
userRouter(app,connection);










const firebaseConfig = {
  apiKey: "AIzaSyABXVpVD6-H2KPAOky08g4ED3bVHjIj7L0",
  authDomain: "findconsult-53dd2.firebaseapp.com",
  projectId: "findconsult-53dd2",
  storageBucket: "findconsult-53dd2.appspot.com",
  messagingSenderId: "1079274966650",
  appId: "1:1079274966650:web:d03cd579d4ce97e30d75c3",
  measurementId: "G-2YC2EFRPCT"
};

// Initialize Firebase









app.get("/", function (req, res) {
  res.redirect("/");
});
let port = process.env.PORT || 8000;
http.listen(port, () => {
  console.log("listening on *:8000");
});
