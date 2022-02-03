require('dotenv').config();
module.exports = {
    multipleStatements  : true,
    host                : process.env.DB_HOST ,
    user                : process.env.DB_USERNAME,
    password            : process.env.DB_PASWORD,
    database            : process.env.DB_DATABASE,
    port                : process.env.DB_PORT,
    // multipleStatements  : true,
    // host                : 'localhost' ,
    // user                : 'root',
    // password            : '',
    // database            : 'db_nodejsapi',
    // port                : 3306,
};