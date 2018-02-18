'use strict';
let Sau = {
    /**
     * Получение одного или нескольких рандомных элементов из массива
     * @param arr Массив из которого выбирать элементы
     * @param count Кол-во элементов
     * @returns {Array}
     */
    randArrItems: function (arr, count = 1) {
        let val = [];
        for (let i = 0; count <= i; i++) {
            val.push(arr[_.random(arr.length, 0)]);
        }
        return val;
    },
};
export default Sau;