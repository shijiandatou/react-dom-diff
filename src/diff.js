function diff(oldTree,newTree) {
    let patches = {};
    let index = 0;
   // debugger;
    walk(oldTree,newTree,index,patches);
    return patches;
};
function diffAttr(oldAttrs,newAttrs) {
    let patch = {};
    debugger;
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
const ATTRS = 'ATTRS';
function walk(oldNode,newNode,index,patches) {
    let  currentPatch = [];//每个元素都有一个补丁对象
    if(oldNode.type === newNode.type){
        let attrs =  diffAttr(oldNode.props,newNode.props);
        // console.log('atts',attrs);
        if(Object.keys(attrs).length>0){
            currentPatch.push({type:ATTRS,attrs})
        }
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