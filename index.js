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
        return;
  
  }})
}

function viewAllDepartments() {
  // display all departments to user
}

function viewAllRoles() {
  // display all roles to user
}

function viewAllEmployees() {
  // display all employees to user
}

function addDepartment() {
  // create an add a department
}

function addRole() {
  // create an add a role
}

function addEmployee() {
  // create an add an employee
}

function updateEmployeeRole() {
  // create an update employee role
}

options();
