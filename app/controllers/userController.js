require('dotenv').config();

const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const config = require('../../configs/db_config');
const model = require('../../models/index');
const session = require('express-session');

const pool = mysql.createPool(config);

pool.on('error', (err) => {
  console.error(err);
});

module.exports = {
  //this login function is not using model, it's using traditional sql query 
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
  },

  //this one use the model from sequelize  also with promise
  getAllUser(req,res){
    console.log(model.User);
    let allUser = model.User.findAll().then(function (usr) {
        return response.json(usr);
    })
    .catch(function (err) {
        console.log('Something wrong happened');
    });
    res.send({
      success: true,
      message: 'Data user fecthed succesfully',
      data: {
        user: allUser
      },
      layout : false
    });
  },

  signUp(req,res){
    try {
        const {
          name,
          email,
          username,
          password
        } = req.body;
        const users = model.User.create({
          name,
          email,
          username,
          password : bcrypt.hashSync(password, process.env.APP_KEY)
        });
      if (users) {
        console.log({
          'status' : 'OK',
          'messages' : 'User Signup Successfully!',
          'data' : users,
        });
        res.redirect(process.env.COMPLETE_URL + "/login");
      }
    } catch (err) {
      res.status(400).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {},
      })
    }
  }

};
