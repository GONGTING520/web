let a = 5;
let oDiv1 = document.querySelector('#div1');
oDiv1.innerHTML = 'hello world!';

class People {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    static show() {
        console.log(111111);
    }
}
let p = new People('zs', 18);
console.log(p);
People.show();