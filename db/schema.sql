DROP DATABASE IF EXISTS course_db;
CREATE DATABASE course_db;

USE course_db;

CREATE TABLE department (
  department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
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
  emplyee_first_name VARCHAR(30) NOT NULL,
  emplyee_last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(role_id)
  manager_id INT NOT NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(employee_id)
);

INSERT INTO course(course_title, course_description, active)
VALUES("Whatever", "Great course", TRUE );

--then paste all into workbench--