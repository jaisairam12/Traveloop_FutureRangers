-- Traveloop Database Schema

CREATE DATABASE IF NOT EXISTS traveloop;
USE traveloop;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'planner', 'joiner', 'admin') DEFAULT 'user',
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- 2. User Preferences
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id INT PRIMARY KEY,
  travel_style VARCHAR(100),
  budget_preference VARCHAR(50),
  preferred_destinations TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Trips
CREATE TABLE IF NOT EXISTS trips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  planner_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  start_date DATE,
  end_date DATE,
  cover_image VARCHAR(255),
  status ENUM('draft', 'planning', 'active', 'completed') DEFAULT 'draft',
  visibility ENUM('private', 'public') DEFAULT 'private',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (planner_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_trips_planner_id ON trips(planner_id);
CREATE INDEX idx_trips_status ON trips(status);

-- 4. Trip Members
CREATE TABLE IF NOT EXISTS trip_members (
  trip_id INT NOT NULL,
  user_id INT NOT NULL,
  role ENUM('planner', 'editor', 'viewer') DEFAULT 'viewer',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (trip_id, user_id),
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Trip Stops (Cities/Days)
CREATE TABLE IF NOT EXISTS trip_stops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  day_number INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  date DATE,
  order_index INT NOT NULL DEFAULT 0,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);
CREATE INDEX idx_trip_stops_trip_id ON trip_stops(trip_id);

-- 6. Activities
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stop_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  type ENUM('transport', 'accommodation', 'sightseeing', 'food', 'entertainment', 'shopping', 'culture') NOT NULL,
  start_time TIME,
  duration VARCHAR(50),
  cost DECIMAL(10,2) DEFAULT 0.00,
  order_index INT NOT NULL DEFAULT 0,
  FOREIGN KEY (stop_id) REFERENCES trip_stops(id) ON DELETE CASCADE
);
CREATE INDEX idx_activities_stop_id ON activities(stop_id);

-- 7. Budgets
CREATE TABLE IF NOT EXISTS budgets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  category VARCHAR(100) NOT NULL,
  allocated_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  spent_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);
CREATE INDEX idx_budgets_trip_id ON budgets(trip_id);

-- 8. Packing Items
CREATE TABLE IF NOT EXISTS packing_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  category VARCHAR(100) NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  is_packed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- 9. Notes
CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  user_id INT NOT NULL,
  title VARCHAR(255),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 10. Trip Requests (For the public feed)
CREATE TABLE IF NOT EXISTS trip_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  destination VARCHAR(255) NOT NULL,
  budget VARCHAR(50),
  duration VARCHAR(50),
  style VARCHAR(100),
  status ENUM('open', 'in_progress', 'completed') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_trip_requests_status ON trip_requests(status);
CREATE INDEX idx_trip_requests_user_id ON trip_requests(user_id);

-- 11. Request Responses (Planners responding to requests)
CREATE TABLE IF NOT EXISTS request_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT NOT NULL,
  planner_id INT NOT NULL,
  message TEXT,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES trip_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (planner_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_request_responses_request_id ON request_responses(request_id);
