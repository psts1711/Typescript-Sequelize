'use strict';
import {
  Model
} from 'sequelize';

type ProjectAttributes = {
  id: number,
  title: string,
  status: string,
};

module.exports = (sequelize:any, DataTypes:any) => {
  class Project extends Model <ProjectAttributes> implements ProjectAttributes {
     id!: number;
     title!: string;
     status!: string;
    static associate(models:any) {
      // define association here
      Project.belongsToMany(models.User,{
        through:'ProjectAssignments'
      })
    }
  }
  Project.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull:false,
      primaryKey: true,
    },
    title:{
      type: DataTypes.STRING,
      allowNull:false,
    }, 
    status:{
      type: DataTypes.STRING,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};