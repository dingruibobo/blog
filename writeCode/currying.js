// 实现 sum(11, 22, 33) => sum(11, 22)(33)() = 66 的效果
// 注意两点
// 传入参数时，不执行，而是先记忆起来，延迟计算，什么时候想要计算，直接 sum() 就行

var currying = function (fn) {
    var args = []
    return function() {
        if(arguments.length === 0) {
            return fn.apply(this, args)
        }
		// [].slice.call(arguments) 将函数的实际参数转化成数组
        Array.prototype.push.apply(args, [].slice.call(arguments))
		// arguments.callee 返回当前匿名函数
		// rguments 的主要用途是保存函数参数， 但这个对象还有一个名叫 callee 的属性，
		// 返回正被执行的 Function 对象，也就是所指定的 Function 对象的正文，这有利于匿名函数的递归或者保证函数的封装性
        return arguments.callee
    }
}
var tempFun = function() {
    var sum = 0; 
    for(var i = 0; i < arguments.length; i++) {
        sum += arguments[i]
    }
    return sum
}
var sum = currying(tempFun);
sum(11,22)
sum(33)
sum()
/* console.log(sum(11,22))
console.log(sum(333))
console.log(sum())
 */