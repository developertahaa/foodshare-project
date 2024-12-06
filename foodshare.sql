-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2024 at 01:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodshare`
--

-- --------------------------------------------------------

--
-- Table structure for table `action_log`
--

CREATE TABLE `action_log` (
  `id` int(11) NOT NULL,
  `table_name` varchar(255) NOT NULL,
  `action_type` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `action_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `old_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_data`)),
  `new_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`new_data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `action_log`
--

INSERT INTO `action_log` (`id`, `table_name`, `action_type`, `action_time`, `old_data`, `new_data`) VALUES
(1, 'users', 'INSERT', '2024-12-05 14:44:03', NULL, '{\"user_id\": 9, \"email\": \"mehnaj1@gmail.com\", \"role\": \"visitor\"}'),
(2, 'donations', 'INSERT', '2024-12-05 14:45:03', NULL, '{\"donation_id\": 9, \"user_email\": \"mehnaj1@gmail.com\", \"quantity\": 20}'),
(3, 'users', 'INSERT', '2024-12-05 19:09:37', NULL, '{\"user_id\": 10, \"email\": \"mehnaj@gmail.com\", \"role\": \"visitor\"}'),
(4, 'donations', 'DELETE', '2024-12-05 19:10:53', '{\"donation_id\": 3, \"user_email\": \"mohdtaha9901@gmail.com\", \"quantity\": 100}', NULL),
(5, 'requests', 'INSERT', '2024-12-06 03:54:08', NULL, '{\"request_id\": 16, \"donation_id\": 2, \"name\": \"mehnaj\"}'),
(6, 'requests', 'INSERT', '2024-12-06 03:54:08', NULL, '{\"request_id\": 16, \"donation_id\": 2, \"name\": \"mehnaj\"}'),
(7, 'donations', 'UPDATE', '2024-12-06 03:54:08', '{\"donation_id\": 2, \"user_email\": \"mohdtaha9901@gmail.com\", \"quantity\": 20}', '{\"donation_id\": 2, \"user_email\": \"mohdtaha9901@gmail.com\", \"quantity\": 10}'),
(8, 'donations', 'INSERT', '2024-12-06 03:55:22', NULL, '{\"donation_id\": 10, \"user_email\": \"mohdtaha9901@gmail.com\", \"quantity\": 50}'),
(9, 'requests', 'UPDATE', '2024-12-06 04:04:43', '{\"request_id\": 16, \"donation_id\": 2, \"name\": \"mehnaj\"}', '{\"request_id\": 16, \"donation_id\": 2, \"name\": \"mehnaj\"}'),
(10, 'requests', 'UPDATE', '2024-12-06 04:04:43', '{\"request_id\": 16, \"donation_id\": 2, \"name\": \"mehnaj\"}', '{\"request_id\": 16, \"donation_id\": 2, \"name\": \"mehnaj\"}'),
(11, 'users', 'INSERT', '2024-12-06 05:20:28', NULL, '{\"user_id\": 11, \"email\": \"kazmi@gmail.com\", \"role\": \"visitor\"}'),
(12, 'requests', 'INSERT', '2024-12-06 05:21:28', NULL, '{\"request_id\": 17, \"donation_id\": 2, \"name\": \"kazmi\"}'),
(13, 'requests', 'INSERT', '2024-12-06 05:21:28', NULL, '{\"request_id\": 17, \"donation_id\": 2, \"name\": \"kazmi\"}'),
(14, 'donations', 'UPDATE', '2024-12-06 05:21:28', '{\"donation_id\": 2, \"user_email\": \"mohdtaha9901@gmail.com\", \"quantity\": 10}', '{\"donation_id\": 2, \"user_email\": \"mohdtaha9901@gmail.com\", \"quantity\": 0}'),
(15, 'requests', 'UPDATE', '2024-12-06 05:22:55', '{\"request_id\": 17, \"donation_id\": 2, \"name\": \"kazmi\"}', '{\"request_id\": 17, \"donation_id\": 2, \"name\": \"kazmi\"}'),
(16, 'requests', 'UPDATE', '2024-12-06 05:22:55', '{\"request_id\": 17, \"donation_id\": 2, \"name\": \"kazmi\"}', '{\"request_id\": 17, \"donation_id\": 2, \"name\": \"kazmi\"}'),
(17, 'donations', 'INSERT', '2024-12-06 05:24:43', NULL, '{\"donation_id\": 11, \"user_email\": \"kazmi@gmail.com\", \"quantity\": 20}');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `delivery_schedule`
--

