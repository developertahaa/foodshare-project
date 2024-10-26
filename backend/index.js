const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Password hashing during signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  console.log('Signup attempt:', { name, email }); // Log the signup attempt

  try {
    // Check if the email already exists in the database
    const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
    db.query(checkEmailQuery, [email], async (err, results) => {
      if (err) {
        console.error('Error checking email:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      // If the email already exists, send an error response
      if (results.length > 0) {
        console.log('Email already exists:', email); // Log when email exists
        return res.status(400).json({ message: 'Email already exists' });
      }

      // If email does not exist, proceed with signup
      console.log('Hashing password for:', email); // Log before hashing
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

      db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ message: 'Server error' });
        }

        // Successful signup
        console.log('Signup successful for:', email); // Log successful signup
        res.status(201).json({ message: 'Signup successful' });
      });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login without sessions
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return res.status(200).json({ message: 'Login successful', email });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

// Donation submission
app.post('/submit', (req, res) => {
  console.log('Received donation request:', req.body);

  const {
    donorName,
    donorAddress,
    donorContact,
    donationName,
    donationQuantity,
    donationLocation,
    donateAnonymously,
    scheduleDate,
    scheduleTime,
    isVolunteer,
    volunteerPhone,
  } = req.body;

  // Validate required fields
  if (!donorName || !donorContact || !donationName || !donationQuantity || !donationLocation) {
    console.error('Missing required fields');
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const query = `
    INSERT INTO donations 
    (donorName, donorAddress, donorContact, donationName, donationQuantity, donationLocation, donateAnonymously, scheduleDate, scheduleTime, isVolunteer, volunteerPhone) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [donorName, donorAddress, donorContact, donationName, donationQuantity, donationLocation, donateAnonymously, scheduleDate, scheduleTime, isVolunteer, volunteerPhone],
    (error, results) => {
      if (error) {
        console.error('Error inserting donation:', error);
        res.status(500).json({ message: 'Failed to submit donation', error: error.message });
      } else {
        console.log('Donation submitted successfully:', results);
        res.status(200).json({ message: 'Donation submitted successfully', id: results.insertId });
      }
    }
  );
});


app.post('/get-user', (req, res) => {
  const { email } = req.body;
  const query = 'SELECT name, created_at FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
          res.json({ name: results[0].name, created_at: results[0].created_at });
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  });
});


app.post('/change', async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  // Fetch user from database using email
  db.query('SELECT id, password FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
          return res.status(500).json({ message: 'Server error' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];

      // Check if current password is correct
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update password in the database
      db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, user.id], (err) => {
          if (err) {
              return res.status(500).json({ message: 'Server error' });
          }
          return res.status(200).json({ message: 'Password changed successfully' });
      });
  });
});

app.post('/volunteer', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    birthdate,
    occupation,
    interests,
    experience,
    agreedToTerms
  } = req.body;

  const sql = `INSERT INTO volunteers (
    firstName, lastName, email, phone, birthdate, occupation, interests, experience, agreedToTerms
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    firstName,
    lastName,
    email,
    phone,
    birthdate,
    occupation,
    interests.join(', '),  // Join array values if `interests` is multiple
    experience,
    agreedToTerms ? 1 : 0  // Convert boolean to 1 or 0
  ], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Failed to add volunteer');
    }
    res.status(200).send('Volunteer added successfully');
  });
});


app.post('/partnerships', (req, res) => {
  const {
    organizationName,
    website,
    contactName,
    contactEmail,
    contactPhone,
    organizationType,
    employeeCount,
    annualRevenue,
    partnershipType,
    missionAlignment,
    partnershipGoals,
    agreedToTerms
  } = req.body;

  const sql = `
    INSERT INTO partnerships (organization_name, website, contact_name, contact_email, contact_phone,
    organization_type, employee_count, annual_revenue, partnership_type, mission_alignment, partnership_goals, is_accept)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `;

  db.query(sql, [
    organizationName,
    website,
    contactName,
    contactEmail,
    contactPhone,
    organizationType,
    employeeCount,
    annualRevenue,
    partnershipType,
    missionAlignment,
    partnershipGoals
  ], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error saving application');
    } else {
      res.status(200).send('Application submitted successfully');
    }
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
