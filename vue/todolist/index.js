let list = new Vue({
    el: '#todolist',
    data: {
        title: 'todolist',
        content: [{
            name: '手机',
            price: 1120,
            isSelected: false,
            isShow: true,
        }, {
            name: 'iphone',
            price: 8888,
            isSelected: false,
            isShow: true,
        }, {
            name: '电脑',
            price: 3510,
            isSelected: false,
            isShow: true,
        }, {
            name: '衣服',
            price: 370,
            isSelected: false,
            isShow: true,
        }, {
            name: '包',
            price: 267,
            isSelected: false,
            isShow: true,
        }],
        shoppingName: '',
        shoppingPrice: '',
        search: '',
        size: 70,
        deleteShopping: [],
        spanStyle: {
            height: '50px',
            lineHeight: '50px',
            verticalAlign: 'middle',
        },
        priceStyle: {
            float: 'right',
        },
    },
    computed: {
        sum() {
            let sum = 0;
            this.content.forEach(elem => {
                sum += elem.isSelected ? elem.price : 0;
            });
            return sum;
        },
    },
    methods: {
        addShopping() {
            // 添加新的Shopping
            this.content.push({
                name: this.shoppingName,
                price: this.shoppingPrice,
                isSelected: false,
                isShow: true,
            });
            this.shoppingName = '';
            this.shoppingPrice = '';
        },
        searchShopping() {
            this.content.forEach((element, index) => {
                if (element.name.includes(this.search)) {
                    this.content[index].isShow = true;
                } else {
                    this.content[index].isShow = false;
                }
            });
        },
        clickLi(index) {
            // 如果this.content[index].isSelected是true表示已选中
            this.content[index].isSelected = !this.content[index].isSelected;
            // return false;
        },
        delectShoppings(index) {
            this.content.splice(index, 1);
        },
        deleteSelect() {
            this.deleteShopping.forEach(index => {
                this.delectShoppings(index);
            });
            this.deleteShopping = [];
        },
    },
});