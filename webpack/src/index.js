import _ from 'lodash';
import css from './css/index.css';
import css1 from './css/index2.css';
import scss from './css/index3.scss';
// import $ from 'jquery';

let json = require('../author.json');
let elem = document.createElement('div');
elem.innerHTML = `author:${json.name},age:${json.age},school:${json.school}`;
$(document.body).append(elem);