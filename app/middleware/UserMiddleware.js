require('dotenv').config();

module.exports = {

    cekLogged(req,res,next){
        let  session = req.session;
        if(session.logged && session.user){
            // console.log(session.user);
            next();
        }else{
            // console.log(session);
            req.session.returnTo = req.originalUrl; 
            res.redirect(process.env.COMPLETE_URL + "/login"); 
        }
    }

}