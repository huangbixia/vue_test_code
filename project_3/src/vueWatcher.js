/*
 * @Description: 说明
 * @Author: huangbx
 * @Date: 2022-04-28 21:50:55
 */
import Dep from "./Dep";
import Watcher from "./watcher";

Vue.prototype.$watch = function (expOrFn, cb, options) {
    const vm = this;
    options = options || {};
    const watcher = new Watcher(vm, expOrFn, options);
    if (options.immediate) {
        cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
        watcher.teardown()
    }
}

Vue.prototype.$set = function (target, key, val) {

    // 数组处理
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        return val;
    }

    // 对象处理--存在的key
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val;
    }

    // 对象处理--不存在的key，新增对象属性
    const ob = target.__ob__;
    // 处理文档中所说的“target不能是Vue.js实例或Vue.js实例的根数据对象”的情况
    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Advoid adding reative properties to a Vue instance or its root $data at runtime - decalre it upfront in the data option.')
        return val;
    }

    if (!ob) {
        target[key] = val;
        return val;
    }
    
    defineReactive(ob.value, key, val);
    ob.dep.notify();
    return val
}

Vue.prototype.$delete = function (target, key) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        // 使用了splice方法，拦截器会自动像依赖发送依赖
        target.splice(key, 1);
        return;
    }
    const ob = target.__ob__;

    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Advoid adding reative properties to a Vue instance or its root $data at runtime - decalre it upfront in the data option.')
        return val;
    }

    // 如果key不是target自身的属性，则终止程序继续执行
    if (!hasOwn(target, key)) {
        return;
    }
    delete target[key];

    // 如果ob不存在，即该对象不是响应式的，则直接终止程序
    ob.dep.notify();
}