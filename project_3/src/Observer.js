import Dep from "./dep";
import arrayMethods from './arrayMethods';
import { def } from './util';
/**
 * 尝试为value创建一个Observe实例
 * 如果创建成功，直接返回新创建的Observe实例
 * 如果value已经存在一个Observe实例，则直接返回它
 */
export function observe (value, asRootData) {
    if (!isObject(value)) {
        return;
    }
    let ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
    } else {
        ob = new Observer(value);
    }
    return ob;
}

/*
 * 1、Array在getter中收集依赖，在拦截器中触发依赖
*/

function defineReactive (data, key, val) {
    
    if (typeof val === 'object') {
        new Observer(val);
    }
    let childOb = observe(val);
    let dep = new Dep();

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.depend();
            // 这里收集Array的依赖
            if (childOb) {
                childOb.dep.depend()
            }
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

// 检查 __proto是否可用
const hasProto = '__proto__' in {};
const arrayKes = Object.getOwnPropertyNames(arrayMethods);

// 直接覆盖原型
function protoAugment (target, src, keys) {
    target.__proto__ = src;
}

// 在数组挂在方法
function copyAugment (target, src, keys) {
    // 因为当访问一个对象的方法时，只有其自身不存在这个方法，才会去它的原型上找这个方法。
    for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        defineReactive(target, key, src[key]);
    }
}

export default class Observer {
    constructor (value) {
        this.value = value;
        this.dep = new Dep();
        // 所有被侦测了变化的数据身上都会有一个 __ob__属性来表示它们是响应式的
        def(value, '__ob__', this);
        if (Array.isArray(value)) {
            const augment = hasProto ? protoAugment : copyAugment;
            augment(value, arrayMethods, arrayKes);
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
