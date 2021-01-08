const nodemailer = require('nodemailer');
const config = require('../config/development_config');
var alert = [];
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'yourmilklover@gmail.com',
        pass: 'milk20210107'
    }
});
module.exports = {
    //寄一封且包含所有內容
    send: function (data, res, amount) {
        let mailOptions = {
            from: 'yourmilklover@gmail.com',
            to: data.email,
            subject: '鮮乳坊物料訂購系統',
            text: `您好:` + `\n` + `   這裡是鮮乳坊物料訂購系統，提醒您:` + `\n` + `目前牛奶庫存為:${data.milkStorage}，建議於${data.millkOrderDate}訂購${data.millkOrderAmount}毫升的牛奶;` + `\n` +
                `家庭號瓶子目前的庫存量為:${data.homeBottleStorage}，建議於${data.homeBottleOrderDate}訂購${data.homeBottleOrderAmount}瓶;` + `\n` +
                `250ml瓶子目前的庫存量為:${data._250mlBottleStorage}，建議於${data._250mlBottleorderDate}訂購${data._250mlBottleOrderAmount}瓶。` + `\n` + `\n` +
                `謝謝您!祝您萬事如意、平安健康` + `\n` + `鮮乳坊物料訂購系統敬上`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {

                alert.push("false");
                alert.push("抱歉系統出現了一些小問題!")
                console.log(alert);

                return alert;

            } else {

                alert.push("true");
                alert.push("已成功寄出!")
                console.log(alert);
                return alert;

            }
        })


    },
    //寄出真正要訂購的物料的信
    send_emails: function (email, data, ingredient) {
        //將寄信內容設置好
        var content = `您好:` + `\n` + `   這裡是鮮乳坊物料訂購系統，提醒您:` + `\n`;
        if (ingredient.indexOf("milk") > -1) {
            content = content + `牛奶目前庫存為:${data.milk_storage}公升，建議您最晚於${data.milk_orderdate}訂購${data.milk_orderAmount}毫升的牛奶;` + `\n`;
        }
        if (ingredient.indexOf("bottle_home") > -1) {
            content = content + `家庭號瓶子目前的庫存量為:${data.bottle_home_storage}瓶，建議您最晚於${data.bottle_home_orderdate}訂購${data.bottle_home_orderAmount}瓶;` + `\n`;
        }
        if (ingredient.indexOf("bottle_250ml") > -1) {
            content = content + `250ml瓶子目前的庫存量為:${data.bottle_250ml_storage}瓶，建議您最晚於${data.bottle_250ml_orderdate}訂購${data.bottle_250ml_orderAmount}瓶。` + `\n`;
        }
        content = content + `\n` + `謝謝您!祝您萬事如意、平安健康` + `\n` + `鮮乳坊物料訂購系統敬上`;
        console.log(email);
        console.log(content);
        for (var a = 0; a < email.length; a++) {
            let mailOptions = {
                from: 'yourmilklover@gmail.com',
                to: email[a].email,
                subject: '鮮乳坊物料訂購系統',
                text: content
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {

                    alert.push("false");
                    alert.push("抱歉系統出現了一些小問題!")
                    console.log(alert);
                    return alert;

                } else {
                    alert.push("true");
                    alert.push("已成功寄出!")
                    return alert;

                }

            })
        }
    }

}



