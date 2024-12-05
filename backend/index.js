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
  const { name, email, phone, password } = req.body;

  console.log('Signup attempt:', { name, email }); // Log the signup attempt

  try {
    // Start a transaction
    db.beginTransaction(async (err) => {
      if (err) {
        console.error('Error starting transaction:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      console.log('Transaction started successfully.');

      // Check if the email already exists in the database
      const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
      db.query(checkEmailQuery, [email], async (err, results) => {
        if (err) {
          console.error('Error checking email:', err);
          return db.rollback(() => res.status(500).json({ message: 'Server error' }));
        }

        console.log('Email check completed. Results:', results);

        // If the email already exists, send an error response
        if (results.length > 0) {
          console.log('Email already exists:', email); // Log when email exists
          return db.rollback(() => res.status(400).json({ message: 'Email already exists' }));
        }

        console.log('Email is unique, proceeding with password hashing.');

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully.');

        const insertUserQuery = `INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`;

        db.query(insertUserQuery, [name, email, hashedPassword, phone], (err, result) => {
          if (err) {
            console.error('Error inserting user data:', err);
            return db.rollback(() => res.status(500).json({ message: 'Server error' }));
          }

          console.log('User data inserted successfully:', result);

          // Insert a notification for the user
          const notificationMessage = `Welcome ${name}, your account has been successfully created!`;
          const insertNotificationQuery = `INSERT INTO notifications (user_email, message, status) VALUES (?, ?, 'unread')`;

          db.query(insertNotificationQuery, [email, notificationMessage], (err, notificationResult) => {
            if (err) {
              console.error('Error inserting notification:', err);
              return db.rollback(() => res.status(500).json({ message: 'Server error' }));
            }

            console.log('Notification inserted successfully:', notificationResult);

            // Commit the transaction if all queries succeed
            db.commit((err) => {
              if (err) {
                console.error('Error committing transaction:', err);
                return db.rollback(() => res.status(500).json({ message: 'Server error' }));
              }

              console.log('Transaction committed successfully.');
              res.status(201).json({ message: 'Signup successful and notification created' });
            });
          });
        });
      });
    });
  } catch (error) {
    console.error('Error during signup process:', error);
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

app.post('/submit-donation', (req, res) => {
  // Log the full request body to ensure `user_email` is present
  console.log('Received request body:', req.body);

  const {
    user_email,
    donorName,
    donorContact,
    donationName,
    donationQuantity,
    donationLocation,
    donateAnonymously,
    scheduleDate,
    isVolunteer,
  } = req.body;

  // Validate required fields
  if (!donorName || !donorContact || !donationName || !donationQuantity || !donationLocation || !user_email) {
    console.error('Missing required fields');
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Insert donation into the donations table
  const insertDonationQuery = `
    INSERT INTO donations 
    (user_email, quantity, status, created_at) 
    VALUES (?, ?, ?, ?)
  `;

  const donationValues = [
    user_email, // Ensure user_email is passed correctly
    donationQuantity,
    'Available', // Default status, modify as needed
    new Date(), // Current timestamp
  ];

  db.query(insertDonationQuery, donationValues, (err, result) => {
    if (err) {
      console.error('Error inserting donation:', err);
      return res.status(500).json({ message: 'Error inserting donation' });
    }

    // Get the donation_id from the last inserted donation
    const donationId = result.insertId;

    // Insert donation details into the donation_details table
    const insertDonationDetailsQuery = `
      INSERT INTO donation_details 
      (donation_id, donor_name, donor_contact, food_item_name, date_of_donation, volunteerRequired, donationLocation, isAnonymous) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const donationDetailsValues = [
      donationId, // Reference to the donation_id in the donations table
      donorName,
      donorContact,
      donationName,
      scheduleDate,
      isVolunteer ? 1 : 0, // 1 if volunteer is required, 0 if not
      donationLocation,
      donateAnonymously,
    ];

    db.query(insertDonationDetailsQuery, donationDetailsValues, (err) => {
      if (err) {
        console.error('Error inserting donation details:', err);
        return res.status(500).json({ message: 'Error inserting donation details' });
      }

      // Insert a notification for the user
      const insertNotificationQuery = `
        INSERT INTO notifications (user_email, message, status)
        VALUES (?, ?, ?)
      `;

      const notificationMessage = `You have successfully donated ${donationQuantity} units of ${donationName}.`;
      const notificationValues = [
        user_email, // User who made the donation
        notificationMessage,
        'unread', // Mark notification as unread initially
      ];

      db.query(insertNotificationQuery, notificationValues, (err) => {
        if (err) {
          console.error('Error inserting notification:', err);
          return res.status(500).json({ message: 'Error inserting notification' });
        }

        // Send response back to the client
        return res.status(201).json({ message: 'Donation, details, and notification stored successfully' });
      });
    });
  });
});


app.post('/submit-request', (req, res) => {
  console.log('Received request body:', req.body);

  const { donation_id, user_email, name, address, canCollect, quantity } = req.body;

  // Validate required fields
  if (!donation_id || !name || !address || !quantity) {
    console.error('Missing required fields');
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Check donation quantity
  const checkDonationQuantityQuery = `SELECT quantity FROM donations WHERE donation_id = ?`;

  db.query(checkDonationQuantityQuery, [donation_id], (err, result) => {
    if (err) {
      console.error('Error fetching donation quantity:', err);
      return res.status(500).json({ message: 'Error fetching donation quantity' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    const availableQuantity = result[0].quantity;

    if (quantity > availableQuantity) {
      return res.status(400).json({ message: 'Requested quantity exceeds available quantity' });
    }

    // Proceed to insert request and update donation quantity
    const insertRequestQuery = `
      INSERT INTO requests 
      (donation_id, user_email, name, address, canCollect, quantity, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const requestValues = [
      donation_id,
      user_email,
      name,
      address,
      canCollect ? 1 : 0,
      quantity,
      new Date(),
    ];

    db.query(insertRequestQuery, requestValues, (err) => {
      if (err) {
        console.error('Error inserting request:', err);
        return res.status(500).json({ message: 'Error inserting request' });
      }

      // Update the donations table
      const updateDonationQuantityQuery = `
        UPDATE donations 
        SET quantity = quantity - ? 
        WHERE donation_id = ?
      `;

      db.query(updateDonationQuantityQuery, [quantity, donation_id], (err) => {
        if (err) {
          console.error('Error updating donation quantity:', err);
          return res.status(500).json({ message: 'Error updating donation quantity' });
        }

        // Success response after all operations
        return res
          .status(200)
          .json({ message: 'Request submitted successfully and quantity updated.' });
      });
    });
  });
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

app.get('/getDonations', (req, res) => {
  const query = `
    SELECT d.donation_id, d.user_email, d.quantity, d.status, d.created_at, dd.donor_name, dd.donor_contact, dd.food_item_name, dd.date_of_donation, dd.isAnonymous, dd.donationLocation
    FROM donations d
    LEFT JOIN donation_details dd ON d.donation_id = dd.donation_id
  `;

  // Execute the query
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving donations:', err);
      return res.status(500).json({ message: 'Failed to retrieve donations. Please try again later.' });
    }

    // Return the retrieved data
    res.status(200).json(results);
  });
});

app.use(express.json()); // Make sure to use middleware to parse JSON body

app.post('/getNotification', (req, res) => {
  const { user_email } = req.body; // Retrieve user_email from the request body

  console.log('Get notifications request for user:', user_email);

  // Check if user_email is provided
  if (!user_email) {
    return res.status(400).json({ message: 'User email is required' });
  }

  // Query to select the latest 3 unread notifications for the provided user_email
  const getNotificationsQuery = `
    SELECT message, status FROM notifications 
    WHERE user_email = ? 
    ORDER BY created_at DESC 
    LIMIT 3
  `;

  db.query(getNotificationsQuery, [user_email], (err, results) => {
    if (err) {
      console.error('Error fetching notifications:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    console.log('Fetched notifications:', results);

    // If no notifications found
    if (results.length === 0) {
      return res.status(404).json({ message: 'No unread notifications found' });
    }

    // Send the notifications as a response
    res.status(200).json({
      message: 'Unread notifications retrieved successfully',
      notifications: results,
    });
  });
});

//donations for user
app.post('/donationProfile', (req, res) => {
  const { user_email } = req.body; // Retrieve user_email from the request body

  if (!user_email) {
    return res.status(400).json({ message: 'User email is required' });
  }

  const query = `
    SELECT d.donation_id, d.user_email, d.quantity, d.status, d.created_at, dd.donor_name, dd.donor_contact, dd.food_item_name, dd.date_of_donation, dd.isAnonymous, dd.donationLocation
    FROM donations d
    LEFT JOIN donation_details dd ON d.donation_id = dd.donation_id 
    WHERE d.user_email = ?
  `;
  db.query(query, [user_email], (err, results) => {
    if (err) {
      console.error('Error retrieving donations:', err);
      return res.status(500).json({ message: 'Failed to retrieve donations. Please try again later.' });
    }
    res.status(200).json({ donations: results });
  });
});


app.post('/getUserRequests', (req, res) => {
  const { user_email } = req.body; // Get user email from request body

  if (!user_email) {
    return res.status(400).json({ message: 'User email is required' });
  }

  const query = 'SELECT r.name, r.user_email, r.quantity, r.status, r.address, dd.food_item_name  FROM requests r JOIN donation_details dd ON r.donation_id = dd.donation_id WHERE r.user_email = ?;';

  db.query(query, [user_email], (err, results) => {
    if (err) {
      console.error('Error fetching requests from database:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    if (results.length === 0) {
      return res.status(200).json({ message: 'No Requests Made', requests: [] });
    }
    res.status(200).json({ requests: results });
  });
});

app.get('/getInterest', (req, res) => {
  // Query to select all interests
  const query = 'SELECT * FROM interests';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching interests:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    // Send the results as a JSON response
    res.json(results);
  });
});

//store volunteer
app.post('/storeVolunteerData', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    birthdate,
    occupation,
    experience,
    interests, // assuming interests are passed
  } = req.body;

  const availability = 'available'; // Assuming availability is set by default or passed from the frontend
  const created_at = new Date(); // Current timestamp

  // SQL query to insert data into the volunteers table
  const query = `
    INSERT INTO volunteers 
    (user_email, availability, created_at, first_name, last_name, phone, birthdate, occupation, experience) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    email,
    availability,
    created_at,
    firstName,
    lastName,
    phone,
    birthdate,
    occupation,
    experience,
  ];

  // Execute the query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      return res.status(500).json({ message: 'Error saving volunteer data' });
    }

    // If successful, send response back
    res.status(200).json({ message: 'Volunteer data saved successfully' });
  });
});

app.post('/isVolunteer', (req, res) => {
  const { user_email } = req.body; // Assuming you're passing the email in the request body

  const query = 'SELECT volunteer_id FROM volunteers WHERE user_email = ?';
  db.execute(query, [user_email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    // Check if a result was returned
    if (results.length > 0) {
      res.json({ volunteer_id: results[0].volunteer_id });
    } else {
      res.json({ volunteer_id: false });
    }
  });
});

app.post('/isAdmin', (req, res) => {
  const { user_email } = req.body; // Assuming you're passing the email in the request body

  // Query to fetch user id and role based on the provided email
  const query = 'SELECT user_id, role FROM users WHERE email = ?';
  
  db.execute(query, [user_email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      const user = results[0];
      
      // Check if the role is 'admin'
      if (user.role === 'admin') {
        return res.json({ user_id: user.user_id }); // Return user_id if the role is 'admin'
      } else {
        return res.json({ user_id: false }); // Return false if the role is not 'admin'
      }
    } else {
      return res.json({ user_id: false }); // If no user found, return false
    }
  });
});

//no of volunteers

app.get('/getDashboardStats', (req, res) => {
  const query = `
    SELECT 
      (SELECT COUNT(volunteer_id) FROM volunteers) AS total_volunteers,
      (SELECT COUNT(donation_id) FROM donations) AS total_donations,
      (SELECT COUNT(request_id) FROM requests WHERE status = 'pending') AS pending_requests
  `;

  db.execute(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.json(results[0]); // Return the first row with all stats
    } else {
      return res.status(404).json({ error: 'No data found' }); // If no data found
    }
  });
});

app.get('/getVolunteers', (req, res) => {
  // Query to select all interests
  const query = 'SELECT volunteer_id, first_name AS name FROM volunteers;';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching volunteers:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    // Send the results as a JSON response
    res.json(results);
  });
});

app.post('/saveAssignment', (req, res) => {
  const { volunteer_id, donation_id } = req.body; // Get volunteer_id and donation_id from the request body
  const assignedAt = new Date();  // Get the current date and time
  const status = 'assigned'; // Set the initial status to 'assigned'

  const query = 'INSERT INTO donation_assignments(donation_id, volunteer_id, assigned_at, status) VALUES(?, ?, ?, ?)';
  
  db.execute(query, [donation_id, volunteer_id, assignedAt, status], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Assignment saved successfully' });
  });
});

app.get('/getRequests', (req, res) => {
  // Query to select all interests
  const query = 'SELECT r.request_id, r.name, r.quantity, r.status, r.created_at, r.canCollect, r.address, dd.food_item_name from requests r, donation_details dd where r.donation_id = dd.donation_id';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching requests:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    // Send the results as a JSON response
    res.json(results);
  });
});

app.post('/updateRequest', (req, res) => {
  const { request_id, action } = req.body;
  const status = action === 1 ? 'Fulfilled' : 'Cancelled';
  const query = `UPDATE requests SET status = ? WHERE request_id = ?`;
  db.query(query, [status, request_id], (err, results) => {
    if (err) {
      console.error('Error updating request status:', err);
      return res.status(500).json({ error: 'Failed to update request status.' });
    }

    console.log(`Request ID: ${request_id}, Action: ${action}, Status: ${status}`);
    res.json({ message: 'Request updated successfully!' });
  });
});


//get action logs for admin
app.get("/getActionLogs", (req, res) => {
  const query = "SELECT * FROM action_log ORDER BY action_time DESC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching action logs:", err.message);
      return res.status(500).json({ error: "Failed to fetch action logs" });
    }
    res.json(results);
  });
});

app.listen(5003, () => {
  console.log('Server is running on port 5003');
});
