(this["webpackJsonpUNICT-Telegram-Channels-Groups"]=this["webpackJsonpUNICT-Telegram-Channels-Groups"]||[]).push([[51],{125:function(e,n,t){"use strict";t.r(n),t.d(n,"KEYBOARD_DID_CLOSE",(function(){return r})),t.d(n,"KEYBOARD_DID_OPEN",(function(){return i})),t.d(n,"copyVisualViewport",(function(){return y})),t.d(n,"keyboardDidClose",(function(){return b})),t.d(n,"keyboardDidOpen",(function(){return p})),t.d(n,"keyboardDidResize",(function(){return g})),t.d(n,"resetKeyboardAssist",(function(){return d})),t.d(n,"setKeyboardClose",(function(){return h})),t.d(n,"setKeyboardOpen",(function(){return c})),t.d(n,"startKeyboardAssist",(function(){return s})),t.d(n,"trackViewportChanges",(function(){return v}));var i="ionKeyboardDidShow",r="ionKeyboardDidHide",o={},u={},a=!1,d=function(){o={},u={},a=!1},s=function(e){f(e),e.visualViewport&&(u=y(e.visualViewport),e.visualViewport.onresize=function(){v(e),p()||g(e)?c(e):b(e)&&h(e)})},f=function(e){e.addEventListener("keyboardDidShow",(function(n){return c(e,n)})),e.addEventListener("keyboardDidHide",(function(){return h(e)}))},c=function(e,n){w(e,n),a=!0},h=function(e){l(e),a=!1},p=function(){var e=(o.height-u.height)*u.scale;return!a&&o.width===u.width&&e>150},g=function(e){return a&&!b(e)},b=function(e){return a&&u.height===e.innerHeight},w=function(e,n){var t=n?n.keyboardHeight:e.innerHeight-u.height,r=new CustomEvent(i,{detail:{keyboardHeight:t}});e.dispatchEvent(r)},l=function(e){var n=new CustomEvent(r);e.dispatchEvent(n)},v=function(e){o=Object.assign({},u),u=y(e.visualViewport)},y=function(e){return{width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale}}}}]);
//# sourceMappingURL=51.d333a651.chunk.js.map