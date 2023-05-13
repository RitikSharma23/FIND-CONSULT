var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });

var validator = require('express-validator');

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);
const mysql = require("mysql");




module.exports = function (app,connection) {

	// Inner Auth
	app.get('/pages-login', function (req, res) {
		res.locals = { title: 'Login 1' };
		res.render('AuthInner/pages-login');
	});
	app.get('/pages-register', function (req, res) {
		res.locals = { title: 'Register 1' };
		res.render('AuthInner/pages-register');
	});
	app.get('/pages-recoverpw', function (req, res) {
		res.locals = { title: 'Recover Password 1' };
		res.render('AuthInner/pages-recoverpw');
	});
	app.get('/pages-lock-screen', function (req, res) {
		res.locals = { title: 'Lock Screen 1' };
		res.render('AuthInner/pages-lock-screen');
	});

	// Extra Pages
	app.get('/home', function (req, res) {
		res.locals = { title: 'Error 404' };
		if (req.session.loggedIn) {
		  connection.query('SELECT * FROM users WHERE email = ?', [req.session.user.email], function(err, results) {
			if (err) {
			  console.error("Error retrieving data: ", err);
			  return res.render('Home/home', { isLogged: false });
			}	  
			return res.render('Home/home', { users: results[0], isLogged: true });
		  });
		} else {
		  return res.render('Home/home', { isLogged: false });
		}
	  });
	  

	app.get('/pages-404', function (req, res) {
		res.locals = { title: 'Error 404' };
		res.render('Pages/pages-404');
	});
	app.get('/pages-500', function (req, res) {
		res.locals = { title: 'Error 500' };
		res.render('Pages/pages-500');
	});
	app.get('/pages-comingsoon', function (req, res) {
		res.locals = { title: 'Coming Soon' };
		res.render('Pages/pages-comingsoon');
	});

	app.get('/pages-maintenance', function (req, res) {
		res.locals = { title: 'Maintenance' };
		res.render('Pages/pages-maintenance');
  	});



	app.get('/register', function (req, res) {
		if (req.user) { res.redirect('Dashboard/index'); }
		else {
			res.render('Auth/auth-register', { 'message': req.flash('message'), 'error': req.flash('error') });
		}
	});



	app.get('/login', function (req, res) {
		res.render('Auth/auth-login', { 'message': req.flash('message'), 'error': req.flash('error') });
	});

	const bcrypt = require('bcrypt');

	app.post('/post-login', function(req, res) {
	  const email = req.body.email;
	  const password = req.body.password;
	
	  connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, results) {
		if (err) {
		  console.error('Error retrieving user data: ', err);
		  console.log(err)
		  return res.sendStatus(500);
		}
	
		if (results.length === 0) {
		  return res.json({"status":false,"msg":"NO Email ID Found"});
		}
		const user = results[0];
		bcrypt.compare(password, user.password, function(err, isMatch) {
		  if (err) {
			console.error('Error comparing passwords: ', err);
			return res.sendStatus(500);
		  }
	
		  if (!isMatch) {
			return res.json({"status":false,"msg":"Wrong Password For This Email ID"});
		  }
		  if(user.role==1)	var utype="superadmin"
		  if(user.role==2)	var utype="admin"
		  if(user.role==3)	var utype="subadmin"
		  if(user.role==4)	var utype="user"

		  req.session.user = {id:user.id, email: user.email,userType:utype};
		  req.session.loggedIn = true;
		  req.session.expires = new Date(Date.now() + 3600000);

		  console.log(req.session)


		return res.json({"status":true});
		  
		});
	  });
	});





app.post('/post-register', function(req, res) {
  const name = req.body.regname;
  const email = req.body.regemail;
  const password = req.body.regpassword;

  bcrypt.hash(password, 10, function(err, hashedPassword) {
    if (err) {
      console.error('Error hashing password: ', err);
      return res.sendStatus(500);
    }
	

    connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], function(err, result) {
      if (err) {
		return res.json({"status":false,"msg":"Email Already Exists"});
      }
		return res.json({"status":true});
    });
  });
});

	

	app.get('/forgot-password', function (req, res) {
		res.render('Auth/auth-forgot-password', { 'message': req.flash('message'), 'error': req.flash('error') });
	});

	app.post('/post-forgot-password', urlencodeParser, function (req, res) {
		const validUser = users.filter(usr => usr.email === req.body.email);
		if (validUser['length'] === 1) {
			req.flash('message', 'We have e-mailed your password reset link!');
			res.redirect('/forgot-password');
		} else {
			req.flash('error', 'Email Not Found !!');
			res.redirect('/forgot-password');
		}
	});

	app.get('/logout', function (req, res) {
			req.session.destroy();		  
		res.redirect('/home');
	});


};