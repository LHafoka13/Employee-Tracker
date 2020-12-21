//dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

//connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Kahuku.13',
    database: 'employee_DB',
});

//function that kicks off the application
const menu = () => {
  inquirer
    .prompt({
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Add departments, roles, or employees',
            'View departments, roles, or employees',
            'Update employee roles', 
            'Exit',
        ],
        name:'action',
    })
    .then((answer) => {
        switch (answer.action) {
            case 'Add departments, roles, or employees':
                add();
                break;
            case 'View departments, roles, or employees':
                view();
                break;
            case 'Update employee roles':
                update();
                break;
            case 'Exit':
                connection.end();
            
        };
    });
};

//this function allows End Users to decide which they would like to add
const add = () => {
   inquirer
     .prompt({
         type: 'list',
         message: 'Which would you like to add?',
         choices: [
            'Department',
            'Employee',
            'Role',
         ],
         name: 'add'
     })
     .then((answer) => {
         switch(answer.add) {
             case 'Department':
                 addDepartment();
                 break;
             case 'Employee': 
                addEmployee();
                break;
             case 'Role':
                 addRole();
                 break;             
         };
     });
};

//this funciton will add a department
const addDepartment = () => {
    inquirer
      .prompt(
         {
             name: 'name',
             type: 'input',
             message: 'Enter a department name',
         },
    )
    .then((input) => {
        let query = `INSERT INTO department(name) VALUES('${input.name}')`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            
            console.log(`${input.name} added to Departments!`);
            menu();
        });
    });
};

//this function will add an employee
const addEmployee = () => {
    inquirer
      .prompt([
         {
             name: 'firstname',
             type: 'input',
             message: 'What is the employee\'s first name?',
         },
         {
             name: 'lastname',
             type: 'input',
             message: 'What is the employee\'s last name?',
         },
         {
             name: 'role_id',
             type: 'list',
             message: 'What is the employee\'s role?',
             choices: [
                 'Housekeeper',
                 'Security Officer',
                 'Front Office Agent',
            ],
         },
         {
             name: 'manager_id',
             type: 'list',
             message: 'Who is the employee\'s manager?',
             choices: [
                 'Housekeeping Manager',
                 'Director of Security',
                 'Front Office Manager',
             ],
         }
    ])
    .then((input) => {
        if (input.role_id === 'Housekeeper') {
            roleId = 1;
        }
        if (input.role_id === 'Security Officer') {
            roleId = 2;
        }
        if (input.role_id === 'Front Office Agent') {
            roleId = 3;
        }

        if (input.manager_id === 'Housekeeping Manager') {
            managerId = 3;
        }
        
        if (input.manager_id === 'Director of Security') {
            managerId = 2;
        }

        if (input.manager_id === 'Front Office Manager') {
            managerId = 1;
        }
    
        connection.query('INSERT INTO employee SET ?', {
            first_name: input.firstname,
            last_name: input.lastname,
            role_id: roleId,
            manager_id: managerId,
        }, (err) => {
            if (err) throw err;
            
            console.table(`${input.firstname} ${input.lastname} added to Employees!`);
            menu();
        });
    })
}

//this function will add a role
const addRole = () => {
    inquirer
      .prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What is the title of this role?', 

        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for this role?',
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'Which department will this role be in?',
            choices: [
                'Front Office',
                'Security',
                'Housekeeping',
            ],
        },
    ])
    .then((input) => {

        if (input.department_id === 'Front Office') {
            departmentId = 3
        }

        if (input.department_id === 'Security') {
            departmentId = 2
        }

        if (input.department_id === 'Housekeeping') {
            departmentId = 1
        }

        connection.query('INSERT INTO role SET ?', {
            title: input.title,
            salary: input.salary,
            department_id: departmentId,
        }, 
        (err) => {
            if (err) throw err;

            console.log(`${input.title} added as a role!`)
            menu();
        } 
    )}
)}

//this function allows end users to choose which table they want to view
const view = () => {
    inquirer
      .prompt(
          {
          name: 'view',
          type: 'list',
          message: 'Choose which table to view',
          choices: [
              'Department',
              'Role',
              'Employee'
          ],
      }
      
    ).then((answer) => {
        switch(answer.view) {
            case 'Department':
                viewDepartment();
                break;
            case 'Role':
                viewRole();
                break;
            case 'Employee':
                viewEmployee();
                break;
        }
    })
}

//this function returns the department table
const viewDepartment = () => {
   connection.query('SELECT * FROM department', (err, res) => {
       if (err) throw err;
       console.table(res);
       menu();
   })
}

//this function returns the role table
const viewRole = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();
    })
}

//this function returns the employees table
const viewEmployee = () => {
  const sql =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary" +
    " FROM employee" +
    " inner join role ON (employee.role_id = role.id)" +
    " inner join department on role.department_id = department.id";

  connection.query(sql, [], function (err, res) {
    if (err) throw err;

    console.table(res);
    menu();
  })
};


const update = () => {
    let employees = [];
    let sql = 'SELECT * FROM employee';
    connection.query(sql, (err, res) => {
        if (err) throw err;

        res.forEach(( {first_name} ) => {
            employees.push(first_name);
        })

         inquirer
              .prompt([
             {
                 name: 'employee',
                 type: 'list',
                 message: 'Which employee record do you want to update?',
                 choices: employees
              },
              {
                  name: 'role',
                  type: 'list',
                  message: 'What role should this employee be assigned to?',
                  choices: [
                      'Housekeeper',
                      'Security Office',
                      'Front Office Agent'
                  ]
              }
            ])
            .then((input) => {
                if (input.role === 'Housekeeper') {
                    roleId = 1
                }

                if(input.role === 'Security Officer') {
                    roleId = 2
                }

                if (input.role === 'Front Office Agent') {
                    roleId = 3
                }

                let sql = `UPDATE employee SET role_id = ${roleId} WHERE first_name = '${input.employee}'`

                connection.query(sql, (err, res) => {
                    if (err) throw err;

                    console.log(`Updated ${input.employee}'s role!`);
                    viewEmployee();
                })
            })

              
    })
}


//connection to mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    //run menu function after connection is made
    menu();
});