require('dotenv').config();
const bcrypt = require('bcryptjs');
const model = require('../../models/index');

const baseURL = process.env.BASE_URL + ":" + process.env.APP_PORT; 

module.exports = {

    async dologin(req,res){
        var session = req.session;
        const knocker = {
            username : req.body.username,
            password : req.body.password
        };  

        let user = await model.User.findOne({
            where : {
                username : knocker.username
            }
        }).then(function (usr) {
            // return response.json(usr); 
            const correctPass = bcrypt.compareSync(knocker.password,usr.password);
            let data;

            if(correctPass){
                session=req.session;
                session.user=usr; 
                session.logged = true;
                session.save();
                data = { 
                    logged : true,
                    message : "Welcome User!",
                    user : usr
                };
                res.redirect(baseURL + "/admin");
            }else{
                req.session.destroy(); 
                data = { 
                    logged : false,
                    message : "Username or passwprd did not match!", 
                }
                res.send({ 
                    status : 200,
                    data
                });
            }
            
        }) 
        .catch(function (err) {
            console.log('Something wrong happened' + err);
            res.send({
                status : "Failed",
                message : "Username or passwprd did not match",
                err
            });
        }); 
    },

    logout(req,res) { 
        // console.log(req.session);
        var session = req.session;
        session.destroy(); 
        data = { 
            logged : false,
            message : "Logout Berhasil", 
        }
        res.send({
           status : 200,
           data
        });
    }
}