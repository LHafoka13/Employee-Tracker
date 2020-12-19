DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;


USE employee_DB;

CREATE TABLE department (
id INT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role (
id INT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(10,2),
department_id INT
);

CREATE TABLE employee (
id INT PRIMARY KEY, 
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT, 
manager_id INT NULL
);



INSERT INTO department (id, name) 
VALUES (1, "Engineering"), (2, "Security"), (3, "Housekeeping"), (4, "Front Office");


INSERT INTO employee (id, first_name, last_name) 
VALUES (1, "Ima", "Engineer"), (2, "Ima", "SecurityOfficer"), (3, "Ima", "Housekeeper"), (4, "Ima", "FrontDeskAgent");

INSERT INTO role (id, title, salary) 
VALUES (1, "Engineer", 80000.00), (2, "Security Officer", 50000.00), (3, "Housekeeper", 40000.00), (4, "Front Desk Agent", 60000.00);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;