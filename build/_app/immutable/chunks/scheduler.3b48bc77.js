function m(){}function E(t,n){for(const e in n)t[e]=n[e];return t}function M(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function j(t){return t()}function A(){return Object.create(null)}function q(t){t.forEach(j)}function C(t){return typeof t=="function"}function B(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let l;function D(t,n){return t===n?!0:(l||(l=document.createElement("a")),l.href=n,t===l.href)}function P(t){return Object.keys(t).length===0}function x(t,...n){if(t==null){for(const o of n)o(void 0);return m}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function S(t){let n;return x(t,e=>n=e)(),n}function U(t,n,e){t.$$.on_destroy.push(x(n,e))}function G(t,n,e,o){if(t){const r=k(t,n,e,o);return t[0](r)}}function k(t,n,e,o){return t[1]&&o?E(e.ctx.slice(),t[1](o(n))):e.ctx}function H(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const i=[],h=Math.max(n.dirty.length,r.length);for(let u=0;u<h;u+=1)i[u]=n.dirty[u]|r[u];return i}return n.dirty|r}return n.dirty}function I(t,n,e,o,r,i){if(r){const h=k(n,e,o,i);t.p(h,r)}}function J(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function K(t){return t&&C(t.destroy)?t.destroy:m}let f;function d(t){f=t}function _(){if(!f)throw new Error("Function called outside component initialization");return f}function L(t){_().$$.on_mount.push(t)}function N(t){_().$$.after_update.push(t)}function Q(t,n){return _().$$.context.set(t,n),n}function R(t){return _().$$.context.get(t)}function T(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(o=>o.call(this,n))}const a=[],y=[];let s=[];const b=[],w=Promise.resolve();let g=!1;function O(){g||(g=!0,w.then(z))}function V(){return O(),w}function v(t){s.push(t)}function W(t){b.push(t)}const p=new Set;let c=0;function z(){if(c!==0)return;const t=f;do{try{for(;c<a.length;){const n=a[c];c++,d(n),F(n.$$)}}catch(n){throw a.length=0,c=0,n}for(d(null),a.length=0,c=0;y.length;)y.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];p.has(e)||(p.add(e),e())}s.length=0}while(a.length);for(;b.length;)b.pop()();g=!1,p.clear(),d(t)}function F(t){if(t.fragment!==null){t.update(),q(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(v)}}function X(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{v as A,X as B,f as C,j as D,a as E,O as F,N as a,y as b,U as c,G as d,H as e,_ as f,J as g,d as h,M as i,z as j,T as k,W as l,K as m,m as n,L as o,R as p,Q as q,q as r,B as s,V as t,I as u,S as v,D as w,A as x,C as y,P as z};