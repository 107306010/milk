const service = require('../models/service_model');
const createEmail = require('../models/create_email');
const page = require('../models/page_model');


function getSendEmailData() {
    console.log("要");
    //取得信箱、提醒時間
    page.ingredientSettingPage().then(result => {
        var email = [];
        email = result[1];
        var alertdays = result[0][0].setting_data;

        //判斷資料庫是否有信箱
        if (email.length != 0) {

            page.ingredientPage().then(result => {
                var milk_storage = result[0][0];
                var milk_orderAmount = result[0][1];
                var milk_orderdate = result[0][2];
                var bottle_home_storage = result[1][0];
                var bottle_home_orderAmount = result[1][1];
                var bottle_home_orderdate = result[1][2];
                var bottle_250ml_storage = result[2][0];
                var bottle_250ml_orderAmount = result[2][1];
                var bottle_250ml_orderdate = result[2][2];

                //判斷今天是否需要寄信
                var today = new Date();
                var milk_dateString = milk_orderdate.split('/');
                var milk_date = new Date(milk_dateString[0], milk_dateString[1] - 1, milk_dateString[2]);
                var bottle_home_dateString = bottle_home_orderdate.split('/');
                var bottle_home_date = new Date(bottle_home_dateString[0], bottle_home_dateString[1] - 1, bottle_home_dateString[2]);
                var bottle_250ml_dateString = bottle_250ml_orderdate.split('/');
                var bottle_250ml_date = new Date(bottle_250ml_dateString[0], bottle_250ml_dateString[1] - 1, bottle_250ml_dateString[2]);

                //建議訂購日期-提早幾天寄
                milk_date = milk_date.setDate(milk_date.getDate() - alertdays);
                bottle_home_date = bottle_home_date.setDate(bottle_home_date.getDate() - alertdays);
                bottle_250ml_date = bottle_250ml_date.setDate(bottle_250ml_date.getDate() - alertdays);

                //要寄信提醒的物料
                var ingredient = [];
                var ingredientData = {};

                if (today >= milk_date) {
                    ingredient.push("milk");
                    ingredientData["milk_storage"] = milk_storage;
                    ingredientData["milk_orderAmount"] = milk_orderAmount;
                    ingredientData["milk_orderdate"] = milk_orderdate;

                }
                if (today >= bottle_home_date) {
                    ingredient.push("bottle_home");
                    ingredientData["bottle_home_storage"] = bottle_home_storage;
                    ingredientData["bottle_home_orderAmount"] = bottle_home_orderAmount;
                    ingredientData["bottle_home_orderdate"] = bottle_home_orderdate;

                }
                if (today >= bottle_250ml_date) {
                    ingredient.push("bottle_250ml");
                    ingredientData["bottle_250ml_storage"] = bottle_250ml_storage;
                    ingredientData["bottle_250ml_orderAmount"] = bottle_250ml_orderAmount;
                    ingredientData["bottle_250ml_orderdate"] = bottle_250ml_orderdate;
                }
                //判斷使否有物料需要寄信
                if (ingredient.length != 0) {
                    createEmail.send_emails(email, ingredientData, ingredient);
                }

            }, (err) => {
                console.log(err)
                res.json({
                    result: err
                })
            })


        }

    }, (err) => {
        console.log(err)
        res.json({
            result: err
        })
        return;
    })









}
module.exports = getSendEmailData;