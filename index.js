const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const consoleTable = require("console.table");

const db = mysql2.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);

function options() {
  inquirer.prompt([{
    type: "list",
    name: "options",
    message: "What would you like to do?",
          choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add department",
            "add a role",
            "add an employee",
            "update employee role",
            "exit",
          ],
  }]).then((data) => {
    switch (data.options) {
      case "view all departments":
        viewAllDepartments();
        break;
      case "view all roles":
        viewAllRoles();
        break;
      case "view all employees":
        viewAllEmployees();
        break;
      case "add department":
        addDepartment();
        break;
      case "add a role":
        addRole();
        break; 
      case "add an employee":
        addEmployee();
        break;
      case "update employee role":
        updateEmployeeRole();
        break;    
      default:
        process.exit();
  
  }})
}

function viewAllDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    options()
  });
}

function viewAllRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
    options()
  });
}

function viewAllEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    options()
  });
}

function addDepartment() {
  return inquirer.prompt({
    type: "input",
    name: "department",
    message: "What is the name of the new department?"
  }).then((data) => {
    db.query("INSERT INTO department (department_name) VALUES(?)", [data.department], (err, results) => {
      console.log("Department has been added.")
    })
  })
}

function addRole() {
  let departments = []
  db.query('SELECT * FROM department', function (err, results) {
    departments = departments.concat(results);
    console.log(departments);
  });
  return inquirer.prompt([{
    type: "input",
    name: "role_title",
    message: "What is the name of the new role?"
  },{
    type: "input",
    name: "role_salary",
    message: "What is the salary fo this role?"
  },{
    type: "list",
    name: "department_id",
    message: "Choose a department.",
    choices: departments
  }

])
}

function addEmployee() {
  // create an add an employee
}

function updateEmployeeRole() {
  // create an update employee role
}

options();
