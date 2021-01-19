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
