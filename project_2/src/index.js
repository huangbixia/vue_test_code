import Watcher from "./watcher.js";
import Observer from "./Observer.js";

window.testObj = {
    a: '1',
    b: '2'
}
new Observer(window.testObj);

new Watcher(window, 'testObj', function (oldVal, newVal) {
    // 如果是对象，不能捕获对象的旧值
    console.log('===================>oldVal, newVal', oldVal, newVal)
})

new Watcher(window.testObj, 'a', function (oldVal, newVal) {
    // 如果是原始值，可以捕获旧值
    console.log('===================>oldVal, newVal', oldVal, newVal)
})

