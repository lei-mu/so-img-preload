!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(n="undefined"!=typeof globalThis?globalThis:n||self).soImgPreload=e()}(this,function(){"use strict";return function(){var n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],l=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},u=n.length;if(0!==u){var c=[],s=0,r=0,d=0,m=null,e=l.limit,i=[];if("number"==typeof l.limit&&0<l.limit){n.forEach(function(n,e){var t,o;i.push((t=n,o=e,function(){f(t,o,h)}))}),m=Date.now();for(var t=0,o=Math.min(l.limit,u);t<o;t++)i[t]()}else m=Date.now(),n.forEach(function(n,e){f(n,e)})}function a(n,e,t,o){s++,"success"===n?r++:d++;var i=Date.now()-m,a={status:n,index:t,url:e,time:o},f={success:r,fail:d,total:u,totalTime:i};l.each&&l.each(a,f),c[t]=a,l.all&&s===u&&l.all(c,f)}function f(n,e,t){var o=new Image,i=Date.now();o.src=n,o.onload=function(){a("success",n,e,Date.now()-i),t&&t()},o.onerror=function(){a("fail",n,e,Date.now()-i),t&&t()}}function h(){u-1<e||(i[e](),e+=1)}}});
//# sourceMappingURL=soImgPreload.js.map
