var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local"); //allowing anyone to make a account
const upload = require("./multer");

passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res) {
  res.render("index", { footer: false });
});

router.get("/login", function (req, res) {
  res.render("login", { footer: false });
});

router.get("/feed", isLoggedIn, function (req, res) {
  res.render("feed", { footer: true });
});

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile", { footer: true });
});

router.get("/search", isLoggedIn, function (req, res) {
  res.render("search", { footer: true });
});

router.get("/edit", isLoggedIn, function (req, res) {
  res.render("edit", { footer: true });
});

router.get("/upload", isLoggedIn, function (req, res) {
  res.render("upload", { footer: true });
});

router.post("/register", function (req, res, next) {
  const userData = userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function (err) {
      res.redirect("/profile");
    });
  });
});

//Login route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",

    failureRedirect: "/login",
  }),
  (req, res) => {
    res.render("login");
  }
);

//Logout Route
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//on submit of edit form redirect to this route
router.post("/update", upload.single("image"), async (req, res) => {
  //find user which details I want to change
  const user = await userModel.findOne({ username: req.session.passport.user });
});

//if user not logged in then redirected to home page
//add below function to the routes which you want to make protected
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/login");
  }

  //if not authenticated then redirect to "/login" page
  res.redirect("/login");
}

module.exports = router;
