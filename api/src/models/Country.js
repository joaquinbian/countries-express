const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type:DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag:{
      type: DataTypes.STRING,
      allowNull:false
    },
    continent:{
      type: DataTypes.STRING,
      allowNull:false
    },
    capital:{
      type:DataTypes.STRING,
      allowNull:false
    },
    subregion:{
      type:DataTypes.STRING,
      allowNull:true
    },
    area:{
      type:DataTypes.FLOAT, //si no le pongo float me da un error
      allowNull:true
    },
    population:{
      type:DataTypes.INTEGER,
      allowNull:true
    }
  },{timestamps:false}); //me elimina las columnas createdAt y updatedAt

};
