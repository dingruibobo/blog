// 由于js 是单线程的，所以当遇到 setTimeout, ajax, 请求图片等的时候要等到这些请求回才能往下执行，这样让用户等待显然是不合理的，
// 所以在浏览器中会吧这些操作交给浏览器去执行，浏览器有很多线程，遇到 setTimeout 等交给定时器触发线程去执行，遇到请求交给 http 线程去执行...等等

// 执行同步代码 => 执行微任务 => 执行宏任务1 => 执行微任务
// 宏：setTimeout UI交互事件，网络请求    微：promise.then process.nextTick
console.log(1);
setTimeout(() => {
  console.log(2);
  Promise.resolve().then(data => {
    console.log(3);
  });
});
new Promise((resolve) => {
  resolve()
  console.log(4)
}).then(() => {
  console.log(5);
  setTimeout(() => {
    console.log(6);
  });
}).then(() => console.log(7))
console.log(8);
// 1 4 8 => 5 7 => 2 6 => 3
// 宏：4 / 15 
// 微：13 18 / 6 


/* console.log('1');
setTimeout(function() {       
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})
setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
}) */
// 1 7 => 6 8 => 2 4 9 11 => 3 5 10 12
// 宏  4 25
// 微  16 22 / 6 12 27 33/

