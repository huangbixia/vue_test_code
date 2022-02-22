import Dep from "./dep";
import arrayMethods from './arrayMethods';

function defineReactive (data, key, val) {
    if (typeof val === 'object') {
        new Observer(val);
    }

    let dep = new Dep();

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.depend();
            return val;
        },
        set: function (newVal) {
            if (val === newVal) {
                return
            }
            val = newVal;
            dep.notify();
        }
    })
}


export default class Observer {
    constructor (value) {
        this.value = value;
        if (Array.isArray(value)) {
            // 覆盖value的原型
            value.__proto__ = arrayMethods;
        } else {
            this.walk(value);
        }
    }

    /*
     * walk 会将每一个属性都转换成getter/setter的形式来侦测变化
     * 这个方法只有在数据类型为Object时被调用
     */
    walk (obj) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]]);
        }
    }
}
