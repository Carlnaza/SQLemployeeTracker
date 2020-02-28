const prompt = require('inquirer').createPromptModule()
const mysql = require('mysql2')
const cTable = require('console.table')

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employees_db'
})

function getEmployees() {
    db.query(`
    SELECT role.title, role.salary, role.department_id, employee.first_name, employee.last_name, employee.role_id, manager_id
    FROM role INNER JOIN employee
    ON department_id = role_id`, (err, emp) => {
        if (err) throw err
        console.table(emp)
        init()
    })
}

function getRoles() {
    db.query(`SELECT * FROM role`, (err, emp) => {
        if (err) throw err
        console.table(emp)
        init()
    })
}

function getDepartment() {
    db.query(`SELECT * FROM department`, (err, emp) => {
        if (err) throw err
        console.table(emp)
        init()
    })
}

function addDepartment() {
    prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What is the name of the Department?'
        }
    ])
        .then(({ newDepartment }) => {
            db.query(`INSERT INTO department (name) VALUES ('${newDepartment}')`, err => {
                if(err) throw err
                console.log('Department Successfully Created!')
                init()
            })
        })
        .catch(e => console.error(e))
}

function addRole() {
    prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the Role?'
        },
        {
            type: 'input',
            name: 'newSalary',
            message: 'How much is starting Salary for this Role?'
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'What is the Role ID#?'
        }
    ])
        .then(({ newRole, newSalary, newRoleId }) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES 
            ('${newRole}',
            '${newSalary}',
            '${newRoleId}')`, err => {
                if(err) throw err
                console.log('New Role Successfully Created!')
                init()
            })
        })
        .catch(e => console.error(e))
}

function addEmployee() {
    prompt([
        {
            type: 'input',
            name: 'empFN',
            message: "What is the Employee's first name?"
        },
        {
            type: 'input',
            name: 'empLN',
            message: "What is the Employee's last name?"
        },
        {
            type: 'input',
            name: 'empRole',
            message: "What is the Employee's Role ID#?"
        },
        {
            type: 'input',
            name: 'empMan',
            message: "Who is the Employee's manager?"
        }
    ])
        .then(({ empFN, empLN, empRole, empMan}) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
            ('${empFN}',
            '${empLN}',
            '${empRole}',
            '${empMan}')`, err => {
                if(err) throw err
                console.log('New Employee Successfully Added!')
                init()
            })
        })
        .catch(e => console.error(e))
}

function updateEmployee() {
    db.query(`SELECT first_name FROM employee`, (err, emp) => {
        if(err) throw err
        prompt([
            {
                type: 'list',
                name: 'empChoice',
                message: "Which employee would you like to update?",
                choices: []
            }
        ])
            .then(response => {
               
            })
            .catch(e => console.error(e))
    })
    
}

function init() {
    prompt([
        {
            type: 'list',
            name: 'initSelection',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Exit'
            ]
        }
    ])
    .then(({ initSelection }) => {
        switch (initSelection) {
            case 'View All Employees':
               getEmployees()
                break
            case 'View All Roles':
                getRoles()
                break
            case 'View All Departments':
                getDepartment()
                break
            case 'Add Department':
                addDepartment()
                break
            case 'Add Role':
                addRole()
                break
            case 'Add Employee':
                addEmployee()
                break
            case 'Update Employee Role':
                updateEmployee()
                break
            case 'Exit':
                process.exit()
        }
    })
    .catch(e => console.error(e))
}
init()