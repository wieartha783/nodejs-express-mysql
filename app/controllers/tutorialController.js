const config = require('../../configs/db_config');
const mysql = require('mysql2');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    getDataTutorials(req ,res){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.query(
                'select * from tutorials order by id asc',
                function(error, result){
                    if(error) throw error;
                    res.send({
                        success : true,
                        message : "Ambil Data Tutorials Berhasil",
                        data : result
                    });
                });
            connection.release();
        })
    },

    createDataTutorials(req, res){
        let newData = {
            title : req.body.title,
            description : req.body.description,
            published : req.body.published
        };

        pool.getConnection(function (error,connecttion){
            if(error) throw error;
            connecttion.query("insert into tutorials SET ? ", newData, function(error,result){
                if(error) throw error;
                res.send({
                    success : true,
                    message : "Berhasil Menyimpan Data Tutorials",
                    data : result
                });
            });
            connecttion.release();
        });        

    },

    getDataTutorialsById(req,res){
        let id = req.params.id;
        if(null !== id){
            pool.getConnection(function(error, connect){
                if(error) throw error;
                connect.query("select * from tutorials where id = ?;", id,
                function(error,result){
                    if(error) throw error;
                    res.send({
                        success : true,
                        message : "Berhasil Mengambil Data Tutorial By ID",
                        data : result
                    });
                });
                connect.release();
            });
        }else{
            res.send({
                success : false,
                message : "ID tidak diinput dengan benar",
                data : null
            });
        }
    },

    updateDataTutorialsById(req,res){
        let id = req.params.id;
        let newData = {
            title : req.body.title,
            description : req.body.description,
            published : req.body.published
        };

        if(null !== id){
            pool.getConnection(function(error, connect){
                if(error) throw error;
                connect.query("update tutorials set ? where id = ?;", newData , id,
                function(error,result){
                    if(error) throw error;
                    res.send({
                        success : true,
                        message : "Berhasil Update Data Tutorial By ID",
                        data : result
                    });
                });
                connect.release();
            });
        }else{
            res.send({
                success : false,
                message : "ID tidak diinput dengan benar",
                data : null
            });
        }
    }

}
