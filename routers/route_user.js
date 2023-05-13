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
const session = require("express-session");

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
		  return res.redirect('/home');
		}
  }

  function addTypeToLocals(req, res, next) {
    sess = req.session;
    res.locals.type = sess.utype;
    res.locals.fname = "Ritik";
    next();
  }
  app.use(addTypeToLocals);


  app.post("/user-addBusiness", isUserAllowed, function (req, res) {
    res.locals.title = "Dashboard";
    getUserDetails(req,res, function(err, userDetails) {
      if(!userDetails.is_profile){
        return res.json({"status":false,"msg":"Profile Incomplete! Please Complete Your Profile"})
      }else{
        return res.json({"status":true,"link":"/New-Business"})
      }

    });
  });


  app.post("/check-application", isUserAllowed, function (req, res) {
    res.locals.title = "Dashboard";

    connection.query(
      "select * from users where id=?",
      [req.session.user.id],
      function (err, result) {
        result=result[0]

        if(result.status==1){
          return res.json({"status":false,"msg":"Your Application Has been approved Please re-login"})

        }else if(result.status==2){
          return res.json({"status":false,"msg":result.comment})

        }else if(result.status==3){
          return res.json({"status":false,"msg":"Your Application is under review"})

        }else{
          return res.json({"status":false,"msg":result.comment})

        }
      }
    );




  });

  app.post("/user-addPhone", isUserAllowed, function (req, res) {
    res.locals.title = "Dashboard";

    if(!req.session.otp){
      req.session.otp = 123456;
      req.session.otpExpires = Date.now() + 30000;
      return res.json({"status":false,"msg":"otpSent"})
    }

    if(req.session.otp==req.body.otp){
      connection.query('update users set phone=? where email=?', [req.body.phone,req.session.user.email], function(err, results) {
        return res.json({"status":true,"msg":"verified"})
      });
    }else{
      return res.json({"status":false,"msg":"otpExpired"})
    }
  });



  app.get("/New-Business", function (req, res) {
    res.locals.title = "Dashbord";

    getUserDetails(req,res, function(err, userDetails) {
      
      if(userDetails.step==0){
        connection.query('SELECT * FROM countries where status=1', function(err, countries) {
          connection.query('SELECT * FROM categories where status=1', function(err, categories) {
            connection.query('SELECT company.* FROM company LEFT JOIN company_users ON company.id = company_users.company_id WHERE company_users.admin_id =?;',[req.session.user.id], function(err, company) {
              if(company.length==0){
                res.render(`${req.session.user.userType}/NewBusiness/Step1`, {
                  isLogged: req.session.loggedIn,
                  users: userDetails,
                  countries:countries,
                  categories:categories,
                  company:company,
                  isNew:true
                });
              }else{
                company=company[0]
                connection.query('select categories.category_name,categories.id from company_category_deals left join categories on company_category_deals.category_id=categories.id where company_category_deals.company_id=? ',[company.id], function(err, company_category_deals) {
                  connection.query('select countries.country_name,countries.id from company_country_deals left join countries on company_country_deals.country_id=countries.id where company_country_deals.company_id=? ',[company.id],function(err, company_country_deals) {
                    connection.query('SELECT * FROM search_tags where company_id=? ',[company.id], function(err, search_tags) {
                      res.render(`${req.session.user.userType}/NewBusiness/Step1`, {
                        isLogged: req.session.loggedIn,
                        users: userDetails,
                        countries:countries,
                        categories:categories,
                        company_category_deals:company_category_deals,
                        company_country_deals:company_country_deals,
                        search_tags:search_tags,
                        company:company,
                        isNew:false
                      });
                    })
                  })
                })

              }
              
            });
          });
        });
      }

      if(userDetails.step==1){
        connection.query('SELECT * FROM files where company_id=(select company_id from company_users where admin_id=?) ',[req.session.user.id], function(err, images) {
          res.render(`${req.session.user.userType}/NewBusiness/Step2`, {
            isLogged: req.session.loggedIn,
            users: userDetails,
            images:images
          });
        });

      }

      

      if(userDetails.step==2){
        connection.query('SELECT * FROM company where id=(select company_id from company_users where admin_id=?) ',[req.session.user.id], function(err, company) {
          company=company[0]
          res.render(`${req.session.user.userType}/NewBusiness/Step3`, {
            isLogged: req.session.loggedIn,
            users: userDetails,
            company:company
          });
        });
      }

      if(userDetails.step==3){
        connection.query('SELECT * FROM company where id=(select company_id from company_users where admin_id=?) ',[req.session.user.id], function(err, company) {
          company=company[0]
          connection.query('SELECT days.name, company_opening_hours.* FROM days LEFT JOIN company_opening_hours ON days.id = company_opening_hours.day_id where company_opening_hours.company_id=(select company_id from company_users where admin_id=?)',[req.session.user.id], function(err, hours) {
            res.render(`${req.session.user.userType}/NewBusiness/Step4`, {
              isLogged: req.session.loggedIn,
              users: userDetails,
              company:company,
              hours:hours
            });
          });
        });

      }


      if(userDetails.step==4){
        
        connection.query("SELECT users.*, company_users.* FROM users LEFT JOIN company_users ON users.id = company_users.admin_id where company_users.company_id=(select company_id from company_users where admin_id=?);",[req.session.user.id], (err, results) => {
          
          connection.query("SELECT * from company where id=(select company_id from company_users where admin_id=?);",[req.session.user.id], (err, company) => {
            if (err) {
              console.error("Error retrieving data: ", err);
            }
            res.render(`${req.session.user.userType}/NewBusiness/Step5`, { users: results,company:company });
          }); 
          }); 
          
      }
            

      if(userDetails.step==5){
        return res.redirect("/home")
      }

    });
    
  });




  
