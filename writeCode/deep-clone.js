// deepClone
// JSON的序列化和反序列化，但是这种方法的弊病有两个：
// 1、undefined、null和symbol类型的值会被删除
// 2、碰见循环引用的时候会报错。

// 循环引用解决方案：可以使用一个WeakMap结构存储已经被拷贝的对象，每一次进行拷贝的时候就先向
// WeakMap查询该对象是否已经被拷贝，如果已经被拷贝则取出该对象并返回.


function isObj(obj) {
    return (typeof obj === 'object' || typeof obj === 'function') && obj !== null
}

function deepCopy(obj, hash = new WeakMap()) {
    if(hash.has(obj)) return hash.get(obj)
    let cloneObj = Array.isArray(obj) ? [] : {}
    hash.set(obj, cloneObj)
    for (let key in obj) {
        cloneObj[key] = isObj(obj[key]) ? deepCopy(obj[key], hash) : obj[key];
    }
    return cloneObj
}

function deepCopy(obj) {
    let tempObj = Array.isArray(obj) ? [] : {}
    for(let key in obj) {
        tempObj[key] = isObj(obj[key]) ? deepCopy(obj[key]) : obj[key]
    }
    return tempObj
}

let o1 = {
	a: 1,
	b: null,
	c: undefined,
	d: "hello",
	e: [111,222,333,444],
	f: true,
	s: Symbol('ww'),
}
o1.oo = o1
let o2 = deepCopy(o1)
console.log(o2)
