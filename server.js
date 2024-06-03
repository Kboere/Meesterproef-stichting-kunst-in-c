const express = require("express");
const app = express();
require('dotenv').config()


// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


// Define routes
app.get("/", async function (req, res) {
  try {
    
    res.render("pages/index");
  } catch (err) {
    console.error("Error retrieving page:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/route', async (req, res) =>{
  res.render('partials/route-optie')
})

app.get("/steun-ons", async function (req, res) {
  try {
    res.render("pages/help");
  } catch (err) {
    console.error("Error retrieving page:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/kunstwerk/1", async function (req, res) {
  try {
    res.render("pages/details/detail");
  } catch (err) {
    console.error("Error retrieving page:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
