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
      options()
    })
  })
}

function addRole() {
  let departments = []
  db.query('SELECT * FROM department', function (err, results) {
    departments = results.map(({ department_name, department_id }) => ({ name: department_name, value: department_id }));
    return inquirer.prompt([{
      type: "input",
      name: "role_title",
      message: "What is the name of the new role?"
    },{
      type: "input",
      name: "role_salary",
      message: "What is the salary for this role?"
    },{
      type: "list",
      name: "department_id",
      message: "Choose a department.",
      choices: departments
    }])
    .then((data) => {
      // let targetDepartment = departments.find(department => department.name === data.department_id);
      // let index = departments.indexOf(targetDepartment);
      db.query("INSERT INTO role (role_title, role_salary, department_id) VALUES(?, ?, ?)", [data.role_title, data.role_salary, data.department_id], (err, results) => {
        if (err) throw err;
        console.table(results);
        console.log("Role has been added.")
        options()
      });
  });
})};

async function addEmployee() {
  let managers = [];
  let results = await new Promise((resolve, reject) => {
    db.query('SELECT employee_first_name FROM employee WHERE role_id = 3', function (err, results) {
      if (err) reject(err);
      resolve(results);
    });
  });
  managers = results.map(({ employee_first_name }) => ({ name: employee_first_name }));
  // console.log(managers);

  const roles = await new Promise((resolve, reject) => {
    db.query("SELECT role_id, role_title FROM role", function(err, results){
      if (err) reject(err);
      resolve(results);
    })
  })

  const roleChoices = roles.map( role => {
    return { name: role.role_title, value: role.role_id }
   })

  console.log(roleChoices)

  return inquirer.prompt([{
        type: "input",
        message: "What's the first name of the employee?",
        name: "employee_first_name"
      },{
        type: "input",
        message: "What's the last name of the employee?",
        name: "employee_last_name"
      },{
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: roleChoices
      },{
        type: "list",
        message: "What is the manager name?",
        name: "manager_id",
        choices: managers
      }])
      .then((data) => {
        let targetManager = managers.find(manager => manager.name === data.manager_id);
        // console.log(targetManager);
      let index = managers.indexOf(targetManager) +1;
      // console.log(index);
      db.query("INSERT INTO employee (employee_first_name, employee_last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [data.employee_first_name, data.employee_last_name, data.role_id, index], (err, results) => {
        if (err) throw err;
        console.log("Employee has been added.")
        options();
      });
    });
}


async function updateEmployeeRole() {
  // create an update employee role
  let employees = [];
  let roles = [];
  let employeeResults = await new Promise((resolve, reject) => {
    db.query('SELECT employee_last_name FROM employee', function (err, results) {
      if (err) reject(err);
      resolve(results);
      employees = results.map(({ employee_last_name }) => ({ name: employee_last_name })); 
    });
  });
  let roleResults = await new Promise((resolve, reject) => {
    db.query('SELECT role_title FROM role', function (err, results) {
      if (err) reject(err);
      resolve(results);
      roles = results.map(({ role_title }) => ({ name: role_title })); 
    });
  });    
  
  // db.query('SELECT role_title FROM role', function (err, results) {
  //   roles = results.map(({ role_title }) => ({ name: role_title }));  
  return inquirer.prompt([
    {
    type: "list",
    name: "employee",
    message: "Which employee would you like to update?",
    choices: employees
  },{
    type: "list",
    name: "role",
    message: "What is the new role?",
    choices: roles
  }])
  .then((data) => {
    let targetEmployee = employees.find(employee => employee.name === data.employee);
    console.log(targetEmployee);
    let employeeIndex = employees.indexOf(targetEmployee) +1;
    console.log(employeeIndex);

    let targetRole =roles.find(role => role.name === data.role);
    console.log(targetRole);
    let roleIndex = roles.indexOf(targetRole) +1;
    console.log(roleIndex);

    // sql query to update employee with new role
    db.query(`
      UPDATE employee 
      SET role_id = ${roleIndex} 
      WHERE employee_id = ${employeeIndex}
    `, function(err, result) {
      if( err ){
        console.log("There was a problem")
        console.log(err)
        options();
      } else {
        console.log("Your employees role has been updated successfully!");
        options();
      }
    })
  })};



options();
