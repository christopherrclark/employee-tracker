DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
  department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(department_id)
);

CREATE TABLE employee (
  employee_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  employee_first_name VARCHAR(30) NOT NULL,
  employee_last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(role_id),
  manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(employee_id)
);