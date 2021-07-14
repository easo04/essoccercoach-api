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

alter table exercices modify column description varchar(500);
alter table exercices modify column disposition varchar(500);
alter table exercices modify column objectifs varchar(500);

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

ALTER TABLE users ADD activated BOOLEAN DEFAULT FALSE AFTER token;
ALTER TABLE users ADD langue ENUM('fr', 'es', 'en') DEFAULT 'fr' AFTER activated;


DESCRIBE users;

/** gestion quipes **/

CREATE TABLE equipes (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name CHAR(200) NOT NULL,
    club CHAR(200) NOT NULL,
    user_creation_name CHAR(60),
    user_creation INT(10) UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

ALTER TABLE equipes modify column user_creation INT(10) UNSIGNED;

ALTER TABLE equipes ADD CONSTRAINT FK_userequip_ID FOREIGN KEY (user_creation) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE joueurs (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    poste ENUM('G', 'DFC', 'DG', 'DD', 'MC', 'MCO', 'ATT', 'ED', 'EG', 'MD', 'MG'),
    first_name CHAR(80) NOT NULL,
    last_name CHAR(80) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    equipe INT(10) UNSIGNED,
    user INT(10) UNSIGNED,
    FOREIGN KEY (equipe) REFERENCES equipes(id),
    FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE entraineurs (id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role ENUM('ENT', 'ASS', 'G'),
    is_admin BOOLEAN DEFAULT FALSE,
    first_name CHAR(80) NOT NULL, last_name CHAR(80) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    equipe INT(10) UNSIGNED, 
    user INT(10) UNSIGNED,
    FOREIGN KEY (equipe) REFERENCES equipes(id),
    FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE activites (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name CHAR(200) NOT NULL,
    is_match BOOLEAN DEFAULT FALSE,
    adversaire CHAR(150),
    date_activite DATE NOT NULL,
    heure CHAR(10) NOT NULL,
    heure_arrive CHAR(10),
    adresse CHAR(200),
    link_adresse CHAR(255),
    resultat CHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    equipe INT(10) UNSIGNED,
    FOREIGN KEY (equipe) REFERENCES equipes(id)
);

CREATE TABLE disponibilite (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    present BOOLEAN DEFAULT FALSE,
    joueur INT(10) UNSIGNED,
    activite INT(10) UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (joueur) REFERENCES joueurs(id),
    FOREIGN KEY (activite) REFERENCES activites(id)
);

/** gestion seances et matchs **/

CREATE TABLE notes(
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    activite INT(10) UNSIGNED,
    note VARCHAR(300) NOT NULL,
    user_create INT(10) UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (activite) REFERENCES activites(id),
    FOREIGN KEY (user_create) REFERENCES users(id)
);

CREATE TABLE notes_joueurs(
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    activite INT(10) UNSIGNED,
    note VARCHAR(300),
    joueur INT(10) UNSIGNED,
    time_played INT(10),
    user_create INT(10) UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (activite) REFERENCES activites(id),
    FOREIGN KEY (user_create) REFERENCES users(id),
    FOREIGN KEY (joueur) REFERENCES joueurs(id)
);

CREATE TABLE seance(
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    activite INT(10) UNSIGNED,
    theme VARCHAR(300) NOT NULL,
    duration VARCHAR(6),
    user_create INT(10) UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (activite) REFERENCES activites(id),
    FOREIGN KEY (user_create) REFERENCES users(id)
);

CREATE TABLE seance_exercice(
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    seance_id INT(10) UNSIGNED,
    title VARCHAR(300) NOT NULL,
    description VARCHAR(300) NOT NULL,
    objectifs VARCHAR(300),
    nbPlayers INT,
    time VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url VARCHAR(300),
    image_id VARCHAR(300),
    FOREIGN KEY (seance_id) REFERENCES seance(id)
);

CREATE TABLE alignements(
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    activite INT(10) UNSIGNED,
    defenseurs VARCHAR(300) NOT NULL,
    milieux VARCHAR(300) NOT NULL,
    attaquants VARCHAR(300) NOT NULL,
    gardien VARCHAR(300) NOT NULL,
    remplacants VARCHAR(300) NOT NULL,
    systeme VARCHAR(30),
    user_create INT(10) UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (activite) REFERENCES activites(id)
);

SHOW TABLES;
