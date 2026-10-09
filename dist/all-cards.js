const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=r.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(i,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const r=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new o(r,e,i)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:s,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,f=globalThis,u=f.trustedTypes,x=u?u.emptyScript:"",m=f.reactiveElementPolyfillSupport,g=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?x:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},$=(e,t)=>!s(e,t),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&l(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const a=r?.call(this);o?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const e=this.properties,t=[...c(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(t)i.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of r){const r=document.createElement("style"),o=e.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=t.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=r;const a=o.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,i,r=!1,o){if(void 0!==e){const a=this.constructor;if(!1===r&&(o=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??$)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==o||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[g("elementProperties")]=new Map,b[g("finalized")]=new Map,m?.({ReactiveElement:b}),(f.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,_=e=>e,v=k.trustedTypes,z=v?v.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+M,S=`<${C}>`,E=document,N=()=>E.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,T="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,I=/>/g,U=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,G=/"/g,H=/^(?:script|style|textarea|title)$/i,F=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),B=F(1),W=F(2),j=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,K=E.createTreeWalker(E,129);function Z(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,r=[];let o,a=2===t?"<svg>":3===t?"<math>":"",n=R;for(let t=0;t<i;t++){const i=e[t];let s,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===R?"!--"===l[1]?n=O:void 0!==l[1]?n=I:void 0!==l[2]?(H.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=U):void 0!==l[3]&&(n=U):n===U?">"===l[0]?(n=o??R,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,s=l[1],n=void 0===l[3]?U:'"'===l[3]?G:D):n===G||n===D?n=U:n===O||n===I?n=R:(n=U,o=void 0);const h=n===U&&e[t+1].startsWith("/>")?" ":"";a+=n===R?i+S:d>=0?(r.push(s),i.slice(0,d)+A+i.slice(d)+M+h):i+M+(-2===d?t:h)}return[Z(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Q{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,a=0;const n=e.length-1,s=this.parts,[l,d]=Y(e,t);if(this.el=Q.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=K.nextNode())&&s.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(A)){const t=d[a++],i=r.getAttribute(e).split(M),n=/([.?@])?(.*)/.exec(t);s.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?ie:"?"===n[1]?re:"@"===n[1]?oe:te}),r.removeAttribute(e)}else e.startsWith(M)&&(s.push({type:6,index:o}),r.removeAttribute(e));if(H.test(r.tagName)){const e=r.textContent.split(M),t=e.length-1;if(t>0){r.textContent=v?v.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],N()),K.nextNode(),s.push({type:2,index:++o});r.append(e[t],N())}}}else if(8===r.nodeType)if(r.data===C)s.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(M,e+1));)s.push({type:7,index:o}),e+=M.length-1}o++}}static createElement(e,t){const i=E.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,r){if(t===j)return t;let o=void 0!==r?i._$Co?.[r]:i._$Cl;const a=P(t)?void 0:t._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(e),o._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(t=X(e,o._$AS(e,t.values),o,r)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??E).importNode(t,!0);K.currentNode=r;let o=K.nextNode(),a=0,n=0,s=i[0];for(;void 0!==s;){if(a===s.index){let t;2===s.type?t=new ee(o,o.nextSibling,this,e):1===s.type?t=new s.ctor(o,s.name,s.strings,this,e):6===s.type&&(t=new ae(o,this,e)),this._$AV.push(t),s=i[++n]}a!==s?.index&&(o=K.nextNode(),a++)}return K.currentNode=E,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),P(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new J(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Q(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new ee(this.O(N()),this.O(N()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=_(e).nextSibling;_(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}let te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,r){const o=this.strings;let a=!1;if(void 0===o)e=X(this,e,t,0),a=!P(e)||e!==this._$AH&&e!==j,a&&(this._$AH=e);else{const r=e;let n,s;for(e=o[0],n=0;n<o.length-1;n++)s=X(this,r[i+n],t,n),s===j&&(s=this._$AH[n]),a||=!P(s)||s!==this._$AH[n],s===q?e=q:e!==q&&(e+=(s??"")+o[n+1]),this._$AH[n]=s}a&&!r&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class re extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class oe extends te{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??q)===j)return;const i=this._$AH,r=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==q&&(i===q||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ne=k.litHtmlPolyfillSupport;ne?.(Q,ee),(k.litHtmlVersions??=[]).push("3.3.3");const se=globalThis;class le extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let o=r._$litPart$;if(void 0===o){const e=i?.renderBefore??null;r._$litPart$=o=new ee(t.insertBefore(N(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}le._$litElement$=!0,le.finalized=!0,se.litElementHydrateSupport?.({LitElement:le});const de=se.litElementPolyfillSupport;de?.({LitElement:le}),(se.litElementVersions??=[]).push("4.2.2");const ce=400,he=400,pe=62,fe=84,ue=276,xe=244,me=[142,188,234,280],ge=352,ye=[112,172,232,292],$e=W`
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

  <rect x="0" y="0" width="${ce}" height="${he}" rx="12" fill="url(#pm-bezel)" />
  <rect x="7" y="7" width="${386}" height="${386}" rx="9"
        fill="none" stroke="#20242700" stroke-width="1" />
  <rect x="26" y="26" width="${348}" height="${348}" rx="6"
        fill="none" stroke="#4d5358" stroke-width="1" />

  <!-- Brand. Wordmarks belong to their owners; see TRADEMARKS.md. -->
  <text class="pm-brand" x="48" y="58">Schneider</text>
  <text class="pm-brand-sub" x="48" y="72">Electric</text>
  <rect x="236" y="42" width="120" height="22" rx="3" fill="#4a5054" />
  <text class="pm-model" x="296" y="58" text-anchor="middle">EasyLogic PM2200</text>

  <!-- Display -->
  <rect x="${59}" y="${81}" width="${282}" height="${250}" rx="3"
        fill="#1d2124" />
  <rect x="${pe}" y="${fe}" width="${ue}" height="${xe}" fill="url(#pm-lcd)" />

  <!-- Title band -->
  <rect x="${pe}" y="${fe}" width="${ue}" height="24" fill="#6a7482" />
  <rect x="${pe}" y="${fe}" width="26" height="24" fill="#8d97a4" />
  <rect x="${312}" y="${fe}" width="26" height="24" fill="#8d97a4" />

  <!-- Soft-key legend, aligned over the four physical keys -->
  <line x1="${pe}" y1="${302}" x2="${338}" y2="${302}"
        stroke="#9aa392" stroke-width="1" />

  <!-- Keys -->
  ${ye.map(e=>W`
      <circle cx="${e}" cy="${ge}" r="21" fill="url(#pm-key)" />
      <circle cx="${e}" cy="${ge}" r="21" fill="none" stroke="#24282b" stroke-width="1.5" />
    `)}

  <!-- Indicator marks on the right edge -->
  <rect x="358" y="342" width="7" height="7" rx="1" fill="#22262a" />
  <rect x="358" y="356" width="7" height="7" rx="1" fill="#22262a" />
`,we=76,be={id:"schneider-pm2200",name:"Schneider EasyLogic PM2200",description:"Square panel-mount analyser: pale LCD with a title band, four labelled rows and a soft-key legend over four push keys.",emulates:"Schneider Electric EasyLogic PM2200",card:"bms-meter-card",render:"svg",display:"positive",size:[ce,he],artNode:$e,pages:["summary","amps","volts","power"],regions:[{id:"s-v",role:"volts_avg",kind:"text",page:"summary",x:we,y:me[0],w:182,align:"end",label:"V avg",decimals:1,size:26},{id:"s-i",role:"current_avg",kind:"text",page:"summary",x:we,y:me[1],w:182,align:"end",label:"I avg",decimals:2,size:26},{id:"s-p",role:"power_total",kind:"text",page:"summary",x:we,y:me[2],w:182,align:"end",label:"P total",decimals:2,size:26},{id:"s-e",role:"energy_total",kind:"text",page:"summary",x:we,y:me[3],w:182,align:"end",label:"E total",decimals:1,size:26},{id:"i1",role:"current_l1",kind:"text",page:"amps",x:we,y:me[0],w:182,align:"end",label:"I1",decimals:2,size:26},{id:"i2",role:"current_l2",kind:"text",page:"amps",x:we,y:me[1],w:182,align:"end",label:"I2",decimals:2,size:26},{id:"i3",role:"current_l3",kind:"text",page:"amps",x:we,y:me[2],w:182,align:"end",label:"I3",decimals:2,size:26},{id:"iavg",role:"current_avg",kind:"text",page:"amps",x:we,y:me[3],w:182,align:"end",label:"I avg",decimals:2,size:26},{id:"u1",role:"volts_l1",kind:"text",page:"volts",x:we,y:me[0],w:182,align:"end",label:"V1-N",decimals:1,size:26},{id:"u2",role:"volts_l2",kind:"text",page:"volts",x:we,y:me[1],w:182,align:"end",label:"V2-N",decimals:1,size:26},{id:"u3",role:"volts_l3",kind:"text",page:"volts",x:we,y:me[2],w:182,align:"end",label:"V3-N",decimals:1,size:26},{id:"uavg",role:"volts_avg",kind:"text",page:"volts",x:we,y:me[3],w:182,align:"end",label:"V avg",decimals:1,size:26},{id:"pw1",role:"power_l1",kind:"text",page:"power",x:we,y:me[0],w:182,align:"end",label:"P1",decimals:2,size:26},{id:"pw2",role:"power_l2",kind:"text",page:"power",x:we,y:me[1],w:182,align:"end",label:"P2",decimals:2,size:26},{id:"pw3",role:"power_l3",kind:"text",page:"power",x:we,y:me[2],w:182,align:"end",label:"P3",decimals:2,size:26},{id:"pwf",role:"power_factor",kind:"text",page:"power",x:we,y:me[3],w:182,align:"end",label:"PF",decimals:2,size:26},{id:"t-sum",role:"",kind:"text",page:"summary",text:"Total",x:pe,y:82,w:ue,align:"middle",size:15},{id:"t-amp",role:"",kind:"text",page:"amps",text:"Current",x:pe,y:82,w:ue,align:"middle",size:15},{id:"t-vol",role:"",kind:"text",page:"volts",text:"Voltage",x:pe,y:82,w:ue,align:"middle",size:15},{id:"t-pow",role:"",kind:"text",page:"power",text:"Power",x:pe,y:82,w:ue,align:"middle",size:15},{id:"sk1",role:"",kind:"text",text:"I",x:68,y:304,w:60,align:"middle",size:13},{id:"sk2",role:"",kind:"text",text:"U-V",x:128,y:304,w:60,align:"middle",size:13},{id:"sk3",role:"",kind:"text",text:"PQS",x:188,y:304,w:60,align:"middle",size:13},{id:"sk4",role:"",kind:"text",text:"▶",x:248,y:304,w:60,align:"middle",size:13},{id:"k1",role:"",kind:"button",x:ye[0]-26,y:331,w:52,h:42,text:"",action:"page",target:"amps"},{id:"k2",role:"",kind:"button",x:ye[1]-26,y:331,w:52,h:42,text:"",action:"page",target:"volts"},{id:"k3",role:"",kind:"button",x:ye[2]-26,y:331,w:52,h:42,text:"",action:"page",target:"power"},{id:"k4",role:"",kind:"button",x:ye[3]-26,y:331,w:52,h:42,text:"",action:"page",target:"summary"}]},ke=460,_e={id:"generic-3phase",name:"Generic 3-phase meter",description:"Single-page readout for boards where the physical meter is unknown.",card:"bms-meter-card",render:"svg",display:"negative",size:[ke,260],artNode:W`
  <defs>
    <linearGradient id="g3p-case" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a5159" />
      <stop offset="100%" stop-color="#343a40" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${ke}" height="${260}" rx="10" fill="url(#g3p-case)" />
  <rect x="14" y="14" width="${432}" height="${232}" rx="6"
        fill="#151b17" stroke="#090c0a" stroke-width="2" />
  <line x1="14" y1="110" x2="${446}" y2="110" stroke="#3c4a40" stroke-width="1" />
  <line x1="14" y1="186" x2="${446}" y2="186" stroke="#3c4a40" stroke-width="1" />
`,regions:[{id:"etot",role:"energy_total",kind:"text",x:34,y:34,w:390,label:"Total energy",unit:"kWh",decimals:1,size:40},{id:"ptot",role:"power_total",kind:"text",x:34,y:124,w:180,label:"Power",unit:"kW",decimals:2,size:28},{id:"pf",role:"power_factor",kind:"text",x:250,y:124,w:174,label:"Power factor",decimals:2,size:28},{id:"v1",role:"volts_l1",kind:"text",x:34,y:200,w:120,label:"L1-N",unit:"V",decimals:0,size:22},{id:"v2",role:"volts_l2",kind:"text",x:174,y:200,w:120,label:"L2-N",unit:"V",decimals:0,size:22},{id:"v3",role:"volts_l3",kind:"text",x:314,y:200,w:110,label:"L3-N",unit:"V",decimals:0,size:22}]},ve=230,ze=380,Ae=W`
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
  <rect x="0" y="22" width="${ve}" height="${336}" rx="6" fill="url(#din3p-case)" />
  <rect x="18" y="0" width="${194}" height="30" rx="3" fill="#333940" />
  <rect x="18" y="${350}" width="${194}" height="30" rx="3" fill="#333940" />

  <!-- Terminal detail, top and bottom -->
  ${[0,1,2,3].map(e=>W`<rect x="${26+45*e}" y="4" width="34" height="20" rx="2" fill="#23282d" />`)}
  ${[0,1,2,3].map(e=>W`<rect x="${26+45*e}" y="${354}" width="34" height="20" rx="2" fill="#23282d" />`)}

  <!-- Display -->
  <rect x="20" y="52" width="${190}" height="168" rx="3" fill="url(#din3p-lcd)" />
  <rect x="20" y="52" width="${190}" height="168" rx="3"
        fill="none" stroke="#1d2226" stroke-width="3" />
  <line x1="28" y1="108" x2="${202}" y2="108" stroke="#9fae88" stroke-width="1" />
  <line x1="28" y1="164" x2="${202}" y2="164" stroke="#9fae88" stroke-width="1" />

  <!-- Key cluster -->
  <rect x="20" y="234" width="${190}" height="62" rx="4" fill="#2e343a" />
`,Me={id:"din-3phase-analyser",name:"DIN-rail 3-phase analyser",description:"Portrait DIN-mounted analyser with a stacked per-phase display. Generic to the form factor, not modelled on a specific product.",card:"bms-meter-card",render:"svg",display:"positive",size:[ve,ze],artNode:Ae,pages:["volts","amps","power"],regions:[{id:"r1",role:"volts_l1",kind:"text",page:"volts",x:34,y:77,w:162,label:"L1",unit:"V",decimals:1,size:28},{id:"r2",role:"volts_l2",kind:"text",page:"volts",x:34,y:133,w:162,label:"L2",unit:"V",decimals:1,size:28},{id:"r3",role:"volts_l3",kind:"text",page:"volts",x:34,y:189,w:162,label:"L3",unit:"V",decimals:1,size:28},{id:"a1",role:"current_l1",kind:"text",page:"amps",x:34,y:77,w:162,label:"L1",unit:"A",decimals:2,size:28},{id:"a2",role:"current_l2",kind:"text",page:"amps",x:34,y:133,w:162,label:"L2",unit:"A",decimals:2,size:28},{id:"a3",role:"current_l3",kind:"text",page:"amps",x:34,y:189,w:162,label:"L3",unit:"A",decimals:2,size:28},{id:"pt",role:"power_total",kind:"text",page:"power",x:34,y:77,w:162,label:"Total",unit:"kW",decimals:2,size:28},{id:"pf",role:"power_factor",kind:"text",page:"power",x:34,y:133,w:162,label:"PF",decimals:2,size:28},{id:"en",role:"energy_total",kind:"text",page:"power",x:34,y:189,w:162,label:"Energy",unit:"kWh",decimals:0,size:28},{id:"k1",role:"",kind:"button",x:32,y:246,w:52,h:34,text:"V",action:"page",target:"volts"},{id:"k2",role:"",kind:"button",x:92,y:246,w:52,h:34,text:"A",action:"page",target:"amps"},{id:"k3",role:"",kind:"button",x:152,y:246,w:52,h:34,text:"kW",action:"page",target:"power"},{id:"lampL1",role:"volts_l1",kind:"lamp",x:40,y:310,w:14,label:"L1",on:"#5fd87a"},{id:"lampL2",role:"volts_l2",kind:"lamp",x:100,y:310,w:14,label:"L2",on:"#5fd87a"},{id:"lampL3",role:"volts_l3",kind:"lamp",x:160,y:310,w:14,label:"L3",on:"#5fd87a"}]},Ce=400,Se={id:"circutor-cvm-e3-mini",name:"Circutor CVM-E3-MINI",description:"Panel-mount three-phase analyser: negative LCD with three stacked values, magnitude and unit to the right, four-key bezel.",emulates:"Circutor CVM-E3-MINI-WiEth",card:"bms-meter-card",render:"svg",display:"negative",size:[Ce,330],artNode:W`
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

  <rect x="0" y="0" width="${Ce}" height="${330}" rx="7" fill="url(#cvm-bezel)" />
  <rect x="1" y="1" width="${398}" height="${328}" rx="6"
        fill="none" stroke="#b4b4b0" stroke-width="1" />

  <!-- Brand strip. Wordmarks belong to their owners; see TRADEMARKS.md. -->
  <text class="cvm-brand" x="18" y="34">Circutor</text>
  <text class="cvm-model" x="${382}" y="33" text-anchor="end">CVM-E3-MINI-WiEth</text>

  <!-- Display, recessed -->
  <rect x="12" y="${50}" width="${376}" height="${196}" rx="3"
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
`,pages:["power","volts","amps","energy"],regions:[{id:"p-w",role:"power_total",kind:"text",page:"power",x:70,y:66,w:232,align:"end",unit:"",decimals:2,size:42},{id:"p-va",role:"apparent_power",kind:"text",page:"power",x:70,y:124,w:232,align:"end",decimals:2,size:42},{id:"p-var",role:"reactive_power",kind:"text",page:"power",x:70,y:180,w:232,align:"end",decimals:2,size:42},{id:"v1",role:"volts_l1",kind:"text",page:"volts",x:70,y:66,w:232,align:"end",decimals:1,size:42},{id:"v2",role:"volts_l2",kind:"text",page:"volts",x:70,y:124,w:232,align:"end",decimals:1,size:42},{id:"v3",role:"volts_l3",kind:"text",page:"volts",x:70,y:180,w:232,align:"end",decimals:1,size:42},{id:"a1",role:"current_l1",kind:"text",page:"amps",x:70,y:66,w:232,align:"end",decimals:2,size:42},{id:"a2",role:"current_l2",kind:"text",page:"amps",x:70,y:124,w:232,align:"end",decimals:2,size:42},{id:"a3",role:"current_l3",kind:"text",page:"amps",x:70,y:180,w:232,align:"end",decimals:2,size:42},{id:"e-tot",role:"energy_total",kind:"text",page:"energy",x:70,y:82,w:232,align:"end",decimals:1,size:44},{id:"e-pf",role:"power_factor",kind:"text",page:"energy",x:70,y:160,w:232,align:"end",decimals:2,size:36},{id:"k-prev",role:"",kind:"button",x:86,y:272,w:40,h:40,text:"‹",action:"prev_page"},{id:"k-menu",role:"",kind:"button",x:146,y:274,w:108,h:36,text:"☰",action:"next_page"},{id:"k-next",role:"",kind:"button",x:274,y:272,w:40,h:40,text:"›",action:"next_page"}]},Ee=200,Ne=200,Pe=W`
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
  <circle cx="${Ee}" cy="${Ne}" r="192" fill="url(#mj-brass)" />
  <circle cx="${Ee}" cy="${Ne}" r="192" fill="none" stroke="#8a7133" stroke-width="2" />
  <circle cx="${Ee}" cy="${Ne}" r="176" fill="none" stroke="#8a7133" stroke-width="1.2" />

  <!-- Knurling around the bezel -->
  <g stroke="#9c8138" stroke-width="1.6">
    ${[...Array(60).keys()].map(e=>{const t=e/60*Math.PI*2;return W`<line
        x1="${Ee+178*Math.cos(t)}" y1="${Ne+178*Math.sin(t)}"
        x2="${Ee+190*Math.cos(t)}" y2="${Ne+190*Math.sin(t)}" />`})}
  </g>

  <!-- Dial face -->
  <circle cx="${Ee}" cy="${Ne}" r="170" fill="url(#mj-face)" />

  <text class="mj-brand" x="${Ee}" y="78" text-anchor="middle">MEASURED AUTOMATION</text>

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
`,Le={id:"multijet-water-register",name:"Multi-jet water register",description:"Mechanical register: seven-digit odometer over four sweep dials, all reading one cumulative total.",emulates:"Multi-jet mechanical water meter register",card:"bms-meter-card",render:"svg",display:"positive",size:[400,400],artNode:Pe,regions:[{id:"odo",role:"volume_total",kind:"odometer",x:92,y:114,w:216,h:34,digits:7,redDigits:1,scale:1},{id:"units",role:"volume_total",kind:"text",show:"unit",x:100,y:164,w:200,align:"middle",size:14,text:"UNITS"},{id:"mult",role:"",kind:"text",text:"x1",x:316,y:120,w:40,align:"start",size:14},...[{id:"d1",x:104,scale:1,label:"x1"},{id:"d01",x:168,scale:.1,label:"x0.1"},{id:"d001",x:232,scale:.01,label:"x0.01"},{id:"d0001",x:296,scale:.001,label:"x0.001"}].map(e=>({id:e.id,role:"volume_total",kind:"needle",x:e.x,y:286,r:27,scale:e.scale,label:e.label}))]},Te=180,Re=208,Oe={id:"daikin-brc1h63k",name:"Daikin BRC1H63K (Madoka)",description:"Round wall controller with an illuminated status ring and a dark display. Mode, room temperature and three touch keys.",emulates:"Daikin BRC1H63K Madoka",card:"hvac-controller-card",render:"svg",display:"negative",size:[360,400],artNode:W`
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
  <rect x="26" y="26" width="${308}" height="${348}" rx="8"
        fill="url(#madoka-plate)" stroke="#c7c2b8" stroke-width="1.5" />

  <!-- Brand, top-left of the plate as on the unit -->
  <g transform="translate(58 66)">
    <path d="M0 0 L13 0 L6.5 11 Z" fill="#2d3238" />
    <text class="madoka-brand" x="19" y="9">DAIKIN</text>
  </g>

  <!-- Round face -->
  <circle cx="${Te}" cy="${Re}" r="${132}" fill="url(#madoka-face)" />
  <circle cx="${Te}" cy="${Re}" r="${122}" fill="none"
          stroke="#0a0d11" stroke-width="2" />

  <!-- Specular highlight, so the glass reads as glass -->
  <ellipse cx="${146}" cy="${134}" rx="62" ry="26"
           fill="#ffffff" opacity="0.06" />
`,regions:[{id:"ring",role:"hvac_mode",kind:"ring",x:Te,y:Re,r:128,stroke:7,on:"#2f8fff",off:"#161b21"},{id:"mode",role:"hvac_mode",kind:"text",x:90,y:130,w:180,align:"middle",size:19},{id:"roomlabel",role:"",kind:"text",text:"Room",group:"room",x:84,y:162,w:172,align:"middle",size:13},{id:"temp",role:"room_temp",kind:"text",group:"room",x:84,y:182,w:172,align:"middle",unit:"",decimals:0,size:68},{id:"unit",role:"",kind:"text",text:"°C",group:"room",x:258,y:190,w:34,align:"start",size:20},{id:"fan",role:"fan_speed",kind:"text",x:84,y:214,w:80,align:"start",size:14,placeholder:""},{id:"swing",role:"swing",kind:"text",x:84,y:234,w:80,align:"start",size:14,placeholder:""},{id:"splabel",role:"",kind:"text",text:"Set",group:"set",x:186,y:212,w:90,align:"end",size:12},{id:"sp",role:"setpoint",kind:"text",group:"set",x:186,y:216,w:90,align:"end",decimals:0,size:18},{id:"minus",role:"",kind:"button",x:106,y:270,w:44,h:34,text:"−",action:"temp_down"},{id:"power",role:"",kind:"button",x:158,y:270,w:44,h:34,text:"○",action:"power_toggle"},{id:"plus",role:"",kind:"button",x:210,y:270,w:44,h:34,text:"+",action:"temp_up"}]},Ie=400,Ue=66,De=84,Ge=268,He=170,Fe=118,Be=252,We=188,je=200,qe=296,Ve=96,Ke=30,Ze={id:"daikin-brc1e63",name:"Daikin BRC1E63",description:"Wired navigation controller: landscape LCD with mode, clock, set point and room temperature, over four pill keys and a navigation pad.",emulates:"Daikin BRC1E63 / BRC1E53 navigation remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[Ie,400],artNode:W`
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

  <rect x="0" y="0" width="${Ie}" height="${400}" rx="16" fill="url(#brc-bezel)" />
  <rect x="1" y="1" width="${398}" height="${398}" rx="15"
        fill="none" stroke="#d2d2ce" stroke-width="1.5" />

  <!-- Wordmark. Marks belong to their owners; see TRADEMARKS.md. -->
  <g transform="translate(152 44)">
    <path d="M0 0 L17 0 L8.5 14 Z" fill="#2f3439" />
    <text class="brc-brand" x="24" y="13">DAIKIN</text>
  </g>

  <!-- Display -->
  <rect x="${62}" y="${80}" width="${276}" height="${132}" rx="3"
        fill="#b3b8ac" />
  <rect x="${Ue}" y="${De}" width="${Ge}" height="${124}" fill="url(#brc-lcd)" />
  <line x1="${He}" y1="${De}" x2="${He}" y2="${We}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${He}" y1="${Fe}" x2="${334}" y2="${Fe}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${Be}" y1="${Fe}" x2="${Be}" y2="${We}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${Ue}" y1="${We}" x2="${334}" y2="${We}" stroke="#8d9788" stroke-width="1.5" />

  <!-- Fan and swing glyphs, as printed on the display -->
  <g transform="translate(${78} ${146})" fill="#26302a">
    <circle cx="6" cy="6" r="5.5" fill="none" stroke="#26302a" stroke-width="1.6" />
    <path d="M6 1.5 C9 3 9 6 6 6 C3 6 3 9 6 10.5" fill="none"
          stroke="#26302a" stroke-width="1.6" />
  </g>
  <g transform="translate(${120} ${144})" stroke="#26302a" stroke-width="1.6" fill="none">
    <path d="M0 8 L14 2" stroke-dasharray="3 2.5" />
    <rect x="16" y="0" width="11" height="6" rx="1.5" />
  </g>

  <!-- Pill keys -->
  <g>
    <rect x="46" y="228" width="${Ve}" height="${Ke}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="${258}" y="228" width="${Ve}" height="${Ke}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="46" y="332" width="${Ve}" height="${Ke}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="${258}" y="332" width="${Ve}" height="${Ke}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
  </g>

  <!-- Key glyphs -->
  <g fill="#3a4046" stroke="none">
    <text class="brc-glyph" x="94" y="249" text-anchor="middle">&#10052; &#9788;</text>
    <text class="brc-glyph" x="94" y="353" text-anchor="middle">&#10052;&#10052;</text>
    <text class="brc-glyph" x="306" y="353" text-anchor="middle">&#8635;</text>
  </g>
  <g transform="translate(${306} 243)" stroke="#3a4046"
     stroke-width="1.8" fill="none">
    <circle cx="0" cy="0" r="7" />
    <line x1="0" y1="-10" x2="0" y2="-1" />
  </g>

  <!-- Navigation pad -->
  <circle cx="${je}" cy="${qe}" r="${62}" fill="url(#brc-pad)"
          stroke="#cfcfca" stroke-width="1.5" />
  <circle cx="${je}" cy="${qe}" r="${56}" fill="none"
          stroke="#e6e6e2" stroke-width="1" />
  <circle cx="${je}" cy="${qe}" r="27" fill="#fbfbfa"
          stroke="#d0d0cb" stroke-width="1.5" />
  <text class="brc-enter" x="${je}" y="${303}" text-anchor="middle">&#8629;</text>

  <!-- Pad direction marks -->
  <g fill="#8b9097">
    <polygon points="${194},${256} ${206},${256} ${je},${246}" />
    <polygon points="${194},${336} ${206},${336} ${je},${346}" />
    <polygon points="${160},${290} ${160},${302} ${150},${qe}" />
    <polygon points="${240},${290} ${240},${302} ${250},${qe}" />
  </g>
`,regions:[{id:"mode",role:"hvac_mode",kind:"text",x:76,y:92,w:88,align:"start",size:22},{id:"fan",role:"fan_speed",kind:"text",x:92,y:142,w:24,align:"start",size:13,placeholder:""},{id:"clock",role:"clock",kind:"text",x:He,y:88,w:164,align:"middle",size:22},{id:"sp-label",role:"",kind:"text",text:"Set temp",x:174,y:120,w:74,align:"start",size:11},{id:"sp",role:"setpoint",kind:"text",x:174,y:136,w:74,align:"middle",unit:"°C",decimals:0,size:26},{id:"room-label",role:"",kind:"text",text:"Room",x:256,y:120,w:74,align:"start",size:11},{id:"room",role:"room_temp",kind:"text",x:256,y:136,w:74,align:"middle",unit:"°C",decimals:0,size:26},{id:"status",role:"hvac_action",kind:"text",x:74,y:189,w:252,align:"start",size:12,placeholder:""},{id:"k-mode",role:"",kind:"button",x:46,y:228,w:Ve,h:Ke,text:"",action:"mode_cycle"},{id:"k-power",role:"",kind:"button",x:258,y:228,w:Ve,h:Ke,text:"",action:"power_toggle"},{id:"k-fan",role:"",kind:"button",x:46,y:332,w:Ve,h:Ke,text:"",action:"fan_cycle"},{id:"k-up",role:"",kind:"button",x:178,y:238,w:44,h:30,text:"",action:"temp_up"},{id:"k-down",role:"",kind:"button",x:178,y:324,w:44,h:30,text:"",action:"temp_down"}]},Ye=30,Qe=92,Xe=W`
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
  <rect x="0" y="0" width="${400}" height="${400}" rx="12" fill="url(#brc315-body)" />
  <rect x="1" y="1" width="${398}" height="${398}" rx="11"
        fill="none" stroke="#d6d1c5" stroke-width="1.5" />
  <!-- Ventilation slots -->
  <g fill="#cfcabd">
    ${[0,1,2,3,4,5].map(e=>W`<rect x="${34+9*e}" y="26" width="4" height="22" rx="2" />`)}
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
  <rect x="${27}" y="${89}" width="${346}" height="${102}" rx="3" fill="#9aa48d" />
  <rect x="${Ye}" y="${Qe}" width="${340}" height="${96}" fill="url(#brc315-lcd)" />
  <!-- Schedule ring, left of the display -->
  <g transform="translate(${74} ${144})">
    <circle cx="0" cy="0" r="30" fill="none" stroke="#7f8a74" stroke-width="1.4" />
    ${[0,3,6,9,12,15,18,21].map(e=>{const t=e/24*Math.PI*2-Math.PI/2,i=37*Math.cos(t),r=37*Math.sin(t)+3;return W`<text class="brc315-ring" x="${i}" y="${r}" text-anchor="middle">${e}</text>`})}
    <path d="M-9 -4 a7 7 0 1 0 7 8 a9 9 0 0 1 -7 -8 z" fill="#3d4838" />
    <circle cx="8" cy="6" r="5" fill="none" stroke="#3d4838" stroke-width="1.4" />
  </g>
  <!-- Divider before the temperature block -->
  <line x1="${238}" y1="${98}" x2="${238}" y2="${182}"
        stroke="#8d9782" stroke-width="1.2" />
  <!-- Mode icon strip, right edge -->
  <g class="brc315-icons">
    <rect x="${312}" y="${102}" width="18" height="14" rx="2" fill="none"
          stroke="#3d4838" stroke-width="1.2" />
    <text class="brc315-icon" x="${321}" y="${113}" text-anchor="middle">A</text>
    <text class="brc315-icon" x="${344}" y="${114}">&#10052;</text>
    <text class="brc315-icon" x="${344}" y="${140}">&#9788;</text>
    <text class="brc315-icon" x="${321}" y="${140}">&#9832;</text>
  </g>
`,Je={id:"daikin-brc315d7",name:"Daikin BRC315D7",description:"Schedule controller, cover closed: wide segmented display with timer rows, temperature and mode icons.",emulates:"Daikin BRC315D7 schedule remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[400,400],artNode:Xe,regions:[{id:"hdr",role:"",kind:"text",text:"ONETIME  DAILY  TIMER",x:114,y:94,w:160,align:"start",size:10},{id:"t1",role:"",kind:"text",text:"--:--",x:122,y:114,w:108,align:"middle",size:22},{id:"t2",role:"",kind:"text",text:"--:--",x:122,y:150,w:108,align:"middle",size:22},{id:"sp",role:"setpoint",kind:"text",x:244,y:106,w:64,align:"middle",unit:"",decimals:0,size:38},{id:"spunit",role:"",kind:"text",text:"°C",x:306,y:130,w:20,align:"start",size:12},{id:"room",role:"room_temp",kind:"text",x:244,y:154,w:64,align:"middle",label:"",decimals:0,size:16},{id:"mode",role:"hvac_mode",kind:"text",x:244,y:172,w:120,align:"start",size:11},{id:"k-power",role:"",kind:"button",x:290,y:56,w:72,h:20,text:"",action:"power_toggle"}]},et=348,tt=318,it=74;const rt={id:"vertical-pumpset",name:"Vertical multistage pump set",description:"Packaged booster skid: vertical multistage pumps on a common manifold with a bladder vessel and control panel. Choose how many pumps.",card:"pump-system-card",render:"svg",display:"negative",size:[494,452],options:[{key:"pumps",label:"Pumps",type:"number",min:1,max:10,default:3,help:"The skid widens to suit; roles are pump1_… through pumpN_…"}],build:function(e){const t=e.pumps??3,i=112+96*(t-1)+190,r=56+96*(t-1)+70,o=[...Array(t).keys()].map(e=>56+96*e),a=W`
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
    <rect x="18" y="${tt}" width="${r-40}" height="20" rx="10" fill="#aeb6bd" />
    <rect x="18" y="${tt}" width="${r-40}" height="7" rx="3.5" fill="#cfd6db" />

    <!-- Skid -->
    <rect x="10" y="${et}" width="${r-24}" height="16" rx="3" fill="#b6bdc3" />
    <rect x="10" y="${364}" width="${r-24}" height="8" fill="#98a0a7" />
    <rect x="22" y="${372}" width="26" height="18" fill="#a8b0b6" />
    <rect x="${r-60}" y="${372}" width="26" height="18" fill="#a8b0b6" />

    ${o.map(e=>function(e){return W`
    <!-- Fan cowl -->
    <rect x="${e-18}" y="${48}" width="36" height="26" rx="3" fill="#1e2124" />
    <!-- Motor -->
    <rect x="${e-27}" y="${it}" width="54" height="96" rx="5" fill="#26292d" />
    <g stroke="#3a3f44" stroke-width="1.4">
      ${[0,1,2,3,4,5].map(t=>W`<line x1="${e-27}" y1="${88+13*t}"
                          x2="${e+27}" y2="${88+13*t}" />`)}
    </g>
    <!-- Motor stool -->
    <rect x="${e-17}" y="${170}" width="34" height="22" rx="2" fill="#2f3337" />
    <!-- Stainless barrel -->
    <rect x="${e-21}" y="${192}" width="42" height="126" rx="4"
          fill="url(#ps-steel)" stroke="#8e969c" stroke-width="1" />
    <!-- Pump head and base -->
    <rect x="${e-25}" y="${312}" width="50" height="18" rx="3" fill="#6f7780" />
    <!-- Discharge into the manifold -->
    <rect x="${e-7}" y="${276}" width="14" height="42" fill="#9aa3ab" />
    <circle cx="${e}" cy="${272}" r="9" fill="#c7a34a" />
  `}(e))}

    <!-- Bladder vessel -->
    <rect x="${r-46}" y="232" width="44" height="86" rx="20" fill="url(#ps-vessel)" />
    <rect x="${r-30}" y="318" width="12" height="16" fill="#9aa3ab" />

    <!-- Control panel on its stand -->
    <rect x="${r+8}" y="56" width="150" height="212" rx="5"
          fill="url(#ps-panel)" stroke="#aeb4b9" stroke-width="1.5" />
    <rect x="${r+20}" y="150" width="126" height="64" rx="3" fill="#c6ccd1" />
    <g stroke="#b2b8bd" stroke-width="2">
      ${[0,1,2,3,4,5,6].map(e=>W`<line x1="${r+26}" y1="${158+8*e}"
                          x2="${r+140}" y2="${158+8*e}" />`)}
    </g>
    <rect x="${r+76}" y="${268}" width="14" height="96" fill="#b0b7bd" />
    <rect x="${r+40}" y="360" width="86" height="10" rx="2" fill="#9aa2a9" />

    <!-- Panel HMI -->
    <rect x="${r+36}" y="74" width="94" height="58" rx="3"
          fill="#14323d" stroke="#0d222a" stroke-width="2" />
  `,n=[{id:"press",role:"system_pressure",kind:"text",x:r+42,y:78,w:82,align:"middle",decimals:2,size:22},{id:"sp",role:"pressure_setpoint",kind:"text",x:r+42,y:106,w:82,align:"middle",label:"",decimals:2,size:13},{id:"fault",role:"common_fault",kind:"lamp",x:r+138,y:60,w:12,on:"#ef4444",off:"#3a2020"}];return o.forEach((e,t)=>{const i=t+1;n.push({id:`run${i}`,role:`pump${i}_run`,kind:"lamp",x:e-7,y:28,w:14,on:"#3ddc84",off:"#16281d"}),n.push({id:`flt${i}`,role:`pump${i}_fault`,kind:"lamp",x:e+14,y:28,w:10,on:"#ef4444",off:"#2a1717"}),n.push({id:`spd${i}`,role:`pump${i}_speed`,kind:"text",x:e-34,y:394,w:68,align:"middle",decimals:1,size:15,placeholder:""}),n.push({id:`amp${i}`,role:`pump${i}_current`,kind:"text",x:e-34,y:412,w:68,align:"middle",unit:"A",decimals:1,size:13,placeholder:""}),n.push({id:`lbl${i}`,role:"",kind:"text",text:`P${i}`,x:e-34,y:432,w:68,align:"middle",size:12})}),{size:[i,452],artNode:a,regions:n}},regions:[]},ot=80,at=80,nt=240,st=96,lt=104,dt=208,ct={id:"daikin-brc2e61",name:"Daikin BRC2E61",description:"Simplified wired controller: a small central display surrounded by large flat keys for power, temperature, fan and louvre.",emulates:"Daikin BRC2E61 simplified remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[400,400],artNode:W`
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

  <rect x="0" y="0" width="${400}" height="${400}" rx="26" fill="url(#brc2-body)" />
  <rect x="1" y="1" width="${398}" height="${398}" rx="25"
        fill="none" stroke="#dcdcda" stroke-width="1.5" />

  <!-- Key segmentation: the face is the keys, divided by fine seams -->
  <g stroke="#e0e0dd" stroke-width="1.6" fill="none">
    <line x1="${ot}" y1="14" x2="${ot}" y2="386" />
    <line x1="${320}" y1="14" x2="${320}" y2="386" />
    <line x1="14" y1="${at}" x2="386" y2="${at}" />
    <line x1="14" y1="${320}" x2="386" y2="${320}" />
  </g>

  <!-- Power indicator and key, top centre -->
  <rect x="192" y="22" width="16" height="9" rx="2" fill="#5f6a5c" />
  <g transform="translate(193 40)" stroke="#4a5057" stroke-width="1.8" fill="none">
    <circle cx="7" cy="8" r="6.5" />
    <line x1="7" y1="0" x2="7" y2="7" />
  </g>

  <!-- Display surround and glass -->
  <rect x="${ot}" y="${at}" width="${nt}" height="${nt}" rx="16"
        fill="url(#brc2-sur)" />
  <rect x="${st}" y="${lt}" width="${dt}" height="${200}" rx="2"
        fill="url(#brc2-lcd)" stroke="#7d8277" stroke-width="1.5" />
  <line x1="${102}" y1="${200}" x2="${298}" y2="${200}"
        stroke="#8b9180" stroke-width="1.4" />

  <!-- Wordmark, printed across the surround as on the unit -->
  <g transform="translate(${154} ${86})">
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
`,regions:[{id:"mode",role:"hvac_mode",kind:"text",x:104,y:112,w:192,align:"middle",size:20},{id:"splabel",role:"",kind:"text",text:"Set temp",group:"set",x:106,y:196,w:104,align:"start",size:12},{id:"sp",role:"setpoint",kind:"text",group:"set",x:106,y:208,w:104,align:"start",unit:"",decimals:0,size:48},{id:"spunit",role:"",kind:"text",text:"°C",group:"set",x:192,y:232,w:24,align:"start",size:16},{id:"fan",role:"fan_speed",kind:"text",x:216,y:222,w:78,align:"end",size:16,placeholder:""},{id:"roomlabel",role:"",kind:"text",text:"Room",group:"room",x:106,y:266,w:60,align:"start",size:12},{id:"room",role:"room_temp",kind:"text",group:"room",x:104,y:262,w:190,align:"end",unit:"°C",decimals:0,size:16},{id:"k-power",role:"",kind:"button",x:120,y:12,w:160,h:62,text:"",action:"power_toggle"},{id:"k-up",role:"",kind:"button",x:326,y:14,w:66,h:60,text:"",action:"temp_up"},{id:"k-down",role:"",kind:"button",x:326,y:326,w:66,h:60,text:"",action:"temp_down"},{id:"k-mode",role:"",kind:"button",x:12,y:14,w:62,h:60,text:"",action:"mode_cycle"},{id:"k-fan",role:"",kind:"button",x:12,y:326,w:62,h:60,text:"",action:"fan_cycle"}]},ht=440,pt=250,ft={id:"woltmann-register",name:"Woltmann Bulk Register",card:"bms-meter-card",render:"svg",display:"positive",size:[ht,pt],artNode:W`
  <defs>
    <linearGradient id="wt-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5d6672" />
      <stop offset="45%" stop-color="#3f4752" />
      <stop offset="100%" stop-color="#2b323b" />
    </linearGradient>
    <linearGradient id="wt-plate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdfcf7" />
      <stop offset="100%" stop-color="#e6e2d6" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${ht} height=${pt} rx="10" fill="url(#wt-body)" />
  <!-- Flanges, so the thing reads as an in-line body rather than a box -->
  <rect x="6" y="70" width="26" height="110" rx="4" fill="#232931" />
  <rect x=${408} y="70" width="26" height="110" rx="4" fill="#232931" />

  <rect x="52" y="30" width=${336} height=${190} rx="8"
        fill="url(#wt-plate)" />
  <rect x="52" y="30" width=${336} height=${190} rx="8"
        fill="none" stroke="#8d8a7c" stroke-width="2" />

  <text x=${220} y="62" text-anchor="middle" fill="#6b6659"
        font-size="13" letter-spacing="2" font-family="inherit">TOTAL VOLUME</text>
  <text x=${220} y=${204} text-anchor="middle" fill="#6b6659"
        font-size="12" letter-spacing="1" font-family="inherit">m³</text>
`,description:"Straight-reading bulk register: black cells for whole cubic metres, red for the decimals, with a sweep hand on the lowest decade.",emulates:"Woltmann-type bulk water meter register",regions:[{id:"odo",role:"volume_total",kind:"odometer",x:74,y:84,w:236,h:52,digits:5,redDigits:0,scale:1},{id:"dec",role:"volume_total",kind:"odometer",x:316,y:84,w:54,h:52,digits:3,redDigits:3,scale:.001},{id:"hand",role:"volume_total",kind:"needle",x:386,y:178,r:24,scale:.001},{id:"flow",role:"flow_rate",kind:"text",group:"flow",x:74,y:184,w:200,align:"start",decimals:2,size:15,label:"FLOW",placeholder:""}]},ut=420,xt={id:"lcd-water-meter",name:"LCD Water Meter",card:"bms-meter-card",render:"svg",display:"positive",size:[ut,300],artNode:W`
  <defs>
    <linearGradient id="lw-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a5361" />
      <stop offset="100%" stop-color="#262c34" />
    </linearGradient>
    <linearGradient id="lw-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cfd8c4" />
      <stop offset="100%" stop-color="#b9c4ac" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${ut} height=${300} rx="12" fill="url(#lw-body)" />
  <rect x="8" y="112" width="30" height="96" rx="5" fill="#1b2027" />
  <rect x=${382} y="112" width="30" height="96" rx="5" fill="#1b2027" />

  <!-- LCD head -->
  <rect x="58" y="34" width=${304} height="180" rx="10"
        fill="#1b2027" stroke="#151a20" stroke-width="2" />
  <rect x="74" y="50" width=${272} height="148" rx="6"
        fill="url(#lw-glass)" />

`,description:"Electronic register: cumulative total, instantaneous flow and a battery bar, on a grey-green LCD.",emulates:"Battery-powered electronic water meter",regions:[{id:"total_lbl",role:"",kind:"text",text:"TOTAL",group:"total",x:92,y:74,w:90,align:"start",size:11},{id:"total",role:"volume_total",kind:"text",unit:"",group:"total",x:92,y:96,w:210,align:"start",decimals:3,size:30},{id:"total_unit",role:"volume_total",kind:"text",show:"unit",group:"total",x:306,y:106,w:54,align:"start",size:13},{id:"flow_lbl",role:"",kind:"text",text:"FLOW",group:"flow",x:92,y:158,w:90,align:"start",size:11},{id:"flow",role:"flow_rate",kind:"text",unit:"",group:"flow",x:92,y:168,w:150,align:"start",decimals:2,size:22,placeholder:""},{id:"flow_unit",role:"flow_rate",kind:"text",show:"unit",group:"flow",x:248,y:176,w:70,align:"start",size:12},{id:"batt_lbl",role:"",kind:"text",text:"BATTERY",group:"batt",x:68,y:242,w:90,align:"start",size:11},{id:"batt",role:"battery",kind:"bar",group:"batt",x:160,y:248,w:150,h:12,min:0,max:100},{id:"batt_pc",role:"battery",kind:"text",group:"batt",x:318,y:242,w:60,align:"start",decimals:0,size:13,placeholder:""}]},mt=190,gt=190,yt=W`
  <defs>
    <radialGradient id="dw-face" cx="0.38" cy="0.3" r="0.9">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="80%" stop-color="#f4f2ea" />
      <stop offset="100%" stop-color="#ddd9cc" />
    </radialGradient>
    <linearGradient id="dw-ring" x1="0" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#8f96a1" />
      <stop offset="50%" stop-color="#5f666f" />
      <stop offset="100%" stop-color="#7c838d" />
    </linearGradient>
  </defs>

  <circle cx=${mt} cy=${gt} r="182" fill="#6c737d" />
  <circle cx=${mt} cy=${gt} r="182" fill="none" stroke="#464c55" stroke-width="3" />
  <circle cx=${mt} cy=${gt} r="162" fill="url(#dw-face)" />
  <circle cx=${mt} cy=${gt} r="162" fill="none" stroke="#b6b1a2" stroke-width="1.5" />

  <!-- Graduations: 100 minor, 10 major, as a litre face is divided -->
  <g>
    ${[...Array(100).keys()].map(e=>{const t=e/100*Math.PI*2-Math.PI/2,i=e%10==0,r=i?128:138;return W`<line
        x1=${mt+Math.cos(t)*r} y1=${gt+Math.sin(t)*r}
        x2=${mt+150*Math.cos(t)} y2=${gt+150*Math.sin(t)}
        stroke=${i?"#3b4049":"#9a958a"}
        stroke-width=${i?2.4:1} />`})}
  </g>
  ${[...Array(10).keys()].map(e=>{const t=e/10*Math.PI*2-Math.PI/2;return W`<text
      x=${mt+110*Math.cos(t)} y=${gt+110*Math.sin(t)+5}
      text-anchor="middle" fill="#3b4049" font-size="16"
      font-family="inherit">${e}</text>`})}

  <text x=${mt} y="108" text-anchor="middle" fill="#7a7566" font-size="11"
        letter-spacing="2" font-family="inherit">m³</text>
  <text x=${mt} y=${322} text-anchor="middle" fill="#7a7566"
        font-size="11" letter-spacing="1.6" font-family="inherit">x 0.001 m³</text>
`,$t={id:"dial-water-meter",name:"Dial Water Meter",card:"bms-meter-card",render:"svg",display:"positive",size:[380,380],artNode:yt,description:"Domestic dial face: an odometer window for whole cubic metres and a single sweep hand for the lowest decade.",emulates:"Single-jet dial-face water meter",regions:[{id:"odo",role:"volume_total",kind:"odometer",x:108,y:128,w:164,h:38,digits:5,redDigits:1,scale:1},{id:"hand",role:"volume_total",kind:"needle",x:mt,y:226,r:58,scale:.001},{id:"flow",role:"flow_rate",kind:"text",x:100,y:306,w:180,align:"middle",decimals:2,size:14,placeholder:""}]},wt={id:"compound-meter",name:"Compound Water Meter",card:"bms-meter-card",render:"svg",display:"positive",size:[460,300],artNode:W`
  <defs>
    <linearGradient id="cm-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#55606e" />
      <stop offset="100%" stop-color="#2a313a" />
    </linearGradient>
    <linearGradient id="cm-plate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdfcf7" />
      <stop offset="100%" stop-color="#e4e0d3" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${460} height=${300} rx="12" fill="url(#cm-body)" />
  <rect x="6" y="118" width="26" height="92" rx="4" fill="#1f242b" />
  <rect x=${428} y="118" width="26" height="92" rx="4" fill="#1f242b" />

  <rect x="44" y="26" width="192" height="180" rx="8" fill="url(#cm-plate)" />
  <rect x="44" y="26" width="192" height="180" rx="8" fill="none"
        stroke="#8d8a7c" stroke-width="2" />
  <text x="140" y="52" text-anchor="middle" fill="#6b6659" font-size="12"
        letter-spacing="2" font-family="inherit">MAIN</text>

  <rect x="252" y="26" width="164" height="180" rx="8" fill="url(#cm-plate)" />
  <rect x="252" y="26" width="164" height="180" rx="8" fill="none"
        stroke="#8d8a7c" stroke-width="2" />
  <text x="334" y="52" text-anchor="middle" fill="#6b6659" font-size="12"
        letter-spacing="2" font-family="inherit">BYPASS</text>

  <text x="140" y="196" text-anchor="middle" fill="#6b6659" font-size="11"
        font-family="inherit">m³</text>
  <text x="334" y="196" text-anchor="middle" fill="#6b6659" font-size="11"
        font-family="inherit">m³</text>
`,description:"Two registers on one body — main turbine and low-flow bypass — kept apart, because a bypass climbing alone is how a leak shows.",emulates:"Compound water meter with main and bypass registers",regions:[{id:"main",role:"volume_total",kind:"odometer",x:60,y:78,w:160,h:44,digits:6,redDigits:2,scale:.01},{id:"main_hand",role:"volume_total",kind:"needle",x:140,y:162,r:22,scale:.001},{id:"bypass",role:"bypass_total",kind:"odometer",x:266,y:78,w:136,h:44,digits:6,redDigits:2,scale:.01},{id:"bypass_hand",role:"bypass_total",kind:"needle",x:334,y:162,r:22,scale:.001},{id:"flow",role:"flow_rate",kind:"text",group:"flow",x:44,y:248,w:200,align:"start",decimals:2,size:18,label:"FLOW",placeholder:""}]},bt=440,kt={id:"smart-water-meter",name:"Smart Water Meter",card:"bms-meter-card",render:"svg",display:"positive",size:[bt,320],artNode:W`
  <defs>
    <linearGradient id="sw-body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#46505e" />
      <stop offset="100%" stop-color="#232931" />
    </linearGradient>
    <linearGradient id="sw-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ccd6c2" />
      <stop offset="100%" stop-color="#b3bfa8" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${bt} height=${320} rx="12" fill="url(#sw-body)" />
  <rect x="58" y="26" width=${324} height="196" rx="10"
        fill="#171c22" stroke="#12161b" stroke-width="2" />
  <rect x="74" y="42" width=${292} height="164" rx="6" fill="url(#sw-glass)" />

  <!-- Annunciator strip along the bottom of the glass -->
  <line x1="74" y1="176" x2=${366} y2="176" stroke="#9aa78f" stroke-width="1" />
`,description:"Electronic register with the flags these meters raise: leak, reverse flow and battery. Clear annunciators show nothing, not dashes.",emulates:"Smart water meter with leak and reverse-flow detection",regions:[{id:"total_lbl",role:"",kind:"text",text:"TOTAL",group:"total",x:90,y:66,w:90,align:"start",size:11},{id:"total",role:"volume_total",kind:"text",unit:"",group:"total",x:90,y:86,w:214,align:"start",decimals:3,size:30},{id:"total_unit",role:"volume_total",kind:"text",show:"unit",group:"total",x:308,y:96,w:54,align:"start",size:13},{id:"flow_lbl",role:"",kind:"text",text:"FLOW",group:"flow",x:90,y:142,w:90,align:"start",size:11},{id:"flow",role:"flow_rate",kind:"text",unit:"",group:"flow",x:90,y:150,w:150,align:"start",decimals:2,size:20,placeholder:""},{id:"flow_unit",role:"flow_rate",kind:"text",show:"unit",group:"flow",x:246,y:158,w:70,align:"start",size:11},{id:"alarm_lamp",role:"alarm",kind:"lamp",label:"LEAK",group:"alarm",x:96,y:244,w:14,on:"#ef4444",off:"#2a1717"},{id:"rev_lamp",role:"reverse_flow",kind:"lamp",label:"REVERSE",group:"rev",x:186,y:244,w:14,on:"#f59e0b",off:"#2a2317"},{id:"batt",role:"battery",kind:"bar",group:"batt",x:282,y:246,w:100,h:11,min:0,max:100},{id:"batt_pc",role:"battery",kind:"text",group:"batt",x:282,y:280,w:100,align:"start",decimals:0,size:12,label:"BATTERY",placeholder:""}]},_t=360,vt=300,zt=180,At=168,Mt=62,Ct=(e,t,i,r)=>W`
  <line x1=${e} y1=${t} x2=${i} y2=${r} stroke="#4ea1ff"
        stroke-width="3" marker-end="url(#pf-arrow)" />
`;function St(e,t){const i="#39414c",r="top"===e?W`<rect x=${154} y="16" width="52" height=${94}
              fill=${i} />`:"left"===e?W`<rect x="16" y=${142} width=${106} height="52"
                fill=${i} />`:W`<rect x=${254} y=${142}
                width=${90} height="52" fill=${i} />`,o="top"===e?Ct(zt,30,zt,90):"left"===e?Ct(30,At,102,At):Ct(330,At,258,At),a=t?W`<rect x=${156} y="16" width="48" height=${94}
            fill=${i} />`:W`<rect x=${156} y=${226} width="48"
            height=${58} fill=${i} />`,n=t?Ct(zt,90,zt,26):Ct(zt,230,zt,274);return W`
    <defs>
      <marker id="pf-arrow" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ea1ff" />
      </marker>
      <radialGradient id="pf-scroll" cx="0.38" cy="0.32" r="0.9">
        <stop offset="0%" stop-color="#5a6472" />
        <stop offset="100%" stop-color="#333a44" />
      </radialGradient>
    </defs>

    <rect x="0" y="0" width=${_t} height=${vt} rx="10" fill="#101216" />
    ${t?a:r}
    ${t?"":a}

    <circle cx=${zt} cy=${At} r=${Mt} fill="url(#pf-scroll)"
            stroke="#232930" stroke-width="2" />
    <circle cx=${zt} cy=${At} r=${46} fill="none"
            stroke="#59626f" stroke-width="1.5" />
    ${[...Array(8).keys()].map(e=>{const t=e/8*Math.PI*2;return W`<line
        x1=${zt+14*Math.cos(t)} y1=${At+14*Math.sin(t)}
        x2=${zt+44*Math.cos(t)}
        y2=${At+44*Math.sin(t)}
        stroke="#6f7886" stroke-width="3" stroke-linecap="round" />`})}
    <circle cx=${zt} cy=${At} r="10" fill="#8b93a1" />

    ${t?n:o}
    ${t?"":n}
  `}function Et(e){const t=[{id:"run",role:"run",kind:"lamp",label:"RUN",x:20,y:24,w:16,on:"#3ddc84",off:"#16281d"},{id:"fault",role:"fault",kind:"lamp",label:"FAULT",x:88,y:24,w:16,on:"#ef4444",off:"#2a1717"},{id:"speed",role:"speed",kind:"text",x:228,y:40,w:116,align:"end",decimals:1,size:20,placeholder:""},{id:"speed_lbl",role:"",kind:"text",text:"SPEED",x:228,y:58,w:116,align:"end",size:10},{id:"flow",role:"flow",kind:"text",x:228,y:270,w:116,align:"end",decimals:0,size:18,placeholder:""},{id:"flow_lbl",role:"",kind:"text",text:"AIRFLOW",x:228,y:286,w:116,align:"end",size:10}];return e?t:[...t,{id:"dp",role:"filter_dp",kind:"text",x:20,y:270,w:130,align:"start",decimals:0,size:16,placeholder:""},{id:"dp_lbl",role:"",kind:"text",text:"FILTER ΔP",x:20,y:286,w:130,align:"start",size:10}]}function Nt(e,t){return{id:`supply-fan-${e}`,name:t,card:"plant-equipment-card",render:"svg",display:"negative",size:[_t,vt],artNode:St(e,!1),regions:Et(!1),description:`Supply fan with the duct entering from the ${e}. Arrows follow the air, so the mimic cannot be read backwards.`,emulates:"Centrifugal supply fan"}}const Pt=Nt("top","Supply Fan — in from top"),Lt=Nt("left","Supply Fan — in from left"),Tt=Nt("right","Supply Fan — in from right"),Rt={id:"exhaust-fan",name:"Exhaust Fan",card:"plant-equipment-card",render:"svg",display:"negative",size:[_t,vt],artNode:St("top",!0),regions:Et(!0),description:"Exhaust fan discharging to atmosphere, air drawn upward.",emulates:"Axial exhaust fan"},Ot=190,It=78,Ut=330;const Dt={id:"hot-water-unit",name:"Hot Water Unit",card:"plant-equipment-card",render:"svg",display:"negative",size:[340,Ut],regions:[],description:"Calorifier set with flow and return drawn separately — the pair of temperatures is the diagnosis. One unit or a duty/standby pair.",emulates:"Calorifier / plate hot water unit",options:[{key:"units",label:"Units",type:"number",min:1,max:2,default:1,help:"Roles are unit1_… and unit2_…; the drawing widens to suit."}],build:function(e){const t=Math.max(1,Math.min(2,Math.round(e.units??1))),i=110+t*Ot+34*(t-1)+40,r=[],o=[];for(let e=0;e<t;e++){const t=e+1,i=110+224*e;o.push(W`
      <rect x=${i} y=${It} width=${Ot} height="150" rx="14"
            fill="#2b323b" stroke="#3d4551" stroke-width="2" />
      <rect x=${i+14} y=${96} width=${162} height="46" rx="6"
            fill="#1a1f25" />
      <text x=${i+95} y=${216} text-anchor="middle"
            fill="#8b93a1" font-size="11" letter-spacing="1.4"
            font-family="inherit">UNIT ${t}</text>
    `),r.push({id:`run${t}`,role:`unit${t}_run`,kind:"lamp",x:i+18,y:162,w:14,on:"#3ddc84",off:"#16281d"}),r.push({id:`flt${t}`,role:`unit${t}_fault`,kind:"lamp",x:i+44,y:162,w:14,on:"#ef4444",off:"#2a1717"}),r.push({id:`tank${t}`,role:`unit${t}_tank_temp`,kind:"text",x:i+14,y:128,w:162,align:"middle",decimals:1,size:24,placeholder:""})}const a=W`
    <defs>
      <marker id="hw-arrow" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b93a1" />
      </marker>
    </defs>
    <rect x="0" y="0" width=${i} height=${Ut} rx="10" fill="#101216" />
    <text x="16" y="26" fill="#8b93a1" font-size="12" letter-spacing="1.6"
          font-family="inherit">HOT WATER</text>

    <!-- Secondary flow along the top, return along the bottom -->
    <line x1="24" y1=${90} x2=${i-24} y2=${90}
          stroke="#c2410c" stroke-width="5" stroke-linecap="round"
          marker-end="url(#hw-arrow)" />
    <line x1=${i-24} y1=${292} x2="24" y2=${292}
          stroke="#1d4ed8" stroke-width="5" stroke-linecap="round"
          marker-end="url(#hw-arrow)" />
    ${o}
  `,n=[{id:"flow_t",role:"flow_temp",kind:"text",x:16,y:82,w:86,align:"start",decimals:1,size:20,placeholder:""},{id:"flow_lbl",role:"",kind:"text",text:"FLOW",x:16,y:100,w:86,align:"start",size:10},{id:"ret_t",role:"return_temp",kind:"text",x:16,y:284,w:86,align:"start",decimals:1,size:20,placeholder:""},{id:"ret_lbl",role:"",kind:"text",text:"RETURN",x:16,y:302,w:86,align:"start",size:10},{id:"sp",role:"setpoint",kind:"text",x:16,y:300,w:140,align:"start",decimals:1,size:16,placeholder:""},{id:"sp_lbl",role:"",kind:"text",text:"SETPOINT",x:16,y:316,w:140,align:"start",size:10},{id:"fault",role:"common_fault",kind:"lamp",label:"FAULT",x:i-44,y:286,w:16,on:"#ef4444",off:"#2a1717"}];return{size:[i,Ut],artNode:a,regions:[...r,...n]}}},Gt=[{key:"hot",label:"HOT WATER CIRCULATION",flow:"#c2410c",ret:"#7c2d12"},{key:"cold",label:"CHILLED WATER CIRCULATION",flow:"#0e7490",ret:"#155e75"}];const Ht={id:"circulation-pump-set",name:"Circulation Pump Set",card:"plant-equipment-card",render:"svg",display:"negative",size:[378,300],regions:[],description:"Circulator set, one to four pumps, hot or chilled service. The service recolours the pipework rather than needing a second drawing.",emulates:"Hot or chilled water circulation pump set",options:[{key:"pumps",label:"Pumps",type:"number",min:1,max:4,default:2,help:"Roles are pump1_… through pumpN_…"},{key:"service",label:"Service (0 hot, 1 cold)",type:"number",min:0,max:1,default:0,help:"Recolours the flow and return headers and the header caption."}],build:function(e){const t=Math.max(1,Math.min(4,Math.round(e.pumps??2))),i=Gt[Math.max(0,Math.min(1,Math.round(e.service??0)))],r=112+116*(t-1)+150,o=[],a=[];for(let e=0;e<t;e++){const t=e+1,i=112+116*e;a.push(W`
      <line x1=${i} y1=${110} x2=${i} y2=${150}
            stroke="#5a6472" stroke-width="6" />
      <line x1=${i} y1=${198} x2=${i} y2=${238}
            stroke="#5a6472" stroke-width="6" />
      <circle cx=${i} cy=${174} r="26" fill="#39414c"
              stroke="#4d5663" stroke-width="2" />
      <circle cx=${i} cy=${174} r="9" fill="#78818f" />
      ${[...Array(6).keys()].map(e=>{const t=e/6*Math.PI*2;return W`<line
          x1=${i+10*Math.cos(t)} y1=${174+10*Math.sin(t)}
          x2=${i+22*Math.cos(t)} y2=${174+22*Math.sin(t)}
          stroke="#8b93a1" stroke-width="2.5" stroke-linecap="round" />`})}
      <text x=${i} y=${270} text-anchor="middle" fill="#8b93a1"
            font-size="12" font-family="inherit">P${t}</text>
    `),o.push({id:`run${t}`,role:`pump${t}_run`,kind:"lamp",x:i-22,y:126,w:14,on:"#3ddc84",off:"#16281d"}),o.push({id:`flt${t}`,role:`pump${t}_fault`,kind:"lamp",x:i+8,y:126,w:14,on:"#ef4444",off:"#2a1717"}),o.push({id:`amp${t}`,role:`pump${t}_current`,kind:"text",x:i-40,y:288,w:80,align:"middle",unit:"A",decimals:1,size:13,placeholder:""})}const n=[{id:"flow_t",role:"flow_temp",kind:"text",x:16,y:102,w:88,align:"start",decimals:1,size:20,placeholder:""},{id:"flow_lbl",role:"",kind:"text",text:"FLOW",x:16,y:120,w:88,align:"start",size:10},{id:"ret_t",role:"return_temp",kind:"text",x:16,y:230,w:88,align:"start",decimals:1,size:20,placeholder:""},{id:"ret_lbl",role:"",kind:"text",text:"RETURN",x:16,y:248,w:88,align:"start",size:10},{id:"fault",role:"common_fault",kind:"lamp",label:"FAULT",x:r-44,y:18,w:16,on:"#ef4444",off:"#2a1717"}];return{size:[r,300],artNode:W`
    <rect x="0" y="0" width=${r} height=${300} rx="10" fill="#101216" />
    <text x="16" y="26" fill="#8b93a1" font-size="12" letter-spacing="1.6"
          font-family="inherit">${i.label}</text>

    <!-- Flow header above the pumps, return header below -->
    <line x1="24" y1=${110} x2=${r-24} y2=${110}
          stroke=${i.flow} stroke-width="7" stroke-linecap="round" />
    <line x1="24" y1=${238} x2=${r-24} y2=${238}
          stroke=${i.ret} stroke-width="7" stroke-linecap="round" />
    ${a}
  `,regions:[...o,...n]}}},Ft=360,Bt=170,Wt=W`
  <defs>
    <linearGradient id="fcu-case" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a3139" />
      <stop offset="100%" stop-color="#1b2027" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${Ft} height=${Bt} rx="8" fill="url(#fcu-case)" />
  <rect x="0" y="0" width=${Ft} height="24" rx="8" fill="#232a32" />
  <rect x="0" y="16" width=${Ft} height="8" fill="#232a32" />
  <text x="12" y="17" fill="#8b93a1" font-size="10" letter-spacing="1.6"
        font-family="inherit">FAN COIL UNIT</text>

  <!-- A coil and a fan, so the tile reads as plant and not a thermostat -->
  <g transform="translate(286, 44)">
    <rect x="0" y="0" width="56" height="42" rx="4"
          fill="#141921" stroke="#333b45" />
    ${[0,1,2,3].map(e=>W`<path d="M ${8+12*e} 6 q 6 7 0 14 q -6 7 0 14"
        fill="none" stroke="#4b7fae" stroke-width="2" />`)}
    <circle cx="28" cy="58" r="13" fill="#141921" stroke="#333b45" />
    ${[0,1,2].map(e=>{const t=e/3*Math.PI*2;return W`<line x1="28" y1="58"
        x2=${28+10*Math.cos(t)} y2=${58+10*Math.sin(t)}
        stroke="#6f7886" stroke-width="2.5" stroke-linecap="round" />`})}
  </g>

  <line x1="12" y1=${126} x2=${348} y2=${126} stroke="#2b323b" />
`,jt=460;const qt={id:"generic-fip",name:"Fire Indicator Panel (schematic)",card:"fire-panel-card",render:"svg",display:"negative",size:[jt,400],regions:[],description:"Zone and status mimic of a fire panel as the BMS sees it. Schematic on purpose — it must never be mistaken for the panel itself.",emulates:"Generic fire indicator panel (not a specific make)",options:[{key:"zones",label:"Zones",type:"number",min:0,max:24,default:8,help:"Roles are zone1_alarm through zoneN_alarm; two columns above 12."}],build:function(e){const t=Math.max(0,Math.min(24,Math.round(e.zones??8))),i=t>12?2:1,r=Math.ceil(t/i)||1,o=132+30*r+28,a=[],n=[];for(let e=0;e<t;e++){const t=e+1,o=22+Math.floor(e/r)*(416/i),s=132+30*(e%r),l=416/i-12;n.push(W`
      <rect x=${o} y=${s} width=${l} height=${24} rx="4"
            fill="#14181d" stroke="#232930" />
      <text x=${o+34} y=${s+17} fill="#8b93a1" font-size="12"
            font-family="inherit">ZONE ${t}</text>
    `),a.push({id:`z${t}`,role:`zone${t}_alarm`,kind:"lamp",x:o+10,y:s+5,w:13,on:"#ef4444",off:"#2a1717"})}const s=W`
    <rect x="0" y="0" width=${jt} height=${o} rx="10" fill="#0e1013" />

    <!-- Status row -->
    <rect x="16" y="46" width=${428} height="68" rx="8"
          fill="#14181d" stroke="#232930" />
    <text x="30" y="70" fill="#8b93a1" font-size="11" letter-spacing="1.5"
          font-family="inherit">PANEL STATUS</text>
    ${n}
  `;return{size:[jt,o],artNode:s,regions:[{id:"alarm",role:"fire_alarm",kind:"lamp",label:"FIRE",x:30,y:82,w:18,on:"#ef4444",off:"#2a1717"},{id:"fault",role:"fault",kind:"lamp",label:"FAULT",x:118,y:82,w:18,on:"#f59e0b",off:"#2a2317"},{id:"isolate",role:"isolate",kind:"lamp",label:"ISOLATED",x:216,y:82,w:18,on:"#eab308",off:"#2a2617"},{id:"brigade",role:"brigade_signal",kind:"lamp",label:"BRIGADE",x:322,y:82,w:18,on:"#ef4444",off:"#2a1717"},{id:"power",role:"power",kind:"lamp",label:"POWER",x:412,y:82,w:18,on:"#3ddc84",off:"#16281d"},...a]}}},Vt=500;const Kt={id:"qsys-zone-rack",name:"Q-SYS Zone Rack",card:"audio-zone-card",render:"svg",display:"negative",size:[Vt,270],regions:[],description:"One strip per audio zone: level bar in dB, mute with an indicator, and trim keys. Widens to the number of zones you set.",emulates:"Q-SYS zone outputs",labelPrefix:"zone",options:[{key:"zones",label:"Zones",type:"number",min:1,max:16,default:4,help:"One strip per zone; roles are zone1_… through zoneN_…"}],build:function(e){const t=Math.max(1,Math.min(16,Math.round(e.zones??4))),i=34+56*t+12,r=[],o=[];for(let e=0;e<t;e++){const t=e+1,i=34+56*e;o.push(W`
      <rect class="strip" x="8" y=${i} width=${484} height=${48}
            rx="5" fill="#15171b" stroke="#272b32" />
      <line x1="84" y1=${i+6} x2="84" y2=${i+56-14}
            stroke="#272b32" stroke-width="1" />
    `),r.push({id:`name${t}`,role:"",kind:"text",text:`ZONE ${t}`,x:14,y:i+30,w:64,align:"start",size:13}),r.push({id:`bar${t}`,role:`zone${t}_volume`,kind:"bar",x:96,y:i+12,w:184,h:10,min:-80,max:10}),r.push({id:`db${t}`,role:`zone${t}_volume`,kind:"text",x:96,y:i+40,w:184,align:"start",unit:"dB",decimals:1,size:14}),r.push({id:`mlamp${t}`,role:`zone${t}_mute`,kind:"lamp",x:292,y:i+16,w:12,on:"#ef4444",off:"#2a1717"}),r.push({id:`mute${t}`,role:"",kind:"button",text:"MUTE",action:"mute_toggle",target:`zone${t}_mute`,x:314,y:i+12,w:58,h:24}),r.push({id:`down${t}`,role:"",kind:"button",text:"−",action:"level_down",target:`zone${t}_volume`,x:382,y:i+12,w:46,h:24}),r.push({id:`up${t}`,role:"",kind:"button",text:"+",action:"level_up",target:`zone${t}_volume`,x:436,y:i+12,w:46,h:24})}const a=W`
    <rect x="0" y="0" width=${Vt} height=${i} rx="8" fill="#0e1013" />
    <rect x="0" y="0" width=${Vt} height="26" rx="8" fill="#171a1f" />
    <rect x="0" y="18" width=${Vt} height="8" fill="#171a1f" />
    <text x="14" y="18" fill="#8b93a1" font-size="12"
          font-family="inherit" letter-spacing="1.5">ZONE OUTPUTS</text>
    ${o}
  `;return{size:[Vt,i],artNode:a,regions:r}}},Zt=104,Yt=210;const Qt={id:"zone-mixer",name:"Zone Mixer (console)",card:"audio-zone-card",render:"svg",display:"negative",size:[462,600],regions:[],labelPrefix:"zone",description:"Channel strips side by side with vertical faders: source, optional EQ, pan, fader, mute and a scribble strip. Click a fader to move it.",emulates:"Audio mixing console channel strip",options:[{key:"zones",label:"Channels",type:"number",min:1,max:16,default:4,help:"One strip per zone; roles are zone1_… through zoneN_…"},{key:"per_row",label:"Strips per row",type:"number",min:1,max:16,default:8,help:"The console wraps past this, so sixteen channels stay legible."},{key:"eq",label:"Three-band EQ (0 off, 1 on)",type:"number",min:0,max:1,default:0,help:"Adds high/mid/low per strip, above the pan."}],build:function(e,t){const i=Math.max(1,Math.min(16,Math.round(e.zones??4))),r=1===Math.round(e.eq??0),o=t?.bound??(()=>!0),a=Array.from({length:i},(e,t)=>t+1),n=t?.filtering?a.filter(e=>(e=>[`zone${e}_volume`,`zone${e}_mute`,`zone${e}_balance`,`zone${e}_source`,`zone${e}_eq_low`,`zone${e}_eq_mid`,`zone${e}_eq_high`])(e).some(o)):a,s=n.length?n:[a[0]],l=r&&(!t?.filtering||s.some(e=>["low","mid","high"].some(t=>o(`zone${e}_eq_${t}`)))),d=s.length,c=Math.max(1,Math.min(d,Math.round(e.per_row??8))),h=Math.ceil(d/c),p=46+(l?96:0),f=p+44,u=f+Yt+118-36,x=28+c*Zt+6*(c-1),m=36+h*u+14*(h-1)+12,g=[],y=[];for(const[e,t]of s.entries()){const i=e%c,r=Math.floor(e/c),o=14+110*i,a=36+r*(u+14),n=a+46,s=a+p,d=a+f,h=o+52;y.push(W`
      <rect x=${o} y=${a} width=${Zt} height=${u}
            rx="6" fill="#15171b" stroke="#272b32" />
      ${l?W`<line x1=${o+8} y1=${s-6} x2=${o+Zt-8}
                y2=${s-6} stroke="#22262c" />`:""}
      <line x1=${o+8} y1=${d-8} x2=${o+Zt-8}
            y2=${d-8} stroke="#22262c" />
      <!-- Scribble strip. Backlit rather than paper: the strip sits at
           the foot of a dark console and the card draws its text light,
           so a cream plate would be light-on-light. -->
      <rect x=${o+6} y=${m-46} width=${92} height="26"
            rx="3" fill="#1d2127" stroke="#343a44" />
    `),g.push({id:`src${t}`,role:`zone${t}_source`,kind:"text",group:`src${t}`,x:o+6,y:a+20,w:92,align:"middle",size:12,placeholder:""}),g.push({id:`srcbtn${t}`,role:"",kind:"button",text:"SRC",group:`src${t}`,action:"source_cycle",target:`zone${t}_source`,x:h-26,y:a+28,w:52,h:18}),l&&["high","mid","low"].forEach((e,i)=>{const r=n+30*i;g.push({id:`${e}lbl${t}`,role:"",kind:"text",group:`eq${e}${t}`,text:e.toUpperCase(),x:o+8,y:r+12,w:32,align:"start",size:9}),g.push({id:`${e}${t}`,role:`zone${t}_eq_${e}`,kind:"bar",group:`eq${e}${t}`,action:"set_level",target:`zone${t}_eq_${e}`,x:o+42,y:r+4,w:54,h:8,min:-18,max:18}),g.push({id:`${e}v${t}`,role:`zone${t}_eq_${e}`,kind:"text",group:`eq${e}${t}`,x:o+42,y:r+24,w:54,align:"end",unit:"",decimals:1,size:9,placeholder:""})}),g.push({id:`panl${t}`,role:"",kind:"text",text:"L",group:`pan${t}`,x:o+8,y:s+26,w:12,align:"start",size:9}),g.push({id:`panr${t}`,role:"",kind:"text",text:"R",group:`pan${t}`,x:o+Zt-18,y:s+26,w:12,align:"start",size:9}),g.push({id:`pan${t}`,role:`zone${t}_balance`,kind:"bar",group:`pan${t}`,action:"set_level",target:`zone${t}_balance`,x:o+20,y:s+16,w:64,h:8,min:-100,max:100}),g.push({id:`panlbl${t}`,role:"",kind:"text",text:"PAN",group:`pan${t}`,x:o+8,y:s+12,w:40,align:"start",size:9}),g.push({id:`fad${t}`,role:`zone${t}_volume`,kind:"fader",group:`fader${t}`,action:"set_level",target:`zone${t}_volume`,x:h-26,y:d,w:52,h:Yt,min:-80,max:10,ticks:7}),g.push({id:`down${t}`,role:"",kind:"button",text:"−",group:`fader${t}`,action:"level_down",target:`zone${t}_volume`,x:o+8,y:d+105-28,w:22,h:22}),g.push({id:`up${t}`,role:"",kind:"button",text:"+",group:`fader${t}`,action:"level_up",target:`zone${t}_volume`,x:o+8,y:d+105+6,w:22,h:22}),g.push({id:`db${t}`,role:`zone${t}_volume`,kind:"text",group:`fader${t}`,x:o+6,y:d+Yt+8,w:92,align:"middle",unit:"dB",decimals:1,size:14}),g.push({id:`mlamp${t}`,role:`zone${t}_mute`,kind:"lamp",group:`mute${t}`,x:o+10,y:d+Yt+42,w:12,on:"#ef4444",off:"#2a1717"}),g.push({id:`mute${t}`,role:"",kind:"button",text:"MUTE",group:`mute${t}`,action:"mute_toggle",target:`zone${t}_mute`,x:o+28,y:d+Yt+39,w:66,h:20}),g.push({id:`name${t}`,role:"",kind:"text",text:`ZONE ${t}`,x:o+8,y:m-28,w:88,align:"middle",size:11,unit:""})}return{size:[x,m],artNode:W`
    <rect x="0" y="0" width=${x} height=${m} rx="8" fill="#0e1013" />
    <rect x="0" y="0" width=${x} height="26" rx="8" fill="#171a1f" />
    <rect x="0" y="18" width=${x} height="8" fill="#171a1f" />
    <text x="14" y="18" fill="#8b93a1" font-size="12" letter-spacing="1.5"
          font-family="inherit">ZONE MIXER</text>
    ${y}
  `,regions:g}}},Xt=420,Jt=W`
  <rect x="0" y="0" width=${Xt} height=${300} rx="10" fill="#101216" />
  <rect x="0" y="0" width=${Xt} height="34" rx="10" fill="#1a1e24" />
  <rect x="0" y="24" width=${Xt} height="10" fill="#1a1e24" />
  <text x="16" y="23" fill="#8b93a1" font-size="12" letter-spacing="1.5"
        font-family="inherit">ROOM CONTROL</text>

  <!-- Source display: the big pane, as on a panel's home page. -->
  <rect x="16" y="48" width=${388} height="64" rx="6"
        fill="#0a0c0f" stroke="#252a31" />

  <!-- Level meter well -->
  <rect x="16" y="126" width=${388} height="58" rx="6"
        fill="#14171c" stroke="#252a31" />
  <text x="28" y="146" fill="#8b93a1" font-size="11" letter-spacing="1.2"
        font-family="inherit">VOLUME</text>

  <!-- Status row -->
  <rect x="16" y="196" width=${388} height="46" rx="6"
        fill="#14171c" stroke="#252a31" />
`,ei=108,ti="#3d4551",ii="#8b93a1";const ri={id:"storage-tanks",name:"Water Storage Tanks",card:"plant-equipment-card",render:"svg",display:"negative",size:[444,358],regions:[],description:"One to four storage tanks side by side against a shared scale, because a tank farm is read by comparing tanks. High-level alarms sit at the top of each tank where the float is. Roles are tank1_level, tank1_high_alarm, tank1_low_alarm and so on, plus a shared pressure.",emulates:"Cold water storage tank set",options:[{key:"tanks",label:"Tanks",type:"number",min:1,max:4,default:2,help:"The drawing widens to suit. Unbound tanks hide themselves."}],build:function(e){const t=Math.max(1,Math.min(4,Math.round(e.tanks??2))),i=52+t*ei+26*(t-1)+150,r=[],o=[];for(let e=0;e<t;e++){const t=e+1,i=26+134*e;o.push(W`
      <!-- Shell, with a domed top so it reads as a tank and not a bar chart -->
      <path d=${`M ${i} 96\n                 Q ${i} 74 ${i+22} 74\n                 L ${i+ei-22} 74\n                 Q ${i+ei} 74 ${i+ei} 96\n                 L ${i+ei} 284\n                 L ${i} 284 Z`}
            fill=${"#20262e"} stroke=${ti} stroke-width="2" />
      <!-- Quarter marks: a fill with no scale beside it is a mood, not a level -->
      ${[25,50,75].map(e=>W`
        <line x1=${i+4} y1=${284-184*e/100}
              x2=${i+16} y2=${284-184*e/100}
              stroke=${ti} stroke-width="1" />
      `)}
      <text x=${i+54} y=${304} text-anchor="middle"
            fill=${ii} font-size="11" letter-spacing="1.2"
            font-family="inherit">TANK ${t}</text>
    `),r.push({id:`lvl${t}`,role:`tank${t}_level`,kind:"bar",x:i+6,y:94,w:96,h:184,min:0,max:100}),r.push({id:`lvlt${t}`,role:`tank${t}_level`,kind:"text",x:i,y:268,w:ei,align:"middle",decimals:0,unit:"%",size:22,placeholder:"--"}),r.push({id:`hi${t}`,role:`tank${t}_high_alarm`,kind:"lamp",label:"HIGH",x:i+54-7,y:52,w:14,on:"#ef4444",off:"#2a1717"}),r.push({id:`lo${t}`,role:`tank${t}_low_alarm`,kind:"lamp",label:"LOW",x:i+54-7,y:314,w:14,on:"#f59e0b",off:"#2a2317"})}const a=26+t*ei+26*(t-1)+30,n=[{id:"press",role:"pressure",kind:"text",x:a,y:104,w:118,align:"start",decimals:2,size:26,unit:"",placeholder:"--",group:"pressure"},{id:"press_u",role:"pressure",kind:"text",show:"unit",x:a,y:122,w:118,align:"start",size:11,group:"pressure"},{id:"press_lbl",role:"",kind:"text",text:"PRESSURE",x:a,y:86,w:118,align:"start",size:10,group:"pressure"},{id:"fill",role:"fill_valve",kind:"lamp",label:"FILL",x:a,y:166,w:14,on:"#3ddc84",off:"#16281d"},{id:"fault",role:"common_fault",kind:"lamp",label:"FAULT",x:a,y:204,w:14,on:"#ef4444",off:"#2a1717"}];return{size:[i,358],artNode:W`
    <rect x="0" y="0" width=${i} height=${358} rx="10" fill="#101216" />
    <text x="16" y="26" fill=${ii} font-size="12" letter-spacing="1.6"
          font-family="inherit">WATER STORAGE</text>
    ${o}
    <!-- Common outlet header the tanks feed -->
    <line x1=${26} y1=${328} x2=${a-14}
          y2=${328}
          stroke="#2563eb" stroke-width="5" stroke-linecap="round" />
  `,regions:[...r,...n]}}},oi="#8b93a1",ai="#38bdf8",ni={id:"pool-plant",name:"Pool Plant",card:"plant-equipment-card",render:"svg",display:"negative",size:[420,290],artNode:W`
  <defs>
    <linearGradient id="pool-water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.25" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width=${420} height=${290} rx="10" fill="#101216" />
  <text x="16" y="26" fill=${oi} font-size="12" letter-spacing="1.6"
        font-family="inherit">POOL</text>

  <!-- The pool itself: a sectioned basin, deep end to the right -->
  <path d="M 24 128 L 232 128 L 232 206 Q 232 216 222 216
           L 34 216 Q 24 216 24 206 Z"
        fill="url(#pool-water)" stroke=${"#3d4551"} stroke-width="2" />
  <path d="M 24 140 Q 60 132 96 140 T 168 140 T 232 140"
        fill="none" stroke=${ai} stroke-width="2" opacity="0.65" />
  <path d="M 24 154 Q 60 146 96 154 T 168 154 T 232 154"
        fill="none" stroke=${ai} stroke-width="1.5" opacity="0.35" />

  <!-- Return and suction, so the pump lamp has something to belong to -->
  <line x1="24" y1="236" x2="232" y2="236" stroke="#2563eb"
        stroke-width="4" stroke-linecap="round" opacity="0.8" />
  <text x="24" y="256" fill=${oi} font-size="9" letter-spacing="1.2"
        font-family="inherit">CIRCULATION</text>
`,regions:[{id:"wt",role:"water_temp",kind:"text",x:20,y:86,w:168,align:"start",decimals:1,size:52,unit:"",placeholder:"--"},{id:"wt_u",role:"water_temp",kind:"text",show:"unit",x:192,y:72,w:40,align:"start",size:16},{id:"wt_lbl",role:"",kind:"text",text:"WATER",x:20,y:46,w:168,align:"start",size:10},{id:"htr",role:"heater",kind:"lamp",label:"HEATER",x:262,y:58,w:16,on:"#f97316",off:"#2a1d11"},{id:"htr_sp",role:"heater_setpoint",kind:"text",x:324,y:70,w:80,align:"end",decimals:1,size:20,unit:"",placeholder:"",group:"heater_sp"},{id:"htr_sp_l",role:"",kind:"text",text:"HEATER SET",x:324,y:84,w:80,align:"end",size:9,group:"heater_sp"},{id:"solar",role:"solar",kind:"lamp",label:"SOLAR",x:262,y:110,w:16,on:"#fbbf24",off:"#2a2512"},{id:"solar_sp",role:"solar_setpoint",kind:"text",x:324,y:122,w:80,align:"end",decimals:1,size:20,unit:"",placeholder:"",group:"solar_sp"},{id:"solar_sp_l",role:"",kind:"text",text:"SOLAR SET",x:324,y:136,w:80,align:"end",size:9,group:"solar_sp"},{id:"pump",role:"filter_pump",kind:"lamp",label:"PUMP",x:262,y:162,w:16,on:"#3ddc84",off:"#16281d"},{id:"pmode",role:"pump_mode",kind:"text",x:262,y:206,w:142,align:"start",size:13,placeholder:"",group:"pump_mode"},{id:"pmode_l",role:"",kind:"text",text:"PUMP MODE",x:262,y:220,w:142,align:"start",size:9,group:"pump_mode"},{id:"mode",role:"pool_mode",kind:"text",x:262,y:248,w:142,align:"start",size:13,placeholder:"",group:"pool_mode"},{id:"mode_l",role:"",kind:"text",text:"POOL MODE",x:262,y:262,w:142,align:"start",size:9,group:"pool_mode"},{id:"fault",role:"fault",kind:"lamp",label:"FAULT",x:20,y:264,w:14,on:"#ef4444",off:"#2a1717"}],description:"Pool heating and circulation. Water temperature is the hero; heater, solar and filter pump explain why it is what it is. Read-only — stack the mode selects and setpoint numbers underneath, which Home Assistant's own rows do better than a drawing. Pair with a water meter faceplate for consumption.",emulates:"Pool chlorinator / heat pump controller"},si={band:[0,8],label:"FRIDGE"},li={band:[-26,-12],label:"FREEZER"},di="#1d242c",ci="#39414d",hi="#2b323b",pi="#3d4551",fi="#8b93a1";function ui(e,t,i,r){return[{id:"temp",role:"temperature",kind:"text",x:e,y:t+34,w:i-26,align:"end",decimals:1,size:34,unit:"",placeholder:"--"},{id:"temp_u",role:"temperature",kind:"text",show:"unit",x:e+i-24,y:t+34,w:24,align:"start",size:14},{id:"band",role:"temperature",kind:"bar",x:e,y:t+44,w:i,h:6,min:r.band[0],max:r.band[1]},{id:"sp",role:"setpoint",kind:"text",x:e,y:t+66,w:i,align:"middle",decimals:1,size:12,unit:"",placeholder:"",group:"setpoint"},{id:"sp_lbl",role:"",kind:"text",text:"SETPOINT",x:e,y:t+78,w:i,align:"middle",size:9,group:"setpoint"}]}function xi(e,t,i){return[{id:"door",role:"door",kind:"lamp",label:"DOOR",x:e,y:t,w:14,on:"#f59e0b",off:"#2a2317"},{id:"comp",role:"compressor",kind:"lamp",label:"COMP",x:e+i,y:t,w:14,on:"#3ddc84",off:"#16281d"},{id:"alarm",role:"alarm",kind:"lamp",label:"ALARM",x:e+2*i,y:t,w:14,on:"#ef4444",off:"#2a1717"}]}function mi(e,t,i){return W`
    <rect x="0" y="0" width=${e} height=${t} rx="10" fill="#101216" />
    <text x="16" y="24" fill=${fi} font-size="11" letter-spacing="1.6"
          font-family="inherit">${i}</text>
  `}const gi=96,yi=118;function $i(e){return t=>{const i=Math.max(0,Math.min(6,Math.round(t.doors??2))),r=Math.max(0,Math.min(8,Math.round(t.drawers??0))),o=i+(r>0?1:0)||1,a=78,n=20,s=Math.max(300,40+o*a+8*(o-1)),l=[];let d=n;for(let e=0;e<i;e++)l.push(W`
        <rect x=${d} y=${106} width=${a} height=${98}
              rx="5" fill=${di} stroke=${ci} stroke-width="1.5" />
        <rect x=${d+a-14} y=${130} width="5" height="30"
              rx="2.5" fill=${fi} opacity="0.7" />
      `),d+=86;if(r>0){const e=98/r;for(let t=0;t<r;t++){const i=106+t*e;l.push(W`
          <rect x=${d} y=${i+1} width=${a} height=${Math.max(4,e-3)}
                rx="3" fill=${di} stroke=${ci} stroke-width="1.2" />
          <rect x=${d+39-12} y=${i+e/2-1.5} width="24"
                height="3" rx="1.5" fill=${fi} opacity="0.6" />
        `)}}return{size:[s,270],artNode:W`
      ${mi(s,270,`UNDER-BENCH ${e.label}`)}
      <rect x=${12} y=${gi} width=${s-24}
            height=${yi} rx="8"
            fill=${hi} stroke=${pi} stroke-width="2" />
      <rect x=${12} y=${88} width=${s-24}
            height="10" rx="3" fill=${pi} />
      ${l}
    `,regions:[...ui(s-150,20,134,e),...xi(n,240,74)]}}}const wi=360,bi=300;function ki(e){return()=>{const t=170,i=W`
      ${mi(wi,bi,`WALK-IN ${e.label}`)}
      <rect x="22" y=${72} width=${316} height=${t} rx="8"
            fill=${hi} stroke=${pi} stroke-width="2" />
      <!-- One wide insulated door with the handle and the kick plate -->
      <rect x="40" y=${88} width=${200} height=${138}
            rx="6" fill=${di} stroke=${ci} stroke-width="1.8" />
      <rect x=${226} y=${135} width="7"
            height="44" rx="3.5" fill=${fi} opacity="0.75" />
      <rect x="48" y=${196} width=${184}
            height="22" rx="3" fill="#161b21" />
      <text x="52" y=${266} fill=${fi} font-size="10"
            letter-spacing="1.2" font-family="inherit">
        ${e===li?"FREEZER ROOM":"COLD ROOM"}
      </text>
    `;return{size:[wi,bi],artNode:i,regions:[...ui(220,14,124,e),...xi(28,270,80)]}}}const _i=330;function vi(e){return t=>{const i=Math.max(1,Math.min(2,Math.round(t.doors??1))),r=104,o=Math.max(260,44+i*r+8*(i-1)+128),a=[];let n=30;for(let e=0;e<i;e++)a.push(W`
        <rect x=${n} y=${76} width=${r} height=${190}
              rx="6" fill=${di} stroke=${ci} stroke-width="1.6" />
        <rect x=${n+r-16} y=${145} width="6"
              height="52" rx="3" fill=${fi} opacity="0.7" />
      `),n+=112;const s=W`
      ${mi(o,_i,`UPRIGHT ${e.label}`)}
      <rect x=${22} y=${64} width=${i*r+8*(i-1)+16}
            height=${214} rx="8"
            fill=${hi} stroke=${pi} stroke-width="2" />
      ${a}
    `;return{size:[o,_i],artNode:s,regions:[...ui(o-146,56,130,e),...xi(o-146,276,46)]}}}const zi=[{key:"doors",label:"Doors",type:"number",min:0,max:6,default:2,help:"How many hinged doors the cabinet has, left to right."},{key:"drawers",label:"Drawers",type:"number",min:0,max:8,default:0,help:"Drawers stack in a bay to the right of the doors. A cabinet with neither draws a single door."}],Ai={card:"plant-equipment-card",render:"svg",display:"negative",regions:[]};function Mi(e,t){return`${e}. Temperature against its ${t.band[0]} to ${t.band[1]} °C band is the primary reading; door, compressor and alarm are lamps. Doors and drawers are drawn to identify the cabinet, not bound separately — a real unit has one door switch for the whole thing.`}const Ci=[{key:"doors",label:"Doors",type:"number",min:1,max:2,default:1,help:"Single or double upright."}],Si=[Se,be,Me,_e,Le,Ze,ct,Oe,Je,rt,Kt,{id:"av-room-controller",name:"AV Room Controller",card:"room-controller-card",render:"svg",display:"negative",size:[Xt,300],artNode:Jt,regions:[{id:"source",role:"source",kind:"text",x:32,y:76,w:356,align:"start",size:20,placeholder:""},{id:"source_label",role:"",kind:"text",text:"SOURCE",x:32,y:100,w:120,align:"start",size:11},{id:"display_lamp",role:"display_power",kind:"lamp",x:374,y:58,w:14,on:"#3ddc84",off:"#16281d"},{id:"power",role:"",kind:"button",text:"DISPLAY",action:"power_toggle",target:"display_power",x:288,y:86,w:100,h:22},{id:"vol_bar",role:"volume",kind:"bar",x:28,y:154,w:210,h:12,min:0,max:100},{id:"vol_text",role:"volume",kind:"text",x:250,y:165,w:60,align:"start",decimals:0,size:18},{id:"vol_down",role:"",kind:"button",text:"−",action:"level_down",target:"volume",x:316,y:148,w:40,h:24},{id:"vol_up",role:"",kind:"button",text:"+",action:"level_up",target:"volume",x:360,y:148,w:40,h:24},{id:"mute_lamp",role:"mute",kind:"lamp",x:30,y:210,w:12,on:"#ef4444",off:"#2a1717"},{id:"mute",role:"",kind:"button",text:"MUTE",action:"mute_toggle",target:"mute",x:52,y:206,w:64,h:24},{id:"mic_lamp",role:"mic_live",kind:"lamp",label:"MIC",x:150,y:210,w:12,on:"#f59e0b",off:"#2a2317"},{id:"fault_lamp",role:"fault",kind:"lamp",label:"FAULT",x:220,y:210,w:12,on:"#ef4444",off:"#2a1717"},{id:"online_lamp",role:"online",kind:"lamp",label:"ONLINE",x:300,y:210,w:12,on:"#3ddc84",off:"#16281d"}],description:"A room at a glance: source, display power, volume and mute, with mic, fault and online indicators. Bind whichever joins carry them."},ft,xt,$t,wt,kt,Pt,Lt,Tt,Rt,Dt,Ht,qt,Qt,{id:"fcu-unit",name:"Fan Coil Unit",card:"hvac-controller-card",render:"svg",display:"negative",size:[Ft,Bt],artNode:Wt,regions:[{id:"room_lbl",role:"",kind:"text",text:"ROOM",group:"room",x:14,y:36,w:70,align:"start",size:10},{id:"room",role:"room_temp",kind:"text",group:"room",x:14,y:42,w:120,align:"start",unit:"",decimals:1,size:44},{id:"room_unit",role:"",kind:"text",text:"°C",group:"room",x:136,y:58,w:30,align:"start",size:16},{id:"set_lbl",role:"",kind:"text",text:"SET",group:"set",x:182,y:36,w:60,align:"start",size:10},{id:"set",role:"setpoint",kind:"text",group:"set",x:182,y:44,w:70,align:"start",unit:"",decimals:1,size:24},{id:"set_unit",role:"",kind:"text",text:"°C",group:"set",x:250,y:56,w:26,align:"start",size:12},{id:"mode",role:"hvac_mode",kind:"text",group:"mode",x:14,y:96,w:150,align:"start",size:15,placeholder:""},{id:"fan_lbl",role:"",kind:"text",text:"FAN",group:"fan",x:182,y:90,w:50,align:"start",size:10},{id:"fan",role:"fan_speed",kind:"text",group:"fan",x:182,y:96,w:90,align:"start",size:15,placeholder:""},{id:"run",role:"run",kind:"lamp",label:"RUN",group:"run",x:16,y:136,w:13,on:"#3ddc84",off:"#16281d"},{id:"fault",role:"fault",kind:"lamp",label:"ALARM",group:"fault",x:92,y:136,w:13,on:"#ef4444",off:"#2a1717"}],description:"Compact status tile for a BMS fan coil: room against setpoint, mode, fan and alarm. Built to tile, because sites have hundreds.",emulates:"Generic BMS fan coil unit"},{...Ai,id:"underbench-fridge",name:"Under-bench Fridge",size:[300,270],description:Mi("Under-counter refrigerator, 1-6 doors or 1-8 drawers",si),emulates:"Under-counter commercial refrigerator",options:zi,build:$i(si)},{...Ai,id:"underbench-freezer",name:"Under-bench Freezer",size:[300,270],description:Mi("Under-counter freezer, 1-6 doors or 1-8 drawers",li),emulates:"Under-counter commercial freezer",options:zi,build:$i(li)},{...Ai,id:"walkin-fridge",name:"Walk-in Fridge",size:[wi,bi],description:Mi("Walk-in cold room",si),emulates:"Walk-in cold room",build:ki(si)},{...Ai,id:"walkin-freezer",name:"Walk-in Freezer",size:[wi,bi],description:Mi("Walk-in freezer room",li),emulates:"Walk-in freezer room",build:ki(li)},{...Ai,id:"upright-fridge",name:"Upright Fridge",size:[260,_i],description:Mi("Upright reach-in refrigerator",si),emulates:"Upright reach-in refrigerator",options:Ci,build:vi(si)},{...Ai,id:"upright-freezer",name:"Upright Freezer",size:[260,_i],description:Mi("Upright reach-in freezer",li),emulates:"Upright reach-in freezer",options:Ci,build:vi(li)},ri,ni];function Ei(e){return Si.filter(t=>t.card===e)}function Ni(e,t){const i=Ei(e);return i.find(e=>e.id===t)??i[0]}function Pi(e,t={},i){if(!e.build)return e;const r={};for(const i of e.options??[]){const e=t[i.key];r[i.key]="number"==typeof e&&Number.isFinite(e)?Math.max(i.min,Math.min(i.max,e)):i.default}return{...e,...e.build(r,i)}}const Li="opt__",Ti="ent__",Ri="lbl__";function Oi(e){const t=e.replace(/_/g," ").trim();return t.charAt(0).toUpperCase()+t.slice(1)}function Ii(e,t={}){class i extends le{constructor(){super(...arguments),this._label=e=>{const i=e.name;if("title"===i)return"Title";if("faceplate"===i)return"Faceplate";if("device"===i)return"Device (fills every point below)";if("hide_unbound"===i)return"Hide controls with nothing bound";if(i.startsWith(Li)){const e=i.slice(5),t=(this._faceplate().options??[]).find(t=>t.key===e);return t?.label??Oi(e)}if(i.startsWith(Ri))return`${Oi(i.slice(5))} name`;if(i.startsWith(Ti))return Oi(i.slice(5));const r=(t.numbers??[]).find(e=>e.key===i);return r?.label??Oi(i)}}setConfig(e){this._config=e}_faceplate(){return Pi(Ni(e,this._config?.faceplate),this._config?.options??{})}_labelKeys(){const e=this._faceplate();return e.labelPrefix?e.regions.map(e=>/^name(\d+)$/.exec(e.id)?.[1]).filter(e=>Boolean(e)).map(t=>`${e.labelPrefix}${t}`):[]}_roles(){const e=[...new Set(this._faceplate().regions.map(e=>e.role))].filter(Boolean);return t.expandRoles?t.expandRoles(e):e}_emit(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_data(){const i=this._config??{},r={title:i.title??i.name??"",hide_unbound:!1!==i.hide_unbound,faceplate:Ni(e,i.faceplate).id,device:i.device??""};for(const e of this._faceplate().options??[])r[Li+e.key]=i.options?.[e.key]??e.default;for(const e of t.numbers??[])r[e.key]=i[e.key];for(const e of this._labelKeys())r[Ri+e]=i.labels?.[e]??"";for(const e of this._roles())r[Ti+e]=i.entities?.[e]??"";return r}_fromData(i){const r={...this._config,type:this._config?.type??`custom:${e}`,faceplate:String(i.faceplate??"")},o=String(i.title??"").trim();o?r.title=o:delete r.title,o&&delete r.name,!1===i.hide_unbound?r.hide_unbound=!1:delete r.hide_unbound;const a=String(i.device??"").trim();a?r.device=a:delete r.device;const n={};for(const e of this._faceplate().options??[]){const t=Number(i[Li+e.key]);Number.isFinite(t)&&(n[e.key]=t)}Object.keys(n).length?r.options=n:delete r.options;for(const e of t.numbers??[]){const t=Number(i[e.key]);Number.isFinite(t)?r[e.key]=t:delete r[e.key]}const s={};for(const e of this._labelKeys()){const t=String(i[Ri+e]??"").trim();t&&(s[e]=t)}Object.keys(s).length?r.labels=s:delete r.labels;const l={};for(const e of this._roles()){const t=String(i[Ti+e]??"").trim();t&&(l[e]=t)}return Object.keys(l).length?r.entities=l:delete r.entities,r}_schema(){const i=this._faceplate(),r=Ei(e).map(e=>({value:e.id,label:e.emulates?`${e.name} — ${e.emulates}`:e.name})),o=[{name:"title",selector:{text:{}}},{name:"faceplate",selector:{select:{mode:"dropdown",options:r}}},{name:"device",selector:{device:{}}},{name:"hide_unbound",selector:{boolean:{}}}];for(const e of i.options??[])o.push({name:Li+e.key,selector:{number:{min:e.min,max:e.max,mode:"box"}}});for(const e of t.numbers??[])o.push({name:e.key,selector:{number:{min:e.min,max:e.max,step:e.step??1,mode:"box"}}});for(const e of this._labelKeys())o.push({name:Ri+e,selector:{text:{}}});for(const e of this._roles())o.push({name:Ti+e,selector:{entity:{}}});return o}render(){if(!this._config)return q;const e=this._faceplate(),t=this._roles(),i=t.filter(e=>this._config?.entities?.[e]).length,r=B`
        <p class="note">${e.description??""}</p>
        <p class="note">
          ${i} of ${t.length} points set.
          ${this._config.device?"Points left blank are matched from the device.":!1===this._config.hide_unbound?"Points left blank stay dark on the card.":"Points left blank are left off the card."}
        </p>
      `;return customElements.get("ha-form")?B`
          ${r}
          <ha-form
            .hass=${this.hass}
            .data=${this._data()}
            .schema=${this._schema()}
            .computeLabel=${this._label}
            @value-changed=${e=>this._emit(this._fromData(e.detail.value))}
          ></ha-form>
        `:B`${r}${this._fallback()}`}_fallback(){const i=this._data(),r=Object.keys(this.hass?.states??{}).sort(),o=e=>t=>{const r=t.target.value;this._emit(this._fromData({...i,[e]:r}))};return B`
        <div class="editor">
          <label>
            Title
            <input .value=${String(i.title??"")} @change=${o("title")} />
          </label>
          <label>
            Faceplate
            <select @change=${o("faceplate")}>
              ${Ei(e).map(e=>B`<option value=${e.id}
                  ?selected=${e.id===i.faceplate}>${e.name}</option>`)}
            </select>
          </label>
          <label class="row">
            <input type="checkbox"
              .checked=${!1!==i.hide_unbound}
              @change=${e=>this._emit(this._fromData({...i,hide_unbound:e.target.checked}))} />
            Hide controls with nothing bound
          </label>
          <label>
            Device (fills every point below)
            <input .value=${String(i.device??"")} @change=${o("device")} />
          </label>
          ${(this._faceplate().options??[]).map(e=>B`
              <label>
                ${e.label}
                <input type="number" min=${e.min} max=${e.max}
                  .value=${String(i[Li+e.key]??e.default)}
                  @change=${o(Li+e.key)} />
                ${e.help?B`<span class="note">${e.help}</span>`:q}
              </label>
            `)}
          ${(t.numbers??[]).map(e=>B`
              <label>
                ${e.label}
                <input type="number" min=${e.min} max=${e.max}
                  step=${e.step??1}
                  .value=${String(i[e.key]??"")}
                  @change=${o(e.key)} />
              </label>
            `)}
          ${this._labelKeys().map(e=>B`
              <label>
                ${Oi(e)} name
                <input .value=${String(i[Ri+e]??"")}
                  placeholder="shown on the strip"
                  @change=${o(Ri+e)} />
              </label>
            `)}
          <datalist id="fp-entities">
            ${r.map(e=>B`<option value=${e}></option>`)}
          </datalist>
          ${this._roles().map(e=>B`
              <label>
                ${Oi(e)}
                <input list="fp-entities" placeholder="entity id"
                  .value=${String(i[Ti+e]??"")}
                  @change=${o(Ti+e)} />
              </label>
            `)}
        </div>
      `}}i.properties={hass:{attribute:!1},_config:{state:!0}},i.styles=a`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 8px 0;
      }
      label.row {
        flex-direction: row;
        align-items: center;
        gap: 8px;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 13px;
        color: var(--secondary-text-color);
      }
      select,
      input {
        padding: 6px 8px;
        border-radius: 6px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font: inherit;
      }
      .note {
        margin: 0 0 8px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
    `,customElements.define(`${e}-editor`,i)}const Ui={energy_total:/metertotal$|_energy_total$|_kwh_total$/,power_total:/3phase_active_power$|_active_power$|_power_total$/,power_l1:/active_power_p1$/,power_l2:/active_power_p2$/,power_l3:/active_power_p3$/,volts_l1:/phase_1_v$|_l1_n$|_voltage_l1$/,volts_l2:/phase_2_v$|_l2_n$|_voltage_l2$/,volts_l3:/phase_3_v$|_l3_n$|_voltage_l3$/,current_l1:/phase_1_a$|_current_l1$/,current_l2:/phase_2_a$|_current_l2$/,current_l3:/phase_3_a$|_current_l3$/,power_factor:/power_factor$/,frequency:/frequency$/,volume_total:/_cubicmetre$|_volume_total$|_water_total$|watermeter_total$/,bypass_total:/_bypass_total$|_bypass_cubicmetre$/,flow_rate:/_flow_rate$|_flowrate$|_l_min$|_l_s$|_m3_h$/,battery:/_battery$|_battery_level$|_batt$/,alarm:/_alarm$|_common_fault$/,reverse_flow:/_reverse_flow$|_reverse$/},Di=new Set(["unavailable","unknown","none",""]),Gi={volts_avg:["volts_l1","volts_l2","volts_l3"],current_avg:["current_l1","current_l2","current_l3"]};function Hi(e,t){const i=e.entities??{};let r=t;const o=e.devices??{};if(!o[t]){const e=t.trim().toLowerCase(),i=Object.entries(o).find(([i,r])=>(r.name_by_user??"").trim().toLowerCase()===e||(r.name??"").trim().toLowerCase()===e||i===t);i&&(r=i[0])}const a=Object.values(i).filter(e=>e.device_id===r).map(e=>e.entity_id).filter(t=>void 0!==e.states[t]).sort();return a.length?a:Object.keys(e.states).filter(e=>e.includes(t)).sort()}function Fi(e,t){if(!t)return{dark:!0,stale:!1};const i=e.states[t];if(!i)return{entityId:t,dark:!0,stale:!1};const r=String(i.state);if(Di.has(r.toLowerCase()))return{entityId:t,state:r,dark:!0,stale:!0};const o=Number(r);return{entityId:t,state:r,value:Number.isFinite(o)?o:void 0,unit:i.attributes.unit_of_measurement,dark:!1,stale:!1}}function Bi(e,t,i){const r=e.states[t];if(!r)return{entityId:t,dark:!0,stale:!1};if(Di.has(String(r.state).toLowerCase()))return{entityId:t,state:r.state,dark:!0,stale:!0};const o=r.attributes,a=(e,i)=>{if(null==e)return{entityId:t,dark:!0,stale:!1};const r=Number(e);return{entityId:t,state:String(e),value:Number.isFinite(r)?r:void 0,unit:i,dark:!1,stale:!1}};switch(i){case"hvac_mode":return a(r.state);case"hvac_action":return a(o.hvac_action??r.state);case"setpoint":return a(o.temperature,"°C");case"room_temp":return a(o.current_temperature,"°C");case"fan_speed":return a(o.fan_mode);case"swing":return a(o.swing_mode);case"power":return a("off"===r.state?"off":"on");case"humidity":return a(o.current_humidity,"%");default:return{entityId:t,dark:!0,stale:!1}}}async function Wi(e,t,i,r,o=1,a){const n=i.target?t?.[i.target]:void 0;if(!n)return void r(`Nothing is bound to ${i.target??"this control"}.`);const s=e.states[n];if(!s)return void r(`${n} does not exist.`);if("source_cycle"===i.action){const t=n.split(".")[0];return"select"!==t&&"input_select"!==t?void r(`${n} is a ${t}; it has no source list to step.`):void await e.callService(t,"select_next",{entity_id:n,cycle:!0})}if("press"===i.action){const t=n.split(".")[0];return void("button"===t||"input_button"===t?await e.callService(t,"press",{entity_id:n}):"switch"===t||"input_boolean"===t?await e.callService("homeassistant","toggle",{entity_id:n}):r(`${n} is a ${t}; it cannot be pressed.`))}if("mute_toggle"===i.action||"power_toggle"===i.action){const t=n.split(".")[0];return"sensor"===t||"binary_sensor"===t?void r(`${n} is read-only — it reports state but cannot be set.`):void await e.callService("homeassistant","toggle",{entity_id:n})}const l=Number(s.state);if(!Number.isFinite(l))return void r(`${n} has no numeric level to change.`);const d=Number(s.attributes.min??-1/0),c=Number(s.attributes.max??1/0);let h;if("set_level"===i.action){if(void 0===a||!Number.isFinite(a))return;h=Math.min(c,Math.max(d,a));const e=Number(s.attributes.step);Number.isFinite(e)&&e>0&&(h=Math.round(h/e)*e),h=Math.round(100*h)/100}else{const e=Number(o)||1,t="level_up"===i.action?e:-e;if(h=Math.min(c,Math.max(d,l+t)),h===l)return void r(`${n} is already at its ${t>0?"maximum":"minimum"}.`)}if(h===l)return;const p=n.split(".")[0];"number"===p||"input_number"===p?await e.callService(p,"set_value",{entity_id:n,value:h}):r(`${n} is a ${p}; its level cannot be set from here.`)}function ji(e,t){if(!t)return;const i=(t.title??t.name??"").trim();return i||(e&&t.device?function(e,t){const i=e.devices??{},r=i[t]??Object.values(i).find(e=>{const i=t.trim().toLowerCase();return(e.name_by_user??"").trim().toLowerCase()===i||(e.name??"").trim().toLowerCase()===i});return(r?.name_by_user||r?.name)??void 0}(e,t.device):void 0)}const qi=new Set(["mute_toggle","power_toggle","level_up","level_down","set_level","source_cycle"]);function Vi(e,t,i){return e.group?i(e.group):e.role?t(e.role):!(e.target&&e.action&&qi.has(e.action))||t(e.target)}function Ki(e,t,i,r,o=e=>e){const a=t.options??{},n=Pi(i,a,{bound:()=>!0,filtering:!1}),s=o([...new Set(n.regions.map(e=>e.role))].filter(Boolean)),l=function(e,t,i={},r=[]){const o={};for(const a of t){if(i[a]){o[a]=i[a];continue}const t=r.length?r:Object.keys(e.states),n=Ui[a];if(!n)continue;const s=t.find(e=>n.test(e));s&&(o[a]=s)}return o}(e,s,t.entities??{},r),d=e=>{if(l[e])return!0;const t=Gi[e];return Boolean(t?.length&&t.every(e=>l[e]))};if(!1===t.hide_unbound)return{faceplate:n,bindings:l,roles:s,hidden:0};const c=Pi(i,a,{bound:d,filtering:!0}),h=new Set;for(const e of c.regions)e.group&&e.role&&d(e.role)&&h.add(e.group);const p=e=>h.has(e),f=c.regions.filter(e=>Vi(e,d,p)),u=new Set;let x=0;for(const e of c.regions)Vi(e,d,p)||(e.group?u.add(e.group):x+=1);const m=u.size+x;return{faceplate:{...c,regions:f},bindings:l,roles:s,hidden:m}}function Zi(e){return 1===e?"1 control hidden — nothing bound to it.":`${e} controls hidden — nothing bound to them.`}function Yi(e){const[t,i]=e.faceplate.size,r=(o=e.faceplate,a=e.page,o.regions.filter(e=>!e.page||e.page===a));var o,a;return B`
    <svg
      class="faceplate display-${e.faceplate.display??"positive"}"
      viewBox="0 0 ${t} ${i}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label=${e.faceplate.name}
      style=${`--faceplate-width:${t}px`}
    >
      ${function(e){if("image"===e.render&&e.art){const[t,i]=e.size;return W`<image href=${e.art} x="0" y="0" width=${t} height=${i} />`}return W`${e.artNode??""}`}(e.faceplate)}
      ${r.map(t=>function(e,t){const i=e.climate&&!e.bindings[t.role]?Bi(e.hass,e.climate,t.role):function(e,t,i){if(t[i])return Fi(e,t[i]);if("clock"===i){const e=new Date;return{state:`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`,dark:!1,stale:!1}}const r=Gi[i];if(!r)return{dark:!0,stale:!1};const o=r.map(i=>Fi(e,t[i]));if(o.some(e=>e.dark||void 0===e.value))return{dark:!0,stale:o.some(e=>e.stale)};const a=o.reduce((e,t)=>e+(t.value??0),0);return{value:a/o.length,state:String(a/o.length),unit:o[0].unit,dark:!1,stale:!1}}(e.hass,e.bindings,t.role);switch(t.kind){case"text":return function(e,t){const i=e.role?"unit"===e.show?(t.unit??e.text??"").toUpperCase():t.dark&&void 0!==e.placeholder?e.placeholder:function(e,t=1,i){if(e.dark)return"--";if(void 0===e.value)return e.state??"--";const r=e.value.toFixed(t),o=i??e.unit??"";return o?`${r} ${o}`:r}(t,e.decimals??1,e.unit):e.text??"";if(!e.role&&!e.text)return W``;const r=e.align??"start",o=e.x+("end"===r?e.w??0:"middle"===r?(e.w??0)/2:0);return W`
    ${e.label?W`<text class="lcd-label" x=${e.x} y=${e.y-10}>${e.label}</text>`:""}
    <text
      class="lcd-value ${e.role?"":"chrome"} ${e.role&&t.dark?"dark":""} ${t.stale?"stale":""}"
      x=${o}
      y=${e.y+(e.size??22)}
      font-size=${e.size??22}
      text-anchor=${r}
      style=${e.color?`fill:${e.color}`:""}
    >${i}</text>
  `}(t,i);case"lamp":return function(e,t){const i=t.state?.trim()??"",r=""===i?NaN:Number(i),o=!t.dark&&void 0!==t.state&&(Number.isFinite(r)?0!==r:!["off","false","normal","ok"].includes(i.toLowerCase())),a=(e.w??12)/2;return W`
    <circle
      class="lamp ${o?"lit":""}"
      cx=${e.x+a}
      cy=${e.y+a}
      r=${a}
      fill=${o?e.on??"#e34":e.off??"#3a1418"}
    />
    ${e.label?W`<text class="lamp-label" x=${e.x+a} y=${e.y+2*a+12}
              text-anchor="middle">${e.label}</text>`:""}
  `}(t,i);case"bar":return function(e,t,i){const r=t.w??100,o=t.h??10,a=t.max??100,n=t.min??0,s=a-n||1,l=i.dark||void 0===i.value?0:Math.max(0,Math.min(1,(i.value-n)/s)),d="set_level"===t.action,c=i=>{const r=i.currentTarget.getBoundingClientRect();if(!r.width)return;const o=Math.min(1,Math.max(0,(i.clientX-r.left)/r.width));e.onAction(t,n+o*s)};return W`
    <rect class="bar-track" x=${t.x} y=${t.y} width=${r} height=${o} rx="2" />
    <rect
      class="bar-fill"
      x=${t.x}
      y=${t.y}
      width=${r*l}
      height=${o}
      rx="2"
    />
    ${d?W`<rect
          class="bar-hit"
          x=${t.x}
          y=${t.y-8}
          width=${r}
          height=${o+16}
          fill="transparent"
          @click=${c}
        />`:""}
  `}(e,t,i);case"ring":return function(e,t){const i=(t.state??"").toLowerCase(),r=!t.dark&&"off"!==i&&"0"!==i&&"false"!==i;return W`
    <circle
      class="ring ${r?"lit":""}"
      cx=${e.x}
      cy=${e.y}
      r=${e.r??100}
      fill="none"
      stroke=${r?e.on??"#3aa0ff":e.off??"#1b2026"}
      stroke-width=${e.stroke??6}
    />
  `}(t,i);case"odometer":return function(e,t){const i=e.digits??5,r=e.redDigits??1,o=e.scale??1,a=(e.w??140)/i,n=e.h??34,s=t.dark||void 0===t.value?"-".repeat(i):String(Math.floor(Math.abs(t.value)/o)).slice(-i).padStart(i,"0");return W`
    <g class="odometer ${t.dark?"dark":""}">
      ${[...s].map((t,o)=>{const s=o>=i-r;return W`
          <rect
            class="odo-cell ${s?"odo-red":""}"
            x=${e.x+o*a}
            y=${e.y}
            width=${a-1.5}
            height=${n}
            rx="1.5"
          />
          <text
            class="odo-digit ${s?"odo-red-digit":""}"
            x=${e.x+o*a+(a-1.5)/2}
            y=${e.y+n-8}
            text-anchor="middle"
            font-size=${n-12}
          >${t}</text>
        `})}
    </g>
  `}(t,i);case"needle":return function(e,t){const i=e.r??26,r=e.scale??1,o=t.dark||void 0===t.value?0:Math.abs(t.value)/r%10/10,a=2*o*Math.PI-Math.PI/2,n=e.x+Math.cos(a)*(i-5),s=e.y+Math.sin(a)*(i-5);return W`
    <g class="dial ${t.dark?"dark":""}">
      <circle class="dial-face" cx=${e.x} cy=${e.y} r=${i} />
      ${[...Array(10).keys()].map(t=>{const r=t/10*2*Math.PI-Math.PI/2;return W`<line
          class="dial-tick"
          x1=${e.x+Math.cos(r)*(i-4)}
          y1=${e.y+Math.sin(r)*(i-4)}
          x2=${e.x+Math.cos(r)*i}
          y2=${e.y+Math.sin(r)*i}
        />`})}
      <line class="dial-needle" x1=${e.x} y1=${e.y} x2=${n} y2=${s} />
      <circle class="dial-hub" cx=${e.x} cy=${e.y} r="2.4" />
      ${e.label?W`<text class="dial-label" x=${e.x} y=${e.y+i+13}
                text-anchor="middle">${e.label}</text>`:""}
    </g>
  `}(t,i);case"fader":return function(e,t,i){const r=t.w??44,o=t.h??200,a=t.max??100,n=t.min??0,s=a-n||1,l=t.x+r/2,d=i.dark||void 0===i.value?0:Math.max(0,Math.min(1,(i.value-n)/s)),c=16,h=o-c,p=t.y+h*(1-d),f=i=>{const r=i.currentTarget.getBoundingClientRect();if(!r.height)return;const o=Math.min(1,Math.max(0,1-(i.clientY-r.top)/r.height));e.onAction(t,n+o*s)},u=t.ticks??5;return W`
    <g class="fader ${i.dark?"dark":""}">
      ${[...Array(u).keys()].map(e=>{const i=t.y+c/2+h*e/(u-1||1);return W`<line class="fader-tick"
          x1=${t.x+4} y1=${i} x2=${t.x+r-4} y2=${i} />`})}
      <rect class="fader-slot" x=${l-3} y=${t.y+c/2-2}
            width="6" height=${h+4} rx="3" />
      <rect class="fader-travelled" x=${l-3}
            y=${p+c/2-2}
            width="6" height=${t.y+h+c/2+2-(p+c/2)}
            rx="3" />
      <rect class="fader-cap" x=${l-15} y=${p}
            width="30" height=${c} rx="3" />
      <line class="fader-line" x1=${l-13} y1=${p+c/2}
            x2=${l+13} y2=${p+c/2} />
      ${"set_level"===t.action?W`<rect class="fader-hit" x=${t.x} y=${t.y}
            width=${r} height=${o} fill="transparent" @click=${f} />`:""}
    </g>
  `}(e,t,i);case"button":return function(e,t){const i=t.w??44,r=t.h??26,o=[t.size?`font-size:${t.size}px`:"",t.color?`fill:${t.color}`:""].filter(Boolean).join(";");return W`
    <g class="button" @click=${()=>e.onAction(t)} role="button" tabindex="0">
      <rect
        x=${t.x}
        y=${t.y}
        width=${i}
        height=${r}
        rx=${t.radius??4}
      />
      <text
        x=${t.x+i/2}
        y=${t.y+r/2+(t.size??12)/3}
        text-anchor="middle"
        style=${o}
      >${t.text??""}</text>
    </g>
  `}(e,t);case"plate":return function(e){return W`
    <rect
      class="plate"
      x=${e.x}
      y=${e.y}
      width=${e.w??0}
      height=${e.h??0}
      rx=${e.radius??0}
      fill=${e.fill??"none"}
      stroke=${e.border??"none"}
    />
    ${e.text?W`<text
          class="plate-label"
          x=${e.x+(e.w??0)/2}
          y=${e.y+(e.size??16)}
          font-size=${e.size??16}
          text-anchor="middle"
          fill=${e.color??"currentColor"}
        >${e.text}</text>`:""}
  `}(t)}}(e,t))}
    </svg>
  `}const Qi="bms-meter-card";class Xi extends le{constructor(){super(),this._page=""}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e;const t=Ni(Qi,e.faceplate);this._page=e.page??t.pages?.[0]??""}getCardSize(){return 4}static getConfigElement(){return document.createElement(`${Qi}-editor`)}static getStubConfig(){return{type:`custom:${Qi}`,faceplate:"schneider-pm2200"}}_onAction(e){const t=Ni(Qi,this._config?.faceplate).pages??[];if(!t.length)return;if("page"===e.action&&e.target)return void(this._page=e.target);const i=t.indexOf(this._page),r="prev_page"===e.action?-1:1;this._page=t[(i+r+t.length)%t.length]}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:r}=Ki(this.hass,this._config,Ni(Qi,this._config.faceplate),this._config.device?Hi(this.hass,this._config.device):[],e=>[...new Set(e.flatMap(e=>Gi[e]??[e]))]),o=i.filter(e=>!t[e]),a=i.length-o.length,n=0===a&&!1!==this._config.hide_unbound,s=ji(this.hass,this._config);return B`
      <ha-card>
        ${s?B`<div class="title">${s}</div>`:q}
        ${r&&a>0?B`<div class="hint muted">${Zi(r)}</div>`:q}
        ${n?B`<div class="hint">
              Nothing bound. Set a device, or map roles such as
              <code>volts_l1</code> and <code>energy_total</code>.
            </div>`:B`<div class="frame">
          ${Yi({hass:this.hass,faceplate:e,bindings:t,page:this._page,onAction:e=>this._onAction(e)})}
        </div>`}
        ${o.length===i.length?B`<div class="hint">
              No entities bound. Set them in the card editor, or point the card
              at a device.
            </div>`:q}
      </ha-card>
    `}}Xi.properties={hass:{attribute:!1},_config:{state:!0},_page:{state:!0}},Xi.styles=a`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .title {
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 3px solid var(--primary-color);
    }
    .frame {
      width: 100%;
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      /* Scale down to the column, never up past the drawing's own size:
         a one-channel console stretched across a wide card reads as a
         giant empty frame rather than a small instrument. */
      max-width: var(--faceplate-width, none);
      margin: 0 auto;
    }
    /* LCD text. Deliberately a fixed palette: an LCD does not follow the
       dashboard theme, and making it do so stops it reading as hardware. */
    .lcd-value {
      fill: #1d2a17;
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
      font-weight: 600;
    }
    .lcd-label {
      fill: #46543c;
      font-size: 13px;
      font-family: inherit;
      letter-spacing: 0.04em;
    }
    /* Unbound and unavailable both read as an unlit display rather than a
       confident number. */
    .lcd-value.dark {
      fill: #7b8a70;
    }
    .lcd-value.stale {
      fill: #8a6b23;
    }
    /* Negative displays: light text on a dark face. */
    .display-negative .lcd-value {
      fill: #e8f2e0;
    }
    .display-negative .lcd-label {
      fill: #8fa383;
    }
    .display-negative .lcd-value.dark {
      fill: #4a5647;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    /* Literal chrome inside a display: titles, soft-key legends. */
    .lcd-value.chrome {
      fill: #f2f5ef;
      font-weight: 500;
      font-family: inherit;
    }
    .display-positive .lcd-value.chrome {
      fill: #2c3a26;
    }
    /* The PM2200 title band is dark, so its title stays light. */
    .display-positive text#title-on-band {
      fill: #f2f5ef;
    }
    /* Chassis lettering, drawn in the artwork rather than bound to data. */
    .pm-brand {
      fill: #e6e9ec;
      font-size: 21px;
      font-weight: 500;
      letter-spacing: 0.01em;
    }
    .pm-brand-sub {
      fill: #aeb4ba;
      font-size: 11px;
      letter-spacing: 0.22em;
    }
    .pm-model {
      fill: #dfe3e7;
      font-size: 11px;
      letter-spacing: 0.02em;
    }
    .cvm-brand {
      fill: #4c5158;
      font-size: 17px;
      font-weight: 600;
    }
    .cvm-model {
      fill: #2f343a;
      font-size: 14px;
      font-weight: 500;
    }
    .cvm-annun {
      fill: #cfd8cc;
      font-size: 13px;
    }
    .cvm-annun.teal {
      fill: #3fbfa8;
    }
    .cvm-annun.dark {
      fill: #6c7075;
    }
    /* Mechanical register: an odometer and sweep dials on a painted face. */
    .odo-cell {
      fill: #f6f4ec;
      stroke: #6d6a5e;
      stroke-width: 0.8;
    }
    .odo-cell.odo-red {
      fill: #a8231d;
      stroke: #6d120e;
    }
    .odo-digit {
      fill: #1b1b18;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 700;
    }
    .odo-digit.odo-red-digit {
      fill: #fdf6f5;
    }
    .odometer.dark .odo-digit {
      fill: #8d8a80;
    }
    .dial-face {
      fill: #fbf9f2;
      stroke: #7d7a6e;
      stroke-width: 1.2;
    }
    .dial-tick {
      stroke: #7d7a6e;
      stroke-width: 1;
    }
    .dial-needle {
      stroke: #b3241c;
      stroke-width: 2.2;
      stroke-linecap: round;
    }
    .dial-hub {
      fill: #7d1a14;
    }
    .dial.dark .dial-needle {
      stroke: #b9b6ab;
    }
    .dial-label {
      fill: #3d3b34;
      font-size: 12px;
    }
    .mj-brand {
      fill: #8a2018;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.06em;
    }
    .mj-spec text {
      fill: #4a4840;
      font-size: 10.5px;
    }
    .lamp {
      stroke: #11151a;
      stroke-width: 1;
    }
    .lamp.lit {
      filter: drop-shadow(0 0 4px currentColor);
    }
    .lamp-label {
      fill: #8b949e;
      font-size: 11px;
    }
    .bar-track {
      fill: #1a1f24;
    }
    .bar-fill {
      fill: var(--primary-color, #03a9f4);
    }
    .button rect {
      fill: #444a51;
      stroke: #14171a;
    }
    .button:hover rect {
      fill: #565d66;
    }
    .button text {
      fill: #dfe3e8;
      font-size: 12px;
      letter-spacing: 0.05em;
      pointer-events: none;
    }
    .button {
      cursor: pointer;
    }
    /* A footnote. It has to be findable, not announced. */
    .hint.muted {
      opacity: 0.55;
      font-size: 11px;
      padding: 6px 4px 0;
      text-align: right;
    }
    .hint {
      padding: 10px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `,customElements.define(Qi,Xi),Ii(Qi,{expandRoles:e=>[...new Set(e.flatMap(e=>Gi[e]??[e]))]}),window.customCards??=[],window.customCards.push({type:Qi,name:"BMS Meter Card",description:"A power meter that looks like a power meter.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-Cards"});const Ji="hvac-controller-card",er=["off","cool","heat","dry","fan_only","auto"];class tr extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 5}static getConfigElement(){return document.createElement(`${Ji}-editor`)}static getStubConfig(){return{type:`custom:${Ji}`,faceplate:"daikin-brc1e63"}}_setpoint(){if(!this.hass||!this._config)return;if(this._config.climate)return Bi(this.hass,this._config.climate,"setpoint").value;const e=this._config.entities?.setpoint;return e?Number(this.hass.states[e]?.state):void 0}async _onAction(e){if(!this.hass||!this._config)return;const t=this._config.climate;if(!t)return void this._notify("This controller is read-only — no climate entity is set.");const i=this._setpoint();switch(e.action){case"temp_up":case"temp_down":{if(void 0===i)return;const r="temp_up"===e.action?.5:-.5;return void await this.hass.callService("climate","set_temperature",{entity_id:t,temperature:Math.round(2*(i+r))/2})}case"power_toggle":{const e="off"!==this.hass.states[t]?.state;return void await this.hass.callService("climate",e?"turn_off":"turn_on",{entity_id:t})}case"fan_cycle":{const e=this.hass.states[t]?.attributes.fan_modes??[];if(!e.length)return;const i=this.hass.states[t]?.attributes.fan_mode,r=e[(e.indexOf(i)+1)%e.length];return void await this.hass.callService("climate","set_fan_mode",{entity_id:t,fan_mode:r})}case"mode_cycle":{const e=this.hass.states[t]?.attributes.hvac_modes??er,i=this.hass.states[t]?.state??e[0],r=e[(e.indexOf(i)+1)%e.length];return void await this.hass.callService("climate","set_hvac_mode",{entity_id:t,hvac_mode:r})}default:return}}_notify(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e},bubbles:!0,composed:!0}))}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:r}=Ki(this.hass,this._config.climate?{...this._config,hide_unbound:!1}:this._config,Ni(Ji,this._config.faceplate),this._config.device?Hi(this.hass,this._config.device):[]),o=this._config.climate?i.length:i.filter(e=>t[e]).length,a=0===o&&!1!==this._config.hide_unbound,n=ji(this.hass,this._config);return B`
      <ha-card>
        ${n?B`<div class="title">${n}</div>`:q}
        ${this._config.climate||this._config.entities?q:B`<div class="hint">
              Nothing bound yet. Choose a climate entity in the editor, or map
              entities per role in YAML.
            </div>`}
        ${r&&o>0?B`<div class="hint muted">${Zi(r)}</div>`:q}
        ${a?q:B`<div class="frame">
          ${Yi({hass:this.hass,climate:this._config.climate,faceplate:e,bindings:t,page:"",onAction:e=>{this._onAction(e)}})}
        </div>`}
      </ha-card>
    `}}tr.properties={hass:{attribute:!1},_config:{state:!0}},tr.styles=a`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .title {
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 3px solid var(--primary-color);
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      max-height: 520px;
    }
    /* Daikin's dark controllers render cyan on black. Fixed, not themed:
       a display that follows the dashboard stops reading as hardware. */
    .display-negative .lcd-value {
      fill: #6fe3ea;
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
      font-weight: 500;
    }
    .display-negative .lcd-label,
    .display-negative .lcd-value.chrome {
      fill: #7f9aa0;
      font-family: inherit;
    }
    .display-negative .lcd-value.dark {
      fill: #33484d;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    /* Positive LCD: dark text on a pale backlight, as the BRC1E has. */
    .display-positive .lcd-value {
      fill: #26302a;
      font-family: ui-monospace, "SF Mono", Menlo, monospace;
      font-weight: 600;
    }
    .display-positive .lcd-label,
    .display-positive .lcd-value.chrome {
      fill: #46543f;
      font-family: inherit;
      font-weight: 400;
    }
    .display-positive .lcd-value.dark {
      fill: #8b9a85;
    }
    .display-positive .lcd-value.stale {
      fill: #9a6b1f;
    }
    .brc2-brand {
      fill: #4a5057;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.08em;
    }
    .brc315-brand {
      fill: #3a4046;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
    }
    .brc315-onoff {
      fill: #3a4046;
      font-size: 14px;
      font-weight: 600;
    }
    .brc315-ring {
      fill: #3d4838;
      font-size: 8px;
    }
    .brc315-icon {
      fill: #3d4838;
      font-size: 12px;
    }
    .brc-glyph {
      font-size: 15px;
      fill: #3a4046;
    }
    .brc-enter {
      font-size: 22px;
      fill: #3a4046;
    }
    .brc-brand {
      fill: #2f3439;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
    .madoka-brand {
      fill: #2d3238;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.08em;
    }
    .ring.lit {
      filter: drop-shadow(0 0 7px #2f8fff);
    }
    .button rect {
      fill: transparent;
      stroke: none;
    }
    .button text {
      fill: #8fa8ad;
      font-size: 22px;
      pointer-events: none;
    }
    .button:hover text {
      fill: #cfeef2;
    }
    .button {
      cursor: pointer;
    }
    /* A footnote. It has to be findable, not announced. */
    .hint.muted {
      opacity: 0.55;
      font-size: 11px;
      padding: 6px 4px 0;
      text-align: right;
    }
    .hint {
      padding: 2px 4px 10px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `,customElements.define(Ji,tr),Ii(Ji),window.customCards??=[],window.customCards.push({type:Ji,name:"HVAC Controller Card",description:"A wall controller that looks and behaves like the real one.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-Cards"});const ir="pump-system-card";class rr extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 5}static getConfigElement(){return document.createElement(`${ir}-editor`)}static getStubConfig(){return{type:`custom:${ir}`,faceplate:"vertical-pumpset",options:{pumps:3}}}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:r}=Ki(this.hass,this._config,Ni(ir,this._config.faceplate),this._config.device?Hi(this.hass,this._config.device):[]),o=e,a=i.filter(e=>t[e]).length,n=0===a&&!1!==this._config.hide_unbound,s=ji(this.hass,this._config);return B`
      <ha-card>
        ${s?B`<div class="title">${s}</div>`:q}
        ${n?q:B`<div class="frame">
          ${Yi({hass:this.hass,faceplate:o,bindings:t,page:"",onAction:()=>{}})}
        </div>`}
        ${r&&a>0?B`<div class="hint muted">${Zi(r)}</div>`:q}
        ${0===a?B`<div class="hint">
              Nothing bound. Map <code>pump1_run</code>,
              <code>system_pressure</code> and the rest in YAML, or point the
              card at a device typed as a pump set.
            </div>`:q}
      </ha-card>
    `}}rr.properties={hass:{attribute:!1},_config:{state:!0}},rr.styles=a`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .title {
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 3px solid var(--primary-color);
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      /* Scale down to the column, never up past the drawing's own size:
         a one-channel console stretched across a wide card reads as a
         giant empty frame rather than a small instrument. */
      max-width: var(--faceplate-width, none);
      margin: 0 auto;
    }
    /* Panel HMI: light on a dark screen. */
    .display-negative .lcd-value {
      fill: #7ce0d2;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 600;
    }
    .display-negative .lcd-label,
    .display-negative .lcd-value.chrome {
      fill: #9fb0ad;
      font-family: inherit;
    }
    .display-negative .lcd-value.dark {
      fill: #38514e;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    /* Pump labels and speeds sit on the card, not on a display. */
    .lcd-value {
      fill: var(--primary-text-color);
      font-family: ui-monospace, Menlo, monospace;
    }
    .lamp {
      stroke: #0d1013;
      stroke-width: 1;
    }
    .lamp.lit {
      filter: drop-shadow(0 0 5px currentColor);
    }
    /* A footnote. It has to be findable, not announced. */
    .hint.muted {
      opacity: 0.55;
      font-size: 11px;
      padding: 6px 4px 0;
      text-align: right;
    }
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `,customElements.define(ir,rr),Ii(ir),window.customCards??=[],window.customCards.push({type:ir,name:"Pump System Card",description:"A booster set from one pump to ten, drawn to suit.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const or="audio-zone-card";class ar extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 4}static getConfigElement(){return document.createElement(`${or}-editor`)}static getStubConfig(){return{type:`custom:${or}`,faceplate:"qsys-zone-rack",options:{zones:4}}}_notify(e){this._error=e,setTimeout(()=>{this._error=void 0},4e3)}async _onAction(e,t){this.hass&&this._config&&await Wi(this.hass,this._config.entities,e,e=>this._notify(e),Number(this._config.step??1),t)}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:r}=Ki(this.hass,this._config,Ni(or,this._config.faceplate),this._config.device?Hi(this.hass,this._config.device):[]),o=function(e,t,i){return t?{...e,regions:e.regions.map(e=>{const r=/^name(\d+)$/.exec(e.id),o=r?t[`${i}${r[1]}`]:void 0;return o?{...e,text:o}:e})}:e}(e,this._config.labels,e.labelPrefix??"zone"),a=i.filter(e=>t[e]).length,n=0===a&&!1!==this._config.hide_unbound,s=ji(this.hass,this._config);return B`
      <ha-card>
        ${s?B`<div class="title">${s}</div>`:q}
        ${n?q:B`<div class="frame">
          ${Yi({hass:this.hass,faceplate:o,bindings:t,page:"",onAction:(e,t)=>{this._onAction(e,t)}})}
        </div>`}
        ${this._error?B`<div class="hint">${this._error}</div>`:q}
        ${r&&a>0?B`<div class="hint muted">${Zi(r)}</div>`:q}
        ${0===a?B`<div class="hint">
              Nothing bound. Map <code>zone1_volume</code> and
              <code>zone1_mute</code> in YAML, or generate the card from the
              Q-SYS add-on.
            </div>`:q}
      </ha-card>
    `}}ar.properties={hass:{attribute:!1},_config:{state:!0},_error:{state:!0}},ar.styles=a`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .title {
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 3px solid var(--primary-color);
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      /* Scale down to the column, never up past the drawing's own size:
         a one-channel console stretched across a wide card reads as a
         giant empty frame rather than a small instrument. */
      max-width: var(--faceplate-width, none);
      margin: 0 auto;
    }
    .display-negative .lcd-value {
      fill: #7ce0d2;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 600;
    }
    .display-negative .lcd-label,
    .display-negative .lcd-value.chrome {
      fill: #8b93a1;
      font-family: inherit;
      letter-spacing: 1px;
    }
    .display-negative .lcd-value.dark {
      fill: #38514e;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    .bar-track {
      fill: #23262c;
    }
    .bar-fill {
      fill: #4ea1ff;
    }
    .bar-hit,
    .fader-hit {
      cursor: pointer;
    }
    /* A console fader: slotted track, travelled section, moulded cap. */
    .fader-slot {
      fill: #0a0c0f;
      stroke: #2b313a;
      stroke-width: 1;
    }
    .fader-travelled {
      fill: #2b6fb5;
    }
    .fader-tick {
      stroke: #2b313a;
      stroke-width: 1;
    }
    .fader-cap {
      fill: #d7dce3;
      stroke: #8f97a3;
      stroke-width: 1;
    }
    .fader-line {
      stroke: #3d434c;
      stroke-width: 2;
    }
    .fader.dark .fader-cap {
      fill: #4a5058;
      stroke: #3a4048;
    }
    .fader.dark .fader-travelled {
      fill: #253241;
    }
    /* Strip labels sit on the backlit scribble plate. */
    .display-negative .lcd-value.chrome {
      fill: #cdd3dc;
    }
    .lamp {
      stroke: #0d1013;
      stroke-width: 1;
    }
    .lamp.lit {
      filter: drop-shadow(0 0 5px currentColor);
    }
    .button rect {
      fill: #23262c;
      stroke: #343942;
    }
    .button text {
      fill: #cdd3dc;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .button:hover rect {
      fill: #2d323a;
    }
    .button {
      cursor: pointer;
    }
    /* A footnote. It has to be findable, not announced. */
    .hint.muted {
      opacity: 0.55;
      font-size: 11px;
      padding: 6px 4px 0;
      text-align: right;
    }
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `,customElements.define(or,ar),Ii(or,{numbers:[{key:"step",label:"Trim step (dB)",min:.5,max:12,step:.5}]}),window.customCards??=[],window.customCards.push({type:or,name:"Audio Zone Card",description:"Level, mute and trim for one to sixteen audio zones.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const nr="room-controller-card";class sr extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 4}static getConfigElement(){return document.createElement(`${nr}-editor`)}static getStubConfig(){return{type:`custom:${nr}`,faceplate:"av-room-controller"}}_notify(e){this._error=e,setTimeout(()=>{this._error=void 0},4e3)}async _onAction(e,t){this.hass&&this._config&&await Wi(this.hass,this._config.entities,e,e=>this._notify(e),Number(this._config.step??1),t)}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:r}=Ki(this.hass,this._config,Ni(nr,this._config.faceplate),this._config.device?Hi(this.hass,this._config.device):[]),o=e,a=i.filter(e=>t[e]).length,n=0===a&&!1!==this._config.hide_unbound,s=ji(this.hass,this._config);return B`
      <ha-card>
        ${s?B`<div class="title">${s}</div>`:q}
        ${n?q:B`<div class="frame">
          ${Yi({hass:this.hass,faceplate:o,bindings:t,page:"",onAction:(e,t)=>{this._onAction(e,t)}})}
        </div>`}
        ${this._error?B`<div class="hint">${this._error}</div>`:q}
        ${r&&a>0?B`<div class="hint muted">${Zi(r)}</div>`:q}
        ${0===a?B`<div class="hint">
              Nothing bound. Map <code>volume</code>, <code>mute</code>,
              <code>source</code> and <code>display_power</code> in YAML, or
              generate the card from the Crestron add-on.
            </div>`:q}
      </ha-card>
    `}}sr.properties={hass:{attribute:!1},_config:{state:!0},_error:{state:!0}},sr.styles=a`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .title {
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 3px solid var(--primary-color);
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      /* Scale down to the column, never up past the drawing's own size:
         a one-channel console stretched across a wide card reads as a
         giant empty frame rather than a small instrument. */
      max-width: var(--faceplate-width, none);
      margin: 0 auto;
    }
    .display-negative .lcd-value {
      fill: #7ce0d2;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 600;
    }
    .display-negative .lcd-label,
    .display-negative .lcd-value.chrome {
      fill: #8b93a1;
      font-family: inherit;
      letter-spacing: 1px;
    }
    .display-negative .lcd-value.dark {
      fill: #38514e;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    .bar-track {
      fill: #23262c;
    }
    .bar-fill {
      fill: #4ea1ff;
    }
    .lamp {
      stroke: #0d1013;
      stroke-width: 1;
    }
    .lamp.lit {
      filter: drop-shadow(0 0 5px currentColor);
    }
    .button rect {
      fill: #23262c;
      stroke: #343942;
    }
    .button text {
      fill: #cdd3dc;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .button:hover rect {
      fill: #2d323a;
    }
    .button {
      cursor: pointer;
    }
    /* A footnote. It has to be findable, not announced. */
    .hint.muted {
      opacity: 0.55;
      font-size: 11px;
      padding: 6px 4px 0;
      text-align: right;
    }
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `,customElements.define(nr,sr),Ii(nr,{numbers:[{key:"step",label:"Trim step",min:.5,max:25,step:.5}]}),window.customCards??=[],window.customCards.push({type:nr,name:"Room Controller Card",description:"One AV room: source, display, volume, mute and status.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const lr="plant-equipment-card";class dr extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 5}static getConfigElement(){return document.createElement(`${lr}-editor`)}static getStubConfig(){return{type:`custom:${lr}`,faceplate:"supply-fan-top"}}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:r}=Ki(this.hass,this._config,Ni(lr,this._config.faceplate),this._config.device?Hi(this.hass,this._config.device):[]),o=e,a=i.filter(e=>t[e]).length,n=0===a&&!1!==this._config.hide_unbound,s=ji(this.hass,this._config);return B`
      <ha-card>
        ${s?B`<div class="title">${s}</div>`:q}
        ${n?q:B`<div class="frame">
          ${Yi({hass:this.hass,faceplate:o,bindings:t,page:"",onAction:()=>{}})}
        </div>`}
        ${r&&a>0?B`<div class="hint muted">${Zi(r)}</div>`:q}
        ${0===a?B`<div class="hint">
              Nothing bound. Map the roles this faceplate names in YAML,
              or point the card at a device with <code>device:</code>.
            </div>`:q}
      </ha-card>
    `}}dr.properties={hass:{attribute:!1},_config:{state:!0}},dr.styles=a`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .title {
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 3px solid var(--primary-color);
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      /* Scale down to the column, never up past the drawing's own size:
         a one-channel console stretched across a wide card reads as a
         giant empty frame rather than a small instrument. */
      max-width: var(--faceplate-width, none);
      margin: 0 auto;
    }
    /* Panel HMI: light on a dark screen. */
    .display-negative .lcd-value {
      fill: #7ce0d2;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 600;
    }
    .display-negative .lcd-label,
    .display-negative .lcd-value.chrome {
      fill: #9fb0ad;
      font-family: inherit;
    }
    .display-negative .lcd-value.dark {
      fill: #38514e;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    /* Pump labels and speeds sit on the card, not on a display. */
    .lcd-value {
      fill: var(--primary-text-color);
      font-family: ui-monospace, Menlo, monospace;
    }
    .lamp {
      stroke: #0d1013;
      stroke-width: 1;
    }
    .lamp.lit {
      filter: drop-shadow(0 0 5px currentColor);
    }
    /* A footnote. It has to be findable, not announced. */
    .hint.muted {
      opacity: 0.55;
      font-size: 11px;
      padding: 6px 4px 0;
      text-align: right;
    }
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `,customElements.define(lr,dr),Ii(lr),window.customCards??=[],window.customCards.push({type:lr,name:"Plant Equipment Card",description:"Supply and exhaust fans, hot water units and circulators.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const cr="fire-panel-card",hr=["fire_alarm","fault","isolate","brigade_signal","power"];class pr extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 5}static getConfigElement(){return document.createElement(`${cr}-editor`)}static getStubConfig(){return{type:`custom:${cr}`,faceplate:"generic-fip",options:{zones:8}}}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:r}=Ki(this.hass,this._config,Ni(cr,this._config.faceplate),this._config.device?Hi(this.hass,this._config.device):[]),o=e,a=i.filter(e=>t[e]).length,n=hr.filter(e=>!t[e]),s=0===a&&!1!==this._config.hide_unbound,l=ji(this.hass,this._config);return B`
      <ha-card>
        ${l?B`<div class="title">${l}</div>`:q}
        <div class="banner">BMS MONITORING — NOT THE FIRE PANEL</div>
        ${n.length?B`<div class="gap">
              Not monitored by the BMS:
              ${n.map(e=>e.replace(/_/g," ").toUpperCase()).join(", ")}
            </div>`:q}
        ${s?q:B`<div class="frame">
          ${Yi({hass:this.hass,faceplate:o,bindings:t,page:"",onAction:()=>{}})}
        </div>`}
        ${r&&a>0?B`<div class="hint muted">${Zi(r)}</div>`:q}
        ${0===a?B`<div class="hint">
              Nothing bound. Map <code>fire_alarm</code>,
              <code>zone1_alarm</code> and the rest, or point the card at a
              device with <code>device:</code>.
            </div>`:q}
      </ha-card>
    `}}pr.properties={hass:{attribute:!1},_config:{state:!0}},pr.styles=a`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .title {
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 3px solid var(--primary-color);
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      /* Scale down to the column, never up past the drawing's own size:
         a one-channel console stretched across a wide card reads as a
         giant empty frame rather than a small instrument. */
      max-width: var(--faceplate-width, none);
      margin: 0 auto;
    }
    /* Panel HMI: light on a dark screen. */
    .display-negative .lcd-value {
      fill: #7ce0d2;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 600;
    }
    .display-negative .lcd-label,
    .display-negative .lcd-value.chrome {
      fill: #9fb0ad;
      font-family: inherit;
    }
    .display-negative .lcd-value.dark {
      fill: #38514e;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    /* Pump labels and speeds sit on the card, not on a display. */
    .lcd-value {
      fill: var(--primary-text-color);
      font-family: ui-monospace, Menlo, monospace;
    }
    .lamp {
      stroke: #0d1013;
      stroke-width: 1;
    }
    .lamp.lit {
      filter: drop-shadow(0 0 5px currentColor);
    }
    .banner {
      background: #7f1d1d;
      color: #fee2e2;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 1.4px;
      text-align: center;
      padding: 6px 8px;
      border-radius: 6px;
      margin: 0 0 10px;
    }
    .gap {
      background: #78350f;
      color: #fde68a;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      padding: 5px 8px;
      border-radius: 6px;
      margin: -4px 0 10px;
    }
    /* A footnote. It has to be findable, not announced. */
    .hint.muted {
      opacity: 0.55;
      font-size: 11px;
      padding: 6px 4px 0;
      text-align: right;
    }
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `,customElements.define(cr,pr),Ii(cr),window.customCards??=[],window.customCards.push({type:cr,name:"Fire Panel Card",description:"Zone and status mimic. Monitoring only — never the panel.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const fr="crestron-panel-card";class ur extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 4}static getConfigElement(){return document.createElement(`${fr}-editor`)}static getStubConfig(){return{type:`custom:${fr}`,faceplate:""}}_notify(e){this._error=e,setTimeout(()=>{this._error=void 0},4e3)}_currentPage(e){return e?.length?this._page&&e.includes(this._page)?this._page:e[0]:""}async _onAction(e,t){this.hass&&this._config&&("page"===e.action&&e.target?this._page=e.target:await Wi(this.hass,this._config.entities,e,e=>this._notify(e),Number(this._config.step??1),t))}render(){if(!this._config||!this.hass)return q;const e=ji(this.hass,this._config),t=this._config.panel;if(!t)return B`<ha-card>
        ${e?B`<div class="title">${e}</div>`:q}
        <div class="hint">
          No panel loaded. Import a .c3p or .vtz in the Crestron add-on
          and build the card from there.
        </div>
      </ha-card>`;const{faceplate:i,bindings:r,roles:o,hidden:a}=Ki(this.hass,this._config,t,this._config.device?Hi(this.hass,this._config.device):[]),n=i,s=o.filter(e=>r[e]).length,l=0===s&&!1!==this._config.hide_unbound,d=n.pages,c=this._currentPage(d);return B`
      <ha-card>
        ${e?B`<div class="title">${e}</div>`:q}
        ${d&&d.length>1&&!l?B`<div class="pages">
              ${d.map(e=>B`<button
                  class=${e===c?"on":""}
                  @click=${()=>{this._page=e}}
                >
                  ${e}
                </button>`)}
            </div>`:q}
        ${l?q:B`<div class="frame">
          ${Yi({hass:this.hass,faceplate:n,bindings:r,page:c,onAction:(e,t)=>{this._onAction(e,t)}})}
        </div>`}
        ${this._error?B`<div class="hint">${this._error}</div>`:q}
        ${a&&s>0?B`<div class="hint muted">${Zi(a)}</div>`:q}
        ${0===s?B`<div class="hint">
              No panel loaded. Import a .c3p or .vtz in the Crestron
              add-on and build the card from there.
            </div>`:q}
      </ha-card>
    `}}ur.properties={hass:{attribute:!1},_config:{state:!0},_error:{state:!0},_page:{state:!0}},ur.styles=a`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .title {
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 3px solid var(--primary-color);
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      /* Scale down to the column, never up past the drawing's own size:
         a one-channel console stretched across a wide card reads as a
         giant empty frame rather than a small instrument. */
      max-width: var(--faceplate-width, none);
      margin: 0 auto;
    }
    .display-negative .lcd-value {
      fill: #7ce0d2;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 600;
    }
    .display-negative .lcd-label,
    .display-negative .lcd-value.chrome {
      fill: #8b93a1;
      font-family: inherit;
      letter-spacing: 1px;
    }
    .display-negative .lcd-value.dark {
      fill: #38514e;
    }
    .display-negative .lcd-value.stale {
      fill: #d9a441;
    }
    .bar-track {
      fill: #23262c;
    }
    .bar-fill {
      fill: #4ea1ff;
    }
    .bar-hit,
    .fader-hit {
      cursor: pointer;
    }
    /* A console fader: slotted track, travelled section, moulded cap. */
    .fader-slot {
      fill: #0a0c0f;
      stroke: #2b313a;
      stroke-width: 1;
    }
    .fader-travelled {
      fill: #2b6fb5;
    }
    .fader-tick {
      stroke: #2b313a;
      stroke-width: 1;
    }
    .fader-cap {
      fill: #d7dce3;
      stroke: #8f97a3;
      stroke-width: 1;
    }
    .fader-line {
      stroke: #3d434c;
      stroke-width: 2;
    }
    .fader.dark .fader-cap {
      fill: #4a5058;
      stroke: #3a4048;
    }
    .fader.dark .fader-travelled {
      fill: #253241;
    }
    /* Strip labels sit on the backlit scribble plate. */
    .display-negative .lcd-value.chrome {
      fill: #cdd3dc;
    }
    /* Panel chrome from an imported project: borders, fills and the
       boxes where artwork sat. Fill and stroke arrive as attributes on
       the element, carried over from the panel's own colours, so nothing
       here may set either — a stylesheet rule would override them. */
    .plate {
      stroke-width: 1;
    }
    .plate-label {
      font-family: inherit;
      letter-spacing: 0.5px;
      opacity: 0.75;
    }
    .lamp {
      stroke: #0d1013;
      stroke-width: 1;
    }
    .lamp.lit {
      filter: drop-shadow(0 0 5px currentColor);
    }
    .button rect {
      fill: #23262c;
      stroke: #343942;
    }
    .button text {
      fill: #cdd3dc;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .button:hover rect {
      fill: #2d323a;
    }
    .button {
      cursor: pointer;
    }
    /* The panel's own states. A real panel switches these on a join the
       control program drives; a card has no such signal, so they are
       offered as what they are — the screens this panel has. */
    .pages {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      padding: 0 4px 8px;
    }
    .pages button {
      font: inherit;
      font-size: 11px;
      letter-spacing: 0.6px;
      padding: 3px 9px;
      cursor: pointer;
      color: var(--secondary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border: 1px solid transparent;
      border-radius: 11px;
    }
    .pages button.on {
      color: var(--primary-text-color);
      border-color: var(--primary-color);
    }
    /* A footnote. It has to be findable, not announced. */
    .hint.muted {
      opacity: 0.55;
      font-size: 11px;
      padding: 6px 4px 0;
      text-align: right;
    }
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `,customElements.define(fr,ur),Ii(fr,{numbers:[{key:"step",label:"Trim step (dB)",min:.5,max:12,step:.5}]}),window.customCards??=[],window.customCards.push({type:fr,name:"Crestron Panel Card",description:"Your own XPanel project, imported and rendered as a card.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});
