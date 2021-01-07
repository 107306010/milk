module.exports = {
    calculate_storage: function (value) {
        var now_storage = value[4][0].product_storage;
        var ori_storage = value[4][0].product_storage;
        var order_storage = [];
        var count = [];
        var reorder_time = [];
        var send_time = [];
        var combine = [];
        //var ATP = []; 
        for (i = 1; i <= 4; i++) {
            if (value[0][0].predict_firstMonthOrder > value[2][0].promised_firstMonthOrder) {
                if (now_storage > value[0][0].predict_firstMonthOrder) {
                    now_storage = now_storage - value[0][0].predict_firstMonthOrder;
                    order_storage.push(now_storage);
                    count.push(0);
                    reorder_time.push(" ");
                    send_time.push(" ");
                } else {
                    now_storage = now_storage + value[5][0].EPQ - value[0][0].predict_firstMonthOrder;
                    order_storage.push(now_storage);
                    count.push(value[5][0].EPQ);
                    reorder_time.push("訂購");
                    send_time.push("寄信");
                    //ori_storage = ori_storage - value[2].promised_firstMonthOrder * order_storage.length;
                }
            } else {
                if (now_storage > value[2][0].promised_firstMonthOrder) {
                    now_storage = now_storage - value[2][0].promised_firstMonthOrder;
                    order_storage.push(now_storage);
                    count.push(0);
                    reorder_time.push(" ");
                    send_time.push(" ");
                } else {
                    now_storage = now_storage + value[5][0].EPQ - value[2][0].promised_firstMonthOrder;
                    order_storage.push(now_storage);
                    count.push(value[5][0].EPQ);
                    reorder_time.push("訂購");
                    send_time.push("寄信");
                }
            }
        }

        for (i = 1; i <= 4; i++) {
            if (value[1][0].predict_secondMonthOrder > value[3][0].promised_secondMonthOrder) {
                if (now_storage > value[1][0].predict_secondMonthOrder) {
                    now_storage = now_storage - value[1][0].predict_secondMonthOrder;
                    order_storage.push(now_storage);
                    count.push(0);
                    reorder_time.push(" ");
                    send_time.push(" ");
                } else {
                    now_storage = now_storage + value[5][0].EPQ - value[1][0].predict_secondMonthOrder;
                    order_storage.push(now_storage);
                    count.push(value[5][0].EPQ);
                    reorder_time.push("訂購");
                    send_time.push("寄信");
                }
            } else {
                if (now_storage > value[3][0].promised_secondMonthOrder) {
                    now_storage = now_storage - value[3][0].promised_secondMonthOrder;
                    order_storage.push(now_storage);
                    count.push(0);
                    reorder_time.push(" ");
                    send_time.push(" ");
                } else {
                    now_storage = now_storage + value[5][0].EPQ - value[3][0].promised_secondMonthOrder;
                    order_storage.push(now_storage);
                    count.push(value[5][0].EPQ);
                    reorder_time.push("訂購");
                    send_time.push("寄信");
                }
            }

        }
        console.log(order_storage);
        console.log(count);
        combine.push(order_storage);
        combine.push(count);
        combine.push(reorder_time);
        combine.push(send_time);
        return combine;
    }
}    