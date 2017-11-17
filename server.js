// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Restaurant Tables (DATA)
// =============================================================
var tables = [
  {
  	routeName: "justin",
    name: "Justin",
    phone: "555-1234",
    email: "jflick@uncc.edu",
    id: "1337"
  }
];

// Routes
// =============================================================
console.log("hello");
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Get entire wait list
app.get("/all", function(req, res) {
  // res.json(tables);
  console.log("hit route")
});

// Search for Specific table (or all tables) - provides JSON
app.get("/api/:tables?", function(req, res) {
  var chosen = req.params.tables;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < tables.length; i++) {
      if (chosen === tables[i].routeName) {
        return res.json(tables[i]);
      }
    }
    return res.json(false);
  }
  return res.json(tables);
});

// Create New tables - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newtable = req.body;
  newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

  tables.push(newtable);

  res.json(newtable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
