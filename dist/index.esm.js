function t(t,r){return Math.floor(Math.random()*(r-t+1))+t}function r(t,r){return i(t,r).shift()}function e(t,r){return new Array(t).fill(r)}function n(r){return r[t(0,r.length-1)]}function s(t){return i(t).reverse()}function i(t,r,e){return t.slice(r,e)}function o(t,r,e,...n){return t.splice(r,e,...n)}function c(t){return p(a(t))}function a(t){const r=Math.sqrt(t.length);return e(r).map((e,n)=>{const s=n*r;return i(t,s,s+r)})}function u(t,r){return e(r).map((r,e)=>({data:null,originalIndex:e,value:t}))}function h(t){const r=t[0].value;for(let e=1;e<t.length;e++)if(t[e].value!==r)return!1;return!0}function l(t){return f(p(t))}function f(t){return t.reduce((t,r)=>t.concat(r),[])}function p(t){return t[0].map((r,e)=>t.map(t=>t[e]))}function D(t,r){const{depth:e,wide:n}=t;for(let t=e,s=n?0:e-1;t>s;t--)r(t,-t,t-1)}function B(t,r){return-1===r?f(s(c(t))):2===r?s(t):l(s(a(t)))}function L(t){return{U:{r:a(t.U),c:c(t.U)},L:{r:a(t.L),c:c(t.L)},F:{r:a(t.F),c:c(t.F)},R:{r:a(t.R),c:c(t.R)},B:{r:a(t.B),c:c(t.B)},D:{r:a(t.D),c:c(t.D)}}}function R(t){return t}function F(t){return t.trim()}class U{constructor(t){this.options=t,this.reset()}scramble(t){this.reset(),this.turn(this.generateScramble(t))}turn(t){t.split(" ").map(F).filter(R).map(t=>this.parseTurn(t)).forEach(t=>this.applyTurn(t))}}class d extends U{constructor(t){if(!Number.isInteger(t.size))throw new Error("Cube size must be an integer");if(t.size<2)throw new Error("Cube size must be two or greater");super(t)}applyTurn(t){const{target:e}=t;if("X"===e)this.state=function({U:t,L:r,F:e,R:n,B:o,D:c},{rotation:a}){return-1===a?{U:s(o),L:B(r,1),F:i(t),R:B(n,-1),B:s(c),D:i(e)}:2===a?{U:i(c),L:B(r,2),F:s(o),R:B(n,2),B:s(e),D:i(t)}:{U:i(e),L:B(r,-1),F:i(c),R:B(n,1),B:s(t),D:s(o)}}(this.state,t);else if("Y"===e)this.state=function({U:t,L:r,F:e,R:n,B:s,D:o},{rotation:c}){return-1===c?{U:B(t,-1),L:i(s),F:i(r),R:i(e),B:i(n),D:B(o,1)}:2===c?{U:B(t,2),L:i(n),F:i(s),R:i(r),B:i(e),D:B(o,2)}:{U:B(t,1),L:i(e),F:i(n),R:i(s),B:i(r),D:B(o,-1)}}(this.state,t);else if("Z"===e)this.state=function({U:t,L:r,F:e,R:n,B:i,D:o},{rotation:c}){return-1===c?{U:B(n,-1),L:B(t,-1),F:B(e,-1),R:B(o,-1),B:B(i,1),D:B(r,-1)}:2===c?{U:s(o),L:s(n),F:B(e,2),R:s(r),B:B(i,2),D:s(t)}:{U:B(r,1),L:B(o,1),F:B(e,1),R:B(t,1),B:B(i,-1),D:B(n,1)}}(this.state,t);else{const e=function(t){const{target:r}=t;switch(r){case"U":return"U";case"L":return"L";case"F":return"F";case"R":return"R";case"B":return"B";case"D":return"D"}}(t);if((1===t.depth||t.wide)&&(this.state[e]=B(this.state[e],t.rotation)),t.depth>=this.options.size){let r=2;1!==t.rotation&&-1!==t.rotation||(r=-1*t.rotation);const e=function(t){const{target:r}=t;switch(r){case"U":return"D";case"L":return"R";case"F":return"B";case"R":return"L";case"B":return"F";case"D":return"U"}}(t);this.state[e]=B(this.state[e],r)}switch(e){case"U":!function(t,e){const n=L(t);D(e,(s,i,c)=>{const a=r(n.B.r,c),u=r(n.R.r,c),h=r(n.F.r,c),l=r(n.L.r,c);let p,D,B,L;2===e.rotation?(p=h,D=l,B=a,L=u):-1===e.rotation?(p=u,D=h,B=l,L=a):(p=l,D=a,B=u,L=h),o(n.B.r,c,1,p),o(n.R.r,c,1,D),o(n.F.r,c,1,B),o(n.L.r,c,1,L),t.B=f(n.B.r),t.R=f(n.R.r),t.F=f(n.F.r),t.L=f(n.L.r)})}(this.state,t);break;case"L":!function(t,e){const n=L(t);D(e,(i,c,a)=>{const u=r(n.U.c,a),h=r(n.F.c,a),f=r(n.D.c,a),p=r(n.B.c,c);let D,B,L,R;2===e.rotation?(D=f,B=s(p),L=u,R=s(h)):-1===e.rotation?(D=h,B=f,L=s(p),R=s(u)):(D=s(p),B=u,L=h,R=s(f)),o(n.U.c,a,1,D),o(n.F.c,a,1,B),o(n.D.c,a,1,L),o(n.B.c,c,1,R),t.U=l(n.U.c),t.F=l(n.F.c),t.D=l(n.D.c),t.B=l(n.B.c)})}(this.state,t);break;case"F":!function(t,e){const n=L(t);D(e,(i,c,a)=>{const u=r(n.U.r,c),h=r(n.R.c,a),p=r(n.D.r,a),D=r(n.L.c,c);let B,L,R,F;2===e.rotation?(B=s(p),L=s(D),R=s(u),F=s(h)):-1===e.rotation?(B=h,L=s(p),R=D,F=s(u)):(B=s(D),L=u,R=s(h),F=p),o(n.U.r,c,1,B),o(n.R.c,a,1,L),o(n.D.r,a,1,R),o(n.L.c,c,1,F),t.U=f(n.U.r),t.R=l(n.R.c),t.D=f(n.D.r),t.L=l(n.L.c)})}(this.state,t);break;case"R":!function(t,e){const n=L(t);D(e,(i,c,a)=>{const u=r(n.U.c,c),h=r(n.B.c,a),f=r(n.D.c,c),p=r(n.F.c,c);let D,B,L,R;2===e.rotation?(D=f,B=s(p),L=u,R=s(h)):-1===e.rotation?(D=s(h),B=s(f),L=p,R=u):(D=p,B=s(u),L=s(h),R=f),o(n.U.c,c,1,D),o(n.B.c,a,1,B),o(n.D.c,c,1,L),o(n.F.c,c,1,R),t.U=l(n.U.c),t.B=l(n.B.c),t.D=l(n.D.c),t.F=l(n.F.c)})}(this.state,t);break;case"B":!function(t,e){const n=L(t);D(e,(i,c,a)=>{const u=r(n.U.r,a),h=r(n.L.c,a),p=r(n.D.r,c),D=r(n.R.c,c);let B,L,R,F;2===e.rotation?(B=s(p),L=s(D),R=s(u),F=s(h)):-1===e.rotation?(B=s(h),L=p,R=s(D),F=u):(B=D,L=s(u),R=h,F=s(p)),o(n.U.r,i-1,1,B),o(n.L.c,i-1,1,L),o(n.D.r,c,1,R),o(n.R.c,c,1,F),t.U=f(n.U.r),t.L=l(n.L.c),t.D=f(n.D.r),t.R=l(n.R.c)})}(this.state,t);break;case"D":!function(t,e){const n=L(t);D(e,(s,i)=>{const c=r(n.F.r,i),a=r(n.R.r,i),u=r(n.B.r,i),h=r(n.L.r,i);let l,p,D,B;2===e.rotation?(l=u,p=h,D=c,B=a):-1===e.rotation?(l=a,p=u,D=h,B=c):(l=h,p=c,D=a,B=u),o(n.F.r,i,1,l),o(n.R.r,i,1,p),o(n.B.r,i,1,D),o(n.L.r,i,1,B),t.F=f(n.F.r),t.R=f(n.R.r),t.B=f(n.B.r),t.L=f(n.L.r)})}(this.state,t)}}}generateScramble(r=Math.max(20,Math.pow(this.options.size,3))){const e=["U","L","F","R","B","D"],s=Math.floor(this.options.size/2),i=[],o={U:["L","F","R","B"],L:["U","F","D","B"],F:["L","U","R","D"],R:["U","B","D","F"],B:["U","L","D","R"],D:["F","R","B","L"]};for(let t=0,s=n(e);t<r;t++)s=n(o[s]),i.push(s);return i.map(r=>function(t){let r="";(t.depth>1&&!t.wide||t.depth>2)&&(r=t.depth);let e=t.wide?"w":"",n="";return-1===t.rotation?n="-":2===t.rotation&&(n=2),`${r}${t.target.toUpperCase()}${e}${n}`}({depth:this.options.size>3?t(0,s):1,rotation:n([-1,1,2]),target:r,wide:this.options.size>3&&!!t(0,1)})).join(" ")}isSolved(){return h(this.state.U)&&h(this.state.L)&&h(this.state.F)&&h(this.state.R)&&h(this.state.B)&&h(this.state.D)}parseTurn(t){return function(t){const r=t.match(/^(\d)*([ulfrbdxyzULFRBDXYZ]){1}(w)*(['-2])*$/);if(null===r)throw new Error(`Invalid turn: ${t}`);const e=r[4],n=r[2],s=Boolean(r[3]);let i=r[1]?parseInt(r[1],10):1;s&&(i=Math.max(2,i));let o=1;return"-"===e||"'"===e?o=-1:"2"===e&&(o=2),{depth:i,rotation:o,target:n,wide:s}}(t)}reset(){const t=Math.pow(this.options.size,2);this.state={U:u(0,t),L:u(1,t),F:u(2,t),R:u(3,t),B:u(4,t),D:u(5,t)}}}function w(t,r,e=null){if(!Number.isInteger(t)||t<5)throw new Error("Polygon sides must be an integer 5 or greater");if(!Number.isInteger(r)||r<2)throw new Error("Polygon layers must be an integer 5 or greater");const n=[];let s=0;for(let i=0,o=Math.ceil(r/2);i<o;i++){const o=(r-2*i-1)*t;for(let t=0;t<o;t++)n.push({originalIndex:s,depth:i+1,value:e}),s++}if(r%2){const t=Math.floor(r/2)+1;n.push({originalIndex:s,depth:t,value:e})}return{layers:r,sides:t,stickers:n}}class g extends U{constructor(t){if(!Number.isInteger(t.size))throw new Error("Dodecaminx size must be an integer");if(t.size<2)throw new Error("Dodecaminx size must be two or greater");super(t)}applyTurn(t){}generateScramble(t){return""}isSolved(){return!1}parseTurn(t){return{depth:1,rotation:1,target:"F",wide:!1}}reset(){this.state={U:w(5,this.options.size,0),F:w(5,this.options.size,1),L:w(5,this.options.size,2),R:w(5,this.options.size,3),BL:w(5,this.options.size,4),BR:w(5,this.options.size,5),DL:w(5,this.options.size,6),DR:w(5,this.options.size,7),DBL:w(5,this.options.size,8),DBR:w(5,this.options.size,9),B:w(5,this.options.size,10),D:w(5,this.options.size,11)}}}export{d as Cube,g as Dodecaminx};
