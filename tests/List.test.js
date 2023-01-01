"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a;
var _this = this;
exports.__esModule = true;
var List_1 = require("../data_structures/List");
var globals_1 = require("@jest/globals");
var num = function (value) { return ({ value: value, compareTo: function (x) {
        if (_this.value > x)
            return 1;
        else if (_this.value < x)
            return -1;
        return 0;
    } }); };
var l = new List_1.List();
l.addBack(num(0));
l.addBack(num(1));
l.addBack(num(2));
l.addBack(num(3));
l.addBack(num(4));
l.addBack(num(5));
l.addBack(num(6));
l.addBack(num(7));
l.addBack(num(8));
l.addBack(num(9));
console.log(l);
var result = "";
try {
    for (var l_1 = __values(l), l_1_1 = l_1.next(); !l_1_1.done; l_1_1 = l_1.next()) {
        var n = l_1_1.value;
        console.log(n);
        result += n.value;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (l_1_1 && !l_1_1.done && (_a = l_1["return"])) _a.call(l_1);
    }
    finally { if (e_1) throw e_1.error; }
}
(0, globals_1.describe)('List Tests', function () {
    (0, globals_1.test)('Check the iterability of the list class', function () {
        (0, globals_1.expect)(result).toBe('0123456789');
    });
});
