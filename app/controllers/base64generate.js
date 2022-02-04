function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
var randString = getRandomString(20);//get rand alphanumberic 20 char string
let randBase64String = btoa(randString); // Base64 encode the String

module.exports  = {
    generateKey(req,res){
        res.send({
            success:true,
            message : "Base 64 String Code Generated Succesfully",
            data : {
                generatedKey : randBase64String

            }
        });
    }

}