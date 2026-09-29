/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$3=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t=>t,s$1=t.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$1=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$1,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),w=x(2),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$1+x):s+o$1+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$1),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H$b}),r.removeAttribute(t);}else t.startsWith(o$1)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$1),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$1,t+1));)d.push({type:7,index:l}),t+=o$1.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}let H$b = class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}};class I extends H$b{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H$b{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H$b{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * Schneider Electric EasyLogic PM2200 faceplate.
 *
 * Drawn from photographs of the unit: a square charcoal panel-mount bezel,
 * a pale positive LCD set high in the face, and four round push keys on the
 * bezel below it. The display carries a dark title band across the top, four
 * left-labelled rows with right-aligned values and their units, and a
 * soft-key legend along the bottom matching the four keys.
 *
 * An earlier version of this file was drawn from memory rather than a
 * photograph and looked nothing like the product. Worth remembering.
 */
const W$a = 400;
const H$a = 400;
// The LCD sits high and slightly narrower than the bezel.
const LX$3 = 62;
const LY$3 = 84;
const LW$3 = 276;
const LH$3 = 244;
const ROWS = [LY$3 + 58, LY$3 + 104, LY$3 + 150, LY$3 + 196];
const KEY_Y = 352;
const KEY_X = [112, 172, 232, 292];
const CHASSIS$8 = w `
  <defs>
    <linearGradient id="pm-bezel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#43484c" />
      <stop offset="45%" stop-color="#383d41" />
      <stop offset="100%" stop-color="#2b2f33" />
    </linearGradient>
    <linearGradient id="pm-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d9ded2" />
      <stop offset="100%" stop-color="#c6ccbe" />
    </linearGradient>
    <radialGradient id="pm-key" cx="0.38" cy="0.32" r="0.8">
      <stop offset="0%" stop-color="#9a9a94" />
      <stop offset="70%" stop-color="#7b7b76" />
      <stop offset="100%" stop-color="#5e5e5a" />
    </radialGradient>
  </defs>

  <rect x="0" y="0" width="${W$a}" height="${H$a}" rx="12" fill="url(#pm-bezel)" />
  <rect x="7" y="7" width="${W$a - 14}" height="${H$a - 14}" rx="9"
        fill="none" stroke="#20242700" stroke-width="1" />
  <rect x="26" y="26" width="${W$a - 52}" height="${H$a - 52}" rx="6"
        fill="none" stroke="#4d5358" stroke-width="1" />

  <!-- Brand. Wordmarks belong to their owners; see TRADEMARKS.md. -->
  <text class="pm-brand" x="48" y="58">Schneider</text>
  <text class="pm-brand-sub" x="48" y="72">Electric</text>
  <rect x="236" y="42" width="120" height="22" rx="3" fill="#4a5054" />
  <text class="pm-model" x="296" y="58" text-anchor="middle">EasyLogic PM2200</text>

  <!-- Display -->
  <rect x="${LX$3 - 3}" y="${LY$3 - 3}" width="${LW$3 + 6}" height="${LH$3 + 6}" rx="3"
        fill="#1d2124" />
  <rect x="${LX$3}" y="${LY$3}" width="${LW$3}" height="${LH$3}" fill="url(#pm-lcd)" />

  <!-- Title band -->
  <rect x="${LX$3}" y="${LY$3}" width="${LW$3}" height="24" fill="#6a7482" />
  <rect x="${LX$3}" y="${LY$3}" width="26" height="24" fill="#8d97a4" />
  <rect x="${LX$3 + LW$3 - 26}" y="${LY$3}" width="26" height="24" fill="#8d97a4" />

  <!-- Soft-key legend, aligned over the four physical keys -->
  <line x1="${LX$3}" y1="${LY$3 + LH$3 - 26}" x2="${LX$3 + LW$3}" y2="${LY$3 + LH$3 - 26}"
        stroke="#9aa392" stroke-width="1" />

  <!-- Keys -->
  ${KEY_X.map((x) => w `
      <circle cx="${x}" cy="${KEY_Y}" r="21" fill="url(#pm-key)" />
      <circle cx="${x}" cy="${KEY_Y}" r="21" fill="none" stroke="#24282b" stroke-width="1.5" />
    `)}

  <!-- Indicator marks on the right edge -->
  <rect x="358" y="342" width="7" height="7" rx="1" fill="#22262a" />
  <rect x="358" y="356" width="7" height="7" rx="1" fill="#22262a" />
`;
/** Column geometry shared by every row. */
const LABEL_X = LX$3 + 14;
const VALUE_RIGHT = LX$3 + 196;
const PM2200 = {
    id: "schneider-pm2200",
    name: "Schneider EasyLogic PM2200",
    description: "Square panel-mount analyser: pale LCD with a title band, four labelled rows and a soft-key legend over four push keys.",
    emulates: "Schneider Electric EasyLogic PM2200",
    card: "bms-meter-card",
    render: "svg",
    display: "positive",
    size: [W$a, H$a],
    artNode: CHASSIS$8,
    pages: ["summary", "amps", "volts", "power"],
    regions: [
        // -- Summary: what the unit shows on its total page ----------------
        { id: "s-v", role: "volts_avg", kind: "text", page: "summary",
            x: LABEL_X, y: ROWS[0], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "V avg", decimals: 1, size: 26 },
        { id: "s-i", role: "current_avg", kind: "text", page: "summary",
            x: LABEL_X, y: ROWS[1], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "I avg", decimals: 2, size: 26 },
        { id: "s-p", role: "power_total", kind: "text", page: "summary",
            x: LABEL_X, y: ROWS[2], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "P total", decimals: 2, size: 26 },
        { id: "s-e", role: "energy_total", kind: "text", page: "summary",
            x: LABEL_X, y: ROWS[3], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "E total", decimals: 1, size: 26 },
        // -- Per-phase current --------------------------------------------
        { id: "i1", role: "current_l1", kind: "text", page: "amps",
            x: LABEL_X, y: ROWS[0], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "I1", decimals: 2, size: 26 },
        { id: "i2", role: "current_l2", kind: "text", page: "amps",
            x: LABEL_X, y: ROWS[1], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "I2", decimals: 2, size: 26 },
        { id: "i3", role: "current_l3", kind: "text", page: "amps",
            x: LABEL_X, y: ROWS[2], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "I3", decimals: 2, size: 26 },
        { id: "iavg", role: "current_avg", kind: "text", page: "amps",
            x: LABEL_X, y: ROWS[3], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "I avg", decimals: 2, size: 26 },
        // -- Per-phase voltage ---------------------------------------------
        { id: "u1", role: "volts_l1", kind: "text", page: "volts",
            x: LABEL_X, y: ROWS[0], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "V1-N", decimals: 1, size: 26 },
        { id: "u2", role: "volts_l2", kind: "text", page: "volts",
            x: LABEL_X, y: ROWS[1], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "V2-N", decimals: 1, size: 26 },
        { id: "u3", role: "volts_l3", kind: "text", page: "volts",
            x: LABEL_X, y: ROWS[2], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "V3-N", decimals: 1, size: 26 },
        { id: "uavg", role: "volts_avg", kind: "text", page: "volts",
            x: LABEL_X, y: ROWS[3], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "V avg", decimals: 1, size: 26 },
        // -- Power ----------------------------------------------------------
        { id: "pw1", role: "power_l1", kind: "text", page: "power",
            x: LABEL_X, y: ROWS[0], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "P1", decimals: 2, size: 26 },
        { id: "pw2", role: "power_l2", kind: "text", page: "power",
            x: LABEL_X, y: ROWS[1], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "P2", decimals: 2, size: 26 },
        { id: "pw3", role: "power_l3", kind: "text", page: "power",
            x: LABEL_X, y: ROWS[2], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "P3", decimals: 2, size: 26 },
        { id: "pwf", role: "power_factor", kind: "text", page: "power",
            x: LABEL_X, y: ROWS[3], w: VALUE_RIGHT - LABEL_X, align: "end",
            label: "PF", decimals: 2, size: 26 },
        // -- Chrome: title band and soft-key legend -------------------------
        { id: "t-sum", role: "", kind: "text", page: "summary", text: "Total",
            x: LX$3, y: LY$3 - 2, w: LW$3, align: "middle", size: 15 },
        { id: "t-amp", role: "", kind: "text", page: "amps", text: "Current",
            x: LX$3, y: LY$3 - 2, w: LW$3, align: "middle", size: 15 },
        { id: "t-vol", role: "", kind: "text", page: "volts", text: "Voltage",
            x: LX$3, y: LY$3 - 2, w: LW$3, align: "middle", size: 15 },
        { id: "t-pow", role: "", kind: "text", page: "power", text: "Power",
            x: LX$3, y: LY$3 - 2, w: LW$3, align: "middle", size: 15 },
        { id: "sk1", role: "", kind: "text", text: "I",
            x: LX$3 + 6, y: LY$3 + LH$3 - 24, w: 60, align: "middle", size: 13 },
        { id: "sk2", role: "", kind: "text", text: "U-V",
            x: LX$3 + 66, y: LY$3 + LH$3 - 24, w: 60, align: "middle", size: 13 },
        { id: "sk3", role: "", kind: "text", text: "PQS",
            x: LX$3 + 126, y: LY$3 + LH$3 - 24, w: 60, align: "middle", size: 13 },
        { id: "sk4", role: "", kind: "text", text: "\u25b6",
            x: LX$3 + 186, y: LY$3 + LH$3 - 24, w: 60, align: "middle", size: 13 },
        // -- Keys, under the soft-key legend --------------------------------
        { id: "k1", role: "", kind: "button", x: KEY_X[0] - 26, y: KEY_Y - 21,
            w: 52, h: 42, text: "", action: "page", target: "amps" },
        { id: "k2", role: "", kind: "button", x: KEY_X[1] - 26, y: KEY_Y - 21,
            w: 52, h: 42, text: "", action: "page", target: "volts" },
        { id: "k3", role: "", kind: "button", x: KEY_X[2] - 26, y: KEY_Y - 21,
            w: 52, h: 42, text: "", action: "page", target: "power" },
        { id: "k4", role: "", kind: "button", x: KEY_X[3] - 26, y: KEY_Y - 21,
            w: 52, h: 42, text: "", action: "page", target: "summary" },
    ],
};

/**
 * Generic three-phase meter faceplate.
 *
 * Not modelled on any particular product: a plain single-page readout for
 * boards where the physical meter is unknown or unremarkable. Exists partly
 * to prove the point of the engine — this file is data, and adding it
 * required no change to the card or the renderer.
 */
const W$9 = 460;
const H$9 = 260;
const CHASSIS$7 = w `
  <defs>
    <linearGradient id="g3p-case" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a5159" />
      <stop offset="100%" stop-color="#343a40" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W$9}" height="${H$9}" rx="10" fill="url(#g3p-case)" />
  <rect x="14" y="14" width="${W$9 - 28}" height="${H$9 - 28}" rx="6"
        fill="#151b17" stroke="#090c0a" stroke-width="2" />
  <line x1="14" y1="110" x2="${W$9 - 14}" y2="110" stroke="#3c4a40" stroke-width="1" />
  <line x1="14" y1="186" x2="${W$9 - 14}" y2="186" stroke="#3c4a40" stroke-width="1" />
`;
const GENERIC_3PHASE = {
    id: "generic-3phase",
    name: "Generic 3-phase meter",
    description: "Single-page readout for boards where the physical meter is unknown.",
    card: "bms-meter-card",
    render: "svg",
    display: "negative",
    size: [W$9, H$9],
    artNode: CHASSIS$7,
    regions: [
        { id: "etot", role: "energy_total", kind: "text",
            x: 34, y: 34, w: 390, label: "Total energy", unit: "kWh",
            decimals: 1, size: 40 },
        { id: "ptot", role: "power_total", kind: "text",
            x: 34, y: 124, w: 180, label: "Power", unit: "kW", decimals: 2, size: 28 },
        { id: "pf", role: "power_factor", kind: "text",
            x: 250, y: 124, w: 174, label: "Power factor", decimals: 2, size: 28 },
        { id: "v1", role: "volts_l1", kind: "text",
            x: 34, y: 200, w: 120, label: "L1-N", unit: "V", decimals: 0, size: 22 },
        { id: "v2", role: "volts_l2", kind: "text",
            x: 174, y: 200, w: 120, label: "L2-N", unit: "V", decimals: 0, size: 22 },
        { id: "v3", role: "volts_l3", kind: "text",
            x: 314, y: 200, w: 110, label: "L3-N", unit: "V", decimals: 0, size: 22 },
    ],
};

/**
 * DIN-rail three-phase analyser faceplate.
 *
 * The portrait form factor used by compact DIN-mounted power analysers —
 * Circutor's CVM-E3-Mini among them: a narrow housing, a stacked three-line
 * display showing one phase per row, and a small key cluster beneath.
 *
 * Deliberately *not* named after a specific model. It is drawn from the
 * general shape of this class of unit, not from a photograph of one, and
 * naming it after a product it does not accurately resemble is the wrong
 * kind of confident. A model-accurate faceplate needs a straight-on
 * photograph and the manual — see the request template in the README.
 */
// Roughly 3 DIN modules wide by 90mm tall, kept in proportion.
const W$8 = 230;
const H$8 = 380;
const CHASSIS$6 = w `
  <defs>
    <linearGradient id="din3p-case" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5b626a" />
      <stop offset="55%" stop-color="#474d54" />
      <stop offset="100%" stop-color="#3a4046" />
    </linearGradient>
    <linearGradient id="din3p-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cbd8b4" />
      <stop offset="100%" stop-color="#b6c69d" />
    </linearGradient>
  </defs>

  <!-- Housing with the stepped DIN profile -->
  <rect x="0" y="22" width="${W$8}" height="${H$8 - 44}" rx="6" fill="url(#din3p-case)" />
  <rect x="18" y="0" width="${W$8 - 36}" height="30" rx="3" fill="#333940" />
  <rect x="18" y="${H$8 - 30}" width="${W$8 - 36}" height="30" rx="3" fill="#333940" />

  <!-- Terminal detail, top and bottom -->
  ${[0, 1, 2, 3].map((i) => w `<rect x="${26 + i * 45}" y="4" width="34" height="20" rx="2" fill="#23282d" />`)}
  ${[0, 1, 2, 3].map((i) => w `<rect x="${26 + i * 45}" y="${H$8 - 26}" width="34" height="20" rx="2" fill="#23282d" />`)}

  <!-- Display -->
  <rect x="20" y="52" width="${W$8 - 40}" height="168" rx="3" fill="url(#din3p-lcd)" />
  <rect x="20" y="52" width="${W$8 - 40}" height="168" rx="3"
        fill="none" stroke="#1d2226" stroke-width="3" />
  <line x1="28" y1="108" x2="${W$8 - 28}" y2="108" stroke="#9fae88" stroke-width="1" />
  <line x1="28" y1="164" x2="${W$8 - 28}" y2="164" stroke="#9fae88" stroke-width="1" />

  <!-- Key cluster -->
  <rect x="20" y="234" width="${W$8 - 40}" height="62" rx="4" fill="#2e343a" />
`;
const DIN_3PHASE = {
    id: "din-3phase-analyser",
    name: "DIN-rail 3-phase analyser",
    description: "Portrait DIN-mounted analyser with a stacked per-phase display. Generic to the form factor, not modelled on a specific product.",
    card: "bms-meter-card",
    render: "svg",
    display: "positive",
    size: [W$8, H$8],
    artNode: CHASSIS$6,
    pages: ["volts", "amps", "power"],
    regions: [
        // Three stacked rows, one per phase, the way these units read.
        { id: "r1", role: "volts_l1", kind: "text", page: "volts",
            x: 34, y: 62, w: 162, label: "L1", unit: "V", decimals: 1, size: 30 },
        { id: "r2", role: "volts_l2", kind: "text", page: "volts",
            x: 34, y: 118, w: 162, label: "L2", unit: "V", decimals: 1, size: 30 },
        { id: "r3", role: "volts_l3", kind: "text", page: "volts",
            x: 34, y: 174, w: 162, label: "L3", unit: "V", decimals: 1, size: 30 },
        { id: "a1", role: "current_l1", kind: "text", page: "amps",
            x: 34, y: 62, w: 162, label: "L1", unit: "A", decimals: 2, size: 30 },
        { id: "a2", role: "current_l2", kind: "text", page: "amps",
            x: 34, y: 118, w: 162, label: "L2", unit: "A", decimals: 2, size: 30 },
        { id: "a3", role: "current_l3", kind: "text", page: "amps",
            x: 34, y: 174, w: 162, label: "L3", unit: "A", decimals: 2, size: 30 },
        { id: "pt", role: "power_total", kind: "text", page: "power",
            x: 34, y: 62, w: 162, label: "Total", unit: "kW", decimals: 2, size: 30 },
        { id: "pf", role: "power_factor", kind: "text", page: "power",
            x: 34, y: 118, w: 162, label: "PF", decimals: 2, size: 30 },
        { id: "en", role: "energy_total", kind: "text", page: "power",
            x: 34, y: 174, w: 162, label: "Energy", unit: "kWh", decimals: 0, size: 30 },
        { id: "k1", role: "", kind: "button", x: 32, y: 246, w: 52, h: 34,
            text: "V", action: "page", target: "volts" },
        { id: "k2", role: "", kind: "button", x: 92, y: 246, w: 52, h: 34,
            text: "A", action: "page", target: "amps" },
        { id: "k3", role: "", kind: "button", x: 152, y: 246, w: 52, h: 34,
            text: "kW", action: "page", target: "power" },
        { id: "lampL1", role: "volts_l1", kind: "lamp",
            x: 40, y: 310, w: 14, label: "L1", on: "#5fd87a" },
        { id: "lampL2", role: "volts_l2", kind: "lamp",
            x: 100, y: 310, w: 14, label: "L2", on: "#5fd87a" },
        { id: "lampL3", role: "volts_l3", kind: "lamp",
            x: 160, y: 310, w: 14, label: "L3", on: "#5fd87a" },
    ],
};

/**
 * Circutor CVM-E3-MINI faceplate.
 *
 * Drawn from a straight-on photograph of a CVM-E3-MINI-WiEth: a light grey
 * panel-mount bezel, a black negative LCD carrying three right-aligned
 * values with their magnitude and unit printed to the right, an annunciator
 * column down the left edge, and a four-key bezel beneath — power glyph,
 * left arrow, a wide menu key, right arrow.
 *
 * The three default rows are active, apparent and reactive power, which is
 * what the unit shows on its power page.
 */
const W$7 = 400;
const H$7 = 330;
const LCD_TOP = 50;
const LCD_H = 196;
const CHASSIS$5 = w `
  <defs>
    <linearGradient id="cvm-bezel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f2f2f0" />
      <stop offset="55%" stop-color="#e2e2df" />
      <stop offset="100%" stop-color="#cdcdc9" />
    </linearGradient>
    <linearGradient id="cvm-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#161a17" />
      <stop offset="100%" stop-color="#0b0d0b" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="${W$7}" height="${H$7}" rx="7" fill="url(#cvm-bezel)" />
  <rect x="1" y="1" width="${W$7 - 2}" height="${H$7 - 2}" rx="6"
        fill="none" stroke="#b4b4b0" stroke-width="1" />

  <!-- Brand strip. Wordmarks belong to their owners; see TRADEMARKS.md. -->
  <text class="cvm-brand" x="18" y="34">Circutor</text>
  <text class="cvm-model" x="${W$7 - 18}" y="33" text-anchor="end">CVM-E3-MINI-WiEth</text>

  <!-- Display, recessed -->
  <rect x="12" y="${LCD_TOP}" width="${W$7 - 24}" height="${LCD_H}" rx="3"
        fill="url(#cvm-lcd)" stroke="#9a9a96" stroke-width="2" />

  <!-- Annunciator column -->
  <text class="cvm-annun teal" x="26" y="78">&#9660;&#952;</text>
  <text class="cvm-annun teal" x="26" y="94">T1</text>
  <text class="cvm-annun" x="26" y="150">inst</text>
  <g class="cvm-annun-icon" transform="translate(26 196)">
    <path d="M0 8 A11 11 0 0 1 16 8" fill="none" stroke="#3fbfa8" stroke-width="2.2" />
    <path d="M3.5 12 A6.5 6.5 0 0 1 12.5 12" fill="none" stroke="#3fbfa8" stroke-width="2.2" />
    <circle cx="8" cy="16.5" r="2" fill="#3fbfa8" />
  </g>

  <!-- Phase-count marks, as on the unit -->
  <g stroke="#e9efe7" stroke-width="2.4">
    <line x1="352" y1="70" x2="352" y2="82" />
    <line x1="358" y1="70" x2="358" y2="82" />
    <line x1="364" y1="70" x2="364" y2="82" />
  </g>

  <!-- Key bezel -->
  <g class="cvm-glyph">
    <circle cx="30" cy="291" r="9" fill="none" stroke="#6c7075" stroke-width="2" />
    <line x1="30" y1="279" x2="30" y2="290" stroke="#6c7075" stroke-width="2" />
    <text x="352" y="298" class="cvm-annun dark">(&#8226;)</text>
  </g>
`;
const CVM_E3_MINI = {
    id: "circutor-cvm-e3-mini",
    name: "Circutor CVM-E3-MINI",
    description: "Panel-mount three-phase analyser: negative LCD with three stacked values, magnitude and unit to the right, four-key bezel.",
    emulates: "Circutor CVM-E3-MINI-WiEth",
    card: "bms-meter-card",
    render: "svg",
    display: "negative",
    size: [W$7, H$7],
    artNode: CHASSIS$5,
    pages: ["power", "volts", "amps", "energy"],
    regions: [
        // -- Power page: the unit's default view ---------------------------
        { id: "p-w", role: "power_total", kind: "text", page: "power",
            x: 70, y: 66, w: 232, align: "end", unit: "", decimals: 2, size: 42 },
        { id: "p-va", role: "apparent_power", kind: "text", page: "power",
            x: 70, y: 124, w: 232, align: "end", decimals: 2, size: 42 },
        { id: "p-var", role: "reactive_power", kind: "text", page: "power",
            x: 70, y: 180, w: 232, align: "end", decimals: 2, size: 42 },
        // -- Volts ---------------------------------------------------------
        { id: "v1", role: "volts_l1", kind: "text", page: "volts",
            x: 70, y: 66, w: 232, align: "end", decimals: 1, size: 42 },
        { id: "v2", role: "volts_l2", kind: "text", page: "volts",
            x: 70, y: 124, w: 232, align: "end", decimals: 1, size: 42 },
        { id: "v3", role: "volts_l3", kind: "text", page: "volts",
            x: 70, y: 180, w: 232, align: "end", decimals: 1, size: 42 },
        // -- Amps ----------------------------------------------------------
        { id: "a1", role: "current_l1", kind: "text", page: "amps",
            x: 70, y: 66, w: 232, align: "end", decimals: 2, size: 42 },
        { id: "a2", role: "current_l2", kind: "text", page: "amps",
            x: 70, y: 124, w: 232, align: "end", decimals: 2, size: 42 },
        { id: "a3", role: "current_l3", kind: "text", page: "amps",
            x: 70, y: 180, w: 232, align: "end", decimals: 2, size: 42 },
        // -- Energy --------------------------------------------------------
        { id: "e-tot", role: "energy_total", kind: "text", page: "energy",
            x: 70, y: 82, w: 232, align: "end", decimals: 1, size: 44 },
        { id: "e-pf", role: "power_factor", kind: "text", page: "energy",
            x: 70, y: 160, w: 232, align: "end", decimals: 2, size: 36 },
        // -- Keys ----------------------------------------------------------
        { id: "k-prev", role: "", kind: "button",
            x: 86, y: 272, w: 40, h: 40, text: "‹", action: "prev_page" },
        { id: "k-menu", role: "", kind: "button",
            x: 146, y: 274, w: 108, h: 36, text: "☰", action: "next_page" },
        { id: "k-next", role: "", kind: "button",
            x: 274, y: 272, w: 40, h: 40, text: "›", action: "next_page" },
    ],
};

/**
 * Mechanical multi-jet water meter register.
 *
 * Drawn from a photograph: a brass register housing over a white dial, with
 * a seven-digit odometer whose last cell is the highlighted decade and
 * four sweep dials of decreasing
 * significance across the bottom.
 *
 * This is the first faceplate where several regions share one role. A
 * mechanical register shows a single cumulative total spread across the
 * odometer and the dials; each region takes `volume_total` and differs only
 * in the decade it reads. Nothing is derived or summed — they are five
 * windows onto one number, which is exactly how the real thing works.
 */
const W$6 = 400;
const H$6 = 400;
const CX$1 = 200;
const CY$1 = 200;
const DIAL_Y = 286;
const DIAL_R = 27;
// The odometer reads whole units; the dials read below it. On a real
// register the x1 hand tracks the odometer's last digit, which is why it is
// kept rather than treated as a duplicate.
const DIALS = [
    { id: "d1", x: 104, scale: 1, label: "x1" },
    { id: "d01", x: 168, scale: 0.1, label: "x0.1" },
    { id: "d001", x: 232, scale: 0.01, label: "x0.01" },
    { id: "d0001", x: 296, scale: 0.001, label: "x0.001" },
];
const CHASSIS$4 = w `
  <defs>
    <linearGradient id="mj-brass" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="#e8d9a6" />
      <stop offset="35%" stop-color="#c9ad63" />
      <stop offset="70%" stop-color="#a98d45" />
      <stop offset="100%" stop-color="#d6c187" />
    </linearGradient>
    <radialGradient id="mj-face" cx="0.4" cy="0.32" r="0.85">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="85%" stop-color="#f2efe6" />
      <stop offset="100%" stop-color="#e2ded1" />
    </radialGradient>
  </defs>

  <!-- Brass housing -->
  <circle cx="${CX$1}" cy="${CY$1}" r="192" fill="url(#mj-brass)" />
  <circle cx="${CX$1}" cy="${CY$1}" r="192" fill="none" stroke="#8a7133" stroke-width="2" />
  <circle cx="${CX$1}" cy="${CY$1}" r="176" fill="none" stroke="#8a7133" stroke-width="1.2" />

  <!-- Knurling around the bezel -->
  <g stroke="#9c8138" stroke-width="1.6">
    ${[...Array(60).keys()].map((i) => {
    const a = (i / 60) * Math.PI * 2;
    return w `<line
        x1="${CX$1 + Math.cos(a) * 178}" y1="${CY$1 + Math.sin(a) * 178}"
        x2="${CX$1 + Math.cos(a) * 190}" y2="${CY$1 + Math.sin(a) * 190}" />`;
})}
  </g>

  <!-- Dial face -->
  <circle cx="${CX$1}" cy="${CY$1}" r="170" fill="url(#mj-face)" />

  <text class="mj-brand" x="${CX$1}" y="78" text-anchor="middle">MEASURED AUTOMATION</text>

  <!-- Odometer surround -->
  <rect x="88" y="110" width="224" height="42" rx="3"
        fill="#2b2b28" stroke="#15150f" stroke-width="1.5" />


  <!-- Specification block, as printed on the face -->
  <g class="mj-spec">
    <text x="64" y="206">Multi-jet</text>
    <text x="64" y="220">Model: MJ</text>
    <text x="64" y="234">Size: 5/8" x 1/2"</text>
    <text x="64" y="248">100&#176;F  150 PSI</text>
  </g>
`;
const MULTIJET_REGISTER = {
    id: "multijet-water-register",
    name: "Multi-jet water register",
    description: "Mechanical register: seven-digit odometer over four sweep dials, all reading one cumulative total.",
    emulates: "Multi-jet mechanical water meter register",
    card: "bms-meter-card",
    render: "svg",
    display: "positive",
    size: [W$6, H$6],
    artNode: CHASSIS$4,
    regions: [
        // The odometer and every dial read the same role at different decades.
        // Seven digits at whole units. Five at x100 lost the reading entirely:
        // a meter at 88,985 litres showed 00889, which is neither the total nor
        // anything anyone could act on.
        { id: "odo", role: "volume_total", kind: "odometer",
            x: 92, y: 114, w: 216, h: 34, digits: 7, redDigits: 1, scale: 1 },
        // The unit comes from whatever is bound, not from the artwork.
        { id: "units", role: "volume_total", kind: "text", show: "unit",
            x: CX$1 - 100, y: 164, w: 200, align: "middle", size: 14, text: "UNITS" },
        { id: "mult", role: "", kind: "text", text: "x1",
            x: 316, y: 120, w: 40, align: "start", size: 14 },
        ...DIALS.map((dial) => ({
            id: dial.id,
            role: "volume_total",
            kind: "needle",
            x: dial.x,
            y: DIAL_Y,
            r: DIAL_R,
            scale: dial.scale,
            label: dial.label,
        })),
    ],
};

/**
 * Daikin BRC1H63K (Madoka) faceplate.
 *
 * Drawn from a photograph of a wall-mounted unit: a cream square backplate,
 * a glossy round black face inset into it, an illuminated ring around the
 * circumference, and a dark display carrying the mode, the room label and a
 * large temperature in cyan. Three capacitive keys sit below the display —
 * minus, a circle, plus.
 *
 * The ring is lit whenever the unit is running and dark when it is off,
 * which is what the photographed unit shows. Real firmware also varies the
 * colour; that is not reproduced because it was not observable from one
 * photograph.
 */
const W$5 = 360;
const H$5 = 400;
const CX = 180;
const CY = 208;
const FACE_R = 132;
const CHASSIS$3 = w `
  <defs>
    <linearGradient id="madoka-plate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eeece6" />
      <stop offset="100%" stop-color="#ddd9d0" />
    </linearGradient>
    <radialGradient id="madoka-face" cx="0.35" cy="0.25" r="0.9">
      <stop offset="0%" stop-color="#2a2f35" />
      <stop offset="45%" stop-color="#111418" />
      <stop offset="100%" stop-color="#05070a" />
    </radialGradient>
  </defs>

  <!-- Wall plate -->
  <rect x="26" y="26" width="${W$5 - 52}" height="${H$5 - 52}" rx="8"
        fill="url(#madoka-plate)" stroke="#c7c2b8" stroke-width="1.5" />

  <!-- Brand, top-left of the plate as on the unit -->
  <g transform="translate(58 66)">
    <path d="M0 0 L13 0 L6.5 11 Z" fill="#2d3238" />
    <text class="madoka-brand" x="19" y="9">DAIKIN</text>
  </g>

  <!-- Round face -->
  <circle cx="${CX}" cy="${CY}" r="${FACE_R}" fill="url(#madoka-face)" />
  <circle cx="${CX}" cy="${CY}" r="${FACE_R - 10}" fill="none"
          stroke="#0a0d11" stroke-width="2" />

  <!-- Specular highlight, so the glass reads as glass -->
  <ellipse cx="${CX - 34}" cy="${CY - 74}" rx="62" ry="26"
           fill="#ffffff" opacity="0.06" />
`;
const MADOKA_BRC1H = {
    id: "daikin-brc1h63k",
    name: "Daikin BRC1H63K (Madoka)",
    description: "Round wall controller with an illuminated status ring and a dark display. Mode, room temperature and three touch keys.",
    emulates: "Daikin BRC1H63K Madoka",
    card: "hvac-controller-card",
    render: "svg",
    display: "negative",
    size: [W$5, H$5],
    artNode: CHASSIS$3,
    regions: [
        // Status ring, drawn over the face edge.
        { id: "ring", role: "hvac_mode", kind: "ring",
            x: CX, y: CY, r: FACE_R - 4, stroke: 7, on: "#2f8fff", off: "#161b21" },
        { id: "mode", role: "hvac_mode", kind: "text",
            x: CX - 90, y: CY - 78, w: 180, align: "middle", size: 19 },
        { id: "roomlabel", role: "", kind: "text", text: "Room",
            x: CX - 92, y: CY - 44, w: 70, align: "start", size: 15 },
        // unit: "" because the faceplate prints the degree glyph separately.
        { id: "temp", role: "room_temp", kind: "text",
            x: CX - 96, y: CY - 26, w: 172, align: "middle", unit: "",
            decimals: 0, size: 68 },
        { id: "unit", role: "", kind: "text", text: "°C",
            x: CX + 78, y: CY - 18, w: 34, align: "start", size: 20 },
        // Fan and swing annunciators, bottom-left of the display area.
        { id: "fan", role: "fan_speed", kind: "text",
            x: CX - 96, y: CY + 6, w: 80, align: "start", size: 14,
            placeholder: "" },
        { id: "swing", role: "swing", kind: "text",
            x: CX - 96, y: CY + 26, w: 80, align: "start", size: 14,
            placeholder: "" },
        // Setpoint, smaller, to the right of the room reading.
        { id: "sp", role: "setpoint", kind: "text",
            x: CX + 6, y: CY + 6, w: 90, align: "end", label: "Set",
            decimals: 0, size: 18 },
        // Touch keys.
        { id: "minus", role: "", kind: "button",
            x: CX - 74, y: CY + 62, w: 44, h: 34, text: "−", action: "temp_down" },
        { id: "power", role: "", kind: "button",
            x: CX - 22, y: CY + 62, w: 44, h: 34, text: "○", action: "power_toggle" },
        { id: "plus", role: "", kind: "button",
            x: CX + 30, y: CY + 62, w: 44, h: 34, text: "+", action: "temp_up" },
    ],
};

/**
 * Daikin BRC1E63 navigation controller faceplate.
 *
 * Drawn from photographs: a white square bezel with the wordmark centred at
 * the top, a landscape positive LCD, and below it four pill keys at the
 * corners around a circular navigation pad with a centre enter key.
 *
 * The display is divided the way the real one is — mode and fan on the left,
 * clock across the top right, and set-point and room temperature side by
 * side beneath it.
 */
const W$4 = 400;
const H$4 = 400;
// Display
const LX$2 = 66;
const LY$2 = 84;
const LW$2 = 268;
const LH$2 = 124;
const SPLIT = LX$2 + 104; // mode column | readings column
const RULE = LY$2 + 34; // under the clock
const MID = SPLIT + (LX$2 + LW$2 - SPLIT) / 2;
const FOOT = LY$2 + LH$2 - 20; // status strip along the bottom
// Keys
const PAD_CX = 200;
const PAD_CY = 296;
const PAD_R = 62;
const PILL_W = 96;
const PILL_H = 30;
const CHASSIS$2 = w `
  <defs>
    <linearGradient id="brc-bezel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbfbfa" />
      <stop offset="60%" stop-color="#f1f1ef" />
      <stop offset="100%" stop-color="#e2e2df" />
    </linearGradient>
    <linearGradient id="brc-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d7dbd0" />
      <stop offset="100%" stop-color="#c8cec0" />
    </linearGradient>
    <linearGradient id="brc-pill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdfdfc" />
      <stop offset="100%" stop-color="#e6e6e3" />
    </linearGradient>
    <radialGradient id="brc-pad" cx="0.4" cy="0.3" r="0.85">
      <stop offset="0%" stop-color="#fdfdfd" />
      <stop offset="78%" stop-color="#eeeeec" />
      <stop offset="100%" stop-color="#dcdcd8" />
    </radialGradient>
  </defs>

  <rect x="0" y="0" width="${W$4}" height="${H$4}" rx="16" fill="url(#brc-bezel)" />
  <rect x="1" y="1" width="${W$4 - 2}" height="${H$4 - 2}" rx="15"
        fill="none" stroke="#d2d2ce" stroke-width="1.5" />

  <!-- Wordmark. Marks belong to their owners; see TRADEMARKS.md. -->
  <g transform="translate(152 44)">
    <path d="M0 0 L17 0 L8.5 14 Z" fill="#2f3439" />
    <text class="brc-brand" x="24" y="13">DAIKIN</text>
  </g>

  <!-- Display -->
  <rect x="${LX$2 - 4}" y="${LY$2 - 4}" width="${LW$2 + 8}" height="${LH$2 + 8}" rx="3"
        fill="#b3b8ac" />
  <rect x="${LX$2}" y="${LY$2}" width="${LW$2}" height="${LH$2}" fill="url(#brc-lcd)" />
  <line x1="${SPLIT}" y1="${LY$2}" x2="${SPLIT}" y2="${FOOT}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${SPLIT}" y1="${RULE}" x2="${LX$2 + LW$2}" y2="${RULE}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${MID}" y1="${RULE}" x2="${MID}" y2="${FOOT}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${LX$2}" y1="${FOOT}" x2="${LX$2 + LW$2}" y2="${FOOT}" stroke="#8d9788" stroke-width="1.5" />

  <!-- Fan and swing glyphs, as printed on the display -->
  <g transform="translate(${LX$2 + 12} ${LY$2 + 62})" fill="#26302a">
    <circle cx="6" cy="6" r="5.5" fill="none" stroke="#26302a" stroke-width="1.6" />
    <path d="M6 1.5 C9 3 9 6 6 6 C3 6 3 9 6 10.5" fill="none"
          stroke="#26302a" stroke-width="1.6" />
  </g>
  <g transform="translate(${LX$2 + 54} ${LY$2 + 60})" stroke="#26302a" stroke-width="1.6" fill="none">
    <path d="M0 8 L14 2" stroke-dasharray="3 2.5" />
    <rect x="16" y="0" width="11" height="6" rx="1.5" />
  </g>

  <!-- Pill keys -->
  <g>
    <rect x="46" y="228" width="${PILL_W}" height="${PILL_H}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="${W$4 - 46 - PILL_W}" y="228" width="${PILL_W}" height="${PILL_H}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="46" y="332" width="${PILL_W}" height="${PILL_H}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="${W$4 - 46 - PILL_W}" y="332" width="${PILL_W}" height="${PILL_H}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
  </g>

  <!-- Key glyphs -->
  <g fill="#3a4046" stroke="none">
    <text class="brc-glyph" x="94" y="249" text-anchor="middle">&#10052; &#9788;</text>
    <text class="brc-glyph" x="94" y="353" text-anchor="middle">&#10052;&#10052;</text>
    <text class="brc-glyph" x="306" y="353" text-anchor="middle">&#8635;</text>
  </g>
  <g transform="translate(${W$4 - 46 - PILL_W / 2} 243)" stroke="#3a4046"
     stroke-width="1.8" fill="none">
    <circle cx="0" cy="0" r="7" />
    <line x1="0" y1="-10" x2="0" y2="-1" />
  </g>

  <!-- Navigation pad -->
  <circle cx="${PAD_CX}" cy="${PAD_CY}" r="${PAD_R}" fill="url(#brc-pad)"
          stroke="#cfcfca" stroke-width="1.5" />
  <circle cx="${PAD_CX}" cy="${PAD_CY}" r="${PAD_R - 6}" fill="none"
          stroke="#e6e6e2" stroke-width="1" />
  <circle cx="${PAD_CX}" cy="${PAD_CY}" r="27" fill="#fbfbfa"
          stroke="#d0d0cb" stroke-width="1.5" />
  <text class="brc-enter" x="${PAD_CX}" y="${PAD_CY + 7}" text-anchor="middle">&#8629;</text>

  <!-- Pad direction marks -->
  <g fill="#8b9097">
    <polygon points="${PAD_CX - 6},${PAD_CY - 40} ${PAD_CX + 6},${PAD_CY - 40} ${PAD_CX},${PAD_CY - 50}" />
    <polygon points="${PAD_CX - 6},${PAD_CY + 40} ${PAD_CX + 6},${PAD_CY + 40} ${PAD_CX},${PAD_CY + 50}" />
    <polygon points="${PAD_CX - 40},${PAD_CY - 6} ${PAD_CX - 40},${PAD_CY + 6} ${PAD_CX - 50},${PAD_CY}" />
    <polygon points="${PAD_CX + 40},${PAD_CY - 6} ${PAD_CX + 40},${PAD_CY + 6} ${PAD_CX + 50},${PAD_CY}" />
  </g>
`;
const BRC1E63 = {
    id: "daikin-brc1e63",
    name: "Daikin BRC1E63",
    description: "Wired navigation controller: landscape LCD with mode, clock, set point and room temperature, over four pill keys and a navigation pad.",
    emulates: "Daikin BRC1E63 / BRC1E53 navigation remote controller",
    card: "hvac-controller-card",
    render: "svg",
    display: "positive",
    size: [W$4, H$4],
    artNode: CHASSIS$2,
    regions: [
        // -- Left column: mode and fan -------------------------------------
        { id: "mode", role: "hvac_mode", kind: "text",
            x: LX$2 + 10, y: LY$2 + 8, w: 88, align: "start", size: 22 },
        { id: "fan", role: "fan_speed", kind: "text",
            x: LX$2 + 26, y: LY$2 + 58, w: 24, align: "start", size: 13,
            placeholder: "" },
        // -- Clock ----------------------------------------------------------
        { id: "clock", role: "clock", kind: "text",
            x: SPLIT, y: LY$2 + 4, w: LX$2 + LW$2 - SPLIT, align: "middle", size: 22 },
        // -- Set point and room, side by side -------------------------------
        { id: "sp-label", role: "", kind: "text", text: "Set temp",
            x: SPLIT + 4, y: RULE + 2, w: MID - SPLIT - 8, align: "start", size: 11 },
        { id: "sp", role: "setpoint", kind: "text",
            x: SPLIT + 4, y: RULE + 18, w: MID - SPLIT - 8, align: "middle",
            unit: "°C", decimals: 0, size: 26 },
        { id: "room-label", role: "", kind: "text", text: "Room",
            x: MID + 4, y: RULE + 2, w: LX$2 + LW$2 - MID - 8, align: "start", size: 11 },
        { id: "room", role: "room_temp", kind: "text",
            x: MID + 4, y: RULE + 18, w: LX$2 + LW$2 - MID - 8, align: "middle",
            unit: "°C", decimals: 0, size: 26 },
        // -- Status strip ----------------------------------------------------
        { id: "status", role: "hvac_action", kind: "text",
            x: LX$2 + 8, y: FOOT + 1, w: LW$2 - 16, align: "start", size: 12,
            placeholder: "" },
        // -- Keys -------------------------------------------------------------
        { id: "k-mode", role: "", kind: "button",
            x: 46, y: 228, w: PILL_W, h: PILL_H, text: "", action: "mode_cycle" },
        { id: "k-power", role: "", kind: "button",
            x: W$4 - 46 - PILL_W, y: 228, w: PILL_W, h: PILL_H, text: "", action: "power_toggle" },
        { id: "k-fan", role: "", kind: "button",
            x: 46, y: 332, w: PILL_W, h: PILL_H, text: "", action: "fan_cycle" },
        { id: "k-up", role: "", kind: "button",
            x: PAD_CX - 22, y: PAD_CY - 58, w: 44, h: 30, text: "", action: "temp_up" },
        { id: "k-down", role: "", kind: "button",
            x: PAD_CX - 22, y: PAD_CY + 28, w: 44, h: 30, text: "", action: "temp_down" },
    ],
};

/**
 * Daikin BRC315D7 schedule controller faceplate.
 *
 * Drawn from photographs of the unit with its cover closed, which is how it
 * looks on a wall: a cream square body with ventilation slots at the top
 * left, the wordmark beside them, an ON/OFF key and indicator at the top
 * right, a wide segmented LCD across the upper third, and the blank hinged
 * cover filling the lower half.
 *
 * The keypad behind that cover is not drawn. It carries two dozen small
 * keys for commissioning and scheduling, none of which a dashboard should
 * be offering, and showing it open would misrepresent the unit's resting
 * appearance.
 */
const W$3 = 400;
const H$3 = 400;
const LX$1 = 30;
const LY$1 = 92;
const LW$1 = 340;
const LH$1 = 96;
const CHASSIS$1 = w `
  <defs>
    <linearGradient id="brc315-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f6f4ee" />
      <stop offset="100%" stop-color="#e6e2d8" />
    </linearGradient>
    <linearGradient id="brc315-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cfd8bf" />
      <stop offset="100%" stop-color="#bcc7aa" />
    </linearGradient>
    <linearGradient id="brc315-cover" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f8f6f1" />
      <stop offset="100%" stop-color="#e9e5db" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${W$3}" height="${H$3}" rx="12" fill="url(#brc315-body)" />
  <rect x="1" y="1" width="${W$3 - 2}" height="${H$3 - 2}" rx="11"
        fill="none" stroke="#d6d1c5" stroke-width="1.5" />
  <!-- Ventilation slots -->
  <g fill="#cfcabd">
    ${[0, 1, 2, 3, 4, 5].map((i) => w `<rect x="${34 + i * 9}" y="26" width="4" height="22" rx="2" />`)}
  </g>
  <!-- Wordmark -->
  <g transform="translate(34 62)">
    <path d="M0 0 L12 0 L6 10 Z" fill="#3a4046" />
    <text class="brc315-brand" x="17" y="9">DAIKIN</text>
  </g>
  <!-- ON/OFF cluster, top right -->
  <g transform="translate(300 34)" stroke="#3a4046" stroke-width="1.6" fill="none">
    <circle cx="6" cy="8" r="6" />
    <line x1="6" y1="0" x2="6" y2="7" />
  </g>
  <text class="brc315-onoff" x="318" y="44">ON/OFF</text>
  <circle cx="246" cy="66" r="5" fill="#6d7a63" />
  <rect x="290" y="58" width="72" height="16" rx="8" fill="#f2d98a" stroke="#d9bf6d" stroke-width="1" />
  <!-- Display -->
  <rect x="${LX$1 - 3}" y="${LY$1 - 3}" width="${LW$1 + 6}" height="${LH$1 + 6}" rx="3" fill="#9aa48d" />
  <rect x="${LX$1}" y="${LY$1}" width="${LW$1}" height="${LH$1}" fill="url(#brc315-lcd)" />
  <!-- Schedule ring, left of the display -->
  <g transform="translate(${LX$1 + 44} ${LY$1 + 52})">
    <circle cx="0" cy="0" r="30" fill="none" stroke="#7f8a74" stroke-width="1.4" />
    ${[0, 3, 6, 9, 12, 15, 18, 21].map((hour) => {
    const angle = (hour / 24) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * 37;
    const y = Math.sin(angle) * 37 + 3;
    return w `<text class="brc315-ring" x="${x}" y="${y}" text-anchor="middle">${hour}</text>`;
})}
    <path d="M-9 -4 a7 7 0 1 0 7 8 a9 9 0 0 1 -7 -8 z" fill="#3d4838" />
    <circle cx="8" cy="6" r="5" fill="none" stroke="#3d4838" stroke-width="1.4" />
  </g>
  <!-- Divider before the temperature block -->
  <line x1="${LX$1 + 208}" y1="${LY$1 + 6}" x2="${LX$1 + 208}" y2="${LY$1 + LH$1 - 6}"
        stroke="#8d9782" stroke-width="1.2" />
  <!-- Mode icon strip, right edge -->
  <g class="brc315-icons">
    <rect x="${LX$1 + 282}" y="${LY$1 + 10}" width="18" height="14" rx="2" fill="none"
          stroke="#3d4838" stroke-width="1.2" />
    <text class="brc315-icon" x="${LX$1 + 291}" y="${LY$1 + 21}" text-anchor="middle">A</text>
    <text class="brc315-icon" x="${LX$1 + 314}" y="${LY$1 + 22}">&#10052;</text>
    <text class="brc315-icon" x="${LX$1 + 314}" y="${LY$1 + 48}">&#9788;</text>
    <text class="brc315-icon" x="${LX$1 + 291}" y="${LY$1 + 48}">&#9832;</text>
  </g>
`;
const BRC315D7 = {
    id: "daikin-brc315d7",
    name: "Daikin BRC315D7",
    description: "Schedule controller, cover closed: wide segmented display with timer rows, temperature and mode icons.",
    emulates: "Daikin BRC315D7 schedule remote controller",
    card: "hvac-controller-card",
    render: "svg",
    display: "positive",
    size: [W$3, H$3],
    artNode: CHASSIS$1,
    regions: [
        { id: "hdr", role: "", kind: "text", text: "ONETIME  DAILY  TIMER",
            x: LX$1 + 84, y: LY$1 + 2, w: 160, align: "start", size: 10 },
        // Timer rows, as the unit lays them out.
        { id: "t1", role: "", kind: "text", text: "--:--",
            x: LX$1 + 92, y: LY$1 + 22, w: 108, align: "middle", size: 22 },
        { id: "t2", role: "", kind: "text", text: "--:--",
            x: LX$1 + 92, y: LY$1 + 58, w: 108, align: "middle", size: 22 },
        // Temperature block.
        // unit: "" — the degree glyph is drawn beside it.
        { id: "sp", role: "setpoint", kind: "text",
            x: LX$1 + 214, y: LY$1 + 14, w: 64, align: "middle", unit: "",
            decimals: 0, size: 38 },
        { id: "spunit", role: "", kind: "text", text: "°C",
            x: LX$1 + 276, y: LY$1 + 38, w: 20, align: "start", size: 12 },
        { id: "room", role: "room_temp", kind: "text",
            x: LX$1 + 214, y: LY$1 + 62, w: 64, align: "middle", label: "",
            decimals: 0, size: 16 },
        { id: "mode", role: "hvac_mode", kind: "text",
            x: LX$1 + 214, y: LY$1 + 80, w: 120, align: "start", size: 11 },
        // The ON/OFF key is the only control on the closed face.
        { id: "k-power", role: "", kind: "button",
            x: 290, y: 56, w: 72, h: 20, text: "", action: "power_toggle" },
    ],
};

/**
 * Vertical multistage pump set (booster skid) faceplate.
 *
 * Drawn from photographs of packaged sets: vertical multistage pumps stood
 * in a row on a galvanised skid, each with a dark motor and fan cowl over a
 * stainless barrel, isolating valves onto a common manifold, a bladder
 * vessel at one end and a control panel on a stand beside them.
 *
 * Unlike the other faceplates this one is **parametric**. A pump set is not
 * one drawing: a duty-assist pair and a six-pump skid are the same equipment
 * at different widths, so the artwork and the regions are built from the
 * pump count rather than drawn once.
 */
const PITCH = 96; // centre-to-centre spacing of the pumps
const LEFT = 56; // skid overhang before the first pump
const PANEL_W = 190; // control panel and vessel at the right
const H$2 = 452;
const SKID_Y = 348; // top of the skid rail
const MANIFOLD_Y = 318; // the common header the pumps discharge into
const MOTOR_Y = 74;
function pumpGraphic(x) {
    return w `
    <!-- Fan cowl -->
    <rect x="${x - 18}" y="${MOTOR_Y - 26}" width="36" height="26" rx="3" fill="#1e2124" />
    <!-- Motor -->
    <rect x="${x - 27}" y="${MOTOR_Y}" width="54" height="96" rx="5" fill="#26292d" />
    <g stroke="#3a3f44" stroke-width="1.4">
      ${[0, 1, 2, 3, 4, 5].map((i) => w `<line x1="${x - 27}" y1="${MOTOR_Y + 14 + i * 13}"
                          x2="${x + 27}" y2="${MOTOR_Y + 14 + i * 13}" />`)}
    </g>
    <!-- Motor stool -->
    <rect x="${x - 17}" y="${MOTOR_Y + 96}" width="34" height="22" rx="2" fill="#2f3337" />
    <!-- Stainless barrel -->
    <rect x="${x - 21}" y="${MOTOR_Y + 118}" width="42" height="126" rx="4"
          fill="url(#ps-steel)" stroke="#8e969c" stroke-width="1" />
    <!-- Pump head and base -->
    <rect x="${x - 25}" y="${MOTOR_Y + 238}" width="50" height="18" rx="3" fill="#6f7780" />
    <!-- Discharge into the manifold -->
    <rect x="${x - 7}" y="${MANIFOLD_Y - 42}" width="14" height="42" fill="#9aa3ab" />
    <circle cx="${x}" cy="${MANIFOLD_Y - 46}" r="9" fill="#c7a34a" />
  `;
}
function build$1(values) {
    const count = values.pumps ?? 3;
    const width = LEFT * 2 + (count - 1) * PITCH + PANEL_W;
    const panelX = LEFT + (count - 1) * PITCH + 70;
    const xs = [...Array(count).keys()].map((i) => LEFT + i * PITCH);
    const artNode = w `
    <defs>
      <linearGradient id="ps-steel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#8f979e" />
        <stop offset="28%" stop-color="#e6ebee" />
        <stop offset="60%" stop-color="#aab2b9" />
        <stop offset="100%" stop-color="#7d858c" />
      </linearGradient>
      <linearGradient id="ps-panel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#eceff1" />
        <stop offset="100%" stop-color="#d3d8dc" />
      </linearGradient>
      <linearGradient id="ps-vessel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#b9a887" />
        <stop offset="40%" stop-color="#ded0b2" />
        <stop offset="100%" stop-color="#a89877" />
      </linearGradient>
    </defs>

    <!-- Manifold -->
    <rect x="18" y="${MANIFOLD_Y}" width="${panelX - 40}" height="20" rx="10" fill="#aeb6bd" />
    <rect x="18" y="${MANIFOLD_Y}" width="${panelX - 40}" height="7" rx="3.5" fill="#cfd6db" />

    <!-- Skid -->
    <rect x="10" y="${SKID_Y}" width="${panelX - 24}" height="16" rx="3" fill="#b6bdc3" />
    <rect x="10" y="${SKID_Y + 16}" width="${panelX - 24}" height="8" fill="#98a0a7" />
    <rect x="22" y="${SKID_Y + 24}" width="26" height="18" fill="#a8b0b6" />
    <rect x="${panelX - 60}" y="${SKID_Y + 24}" width="26" height="18" fill="#a8b0b6" />

    ${xs.map((x) => pumpGraphic(x))}

    <!-- Bladder vessel -->
    <rect x="${panelX - 46}" y="232" width="44" height="86" rx="20" fill="url(#ps-vessel)" />
    <rect x="${panelX - 30}" y="318" width="12" height="16" fill="#9aa3ab" />

    <!-- Control panel on its stand -->
    <rect x="${panelX + 8}" y="56" width="150" height="212" rx="5"
          fill="url(#ps-panel)" stroke="#aeb4b9" stroke-width="1.5" />
    <rect x="${panelX + 20}" y="150" width="126" height="64" rx="3" fill="#c6ccd1" />
    <g stroke="#b2b8bd" stroke-width="2">
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => w `<line x1="${panelX + 26}" y1="${158 + i * 8}"
                          x2="${panelX + 140}" y2="${158 + i * 8}" />`)}
    </g>
    <rect x="${panelX + 76}" y="${268}" width="14" height="96" fill="#b0b7bd" />
    <rect x="${panelX + 40}" y="360" width="86" height="10" rx="2" fill="#9aa2a9" />

    <!-- Panel HMI -->
    <rect x="${panelX + 36}" y="74" width="94" height="58" rx="3"
          fill="#14323d" stroke="#0d222a" stroke-width="2" />
  `;
    const regions = [
        // Panel HMI: what the set is actually doing.
        { id: "press", role: "system_pressure", kind: "text",
            x: panelX + 42, y: 78, w: 82, align: "middle", decimals: 2, size: 22 },
        { id: "sp", role: "pressure_setpoint", kind: "text",
            x: panelX + 42, y: 106, w: 82, align: "middle", label: "",
            decimals: 2, size: 13 },
        { id: "fault", role: "common_fault", kind: "lamp",
            x: panelX + 138, y: 60, w: 12, on: "#ef4444", off: "#3a2020" },
    ];
    xs.forEach((x, index) => {
        const n = index + 1;
        // A run lamp above each motor, and its speed beneath the skid.
        regions.push({
            id: `run${n}`, role: `pump${n}_run`, kind: "lamp",
            x: x - 7, y: MOTOR_Y - 46, w: 14, on: "#3ddc84", off: "#16281d",
        });
        regions.push({
            id: `flt${n}`, role: `pump${n}_fault`, kind: "lamp",
            x: x + 14, y: MOTOR_Y - 46, w: 10, on: "#ef4444", off: "#2a1717",
        });
        regions.push({
            // No unit is forced here: speed is reported as a percentage by some
            // drives and as output frequency by others, and the region should
            // say whichever the bound point actually carries.
            id: `spd${n}`, role: `pump${n}_speed`, kind: "text",
            x: x - 34, y: SKID_Y + 46, w: 68, align: "middle",
            decimals: 1, size: 15, placeholder: "",
        });
        regions.push({
            // Current is the honest indicator of whether a pump is doing work.
            // A drive can report 0% and still draw, and vice versa.
            id: `amp${n}`, role: `pump${n}_current`, kind: "text",
            x: x - 34, y: SKID_Y + 64, w: 68, align: "middle",
            unit: "A", decimals: 1, size: 13, placeholder: "",
        });
        regions.push({
            id: `lbl${n}`, role: "", kind: "text", text: `P${n}`,
            x: x - 34, y: SKID_Y + 84, w: 68, align: "middle", size: 12,
        });
    });
    return { size: [width, H$2], artNode, regions };
}
const PUMPSET = {
    id: "vertical-pumpset",
    name: "Vertical multistage pump set",
    description: "Packaged booster skid: vertical multistage pumps on a common manifold with a bladder vessel and control panel. Choose how many pumps.",
    card: "pump-system-card",
    render: "svg",
    display: "negative",
    size: [LEFT * 2 + 2 * PITCH + PANEL_W, H$2],
    options: [
        {
            key: "pumps",
            label: "Pumps",
            type: "number",
            min: 1,
            max: 10,
            default: 3,
            help: "The skid widens to suit; roles are pump1_… through pumpN_…",
        },
    ],
    build: build$1,
    regions: [],
};

/**
 * Daikin BRC2E61 simplified controller faceplate.
 *
 * Drawn from photographs: a white square whose whole face is made of large
 * flat keys arranged around a small central LCD in a grey surround. A power
 * key and indicator sit at the top centre; up and down keys run down the
 * right; mode, fan and louvre keys sit left and bottom.
 *
 * The display is small on purpose — this controller shows the set point, the
 * mode and the fan speed, and little else.
 */
const W$2 = 400;
const H$1 = 400;
// Central display, in its grey surround.
//
// The first attempt made this about half the size it should be. On the real
// unit the surround takes most of the face and the keys are the border
// around it, not the other way round.
const SUR_X = 80;
const SUR_Y = 80;
const SUR = 240;
const LX = SUR_X + 16;
const LY = SUR_Y + 24;
const LW = SUR - 32;
const LH = SUR - 40;
const CHASSIS = w `
  <defs>
    <linearGradient id="brc2-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdfdfd" />
      <stop offset="100%" stop-color="#eaeae8" />
    </linearGradient>
    <linearGradient id="brc2-key" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#eeeeec" />
    </linearGradient>
    <linearGradient id="brc2-sur" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b9bcc0" />
      <stop offset="100%" stop-color="#9da1a6" />
    </linearGradient>
    <linearGradient id="brc2-lcd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d8dccd" />
      <stop offset="100%" stop-color="#c7ccba" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="${W$2}" height="${H$1}" rx="26" fill="url(#brc2-body)" />
  <rect x="1" y="1" width="${W$2 - 2}" height="${H$1 - 2}" rx="25"
        fill="none" stroke="#dcdcda" stroke-width="1.5" />

  <!-- Key segmentation: the face is the keys, divided by fine seams -->
  <g stroke="#e0e0dd" stroke-width="1.6" fill="none">
    <line x1="${SUR_X}" y1="14" x2="${SUR_X}" y2="386" />
    <line x1="${SUR_X + SUR}" y1="14" x2="${SUR_X + SUR}" y2="386" />
    <line x1="14" y1="${SUR_Y}" x2="386" y2="${SUR_Y}" />
    <line x1="14" y1="${SUR_Y + SUR}" x2="386" y2="${SUR_Y + SUR}" />
  </g>

  <!-- Power indicator and key, top centre -->
  <rect x="192" y="22" width="16" height="9" rx="2" fill="#5f6a5c" />
  <g transform="translate(193 40)" stroke="#4a5057" stroke-width="1.8" fill="none">
    <circle cx="7" cy="8" r="6.5" />
    <line x1="7" y1="0" x2="7" y2="7" />
  </g>

  <!-- Display surround and glass -->
  <rect x="${SUR_X}" y="${SUR_Y}" width="${SUR}" height="${SUR}" rx="16"
        fill="url(#brc2-sur)" />
  <rect x="${LX}" y="${LY}" width="${LW}" height="${LH}" rx="2"
        fill="url(#brc2-lcd)" stroke="#7d8277" stroke-width="1.5" />
  <line x1="${LX + 6}" y1="${LY + 96}" x2="${LX + LW - 6}" y2="${LY + 96}"
        stroke="#8b9180" stroke-width="1.4" />

  <!-- Wordmark, printed across the surround as on the unit -->
  <g transform="translate(${SUR_X + 74} ${SUR_Y + 6})">
    <path d="M0 0 L13 0 L6.5 11 Z" fill="#4a5057" />
    <text class="brc2-brand" x="18" y="10">DAIKIN</text>
  </g>

  <!-- Key glyphs -->
  <g class="brc2-glyph" fill="#4a5057">
    <!-- top-left: mode / display -->
    <g transform="translate(30 32)" stroke="#4a5057" stroke-width="1.6" fill="none">
      <rect x="0" y="0" width="20" height="16" rx="2" />
      <line x1="2" y1="14" x2="18" y2="3" />
    </g>
    <!-- right: up and down chevrons -->
    <polyline points="344,50 360,34 376,50" fill="none" stroke="#4a5057"
              stroke-width="2.6" stroke-linecap="round" />
    <polyline points="344,350 360,366 376,350" fill="none" stroke="#4a5057"
              stroke-width="2.6" stroke-linecap="round" />
    <!-- right middle: thermometer keys -->
    <g transform="translate(356 140)" stroke="#4a5057" stroke-width="1.6" fill="none">
      <rect x="0" y="0" width="7" height="18" rx="3.5" />
      <circle cx="3.5" cy="21" r="4.5" />
    </g>
    <g transform="translate(356 232)" stroke="#4a5057" stroke-width="1.6" fill="none">
      <rect x="0" y="0" width="7" height="18" rx="3.5" />
      <circle cx="3.5" cy="21" r="4.5" />
    </g>
    <!-- bottom-left: fan -->
    <g transform="translate(30 346)" stroke="#4a5057" stroke-width="1.7" fill="none">
      <circle cx="11" cy="11" r="3" />
      <path d="M11 8 C15 3 21 5 20 10 C19 14 14 13 11 11" />
      <path d="M8 11 C3 9 2 3 7 2 C11 1 12 7 11 11" />
      <path d="M11 14 C12 19 8 23 5 19 C3 16 8 13 11 14" />
    </g>
    <!-- bottom-centre: louvre / swing -->
    <g transform="translate(184 348)" stroke="#4a5057" stroke-width="1.7" fill="none">
      <path d="M0 10 L16 2" stroke-dasharray="3 2.5" />
      <rect x="19" y="0" width="13" height="7" rx="1.5" />
    </g>
  </g>
`;
const BRC2E61 = {
    id: "daikin-brc2e61",
    name: "Daikin BRC2E61",
    description: "Simplified wired controller: a small central display surrounded by large flat keys for power, temperature, fan and louvre.",
    emulates: "Daikin BRC2E61 simplified remote controller",
    card: "hvac-controller-card",
    render: "svg",
    display: "positive",
    size: [W$2, H$1],
    artNode: CHASSIS,
    regions: [
        // Mode glyph line across the top of the display.
        { id: "mode", role: "hvac_mode", kind: "text",
            x: LX + 8, y: LY + 8, w: LW - 16, align: "middle", size: 20 },
        // Set point, large, lower left as on the unit.
        { id: "sp", role: "setpoint", kind: "text",
            x: LX + 10, y: LY + 104, w: 104, align: "start", unit: "",
            decimals: 0, size: 48 },
        { id: "spunit", role: "", kind: "text", text: "\u00b0C",
            x: LX + 96, y: LY + 128, w: 24, align: "start", size: 16 },
        // Fan speed to the right of it.
        { id: "fan", role: "fan_speed", kind: "text",
            x: LX + 120, y: LY + 118, w: LW - 130, align: "end", size: 16,
            placeholder: "" },
        // Room temperature, small, under the rule.
        { id: "room", role: "room_temp", kind: "text",
            x: LX + 8, y: LY + 158, w: LW - 16, align: "middle",
            label: "", unit: "\u00b0C", decimals: 0, size: 16 },
        // Keys, positioned over the moulded segments.
        { id: "k-power", role: "", kind: "button",
            x: 120, y: 12, w: 160, h: 62, text: "", action: "power_toggle" },
        { id: "k-up", role: "", kind: "button",
            x: 326, y: 14, w: 66, h: 60, text: "", action: "temp_up" },
        { id: "k-down", role: "", kind: "button",
            x: 326, y: 326, w: 66, h: 60, text: "", action: "temp_down" },
        { id: "k-mode", role: "", kind: "button",
            x: 12, y: 14, w: 62, h: 60, text: "", action: "mode_cycle" },
        { id: "k-fan", role: "", kind: "button",
            x: 12, y: 326, w: 62, h: 60, text: "", action: "fan_cycle" },
    ],
};

/**
 * A Q-SYS zone rack: one strip per output zone.
 *
 * Drawn from what the bridge actually exposes rather than from a
 * photograph. A Q-SYS Core has no front panel worth mirroring — it is a
 * 1U box with status LEDs — so the thing to mirror is the zone strip a
 * designer lays out in Q-SYS Designer and an operator sees in Core
 * Manager: a level bar with a dB readout, a mute, and trim keys.
 *
 * Parametric, like the pump set: a BGM system is as likely to have four
 * zones as sixteen, and a fixed drawing would be wrong for both.
 */
const ROW_H = 56;
const TOP = 34;
const W$1 = 500;
// A fader's useful range. Q-SYS gain blocks commonly stage -100..+20, but
// -100 is silence and the top is rarely used; showing the whole span would
// crush every normal level into the middle of the bar.
const DB_MIN = -80;
const DB_MAX = 10;
function build(values) {
    const count = Math.max(1, Math.min(16, Math.round(values.zones ?? 4)));
    const height = TOP + count * ROW_H + 12;
    const regions = [];
    const rows = [];
    for (let index = 0; index < count; index++) {
        const n = index + 1;
        const y = TOP + index * ROW_H;
        rows.push(w `
      <rect class="strip" x="8" y=${y} width=${W$1 - 16} height=${ROW_H - 8}
            rx="5" fill="#15171b" stroke="#272b32" />
      <line x1="84" y1=${y + 6} x2="84" y2=${y + ROW_H - 14}
            stroke="#272b32" stroke-width="1" />
    `);
        regions.push({
            id: `name${n}`, role: "", kind: "text", text: `ZONE ${n}`,
            x: 14, y: y + 30, w: 64, align: "start", size: 13,
        });
        regions.push({
            id: `bar${n}`, role: `zone${n}_volume`, kind: "bar",
            x: 96, y: y + 12, w: 184, h: 10, min: DB_MIN, max: DB_MAX,
        });
        regions.push({
            id: `db${n}`, role: `zone${n}_volume`, kind: "text",
            x: 96, y: y + 40, w: 184, align: "start",
            unit: "dB", decimals: 1, size: 14,
        });
        // Lit means muted. A mute lamp that is dark when the zone is playing
        // matches the hardware convention: you look for the red.
        regions.push({
            id: `mlamp${n}`, role: `zone${n}_mute`, kind: "lamp",
            x: 292, y: y + 16, w: 12, on: "#ef4444", off: "#2a1717",
        });
        regions.push({
            id: `mute${n}`, role: "", kind: "button", text: "MUTE",
            action: "mute_toggle", target: `zone${n}_mute`,
            x: 314, y: y + 12, w: 58, h: 24,
        });
        regions.push({
            id: `down${n}`, role: "", kind: "button", text: "−",
            action: "level_down", target: `zone${n}_volume`,
            x: 382, y: y + 12, w: 46, h: 24,
        });
        regions.push({
            id: `up${n}`, role: "", kind: "button", text: "+",
            action: "level_up", target: `zone${n}_volume`,
            x: 436, y: y + 12, w: 46, h: 24,
        });
    }
    const artNode = w `
    <rect x="0" y="0" width=${W$1} height=${height} rx="8" fill="#0e1013" />
    <rect x="0" y="0" width=${W$1} height="26" rx="8" fill="#171a1f" />
    <rect x="0" y="18" width=${W$1} height="8" fill="#171a1f" />
    <text x="14" y="18" fill="#8b93a1" font-size="12"
          font-family="inherit" letter-spacing="1.5">ZONE OUTPUTS</text>
    ${rows}
  `;
    return { size: [W$1, height], artNode, regions };
}
const QSYS_ZONES = {
    id: "qsys-zone-rack",
    name: "Q-SYS Zone Rack",
    card: "audio-zone-card",
    render: "svg",
    display: "negative",
    size: [W$1, TOP + 4 * ROW_H + 12],
    regions: [],
    description: "One strip per audio zone: level bar in dB, mute with an indicator, "
        + "and trim keys. Widens to the number of zones you set.",
    emulates: "Q-SYS zone outputs",
    options: [{
            key: "zones",
            label: "Zones",
            type: "number",
            min: 1,
            max: 16,
            default: 4,
            help: "One strip per zone; roles are zone1_… through zoneN_…",
        }],
    build,
};

/**
 * A generic AV room controller panel.
 *
 * Deliberately not a copy of any one Crestron faceplate. A CIP system has
 * no standard join map — a room's joins mean whatever the programmer
 * decided — so mirroring a specific touch panel would be mirroring one
 * site's program. What every AV room does have is the same handful of
 * things an operator wants: is the display on, what is it showing, how
 * loud is it, is it muted, and is anything wrong.
 *
 * The roles are named for those, and the bridge binds whichever joins
 * carry them.
 */
const W = 420;
const H = 300;
const artNode = w `
  <rect x="0" y="0" width=${W} height=${H} rx="10" fill="#101216" />
  <rect x="0" y="0" width=${W} height="34" rx="10" fill="#1a1e24" />
  <rect x="0" y="24" width=${W} height="10" fill="#1a1e24" />
  <text x="16" y="23" fill="#8b93a1" font-size="12" letter-spacing="1.5"
        font-family="inherit">ROOM CONTROL</text>

  <!-- Source display: the big pane, as on a panel's home page. -->
  <rect x="16" y="48" width=${W - 32} height="64" rx="6"
        fill="#0a0c0f" stroke="#252a31" />

  <!-- Level meter well -->
  <rect x="16" y="126" width=${W - 32} height="58" rx="6"
        fill="#14171c" stroke="#252a31" />
  <text x="28" y="146" fill="#8b93a1" font-size="11" letter-spacing="1.2"
        font-family="inherit">VOLUME</text>

  <!-- Status row -->
  <rect x="16" y="196" width=${W - 32} height="46" rx="6"
        fill="#14171c" stroke="#252a31" />
`;
const regions = [
    // What is on screen. An empty placeholder, not dashes: a panel with no
    // source selected shows nothing rather than "--".
    { id: "source", role: "source", kind: "text",
        x: 32, y: 76, w: W - 64, align: "start", size: 20, placeholder: "" },
    { id: "source_label", role: "", kind: "text", text: "SOURCE",
        x: 32, y: 100, w: 120, align: "start", size: 11 },
    { id: "display_lamp", role: "display_power", kind: "lamp",
        x: W - 46, y: 58, w: 14, on: "#3ddc84", off: "#16281d" },
    { id: "power", role: "", kind: "button", text: "DISPLAY",
        action: "power_toggle", target: "display_power",
        x: W - 132, y: 86, w: 100, h: 22 },
    { id: "vol_bar", role: "volume", kind: "bar",
        x: 28, y: 154, w: 210, h: 12, min: 0, max: 100 },
    { id: "vol_text", role: "volume", kind: "text",
        x: 250, y: 165, w: 60, align: "start", decimals: 0, size: 18 },
    { id: "vol_down", role: "", kind: "button", text: "−",
        action: "level_down", target: "volume",
        x: 316, y: 148, w: 40, h: 24 },
    { id: "vol_up", role: "", kind: "button", text: "+",
        action: "level_up", target: "volume",
        x: 360, y: 148, w: 40, h: 24 },
    { id: "mute_lamp", role: "mute", kind: "lamp",
        x: 30, y: 210, w: 12, on: "#ef4444", off: "#2a1717" },
    { id: "mute", role: "", kind: "button", text: "MUTE",
        action: "mute_toggle", target: "mute",
        x: 52, y: 206, w: 64, h: 24 },
    { id: "mic_lamp", role: "mic_live", kind: "lamp", label: "MIC",
        x: 150, y: 210, w: 12, on: "#f59e0b", off: "#2a2317" },
    { id: "fault_lamp", role: "fault", kind: "lamp", label: "FAULT",
        x: 220, y: 210, w: 12, on: "#ef4444", off: "#2a1717" },
    // Whether the room's processor is talking to us at all. Everything above
    // is stale if this is dark, which is worth showing on its face.
    { id: "online_lamp", role: "online", kind: "lamp", label: "ONLINE",
        x: 300, y: 210, w: 12, on: "#3ddc84", off: "#16281d" },
];
const ROOM_CONTROLLER = {
    id: "av-room-controller",
    name: "AV Room Controller",
    card: "room-controller-card",
    render: "svg",
    display: "negative",
    size: [W, H],
    artNode,
    regions,
    description: "A room at a glance: source, display power, volume and mute, with mic, "
        + "fault and online indicators. Bind whichever joins carry them.",
};

/**
 * The faceplate registry.
 *
 * Faceplates are bundled rather than fetched: one file, works offline, and
 * nothing to configure. The add-on's picker reads the separately published
 * faceplates/index.json instead, which is generated from this list.
 */
const FACEPLATES = [CVM_E3_MINI, PM2200, DIN_3PHASE, GENERIC_3PHASE, MULTIJET_REGISTER, BRC1E63, BRC2E61, MADOKA_BRC1H, BRC315D7, PUMPSET, QSYS_ZONES, ROOM_CONTROLLER];
function faceplatesFor(card) {
    return FACEPLATES.filter((f) => f.card === card);
}
function getFaceplate(card, id) {
    const available = faceplatesFor(card);
    return available.find((f) => f.id === id) ?? available[0];
}
/**
 * Apply option values to a faceplate that builds itself.
 *
 * Faceplates with fixed artwork come back untouched, so every card can call
 * this without caring which kind it has.
 */
function resolveFaceplate(faceplate, values = {}) {
    if (!faceplate.build)
        return faceplate;
    const merged = {};
    for (const option of faceplate.options ?? []) {
        const given = values[option.key];
        merged[option.key] =
            typeof given === "number" && Number.isFinite(given)
                ? Math.max(option.min, Math.min(option.max, given))
                : option.default;
    }
    return { ...faceplate, ...faceplate.build(merged) };
}

export { FACEPLATES, faceplatesFor, getFaceplate, resolveFaceplate };
