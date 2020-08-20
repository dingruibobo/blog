// bind()方法主要就是将函数绑定到某个对象，bind()会创建一个函数，函数体内的this对象的值会被绑定到传入bind()第一个参数的值，
// 例如，f.bind(obj)，实际上可以理解为obj.f()，这时，f函数体内的this自然指向的是obj

Function.prototype.myBind = function(context) {
    const self = this;
    let args = [...arguments].slice(1);   // args: [7, 8]
	
    return function() {
        // 考虑函数柯里化的情况
        let newArgs = [...arguments];     //newArgs: [9]
        return self.apply(context, newArgs.concat(args))
    }
}

//my_bind方法不仅可以绑定对象，还可以传参, 还要注意函数柯里化的情况
// Function.prototype.my_bind = function(context){
//     var args = Array.prototype.slice.call(arguments, 1);
//     //args [7, 8]
//     var self = this;
	
//     return function(){
//         var innerArgs = Array.prototype.slice.call(arguments);
//         //innerArgs [9]
//         var finalArgs = args.concat(innerArgs);
//         //finalArgs [7, 8, 9]
//         return self.apply(context, finalArgs);
//     }
// }
 
//测试
function a(m, n, o){
    return this.name + ' ' + m + ' ' + n + ' ' + o;
}
var b = {name : 'kong'};
console.log(a.myBind(b, 7, 8)(9)); 