var nodemailer = require("nodemailer");

// 執行nodemailer的createTransport()方法，建立「傳送器」物件。
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '你的帳號@gmail.com',
        pass: '你的電子郵箱密碼'
    }
});

var mail = {
    from: '姓名 <你的帳號@gmail.com>',   // 寄信人和電郵位址
    to: '收件人姓名 <收件人的e-mail>',     // 收信人的大名和e-mail
    subject: '信件主旨',
    text: '這裡面不包含HTML標籤',         // 純文字訊息內容
    html: '這裡面可以加入<b>HTML標籤</b>'  // HTML訊息內容
};

transporter.sendMail(mail, function(error, info){
  if(error){
    return console.log(error);
  }
  console.log('郵件已寄出：' + info.response);
});
