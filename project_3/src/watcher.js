
// 依赖
export default class Watcher {
    constructor (vm, expOrFn, cb) {
        this.vm = vm;
        this.deps = []
        this.depIds = new Set()
        // expOrFn参数支持函数
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = parsePath(expOrFn);
        }
        this.cb = cb;
        this.value = this.get();
    }

    teardown () {
        let i = this.deps.length;
        while (i--) {
            this.deps[i].removeSub(this);
        }
    }

    addDep (dep) {
        const id = dep.id;
        if (!this.depIds.has(id)) {
            this.depIds.add(id);
            this.deps.push(dep);
            dep.addSub(this);
        }
    }

    get () {
        window.target = this;
        // 获取对象的值，自动触发defineReactive的get方法，此时会把依赖收集起来
        let value = this.getter.call(this.vm, this.vm); 
        window.target = undefined;
        return value;
    }

    update() {
        const oldValue = this.value;
        this.value = this.get();
        this.cb.call(this.vm, this.value, oldValue);
    }
}

// 不断递归获取子属性的值，自动触发defineReactive的get方法，收集依赖
function getFieldValue (obj) {
    if (typeof obj === 'object') {
        for (let key in obj) {
            let filedValue = obj[key];
            if (typeof filedValue === 'object') {
                getFieldValue(filedValue);
            }
        }
    }
    return;
}

const bailRE = /[^\w.$]/;
export function parsePath(path) {
    if (bailRE.test(path)) {
        return;
    }

    const seqments = path.split('.');
    return function (obj) {
        for (let i = 0; i < seqments.length; i++) {
            if (!obj) return;
            obj = obj[seqments[i]]; // 通过循环对象的属性值，获取对象的值
            getFieldValue(obj);
        }
        return obj;
    }
}