const express = require("express");
const router = express.Router();
const User = require("../Models/user_model");
const bcrypt = require("bcrypt");
const Booking = require("../Models/Bookings");
const Donor = require("../Models/Donor");
const Fasttag = require("../Models/Fasttag");
const Grievences = require("../Models/grievences");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send("User already exists");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      req.session.username = username;
      req.session.userEmail = user.email;
      req.session.signin = true;
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(400).json({ message: "Wrong password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/userprofile", (req, res) => {
  if (req.session.signin) {
    res.render("userProfile", {
      currentUser: req.session.username,
      userEmail: req.session.userEmail,
    });
  } else {
    res.render("loginNotFound", {
      Subject: [
        "LOGIN TO MOVE FURTHER",
        "Login to E-seva for accessing the services.",
      ],
    });
  }
});

// Logout ---> Redirect to HOME
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to log out.");
    }
    res.redirect("/home?message=loggedout");
  });
});

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/grievences", (req, res) => {
  res.render("grievences");
});

router.post("/grievences", async (req, res) => {
  try {
    const newEntry = new Grievences(req.body);
    await newEntry.save();
    res.status(201).send("Form submitted successfully");
  } catch (err) {
    console.error("Error saving to database:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/services", (req, res) => {
  res.render("services");
});

router.get("/gallery", (req, res) => {
  res.render("gallery");
});

router.get("/contactus", (req, res) => {
  res.render("contactus");
});

router.get("/ambulance", (req, res) => {
  res.render("ambulance");
});
router.get("/findHospital", (req, res) => {
  res.render("findHospital");
});

router.get("/police", (req, res) => {
  res.render("police");
});

router.get("/petrol", (req, res) => {
  res.render("petrol");
});

router.get("/fastag", (req, res) => {
  res.render("fastag");
});

function generateRandomFastagID() {
  return "IND - " + Math.random().toString(36).substr(2, 9).toUpperCase();
}

router.post("/fasttag", async (req, res) => {
  try {
    const fasttagID = generateRandomFastagID();
    const fasttagData = new Fasttag({
      ...req.body,
      fasttagID,
    });

    await fasttagData.save();
    res
      .status(200)
      .json({ message: "Fasttag Applied Successfully!", fasttagID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving booking data." });
  }
});

router.post("/recharge", async (req, res) => {
  const { email, vechilenumber, amount } = req.body;

  if (!email || !vechilenumber || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await Fasttag.findOne({ email, vechilenumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.amount += parseFloat(amount);
    await user.save();

    res
      .status(200)
      .json({ message: "Recharge successful", newBalance: user.amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/fire", (req, res) => {
  res.render("fire");
});

router.get("/bloodbank", (req, res) => {
  res.render("bloodbank");
});

router.post("/bloodbank", (req, res) => {
  const newDonor = new Donor({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
    bloodgroup: req.body.bloodgroup,
    gender: req.body.gender,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
  });

  newDonor.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving to database");
    } else {
      console.log("New donor saved successfully");
      res.status(200).send("Registration Successful");
    }
  });
});

router.get("/routerly", (req, res) => {
  res.render("routerly");
});

router.get("/needblood", (req, res) => {
  res.render("needblood");
});

router.get("/search", (req, res) => {
  const bloodGroup = req.query.bloodgroup;

  Donor.find({ bloodgroup: bloodGroup }, (err, foundDonors) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching donors");
    } else {
      res.render("donors", { donors: foundDonors });
    }
  });
});

router.get("/petrolbook", (req, res) => {
  res.render("petrolbook");
});

router.post("/petrol", async (req, res) => {
  try {
    const bookingData = new Booking(req.body);

    await bookingData.save();
    res.status(200).send("Booking is successful!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving booking data.");
  }
});

router.get("/apply", (req, res) => {
  res.render("apply");
});
router.get("/recharge", (req, res) => {
  res.render("recharge");
});

module.exports = router;
