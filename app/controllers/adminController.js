require('dotenv').config();
const bcrypt = require('bcryptjs');
const model = require('../../models/index');
const { use } = require('../../routes');
const { frontUser } = require('./userController');


module.exports = {

 //this one use the model from sequelize  also with promise
 async getAllUser(req,res){
    console.log(model.User);
    let allUser = await model.User.findAll().then(function (usr) {
        // return response.json(usr);
        res.send({
          success: true,
          message: 'Data user fecthed succesfully',
          data: {
            user: usr
          },
          layout : false
        });
    })
    .catch(function (err) {
      res.send({
        success: 500,
        message:  err.message, 
        layout : false
      });
    });
  },

  index(req,res){
    res.render('welcome/welcome', 
        { 
          title : process.env.TITLE
        }
      );
  },

   user(req,res){
    let allUser = model.User.findAll().then(function (usr) {
      // return response.json(usr);
      res.render('user/list', 
        { 
          title : process.env.TITLE,
          user : usr
        }
      );
    })
    .catch(function (err) {
      res.send({
        success: 500,
        message:  err.message, 
        layout : false
      });
    });
  },

  fuser(req, res){
    res.render('user/fuser', 
      { 
        title : process.env.TITLE
      }
    )
  },

  saveUser(req, res){
    const newUser = {
      name : req.body.name,
      username : req.body.username,
      email : req.body.email,
      password : bcrypt.hashSync(req.body.password, process.env.APP_KEY)
    }
    model.User.create(newUser).then((usr)=>{
      res.redirect(req.app.locals.baseURL + "/admin/user");
    }).catch((err)=>{
      res.send({
        success: 500,
        message:  err.message, 
        layout : false
      });
    });

  },

  destroyUser(req,res){
    const id = req.query.id;
    model.User.destroy({
      where : {
        id
      }
    }).then(()=>{
      res.redirect(req.app.locals.baseURL + "/admin/user");
    }).catch((err)=>{
      res.send({
        success: 500,
        message:  err.message, 
        layout : false
      });
    });
  },

  editUser(req, res){
    const id = req.query.id;
    let user =  model.User.findOne({ where : {id} }).then((user) => {
      res.render("user/fedit",{
        title : "Edit User",
        user
      });
    }).catch((err)=>{
      throw err;
    });
  },

  updateUser(req, res){
    const id = req.body.id;
    let updatedUser = {
      name : req.body.name,
      username : req.body.username,
      email : req.body.email
    };
    if(req.body.password !== undefined){
      updatedUser.password = bcrypt.hashSync(req.body.password,process.env.APP_KEY);
    }
    model.User.update(
      updatedUser,
      {where : {
        id
      }}
    ).then(() => {
      res.redirect(req.app.locals.baseURL + "/admin/user");
    }).catch((err) => {
      throw err;
    });

  }

}