app.post("/Step1", isUserAllowed, function (req, res) {
  var company_name = req.body.company_name;
  var company_website = req.body.website;
  var company_email = req.body.company_email;
  var company_phone = req.body.company_phone;
  var keywords = req.body.keywords;
  var countries = req.body.countries;
  var categories = req.body.categories;
  var logo = req.body.logolink;
  var overview = req.body.overview;

  console.log(countries)
  console.log(categories)
  console.log(keywords)
keywords=keywords.split(",")


  connection.query(
    "insert into company (company_name,website,company_email,company_phone,overview,company_logo) values (?,?,?,?,?,?)",
    [company_name,company_website,company_email,company_phone,overview,logo],
    function (err, result) {
      if (err) {
        res.send(false);
        console.log(err)

      } else {
        var business_id = result.insertId;
        req.session.business_id=business_id;

        keywords.forEach(function(keyword) {
          if (keyword.trim() !== '') {
          connection.query("insert into search_tags (tags,company_id) values (?,?)",[keyword,business_id], (err, results) => {
            if (err) {
              console.error("Error retrieving data: ", err);
            }
          })
        }
        });

        countries.forEach(function(country) {
          if (country.trim() !== '') {
          connection.query("insert into company_country_deals (company_id,country_id) values (?,?)",[business_id,country], (err, results) => {
            if (err) {
              console.error("Error retrieving data: ", err);
            }
          })
        }
        });

        categories.forEach(function(country) {
          if (country.trim() !== '') {
          connection.query("insert into company_category_deals (company_id,category_id) values (?,?)",[business_id,country], (err, results) => {
            if (err) {
              console.error("Error retrieving data: ", err);
            }
          })
        }
        });
        connection.query("update users set step=1 where id=?",[req.session.user.id], (err, results) => {
          if (err) {
            console.error("Error retrieving data: ", err);
          }
          connection.query("insert into company_users (company_id,admin_id,created_by) values (?,?,?)",[business_id,req.session.user.id,req.session.user.id], (err, results) => {
            if (err) {
              console.error("Error retrieving data: ", err);
            }
          return res.json({"status":true,"msg":"Requested For A New Category"});
          })
        })
      }
    }
  );
  



});

  
app.post("/updateStep1", isUserAllowed, function (req, res) {
  var company_name = req.body.company_name;
  var company_website = req.body.website;
  var company_email = req.body.company_email;
  var company_phone = req.body.company_phone;
  var keywords = req.body.keywords;
  var countries = req.body.countries;
  var categories = req.body.categories;
  var logo = req.body.logolink;
  var overview = req.body.overview;

  console.log(countries)
  console.log(categories)
  console.log(keywords)

  connection.query(
    "update company set company_name=?, website=?, company_email=?, company_phone=?, overview=?, company_logo=? where id=(select company_id from company_users where admin_id=?)",
    [company_name, company_website, company_email, company_phone, overview, logo, req.session.user.id],
    function (err, result) {
      if (err) {
        res.send(false);
        console.log(err)
      } else {
        connection.query("update users set step=1 where id=?",[req.session.user.id], (err, results) => {
          return res.json({"status":true,"msg":"Requested For A New Category"});
        })
      }
    }
  );


});




