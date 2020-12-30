const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
        auth: {
            user: 'yourmilklover@gmail.com',
            pass: 'milk20210107'
        }
});
    
function send(data,res) {
    //要寄的數量>1
    console.log(data[0][0].length,data)
    if (data[0][0].length > 1) {
        data[0].forEach((item, index) => {
            //取出各email 及對應coupon
            let mailOptions = {
                from: 'yourmilklover@gmail.com',
                to: `${item}`,
                subject: '你的牛奶情人',
                text: `聽說你沒有乖乖喝牛奶喔快給我來買，這是給你的優惠券${data[1][index]}:記得繼續買牛奶!`
            }
           
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    
                    res.render('aa')
                    
                } else {
                
                    res.render('email_comfirm_page')
                }
            })
    
        });
    } else {
        let mailOptions = {
            from: 'yourmilklover@gmail.com',
            to: `${data[0]}`,
            subject: '你的牛奶情人',
            text: `聽說你沒有乖乖喝牛奶喔快給我來買，這是給你的優惠券${data[1]}:記得繼續買牛奶!`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                
                res.sendStatus(422)

            } else {
            
                res.render('email_comfirm_page')
            }
        })
    }
}

module.exports = send;