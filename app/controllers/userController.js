require('dotenv').config();

const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const config = require('../../configs/db_config');

const pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  userLogin(req, res) {
    const userCredential = {
      username: req.body.username,
      password: req.body.password
    };
    pool.getConnection((error, conn) => {
      if (error) {
        throw error;
      }
      conn.query('select * from users where username = ? limit 1', userCredential.username, (errorquery, result) => {
        if (errorquery) {
          throw errorquery;
        }
        if (result.length) {
          const curUser = result[0];
          const passwordCheck = bcrypt.compareSync(userCredential.password, curUser.password);
          if (passwordCheck) {
            res.send({ success: 1, message: 'Connected to login succesfully', data: curUser });
          }
          else {
            res.send({ success: 1, message: 'Connected to login succesfully', data: 'Username or password wrong!' });
          }
        }
        else {
          res.send({ success: 1, message: 'Connected to login succesfully', data: 'Username or password wrong!' });
        }
      });
      conn.release();
    });
  },
  generatePassword(req, res) {
    const passwordHash = bcrypt.hashSync('admin', process.env.APP_KEY);
    res.send({
      success: 1,
      message: 'Hash string produced succesfully',
      data: {
        passwordInDb: passwordHash
      }
    });
  }
};
