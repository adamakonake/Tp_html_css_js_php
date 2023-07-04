-- Creation de la base de donnée
CREATE DATABASE odk CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- creation des tables
CREATE TABLE odk.administrateur (
    id INT NOT NULL AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    CONSTRAINT pk_administrateur PRIMARY KEY (id)
);

CREATE TABLE promotion (
    id INT NOT NULL AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    annee INT NOT NULL,
    tauxR float NOT NULL,
    tauxI float NOT NULL,
    CONSTRAINT pk_promotion PRIMARY KEY (id,nom),
    CONSTRAINT uk_promotion UNIQUE (nom)
);

CREATE TABLE apprenant (
    id INT  NOT NULL AUTO_INCREMENT,
    matriculle VARCHAR(100) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    dateNaissance date NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(100) NOT NULL,
    promotion VARCHAR(100) NOT NULL,
    anneeCerf INT NOT NULL,
    photp VARCHAR(200) NOT NULL,
    idApprenant INT NOT NULL,
    CONSTRAINT pk_apprenant PRIMARY KEY (id),
    CONSTRAINT fk_administrateur_apprenant FOREIGN KEY (idApprenant) REFERENCES administrateur(id),
    CONSTRAINT fk_promotion_apprenant FOREIGN KEY(promotion) REFERENCES promotion(nom)
);