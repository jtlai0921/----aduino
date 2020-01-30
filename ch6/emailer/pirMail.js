var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '你的gmail帳號',
        pass: '你的gmail密碼'
    }
});

// 寄送信件
exports.send = function(f, p) {
  var mail = {
    from: '寄信人的e-mail',
    to: '收信人的e-mail',
    subject: '狗仔相機',
    html: '發掘到真相了：<br><img src="cid:photo"/>',
    attachments: [{
        filename: f,
        path: p,
        cid: 'photo'
    }],
  };

  transporter.sendMail(mail, function(error, info){
    if(error){
	    return console.log(error);
	}
	console.log('狗仔照片已寄出：' + info.response);
  });
};