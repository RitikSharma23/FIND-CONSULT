var express = require("express");
var bodyParser = require("body-parser");
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var validator = require("express-validator");

const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST || process.env.INSTANCE_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.INSTANCE_PORT || null,
//   socketPath: process.env.INSTANCE_SOCKET_PATH || null,
// });

const multer = require("multer");
const sharp = require("sharp");

const app = express();
const upload = multer({ dest: "uploads/" });

module.exports = function (app,connection) {

  function isUserAllowed(req, res, next) {
    sess = req.session;
    if (sess.user) {
      return next();
    } else {
      res.redirect("/home");
    }
  }
  

  function getUserDetails(req,res,callback) {
    if (req.session.loggedIn) {
      connection.query('SELECT * FROM users WHERE email = ?', [req.session.user.email], function(err, results) {
        if (err) {
          console.error("Error retrieving data: ", err);
          callback(err, null);
        } else {
          callback(null, results[0]);
        }
      });
		} else {
		  return res.render('Home/home', { isLogged: false });
		}

  }

  function addTypeToLocals(req, res, next) {
    sess = req.session;
    res.locals.type = sess.utype;
    res.locals.fname = "Ritik";
    next();
  }
  app.use(addTypeToLocals);


  app.get("/dashboard", isUserAllowed, function (req, res) {
    res.locals.title = "Dashboard";
    getUserDetails(req,res, function(err, userDetails) {
      res.render(`${req.session.user.userType}/dashboard/index`, {
        type: req.session.user.userType,
        isLogged: req.session.loggedIn,
        users: userDetails
      });
    });
  });


  app.get("/profile", isUserAllowed, function (req, res) {
    res.locals.title = "Dashboard";
    getUserDetails(req,res, function(err, userDetails) {
      res.render(`${req.session.user.userType}/Profile/profile`, {
        type: req.session.user.userType,
        isLogged: req.session.loggedIn,
        users: userDetails
      });
    });
  });

  app.get("/chat", isUserAllowed, function (req, res) {
    res.locals.title = "Dashboard";
    getUserDetails(req,res, function(err, userDetails) {
      res.render(`${req.session.user.userType}/Chat/chat`, {
        type: req.session.user.userType,
        isLogged: req.session.loggedIn,
        users: userDetails
      });
    });
  });

  app.get("/wishlists", isUserAllowed, function (req, res) {
    res.locals.title = "Dashboard";
    getUserDetails(req,res, function(err, userDetails) {
      res.render(`${req.session.user.userType}/Wishlists/wishlists`, {
        type: req.session.user.userType,
        isLogged: req.session.loggedIn,
        users: userDetails
      });
    });
  });

  


  app.get("/home", isUserAllowed, function (req, res) {
    res.locals.title = "Home";
    res.render('Home/home',{page:"home"})
  });


  // app.use("*", function(req, res) {
  //   res.redirect("/other-page");
  // });



  
  app.get("/", function (req, res) {
    res.locals.title = "Dashboard";
    res.redirect("/home");
  });


  app.get("/admin", isUserAllowed, function (req, res) {
    res.locals.title = "Dashboard";
    res.render("Admin/Dashboard/index");
  });

  app.get("/subadmin", isUserAllowed, function (req, res) {
    res.locals.title = "Dashboard";
    res.render("Subadmin/Dashboard/index");
  });

  app.get("/new-listing1", isUserAllowed, function (req, res) {
    res.locals.title = "Dashboard";
    res.render("Superadmin/NewListing/step1");
  });

  //<--------------------------------Super Admin ----------------------------------------------------->

  // Listing

  app.get("/all-listing", isUserAllowed, function (req, res) {
    res.locals.title = "Data Tables";
    res.render(`${req.session.user.userType}/Listing/all-listing`, {
      type: req.session.user.userType,
    });
  });

  app.get("/reject-listing", isUserAllowed, function (req, res) {
    res.locals.title = "Data Tables";
    res.render(`${req.session.user.userType}/Listing/reject-listing`, {
      type: req.session.user.userType,
    });
  });

  app.get("/pending-listing", isUserAllowed, function (req, res) {
    res.locals.title = "Data Tables";
    res.render(`${req.session.user.userType}/Listing/pending-listing`, {
      type: req.session.user.userType,
    });
  });

  app.get("/new-listing", isUserAllowed, function (req, res) {
    res.locals.title = "Data Tables";
    res.render("Superadmin/Listing/new-listing");
  });

  // User

  app.get("/all-user", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query("SELECT * FROM users where role=4", (err, results) => {
      if (err) {
        console.error("Error retrieving data: ", err);
      } else {
        res.render("Superadmin/User/all-user", { users: results });
      }
    });
  });

  // Business

  app.get("/business-all-user", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query("SELECT * FROM users where step>=1", (err, results) => {
      if (err) {
        console.error("Error retrieving data: ", err);
      } else {
        res.render(`${req.session.user.userType}/Business/business-all-user`, {
          type: req.session.user.userType,
          users: results
        });
      }
    });
  });

  app.get("/business-reject-user", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query(
      "SELECT * FROM users where status=4 and role<>4",
      (err, results) => {
        if (err) {
          console.error("Error retrieving data: ", err);
        } else {
          res.render(`${req.session.user.userType}/Business/business-reject-user`, {
            type: req.session.user.userType,
            users: results
          });
        }
      }
    );
  });

  app.get("/business-pending-user", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query(
      "SELECT * FROM users where status=2 and role<>4",
      (err, results) => {
        if (err) {
          console.error("Error retrieving data: ", err);
        } else {
          res.render(`${req.session.user.userType}/Business/business-pending-user`, {
            type: req.session.user.userType,
            users: results
          });
        }
      }
    );
  });

  app.get("/business-new-user", isUserAllowed, function (req, res) {
    res.locals.title = "New User";
    connection.query(
      "SELECT * FROM users where status=3 and role<>4",
      (err, results) => {
        if (err) {
          console.error("Error retrieving data: ", err);
        } else {
          res.render(`${req.session.user.userType}/Business/business-new-user`, {
            type: req.session.user.userType,
            users: results
          });
        }
      }
    );
  });

  app.post("/business-update-user", isUserAllowed, function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var id = req.body.id;
    var instagram = req.body.instagram;
    var twitter = req.body.twitter;
    var facebook = req.body.facebook;

    connection.query(
      "UPDATE users SET name=?, email=?, phone=?, instagram=?, twitter=?, facebook=? WHERE id=?",
      [name, email, phone, instagram, twitter, facebook, id],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/business-delete-user", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    connection.query(
      "DELETE FROM users WHERE id = ?",
      [userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/business-admin-user", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    connection.query(
      "UPDATE users set role=2 WHERE id = ?",
      [userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/business-reject-user", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE users set status=4,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/business-verify-user", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE users set status=1,role=2,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/business-makenew-user", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE users set status=3,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/business-makepending-user", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE users set status=2,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/business-image-upload", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var image = req.body.image;
    console.log(image);
    connection.query(
      "UPDATE users set profile_image=? WHERE id = ?",
      [image, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  // country

  app.post("/country-update", isUserAllowed, function (req, res) {
    var name = req.body.name;
    var id = req.body.id;
    connection.query(
      "UPDATE countries SET country_name=? WHERE id=?",
      [name, id],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.get("/countries-all", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query("SELECT * FROM countries", (err, results) => {
      if (err) {
        console.error("Error retrieving data: ", err);
      } else {
        res.render(`${req.session.user.userType}/countries/all-countries`, {
          type: req.session.user.userType,
          country: results,
        });
      }
    });
  });

  app.get("/countries-reject", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query(
      "SELECT * FROM countries where status=4",
      (err, results) => {
        if (err) {
          console.error("Error retrieving data: ", err);
        } else {
          res.render(`${req.session.user.userType}/countries/reject-countries`, {
            type: req.session.user.userType,
            country: results,
          });
        }
      }
    );
  });

  app.get("/countries-pending", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query(
      "SELECT * FROM countries where status=2",
      (err, results) => {
        if (err) {
          console.error("Error retrieving data: ", err);
        } else {
          res.render(`${req.session.user.userType}/countries/pending-countries`, {
            type: req.session.user.userType,
            country: results,
          });
        }
      }
    );
  });

  app.get("/countries-new", isUserAllowed, function (req, res) {
    res.locals.title = "New User";
    connection.query(
      "SELECT * FROM countries where status=3",
      (err, results) => {
        if (err) {
          console.error("Error retrieving data: ", err);
        } else {
          res.render(`${req.session.user.userType}/countries/new-countries`, {
            type: req.session.user.userType,
            country: results,
          });
        }
      }
    );
  });

  app.post("/country-delete", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    connection.query(
      "DELETE FROM countries WHERE id = ?",
      [userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/country-reject", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE countries set status=4,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/country-verify", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE countries set status=1,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/country-makenew", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE countries set status=3,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/country-feature", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE countries set is_featured=1,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/country-unfeature", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE countries set is_featured=0,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/country-makepending", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE countries set status=2,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/image-upload", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var image = req.body.image;
    connection.query(
      "UPDATE countries set image=? WHERE id = ?",
      [image, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  // CATEGORY

  app.post("/category-update", isUserAllowed, function (req, res) {
    var name = req.body.name;
    var id = req.body.id;
    connection.query(
      "UPDATE categories SET category_name=? WHERE id=?",
      [name, id],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.get("/categories-all", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query("SELECT * FROM categories", (err, results) => {
      if (err) {
        console.error("Error retrieving data: ", err);
      } else {
        res.render(`${req.session.user.userType}/Categories/all-categories`, {
          type: req.session.user.userType,
          category: results,
        });
      }
    });
  });

  app.get("/categories-reject", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query(
      "SELECT * FROM categories where status=4",
      (err, results) => {
        if (err) {
          console.error("Error retrieving data: ", err);
        } else {
        res.render(`${req.session.user.userType}/Categories/reject-categories`, {
          type: req.session.user.userType,
          category: results,
        });
        }
      }
    );
  });

  app.get("/categories-pending", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query(
      "SELECT * FROM categories where status=2",
      (err, results) => {
        if (err) {
          console.error("Error retrieving data: ", err);
        } else {
          res.render(`${req.session.user.userType}/Categories/pending-categories`, {
            type: req.session.user.userType,
            category: results,
          });
        }
      }
    );
  });

  app.get("/categories-new", isUserAllowed, function (req, res) {
    res.locals.title = "New User";
    connection.query(
      "SELECT * FROM categories where status=3",
      (err, results) => {
        if (err) {
          console.error("Error retrieving data: ", err);
        } else {
          res.render(`${req.session.user.userType}/Categories/new-categories`, {
            type: req.session.user.userType,
            category: results,
          });
        }
      }
    );
  });

  app.post("/category-delete", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    connection.query(
      "DELETE FROM categories WHERE id = ?",
      [userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/category-reject", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE categories set status=4,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/category-verify", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE categories set status=1,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/category-makenew", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE categories set status=3,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/category-makepending", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var message = req.body.comment;
    connection.query(
      "UPDATE categories set status=2,comment=? WHERE id = ?",
      [message, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/categories-image-upload", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    var image = req.body.image;
    connection.query(
      "UPDATE categories set image=? WHERE id = ?",
      [image, userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  // Ribbons

  app.get("/ribbons-all", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query("SELECT * FROM ribbon_tags", (err, results) => {
      if (err) {
        console.error("Error retrieving data: ", err);
      } else {
        res.render(`${req.session.user.userType}/ribbons/all-ribbons`, {
          type: req.session.user.userType,
          ribbon: results
        });
      }
    });
  });

  app.post("/ribbon-delete", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    connection.query(
      "DELETE FROM ribbon_tags WHERE id = ?",
      [userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.post("/ribbon-update", isUserAllowed, function (req, res) {
    var name = req.body.name;
    var color = req.body.color;
    var id = req.body.id;
    connection.query(
      "UPDATE ribbon_tags SET name=?, color=? WHERE id=?",
      [name, color, id],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  // Blog Categories

  app.post("/BlogCategory-update", isUserAllowed, function (req, res) {
    var name = req.body.name;
    var id = req.body.id;
    connection.query(
      "UPDATE blog_categories SET name=? WHERE id=?",
      [name, id],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.get("/blogcategory-all", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query("SELECT * FROM blog_categories", (err, results) => {
      if (err) {
        console.error("Error retrieving data: ", err);
      } else {
        res.render(`${req.session.user.userType}/BlogCategories/all-BlogCategories`, {
          type: req.session.user.userType,
          blogcategory: results,
        });
      }
    });
  });

  app.post("/BlogCategory-delete", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    connection.query(
      "DELETE FROM blog_categories WHERE id = ?",
      [userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  // Blogs

  app.post("/blog-update", isUserAllowed, function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var short_description = req.body.short_description;
    var long_description = req.body.long_description;
    var blogcategory = req.body.blogcategory;
    connection.query(
      "UPDATE blogs SET blog_category_id=?, name=?, short_description=?, long_description=? WHERE id=?",
      [blogcategory, name, short_description, long_description, id],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  app.get("/blog-all", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query(
      "SELECT blogs.*, blog_categories.name AS blogcategory FROM blogs LEFT JOIN blog_categories ON blogs.blog_category_id = blog_categories.id;",
      (err, results1) => {
        if (err) {
          console.error("Error retrieving data: ", err);
        } else {
          connection.query(
            "SELECT * from blog_categories;",
            (err, results2) => {
              if (err) {
                console.error("Error retrieving data: ", err);
              } else {
                res.render(`${req.session.user.userType}/Blogs/all-blogs`, {
                  type: req.session.user.userType,
                  blogs: results1,
                  categories: results2,
                });
              }
            }
          );
        }
      }
    );
  });

  app.post("/blog-delete", isUserAllowed, function (req, res) {
    var userId = req.body.id;
    connection.query(
      "DELETE FROM blogs WHERE id = ?",
      [userId],
      function (err, result) {
        if (err) {
          res.send(false);
        } else {
          res.send(true);
        }
      }
    );
  });

  // Reviews

  app.get("/reviews", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query(
      "SELECT listing_reviews.*,listings.name as listingname FROM `listing_reviews` LEFT JOIN listings on listings.id=listing_reviews.listing_id;",
      (err, results) => {
        if (err) {
          console.error("Error retrieving data: ", err);
        } else {
          res.render(`${req.session.user.userType}/Reviews/reviews`, {
            type: req.session.user.userType,
            reviews: results
          });
        }
      }
    );
  });

  // New Business

  app.get("/new-business1", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query("SELECT * FROM users where role<>4", (err, results) => {
      if (err) {
        console.error("Error retrieving data: ", err);
      }
      res.render("Superadmin/NewBusiness/Step1", { users: results });
    });
  });

  app.get("/new-business2", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query("SELECT * FROM users where role<>4", (err, results) => {
      if (err) {
        console.error("Error retrieving data: ", err);
      }
      res.render("Superadmin/NewBusiness/Step2", { users: results });
    });
  });

  app.get("/new-business3", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query("SELECT * FROM users where role<>4", (err, results) => {
      if (err) {
        console.error("Error retrieving data: ", err);
      }
      res.render("Superadmin/NewBusiness/Step3", { users: results });
    });
  });

  app.get("/new-business4", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query("SELECT * FROM users where role<>4", (err, results) => {
      if (err) {
        console.error("Error retrieving data: ", err);
      }
      res.render("Superadmin/NewBusiness/Step4", { users: results });
    });
  });

  app.get("/new-business5", isUserAllowed, function (req, res) {
    res.locals.title = "All User";
    connection.query("SELECT users.*, company_users.* FROM users LEFT JOIN company_users ON users.id = company_users.admin_id where company_users.company_id=27;", (err, results) => {
      if (err) {
        console.error("Error retrieving data: ", err);
      }
      res.render("Superadmin/NewBusiness/Step5", { users: results });
    });
  });


// NEW BUSINESS






// STEP 4


// STEP 5


app.post("/step5_addowner", isUserAllowed, function (req, res) {
  var newEmail=req.body.newEmail;
  var newPhone=req.body.newPhone;
  var id=27

  connection.query("SELECT * FROM users where phone=? and email=?", [newPhone,newEmail],(err, results) => {
    if (err) {
      console.error("Error retrieving data: ", err);
    }else{
      if(results.length==0){
        res.send(false)
      }else{

          connection.query(
          "insert into company_users (company_id,admin_id) values(?,?)",
          [id,results[0].id],
          function (err, result) {
              if(err){
                res.send("already")
              }else{
                res.send(true)
              }
          }
        );

      }


    }

  });


});




















  // Layouts
  app.get("/layouts-light-sidebar", isUserAllowed, function (req, res) {
    res.locals.title = "Light Sidebar";
    res.render("Dashboard/index", { layout: "layoutsLightSidebar" });
  });
  app.get("/layouts-compact-sidebar", isUserAllowed, function (req, res) {
    res.locals.title = "Compact Sidebar";
    res.render("Dashboard/index", { layout: "layoutsCompactSidebar" });
  });
  app.get("/layouts-icon-sidebar", isUserAllowed, function (req, res) {
    res.locals.title = "Icon Sidebar";
    res.render("Dashboard/index", { layout: "layoutsIconSidebar" });
  });
  app.get("/layouts-boxed", isUserAllowed, function (req, res) {
    res.locals.title = "Boxed Width";
    res.render("Dashboard/index", { layout: "layoutsBoxed" });
  });
  app.get("/layouts-preloader", isUserAllowed, function (req, res) {
    res.locals.title = "Preloader";
    res.render("Dashboard/index", { layout: "layoutsPreloader" });
  });
  app.get("/layouts-colored-sidebar", isUserAllowed, function (req, res) {
    res.locals.title = "Colored Sidebar";
    res.render("Dashboard/index", { layout: "layoutsColoredSidebar" });
  });

  app.get("/layouts-horizontal", isUserAllowed, function (req, res) {
    res.locals.title = "Horizontal";
    res.render("Dashboard/index", { layout: "layoutsHorizontal" });
  });
  app.get("/layouts-hori-topbar-light", isUserAllowed, function (req, res) {
    res.locals.title = "Topbar Light";
    res.render("Dashboard/index", { layout: "layoutsHTopbarLight" });
  });
  app.get("/layouts-hori-boxed-width", isUserAllowed, function (req, res) {
    res.locals.title = "Boxed Width";
    res.render("Dashboard/index", { layout: "layoutsHBoxed" });
  });
  app.get("/layouts-hori-preloader", isUserAllowed, function (req, res) {
    res.locals.title = "Preloader";
    res.render("Dashboard/index", { layout: "layoutsHPreloader" });
  });
  app.get("/layouts-hori-colored-header", isUserAllowed, function (req, res) {
    res.locals.title = "Colored Header";
    res.render("Dashboard/index", { layout: "layoutsHColoredHeader" });
  });

  app.get("/vertical-rtl", isUserAllowed, function (req, res) {
    res.locals.title = "Vertical Rtl";
    res.render("Dashboard/index", { layout: "vertical-rtl-layout" });
  });

  // Dark and RTL Mode Horizontal
  app.get("/horizontal-dark", isUserAllowed, function (req, res) {
    res.locals.title = "Horizontal Dark";
    res.render("Dashboard/index", { layout: "horizontal-dark-layout" });
  });

  app.get("/horizontal-rtl", isUserAllowed, function (req, res) {
    res.locals.title = "Horizontal Rtl";
    res.render("Dashboard/index", { layout: "horizontal-rtl-layout" });
  });

  // Calendar
  app.get("/calendar", isUserAllowed, function (req, res) {
    res.locals.title = "Calendar";
    res.render("Calendar/calendar");
  });

  app.get("/apps-chat", isUserAllowed, function (req, res) {
    res.locals.title = "Chat";
    res.render("Chat/apps-chat");
  });

  app.get("/ecommerce-products", isUserAllowed, function (req, res) {
    res.locals.title = "Products";
    res.render("Ecommerce/ecommerce-products");
  });

  app.get("/ecommerce-product-detail", isUserAllowed, function (req, res) {
    res.locals.title = "Product Detail";
    res.render("Ecommerce/ecommerce-product-detail");
  });

  app.get("/ecommerce-orders", isUserAllowed, function (req, res) {
    res.locals.title = "Orders";
    res.render("Ecommerce/ecommerce-orders");
  });

  app.get("/ecommerce-customers", isUserAllowed, function (req, res) {
    res.locals.title = "Customers";
    res.render("Ecommerce/ecommerce-customers");
  });

  app.get("/ecommerce-cart", isUserAllowed, function (req, res) {
    res.locals.title = "Cart";
    res.render("Ecommerce/ecommerce-cart");
  });

  app.get("/ecommerce-checkout", isUserAllowed, function (req, res) {
    res.locals.title = "Checkout";
    res.render("Ecommerce/ecommerce-checkout");
  });

  app.get("/ecommerce-shops", isUserAllowed, function (req, res) {
    res.locals.title = "Shops";
    res.render("Ecommerce/ecommerce-shops");
  });

  app.get("/ecommerce-add-product", isUserAllowed, function (req, res) {
    res.locals.title = "Add Product";
    res.render("Ecommerce/ecommerce-add-product");
  });

  // Email
  app.get("/email-inbox", isUserAllowed, function (req, res) {
    res.locals.title = "Inbox";
    res.render("Email/email-inbox");
  });
  app.get("/email-read", isUserAllowed, function (req, res) {
    res.locals.title = "Email Read";
    res.render("Email/email-read");
  });

  //kanban board
  app.get("/apps-kanban-board", isUserAllowed, function (req, res) {
    res.locals.title = "Kanban Board";
    res.render("KanbanBoard/apps-kanban-board");
  });

  // Utility
  app.get("/pages-starter", isUserAllowed, function (req, res) {
    res.locals.title = "Starter page";
    res.render("Pages/pages-starter");
  });
  app.get("/pages-maintenance", isUserAllowed, function (req, res) {
    res.locals.title = "Maintenance";
    res.render("Pages/pages-maintenance");
  });
  app.get("/pages-comingsoon", isUserAllowed, function (req, res) {
    res.locals.title = "Coming Soon";
    res.render("Pages/pages-comingsoon");
  });

  app.get("/pages-timeline", isUserAllowed, function (req, res) {
    res.locals.title = "Timeline";
    res.render("Pages/pages-timeline");
  });

  app.get("/pages-faqs", isUserAllowed, function (req, res) {
    res.locals.title = "FAQs";
    res.render("Pages/pages-faqs");
  });
  app.get("/pages-pricing", isUserAllowed, function (req, res) {
    res.locals.title = "Pricing";
    res.render("Pages/pages-pricing");
  });
  app.get("/pages-404", isUserAllowed, function (req, res) {
    res.locals.title = "404 Error";
    res.render("Pages/pages-404");
  });
  app.get("/pages-500", isUserAllowed, function (req, res) {
    res.locals.title = "500 Error";
    res.render("Pages/pages-500");
  });

  // // UI Elements
  app.get("/ui-alerts", isUserAllowed, function (req, res) {
    res.locals.title = "Alerts";
    res.render("Ui/ui-alerts");
  });
  app.get("/ui-buttons", isUserAllowed, function (req, res) {
    res.locals.title = "Buttons";
    res.render("Ui/ui-buttons");
  });
  app.get("/ui-cards", isUserAllowed, function (req, res) {
    res.locals.title = "Cards";
    res.render("Ui/ui-cards");
  });
  app.get("/ui-carousel", isUserAllowed, function (req, res) {
    res.locals.title = "Carousel";
    res.render("Ui/ui-carousel");
  });
  app.get("/ui-dropdowns", isUserAllowed, function (req, res) {
    res.locals.title = "Dropdowns";
    res.render("Ui/ui-dropdowns");
  });
  app.get("/ui-grid", isUserAllowed, function (req, res) {
    res.locals.title = "Grid";
    res.render("Ui/ui-grid");
  });
  app.get("/ui-images", isUserAllowed, function (req, res) {
    res.locals.title = "Images";
    res.render("Ui/ui-images");
  });
  app.get("/ui-lightbox", isUserAllowed, function (req, res) {
    res.locals.title = "Lightbox";
    res.render("Ui/ui-lightbox");
  });
  app.get("/ui-modals", isUserAllowed, function (req, res) {
    res.locals.title = "Modals";
    res.render("Ui/ui-modals");
  });
  app.get("/ui-rangeslider", isUserAllowed, function (req, res) {
    res.locals.title = "Range Slider";
    res.render("Ui/ui-rangeslider");
  });
  app.get("/ui-roundslider", isUserAllowed, function (req, res) {
    res.locals.title = "Round slider";
    res.render("Ui/ui-roundslider");
  });
  app.get("/ui-session-timeout", isUserAllowed, function (req, res) {
    res.locals.title = "Session Timeout";
    res.render("Ui/ui-session-timeout");
  });
  app.get("/ui-progressbars", isUserAllowed, function (req, res) {
    res.locals.title = "Progress Bars";
    res.render("Ui/ui-progressbars");
  });
  app.get("/ui-sweet-alert", isUserAllowed, function (req, res) {
    res.locals.title = "SweetAlert 2";
    res.render("Ui/ui-sweet-alert");
  });
  app.get("/ui-tabs-accordions", isUserAllowed, function (req, res) {
    res.locals.title = "Tabs & Accordions";
    res.render("Ui/ui-tabs-accordions");
  });
  app.get("/ui-typography", isUserAllowed, function (req, res) {
    res.locals.title = "Typography";
    res.render("Ui/ui-typography");
  });
  app.get("/ui-video", isUserAllowed, function (req, res) {
    res.locals.title = "Video";
    res.render("Ui/ui-video");
  });
  app.get("/ui-general", isUserAllowed, function (req, res) {
    res.locals.title = "General";
    res.render("Ui/ui-general");
  });
  app.get("/ui-rating", isUserAllowed, function (req, res) {
    res.locals.title = "Rating";
    res.render("Ui/ui-rating");
  });
  app.get("/ui-notifications", isUserAllowed, function (req, res) {
    res.locals.title = "Notifications";
    res.render("Ui/ui-notifications");
  });

  // Forms
  app.get("/form-elements", isUserAllowed, function (req, res) {
    res.locals.title = "Form Elements";
    res.render("Form/form-elements");
  });
  app.get("/form-validation", isUserAllowed, function (req, res) {
    res.locals.title = "Form Validation";
    res.render("Form/form-validation");
  });
  app.get("/form-advanced", isUserAllowed, function (req, res) {
    res.locals.title = "Form Advanced";
    res.render("Form/form-advanced");
  });
  app.get("/form-editors", isUserAllowed, function (req, res) {
    res.locals.title = "Form Editor";
    res.render("Form/form-editors");
  });
  app.get("/form-uploads", isUserAllowed, function (req, res) {
    res.locals.title = "File Upload";
    res.render("Form/form-uploads");
  });
  app.get("/form-xeditable", isUserAllowed, function (req, res) {
    res.locals.title = "Form Xeditable";
    res.render("Form/form-xeditable");
  });
  app.get("/form-wizard", isUserAllowed, function (req, res) {
    res.locals.title = "Form Wizard";
    res.render("Form/form-wizard");
  });
  app.get("/form-mask", isUserAllowed, function (req, res) {
    res.locals.title = "Form Mask";
    res.render("Form/form-mask");
  });

  // Tables
  // app.get('/tables-basic', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Basic Tables';
  //       res.render('Tables/tables-basic');
  // });
  // app.get('/tables-datatable', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Data Tables';
  //       res.render('Tables/tables-datatable');
  // });
  // app.get('/tables-responsive', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Responsive Table';
  //       res.render('Tables/tables-responsive');
  // });
  // app.get('/tables-editable', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Editable Table';
  //       res.render('Tables/tables-editable');
  // });

  // Charts
  // app.get('/charts-apex', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Apex charts';
  //       res.render('Charts/charts-apex');
  // });
  // app.get('/charts-chartjs', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Chartjs';
  //       res.render('Charts/charts-chartjs');
  // });
  // app.get('/charts-flot', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Flot Chart';
  //       res.render('Charts/charts-flot');
  // });
  // app.get('/charts-knob', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Jquery Knob';
  //       res.render('Charts/charts-knob');
  // });
  // app.get('/charts-sparkline', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Sparkline Chart';
  //       res.render('Charts/charts-sparkline');
  // });

  // Icons
  // app.get('/icons-remix', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Remix Icons';
  //       res.render('Icons/icons-remix');
  // });
  // app.get('/icons-materialdesign', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Material Design Icons';
  //       res.render('Icons/icons-materialdesign');
  // });
  // app.get('/icons-dripicons', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Dripicons';
  //       res.render('Icons/icons-dripicons');
  // });
  // app.get('/icons-fontawesome', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Font Awesome 5';
  //       res.render('Icons/icons-fontawesome');
  // });

  // Maps
  // app.get('/maps-google', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Google Maps';
  //       res.render('Maps/maps-google');
  // });
  // app.get('/maps-vector', isUserAllowed, function (req, res) {
  //       res.locals.title = 'Vector Maps';
  //       res.render('Maps/maps-vector');
  // });
};
