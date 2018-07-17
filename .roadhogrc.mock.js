
const lists = {
    "item": [
        {
            "uuid": "3a9f8f5912ab493bb26915e63308c6db",
            "name": "陈坤",
            "mobile": "13800000002",
            "sale_amount_finish_percent_total": "0.00",
            "area_list": [
                {
                    "detail_area_uuid": "991e4c75d612451784b4703aa6106ef9",
                    "name": "足丰熟料",
                    "sale_amount_budget": "0.00",
                    "no_tax_sale_price_budget": "0.00",
                    "sale_budget_proportion": "0.0000",
                    "sale_amount_actual": "0.00",
                    "no_tax_sale_price_actual": "0.00",
                    "sale_amount_finish_percent": "0.00"
                },
                {
                    "detail_area_uuid": "b666f3adace540be8e36d207b9fbd4ff",
                    "name": "龙团",
                    "sale_amount_budget": "0.00",
                    "no_tax_sale_price_budget": "0.00",
                    "sale_budget_proportion": "0.0000",
                    "sale_amount_actual": "0.00",
                    "no_tax_sale_price_actual": "0.00",
                    "sale_amount_finish_percent": "0.00"
                }
            ]
        }, {
            "uuid": "931739710bb84f26b3564a3ca0d3b95d",
            "name": "夏雨",
            "mobile": "13800000001",
            "sale_amount_finish_percent_total": "0.00",
            "area_list": [
                {
                    "detail_area_uuid": "991e4c75d612451784b4703aa6106ef9",
                    "name": "足丰熟料",
                    "sale_amount_budget": "0.00",
                    "no_tax_sale_price_budget": "0.00",
                    "sale_budget_proportion": "0.0000",
                    "sale_amount_actual": "0.00",
                    "no_tax_sale_price_actual": "0.00",
                    "sale_amount_finish_percent": "0.00"
                }
            ]
        }
    ]
}


export default {
    'GET /lists': lists,
    'POST /dogs': (req,res) => {res.end('OK')}
};


// const mock = {}
// require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function(file) {
//     Object.assign(mock, require('./mock/' + file))
// })
// module.exports = mock