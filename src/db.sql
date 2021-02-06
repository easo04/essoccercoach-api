CREATE DATABASE IF NOT EXISTS essoccercoach;

use essoccercoach;

CREATE TABLE emails (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(40) NOT NULL
);

SHOW TABLES;

DROP PROCEDURE IF EXISTS emailsAddOrEdit;

CREATE PROCEDURE `emailsAddOrEdit`(
    IN _id INT,
    IN _email VARCHAR(40)
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO emails (email)
        VALUES (_email);

        SET _id = LAST_INSERT_ID();
    ELSE 
        UPDATE emails
        SET
            email = _email
        WHERE id = _id;
    END IF;

    SELECT _id AS id;
END

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
    image_id VARCHAR(300)
);

DESCRIBE users;
