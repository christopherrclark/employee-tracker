INSERT INTO department (department_name)
VALUES
    ("Sales"),
    ("Manufacturing");
    

INSERT INTO role (role_title, role_salary, department_id)
VALUES
    ("Sales Associate", 40000, 1),
    ("Jeweler", 50000, 2),
    ("Manager", 100000, 1);



INSERT INTO employee (employee_first_name, employee_last_name, role_id, manager_id)
VALUES
    ("Melisa", "Skustad", 3, NULL),
    ("Stacey", "Marr", 1, 1),
    ("Christopher", "Clark", 2, 1);