let modA = require('./components/a'); //commonJs
// console.log(modA1);
import modB from './components/b';
import img from './assets/images/a.png';

// require('style-loader!css-loader!./assets/css/a.css'); //全局引入
// require('./assets/css/a.css'); //全局引入
require('./assets/css/a'); //全局引入

var oDiv=document.querySelector('#app');
oDiv.innerHTML=modA+'/'+modB.aa+modB.bb+'/'+`<img src="${img}"/>`