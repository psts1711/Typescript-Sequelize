import express from 'express';

import db from './models'
import {users} from './seeders/users'
import {projects} from './seeders/projects'
import {projectassignments} from './seeders/projectassignments'


const app = express();
const port = process.env.PORT || 4444;

// seeders
const createUsersSeeder=()=>{
    users.map(user=>{
        db.User.create(user)
    })
}
//createUsersSeeder();

const createProjectsSeeder=()=>{
    projects.map(project=>{
        db.Project.create(project)
    })
}
// createProjectsSeeder();

/* const createProjectsAssignmentSeeder=()=>{
    projectassignments.map(projectassignment=>{
        db.ProjectAssignment.create(projectassignment)
    })
}
createProjectsAssignmentSeeder(); */


/* db.ProjectAssignment.create({
    ProjectId:9,
    UserId:'285fab52-4928-4125-b365-db75557adf2f'
})
 */
 

app.get('/', (req,res)=>{
    db.User.findAll({
        include:{
            model: db.Project
        }
    }).then((result:object)=> res.json(result)).catch((error:object)=>
        console.log(error)
    )
})

// connecting to db;
db.sequelize.sync().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on Port ${port}`);
    });
});