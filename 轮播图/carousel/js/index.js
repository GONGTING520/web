//入口文件
require(['carousel'], function (Carousel) {
    var settings1 = {
        imgArr: ['../img/slideshow1.jpg', '../img/slideshow2.jpg', '../img/slideshow3.jpg', '../img/slideshow4.jpg', '../img/slideshow5.jpg', '../img/slideshow6.jpg', '../img/slideshow7.jpg'],
        imgWidth: 1226,
        imgHeight: 460,
        speed: 1500,
        buttonStyle: 'circle',
        circleWidth: 12,
        circleHeight: 12,
        selector: '#div1'
    };
    var c1 = new Carousel();
    c1.init(settings1);

    var settings2 = {
        imgArr: ['../img/slideshow2.jpg', '../img/slideshow3.jpg', '../img/slideshow4.jpg'],
        imgWidth: 1226,
        imgHeight: 460,
        speed: 500,
        buttonStyle: 'square',
        selector: '#div2'
    };
    var c2 = new Carousel();
    c2.init(settings2);
});