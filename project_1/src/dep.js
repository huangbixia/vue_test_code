function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1);
        }
    }
}

export default class Dep {
    constructor() {
        this.subs = [];
    }
    // 收集依赖
    addSub(sub) {
        this.subs.push(sub);
    }
    // 移除依赖
    removeSub(sub) {
        remove(this.subs, sub);
    }

    // 发起收集依赖
    depend() {
        if (window.target) {
            this.addSub(window.target);
        }
    }

    // 触发依赖
    notify() {
        const subs = this.subs.slice();
        for (let i =0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }
}