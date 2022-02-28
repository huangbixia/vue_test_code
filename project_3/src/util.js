// 工具
function def (obj, key, val, enumerable) {
    // 组数据的 __ob__属性拿到Observer实例，然后就可以拿到 __ob__上的dep
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}

export default {
    def
}