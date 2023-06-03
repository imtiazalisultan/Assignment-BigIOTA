const express = require("express");
const router = express.Router();
const multer = require('multer');
const Data = require("../model/dataSchema");
const fs = require('fs');
const csv = require('csv-parser');
require("../db/connect"); //file for mongoDB connection...
// File upload configuration
const upload = multer({ dest: "uploads/" });

// Mock user data
const users = [{ id: 1, email: "Rahul@abcd.com", password: "rahul@12345" }];

// API endpoint for user login
router.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Find user with the provided email
  const user = users.find((u) => u.email === email);

  // Check if user exists and password is correct
  if (!user || user.password !== password) {
    res.status(401).json({ message: "Invalid email or password" });
  } else {
    res.status(200).json({ message: "Login successful" });
  }
});

// API endpoint for file upload
router.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const results = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      fs.unlinkSync(file.path); // Remove the uploaded file

      // Save data to MongoDB
      Data.insertMany(results)
        .then(() => res.json({ message: "Data saved successfully" }))
        .catch((error) =>
          res.status(500).json({ message: "Error saving data", error })
        );
    });
});

// API endpoint to fetch data
router.get("/api/data", (req, res) => {
  // Retrieve data from MongoDB
  Data.find({})
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(500).json({ message: "Error fetching data", error })
    );
});

// API endpoint to download data as CSV file
router.get("/api/download", (req, res) => {
  // Retrieve data from MongoDB
  Data.find({})
    .then((data) => {
      const csvData = [];
      csvData.push(Object.keys(data[0])); // Add header row

      data.forEach((item) => {
        csvData.push(Object.values(item));
      });

      const csvString = csvData.map((row) => row.join(",")).join("\n");

      res.setHeader("Content-Disposition", "attachment; filename=data.csv");
      res.set("Content-Type", "text/csv");
      res.status(200).send(csvString);
    })
    .catch((error) =>
      res.status(500).json({ message: "Error downloading data", error })
    );
});

// API endpoint to perform CRUD operations
router.post("/api/create", (req, res) => {
  const newData = req.body;

  Data.create(newData)
    .then(() => res.json({ message: "Data created successfully" }))
    .catch((error) =>
      res.status(500).json({ message: "Error creating data", error })
    );
});

router.get("/api/read", (req, res) => {
  Data.find({})
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(500).json({ message: "Error reading data", error })
    );
});

router.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  Data.findByIdAndUpdate(id, updatedData)
    .then(() => res.json({ message: "Data updated successfully" }))
    .catch((error) =>
      res.status(500).json({ message: "Error updating data", error })
    );
});

router.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;

  Data.findByIdAndDelete(id)
    .then(() => res.json({ message: "Data deleted successfully" }))
    .catch((error) =>
      res.status(500).json({ message: "Error deleting data", error })
    );
});

router.get('/api/data/search', (req, res) => {
  const { name } = req.query;

  Data.find({ name: { $regex: name, $options: 'i' } })
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: 'Error searching data', error }));
});

// API endpoint to filter data by date range
router.get('/api/data/filter', (req, res) => {
  const { startDate, endDate } = req.query;

  Data.find({ date: { $gte: startDate, $lte: endDate } })
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ message: 'Error filtering data', error }));
});


module.exports = router;