// Requests

app.post("/request-addCategory", isUserAllowed, function (req, res) {
  res.locals.title = "Dashboard";
  connection.query("insert into categories (user_id,category_name) values (?,?)",[req.session.user.id,req.body.newCategory], (err, results) => {
    if (err) {
      console.log(err)
      return res.json({"status":false,"msg":"Already Requested"});
    }else{
		  return res.json({"status":true,"msg":"Requested For A New Category"});
    }
  })
});


app.post("/request-addCountry", isUserAllowed, function (req, res) {
  res.locals.title = "Dashboard";
  connection.query("insert into countries (user_id,country_name) values (?,?)",[req.session.user.id,req.body.newCountry], (err, results) => {
    if (err) {
      console.log(err)
      return res.json({"status":false,"msg":"Already Requested"});
    }else{
		  return res.json({"status":true,"msg":"Requested For A New Country"});
    }
  })
});




// STEP 2



app.post("/step2", isUserAllowed, function (req, res) {
  var images = req.body.images;
  if(images.length<4){
    return res.json({"status":false,"msg":"Please Select Atleast 4 Images"});
  }
  if(images.length>10){
    return res.json({"status":false,"msg":"Maximum 10 Images Are Allowed"});
  }

  connection.query("delete from files where company_id=(select company_id from company_users where admin_id=?) and type=1",[req.session.user.id], (err, results) => {
    if (err) {
      console.log(err)
    }else{
      images.forEach(function(image) {
        connection.query("insert into files (file_name,company_id,type) values (?,(select company_id from company_users where admin_id=?),?)",[image,req.session.user.id,1], (err, results) => {
          if (err) {
            console.log(err)
            return
          }
        })
      });
    }
  })


connection.query("update users set step=2 where id=?",[req.session.user.id], (err, results) => {
  if (err) {
    console.error("Error retrieving data: ", err);
  }
  return res.json({"status":true,"msg":"Uploading Success"});
  })


});



// STEP 3


app.post("/Step3", isUserAllowed, function (req, res) {
  var current_location = req.body.current_location;
  var gst = req.body.gst;
  var udyam = req.body.udyam;
  var city = req.body.city;
  var state = req.body.state;
  var pincode = req.body.pincode;
  var address = req.body.address;

  var variables = {
    "current_location": req.body.current_location,
    "gst": req.body.gst,
    "city": req.body.city,
    "state": req.body.state,
    "pincode": req.body.pincode,
    "address": req.body.address
  };

  console.log(variables)
  
  for (var key in variables) {
    if (!variables[key]) {
      return res.json({"status": false, "msg": key + " is empty"});
    }
  }
  

    connection.query(
      "update company set map=?,gst=?,udyog_number=?,city=?,state=?,pincode=?,address=? WHERE id=(select company_id from company_users where admin_id=?)",
      [current_location,gst,udyam,city,state,pincode,address,req.session.user.id],
      function (err, result) {
        if(err){
          console.log(err)
        }
        connection.query("update users set step=3 where id=?",[req.session.user.id], (err, results) => {
          if (err) {
            console.error("Error retrieving data: ", err);
          }
          return res.json({"status":true,"msg":"Inserted Successfully"});
        })
      }
    );



});







// Step 4



app.post("/step4", isUserAllowed, function (req, res) {
  var instagram=req.body.instagram;
  var facebook=req.body.facebook;
  var youtube=req.body.youtube;
  var google=req.body.google;

  const openingHours = [
    { day: 1, from: req.body.from1, to: req.body.to1, status: req.body.status1 === 'on' },
    { day: 2, from: req.body.from2, to: req.body.to2, status: req.body.status2 === 'on' },
    { day: 3, from: req.body.from3, to: req.body.to3, status: req.body.status3 === 'on' },
    { day: 4, from: req.body.from4, to: req.body.to4, status: req.body.status4 === 'on' },
    { day: 5, from: req.body.from5, to: req.body.to5, status: req.body.status5 === 'on' },
    { day: 6, from: req.body.from6, to: req.body.to6, status: req.body.status6 === 'on' },
    { day: 7, from: req.body.from7, to: req.body.to7, status: req.body.status7 === 'on' }
  ];


  
  connection.query("select company_id from company_users where admin_id=? ",[req.session.user.id], (err, results) => {

  connection.query("delete from company_opening_hours where company_id=?",[results[0].company_id], (err, r) => {


    connection.query(
      "update company set youtube=?,google=?,facebook=?,instagram=? WHERE id=?",
      [youtube,google,facebook,instagram,results[0].company_id],
      function (err, result) {


        openingHours.forEach(function(hours) {
          connection.query("insert into company_opening_hours (company_id,day_id,`from`,`to`,is_closed) values (?,?,?,?,?)",[results[0].company_id,hours.day,hours.from,hours.to,hours.status], (err, results) => {
            if(err){
                return res.json({"status":false,"msg":"Failed"});
            }
          })
        });

        connection.query("update users set step=4 where id=?",[req.session.user.id], (err, results) => {
          if (err) {
            console.error("Error retrieving data: ", err);
          }
          return res.json({"status":true,"msg":"Inserted Successfully"});
        })

      }
    );

    })
    })
});






