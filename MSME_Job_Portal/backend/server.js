const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/jobportal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

// Job Schema
const jobSchema = new mongoose.Schema({
  title: String,
  companyName: String,
  description: String,
  location: String,
  district: String,
  salary: String,
  skills: String,
  experienceRequired: String,
  minQualification: String,
});

const Job = mongoose.model("Job", jobSchema);

// Job Application Schema
const jobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  name: String,
  email: String,
  phone: String,
  resume: String,
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

// API Routes
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userData = { name: user.name, email: user.email };
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (err) {
    res.status(500).json({ message: "Failed to login", error: err });
  }
});

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user", error: err });
  }
});

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs", error: err });
  }
});

app.post("/api/jobs", async (req, res) => {
  const {
    title,
    companyName,
    description,
    location,
    district,
    salary,
    skills,
    experienceRequired,
    minQualification,
  } = req.body;

  try {
    const newJob = new Job({
      title,
      companyName,
      description,
      location,
      district,
      salary,
      skills,
      experienceRequired,
      minQualification,
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: "Failed to post job", error: err });
  }
});

app.post("/api/jobs/apply", upload.single("resume"), async (req, res) => {
  const { jobId, name, email, phone } = req.body;
  const resume = req.file ? req.file.path : null;

  try {
    const newApplication = new JobApplication({
      jobId,
      name,
      email,
      phone,
      resume,
    });
    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit application", error: err });
  }
});

app.get("/api/jobs/:jobId/applicants", async (req, res) => {
  const { jobId } = req.params;

  try {
    const applicants = await JobApplication.find({ jobId });
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch applicants", error: err });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});