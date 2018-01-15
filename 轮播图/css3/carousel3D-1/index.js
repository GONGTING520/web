var oContainer = document.getElementById('container');
oContainer.iNum = 7;//图片数量
oContainer.iRot = 360 / oContainer.iNum;
oContainer.iNow = oContainer.iNum - 1;
oContainer.iNowRot = 0;
var iCount = 0;

for (var i = 0; i < oContainer.iNum; i++){
    var oImg = new Image();
    oImg.onload = function () {
        iCount++;
        if(iCount == oContainer.iNum) {
            show();
        }
    };
    oImg.src = '../../img/slideshow' + ( i + 1 ) + '.jpg';
    oContainer.appendChild(oImg);
}

function show() {
    var aImg = oContainer.getElementsByTagName('img');
    for (var i = 0; i < aImg.length; i++) {
        aImg[i].index = i;
        aImg[i].style.transitionDelay = i * 100 + 'ms';
        aImg[i].style.transform = 'rotateY(' + ( i + 1 ) * oContainer.iRot + 'deg) translateZ(360px)';
    }
}

oContainer.onclick = function (e) {
    var oTarget = e.target;
    if (oTarget != e.currentTarget){
        console.log(oContainer.iNowRot);
        if (oTarget.index == oContainer.iNum - 1 && oContainer.iNow == 0){
            oContainer.iNowRot += oContainer.iRot;
        }else if (oTarget.index == 0 && oContainer.iNow == oContainer.iNum - 1){
            oContainer.iNowRot -= oContainer.iRot;
        }else {
            if (oTarget.index < oContainer.iNow){
                oContainer.iNowRot += oContainer.iRot;
            }else if (oTarget.index > oContainer.iNow){
                oContainer.iNowRot -= oContainer.iRot;
            }
        }
        console.log(oContainer.iNowRot);
        oContainer.iNow = oTarget.index;
        oContainer.style.transform = 'translate(-50%, -50%) rotateY(' + oContainer.iNowRot + 'deg)';
    }
};