// STEP 5


app.post("/add-owner", isUserAllowed, function (req, res) {
  var newEmail=req.body.newEmail;
  var newPhone=req.body.newPhone;

  connection.query("SELECT * FROM users where phone=? and email=?", [newPhone,newEmail],(err, results) => {
    if (err) {
      console.error("Error retrieving data: ", err);
    }else{
      if(results.length==0){
        return res.json({"status":false,"msg":"INo User Found"});
      }else{
        connection.query("select company_id from company_users where admin_id=? ",[req.session.user.id], (err, rest) => {

            connection.query(
              "insert into company_users (company_id,admin_id) values(?,?)",
              [rest[0].company_id,results[0].id],
              function (err, result) {
                  if(err){
                    return res.json({"status":false,"msg":"User Already Added"});
                  }else{
                    return res.json({"status":true,"msg":"User Added"});
                    
                  }
              }
            );
      
        })

      }
    }
  });
});




app.post("/Step5", isUserAllowed, function (req, res) {
  var Incorporation=req.body.Incorporation;
  var Udyog=req.body.Udyog;

  if(!Incorporation)        return res.json({"status": false, "msg": "Please Upload Incorporation Document"});
  if(!Udyog)        return res.json({"status": false, "msg": "Please Upload Udyog Document"});

  res.locals.title = "Dashboard";



    connection.query("update company set udyog_pdf=?,Incorporation_pdf=? where id=(select company_id from company_users where admin_id=?)",[Incorporation,Udyog,req.session.user.id], (err, results) => {
      if (err) {
        console.log(err)
        return res.json({"status":false,"msg":"Error in uploading2"});
      }else{
        connection.query("update users set step=5 where id=?",[req.session.user.id], (err, results) => {
          if (err) {
            console.error("Error retrieving data: ", err);
          }
          return res.json({"status":true,"msg":"Uploaded Successfully"});
        })
      }
    })


  
});



app.get("/complete-profile", isUserAllowed, function (req, res) {
  res.locals.title = "Profile Update";
  getUserDetails(req,res, function(err, userDetails) {
    if(userDetails.is_profile==1){
      res.render(`User/Profile/profile`, {
        type: req.session.user.userType,
        isLogged: req.session.loggedIn,
        users: userDetails
      });
      return
    }
    res.render(`User/Profile/complete_profile`, {
      type: req.session.user.userType,
      isLogged: req.session.loggedIn,
      users: userDetails
    });
  });
});



app.post("/update-user", isUserAllowed, function (req, res) {
  res.locals.title = "Profile Update";
  r=req.body

  connection.query(
    "UPDATE users SET name=?, email=?, phone=?, aadhar=?, aadhar_pdf=?, pan=?, pan_pdf=?, facebook=?, instagram=?, twitter=?,is_profile=1 WHERE id=?",
    [r.name, r.email, r.phone, r.aadhar, r.aadharlink, r.pan, r.panlink, r.facebook, r.instagram, r.twitter, req.session.user.id],
    (err, results) => {
      if (err) {
        return res.json({ "status": false, "msg": "Something Went Wrong" });
      }
      return res.json({ "status": true, "msg": "Updated Successfully" });
    }
  );
  
});


app.get("/previous", isUserAllowed, function (req, res) {
  res.locals.title = "Profile Update";

  connection.query(
    "update users set step=step-1 where id=?",
    [req.session.user.id],
    (err, results) => {
      return res.redirect("/New-Business");
    }
  );
  
});


// SELECT company.*
// FROM company
// LEFT JOIN company_users ON company.id = company_users.company_id
// WHERE company_users.admin_id = 484;






};