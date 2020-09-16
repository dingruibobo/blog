//  防抖 节流
// 防抖 在事件被触发n秒后再执行回调函数，如果在这n秒内又被触发，则重新计时
// 节流 规定时间内操作 只执行最后一次操作的

// 防抖：将几次操作合并为一次操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，
// 就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。
// 节流：使得一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数。

// 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触
// 发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页
// 面操作时才去请求数据。这样的场景，就适合用节流技术来实现。


function ajax() {
	console.log("我是 ajax")
}
function debounce(cb, delay) {
    let timer = null;
    return function(args) {
		let that = this;   // 获得函数的作用域
        clearTimeout(timer);  // 每次事件被触发，都会清除当前的timeer，然后重写设置超时调用
		timer = setTimeout(function(){
			cb.apply(that, args);
		}, delay)
    }
}

// 测试，模拟一个在 2100毫秒内每隔半秒就重复触发的事件
var rsu = debounce(ajax, 1000,);
let itv = setInterval(()=> {
	rsu(888)
}, 500)
setTimeout(()=> {
	clearInterval(itv)
}, 2100)

function ajax(content) {
    console.log('ajax request ' + content)
}
function debounce(fun, delay) {
    let time = null;
    return function(args) {
        //获取函数的作用域和变量
        let that = this
        let _args = args
        //每次事件被触发，都会清除当前的timer，然后重写设置超时调用
        clearTimeout(time)
        console.log(11, time)
        time = setTimeout(function() {
            fun.call(that, _args)
        }, delay)
    }
}

let ff = debounce(ajax, 1000)
let timer = setInterval(()=> {
    ff(33)
}, 500)
setTimeout(()=>{
    clearTimeout(timer)
}, 2100)