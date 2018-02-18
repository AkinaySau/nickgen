'use strict';

let sau = {
    /**
     * Разрешение на ввод только цифр
     * @param selector
     */
    numbers: function (selector) {
        $(selector).bind("change keyup input click", function () {
            if (this.value.match(/[^0-9]/g)) {
                this.value = this.value.replace(/[^0-9]/g, '');
            }
        });

    }
};
// module.export = sauFilterInput;