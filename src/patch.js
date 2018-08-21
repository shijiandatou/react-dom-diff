import { render,Element } from "./element";

let allPathes;
//默认那个需要打补丁
let index = 0;
function patch(node,patches) {
    console.log('node',node);
    
    allPathes = patches;
    
    //给某个元素打补丁
    walk(node);
};
function walk(node) {
    let currentPatch = allPathes[index++];
    let childNodes = node.childNodes;
    //深度先序
    childNodes.forEach(child => {
        walk(child);
    });
    if(currentPatch){
       doPatch(node,currentPatch);
    }
}
function doPatch(node,patches) {
    patches.forEach(patch=>{
        switch (patch.type) {
            case "ATTRS":
                for (const key in patch.attrs) {
                   let value = patch.attrs[key];
                   if(value){
                       setAttr(node,key,value)
                   }else{
                       node.removeAttribute(key);
                   }
                }
                break;
            case "TEXT":
                node.textContent = patch.text
            break;
            case "REPLACE":
                let newNode = (patch.newNode instanceof Element)?render(patch.newNode):document.createTextNode(patch.newNode);
                node.parentNode.replaceChild(newNode,node);
                break;
            case "REMOVE":
                node.parentNode.removeChild(node);
            break;
            default:
                break;
        }
    })
}

function setAttr(node,key,value) {
    switch (key) {
        case 'value': //node you可能是input 或者是textarea
            if(node.tagName.toUpperCase()==='INPUT'|| node.tagName.toUpperCase()==='TEXTAREA'){
                node.value = value;
            }else{
                node.setAttribute(key,value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key,value);
            break;
    }
}
export default patch;