(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{23:function(e,n,t){},43:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t(1),u=t.n(c),i=t(17),a=t.n(i),o=(t(23),t(4)),s=t.n(o),l=t(8),f=t(7),d=t(3);function b(e){var n=e.filterText,t=e.setFilterText;return Object(r.jsxs)("div",{children:["filter shown with:",Object(r.jsx)("input",{type:"text",value:n,onChange:function(e){return t(e.target.value.trim())}})]})}function j(e){var n=e.handleSubmit,t=e.newName,c=e.newNumber,u=e.setNewName,i=e.setNewNumber;return Object(r.jsxs)("form",{onSubmit:n,children:[Object(r.jsxs)("div",{children:["name:"," ",Object(r.jsx)("input",{value:t,onChange:function(e){return u(e.target.value)}}),Object(r.jsxs)("div",{children:["number:"," ",Object(r.jsx)("input",{value:c,onChange:function(e){return i(e.target.value)}})]})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})}function h(e){var n=e.person,t=e.handleClick;return Object(r.jsxs)("div",{children:[" ",n.name," ",n.number," ",Object(r.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})}function m(e){var n=e.filterText,t=e.persons,c=e.handleClick;return Object(r.jsx)("div",{children:n.trim().length?t.filter((function(e){return e.name.match(new RegExp(n,"i"))})).map((function(e){return Object(r.jsx)(h,{handleClick:c,person:e},e.name)})):t.map((function(e){return Object(r.jsx)(h,{handleClick:c,person:e},e.name)}))})}function p(e){var n=e.message;return null===n?null:Object(r.jsx)("div",{className:"notification ".concat(n.type),children:n.content})}var x=t(5),O=t.n(x),v="/api/persons",w=function(){return O.a.get(v).then((function(e){return e.data}))},k=function(e){return O.a.post(v,e).then((function(e){return e.data}))},g=function(e,n){return O.a.put("".concat(v,"/").concat(e),n).then((function(e){return e.data}))},N=function(e){return O.a.delete("".concat(v,"/").concat(e)).then((function(e){return e.data}))},T=function(){var e=Object(c.useState)([]),n=Object(d.a)(e,2),t=n[0],u=n[1],i=Object(c.useState)(""),a=Object(d.a)(i,2),o=a[0],h=a[1],x=Object(c.useState)(""),O=Object(d.a)(x,2),v=O[0],T=O[1],y=Object(c.useState)(""),C=Object(d.a)(y,2),S=C[0],F=C[1],D=Object(c.useState)(null),E=Object(d.a)(D,2),P=E[0],B=E[1];Object(c.useEffect)((function(){return w().then((function(e){u(e)})),function(){}}),[]);var I=function(){var e=Object(f.a)(s.a.mark((function e(n){var r,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),r=t.find((function(e){return e.name===o})),c=function(){h(""),T("")},!r){e.next=12;break}if(window.confirm("".concat(o," is already added to phonebook, replace the old number with a new one?"))){e.next=8;break}return e.abrupt("return",null);case 8:return e.next=10,g(r.id,Object(l.a)(Object(l.a)({},r),{},{number:v})).then((function(e){u(t.map((function(n){return n.name!==o?n:e}))),c(),B({content:"Updated ".concat(e.name),type:"info"}),setTimeout((function(){B(null)}),5e3)})).catch((function(e){B({content:"the person '".concat(r.name,"' does not exist!"),type:"error"}),setTimeout((function(){B(null)}),5e3),u(t.filter((function(e){return e.id!==r.id})))}));case 10:e.next=14;break;case 12:return e.next=14,k({name:o,number:v}).then((function(e){u(t.concat([e])),c(),B({content:"Added ".concat(e.name),type:"info"}),setTimeout((function(){B(null)}),5e3)}));case 14:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),J=function(){var e=Object(f.a)(s.a.mark((function e(n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(window.confirm("Delete ".concat(n.name," ?"))){e.next=2;break}return e.abrupt("return",null);case 2:return e.next=4,N(n.id).then((function(e){B({content:"Deleted ".concat(n.name),type:"info"}),setTimeout((function(){B(null)}),5e3),u(t.filter((function(e){return e.id!==n.id})))})).catch((function(e){B({content:"the person '".concat(n.name,"' does not exist!"),type:"error"}),setTimeout((function(){B(null)}),5e3),u(t.filter((function(e){return e.id!==n.id})))}));case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(p,{message:P}),Object(r.jsx)(b,{filterText:S,setFilterText:F}),Object(r.jsx)("h2",{children:"add a new"}),Object(r.jsx)(j,{handleSubmit:I,newName:o,setNewName:h,newNumber:v,setNewNumber:T}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(m,{handleClick:J,filterText:S,persons:t})]})},y=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,44)).then((function(n){var t=n.getCLS,r=n.getFID,c=n.getFCP,u=n.getLCP,i=n.getTTFB;t(e),r(e),c(e),u(e),i(e)}))};a.a.render(Object(r.jsx)(u.a.StrictMode,{children:Object(r.jsx)(T,{})}),document.getElementById("root")),y()}},[[43,1,2]]]);
//# sourceMappingURL=main.f45ed37a.chunk.js.map