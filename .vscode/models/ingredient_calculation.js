function calculate_ingredient(rows) {
    //return array with calculated value
    const milk = [];
    const bottle_home = [];
    const bottle_250ml = [];

    //Get current inventory
    const milk_storage = rows[0][0].quantity;
    const bottle_home_storage = rows[1][0].quantity;
    const bottle_250ml_storage = rows[2][0].quantity;

    //Push current inventory to array
    milk.push(milk_storage);
    bottle_home.push(bottle_home_storage);
    bottle_250ml.push(bottle_250ml_storage);

    //Get EOQ parameter for bottle_250ml
    const year_demand_bottle_250ml = rows[3][0].year_demand;
    const carryCost_unit_bottle_250ml = rows[4][0].carry_cost;
    const orderCost_bottle_250ml = rows[5][0].order_cost;

    //Get EOQ parameter for bottle_home
    const year_demand_bottle_home = rows[3][1].year_demand;
    const carryCost_unit_bottle_home = rows[4][1].carry_cost;
    const orderCost_bottle_home = rows[5][1].order_cost;

    //Calculate EOQ(bottle)
    var bottle_home_EOQ = calculate_EOQ(year_demand_bottle_home, carryCost_unit_bottle_home, orderCost_bottle_home);
    var bottle_250ml_EOQ = calculate_EOQ(year_demand_bottle_250ml, carryCost_unit_bottle_250ml, orderCost_bottle_250ml);

    //Push bottle order amount to  array
    bottle_home.push(bottle_home_EOQ);
    bottle_250ml.push(bottle_250ml_EOQ);

    //Get weighted average parmeters (Demand for a season)
    const season_demand_milk_250ml = rows[6];
    const season_demand_milk_home = rows[7];
    //Calculate weighted average (milk)
    var milk_order = calculate_milkOrder(season_demand_milk_250ml, season_demand_milk_home);

    //Push milk order amount to array
    milk.push(milk_order);

    //Get parmeters for calculating milk order date
    const expiration_date_milk = rows[8][0].expiration_date;
    const lead_time_milk = rows[9][0].lead_time;

    //Calculate milk order date
    var milk_orderDate = calculate_milkOrderDate(expiration_date_milk, lead_time_milk);

    //Push milk order date to array
    milk.push(milk_orderDate);

    //Get parmeters for calculating bottle_home order date
    const demandRate_bottle_home = rows[11][0].month_demand / 30;
    const lead_time_bottle_home = rows[9][1].lead_time;
    const stocksupport_bottle_home = bottle_home_storage * (1 - rows[12][2].safety_stock_rate);

    //Get parmeters for calculating bottle_250ml order date
    const demandRate_bottle_250ml = rows[10][0].month_demand / 30;
    const lead_time_bottle_250ml = rows[9][2].lead_time;
    const stocksupport_bottle_250ml = bottle_250ml_storage * (1 - rows[12][1].safety_stock_rate);

    //Calculate bottle order date
    var bottle_home_orderDate = calculate_bottleOrderDate(demandRate_bottle_home, lead_time_bottle_home, stocksupport_bottle_home);
    var bottle_250ml_orderDate = calculate_bottleOrderDate(demandRate_bottle_250ml, lead_time_bottle_250ml, stocksupport_bottle_250ml);

    //Push bottle order date to array
    bottle_home.push(bottle_home_orderDate);
    bottle_250ml.push(bottle_250ml_orderDate);

    return [milk, bottle_home, bottle_250ml];
}

module.exports = calculate_ingredient;

//Calculate bottle order amount
function calculate_EOQ(year_demand, carryCost, orderCost) {
    var orderAmount = Math.sqrt(2 * year_demand * orderCost / carryCost);
    return Math.round(orderAmount);
}

//Calculate milk order amount by using weighted average
function calculate_milkOrder(season_demand_milk_250ml, season_demand_milk_home) {
    var milkOrderAmount = (season_demand_milk_250ml[0].season_demand * 250 + season_demand_milk_home[0].season_demand * 1000) * 0.4 + (season_demand_milk_250ml[1].season_demand * 250 + season_demand_milk_home[1].season_demand * 1000) * 0.3 + (season_demand_milk_250ml[2].season_demand * 250 + season_demand_milk_home[2].season_demand * 1000) * 0.2 + (season_demand_milk_250ml[3].season_demand * 250 + season_demand_milk_home[3].season_demand * 1000) * 0.1
    return Math.round(milkOrderAmount);
}

//Calculate milk order date
function calculate_milkOrderDate(expiration_date_milk, lead_time_milk) {
    var orderDate = new Date(expiration_date_milk);
    orderDate.setDate(orderDate.getDate() - lead_time_milk);

    return orderDate.getFullYear() + '/' + orderDate.getMonth() + 1 + '/' + orderDate.getDate();
}

//Calculate bottle order date
function calculate_bottleOrderDate(demandRate_bottle_home, lead_time_bottle_home, stocksupport_bottle_home) {
    var stockSupportDays = stocksupport_bottle_home / demandRate_bottle_home;
    var bottleOrderDate = new Date();
    bottleOrderDate.setDate(bottleOrderDate.getDate() + (stockSupportDays - lead_time_bottle_home));

    return bottleOrderDate.getFullYear() + '/' + bottleOrderDate.getMonth() + 1 + '/' + bottleOrderDate.getDate();
}