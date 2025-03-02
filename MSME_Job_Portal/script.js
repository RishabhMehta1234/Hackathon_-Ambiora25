document.addEventListener("DOMContentLoaded", function () {
  const introSection = document.getElementById("introSection");
  const loginSection = document.getElementById("loginSection");
  const signupSection = document.getElementById("signupSection");
  const homepage = document.getElementById("homepage");
  const jobSeekerSection = document.getElementById("jobSeekerSection");
  const jobListerSection = document.getElementById("jobListerSection");
  const jobApplicationForm = document.getElementById("jobApplicationForm");
  const jobListings = document.getElementById("jobListings");
  const profileIconContainer = document.getElementById("profileIconContainer");

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const jobSeekerBtn = document.getElementById("jobSeekerBtn");
  const jobListerBtn = document.getElementById("jobListerBtn");

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const jobPostForm = document.getElementById("jobPostForm");
  const applicationForm = document.getElementById("applicationForm");

  const filterLocation = document.getElementById("filterLocation");
  const filterDistrict = document.getElementById("filterDistrict");
  const filterSalary = document.getElementById("filterSalary");
  const filterSkills = document.getElementById("filterSkills");
  const applyFilters = document.getElementById("applyFilters");

  let allJobs = [];
  let currentUser = null;

  // Initialize i18next for multilingual support
  i18next.init({
    lng: "en",
    resources: {
      en: {
        translation: {
          platformTitle: "Local Employment Bridging Platform",
          platformDescription: "Connecting MSME-trained individuals with local job opportunities.",
          welcome: "Welcome to Our Platform",
          howItWorks: "How it works:",
          jobSeekerDescription: "Job Seekers: Browse job listings, apply for jobs, and upload your resume.",
          jobListerDescription: "Job Listers: Post job openings and find skilled candidates.",
          jobSeeker: "Job Seeker",
          jobLister: "Job Lister",
          jobListings: "Job Listings",
          applyForJob: "Apply for Job",
          fullName: "Full Name:",
          phoneNumber: "Phone Number:",
          uploadResume: "Upload Resume:",
          submitApplication: "Submit Application",
          postJob: "Post a Job",
          jobTitle: "Job Title:",
          companyName: "Company Name:",
          jobDescription: "Job Description:",
          location: "Location:",
          district: "District:",
          salary: "Salary:",
          skills: "Skills Required:",
          experienceRequired: "Experience Required:",
          minQualification: "Minimum Qualification:",
          postJobButton: "Post Job",
          login: "Login",
          signup: "Sign Up",
          email: "Email:",
          password: "Password:",
          loginButton: "Login",
          signupButton: "Sign Up",
        },
      },
      hi: {
        translation: {
          platformTitle: "स्थानीय रोजगार प्लेटफॉर्म",
          platformDescription: "MSME-प्रशिक्षित व्यक्तियों को स्थानीय रोजगार के अवसरों से जोड़ना।",
          welcome: "हमारे प्लेटफॉर्म में आपका स्वागत है",
          howItWorks: "यह कैसे काम करता है:",
          jobSeekerDescription: "नौकरी चाहने वाले: नौकरी सूची ब्राउज़ करें, नौकरियों के लिए आवेदन करें और अपना रिज्यूमे अपलोड करें।",
          jobListerDescription: "नियोक्ता: नौकरी के अवसर पोस्ट करें और कुशल उम्मीदवार ढूंढें।",
          jobSeeker: "नौकरी चाहने वाले",
          jobLister: "नियोक्ता",
          jobListings: "नौकरी सूची",
          applyForJob: "नौकरी के लिए आवेदन करें",
          fullName: "पूरा नाम:",
          phoneNumber: "फ़ोन नंबर:",
          uploadResume: "रिज्यूमे अपलोड करें:",
          submitApplication: "आवेदन जमा करें",
          postJob: "नौकरी पोस्ट करें",
          jobTitle: "नौकरी का शीर्षक:",
          companyName: "कंपनी का नाम:",
          jobDescription: "नौकरी का विवरण:",
          location: "स्थान:",
          district: "जिला:",
          salary: "वेतन:",
          skills: "आवश्यक कौशल:",
          experienceRequired: "अनुभव आवश्यक:",
          minQualification: "न्यूनतम योग्यता:",
          postJobButton: "नौकरी पोस्ट करें",
          login: "लॉगिन",
          signup: "साइन अप",
          email: "ईमेल:",
          password: "पासवर्ड:",
          loginButton: "लॉगिन",
          signupButton: "साइन अप",
        },
      },
      ta: {
        translation: {
          platformTitle: "உள்ளூர் வேலைவாய்ப்பு தளம்",
          platformDescription: "MSME-பயிற்சி பெற்ற நபர்களை உள்ளூர் வேலைவாய்ப்புகளுடன் இணைத்தல்.",
          welcome: "எங்கள் தளத்திற்கு வரவேற்கிறோம்",
          howItWorks: "இது எவ்வாறு செயல்படுகிறது:",
          jobSeekerDescription: "வேலை தேடுபவர்கள்: வேலை பட்டியல்களை உலாவுங்கள், வேலைகளுக்கு விண்ணப்பிக்கவும், உங்கள் தகவலை பதிவேற்றவும்.",
          jobListerDescription: "முதலாளிகள்: வேலை வாய்ப்புகளை இடுகையிடவும், திறமையான வேட்பாளர்களைக் கண்டறியவும்.",
          jobSeeker: "வேலை தேடுபவர்",
          jobLister: "முதலாளி",
          jobListings: "வேலை பட்டியல்கள்",
          applyForJob: "வேலைக்கு விண்ணப்பிக்கவும்",
          fullName: "முழு பெயர்:",
          phoneNumber: "தொலைபேசி எண்:",
          uploadResume: "தகவலை பதிவேற்றவும்:",
          submitApplication: "விண்ணப்பத்தை சமர்ப்பிக்கவும்",
          postJob: "வேலை இடுகையிடவும்",
          jobTitle: "வேலை தலைப்பு:",
          companyName: "நிறுவனத்தின் பெயர்:",
          jobDescription: "வேலை விளக்கம்:",
          location: "இடம்:",
          district: "மாவட்டம்:",
          salary: "சம்பளம்:",
          skills: "தேவையான திறன்கள்:",
          experienceRequired: "தேவையான அனுபவம்:",
          minQualification: "குறைந்தபட்ச தகுதி:",
          postJobButton: "வேலை இடுகையிடவும்",
          login: "உள்நுழைய",
          signup: "பதிவு செய்ய",
          email: "மின்னஞ்சல்:",
          password: "கடவுச்சொல்:",
          loginButton: "உள்நுழைய",
          signupButton: "பதிவு செய்ய",
        },
      },
    },
  });

  // Change language
  window.changeLanguage = function (language) {
    i18next.changeLanguage(language, () => {
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = i18next.t(element.getAttribute("data-i18n"));
      });
    });
  };

  // Show Login Section
  loginBtn.addEventListener("click", function () {
    hideAllSections();
    loginSection.classList.remove("hidden");
  });

  // Show Signup Section
  signupBtn.addEventListener("click", function () {
    hideAllSections();
    signupSection.classList.remove("hidden");
  });

  // Login Form Submission
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        currentUser = data.user;
        alert("Login successful!");
        hideAllSections();
        homepage.classList.remove("hidden");
        displayUserProfile();
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Failed to login", err);
    }
  });

  // Signup Form Submission
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        alert("Signup successful! Please login.");
        hideAllSections();
        loginSection.classList.remove("hidden");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Failed to signup", err);
    }
  });

  // Fetch jobs from backend
  async function fetchJobs() {
    try {
      const response = await fetch("http://localhost:5000/api/jobs");
      const jobs = await response.json();
      allJobs = jobs; // Store all jobs for filtering
      return jobs;
    } catch (err) {
      console.error("Failed to fetch jobs", err);
      return [];
    }
  }

  // Display Job Listings
  async function displayJobListings(jobs) {
    jobListings.innerHTML = "";
    jobs.forEach((job, index) => {
      const jobCard = document.createElement("div");
      jobCard.className = "job-card";
      jobCard.innerHTML = `
        <h3>${index + 1}. ${job.title}</h3>
        <p><strong>Company:</strong> ${job.companyName}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>District:</strong> ${job.district}</p>
        <p><strong>Salary:</strong> ${job.salary}</p>
        <p><strong>Skills Required:</strong> ${job.skills}</p>
        <p><strong>Experience Required:</strong> ${job.experienceRequired}</p>
        <p><strong>Minimum Qualification:</strong> ${job.minQualification}</p>
        <p><strong>Description:</strong> ${job.description}</p>
        <button onclick="applyForJob('${job._id}')">Apply</button>
        <button onclick="viewApplicants('${job._id}')">See Applicants</button>
      `;
      jobListings.appendChild(jobCard);
    });
  }

  // Apply Filters
  applyFilters.addEventListener("click", function () {
    const locationFilter = filterLocation.value.toLowerCase();
    const districtFilter = filterDistrict.value.toLowerCase();
    const salaryFilter = filterSalary.value.toLowerCase();
    const skillsFilter = filterSkills.value.toLowerCase();

    const filteredJobs = allJobs.filter((job) => {
      return (
        (locationFilter === "" || job.location.toLowerCase().includes(locationFilter)) &&
        (districtFilter === "" || job.district.toLowerCase().includes(districtFilter)) &&
        (salaryFilter === "" || job.salary.toLowerCase().includes(salaryFilter)) &&
        (skillsFilter === "" || job.skills.toLowerCase().includes(skillsFilter))
      );
    });

    displayJobListings(filteredJobs);
  });

  // Show Job Seeker Section
  jobSeekerBtn.addEventListener("click", function () {
    hideAllSections();
    jobSeekerSection.classList.remove("hidden");
    fetchJobs().then((jobs) => displayJobListings(jobs));
  });

  // Show Job Lister Section
  jobListerBtn.addEventListener("click", function () {
    hideAllSections();
    jobListerSection.classList.remove("hidden");
  });

  // Post a Job
  jobPostForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const jobTitle = document.getElementById("jobTitle").value;
    const companyName = document.getElementById("companyName").value;
    const jobDescription = document.getElementById("jobDescription").value;
    const jobLocation = document.getElementById("jobLocation").value;
    const jobDistrict = document.getElementById("jobDistrict").value;
    const jobSalary = document.getElementById("jobSalary").value;
    const jobSkills = document.getElementById("jobSkills").value;
    const experienceRequired = document.getElementById("experienceRequired").value;
    const minQualification = document.getElementById("minQualification").value;

    const job = {
      title: jobTitle,
      companyName: companyName,
      description: jobDescription,
      location: jobLocation,
      district: jobDistrict,
      salary: jobSalary,
      skills: jobSkills,
      experienceRequired: experienceRequired,
      minQualification: minQualification,
    };

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      if (response.ok) {
        alert("Job posted successfully!");
        jobPostForm.reset();
      } else {
        alert("Failed to post job");
      }
    } catch (err) {
      console.error("Failed to post job", err);
    }
  });

  // Apply for Job
  window.applyForJob = async function (jobId) {
    hideAllSections();
    jobApplicationForm.classList.remove("hidden");
    applicationForm.setAttribute("data-job-id", jobId);
  };

  // Submit Job Application
  applicationForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const resume = document.getElementById("resume").files[0];
    const jobId = applicationForm.getAttribute("data-job-id");

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("name", name);
    formData.append("email", currentUser.email);
    formData.append("phone", phone);
    formData.append("resume", resume);

    console.log("Submitting application with data:", {
      jobId,
      name,
      email: currentUser.email,
      phone,
      resume: resume ? resume.name : "No file",
    });

    try {
      const response = await fetch("http://localhost:5000/api/jobs/apply", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Application submitted successfully!");
        applicationForm.reset();
        hideAllSections();
        jobSeekerSection.classList.remove("hidden");
      } else {
        alert("Failed to submit application");
      }
    } catch (err) {
      console.error("Failed to submit application", err);
    }
  });

  // View Applicants for a Job
  window.viewApplicants = async function (jobId) {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}/applicants`);
      const applicants = await response.json();
      displayApplicants(applicants);
    } catch (err) {
      console.error("Failed to fetch applicants", err);
    }
  };

  // Display Applicants
  function displayApplicants(applicants) {
    const applicantsList = document.createElement("div");
    applicantsList.className = "applicants-list";
    applicantsList.innerHTML = "<h3>Applicants:</h3>";
    applicants.forEach((applicant) => {
      const applicantCard = document.createElement("div");
      applicantCard.className = "applicant-card";
      applicantCard.innerHTML = `
        <p><strong>Name:</strong> ${applicant.name}</p>
        <p><strong>Email:</strong> ${applicant.email}</p>
        <p><strong>Phone:</strong> ${applicant.phone}</p>
        <p><strong>Resume:</strong> <a href="http://localhost:5000/${applicant.resume}" target="_blank">View Resume</a></p>
      `;
      applicantsList.appendChild(applicantCard);
    });
    jobListings.appendChild(applicantsList);
  }

  // Display User Profile
  function displayUserProfile() {
    profileIconContainer.innerHTML = `
      <div id="profileIcon" class="profile-icon">
        ${currentUser.name.split(" ").map(n => n[0]).join("")}
      </div>
    `;
    profileIconContainer.classList.remove("hidden");

    const profileIcon = document.getElementById("profileIcon");
    profileIcon.addEventListener("click", function () {
      const profileInfo = document.createElement("div");
      profileInfo.id = "profileInfo";
      profileInfo.innerHTML = `
        <p><strong>Name:</strong> ${currentUser.name}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <button id="logoutBtn">Logout</button>
      `;
      profileInfo.classList.add("profile-info");
      document.body.appendChild(profileInfo);

      const logoutBtn = document.getElementById("logoutBtn");
      logoutBtn.addEventListener("click", function () {
        currentUser = null;
        profileIconContainer.classList.add("hidden");
        document.body.removeChild(profileInfo);
        hideAllSections();
        loginSection.classList.remove("hidden");
      });
    });
  }

  // Helper function to hide all sections
  function hideAllSections() {
    introSection.classList.add("hidden");
    loginSection.classList.add("hidden");
    signupSection.classList.add("hidden");
    homepage.classList.add("hidden");
    jobSeekerSection.classList.add("hidden");
    jobListerSection.classList.add("hidden");
    jobApplicationForm.classList.add("hidden");
  }
});