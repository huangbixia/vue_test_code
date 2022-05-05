/*
 * @Description: 说明
 * @Author: huangbx
 * @Date: 2022-02-28 22:03:15
 */
let uid = 0;

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
        this.id = uid++;
        this.subs = [];
    }
    // 收集依赖
    addSub(sub) {
        this.subs.push(sub);
    }
    // 移除依赖
    removeSub(sub) {
        const index = this.subs.indexOf(sub);
        if (index > -1) {
            return this.subs.splice(index, 1);
        }
    }

    // 发起收集依赖
    depend() {
        if (window.target) {
            // this.addSub(window.target);
            window.target.addDep(this);
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