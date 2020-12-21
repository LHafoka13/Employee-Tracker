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

const addDepartment = () => {
    inquirer
      .prompt([
          {
            name: 'id',
            type: 'input',
            message: 'Enter an ID number',
         },
         {
             name: 'name',
             type: 'input',
             message: 'Enter a department name',
         },
    ])
    .then((input) => {
        let query = `INSERT INTO department(id, name) VALUES(${input.id}, '${input.name}')`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            
            console.log('Department Added!');
            menu();
        });
    });
    
};

const addEmployee = () => {
    inquirer
      .prompt([
          {
            name: 'id',
            type: 'input',
            message: 'Enter an ID number',
         },
         {
             name: 'firstname',
             type: 'input',
             message: 'Enter the first name',
         },
         {
             name: 'lastname',
             type: 'input',
             message: 'Enter the last name',
         },
         {
             name: 'roleid',
             type: 'input',
             message: 'Enter the role id'
         }
    ])
    .then((input) => {
        let query = `INSERT INTO department(id, name) VALUES(${input.id}, '${input.name}')`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            
            console.log('Department Added!');
            menu();
        });
    });
    
};

 const view = () => {
 
    
}

const update = () => {
    
}


//connection to mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    //run menu function after connection is made
    menu();
});