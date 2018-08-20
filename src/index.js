import { createElement,render,renderDom} from "./element";
import diff from './diff';

let vertualDom1 = createElement('ul',{class:'top'},[
    createElement('li',{class:'item'},['a']),
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['c'])
]);
let vertualDom2 = createElement('ul',{class:'top2'},[
    createElement('li',{class:'item'},['1']),
    createElement('li',{class:'item'},['b']),
    createElement('li',{class:'item'},['3'])
]);
// let el = render(vertualDom);
// renderDom(el,window.root);
// console.log('我成功了吗',el);
// console.log('haha',vertualDom);
//DOM Diff 比较两个虚拟DON区别 比较两个对象的区别
//dom diff作用 根据两个虚拟对象创建出补丁，描述改变的内容
//将这个补丁用来更新dom
let patchs = diff(vertualDom1,vertualDom2);
console.log('patchs',patchs);