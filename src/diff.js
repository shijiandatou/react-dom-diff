const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE ='REMOVE';
const REPLACE = 'REPLACE';

let Index = 0;
function diff(oldTree,newTree) {
    let patches = {};
    let index = 0;
   // debugger;
    walk(oldTree,newTree,index,patches);
    return patches;
};
function diffAttr(oldAttrs,newAttrs) {
    let patch = {};
   // debugger;
    //判断老的属性和新的属性的关系
    for (const key in oldAttrs) {
        if(oldAttrs[key]!==newAttrs[key]){
            patch[key] = newAttrs[key]; //有可能是undefined
        }
    }
    for (const key in newAttrs) {
        //老节点没有新节点的属性
        if (!oldAttrs.hasOwnProperty(key)) {
           patch[key] = newAttrs[key];
        }
    }
    return patch;
}

function diffChildren(oldChildren,newChildren,patches) {
    //比较老的第一个 和 新的第一个
    oldChildren.forEach((child,idx) => {
        //索引不应该是index
        //index 每次传递给walk时  index是递增的
        walk(child,newChildren[idx],++Index,patches);
    });
}
function isString(params) {
    return Object.prototype.toString.call(params) === '[object String]';
}
function walk(oldNode,newNode,index,patches) {
    let  currentPatch = [];//每个元素都有一个补丁对象
    if(!newNode){
        currentPatch.push({type:REMOVE,index});
    }else if(isString(oldNode)&&isString(newNode)){
        if(oldNode!==newNode){ //判断文本是否一致
            currentPatch.push({
                type:TEXT,
                text:newNode
            })
        }
    }else if(oldNode.type === newNode.type){
        //比较属性是否一致
        let attrs =  diffAttr(oldNode.props,newNode.props);
        // console.log('atts',attrs);
        if(Object.keys(attrs).length>0){
            currentPatch.push({type:ATTRS,attrs})
        }
        //如果有儿子节点 应该便利儿子节点
        diffChildren(oldNode.children,newNode.children,patches);
    }else{
        //说明节点被替换了
        currentPatch.push({type:REPLACE,newNode});
    } 
    if(currentPatch.length>0){//当前元素确实有补丁
        //将元素和补丁对应起来，放到大补丁包中
        patches[index] = currentPatch;
        console.log('我成功了',patches);
        
    }
   
}
//规则 当节点类型相同时，去看一下属性是否相同 产生一个属性的补丁包
//{type:'ATTRS',attrs:{class:"list-group"}}
//新的dom节点不存在 {type:'REMOVE',index:xxx};
//节点类型不相同 直接采用替换模式 {teyp:"REPLACE",newNode:newNode}
//文本的变化{type:'TEXT',text:1}

export default diff;