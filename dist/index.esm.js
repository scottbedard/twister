function e(e,r){r-=e.length*Math.floor(r/e.length),e.push.apply(e,e.splice(0,r))}function r(e,r){if(!Number.isInteger(e)||e<3)throw new Error("Polygon sides must be an integer of 3 or greater");if(!Number.isInteger(r)||r<2)throw new Error("Polygon layers must be an integer of 2 or greater");if(3===e)throw new Error("Pyramids are not implemented yet");const t=[];for(let n=0,o=Math.floor(r/2);n<o;n++){const o=(r-2*n-1)*e;for(let e=0;e<o;e++)t.push({center:!1,currentIndex:e,depth:n,meta:{},originalIndex:e})}return r%2&&t.push({center:!0,currentIndex:0,depth:Math.floor(r/2),meta:{},originalIndex:0}),{layers:r,sides:e,stickers:t}}function t(r,t){if(!Number.isInteger(t))throw new Error("Face rotations must be an integer");const n=[];for(let o=0,s=Math.floor(r.layers/2);o<=s;o++){const s=r.stickers.filter(e=>e.depth===o);if(t%=r.sides,s.length>1){const n=(r.sides-1)*-t+t;n&&e(s,n)}n.push(...s)}return Object.assign(Object.assign({},r),{stickers:n})}export{r as createFace,t as rotateFace};
