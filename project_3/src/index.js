/*
 * @Description: 说明
 * @Author: huangbx
 * @Date: 2022-02-22 21:53:53
 */
import Watcher from "./watcher";
import Observer from "./Observer.js";

window.testArray = ['a', 'b', 1];

new Observer(window.testArray);

new Watcher(window, 'testArray', function (oldVal, newVal) {
    // 如果是对象，不能捕获对象的旧值
    console.log('===================>oldVal, newVal', oldVal, newVal)
})

