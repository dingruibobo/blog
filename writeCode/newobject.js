// 大体可以分为3步
// 创建一个新的对象
// 将新对象的的 __proto__ 指向 构造函数的 prototype 对象
// 执行构造函数，并将 this 指向新的对象

function myNew(fn, ...args) {
	if(typeof fn !== 'function') {
		throw fn + 'is not a constructor'
	}
	
	// let obj = {};
	// obj.__proto__ = fn.prototype;
	let obj = Object.create(null)   // 我们可以使用 ES5 的 Object.create() 来代替上面两行代码
	let res = fn.apply(obj, args);
	return res instanceof Object ? res : obj;  // return 的时候需要对返回的东西进行判断，若是对象则返回，如果不是对象，则返回新创建的对象。
}

function Person(name, age) {
	this.name = name;
	this.age = age
}

console.log(myNew(Person, "dingding", 100))
