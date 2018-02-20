'use strict';
module.exports = {
    /**
     * Получение одного или нескольких рандомных элементов из массива
     * @param arr Массив из которого выбирать элементы
     * @param count Кол-во элементов
     * @returns {Array}
     */
    randArrItems: function (arr, count = 1) {
        let val = [];
        let exp = [];
        for (let i = 0; count > i; i++) {
            let current = _.random(1, arr.length)-1;//потому что массив идёт с 0
            if (!_.find(exp, current)) {
                val.push(arr[current]);
                exp.push(current);
            }
        }
        return val;
    },
    /**
     * Построение строки имени
     * @param arr
     */
    implodeName: function (arr) {
        let string = '';
        $.each(arr, function (index, value) {
            string += value.text;
        })
    }

};