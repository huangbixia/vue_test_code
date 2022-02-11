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

window.testName = '';
defineReactive(window, 'testName', 'Tom')
new Watcher(window, 'testName', function (oldVal, newVal) {
    console.log('===================>oldVal, newVal', oldVal, newVal)
})
