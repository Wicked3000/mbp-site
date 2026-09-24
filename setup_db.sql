CREATE DATABASE IF NOT EXISTS mbp_site;
USE mbp_site;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_name VARCHAR(100) NOT NULL,
    primary_school VARCHAR(100) NOT NULL,
    grade INT NOT NULL,
    destination_school VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Selected',
    gender ENUM('M', 'F')
);

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vet_students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_name VARCHAR(255) NOT NULL,
    primary_school VARCHAR(255) NOT NULL,
    destination_school VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Selected',
    gender VARCHAR(10) DEFAULT 'M',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fode_students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_name VARCHAR(255) NOT NULL,
    primary_school VARCHAR(255) NOT NULL,
    destination_school VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Selected',
    gender VARCHAR(10) DEFAULT 'M',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clear existing data if any
TRUNCATE TABLE students;

-- Dummy Data for Cameron Secondary School (Grade 9)
INSERT INTO students (candidate_name, primary_school, grade, destination_school, status, gender) VALUES
('Julian Kepas', 'Alotau Primary', 9, 'Cameron Secondary School', 'Selected', 'M'),
('Belinda Thomas', 'Cameron Primary', 9, 'Cameron Secondary School', 'Selected', 'F'),
('David Tau', 'Alotau Primary', 9, 'Cameron Secondary School', 'Selected', 'M'),
('Sarah Noah', 'Kwagila Primary', 9, 'Cameron Secondary School', 'Selected', 'F'),
('Michael Abel', 'Gurney Primary', 9, 'Cameron Secondary School', 'Selected', 'M'),
('Grace Oliver', 'Alotau Primary', 9, 'Cameron Secondary School', 'Selected', 'F');

-- Dummy Data for Duau High School (Grade 9)
INSERT INTO students (candidate_name, primary_school, grade, destination_school, status, gender) VALUES
('John Wesley', 'Duau Primary', 9, 'Duau High School', 'Selected', 'M'),
('Alice Kula', 'Duau Primary', 9, 'Duau High School', 'Selected', 'F'),
('Thomas Namuri', 'Logea Primary', 9, 'Duau High School', 'Selected', 'M'),
('Paul Lona', 'KB Primary', 9, 'Duau High School', 'Selected', 'M'),
('Mary Bani', 'Duau Primary', 9, 'Duau High School', 'Selected', 'F');

-- Dummy Data for Hagita Secondary School (Grade 11)
INSERT INTO students (candidate_name, primary_school, grade, destination_school, status, gender) VALUES
('Peter Didymus', 'Hagita Secondary School (Lower Sec)', 11, 'Hagita Secondary School', 'Selected', 'M'),
('Esther Moses', 'Hagita Secondary School (Lower Sec)', 11, 'Hagita Secondary School', 'Selected', 'F'),
('Stephen Keke', 'Santa Maria Secondary (Lower Sec)', 11, 'Hagita Secondary School', 'Selected', 'M'),
('Ruth Kila', 'Hagita Secondary School (Lower Sec)', 11, 'Hagita Secondary School', 'Selected', 'F');

-- Dummy Data for Holy Name Secondary School (Grade 11)
INSERT INTO students (candidate_name, primary_school, grade, destination_school, status, gender) VALUES
('Simon Peter', 'Holy Name Secondary (Lower Sec)', 11, 'Holy Name Secondary School', 'Selected', 'M'),
('Martha John', 'Holy Name Secondary (Lower Sec)', 11, 'Holy Name Secondary School', 'Selected', 'F'),
('Lazarus Mary', 'Cameron Secondary (Lower Sec)', 11, 'Holy Name Secondary School', 'Selected', 'M');

-- Clear existing data if any
TRUNCATE TABLE vet_students;

