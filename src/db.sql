CREATE DATABASE IF NOT EXISTS essoccercoach;

use essoccercoach;

CREATE TABLE emails (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(40) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE emails ADD created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER email;

CREATE TABLE exercices (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    description VARCHAR(300) NOT NULL,
    disposition VARCHAR(300),
    objectifs VARCHAR(300),
    nbPlayers INT,
    time VARCHAR(10),
    category ENUM('offensif', 'deffensif', 'rondo', 'tactique', 'physique', 'gardien'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    popular BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(300),
    image_id VARCHAR(300)
);

DESCRIBE exercices;

CREATE TABLE users (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name CHAR(50) NOT NULL,
    last_name CHAR(50) NOT NULL,
    user_name CHAR(30),
    email CHAR(100) NOT NULL,
    password CHAR(255) NOT NULL,
    subscription ENUM('admin', 'premium', 'middle', 'free'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url VARCHAR(300),
    image_id VARCHAR(300),
    token VARCHAR(500)
);

ALTER TABLE users ADD token VARCHAR(500) AFTER image_id;

DESCRIBE users;

SHOW TABLES;