CREATE TABLE `delivery_schedule` (
  `schedule_id` int(11) NOT NULL,
  `volunteer_email` varchar(255) DEFAULT NULL,
  `request_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `status` enum('Scheduled','Completed') DEFAULT 'Scheduled'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `donation_id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `status` enum('Available','Claimed','Distributed') DEFAULT 'Available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`donation_id`, `user_email`, `quantity`, `status`, `created_at`) VALUES
(2, 'mohdtaha9901@gmail.com', 0, 'Available', '2024-12-04 07:41:22'),
(4, 'mohdtaha9901@gmail.com', 120, 'Distributed', '2024-12-04 07:47:22'),
(5, 'mohdtaha9901@gmail.com', 100, 'Available', '2024-12-04 07:48:49'),
(6, 'm@gmail.com', 50, 'Available', '2024-12-04 08:58:49'),
(7, 'm@gmail.com', 15, 'Available', '2024-12-04 08:59:48'),
(8, 'm@gmail.com', 50, 'Available', '2024-12-05 04:34:00'),
(9, 'mehnaj1@gmail.com', 20, 'Available', '2024-12-05 14:45:03'),
(10, 'mohdtaha9901@gmail.com', 50, 'Available', '2024-12-06 03:55:22'),
(11, 'kazmi@gmail.com', 20, 'Available', '2024-12-06 05:24:43');

--
-- Triggers `donations`
--
DELIMITER $$
CREATE TRIGGER `donations_after_delete` AFTER DELETE ON `donations` FOR EACH ROW BEGIN
    INSERT INTO action_log (table_name, action_type, old_data)
    VALUES (
        'donations', 
        'DELETE', 
        JSON_OBJECT('donation_id', OLD.donation_id, 'user_email', OLD.user_email, 'quantity', OLD.quantity)
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `donations_after_insert` AFTER INSERT ON `donations` FOR EACH ROW BEGIN
    INSERT INTO action_log (table_name, action_type, new_data)
    VALUES (
        'donations',
        'INSERT',
        JSON_OBJECT('donation_id', NEW.donation_id, 'user_email', NEW.user_email, 'quantity', NEW.quantity)
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `donations_after_update` AFTER UPDATE ON `donations` FOR EACH ROW BEGIN
    INSERT INTO action_log (table_name, action_type, old_data, new_data)
    VALUES (
        'donations',
        'UPDATE',
        JSON_OBJECT('donation_id', OLD.donation_id, 'user_email', OLD.user_email, 'quantity', OLD.quantity),
        JSON_OBJECT('donation_id', NEW.donation_id, 'user_email', NEW.user_email, 'quantity', NEW.quantity)
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `donation_assignments`
--

CREATE TABLE `donation_assignments` (
  `assignment_id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `volunteer_id` int(11) NOT NULL,
  `assigned_at` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donation_assignments`
--

INSERT INTO `donation_assignments` (`assignment_id`, `donation_id`, `volunteer_id`, `assigned_at`, `status`) VALUES
(1, 5, 3, '2024-12-05', 'assigned'),
(2, 2, 4, '2024-12-06', 'assigned'),
(3, 4, 4, '2024-12-06', 'assigned'),
(4, 2, 2, '2024-12-06', 'assigned');

-- --------------------------------------------------------

--
-- Table structure for table `donation_details`
--

CREATE TABLE `donation_details` (
  `donation_id` int(11) NOT NULL,
  `donor_name` varchar(100) NOT NULL,
  `donor_contact` varchar(20) NOT NULL,
  `food_item_name` varchar(100) NOT NULL,
  `date_of_donation` date NOT NULL,
  `volunteerRequired` tinyint(1) DEFAULT 0,
  `isAnonymous` tinyint(1) NOT NULL DEFAULT 0,
  `donationLocation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donation_details`
--

INSERT INTO `donation_details` (`donation_id`, `donor_name`, `donor_contact`, `food_item_name`, `date_of_donation`, `volunteerRequired`, `isAnonymous`, `donationLocation`) VALUES
(2, 'Taha', '03111842026', 'biryani', '2024-12-10', 0, 0, 'shah faisal'),
(4, 'Khizar Hayat', '03138833182', 'pasta', '2024-12-05', 0, 0, 'shah faisal'),
(5, 'Khizar Hayat', '03138833182', 'pasta', '2024-12-10', 0, 1, 'shah faisal 2'),
(6, 'Maaz Siddique', '03111842321', 'Pizza', '2024-12-06', 1, 1, 'Kamran chorangi'),
(7, 'Maaz Siddique', '03111842321', 'Pizza', '2024-12-07', 0, 1, 'Kamran chorangi'),
(8, 'Maaz Siddique', '03138833182', 'biryani', '2024-12-07', 0, 1, 'Kamran chorangi'),
(9, 'Mehnaj ', '0319290011', 'biryani', '2024-12-10', 0, 0, 'FB area karachi'),
(10, 'Taha', '03111842026', 'biryani', '2024-12-10', 1, 0, 'shah faisal'),
(11, 'kazmi', '3011212121', 'biryani', '2024-12-31', 0, 0, 'shah faisal colony');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `food_items`
--

CREATE TABLE `food_items` (
  `food_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `expiration_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `interests`
--

CREATE TABLE `interests` (
  `interest_id` int(11) NOT NULL,
  `interest_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `interests`
--

INSERT INTO `interests` (`interest_id`, `interest_name`) VALUES
(4, 'Administrative Support'),
(5, 'Community Outreach'),
(3, 'Event Planning'),
(1, 'Food Distribution'),
(2, 'Fundraising'),
(8, 'Logistics and Operations'),
(6, 'Public Relations'),
(7, 'Social Media Management');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `food_id` int(11) DEFAULT NULL,
  `donation_id` int(11) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` enum('Unread','Read') DEFAULT 'Unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user_email`, `message`, `status`, `created_at`) VALUES
(1, 'm@gmail.com', 'Welcome Maaz Siddique, your account has been successfully created!', 'Unread', '2024-12-04 08:44:15'),
(2, 'm@gmail.com', 'You have successfully donated 30 units of Pizza.', 'Unread', '2024-12-04 08:59:48'),
(3, 'm@gmail.com', 'Your request for 20 items has been accepted.', 'Read', '2024-12-04 09:36:59'),
(4, 'm@gmail.com', 'Your request for 20 items has been accepted.', 'Unread', '2024-12-04 09:37:01'),
(5, 'm@gmail.com', 'Your request for 5 items has been accepted.', 'Unread', '2024-12-04 09:37:10'),
(6, 'm@gmail.com', 'Your request for 5 items has been accepted.', 'Unread', '2024-12-04 09:37:13'),
(7, 'm@gmail.com', 'Your request for 5 items has been accepted.', 'Unread', '2024-12-04 09:38:20'),
(8, 'm@gmail.com', 'Your request for 2 items has been accepted.', 'Unread', '2024-12-04 09:40:45'),
(9, 'm@gmail.com', 'Your request for 2 items has been accepted.', 'Unread', '2024-12-04 09:40:46'),
(10, 'm@gmail.com', 'Your request for 4 items has been accepted.', 'Unread', '2024-12-04 09:42:53'),
(11, 'm@gmail.com', 'Your request for 1 items has been accepted.', 'Unread', '2024-12-04 09:45:35'),
(12, 'm@gmail.com', 'Your request for 5 items has been accepted.', 'Unread', '2024-12-04 09:48:08'),
(13, 'm@gmail.com', 'Your request for 10 items has been accepted.', 'Read', '2024-12-04 09:51:31'),
(14, 'm@gmail.com', 'Your request for 2 items has been accepted.', 'Unread', '2024-12-04 09:54:58'),
(15, NULL, 'Congratulations! Taha  Farooqui have been registered as volunteer.', 'Unread', '2024-12-04 11:57:45'),
(16, 'mohdtaha9901@gmail.com', 'Congratulations! Taha  Farooqui have been registered as volunteer.', 'Unread', '2024-12-04 12:03:41'),
(17, 'admin@gmail.com', 'Welcome Taha, your account has been successfully created!', 'Unread', '2024-12-04 12:49:16'),
(18, 'm@gmail.com', 'You have successfully donated 50 units of biryani.', 'Unread', '2024-12-05 04:34:00'),
(22, 'ahmed@gmail.com', 'Welcome john doe, your account has been successfully created!', 'Unread', '2024-12-05 06:28:25'),
(23, 'm@gmail.com', 'Your request for 15 items has been accepted.', 'Unread', '2024-12-05 06:30:33'),
(24, 'mehnaj1@gmail.com', 'Welcome mehnaj kazmi, your account has been successfully created!', 'Unread', '2024-12-05 14:44:03'),
(25, 'mehnaj1@gmail.com', 'You have successfully donated 20 units of biryani.', 'Unread', '2024-12-05 14:45:03'),
(26, 'mehnaj@gmail.com', 'Welcome Mehnaj, your account has been successfully created!', 'Unread', '2024-12-05 19:09:37'),
(27, 'mohdtaha9901@gmail.com', 'Your request for 10 items has been accepted.', 'Unread', '2024-12-06 03:54:08'),
(28, 'mohdtaha9901@gmail.com', 'You have successfully donated 50 units of biryani.', 'Unread', '2024-12-06 03:55:22'),
(29, 'mehnaj@gmail.com', 'Congratulations! mehnaj kazmi have been registered as volunteer.', 'Unread', '2024-12-06 03:59:54'),
(30, 'kazmi@gmail.com', 'Welcome kazmi, your account has been successfully created!', 'Unread', '2024-12-06 05:20:28'),
(31, 'kazmi@gmail.com', 'Your request for 10 items has been accepted.', 'Unread', '2024-12-06 05:21:28'),
(32, 'kazmi@gmail.com', 'You have successfully donated 20 units of biryani.', 'Unread', '2024-12-06 05:24:43');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Pending','Reviewed','Resolved') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `request_id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `status` enum('Pending','Fulfilled','Cancelled') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `canCollect` tinyint(1) NOT NULL DEFAULT 0,
  `donation_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`request_id`, `user_email`, `quantity`, `status`, `created_at`, `canCollect`, `donation_id`, `name`, `address`) VALUES
(6, 'm@gmail.com', 5, 'Cancelled', '2024-12-04 09:38:20', 1, 2, 'Taha Farooqui', 'Dr Ziauddin Ahmed Rd, Saddar Seari Quarters, Karachi, Karachi City, Sindh'),
(7, 'm@gmail.com', 2, 'Pending', '2024-12-04 09:40:45', 1, 2, 'Taha Farooqui', 'St-4 Sector 17-D On National Highway Karachi, Pakistan'),
(8, 'm@gmail.com', 2, 'Pending', '2024-12-04 09:40:46', 1, 2, 'Taha Farooqui', 'St-4 Sector 17-D On National Highway Karachi, Pakistan'),
(9, 'm@gmail.com', 4, 'Pending', '2024-12-04 09:42:53', 1, 3, 'Taha Farooqui', 'shah faisal colony'),
(10, 'm@gmail.com', 1, 'Pending', '2024-12-04 09:45:35', 0, 2, 'Taha Farooqui', 'St-4 Sector 17-D On National Highway Karachi, Pakistan'),
(11, 'm@gmail.com', 5, 'Pending', '2024-12-04 09:48:08', 1, 2, 'Taha Farooqui', 'St-4 Sector 17-D On National Highway Karachi, Pakistan'),
(15, 'm@gmail.com', 15, 'Pending', '2024-12-05 06:30:33', 0, 7, 'shayan khan', 'FAST NUCES'),
(16, 'mohdtaha9901@gmail.com', 10, 'Fulfilled', '2024-12-06 03:54:08', 1, 2, 'mehnaj', 'xyz'),
(17, 'kazmi@gmail.com', 10, 'Fulfilled', '2024-12-06 05:21:28', 0, 2, 'kazmi', 'xyz');

--
-- Triggers `requests`
--
DELIMITER $$
CREATE TRIGGER `after_request_insert` AFTER INSERT ON `requests` FOR EACH ROW BEGIN
  DECLARE notification_message TEXT;
  
  -- Create the notification message
  SET notification_message = CONCAT('Your request for ', NEW.quantity, ' items has been accepted.');
  
  -- Insert into the notifications table
  INSERT INTO notifications (user_email, message, created_at, status)
  VALUES (NEW.user_email, notification_message, NOW(), 'unread');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `requests_after_delete` AFTER DELETE ON `requests` FOR EACH ROW BEGIN
    INSERT INTO action_log (table_name, action_type, old_data)
    VALUES (
        'requests', 
        'DELETE', 
        JSON_OBJECT('request_id', OLD.request_id, 'donation_id', OLD.donation_id, 'name', OLD.name)
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `requests_after_delete2` AFTER DELETE ON `requests` FOR EACH ROW BEGIN
    INSERT INTO action_log (table_name, action_type, old_data)
    VALUES (
        'requests', 
        'DELETE', 
        JSON_OBJECT('request_id', OLD.request_id, 'donation_id', OLD.donation_id, 'name', OLD.name)
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `requests_after_insert` AFTER INSERT ON `requests` FOR EACH ROW BEGIN
    INSERT INTO action_log (table_name, action_type, new_data)
    VALUES (
        'requests', 
        'INSERT', 
        JSON_OBJECT('request_id', NEW.request_id, 'donation_id', NEW.donation_id, 'name', NEW.name)
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `requests_after_insert2` AFTER INSERT ON `requests` FOR EACH ROW BEGIN
    INSERT INTO action_log (table_name, action_type, new_data)
    VALUES (
        'requests', 
        'INSERT', 
        JSON_OBJECT('request_id', NEW.request_id, 'donation_id', NEW.donation_id, 'name', NEW.name)
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `requests_after_update` AFTER UPDATE ON `requests` FOR EACH ROW BEGIN
    INSERT INTO action_log (table_name, action_type, old_data, new_data)
    VALUES (
        'requests',
        'UPDATE',
        JSON_OBJECT('request_id', OLD.request_id, 'donation_id', OLD.donation_id, 'name', OLD.name),
        JSON_OBJECT('request_id', NEW.request_id, 'donation_id', NEW.donation_id, 'name', NEW.name)
    );
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `requests_after_update2` AFTER UPDATE ON `requests` FOR EACH ROW BEGIN
    INSERT INTO action_log (table_name, action_type, old_data, new_data)
    VALUES (
        'requests',
        'UPDATE',
        JSON_OBJECT('request_id', OLD.request_id, 'donation_id', OLD.donation_id, 'name', OLD.name),
        JSON_OBJECT('request_id', NEW.request_id, 'donation_id', NEW.donation_id, 'name', NEW.name)
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `request_assignments`
--

CREATE TABLE `request_assignments` (
  `assignment_id` int(11) NOT NULL,
  `request_id` int(11) DEFAULT NULL,
  `volunteer_email` varchar(255) DEFAULT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Assigned','Completed') DEFAULT 'Assigned'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(255) NOT NULL DEFAULT 'visitor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `phone`, `created_at`, `role`) VALUES
(1, 'Taha Farooqui', 'mohdtaha9901@gmail.com', '$2b$10$.Ao0bVD8teXXsLissOwttuEiEn0duQ5pX/LOt/CnH.MvilI7AQqTe', '03111842026', '2024-12-04 07:09:45', 'visitor'),
(2, 'sami', 'sami@gmail.com', '$2b$10$turywiex1GosB.ElXSQ4iO2GIlZ.0oMU/ji80wwwyS.rMUzT7NJhe', '03111212911', '2024-12-04 08:37:50', 'visitor'),
(3, 'ahzam waheed', 'ahzam@gmail.com', '$2b$10$1.8jhn.KETiAOJSpky12YOjkmwVEG5hJ89QVYZa8u8/kcC35GEWdu', '03101023111', '2024-12-04 08:39:06', 'visitor'),
(4, 'khizar hayat', 'khizar@gmail.com', '$2b$10$HowPA.oAVLXn2Z.TGHAjDO2onxbg36AdFDfDcU6eoxLeb6SQYKEUi', '03138833182', '2024-12-04 08:40:01', 'visitor'),
(5, 'Maaz Siddique', 'm@gmail.com', '$2b$10$.0hqJnj7AFSmiNOEtVVmIuFsDD5o/REE9.YeGk/5siCWZTDdPa3W2', '0312991001', '2024-12-04 08:44:15', 'admin'),
(6, 'Taha', 'admin@gmail.com', '$2b$10$/9C4LjaPzhUMxJf74ALplOd.pcWZtXx34cOrOFBqCx1fAUhEivhH.', '03111842026', '2024-12-04 12:49:16', 'admin'),
(8, 'john doe', 'ahmed@gmail.com', '$2b$10$bRfYOLXFOgm8Bf9WCSqiXedq2lKM2pj99rr7bIk4Y5R0ezFOjwN2W', '123456789', '2024-12-05 06:28:25', 'visitor'),
(9, 'mehnaj kazmi', 'mehnaj1@gmail.com', '$2b$10$4uiDakfeOhipIsO1r3a3huH12fRql/ZUTiwFB7CT7xHyJklDJb5da', '03191900221', '2024-12-05 14:44:03', 'visitor'),
(10, 'Mehnaj', 'mehnaj@gmail.com', '$2b$10$Bj.ZakzHAOnptN9PS06EJusP.4LR5AIgg2qDlFD47/S9M2PSsQWlC', '03109922100', '2024-12-05 19:09:37', 'visitor'),
(11, 'kazmi', 'kazmi@gmail.com', '$2b$10$U0GJgsjg4aerVkio7GEFiOvtvYu6ikw6RtsF.PD8dxd6wT6RznOC2', '03142518118', '2024-12-06 05:20:28', 'visitor');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `users_after_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    INSERT INTO action_log (table_name, action_type, new_data)
    VALUES (
        'users', 
        'INSERT', 
        JSON_OBJECT('user_id', NEW.user_id, 'email', NEW.email, 'role', NEW.role)
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_reviews`
--

CREATE TABLE `user_reviews` (
  `review_id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `donation_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comments` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `volunteers`
--

CREATE TABLE `volunteers` (
  `volunteer_id` int(11) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `availability` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `birthdate` date NOT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `experience` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteers`
--

INSERT INTO `volunteers` (`volunteer_id`, `user_email`, `availability`, `created_at`, `first_name`, `last_name`, `phone`, `birthdate`, `occupation`, `experience`) VALUES
(2, 'mohdtaha9901@gmail.com', 'available', '2024-12-04 12:03:41', 'Taha ', 'Farooqui', '03111842026', '2004-10-12', 'student', 'no\n'),
(4, 'mehnaj@gmail.com', 'available', '2024-12-06 03:59:54', 'mehnaj', 'kazmi', '03142518118', '2024-12-11', '', '');

--
-- Triggers `volunteers`
--
DELIMITER $$
CREATE TRIGGER `after_volunteer_insert` AFTER INSERT ON `volunteers` FOR EACH ROW BEGIN
  -- Insert a new notification for the added volunteer
  INSERT INTO notifications (user_email, message, status)
  VALUES (NEW.user_email, CONCAT('Congratulations! ', NEW.first_name, ' ', NEW.last_name, ' have been registered as volunteer.'), 'Unread');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `volunteer_interest_map`
--

CREATE TABLE `volunteer_interest_map` (
  `volunteer_id` int(11) NOT NULL,
  `interest_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `action_log`
--
ALTER TABLE `action_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `delivery_schedule`
--
ALTER TABLE `delivery_schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `volunteer_email` (`volunteer_email`),
  ADD KEY `request_id` (`request_id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`donation_id`),
  ADD KEY `user_email` (`user_email`);

--
-- Indexes for table `donation_assignments`
--
ALTER TABLE `donation_assignments`
  ADD PRIMARY KEY (`assignment_id`);

--
-- Indexes for table `donation_details`
--
ALTER TABLE `donation_details`
  ADD PRIMARY KEY (`donation_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `food_items`
--
ALTER TABLE `food_items`
  ADD PRIMARY KEY (`food_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `interests`
--
ALTER TABLE `interests`
  ADD PRIMARY KEY (`interest_id`),
  ADD UNIQUE KEY `interest_name` (`interest_name`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `food_id` (`food_id`),
  ADD KEY `donation_id` (`donation_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_email` (`user_email`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `user_email` (`user_email`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `user_email` (`user_email`);

--
-- Indexes for table `request_assignments`
--
ALTER TABLE `request_assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `volunteer_email` (`volunteer_email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_reviews`
--
ALTER TABLE `user_reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `user_email` (`user_email`),
  ADD KEY `donation_id` (`donation_id`);

--
-- Indexes for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD PRIMARY KEY (`volunteer_id`),
  ADD KEY `user_email` (`user_email`);

--
-- Indexes for table `volunteer_interest_map`
--
ALTER TABLE `volunteer_interest_map`
  ADD PRIMARY KEY (`volunteer_id`,`interest_id`),
  ADD KEY `interest_id` (`interest_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `action_log`
--
ALTER TABLE `action_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `delivery_schedule`
--
ALTER TABLE `delivery_schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `donation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `donation_assignments`
--
ALTER TABLE `donation_assignments`
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `food_items`
--
ALTER TABLE `food_items`
  MODIFY `food_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `interests`
--
ALTER TABLE `interests`
  MODIFY `interest_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `request_assignments`
--
ALTER TABLE `request_assignments`
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_reviews`
--
ALTER TABLE `user_reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `volunteers`
--
ALTER TABLE `volunteers`
  MODIFY `volunteer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `delivery_schedule`
--
ALTER TABLE `delivery_schedule`
  ADD CONSTRAINT `delivery_schedule_ibfk_1` FOREIGN KEY (`volunteer_email`) REFERENCES `volunteers` (`user_email`) ON DELETE CASCADE,
  ADD CONSTRAINT `delivery_schedule_ibfk_2` FOREIGN KEY (`request_id`) REFERENCES `requests` (`request_id`) ON DELETE CASCADE;

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `donation_details`
--
ALTER TABLE `donation_details`
  ADD CONSTRAINT `donation_details_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`donation_id`);

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`email`) ON DELETE SET NULL;

--
-- Constraints for table `food_items`
--
ALTER TABLE `food_items`
  ADD CONSTRAINT `food_items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food_items` (`food_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`donation_id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `request_assignments`
--
ALTER TABLE `request_assignments`
  ADD CONSTRAINT `request_assignments_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `requests` (`request_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `request_assignments_ibfk_2` FOREIGN KEY (`volunteer_email`) REFERENCES `volunteers` (`user_email`) ON DELETE CASCADE;

--
-- Constraints for table `user_reviews`
--
ALTER TABLE `user_reviews`
  ADD CONSTRAINT `user_reviews_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_reviews_ibfk_2` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`donation_id`) ON DELETE CASCADE;

--
-- Constraints for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD CONSTRAINT `volunteers_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`email`) ON DELETE CASCADE;

--
-- Constraints for table `volunteer_interest_map`
--
ALTER TABLE `volunteer_interest_map`
  ADD CONSTRAINT `volunteer_interest_map_ibfk_1` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteers` (`volunteer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `volunteer_interest_map_ibfk_2` FOREIGN KEY (`interest_id`) REFERENCES `interests` (`interest_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
