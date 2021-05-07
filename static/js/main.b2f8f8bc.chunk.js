(this["webpackJsonpreact-currency-chart-app"]=this["webpackJsonpreact-currency-chart-app"]||[]).push([[0],{181:function(e,t,r){},182:function(e,t,r){},336:function(e,t,r){"use strict";r.r(t);var n=r(42),c=r(0),a=r.n(c),s=r(53),i=r.n(s),o=(r(181),r(182),r(74)),u=r(72),b=r(13);function m(e){return e<10?"0"+e:e}var d,l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=new Date(e);return[r.getHours(),r.getMinutes(),r.getSeconds()].filter((function(e,r){return!t||2!==r})).map((function(e){return m(e)})).join(":")},y=r(46),j="price",f="lastVolumeTo",O=function(e){return Number(null===e||void 0===e?void 0:e.toFixed(3))},h=b.d.enumeration(Object.keys(y)),p=b.d.model({name:h,streamValue:b.d.optional(b.d.number,0)}),C=b.d.model("Streamer",{streamBy:b.d.optional(b.d.string,j),subscribedCurrency:b.d.optional(p,{name:"BTC"}),subscribedCurrencyBase:b.d.optional(p,{name:"USD"})}).volatile((function(e){return{ccStreamer:new WebSocket("wss://streamer.cryptocompare.com/v2?api_key=3c97b9a112b2ea40c0bc78473365c5855379e17b7d8d7b55607a6f857dbad842"),channel:"5~CCCAGG"}})).views((function(e){return{get history(){return Object(b.b)(e).history},get historyOfPriceChange(){return this.history.historyOfPriceChange},get historyOfSubsPriceChange(){return this.history.historyOfSubsPriceChange}}})).actions((function(e){return{afterCreate:function(){e.ccStreamer.onopen=function(){var t={action:"SubAdd",subs:["".concat(e.channel,"~").concat(e.subscribedCurrency.name,"~").concat(e.subscribedCurrencyBase.name)]};e.ccStreamer.send(JSON.stringify(t))},e.ccStreamer.onmessage=this.onStreamMessage,e.ccStreamer.onerror=function(e){return console.log(e)}},onStreamMessage:function(t){var r=JSON.parse(t.data),n=O(r[e.streamBy.toUpperCase()]);n&&(e.history.setGlobal({time:l(),cName:r.FROMSYMBOL,cBase:r.TOSYMBOL,streamValue:n,streamBy:e.streamBy}),r.TOSYMBOL===e.subscribedCurrencyBase.name&&r.FROMSYMBOL===e.subscribedCurrency.name&&(e.subscribedCurrency.streamValue=n,e.history.setSubs({time:l(),cName:r.FROMSYMBOL,cBase:r.TOSYMBOL,streamValue:n,streamBy:e.streamBy})))},streamByCurrencies:function(t,r){e.history.switchHistory((function(n){return n.cBase===t&&n.cName===r&&n.streamBy===e.streamBy})),e.subscribedCurrencyBase.name=t,e.subscribedCurrency.name=r;var n={action:"SubAdd",subs:["".concat(e.channel,"~").concat(r,"~").concat(t)]};e.ccStreamer.send(JSON.stringify(n))},streamBySimpleCurrency:function(t){this.streamByCurrencies(t,e.subscribedCurrency.name)},streamByCryptoCurrency:function(t){this.streamByCurrencies(e.subscribedCurrencyBase.name,t)},setStreamBy:function(t){e.streamBy=t,e.history.switchHistory((function(e){return e.streamBy===t&&e.streamValue}))}}})),g=b.d.model("App",{isReady:!1,isDisconnect:!1,isDisconnectHappened:!1}).actions((function(e){return{ready:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];e.isReady=t},disconnect:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];e.isDisconnect=t,e.isDisconnectHappened=!0}}})),v=r(43),x=r.n(v),B=r(153),S=r.n(B),w=b.d.enumeration(Object.keys(y)),N=b.d.model({time:b.d.string,cName:w,cBase:w,streamValue:b.d.number,streamBy:b.d.enumeration([j,f])}),D=b.d.model("History",{historyOfPriceChange:b.d.array(N),historyOfSubsPriceChange:b.d.array(N)}).volatile((function(e){return{api:S.a.create({baseURL:"https://min-api.cryptocompare.com/data/v2",timeout:5e3,headers:{Authorization:"Apikey 3c97b9a112b2ea40c0bc78473365c5855379e17b7d8d7b55607a6f857dbad842",Accept:"application/json","Content-Type":"application/x-www-form-urlencoded"}})}})).views((function(e){return{get streamer(){return Object(b.b)(e).streamer},get subscribedCurrency(){return this.streamer.subscribedCurrency.name},get subscribedCurrencyBase(){return this.streamer.subscribedCurrencyBase.name}}})).actions((function(e){return{afterCreate:function(){e.streamer.streamBy===f&&this.getHistoryData()},getHistoryData:Object(b.a)(x.a.mark((function t(){var r,n,c,a;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.api("/histominute?fsym=".concat(e.subscribedCurrency,"&tsym=").concat(e.subscribedCurrencyBase,"&limit=10"));case 2:r=t.sent,n=r.data,c=n.Data.Data,a=c.map((function(t){return{time:l(new Date(1e3*t.time),!0),cName:e.subscribedCurrency,cBase:e.subscribedCurrencyBase,streamValue:O(t.volumeto/1e3),streamBy:f}})).slice(0,-1),e.setGlobal.apply(e,Object(o.a)(a)),e.setSubs.apply(e,Object(o.a)(a)),console.log(c);case 9:case"end":return t.stop()}}),t)}))),switchHistory:Object(b.a)(x.a.mark((function t(r){var n,c;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.streamer.subscribedCurrency.streamValue=0,n=Object(b.c)(e.historyOfPriceChange),(c=n.filter(r)).length?(e.historyOfSubsPriceChange=c,e.streamer.subscribedCurrency.streamValue=c.slice(-1)[0].streamValue):(e.historyOfSubsPriceChange.clear(),e.streamer.streamBy===f&&e.getHistoryData());case 4:case"end":return t.stop()}}),t)}))),setGlobal:function(){var t;(t=e.historyOfPriceChange).push.apply(t,arguments)},setSubs:function(){var t;(t=e.historyOfSubsPriceChange).push.apply(t,arguments)}}})),P=b.d.model("Store",{streamer:b.d.optional(C,{}),app:b.d.optional(g,{}),history:b.d.optional(D,{})}).create(),M=Object.keys(Object(n.a)({},P)),k=function(e){return u.b.apply(void 0,Object(o.a)(M))(Object(u.c)(e))},A=r(20),T=r(171),E=function(e){return y[e]||y.DEFAULT},V=r(8),L=r.n(V),U=r(3),H=k((function(e){var t=e.data,r=e.cb,n=e.isActive,a=e.streamer,s=a.subscribedCurrency,i=a.subscribedCurrencyBase,o=s.name,u=i.name,b=Object(c.useMemo)((function(){return(null===t||void 0===t?void 0:t.length)?t.filter((function(e){return e!==o&&e!==u})):[]}),[o,u]);return b.length?Object(U.jsxs)("div",{className:L()("currency-list",{active:n}),children:[Object(U.jsx)("div",{className:"currency-list-before"}),b.map((function(e,t){return Object(U.jsx)(R,{name:e,onClick:function(){return r(e)}},t)}))]}):Object(U.jsx)(U.Fragment,{})})),R=(d=function(e){var t=e.name,r=e.cb,a=e.data,s=Object(T.a)(e,["name","cb","data"]),i=Object(c.useState)(!1),o=Object(A.a)(i,2),u=o[0],b=o[1],m=Object(c.useMemo)((function(){return E(t)}),[t]);return Object(U.jsxs)("div",Object(n.a)(Object(n.a)({className:"currency",onMouseEnter:function(){return b(!0)},onMouseLeave:function(){return b(!1)}},s),{},{children:[Object(U.jsx)("div",{className:"dot",style:{background:m,boxShadow:"0 0 7px "+m}}),Object(U.jsx)("p",{children:t}),Object(U.jsx)(H,{cb:r,data:a,isActive:u})]}))},a.a.memo(d,(function(e,t){return JSON.stringify(e)===JSON.stringify(t)}))),F=k((function(e){var t=e.streamer.subscribedCurrency.streamValue,r=Object(c.useState)(0),n=Object(A.a)(r,2),a=n[0],s=n[1],i=Object(c.useState)(""),o=Object(A.a)(i,2),u=o[0],b=o[1];return Object(c.useEffect)((function(){b(t>=a?"green":"red"),s(t)}),[t]),Object(U.jsx)(U.Fragment,{children:!!t&&Object(U.jsxs)("p",{onAnimationEnd:function(){return b("")},className:L()("price-lighten",u),children:["curr: ",t]})})})),J=k((function(e){var t=e.streamer,r=t.streamBy,n=t.setStreamBy;return Object(U.jsxs)("div",{className:"switch",children:[Object(U.jsx)("div",{onClick:function(){n(f)},className:L()({active:r===f}),children:"VOL"}),Object(U.jsx)("div",{onClick:function(){n(j)},className:L()({active:r===j}),children:"PRICE"})]})})),_=k((function(e){var t=e.streamer,r=t.subscribedCurrency,n=t.streamBySimpleCurrency,c=t.streamByCryptoCurrency,a=t.subscribedCurrencyBase;return Object(U.jsxs)("div",{className:"currency main",children:[Object(U.jsx)(F,{}),Object(U.jsx)(J,{}),Object(U.jsx)(R,{name:r.name,data:["BTC","ETH","XRP","LTC"],cb:c}),Object(U.jsx)(R,{name:a.name,data:["USD","EUR","JPY","USDT"],cb:n})]})})),Y=r(338),G=r(342),z=r(168),I=r(169),K=r(76),W=r(172),X=r.p+"static/media/logo.6ce24c58.svg",q=function(){return Object(U.jsxs)("div",{className:"nullChart",children:[Object(U.jsx)("span",{children:"The data will appear here"}),Object(U.jsx)("img",{src:X,className:"App-logo",alt:"logo"})]})},Q=k((function(e){var t=e.streamer,r=t.subscribedCurrency,n=t.subscribedCurrencyBase,a=t.streamBy,s=e.history,i=s.historyOfSubsPriceChange,o=s.historyOfPriceChange,u={fontSize:11};Object(c.useEffect)((function(){console.log(a,"__streamBy__")}),[a]),Object(c.useEffect)((function(){console.log(Object(b.c)(o),"__historyOfPriceChange__")}),[o.length]);var m=E(r.name),d=E(n.name),l=Object(b.c)(i),y=l.length<2;return Object(U.jsxs)(U.Fragment,{children:[y&&Object(U.jsx)(q,{}),Object(U.jsxs)(Y.a,{width:window.innerWidth-100,height:400,data:y?[]:l,children:[Object(U.jsx)("defs",{children:Object(U.jsxs)("linearGradient",{id:"colorUv",x1:"0",y1:"0",x2:"0",y2:"1",children:[Object(U.jsx)("stop",{offset:"5%",stopColor:m,stopOpacity:.8}),Object(U.jsx)("stop",{offset:"95%",stopColor:d,stopOpacity:.1})]})}),Object(U.jsx)(G.a,{strokeDasharray:"3"}),Object(U.jsx)(z.a,{dataKey:"time",tick:u}),Object(U.jsx)(I.a,{domain:["dataMin","dataMax"],tick:u}),Object(U.jsx)(K.a,{}),Object(U.jsx)(W.a,{type:"monotone",name:a,dataKey:"streamValue",stroke:m,fillOpacity:1,fill:"url(#colorUv)"})]})]})})),Z=function(){return Object(U.jsxs)(U.Fragment,{children:[Object(U.jsx)(_,{}),Object(U.jsx)(Q,{})]})},$=k((function(e){e.streamer.historyOfSubsPriceChange;return Object(U.jsx)("div",{className:"App",children:Object(U.jsx)("div",{className:"App-body",children:Object(U.jsx)(Z,{})})})}));i.a.render(Object(U.jsx)(a.a.StrictMode,{children:Object(U.jsx)(u.a,Object(n.a)(Object(n.a)({},P),{},{children:Object(U.jsx)($,{})}))}),document.getElementById("root"))},46:function(e){e.exports=JSON.parse('{"BTC":"#ff7300","USD":"#00ff00","EUR":"#294b92","LTC":"#647AE6","ETH":"#000","JPY":"#bd0029","USDT":"#16A17D","XRP":"#9349ff","DEFAULT":"#000"}')}},[[336,1,2]]]);
//# sourceMappingURL=main.b2f8f8bc.chunk.js.map