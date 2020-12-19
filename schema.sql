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
department_id INT,
CONSTRAINT FK_department_id FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT PRIMARY KEY, 
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
CONSTRAINT FK_role_id FOREIGN KEY (role_id) REFERENCES role(id),
manager_id INT NULL
);

INSERT INTO department (id, name) 
VALUES (1, "Engineering"), (2, "Security");

INSERT INTO role (id, title, salary, department_id) 
VALUES (1, "Engineer", 80000.00, 1), (2, "Security Officer", 50000.00, 2);

INSERT INTO employee (id, first_name, last_name, role_id) 
VALUES (1, "Megan", "Pete", 1), (2, "Flo", "Milli", 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- joins -- 

SELECT department.name, role.title, role.salary, role.department_id
FROM department
RIGHT JOIN role
ON department.id = role.department_id;

SELECT employee.first_name, employee.last_name, role.id
FROM employee
RIGHT JOIN role
ON role.id = employee.role_id;