-- 2024 VET Selection List - Kwato VET Centre
INSERT INTO vet_students (candidate_name, primary_school, destination_school, status, gender) VALUES
('Binan Rian', 'Goilanai', 'Kwato VET Centre', 'Selected', 'M'),
('Ezekiel Abiah', 'Alotau', 'Kwato VET Centre', 'Selected', 'F'),
('Morris Joel', 'Alotau', 'Kwato VET Centre', 'Selected', 'M'),
('Nelson Nelson', 'Alotau', 'Kwato VET Centre', 'Selected', 'M'),
('Rupi Judeith', 'Alotau', 'Kwato VET Centre', 'Selected', 'F'),
('Haro Lewardy', 'Alotau', 'Kwato VET Centre', 'Selected', 'M'),
('Napora Isaac', 'Kuiaro', 'Kwato VET Centre', 'Selected', 'M'),
('Newton Roselyn Jenny', 'Rabe', 'Kwato VET Centre', 'Selected', 'F'),
('Jemmy Cyril', 'Gwarume', 'Kwato VET Centre', 'Selected', 'M'),
('Georey Glenda', 'Gwarume', 'Kwato VET Centre', 'Selected', 'F'),
('Bunag Rodney', 'Gwarume', 'Kwato VET Centre', 'Selected', 'M'),
('Anderson Numasuba', 'Gwarume', 'Kwato VET Centre', 'Selected', 'M'),
('Walua Davids', 'Gwarume', 'Kwato VET Centre', 'Selected', 'M'),
('Inaru Danny', 'Ululoga', 'Kwato VET Centre', 'Selected', 'M'),
('Jemmy Sharlot', 'Ululoga', 'Kwato VET Centre', 'Selected', 'F'),
('Walua Churoll', 'Ululoga', 'Kwato VET Centre', 'Selected', 'M'),
('Tauris Michael', 'Rabaraba', 'Kwato VET Centre', 'Selected', 'M'),
('Nikel Willie', 'Rabaraba', 'Kwato VET Centre', 'Selected', 'M'),
('Momen Miriam', 'Rabaraba', 'Kwato VET Centre', 'Selected', 'F');

-- Clear existing data if any
TRUNCATE TABLE fode_students;

-- FODE Intake List for 2026
INSERT INTO fode_students (candidate_name, primary_school, destination_school, status, gender) VALUES
('Boine Ensail', 'Lelohoa', 'FODE Intake 2026', 'Selected', 'F'),
('John Nationty', 'Lelohoa', 'FODE Intake 2026', 'Selected', 'F'),
('Kagubuy Vivian Brig', 'Lelohoa', 'FODE Intake 2026', 'Selected', 'F'),
('Oben Roseanne', 'Lelohoa', 'FODE Intake 2026', 'Selected', 'F'),
('Richard Tomali Pithal', 'Lelohoa', 'FODE Intake 2026', 'Selected', 'F'),
('Tommy George', 'Lelohoa', 'FODE Intake 2026', 'Selected', 'M'),
('Benjamin Isabellina', 'Pabe', 'FODE Intake 2026', 'Selected', 'F'),
('Didia Lane Jacinta', 'Pabe', 'FODE Intake 2026', 'Selected', 'F'),
('Gini Andrew', 'Pabe', 'FODE Intake 2026', 'Selected', 'M'),
('Harold Melilyn', 'Pabe', 'FODE Intake 2026', 'Selected', 'F'),
('Leod Brian', 'Pabe', 'FODE Intake 2026', 'Selected', 'M'),
('Petra Jenine', 'Pabe', 'FODE Intake 2026', 'Selected', 'F'),
('Peniamin Garry', 'Pabe', 'FODE Intake 2026', 'Selected', 'M'),
('Stanley Melanie', 'Pabe', 'FODE Intake 2026', 'Selected', 'M'),
('Tuiwala Daniel', 'Pabe', 'FODE Intake 2026', 'Selected', 'M'),
('Tioni Traceyl', 'Pabe', 'FODE Intake 2026', 'Selected', 'F');
