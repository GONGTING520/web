var oProDetail = document.getElementById('pro-detail');
var aLis = oProDetail.getElementsByTagName('li');
var oSort = document.getElementById('num-sort');
var oSum = oProDetail.getElementsByTagName('li')[aLis.length-1];
var oPrice = oSum.getElementsByTagName('span')[1];
var oCart = document.getElementById('cart');
for(var i =0;i<aLis.length;i++){
    if(aLis[i].className == 'taste'){
        var aTastes = aLis[i].getElementsByTagName('li');
        var oSize = aLis[i].getElementsByTagName('span')[1];
        for(var i = 0;i<aTastes.length;i++){
            aTastes[i].onclick = function () {
                for(var j=0;j<aTastes.length;j++){
                    aTastes[j].className ='';
                }
                this.className = 'selected';
                oSize.innerHTML=this.innerHTML;
            }
        }
    }
    if(aLis[i].className == 'num-change'){
        oSort.onclick=function () {
            oPrice.innerHTML = 200 * this.value;
        }
    }
}

oCart.onclick = function () {
    alert('added');
};