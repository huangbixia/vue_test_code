import { def } from './util';

const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach(function (method) {
    // 缓存原始方法
    const original = arrayProto[method];
    def(arrayMethods, method,  function mutator (...args) {
        const result = original.apply(this, args);
        const ob = this.__ob__;
        ob.dep.notify(); // 向依赖发送消息
        return result;
    })
})