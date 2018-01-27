let list = new Vue({
    el: '#todolist',
    data: {
        title: 'todolist',
        content: [{
            name: '手机',
            price: 1120,
            isSelected: false,
            isShow: true,
            isShowTable: {
                name: false,
                price: false,
            },
        }, {
            name: 'iphone',
            price: 8888,
            isSelected: false,
            isShow: true,
            isShowTable: {
                name: false,
                price: false,
            },
        }, {
            name: '电脑',
            price: 3510,
            isSelected: false,
            isShow: true,
            isShowTable: {
                name: false,
                price: false,
            },
        }, {
            name: '衣服',
            price: 370,
            isSelected: false,
            isShow: true,
            isShowTable: {
                name: false,
                price: false,
            },
        }, {
            name: '包',
            price: 267,
            isSelected: false,
            isShow: true,
            isShowTable: {
                name: false,
                price: false,
            },
        }],
        shoppingName: '',
        shoppingPrice: '',
        search: '',
        deleteShopping: [],
        isSelectAll: false,
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
            this.shoppingNameError = false;
            this.shoppingPriceError = false;
            // 添加新的Shopping
            this.content.push({
                name: this.shoppingName,
                price: this.shoppingPrice,
                isSelected: false,
                isShow: true,
                isShowTable: {
                    name: false,
                    price: false,
                },
            });
            this.shoppingName = '';
            this.shoppingPrice = '';
        },
        searchShopping() {
            this.content.forEach((element, index) => {
                if (element.name.includes(this.search) || element.price.toString().includes(this.search)) {
                    element.isShow = true;
                } else {
                    element.isShow = false;
                }
            });
        },
        selectProduct(product) {
            // 如果product.isSelected是true表示已选中
            product.isSelected = !product.isSelected;
        },
        delectShoppings(index) {
            // 删除index后面的1个
            this.content.splice(index, 1);
        },
        deleteSelect() {
            // 如果删除数组中不包含
            this.content = this.content.filter((item, index) => {
                if (!this.deleteShopping.includes(index)) {
                    return item;
                }
            });
            this.deleteShopping = [];
            this.isSelectAll = false;
            this.isSelectReverse = false;
        },
        selectAll() {
            // 如果已经全选，则应全不选
            if (this.isSelectAll) {
                this.deleteShopping = [];
            } else {
                for (let index of this.content.keys()) {
                    this.deleteShopping.push(index);
                }
            }
            this.isSelectAll = !this.isSelectAll;
        },
        selectReverse() {
            let reverserArr = [];
            this.content.forEach((elem, index) => {
                // 如果要删除的索引数组中不包含index，则添加到reverserArr中
                if (!this.deleteShopping.includes(index)) {
                    reverserArr.push(index);
                }
            });
            this.deleteShopping = reverserArr;
        },
        edio(elem, strPro) {
            // 切换input和span的显示
            elem.isShowTable[strPro] = !elem.isShowTable[strPro];
        },
        hideTable() {
            // 让所有的input和span都不显示
            for (let [index, val] of this.content.entries()) {
                val.isShowTable.name = false;
                val.isShowTable.price = false;
            }
        }
    },
});