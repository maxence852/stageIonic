/**
 * Created by maxence on 13/04/2016.
 */
/*var express = require('express');
var log = require('../lib/log')(module);
var router = express.Router();
var config = require('../config');
var chromelogger = require('chromelogger');
var smtpTransport = require('nodemailer-smtp-transport');
//email
var nodemailer = require("nodemailer");

//var transporter = nodemailer.createTransport("smtps://maxence.begon147%40gmail.com:derfel01@smtp.gmail.com");
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "hotmail",
    auth: {
        user: "maxence.begon@hotmail.com",
        pass: "senbonzakura01"
    }
});



var transport = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
        user: "maxence.begon147@gmail.com",
        pass: "derfel01"
    },
    logger:true,
    debug: true

    //proxy: 'https://vps258804.ovh.net:80/'
}));*/

/*var rand,mailOptions,host,link;
router.use(chromelogger.middleware);

router.get('/',function(req,res){

    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="https://"+req.get('host')+"/send/verify?id="+rand;
   //link ="https://vps258804.ovh.net/send/verify?id="+rand;
    mailOptions={
        to : req.query.to,
        subject : "Please confirm your Email ionic account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.chrome.log(error);
            res.end("error"+error);
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});
router.get('/verify',function(req,res){

    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("https://"+host))
    //if((("https://vps258804.ovh.net/send/verify?id="+rand))==("https://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log("email is verified");
            res.end("<h1>Votre compte ShareABike "+mailOptions.to+" a bien été activé");
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source</h1>");
    }

});*/


//module.exports = router;