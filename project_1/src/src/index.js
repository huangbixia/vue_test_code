import Watcher from "./watcher.js";
import Dep from "./dep.js";

function defineReactive (data, key, val) {
    let dep = new Dep();
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            dep.depend();
            return val;
        },
        set: function(newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            dep.notify();
        }
    })
}

function Vue (option) {
    this.data = option.data
    console.log(this)
    defineReactive(this.data, 'title', 'users')
    new Watcher(this, 'data.title', function (oldVal, newVal) {
        console.log('===================>oldVal, newVal', oldVal, newVal)
    })
    this.data.title = 'phoebe';
}

const vue = new Vue({
    data: {
      title: 'users'
    }
})

