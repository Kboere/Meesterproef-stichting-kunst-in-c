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
    res.render('pages/index', {
      breadcrumbs: [
          { name: 'Home', url: '/' }
      ]
  });
  } catch (err) {
    console.error("Error retrieving page:", err);
    res.status(500).send("Internal Server Error");
  }
});

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

app.get('/events', async function (req, res) {
  try {
      res.render('pages/events', {
          breadcrumbs: [
              { name: 'Home', url: '/' },
              { name: 'Events', url: '/events' }
          ]
      });
  } catch (err) {
      console.error('Error retrieving page:', err);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/events/event1', async function (req, res) {
  try {
      res.render('pages/event-detail', {
          breadcrumbs: [
              { name: 'Home', url: '/' },
              { name: 'Events', url: '/events' },
              { name: 'Event 1', url: '/events/event1' }
          ]
      });
  } catch (err) {
      console.error('Error retrieving page:', err);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/ANBI', async function (req, res) {
  res.render("pages/archive.ejs");
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
