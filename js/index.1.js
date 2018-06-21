//1.获取要操作的元素
var data = null;
var header = document.getElementById("header");
var btnList = header.getElementsByTagName("a");
var shopList = document.getElementById("shopList");
//2.通过AJAX获取要操作的数据
var xhr = new XMLHttpRequest();
//打开一个请求链接（请求方式，请求地址，同步异步）
xhr.open("get","data/product.json",false);
//监听xhr的准备状态,当状态码变成200的时候，准备状态变成4【准备结束的时候】证明成功，
xhr.onreadystatechange=function () {
    if(xhr.status==200 && xhr.readyState==4){
        data = JSON.parse(xhr.responseText)
    }
};
//发送ajax请求，参数没有
xhr.send();
console.log(data);
//将数据绑定到页面当中
function bindHtml() {
    var str = "";
    data.forEach(item=>{
        str+=` <li>
            <img src="${item.img}" alt="">
            <p>${item.title}</p>
            <p class="hot">热度:${item.hot}</p>
            <del>$9999</del>
            <span>${item.price}</span>
            <p class="time">上架时间：${item.time}</p>
        </li>`
    });
    shopList.innerHTML = str
}
bindHtml();
//4.绑定点击事件，实现sort排序
for (var i = 0; i < btnList.length; i++) {
    btnList[i].flg=-1;
    btnList[i].onclick = function () {
        var value=this.getAttribute('attrName');
        this.flg *= -1;
        sortAll.call(this,value);//点击事件的元素
    }
}
// 封装一个function
function sortAll(value) {
    if(value=='time') {
        data.sort((a, b)=> {
            return (new Date(a[value]) - new Date(b[value])) * this.flg//this->sortAll
        });
    }else {
        data.sort((a, b)=> {
            return ((a[value]) - (b[value])) * this.flg
        });
    }
    bindHtml();
}
for (var i = 0; i < btnList.length; i++) {
    btnList[i].flg=-1;
    btnList[i].onclick = function () {
        var value=this.getAttribute('attrName');
        this.flg *= -1;
        sortAll.call(this,value);//点击事件的元素
    }
}
// 封装一个function
function sortAll(value) {
    data.sort((a, b)=> {
        return (value=='time'?(new Date(a[value]) - new Date(b[value])): ((a[value]) - (b[value])))* this.flg
    });
    bindHtml()
}
