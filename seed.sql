-- department seeds --
INSERT INTO department (name) 
VALUES ("Housekeeping");

INSERT INTO department (name)
VALUES ("Security");

INSERT INTO department (name)
VALUES ("Front Office");

-- role seeds --

INSERT INTO role (title, salary, department_id)
VALUES ("Housekeeper", 40000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Security Officer", 50000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Front Office Agent", 60000.00, 3);

-- employee seeds -- 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Megan", "Pete", 1, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Biggie", "Smalls", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tupac", "Shakur", 3, 1);


