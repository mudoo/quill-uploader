/*!
 * Quill Uploader Module v1.0.0
 * https://github.com/mudoo/quill-uploader
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("Quill")):"function"==typeof define&&define.amd?define(["Quill"],e):"object"==typeof exports?exports.QuillUploader=e(require("Quill")):t.QuillUploader=e(t.Quill)}(self,(t=>(()=>{"use strict";var e=[,e=>{e.exports=t}],r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var i=r[t]={exports:{}};return e[t](i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var o={};n.r(o),n.d(o,{default:()=>H});var i=n(1),a=n.n(i);function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){v(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function s(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,m(n.key),n)}}function f(t,e,r){return e=y(e),function(t,e){if(e&&("object"==u(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,p()?Reflect.construct(e,r||[],y(t).constructor):e.apply(t,r))}function p(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(p=function(){return!!t})()}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!{}.hasOwnProperty.call(t,e)&&null!==(t=y(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},d.apply(null,arguments)}function y(t){return y=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},y(t)}function h(t,e){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},h(t,e)}function v(t,e,r){return(e=m(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function m(t){var e=function(t,e){if("object"!=u(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!=u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==u(e)?e:e+""}var b=window.Quill||a(),g=b.import("formats/image"),w=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),f(this,e,arguments)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}(e,t),r=e,o=[{key:"create",value:function(t){var r,n,o,i,a,u=(r=e,n="create",o=this,a=d(y(1&(i=2)?r.prototype:r),n,o),2&i&&"function"==typeof a?function(t){return a.apply(o,t)}:a)([t]);if(!0===t)return u;if("string"==typeof t&&(t={url:t}),t.url){var c=document.createElement("img");c.setAttribute("src",t.url),c.setAttribute("alt",t.label||t.name||""),u.appendChild(c)}var s=l({},t);return delete s.url,Object.assign(u.dataset,s),u.setAttribute("contenteditable",!1),u}},{key:"formats",value:function(t){return l({},t.dataset)}},{key:"value",value:function(){return null}},{key:"register",value:function(){b.import("blots/block").allowedChildren.push(e)}}],(n=null)&&s(r.prototype,n),o&&s(r,o),Object.defineProperty(r,"prototype",{writable:!1}),r;var r,n,o}(b.import("blots/embed"));v(w,"blotName","loadingBlot"),v(w,"className","ql-uploading"),v(w,"tagName","span"),v(w,"allowedChildren",[g]);const O=w;function A(t){return A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},A(t)}function j(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function P(t,e,r){return(e=E(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function x(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,E(n.key),n)}}function E(t){var e=function(t,e){if("object"!=A(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!=A(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==A(e)?e:e+""}function k(t,e,r){return e=_(e),function(t,e){if(e&&("object"==A(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,S()?Reflect.construct(e,r||[],_(t).constructor):e.apply(t,r))}function S(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(S=function(){return!!t})()}function L(){return L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!{}.hasOwnProperty.call(t,e)&&null!==(t=_(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},L.apply(null,arguments)}function _(t){return _=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},_(t)}function T(t,e){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},T(t,e)}var q=window.Quill||a();const R=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),k(this,e,arguments)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&T(t,e)}(e,t),r=e,o=[{key:"create",value:function(t){"string"==typeof t&&(t={url:t});var r,n,o,i,a,u=(r=e,n="create",o=this,a=L(_(1&(i=2)?r.prototype:r),n,o),2&i&&"function"==typeof a?function(t){return a.apply(o,t)}:a)([t.url]);return t.download&&(u.setAttribute("download",t.download),delete t.download),delete t.url,Object.assign(u.dataset,t),u}},{key:"formats",value:function(t){var e=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?j(Object(r),!0).forEach((function(e){P(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},t.dataset);return e.url&&(e.url=t.getAttribute("href")),e}},{key:"value",value:function(t){return t.dataset.url||t.getAttribute("href")}},{key:"register",value:function(){q.import("blots/block").allowedChildren.push(e)}}],(n=null)&&x(r.prototype,n),o&&x(r,o),Object.defineProperty(r,"prototype",{writable:!1}),r;var r,n,o}(q.import("formats/link"));function D(t,e){return e=Object.assign({time:3},e),new Promise((function(r,n){var o=document.createElement("video"),i={autoplay:!0,loop:!0,muted:!0,playsinline:!0,"webkit-playsinline":!0,preload:"auto",crossOrigin:"anonymous"};for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&o.setAttribute(a,i[a]);var u=t instanceof File;u&&(t=URL.createObjectURL(t)),o.addEventListener("loadedmetadata",(function(){if(e.time){var t=e.time;t<1&&(t=this.duration*t),this.currentTime=t}})),o.addEventListener("loadeddata",(function(){var n=function(t,e){e=Object.assign({quality:.8,type:"image/jpeg"},e);var r=document.createElement("canvas");return r.width=t.videoWidth,r.height=t.videoHeight,r.getContext("2d").drawImage(t,0,0,r.width,r.height),r.toDataURL(e.type,e.quality)}(o,e),i={thumb:n,duration:Math.round(this.duration),width:this.videoWidth,height:this.videoHeight};u&&URL.revokeObjectURL(t),r(i),o=null})),o.addEventListener("play",(function(){this.pause()})),o.addEventListener("error",(function(t){n(t),o=null})),o.src=t}))}function C(t){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(t)}function N(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */N=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var i=e&&e.prototype instanceof m?e:m,a=Object.create(i.prototype),u=new _(n||[]);return o(a,"_invoke",{value:E(t,r,u)}),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=s;var p="suspendedStart",d="suspendedYield",y="executing",h="completed",v={};function m(){}function b(){}function g(){}var w={};l(w,a,(function(){return this}));var O=Object.getPrototypeOf,A=O&&O(O(T([])));A&&A!==r&&n.call(A,a)&&(w=A);var j=g.prototype=m.prototype=Object.create(w);function P(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function r(o,i,a,u){var c=f(t[o],t,i);if("throw"!==c.type){var l=c.arg,s=l.value;return s&&"object"==C(s)&&n.call(s,"__await")?e.resolve(s.__await).then((function(t){r("next",t,a,u)}),(function(t){r("throw",t,a,u)})):e.resolve(s).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,u)}))}u(c.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function E(e,r,n){var o=p;return function(i,a){if(o===y)throw Error("Generator is already running");if(o===h){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var u=n.delegate;if(u){var c=k(u,n);if(c){if(c===v)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var l=f(e,r,n);if("normal"===l.type){if(o=n.done?h:d,l.arg===v)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=h,n.method="throw",n.arg=l.arg)}}}function k(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,k(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),v;var i=f(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,v;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,v):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function T(e){if(e||""===e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(C(e)+" is not iterable")}return b.prototype=g,o(j,"constructor",{value:g,configurable:!0}),o(g,"constructor",{value:b,configurable:!0}),b.displayName=l(g,c,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,l(t,c,"GeneratorFunction")),t.prototype=Object.create(j),t},e.awrap=function(t){return{__await:t}},P(x.prototype),l(x.prototype,u,(function(){return this})),e.AsyncIterator=x,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new x(s(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},P(j),l(j,c,"Generator"),l(j,a,(function(){return this})),l(j,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=T,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(L),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return u.type="throw",u.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),l=n.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:T(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),v}},e}function Q(t){return function(t){if(Array.isArray(t))return t}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return U(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?U(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function U(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}function F(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}function B(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){F(i,n,o,a,u,"next",t)}function u(t){F(i,n,o,a,u,"throw",t)}a(void 0)}))}}function M(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,G(n.key),n)}}function I(t,e,r){return(e=G(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function G(t){var e=function(t,e){if("object"!=C(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!=C(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==C(e)?e:e+""}var Y=window.Quill||a(),V=function(){return t=function t(e,r){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.quill=e,this.quill.customUploader=this,this.options=Object.assign({handler:null,upload:null,accepts:this.constructor.Accepts},r);var o=Object.keys(this.options.accepts).reduce((function(t,e){return t.concat(n.options.accepts[e])}),[]);this.quill.uploader.options.mimetypes=o,"function"!=typeof this.options.upload&&console.error("[Missing config] upload function that returns a promise is required");var i=this.quill.getModule("toolbar");i&&Object.keys(this.options.accepts).forEach((function(t){i.addHandler(t,(function(){return n.pickFile(t)}))}))},e=[{key:"pickFile",value:function(t){var e,r=this,n=this.quill.container.querySelector("input.ql-uploader[type=file]");null==n&&((n=document.createElement("input")).setAttribute("type","file"),n.classList.add("ql-uploader"),n.setAttribute("style","visibility:hidden"),n.addEventListener("change",(function(){var t=r.quill.getSelection(!0);r.uploadFiles(t,n.files),n.value=""})),this.quill.container.appendChild(n));var o=(null===(e=this.options.accepts[t]||this.options.accepts.image)||void 0===e?void 0:e.join(", "))||"image/*";n.setAttribute("accept",o),n.click()}},{key:"insertPlaceholder",value:function(t,e){var r=t.index;return t.index++,t.length&&this.quill.deleteText(r,t.length,"api"),this.quill.insertEmbed(r,O.blotName,e,"api")}},{key:"insertFilePlaceholder",value:function(t,e){var r=this,n=this.constructor.findType(e.type);e.key||(e.key=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:8,e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return Array.from({length:t},(function(){return e[Math.floor(62*Math.random())]})).join("")}());var o=e.key;return new Promise((function(i){var a,u;"attachment"===n?i(r.insertPlaceholder(t,{label:e.name,url:r.constructor.DefaultAttachmentPlaceholder,key:o})):e.thumb||e.base64?i(r.insertPlaceholder(t,{name:e.name,url:e.thumb||e.base64,key:o})):null!==(a=r.options.accepts)&&void 0!==a&&null!==(a=a.image)&&void 0!==a&&a.includes(e.type)?function(t){return new Promise((function(e,r){var n=new FileReader;n.onload=function(t){n=null,e(t.target.result)},n.onerror=r,n.readAsDataURL(t)}))}(e).then((function(n){i(r.insertPlaceholder(t,{name:e.name,url:n,key:o}))})):null!==(u=r.options.accepts)&&void 0!==u&&null!==(u=u.video)&&void 0!==u&&u.includes(e.type)?D(e).then((function(n){i(r.insertPlaceholder(t,{name:e.name,url:n.thumb,key:o}))})):i(r.insertPlaceholder(t,{url:r.constructor.DefaultFilePlaceholder,key:o}))}))}},{key:"calculatePlaceholderInsertLength",value:function(t){return t.ops.reduce((function(t,e){return Object.prototype.hasOwnProperty.call(e,"insert")&&t++,t}),0)}},{key:"getLoadingDomRange",value:function(t){var e=this.quill.constructor.find(this.quill.container.querySelector('.ql-uploading[data-key="'.concat(t,'"]'))),r=this.quill.getIndex(e),n=this.quill.getContents(r,1);return{blot:e,delta:n,index:r,length:this.calculatePlaceholderInsertLength(n)}}},{key:"loadImage",value:function(t){var e=this;return new Promise((function(r){var n=e.getLoadingDomRange(t.key),o=n.blot.domNode.querySelector("img");o?(o.addEventListener("load",(function(){return r(n)})),o.src=t.url):r(n)}))}},{key:"insertToEditor",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.getLoadingDomRange(t.key),r=this.constructor.findType(t.type),n=e.length;this.quill.deleteText(e.index,n,"user"),"attachment"===r?(n+=t.name.length-1,this.quill.insertText(e.index,t.name,{link:{key:t.key,download:t.name,url:t.url,ext:t.name.slice(t.name.lastIndexOf(".")+1)}},"user")):this.quill.insertEmbed(e.index,r,t.delta||t.url,"user"),this.quill.setSelection(e.index+n,"user")}},{key:"removePlaceholder",value:function(t){var e=this.getLoadingDomRange(t.key);this.quill.deleteText(e.index,e.length,"user")}},{key:"uploadFiles",value:(n=B(N().mark((function t(e,r){var n,o,i=this;return N().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=Q(r),o=n.slice(0),!this.options.handler){t.next=5;break}return t.next=4,this.options.handler(o);case 4:o=t.sent;case 5:return t.next=7,Promise.all(o.map((function(t){return i.insertFilePlaceholder(e,t)})));case 7:return t.next=9,this.options.upload(e,o);case 9:t.sent.forEach(function(){var t=B(N().mark((function t(e){var r;return N().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.url){t.next=9;break}if("image"!==i.constructor.findType(e.type)){t.next=6;break}return t.next=5,i.loadImage(e);case 5:r=t.sent;case 6:i.insertToEditor(e,r),t.next=10;break;case 9:i.removePlaceholder(e);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 11:case"end":return t.stop()}}),t,this)}))),function(t,e){return n.apply(this,arguments)})}],r=[{key:"findType",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.Accepts,r=Object.keys(e);return r.includes(t)?t:r.find((function(r){return e[r].includes(t)}))||r[0]}},{key:"register",value:function(){Y.register(O),Y.register(R,!0)}}],e&&M(t.prototype,e),r&&M(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e,r,n}();I(V,"DefaultFilePlaceholder","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAC0AQMAAADfKmdSAAAAA1BMVEX19fWwaZ+KAAAAHklEQVRYw+3BMQEAAADCIPuntsYOYAAAAAAAAABhBxzUAAEYBjd2AAAAAElFTkSuQmCC"),I(V,"DefaultAttachmentPlaceholder","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAQMAAADaua+7AAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAAtJREFUCNdjoDEAAABgAAGVQESKAAAAAElFTkSuQmCC"),I(V,"Accepts",{image:["image/jpeg","image/png","image/gif"],video:["video/mp4"],attachment:["text/plain","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/zip","application/vnd.rar","application/x-7z-compressed"]});const K=V;window.Quill&&window.Quill.register("modules/customUploader",V);const H=K;return o})()));