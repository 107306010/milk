process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
                user: 'yourmilklover@gmail.com',
                pass: 'milk20210107'
        }
});


function send(data, res) {
        console.log("454")
        console.log(data);
        console.log(data.length);
        console.log(data[0]);
        //要寄的數量>1
        if (data.length > 1) {
                data.forEach((item, index) => {
                        console.log(item);
                        //取出各email 及對應coupon
                        let mailOptions = {
                                from: 'yourmilklover@gmail.com',
                                to: item,
                                subject: `你的牛奶情人-給單次訂購的顧客`,
                                text: `竟然沒有成為續訂戶~~快來買牛奶，這是給你的優惠券記得來喔!`
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {

                                        console.log(error);
                                        res.sendStatus(422)

                                } else {
                                        console.log("if-success")
                                        res.sendStatus(200);

                                        res.redirect("/sinsub");
                                }
                        })

                });
        }
}

module.exports = send;
