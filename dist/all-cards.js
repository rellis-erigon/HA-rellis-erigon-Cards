const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=o.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(i,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new r(o,e,i)},s=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:n,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,f=globalThis,u=f.trustedTypes,g=u?u.emptyScript:"",m=f.reactiveElementPolyfillSupport,x=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},$=(e,t)=>!n(e,t),_={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=_){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&l(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const a=o?.call(this);r?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,t=[...c(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{if(t)i.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),r=e.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=t.cssText,i.appendChild(o)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=o;const a=r.fromAttribute(t,e.type);this[o]=a??this._$Ej?.get(o)??a,this._$Em=null}}requestUpdate(e,t,i,o=!1,r){if(void 0!==e){const a=this.constructor;if(!1===o&&(r=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??$)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:r},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==r||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[x("elementProperties")]=new Map,w[x("finalized")]=new Map,m?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");const b=globalThis,v=e=>e,k=b.trustedTypes,z=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+M,S=`<${C}>`,E=document,N=()=>E.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,T="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,I=/>/g,U=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,D=/"/g,G=/^(?:script|style|textarea|title)$/i,F=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),H=F(1),B=F(2),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,K=E.createTreeWalker(E,129);function Y(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(t):t}const Z=(e,t)=>{const i=e.length-1,o=[];let r,a=2===t?"<svg>":3===t?"<math>":"",s=R;for(let t=0;t<i;t++){const i=e[t];let n,l,d=-1,c=0;for(;c<i.length&&(s.lastIndex=c,l=s.exec(i),null!==l);)c=s.lastIndex,s===R?"!--"===l[1]?s=L:void 0!==l[1]?s=I:void 0!==l[2]?(G.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=U):void 0!==l[3]&&(s=U):s===U?">"===l[0]?(s=r??R,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,n=l[1],s=void 0===l[3]?U:'"'===l[3]?D:j):s===D||s===j?s=U:s===L||s===I?s=R:(s=U,r=void 0);const h=s===U&&e[t+1].startsWith("/>")?" ":"";a+=s===R?i+S:d>=0?(o.push(n),i.slice(0,d)+A+i.slice(d)+M+h):i+M+(-2===d?t:h)}return[Y(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class Q{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,a=0;const s=e.length-1,n=this.parts,[l,d]=Z(e,t);if(this.el=Q.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=K.nextNode())&&n.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(A)){const t=d[a++],i=o.getAttribute(e).split(M),s=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?ie:"?"===s[1]?oe:"@"===s[1]?re:te}),o.removeAttribute(e)}else e.startsWith(M)&&(n.push({type:6,index:r}),o.removeAttribute(e));if(G.test(o.tagName)){const e=o.textContent.split(M),t=e.length-1;if(t>0){o.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],N()),K.nextNode(),n.push({type:2,index:++r});o.append(e[t],N())}}}else if(8===o.nodeType)if(o.data===C)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=o.data.indexOf(M,e+1));)n.push({type:7,index:r}),e+=M.length-1}r++}}static createElement(e,t){const i=E.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,o){if(t===W)return t;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const a=O(t)?void 0:t._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(e),r._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(t=X(e,r._$AS(e,t.values),r,o)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??E).importNode(t,!0);K.currentNode=o;let r=K.nextNode(),a=0,s=0,n=i[0];for(;void 0!==n;){if(a===n.index){let t;2===n.type?t=new ee(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new ae(r,this,e)),this._$AV.push(t),n=i[++s]}a!==n?.index&&(r=K.nextNode(),a++)}return K.currentNode=E,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),O(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new J(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Q(e)),t}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new ee(this.O(N()),this.O(N()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=v(e).nextSibling;v(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}let te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,o){const r=this.strings;let a=!1;if(void 0===r)e=X(this,e,t,0),a=!O(e)||e!==this._$AH&&e!==W,a&&(this._$AH=e);else{const o=e;let s,n;for(e=r[0],s=0;s<r.length-1;s++)n=X(this,o[i+s],t,s),n===W&&(n=this._$AH[s]),a||=!O(n)||n!==this._$AH[s],n===q?e=q:e!==q&&(e+=(n??"")+r[s+1]),this._$AH[s]=n}a&&!o&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class oe extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class re extends te{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??q)===W)return;const i=this._$AH,o=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==q&&(i===q||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const se=b.litHtmlPolyfillSupport;se?.(Q,ee),(b.litHtmlVersions??=[]).push("3.3.3");const ne=globalThis;class le extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let r=o._$litPart$;if(void 0===r){const e=i?.renderBefore??null;o._$litPart$=r=new ee(t.insertBefore(N(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}le._$litElement$=!0,le.finalized=!0,ne.litElementHydrateSupport?.({LitElement:le});const de=ne.litElementPolyfillSupport;de?.({LitElement:le}),(ne.litElementVersions??=[]).push("4.2.2");const ce=400,he=400,pe=62,fe=84,ue=276,ge=244,me=[142,188,234,280],xe=352,ye=[112,172,232,292],$e=B`
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
  <rect x="${pe}" y="${fe}" width="${ue}" height="${ge}" fill="url(#pm-lcd)" />

  <!-- Title band -->
  <rect x="${pe}" y="${fe}" width="${ue}" height="24" fill="#6a7482" />
  <rect x="${pe}" y="${fe}" width="26" height="24" fill="#8d97a4" />
  <rect x="${312}" y="${fe}" width="26" height="24" fill="#8d97a4" />

  <!-- Soft-key legend, aligned over the four physical keys -->
  <line x1="${pe}" y1="${302}" x2="${338}" y2="${302}"
        stroke="#9aa392" stroke-width="1" />

  <!-- Keys -->
  ${ye.map(e=>B`
      <circle cx="${e}" cy="${xe}" r="21" fill="url(#pm-key)" />
      <circle cx="${e}" cy="${xe}" r="21" fill="none" stroke="#24282b" stroke-width="1.5" />
    `)}

  <!-- Indicator marks on the right edge -->
  <rect x="358" y="342" width="7" height="7" rx="1" fill="#22262a" />
  <rect x="358" y="356" width="7" height="7" rx="1" fill="#22262a" />
`,_e=76,we={id:"schneider-pm2200",name:"Schneider EasyLogic PM2200",description:"Square panel-mount analyser: pale LCD with a title band, four labelled rows and a soft-key legend over four push keys.",emulates:"Schneider Electric EasyLogic PM2200",card:"bms-meter-card",render:"svg",display:"positive",size:[ce,he],artNode:$e,pages:["summary","amps","volts","power"],regions:[{id:"s-v",role:"volts_avg",kind:"text",page:"summary",x:_e,y:me[0],w:182,align:"end",label:"V avg",decimals:1,size:26},{id:"s-i",role:"current_avg",kind:"text",page:"summary",x:_e,y:me[1],w:182,align:"end",label:"I avg",decimals:2,size:26},{id:"s-p",role:"power_total",kind:"text",page:"summary",x:_e,y:me[2],w:182,align:"end",label:"P total",decimals:2,size:26},{id:"s-e",role:"energy_total",kind:"text",page:"summary",x:_e,y:me[3],w:182,align:"end",label:"E total",decimals:1,size:26},{id:"i1",role:"current_l1",kind:"text",page:"amps",x:_e,y:me[0],w:182,align:"end",label:"I1",decimals:2,size:26},{id:"i2",role:"current_l2",kind:"text",page:"amps",x:_e,y:me[1],w:182,align:"end",label:"I2",decimals:2,size:26},{id:"i3",role:"current_l3",kind:"text",page:"amps",x:_e,y:me[2],w:182,align:"end",label:"I3",decimals:2,size:26},{id:"iavg",role:"current_avg",kind:"text",page:"amps",x:_e,y:me[3],w:182,align:"end",label:"I avg",decimals:2,size:26},{id:"u1",role:"volts_l1",kind:"text",page:"volts",x:_e,y:me[0],w:182,align:"end",label:"V1-N",decimals:1,size:26},{id:"u2",role:"volts_l2",kind:"text",page:"volts",x:_e,y:me[1],w:182,align:"end",label:"V2-N",decimals:1,size:26},{id:"u3",role:"volts_l3",kind:"text",page:"volts",x:_e,y:me[2],w:182,align:"end",label:"V3-N",decimals:1,size:26},{id:"uavg",role:"volts_avg",kind:"text",page:"volts",x:_e,y:me[3],w:182,align:"end",label:"V avg",decimals:1,size:26},{id:"pw1",role:"power_l1",kind:"text",page:"power",x:_e,y:me[0],w:182,align:"end",label:"P1",decimals:2,size:26},{id:"pw2",role:"power_l2",kind:"text",page:"power",x:_e,y:me[1],w:182,align:"end",label:"P2",decimals:2,size:26},{id:"pw3",role:"power_l3",kind:"text",page:"power",x:_e,y:me[2],w:182,align:"end",label:"P3",decimals:2,size:26},{id:"pwf",role:"power_factor",kind:"text",page:"power",x:_e,y:me[3],w:182,align:"end",label:"PF",decimals:2,size:26},{id:"t-sum",role:"",kind:"text",page:"summary",text:"Total",x:pe,y:82,w:ue,align:"middle",size:15},{id:"t-amp",role:"",kind:"text",page:"amps",text:"Current",x:pe,y:82,w:ue,align:"middle",size:15},{id:"t-vol",role:"",kind:"text",page:"volts",text:"Voltage",x:pe,y:82,w:ue,align:"middle",size:15},{id:"t-pow",role:"",kind:"text",page:"power",text:"Power",x:pe,y:82,w:ue,align:"middle",size:15},{id:"sk1",role:"",kind:"text",text:"I",x:68,y:304,w:60,align:"middle",size:13},{id:"sk2",role:"",kind:"text",text:"U-V",x:128,y:304,w:60,align:"middle",size:13},{id:"sk3",role:"",kind:"text",text:"PQS",x:188,y:304,w:60,align:"middle",size:13},{id:"sk4",role:"",kind:"text",text:"▶",x:248,y:304,w:60,align:"middle",size:13},{id:"k1",role:"",kind:"button",x:ye[0]-26,y:331,w:52,h:42,text:"",action:"page",target:"amps"},{id:"k2",role:"",kind:"button",x:ye[1]-26,y:331,w:52,h:42,text:"",action:"page",target:"volts"},{id:"k3",role:"",kind:"button",x:ye[2]-26,y:331,w:52,h:42,text:"",action:"page",target:"power"},{id:"k4",role:"",kind:"button",x:ye[3]-26,y:331,w:52,h:42,text:"",action:"page",target:"summary"}]},be=460,ve={id:"generic-3phase",name:"Generic 3-phase meter",description:"Single-page readout for boards where the physical meter is unknown.",card:"bms-meter-card",render:"svg",display:"negative",size:[be,260],artNode:B`
  <defs>
    <linearGradient id="g3p-case" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a5159" />
      <stop offset="100%" stop-color="#343a40" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${be}" height="${260}" rx="10" fill="url(#g3p-case)" />
  <rect x="14" y="14" width="${432}" height="${232}" rx="6"
        fill="#151b17" stroke="#090c0a" stroke-width="2" />
  <line x1="14" y1="110" x2="${446}" y2="110" stroke="#3c4a40" stroke-width="1" />
  <line x1="14" y1="186" x2="${446}" y2="186" stroke="#3c4a40" stroke-width="1" />
`,regions:[{id:"etot",role:"energy_total",kind:"text",x:34,y:34,w:390,label:"Total energy",unit:"kWh",decimals:1,size:40},{id:"ptot",role:"power_total",kind:"text",x:34,y:124,w:180,label:"Power",unit:"kW",decimals:2,size:28},{id:"pf",role:"power_factor",kind:"text",x:250,y:124,w:174,label:"Power factor",decimals:2,size:28},{id:"v1",role:"volts_l1",kind:"text",x:34,y:200,w:120,label:"L1-N",unit:"V",decimals:0,size:22},{id:"v2",role:"volts_l2",kind:"text",x:174,y:200,w:120,label:"L2-N",unit:"V",decimals:0,size:22},{id:"v3",role:"volts_l3",kind:"text",x:314,y:200,w:110,label:"L3-N",unit:"V",decimals:0,size:22}]},ke=230,ze=380,Ae=B`
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
  <rect x="0" y="22" width="${ke}" height="${336}" rx="6" fill="url(#din3p-case)" />
  <rect x="18" y="0" width="${194}" height="30" rx="3" fill="#333940" />
  <rect x="18" y="${350}" width="${194}" height="30" rx="3" fill="#333940" />

  <!-- Terminal detail, top and bottom -->
  ${[0,1,2,3].map(e=>B`<rect x="${26+45*e}" y="4" width="34" height="20" rx="2" fill="#23282d" />`)}
  ${[0,1,2,3].map(e=>B`<rect x="${26+45*e}" y="${354}" width="34" height="20" rx="2" fill="#23282d" />`)}

  <!-- Display -->
  <rect x="20" y="52" width="${190}" height="168" rx="3" fill="url(#din3p-lcd)" />
  <rect x="20" y="52" width="${190}" height="168" rx="3"
        fill="none" stroke="#1d2226" stroke-width="3" />
  <line x1="28" y1="108" x2="${202}" y2="108" stroke="#9fae88" stroke-width="1" />
  <line x1="28" y1="164" x2="${202}" y2="164" stroke="#9fae88" stroke-width="1" />

  <!-- Key cluster -->
  <rect x="20" y="234" width="${190}" height="62" rx="4" fill="#2e343a" />
`,Me={id:"din-3phase-analyser",name:"DIN-rail 3-phase analyser",description:"Portrait DIN-mounted analyser with a stacked per-phase display. Generic to the form factor, not modelled on a specific product.",card:"bms-meter-card",render:"svg",display:"positive",size:[ke,ze],artNode:Ae,pages:["volts","amps","power"],regions:[{id:"r1",role:"volts_l1",kind:"text",page:"volts",x:34,y:77,w:162,label:"L1",unit:"V",decimals:1,size:28},{id:"r2",role:"volts_l2",kind:"text",page:"volts",x:34,y:133,w:162,label:"L2",unit:"V",decimals:1,size:28},{id:"r3",role:"volts_l3",kind:"text",page:"volts",x:34,y:189,w:162,label:"L3",unit:"V",decimals:1,size:28},{id:"a1",role:"current_l1",kind:"text",page:"amps",x:34,y:77,w:162,label:"L1",unit:"A",decimals:2,size:28},{id:"a2",role:"current_l2",kind:"text",page:"amps",x:34,y:133,w:162,label:"L2",unit:"A",decimals:2,size:28},{id:"a3",role:"current_l3",kind:"text",page:"amps",x:34,y:189,w:162,label:"L3",unit:"A",decimals:2,size:28},{id:"pt",role:"power_total",kind:"text",page:"power",x:34,y:77,w:162,label:"Total",unit:"kW",decimals:2,size:28},{id:"pf",role:"power_factor",kind:"text",page:"power",x:34,y:133,w:162,label:"PF",decimals:2,size:28},{id:"en",role:"energy_total",kind:"text",page:"power",x:34,y:189,w:162,label:"Energy",unit:"kWh",decimals:0,size:28},{id:"k1",role:"",kind:"button",x:32,y:246,w:52,h:34,text:"V",action:"page",target:"volts"},{id:"k2",role:"",kind:"button",x:92,y:246,w:52,h:34,text:"A",action:"page",target:"amps"},{id:"k3",role:"",kind:"button",x:152,y:246,w:52,h:34,text:"kW",action:"page",target:"power"},{id:"lampL1",role:"volts_l1",kind:"lamp",x:40,y:310,w:14,label:"L1",on:"#5fd87a"},{id:"lampL2",role:"volts_l2",kind:"lamp",x:100,y:310,w:14,label:"L2",on:"#5fd87a"},{id:"lampL3",role:"volts_l3",kind:"lamp",x:160,y:310,w:14,label:"L3",on:"#5fd87a"}]},Ce=400,Se={id:"circutor-cvm-e3-mini",name:"Circutor CVM-E3-MINI",description:"Panel-mount three-phase analyser: negative LCD with three stacked values, magnitude and unit to the right, four-key bezel.",emulates:"Circutor CVM-E3-MINI-WiEth",card:"bms-meter-card",render:"svg",display:"negative",size:[Ce,330],artNode:B`
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
`,pages:["power","volts","amps","energy"],regions:[{id:"p-w",role:"power_total",kind:"text",page:"power",x:70,y:66,w:232,align:"end",unit:"",decimals:2,size:42},{id:"p-va",role:"apparent_power",kind:"text",page:"power",x:70,y:124,w:232,align:"end",decimals:2,size:42},{id:"p-var",role:"reactive_power",kind:"text",page:"power",x:70,y:180,w:232,align:"end",decimals:2,size:42},{id:"v1",role:"volts_l1",kind:"text",page:"volts",x:70,y:66,w:232,align:"end",decimals:1,size:42},{id:"v2",role:"volts_l2",kind:"text",page:"volts",x:70,y:124,w:232,align:"end",decimals:1,size:42},{id:"v3",role:"volts_l3",kind:"text",page:"volts",x:70,y:180,w:232,align:"end",decimals:1,size:42},{id:"a1",role:"current_l1",kind:"text",page:"amps",x:70,y:66,w:232,align:"end",decimals:2,size:42},{id:"a2",role:"current_l2",kind:"text",page:"amps",x:70,y:124,w:232,align:"end",decimals:2,size:42},{id:"a3",role:"current_l3",kind:"text",page:"amps",x:70,y:180,w:232,align:"end",decimals:2,size:42},{id:"e-tot",role:"energy_total",kind:"text",page:"energy",x:70,y:82,w:232,align:"end",decimals:1,size:44},{id:"e-pf",role:"power_factor",kind:"text",page:"energy",x:70,y:160,w:232,align:"end",decimals:2,size:36},{id:"k-prev",role:"",kind:"button",x:86,y:272,w:40,h:40,text:"‹",action:"prev_page"},{id:"k-menu",role:"",kind:"button",x:146,y:274,w:108,h:36,text:"☰",action:"next_page"},{id:"k-next",role:"",kind:"button",x:274,y:272,w:40,h:40,text:"›",action:"next_page"}]},Ee=200,Ne=200,Oe=B`
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
    ${[...Array(60).keys()].map(e=>{const t=e/60*Math.PI*2;return B`<line
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
`,Pe={id:"multijet-water-register",name:"Multi-jet water register",description:"Mechanical register: seven-digit odometer over four sweep dials, all reading one cumulative total.",emulates:"Multi-jet mechanical water meter register",card:"bms-meter-card",render:"svg",display:"positive",size:[400,400],artNode:Oe,regions:[{id:"odo",role:"volume_total",kind:"odometer",x:92,y:114,w:216,h:34,digits:7,redDigits:1,scale:1},{id:"units",role:"volume_total",kind:"text",show:"unit",x:100,y:164,w:200,align:"middle",size:14,text:"UNITS"},{id:"mult",role:"",kind:"text",text:"x1",x:316,y:120,w:40,align:"start",size:14},...[{id:"d1",x:104,scale:1,label:"x1"},{id:"d01",x:168,scale:.1,label:"x0.1"},{id:"d001",x:232,scale:.01,label:"x0.01"},{id:"d0001",x:296,scale:.001,label:"x0.001"}].map(e=>({id:e.id,role:"volume_total",kind:"needle",x:e.x,y:286,r:27,scale:e.scale,label:e.label}))]},Te=180,Re=208,Le={id:"daikin-brc1h63k",name:"Daikin BRC1H63K (Madoka)",description:"Round wall controller with an illuminated status ring and a dark display. Mode, room temperature and three touch keys.",emulates:"Daikin BRC1H63K Madoka",card:"hvac-controller-card",render:"svg",display:"negative",size:[360,400],artNode:B`
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
`,regions:[{id:"ring",role:"hvac_mode",kind:"ring",x:Te,y:Re,r:128,stroke:7,on:"#2f8fff",off:"#161b21"},{id:"mode",role:"hvac_mode",kind:"text",x:90,y:130,w:180,align:"middle",size:19},{id:"roomlabel",role:"",kind:"text",text:"Room",group:"room",x:84,y:162,w:172,align:"middle",size:13},{id:"temp",role:"room_temp",kind:"text",group:"room",x:84,y:182,w:172,align:"middle",unit:"",decimals:0,size:68},{id:"unit",role:"",kind:"text",text:"°C",group:"room",x:258,y:190,w:34,align:"start",size:20},{id:"fan",role:"fan_speed",kind:"text",x:84,y:214,w:80,align:"start",size:14,placeholder:""},{id:"swing",role:"swing",kind:"text",x:84,y:234,w:80,align:"start",size:14,placeholder:""},{id:"splabel",role:"",kind:"text",text:"Set",group:"set",x:186,y:212,w:90,align:"end",size:12},{id:"sp",role:"setpoint",kind:"text",group:"set",x:186,y:216,w:90,align:"end",decimals:0,size:18},{id:"minus",role:"",kind:"button",x:106,y:270,w:44,h:34,text:"−",action:"temp_down"},{id:"power",role:"",kind:"button",x:158,y:270,w:44,h:34,text:"○",action:"power_toggle"},{id:"plus",role:"",kind:"button",x:210,y:270,w:44,h:34,text:"+",action:"temp_up"}]},Ie=400,Ue=66,je=84,De=268,Ge=170,Fe=118,He=252,Be=188,We=200,qe=296,Ve=96,Ke=30,Ye={id:"daikin-brc1e63",name:"Daikin BRC1E63",description:"Wired navigation controller: landscape LCD with mode, clock, set point and room temperature, over four pill keys and a navigation pad.",emulates:"Daikin BRC1E63 / BRC1E53 navigation remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[Ie,400],artNode:B`
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
  <rect x="${Ue}" y="${je}" width="${De}" height="${124}" fill="url(#brc-lcd)" />
  <line x1="${Ge}" y1="${je}" x2="${Ge}" y2="${Be}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${Ge}" y1="${Fe}" x2="${334}" y2="${Fe}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${He}" y1="${Fe}" x2="${He}" y2="${Be}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${Ue}" y1="${Be}" x2="${334}" y2="${Be}" stroke="#8d9788" stroke-width="1.5" />

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
  <circle cx="${We}" cy="${qe}" r="${62}" fill="url(#brc-pad)"
          stroke="#cfcfca" stroke-width="1.5" />
  <circle cx="${We}" cy="${qe}" r="${56}" fill="none"
          stroke="#e6e6e2" stroke-width="1" />
  <circle cx="${We}" cy="${qe}" r="27" fill="#fbfbfa"
          stroke="#d0d0cb" stroke-width="1.5" />
  <text class="brc-enter" x="${We}" y="${303}" text-anchor="middle">&#8629;</text>

  <!-- Pad direction marks -->
  <g fill="#8b9097">
    <polygon points="${194},${256} ${206},${256} ${We},${246}" />
    <polygon points="${194},${336} ${206},${336} ${We},${346}" />
    <polygon points="${160},${290} ${160},${302} ${150},${qe}" />
    <polygon points="${240},${290} ${240},${302} ${250},${qe}" />
  </g>
`,regions:[{id:"mode",role:"hvac_mode",kind:"text",x:76,y:92,w:88,align:"start",size:22},{id:"fan",role:"fan_speed",kind:"text",x:92,y:142,w:24,align:"start",size:13,placeholder:""},{id:"clock",role:"clock",kind:"text",x:Ge,y:88,w:164,align:"middle",size:22},{id:"sp-label",role:"",kind:"text",text:"Set temp",x:174,y:120,w:74,align:"start",size:11},{id:"sp",role:"setpoint",kind:"text",x:174,y:136,w:74,align:"middle",unit:"°C",decimals:0,size:26},{id:"room-label",role:"",kind:"text",text:"Room",x:256,y:120,w:74,align:"start",size:11},{id:"room",role:"room_temp",kind:"text",x:256,y:136,w:74,align:"middle",unit:"°C",decimals:0,size:26},{id:"status",role:"hvac_action",kind:"text",x:74,y:189,w:252,align:"start",size:12,placeholder:""},{id:"k-mode",role:"",kind:"button",x:46,y:228,w:Ve,h:Ke,text:"",action:"mode_cycle"},{id:"k-power",role:"",kind:"button",x:258,y:228,w:Ve,h:Ke,text:"",action:"power_toggle"},{id:"k-fan",role:"",kind:"button",x:46,y:332,w:Ve,h:Ke,text:"",action:"fan_cycle"},{id:"k-up",role:"",kind:"button",x:178,y:238,w:44,h:30,text:"",action:"temp_up"},{id:"k-down",role:"",kind:"button",x:178,y:324,w:44,h:30,text:"",action:"temp_down"}]},Ze=30,Qe=92,Xe=B`
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
    ${[0,1,2,3,4,5].map(e=>B`<rect x="${34+9*e}" y="26" width="4" height="22" rx="2" />`)}
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
  <rect x="${Ze}" y="${Qe}" width="${340}" height="${96}" fill="url(#brc315-lcd)" />
  <!-- Schedule ring, left of the display -->
  <g transform="translate(${74} ${144})">
    <circle cx="0" cy="0" r="30" fill="none" stroke="#7f8a74" stroke-width="1.4" />
    ${[0,3,6,9,12,15,18,21].map(e=>{const t=e/24*Math.PI*2-Math.PI/2,i=37*Math.cos(t),o=37*Math.sin(t)+3;return B`<text class="brc315-ring" x="${i}" y="${o}" text-anchor="middle">${e}</text>`})}
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
`,Je={id:"daikin-brc315d7",name:"Daikin BRC315D7",description:"Schedule controller, cover closed: wide segmented display with timer rows, temperature and mode icons.",emulates:"Daikin BRC315D7 schedule remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[400,400],artNode:Xe,regions:[{id:"hdr",role:"",kind:"text",text:"ONETIME  DAILY  TIMER",x:114,y:94,w:160,align:"start",size:10},{id:"t1",role:"",kind:"text",text:"--:--",x:122,y:114,w:108,align:"middle",size:22},{id:"t2",role:"",kind:"text",text:"--:--",x:122,y:150,w:108,align:"middle",size:22},{id:"sp",role:"setpoint",kind:"text",x:244,y:106,w:64,align:"middle",unit:"",decimals:0,size:38},{id:"spunit",role:"",kind:"text",text:"°C",x:306,y:130,w:20,align:"start",size:12},{id:"room",role:"room_temp",kind:"text",x:244,y:154,w:64,align:"middle",label:"",decimals:0,size:16},{id:"mode",role:"hvac_mode",kind:"text",x:244,y:172,w:120,align:"start",size:11},{id:"k-power",role:"",kind:"button",x:290,y:56,w:72,h:20,text:"",action:"power_toggle"}]},et=348,tt=318,it=74;const ot={id:"vertical-pumpset",name:"Vertical multistage pump set",description:"Packaged booster skid: vertical multistage pumps on a common manifold with a bladder vessel and control panel. Choose how many pumps.",card:"pump-system-card",render:"svg",display:"negative",size:[494,452],options:[{key:"pumps",label:"Pumps",type:"number",min:1,max:10,default:3,help:"The skid widens to suit; roles are pump1_… through pumpN_…"}],build:function(e){const t=e.pumps??3,i=112+96*(t-1)+190,o=56+96*(t-1)+70,r=[...Array(t).keys()].map(e=>56+96*e),a=B`
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
    <rect x="18" y="${tt}" width="${o-40}" height="20" rx="10" fill="#aeb6bd" />
    <rect x="18" y="${tt}" width="${o-40}" height="7" rx="3.5" fill="#cfd6db" />

    <!-- Skid -->
    <rect x="10" y="${et}" width="${o-24}" height="16" rx="3" fill="#b6bdc3" />
    <rect x="10" y="${364}" width="${o-24}" height="8" fill="#98a0a7" />
    <rect x="22" y="${372}" width="26" height="18" fill="#a8b0b6" />
    <rect x="${o-60}" y="${372}" width="26" height="18" fill="#a8b0b6" />

    ${r.map(e=>function(e){return B`
    <!-- Fan cowl -->
    <rect x="${e-18}" y="${48}" width="36" height="26" rx="3" fill="#1e2124" />
    <!-- Motor -->
    <rect x="${e-27}" y="${it}" width="54" height="96" rx="5" fill="#26292d" />
    <g stroke="#3a3f44" stroke-width="1.4">
      ${[0,1,2,3,4,5].map(t=>B`<line x1="${e-27}" y1="${88+13*t}"
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
    <rect x="${o-46}" y="232" width="44" height="86" rx="20" fill="url(#ps-vessel)" />
    <rect x="${o-30}" y="318" width="12" height="16" fill="#9aa3ab" />

    <!-- Control panel on its stand -->
    <rect x="${o+8}" y="56" width="150" height="212" rx="5"
          fill="url(#ps-panel)" stroke="#aeb4b9" stroke-width="1.5" />
    <rect x="${o+20}" y="150" width="126" height="64" rx="3" fill="#c6ccd1" />
    <g stroke="#b2b8bd" stroke-width="2">
      ${[0,1,2,3,4,5,6].map(e=>B`<line x1="${o+26}" y1="${158+8*e}"
                          x2="${o+140}" y2="${158+8*e}" />`)}
    </g>
    <rect x="${o+76}" y="${268}" width="14" height="96" fill="#b0b7bd" />
    <rect x="${o+40}" y="360" width="86" height="10" rx="2" fill="#9aa2a9" />

    <!-- Panel HMI -->
    <rect x="${o+36}" y="74" width="94" height="58" rx="3"
          fill="#14323d" stroke="#0d222a" stroke-width="2" />
  `,s=[{id:"press",role:"system_pressure",kind:"text",x:o+42,y:78,w:82,align:"middle",decimals:2,size:22},{id:"sp",role:"pressure_setpoint",kind:"text",x:o+42,y:106,w:82,align:"middle",label:"",decimals:2,size:13},{id:"fault",role:"common_fault",kind:"lamp",x:o+138,y:60,w:12,on:"#ef4444",off:"#3a2020"}];return r.forEach((e,t)=>{const i=t+1;s.push({id:`run${i}`,role:`pump${i}_run`,kind:"lamp",x:e-7,y:28,w:14,on:"#3ddc84",off:"#16281d"}),s.push({id:`flt${i}`,role:`pump${i}_fault`,kind:"lamp",x:e+14,y:28,w:10,on:"#ef4444",off:"#2a1717"}),s.push({id:`spd${i}`,role:`pump${i}_speed`,kind:"text",x:e-34,y:394,w:68,align:"middle",decimals:1,size:15,placeholder:""}),s.push({id:`amp${i}`,role:`pump${i}_current`,kind:"text",x:e-34,y:412,w:68,align:"middle",unit:"A",decimals:1,size:13,placeholder:""}),s.push({id:`lbl${i}`,role:"",kind:"text",text:`P${i}`,x:e-34,y:432,w:68,align:"middle",size:12})}),{size:[i,452],artNode:a,regions:s}},regions:[]},rt=80,at=80,st=240,nt=96,lt=104,dt=208,ct={id:"daikin-brc2e61",name:"Daikin BRC2E61",description:"Simplified wired controller: a small central display surrounded by large flat keys for power, temperature, fan and louvre.",emulates:"Daikin BRC2E61 simplified remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[400,400],artNode:B`
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
    <line x1="${rt}" y1="14" x2="${rt}" y2="386" />
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
  <rect x="${rt}" y="${at}" width="${st}" height="${st}" rx="16"
        fill="url(#brc2-sur)" />
  <rect x="${nt}" y="${lt}" width="${dt}" height="${200}" rx="2"
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
`,regions:[{id:"mode",role:"hvac_mode",kind:"text",x:104,y:112,w:192,align:"middle",size:20},{id:"splabel",role:"",kind:"text",text:"Set temp",group:"set",x:106,y:196,w:104,align:"start",size:12},{id:"sp",role:"setpoint",kind:"text",group:"set",x:106,y:208,w:104,align:"start",unit:"",decimals:0,size:48},{id:"spunit",role:"",kind:"text",text:"°C",group:"set",x:192,y:232,w:24,align:"start",size:16},{id:"fan",role:"fan_speed",kind:"text",x:216,y:222,w:78,align:"end",size:16,placeholder:""},{id:"roomlabel",role:"",kind:"text",text:"Room",group:"room",x:106,y:266,w:60,align:"start",size:12},{id:"room",role:"room_temp",kind:"text",group:"room",x:104,y:262,w:190,align:"end",unit:"°C",decimals:0,size:16},{id:"k-power",role:"",kind:"button",x:120,y:12,w:160,h:62,text:"",action:"power_toggle"},{id:"k-up",role:"",kind:"button",x:326,y:14,w:66,h:60,text:"",action:"temp_up"},{id:"k-down",role:"",kind:"button",x:326,y:326,w:66,h:60,text:"",action:"temp_down"},{id:"k-mode",role:"",kind:"button",x:12,y:14,w:62,h:60,text:"",action:"mode_cycle"},{id:"k-fan",role:"",kind:"button",x:12,y:326,w:62,h:60,text:"",action:"fan_cycle"}]},ht=440,pt=250,ft={id:"woltmann-register",name:"Woltmann Bulk Register",card:"bms-meter-card",render:"svg",display:"positive",size:[ht,pt],artNode:B`
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
`,description:"Straight-reading bulk register: black cells for whole cubic metres, red for the decimals, with a sweep hand on the lowest decade.",emulates:"Woltmann-type bulk water meter register",regions:[{id:"odo",role:"volume_total",kind:"odometer",x:74,y:84,w:236,h:52,digits:5,redDigits:0,scale:1},{id:"dec",role:"volume_total",kind:"odometer",x:316,y:84,w:54,h:52,digits:3,redDigits:3,scale:.001},{id:"hand",role:"volume_total",kind:"needle",x:386,y:178,r:24,scale:.001},{id:"flow",role:"flow_rate",kind:"text",group:"flow",x:74,y:184,w:200,align:"start",decimals:2,size:15,label:"FLOW",placeholder:""}]},ut=420,gt={id:"lcd-water-meter",name:"LCD Water Meter",card:"bms-meter-card",render:"svg",display:"positive",size:[ut,300],artNode:B`
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

`,description:"Electronic register: cumulative total, instantaneous flow and a battery bar, on a grey-green LCD.",emulates:"Battery-powered electronic water meter",regions:[{id:"total_lbl",role:"",kind:"text",text:"TOTAL",group:"total",x:92,y:74,w:90,align:"start",size:11},{id:"total",role:"volume_total",kind:"text",unit:"",group:"total",x:92,y:96,w:210,align:"start",decimals:3,size:30},{id:"total_unit",role:"volume_total",kind:"text",show:"unit",group:"total",x:306,y:106,w:54,align:"start",size:13},{id:"flow_lbl",role:"",kind:"text",text:"FLOW",group:"flow",x:92,y:158,w:90,align:"start",size:11},{id:"flow",role:"flow_rate",kind:"text",unit:"",group:"flow",x:92,y:168,w:150,align:"start",decimals:2,size:22,placeholder:""},{id:"flow_unit",role:"flow_rate",kind:"text",show:"unit",group:"flow",x:248,y:176,w:70,align:"start",size:12},{id:"batt_lbl",role:"",kind:"text",text:"BATTERY",group:"batt",x:68,y:242,w:90,align:"start",size:11},{id:"batt",role:"battery",kind:"bar",group:"batt",x:160,y:248,w:150,h:12,min:0,max:100},{id:"batt_pc",role:"battery",kind:"text",group:"batt",x:318,y:242,w:60,align:"start",decimals:0,size:13,placeholder:""}]},mt=190,xt=190,yt=B`
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

  <circle cx=${mt} cy=${xt} r="182" fill="#6c737d" />
  <circle cx=${mt} cy=${xt} r="182" fill="none" stroke="#464c55" stroke-width="3" />
  <circle cx=${mt} cy=${xt} r="162" fill="url(#dw-face)" />
  <circle cx=${mt} cy=${xt} r="162" fill="none" stroke="#b6b1a2" stroke-width="1.5" />

  <!-- Graduations: 100 minor, 10 major, as a litre face is divided -->
  <g>
    ${[...Array(100).keys()].map(e=>{const t=e/100*Math.PI*2-Math.PI/2,i=e%10==0,o=i?128:138;return B`<line
        x1=${mt+Math.cos(t)*o} y1=${xt+Math.sin(t)*o}
        x2=${mt+150*Math.cos(t)} y2=${xt+150*Math.sin(t)}
        stroke=${i?"#3b4049":"#9a958a"}
        stroke-width=${i?2.4:1} />`})}
  </g>
  ${[...Array(10).keys()].map(e=>{const t=e/10*Math.PI*2-Math.PI/2;return B`<text
      x=${mt+110*Math.cos(t)} y=${xt+110*Math.sin(t)+5}
      text-anchor="middle" fill="#3b4049" font-size="16"
      font-family="inherit">${e}</text>`})}

  <text x=${mt} y="108" text-anchor="middle" fill="#7a7566" font-size="11"
        letter-spacing="2" font-family="inherit">m³</text>
  <text x=${mt} y=${322} text-anchor="middle" fill="#7a7566"
        font-size="11" letter-spacing="1.6" font-family="inherit">x 0.001 m³</text>
`,$t={id:"dial-water-meter",name:"Dial Water Meter",card:"bms-meter-card",render:"svg",display:"positive",size:[380,380],artNode:yt,description:"Domestic dial face: an odometer window for whole cubic metres and a single sweep hand for the lowest decade.",emulates:"Single-jet dial-face water meter",regions:[{id:"odo",role:"volume_total",kind:"odometer",x:108,y:128,w:164,h:38,digits:5,redDigits:1,scale:1},{id:"hand",role:"volume_total",kind:"needle",x:mt,y:226,r:58,scale:.001},{id:"flow",role:"flow_rate",kind:"text",x:100,y:306,w:180,align:"middle",decimals:2,size:14,placeholder:""}]},_t={id:"compound-meter",name:"Compound Water Meter",card:"bms-meter-card",render:"svg",display:"positive",size:[460,300],artNode:B`
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
`,description:"Two registers on one body — main turbine and low-flow bypass — kept apart, because a bypass climbing alone is how a leak shows.",emulates:"Compound water meter with main and bypass registers",regions:[{id:"main",role:"volume_total",kind:"odometer",x:60,y:78,w:160,h:44,digits:6,redDigits:2,scale:.01},{id:"main_hand",role:"volume_total",kind:"needle",x:140,y:162,r:22,scale:.001},{id:"bypass",role:"bypass_total",kind:"odometer",x:266,y:78,w:136,h:44,digits:6,redDigits:2,scale:.01},{id:"bypass_hand",role:"bypass_total",kind:"needle",x:334,y:162,r:22,scale:.001},{id:"flow",role:"flow_rate",kind:"text",group:"flow",x:44,y:248,w:200,align:"start",decimals:2,size:18,label:"FLOW",placeholder:""}]},wt=440,bt={id:"smart-water-meter",name:"Smart Water Meter",card:"bms-meter-card",render:"svg",display:"positive",size:[wt,320],artNode:B`
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

  <rect x="0" y="0" width=${wt} height=${320} rx="12" fill="url(#sw-body)" />
  <rect x="58" y="26" width=${324} height="196" rx="10"
        fill="#171c22" stroke="#12161b" stroke-width="2" />
  <rect x="74" y="42" width=${292} height="164" rx="6" fill="url(#sw-glass)" />

  <!-- Annunciator strip along the bottom of the glass -->
  <line x1="74" y1="176" x2=${366} y2="176" stroke="#9aa78f" stroke-width="1" />
`,description:"Electronic register with the flags these meters raise: leak, reverse flow and battery. Clear annunciators show nothing, not dashes.",emulates:"Smart water meter with leak and reverse-flow detection",regions:[{id:"total_lbl",role:"",kind:"text",text:"TOTAL",group:"total",x:90,y:66,w:90,align:"start",size:11},{id:"total",role:"volume_total",kind:"text",unit:"",group:"total",x:90,y:86,w:214,align:"start",decimals:3,size:30},{id:"total_unit",role:"volume_total",kind:"text",show:"unit",group:"total",x:308,y:96,w:54,align:"start",size:13},{id:"flow_lbl",role:"",kind:"text",text:"FLOW",group:"flow",x:90,y:142,w:90,align:"start",size:11},{id:"flow",role:"flow_rate",kind:"text",unit:"",group:"flow",x:90,y:150,w:150,align:"start",decimals:2,size:20,placeholder:""},{id:"flow_unit",role:"flow_rate",kind:"text",show:"unit",group:"flow",x:246,y:158,w:70,align:"start",size:11},{id:"alarm_lamp",role:"alarm",kind:"lamp",label:"LEAK",group:"alarm",x:96,y:244,w:14,on:"#ef4444",off:"#2a1717"},{id:"rev_lamp",role:"reverse_flow",kind:"lamp",label:"REVERSE",group:"rev",x:186,y:244,w:14,on:"#f59e0b",off:"#2a2317"},{id:"batt",role:"battery",kind:"bar",group:"batt",x:282,y:246,w:100,h:11,min:0,max:100},{id:"batt_pc",role:"battery",kind:"text",group:"batt",x:282,y:280,w:100,align:"start",decimals:0,size:12,label:"BATTERY",placeholder:""}]},vt=360,kt=300,zt=180,At=168,Mt=62,Ct=(e,t,i,o)=>B`
  <line x1=${e} y1=${t} x2=${i} y2=${o} stroke="#4ea1ff"
        stroke-width="3" marker-end="url(#pf-arrow)" />
`;function St(e,t){const i="#39414c",o="top"===e?B`<rect x=${154} y="16" width="52" height=${94}
              fill=${i} />`:"left"===e?B`<rect x="16" y=${142} width=${106} height="52"
                fill=${i} />`:B`<rect x=${254} y=${142}
                width=${90} height="52" fill=${i} />`,r="top"===e?Ct(zt,30,zt,90):"left"===e?Ct(30,At,102,At):Ct(330,At,258,At),a=t?B`<rect x=${156} y="16" width="48" height=${94}
            fill=${i} />`:B`<rect x=${156} y=${226} width="48"
            height=${58} fill=${i} />`,s=t?Ct(zt,90,zt,26):Ct(zt,230,zt,274);return B`
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

    <rect x="0" y="0" width=${vt} height=${kt} rx="10" fill="#101216" />
    ${t?a:o}
    ${t?"":a}

    <circle cx=${zt} cy=${At} r=${Mt} fill="url(#pf-scroll)"
            stroke="#232930" stroke-width="2" />
    <circle cx=${zt} cy=${At} r=${46} fill="none"
            stroke="#59626f" stroke-width="1.5" />
    ${[...Array(8).keys()].map(e=>{const t=e/8*Math.PI*2;return B`<line
        x1=${zt+14*Math.cos(t)} y1=${At+14*Math.sin(t)}
        x2=${zt+44*Math.cos(t)}
        y2=${At+44*Math.sin(t)}
        stroke="#6f7886" stroke-width="3" stroke-linecap="round" />`})}
    <circle cx=${zt} cy=${At} r="10" fill="#a7b2c0" />

    ${t?s:r}
    ${t?"":s}
  `}function Et(e){const t=[{id:"run",role:"run",kind:"lamp",label:"RUN",x:20,y:24,w:16,on:"#3ddc84",off:"#16281d"},{id:"fault",role:"fault",kind:"lamp",label:"FAULT",x:88,y:24,w:16,on:"#ef4444",off:"#2a1717"},{id:"speed",role:"speed",kind:"text",x:228,y:40,w:116,align:"end",decimals:1,size:20,placeholder:""},{id:"speed_lbl",role:"",kind:"text",text:"SPEED",x:228,y:58,w:116,align:"end",size:10},{id:"flow",role:"flow",kind:"text",x:228,y:270,w:116,align:"end",decimals:0,size:18,placeholder:""},{id:"flow_lbl",role:"",kind:"text",text:"AIRFLOW",x:228,y:286,w:116,align:"end",size:10}];return e?t:[...t,{id:"dp",role:"filter_dp",kind:"text",x:20,y:270,w:130,align:"start",decimals:0,size:16,placeholder:""},{id:"dp_lbl",role:"",kind:"text",text:"FILTER ΔP",x:20,y:286,w:130,align:"start",size:10}]}function Nt(e,t){return{id:`supply-fan-${e}`,name:t,card:"plant-equipment-card",render:"svg",display:"negative",size:[vt,kt],artNode:St(e,!1),regions:Et(!1),description:`Supply fan with the duct entering from the ${e}. Arrows follow the air, so the mimic cannot be read backwards.`,emulates:"Centrifugal supply fan"}}const Ot=Nt("top","Supply Fan — in from top"),Pt=Nt("left","Supply Fan — in from left"),Tt=Nt("right","Supply Fan — in from right"),Rt={id:"exhaust-fan",name:"Exhaust Fan",card:"plant-equipment-card",render:"svg",display:"negative",size:[vt,kt],artNode:St("top",!0),regions:Et(!0),description:"Exhaust fan discharging to atmosphere, air drawn upward.",emulates:"Axial exhaust fan"},Lt=190,It=78,Ut=330;const jt={id:"hot-water-unit",name:"Hot Water Unit",card:"plant-equipment-card",render:"svg",display:"negative",size:[340,Ut],regions:[],description:"Calorifier set with flow and return drawn separately — the pair of temperatures is the diagnosis. One unit or a duty/standby pair.",emulates:"Calorifier / plate hot water unit",options:[{key:"units",label:"Units",type:"number",min:1,max:2,default:1,help:"Roles are unit1_… and unit2_…; the drawing widens to suit."}],build:function(e){const t=Math.max(1,Math.min(2,Math.round(e.units??1))),i=110+t*Lt+34*(t-1)+40,o=[],r=[];for(let e=0;e<t;e++){const t=e+1,i=110+224*e;r.push(B`
      <rect x=${i} y=${It} width=${Lt} height="150" rx="14"
            fill="#2b323b" stroke="#3d4551" stroke-width="2" />
      <rect x=${i+14} y=${96} width=${162} height="46" rx="6"
            fill="#1a1f25" />
      <text x=${i+95} y=${216} text-anchor="middle"
            fill="#a7b2c0" font-size="11" letter-spacing="1.4"
            font-family="inherit">UNIT ${t}</text>
    `),o.push({id:`run${t}`,role:`unit${t}_run`,kind:"lamp",x:i+18,y:162,w:14,on:"#3ddc84",off:"#16281d"}),o.push({id:`flt${t}`,role:`unit${t}_fault`,kind:"lamp",x:i+44,y:162,w:14,on:"#ef4444",off:"#2a1717"}),o.push({id:`tank${t}`,role:`unit${t}_tank_temp`,kind:"text",x:i+14,y:128,w:162,align:"middle",decimals:1,size:24,placeholder:""})}const a=B`
    <defs>
      <marker id="hw-arrow" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#a7b2c0" />
      </marker>
    </defs>
    <rect x="0" y="0" width=${i} height=${Ut} rx="10" fill="#101216" />
    <text x="16" y="26" fill="#a7b2c0" font-size="12" letter-spacing="1.6"
          font-family="inherit">HOT WATER</text>

    <!-- Secondary flow along the top, return along the bottom -->
    <line x1="24" y1=${90} x2=${i-24} y2=${90}
          stroke="#c2410c" stroke-width="5" stroke-linecap="round"
          marker-end="url(#hw-arrow)" />
    <line x1=${i-24} y1=${292} x2="24" y2=${292}
          stroke="#1d4ed8" stroke-width="5" stroke-linecap="round"
          marker-end="url(#hw-arrow)" />
    ${r}
  `,s=[{id:"flow_t",role:"flow_temp",kind:"text",x:16,y:82,w:86,align:"start",decimals:1,size:20,placeholder:""},{id:"flow_lbl",role:"",kind:"text",text:"FLOW",x:16,y:100,w:86,align:"start",size:10},{id:"ret_t",role:"return_temp",kind:"text",x:16,y:284,w:86,align:"start",decimals:1,size:20,placeholder:""},{id:"ret_lbl",role:"",kind:"text",text:"RETURN",x:16,y:302,w:86,align:"start",size:10},{id:"sp",role:"setpoint",kind:"text",x:16,y:300,w:140,align:"start",decimals:1,size:16,placeholder:""},{id:"sp_lbl",role:"",kind:"text",text:"SETPOINT",x:16,y:316,w:140,align:"start",size:10},{id:"fault",role:"common_fault",kind:"lamp",label:"FAULT",x:i-44,y:286,w:16,on:"#ef4444",off:"#2a1717"}];return{size:[i,Ut],artNode:a,regions:[...o,...s]}}},Dt=[{key:"hot",label:"HOT WATER CIRCULATION",flow:"#c2410c",ret:"#7c2d12"},{key:"cold",label:"CHILLED WATER CIRCULATION",flow:"#0e7490",ret:"#155e75"}];const Gt={id:"circulation-pump-set",name:"Circulation Pump Set",card:"plant-equipment-card",render:"svg",display:"negative",size:[378,300],regions:[],description:"Circulator set, one to four pumps, hot or chilled service. The service recolours the pipework rather than needing a second drawing.",emulates:"Hot or chilled water circulation pump set",options:[{key:"pumps",label:"Pumps",type:"number",min:1,max:4,default:2,help:"Roles are pump1_… through pumpN_…"},{key:"service",label:"Service (0 hot, 1 cold)",type:"number",min:0,max:1,default:0,help:"Recolours the flow and return headers and the header caption."}],build:function(e){const t=Math.max(1,Math.min(4,Math.round(e.pumps??2))),i=Dt[Math.max(0,Math.min(1,Math.round(e.service??0)))],o=112+116*(t-1)+150,r=[],a=[];for(let e=0;e<t;e++){const t=e+1,i=112+116*e;a.push(B`
      <line x1=${i} y1=${110} x2=${i} y2=${150}
            stroke="#5a6472" stroke-width="6" />
      <line x1=${i} y1=${198} x2=${i} y2=${238}
            stroke="#5a6472" stroke-width="6" />
      <circle cx=${i} cy=${174} r="26" fill="#39414c"
              stroke="#4d5663" stroke-width="2" />
      <circle cx=${i} cy=${174} r="9" fill="#78818f" />
      ${[...Array(6).keys()].map(e=>{const t=e/6*Math.PI*2;return B`<line
          x1=${i+10*Math.cos(t)} y1=${174+10*Math.sin(t)}
          x2=${i+22*Math.cos(t)} y2=${174+22*Math.sin(t)}
          stroke="#a7b2c0" stroke-width="2.5" stroke-linecap="round" />`})}
      <text x=${i} y=${270} text-anchor="middle" fill="#a7b2c0"
            font-size="12" font-family="inherit">P${t}</text>
    `),r.push({id:`run${t}`,role:`pump${t}_run`,kind:"lamp",x:i-22,y:126,w:14,on:"#3ddc84",off:"#16281d"}),r.push({id:`flt${t}`,role:`pump${t}_fault`,kind:"lamp",x:i+8,y:126,w:14,on:"#ef4444",off:"#2a1717"}),r.push({id:`amp${t}`,role:`pump${t}_current`,kind:"text",x:i-40,y:274,w:80,align:"middle",unit:"A",decimals:1,size:13,placeholder:""})}const s=[{id:"flow_t",role:"flow_temp",kind:"text",x:16,y:102,w:88,align:"start",decimals:1,size:20,placeholder:""},{id:"flow_lbl",role:"",kind:"text",text:"FLOW",x:16,y:120,w:88,align:"start",size:10},{id:"ret_t",role:"return_temp",kind:"text",x:16,y:230,w:88,align:"start",decimals:1,size:20,placeholder:""},{id:"ret_lbl",role:"",kind:"text",text:"RETURN",x:16,y:248,w:88,align:"start",size:10},{id:"fault",role:"common_fault",kind:"lamp",label:"FAULT",x:o-44,y:18,w:16,on:"#ef4444",off:"#2a1717"}];return{size:[o,300],artNode:B`
    <rect x="0" y="0" width=${o} height=${300} rx="10" fill="#101216" />
    <text x="16" y="26" fill="#a7b2c0" font-size="12" letter-spacing="1.6"
          font-family="inherit">${i.label}</text>

    <!-- Flow header above the pumps, return header below -->
    <line x1="24" y1=${110} x2=${o-24} y2=${110}
          stroke=${i.flow} stroke-width="7" stroke-linecap="round" />
    <line x1="24" y1=${238} x2=${o-24} y2=${238}
          stroke=${i.ret} stroke-width="7" stroke-linecap="round" />
    ${a}
  `,regions:[...r,...s]}}},Ft=360,Ht=170,Bt=B`
  <defs>
    <linearGradient id="fcu-case" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a3139" />
      <stop offset="100%" stop-color="#1b2027" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${Ft} height=${Ht} rx="8" fill="url(#fcu-case)" />
  <rect x="0" y="0" width=${Ft} height="24" rx="8" fill="#232a32" />
  <rect x="0" y="16" width=${Ft} height="8" fill="#232a32" />
  <text x="12" y="17" fill="#a7b2c0" font-size="11" letter-spacing="1.6"
        font-family="inherit">FAN COIL UNIT</text>

  <!-- A coil and a fan, so the tile reads as plant and not a thermostat -->
  <g transform="translate(286, 44)">
    <rect x="0" y="0" width="56" height="42" rx="4"
          fill="#141921" stroke="#333b45" />
    ${[0,1,2,3].map(e=>B`<path d="M ${8+12*e} 6 q 6 7 0 14 q -6 7 0 14"
        fill="none" stroke="#4b7fae" stroke-width="2" />`)}
    <circle cx="28" cy="58" r="13" fill="#141921" stroke="#333b45" />
    ${[0,1,2].map(e=>{const t=e/3*Math.PI*2;return B`<line x1="28" y1="58"
        x2=${28+10*Math.cos(t)} y2=${58+10*Math.sin(t)}
        stroke="#6f7886" stroke-width="2.5" stroke-linecap="round" />`})}
  </g>

  <line x1="12" y1=${126} x2=${348} y2=${126} stroke="#2b323b" />
`,Wt={id:"fcu-unit",name:"Fan Coil Unit",card:"hvac-controller-card",render:"svg",display:"negative",size:[Ft,Ht],artNode:Bt,regions:[{id:"room_lbl",role:"",kind:"text",text:"ROOM",group:"room",x:14,y:36,w:70,align:"start",size:10},{id:"room",role:"room_temp",kind:"text",group:"room",x:14,y:42,w:120,align:"start",unit:"",decimals:1,size:44},{id:"room_unit",role:"",kind:"text",text:"°C",group:"room",x:136,y:58,w:30,align:"start",size:16},{id:"set_lbl",role:"",kind:"text",text:"SET",group:"set",x:182,y:36,w:60,align:"start",size:10},{id:"set",role:"setpoint",kind:"text",group:"set",x:182,y:44,w:70,align:"start",unit:"",decimals:1,size:24},{id:"set_unit",role:"",kind:"text",text:"°C",group:"set",x:250,y:56,w:26,align:"start",size:12},{id:"mode",role:"hvac_mode",kind:"text",group:"mode",x:14,y:96,w:150,align:"start",size:15,placeholder:""},{id:"fan_lbl",role:"",kind:"text",text:"FAN",group:"fan",x:182,y:90,w:50,align:"start",size:10},{id:"fan",role:"fan_speed",kind:"text",group:"fan",x:182,y:96,w:90,align:"start",size:15,placeholder:""},{id:"run",role:"run",kind:"lamp",label:"RUN",group:"run",x:16,y:136,w:13,on:"#3ddc84",off:"#16281d"},{id:"fault",role:"fault",kind:"lamp",label:"ALARM",group:"fault",x:92,y:136,w:13,on:"#ef4444",off:"#2a1717"}],description:"Compact status tile for a BMS fan coil: room against setpoint, mode, fan and alarm. Built to tile, because sites have hundreds.",emulates:"Generic BMS fan coil unit"},qt=360,Vt=[16,130,244],Kt=[190,228,266],Yt=[12,81,150,219,288],Zt=B`
  <defs>
    <linearGradient id="iu-case" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a3139" />
      <stop offset="100%" stop-color="#1b2027" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width=${qt} height=${366} rx="8" fill="url(#iu-case)" />
  <rect x="0" y="0" width=${qt} height="24" rx="8" fill="#232a32" />
  <rect x="0" y="16" width=${qt} height="8" fill="#232a32" />
  <text x="12" y="17" fill="#a7b2c0" font-size="11" letter-spacing="1.6"
        font-family="inherit">INDOOR UNIT</text>

  <!-- A cassette seen from below: body, grille, and a swinging louvre.
       Enough to say "this is the box in the ceiling" without pretending
       to be a photograph of one. -->
  <g transform="translate(272, 38)">
    <rect x="0" y="0" width="72" height="72" rx="6"
          fill="#141921" stroke="#333b45" />
    <rect x="10" y="10" width="52" height="52" rx="3"
          fill="#1a2028" stroke="#2b323b" />
    ${[0,1,2,3].map(e=>B`<line x1="14" y1=${18+12*e} x2="58" y2=${18+12*e}
        stroke="#4b7fae" stroke-width="2" stroke-linecap="round" />`)}
    <path d="M 10 66 q 26 10 52 0" fill="none" stroke="#6f7886"
          stroke-width="2.5" stroke-linecap="round" />
  </g>

  <!-- Separators: readings, then settings, then lamps, then the keys. -->
  <line x1="12" y1="122" x2=${348} y2="122" stroke="#2b323b" />
  <line x1="12" y1="178" x2=${348} y2="178" stroke="#2b323b" />
  <line x1="12" y1="302" x2=${348} y2="302" stroke="#2b323b" />
  <text x="12" y="315" fill="#6f7886" font-size="9" letter-spacing="1.4"
        font-family="inherit">CONTROL</text>

  <!-- Key bodies. The card draws a button as a bare hit area, which suits
       a photographed panel whose keys are in the picture; this panel is
       drawn, so its keys are too, or they read as captions. -->
  ${Yt.map(e=>B`<rect x=${e} y=${322} width=${62}
      height=${32} rx="5" fill="#323a44" stroke="#46505c" />`)}
`,Qt=[{id:"room_lbl",role:"",kind:"text",text:"ROOM",group:"room",page:"status",x:14,y:36,w:70,align:"start",size:10},{id:"room",role:"room_temp",kind:"text",group:"room",page:"status",x:14,y:42,w:120,align:"start",unit:"",decimals:1,size:44},{id:"room_unit",role:"",kind:"text",text:"°C",group:"room",page:"status",x:136,y:58,w:30,align:"start",size:16},{id:"set_lbl",role:"",kind:"text",text:"SET",group:"set",page:"status",x:182,y:36,w:60,align:"start",size:10},{id:"set",role:"setpoint",kind:"text",group:"set",page:"status",x:182,y:44,w:70,align:"start",unit:"",decimals:1,size:24},{id:"set_unit",role:"",kind:"text",text:"°C",group:"set",page:"status",x:250,y:56,w:26,align:"start",size:12},{id:"action_lbl",role:"",kind:"text",text:"DOING",group:"action",page:"status",x:14,y:90,w:70,align:"start",size:10},{id:"action",role:"hvac_action",kind:"text",group:"action",page:"status",x:14,y:96,w:150,align:"start",size:15,placeholder:""},{id:"code_lbl",role:"",kind:"text",text:"CODE",group:"code",page:"status",x:182,y:90,w:60,align:"start",size:10},{id:"code",role:"fault_code",kind:"text",group:"code",page:"status",x:182,y:96,w:120,align:"start",size:15,placeholder:""},{id:"mode_lbl",role:"",kind:"text",text:"MODE",group:"mode",page:"status",x:14,y:138,w:70,align:"start",size:10},{id:"mode",role:"hvac_mode",kind:"text",group:"mode",page:"status",x:14,y:144,w:120,align:"start",size:15,placeholder:""},{id:"fan_lbl",role:"",kind:"text",text:"FAN",group:"fan_speed",page:"status",x:140,y:138,w:50,align:"start",size:10},{id:"fan",role:"fan_speed",kind:"text",group:"fan_speed",page:"status",x:140,y:144,w:90,align:"start",size:15,placeholder:""},{id:"swing_lbl",role:"",kind:"text",text:"AIR",group:"swing",page:"status",x:250,y:138,w:50,align:"start",size:10},{id:"swing",role:"swing",kind:"text",group:"swing",page:"status",x:250,y:144,w:100,align:"start",size:15,placeholder:""},...[["temp_down","SET −",0,""],["temp_up","SET +",1,""],["power_toggle","ON / OFF",2,""],["filter_reset","FILTER",3,"filter_reset"]].map(([e,t,i,o])=>({id:`key_${e}`,role:o,kind:"button",text:t,action:e,group:"",x:Yt[i],y:322,w:62,h:32,radius:5,size:10})),...[["run","RUN","#3ddc84","#16281d"],["fault","ALARM","#ef4444","#2a1717"],["filter","FILTER","#f59e0b","#2a2113"],["compressor","COMP","#38bdf8","#152530"],["fan_running","FAN","#3ddc84","#16281d"],["heater","HEATER","#fb7185","#2c1620"],["comms","COMMS","#ef4444","#2a1717"],["energy_saving","ECO","#a3e635","#1f2714"],["thermo_off","T-OFF","#f59e0b","#2a2113"]].map(([e,t,i,o],r)=>({id:`lamp_${e}`,role:e,kind:"lamp",label:t,group:e,page:"status",x:Vt[r%3],y:Kt[Math.floor(r/3)],w:13,on:i,off:o})),...[["energy_total","ENERGY",0,0],["gas_total","GAS",1,0],["ventilation_mode","VENT MODE",0,1],["ventilation_amount","VENT AMOUNT",1,1]].map(([e,t,i,o])=>[{id:`more_${e}_lbl`,role:"",kind:"text",text:t,group:e,page:"more",x:14+176*i,y:40+54*o,w:160,align:"start",size:10},{id:`more_${e}`,role:e,kind:"text",group:e,page:"more",x:14+176*i,y:48+54*o,w:160,align:"start",size:17,placeholder:""}]).flat(),...[["lock_power","LOCK PWR","#f59e0b","#2a2113"],["lock_mode","LOCK MODE","#f59e0b","#2a2113"],["lock_setpoint","LOCK TEMP","#f59e0b","#2a2113"],["central_rejected","NO SUBGRP","#ef4444","#2a1717"],["forced_off","FORCED","#ef4444","#2a1717"]].map(([e,t,i,o],r)=>({id:`more_lamp_${e}`,role:e,kind:"lamp",label:t,group:e,page:"more",x:Vt[r%3],y:Kt[Math.floor(r/3)],w:13,on:i,off:o})),{id:"key_page",role:"",kind:"button",text:"MORE ›",action:"next_page",group:"",x:Yt[4],y:322,w:62,h:32,radius:5,size:10}],Xt=460;const Jt={id:"generic-fip",name:"Fire Indicator Panel (schematic)",card:"fire-panel-card",render:"svg",display:"negative",size:[Xt,400],regions:[],description:"Zone and status mimic of a fire panel as the BMS sees it. Schematic on purpose — it must never be mistaken for the panel itself.",emulates:"Generic fire indicator panel (not a specific make)",options:[{key:"zones",label:"Zones",type:"number",min:0,max:24,default:8,help:"Roles are zone1_alarm through zoneN_alarm; two columns above 12."}],build:function(e){const t=Math.max(0,Math.min(24,Math.round(e.zones??8))),i=t>12?2:1,o=Math.ceil(t/i)||1,r=132+30*o+28,a=[],s=[];for(let e=0;e<t;e++){const t=e+1,r=22+Math.floor(e/o)*(416/i),n=132+30*(e%o),l=416/i-12;s.push(B`
      <rect x=${r} y=${n} width=${l} height=${24} rx="4"
            fill="#14181d" stroke="#232930" />
      <text x=${r+34} y=${n+17} fill="#a7b2c0" font-size="12"
            font-family="inherit">ZONE ${t}</text>
    `),a.push({id:`z${t}`,role:`zone${t}_alarm`,kind:"lamp",x:r+10,y:n+5,w:13,on:"#ef4444",off:"#2a1717"})}const n=B`
    <rect x="0" y="0" width=${Xt} height=${r} rx="10" fill="#0e1013" />

    <!-- Status row -->
    <rect x="16" y="46" width=${428} height="68" rx="8"
          fill="#14181d" stroke="#232930" />
    <text x="30" y="70" fill="#a7b2c0" font-size="11" letter-spacing="1.5"
          font-family="inherit">PANEL STATUS</text>
    ${s}
  `;return{size:[Xt,r],artNode:n,regions:[{id:"alarm",role:"fire_alarm",kind:"lamp",label:"FIRE",x:30,y:82,w:18,on:"#ef4444",off:"#2a1717"},{id:"fault",role:"fault",kind:"lamp",label:"FAULT",x:118,y:82,w:18,on:"#f59e0b",off:"#2a2317"},{id:"isolate",role:"isolate",kind:"lamp",label:"ISOLATED",x:216,y:82,w:18,on:"#eab308",off:"#2a2617"},{id:"brigade",role:"brigade_signal",kind:"lamp",label:"BRIGADE",x:322,y:82,w:18,on:"#ef4444",off:"#2a1717"},{id:"power",role:"power",kind:"lamp",label:"POWER",x:412,y:82,w:18,on:"#3ddc84",off:"#16281d"},...a]}}},ei=500;const ti={id:"qsys-zone-rack",name:"Q-SYS Zone Rack",card:"audio-zone-card",render:"svg",display:"negative",size:[ei,270],regions:[],description:"One strip per audio zone: level bar in dB, mute with an indicator, and trim keys. Widens to the number of zones you set.",emulates:"Q-SYS zone outputs",labelPrefix:"zone",options:[{key:"zones",label:"Zones",type:"number",min:1,max:16,default:4,help:"One strip per zone; roles are zone1_… through zoneN_…"}],build:function(e){const t=Math.max(1,Math.min(16,Math.round(e.zones??4))),i=34+56*t+12,o=[],r=[];for(let e=0;e<t;e++){const t=e+1,i=34+56*e;r.push(B`
      <rect class="strip" x="8" y=${i} width=${484} height=${48}
            rx="5" fill="#15171b" stroke="#272b32" />
      <line x1="84" y1=${i+6} x2="84" y2=${i+56-14}
            stroke="#272b32" stroke-width="1" />
    `),o.push({id:`name${t}`,role:"",kind:"text",text:`ZONE ${t}`,x:14,y:i+30,w:64,align:"start",size:13}),o.push({id:`bar${t}`,role:`zone${t}_volume`,kind:"bar",x:96,y:i+12,w:184,h:10,min:-80,max:10}),o.push({id:`db${t}`,role:`zone${t}_volume`,kind:"text",x:96,y:i+40,w:184,align:"start",unit:"dB",decimals:1,size:14}),o.push({id:`mlamp${t}`,role:`zone${t}_mute`,kind:"lamp",x:292,y:i+16,w:12,on:"#ef4444",off:"#2a1717"}),o.push({id:`mute${t}`,role:"",kind:"button",text:"MUTE",action:"mute_toggle",target:`zone${t}_mute`,x:314,y:i+12,w:58,h:24}),o.push({id:`down${t}`,role:"",kind:"button",text:"−",action:"level_down",target:`zone${t}_volume`,x:382,y:i+12,w:46,h:24}),o.push({id:`up${t}`,role:"",kind:"button",text:"+",action:"level_up",target:`zone${t}_volume`,x:436,y:i+12,w:46,h:24})}const a=B`
    <rect x="0" y="0" width=${ei} height=${i} rx="8" fill="#0e1013" />
    <rect x="0" y="0" width=${ei} height="26" rx="8" fill="#171a1f" />
    <rect x="0" y="18" width=${ei} height="8" fill="#171a1f" />
    <text x="14" y="18" fill="#a7b2c0" font-size="12"
          font-family="inherit" letter-spacing="1.5">ZONE OUTPUTS</text>
    ${r}
  `;return{size:[ei,i],artNode:a,regions:o}}},ii=104,oi=210;const ri={id:"zone-mixer",name:"Zone Mixer (console)",card:"audio-zone-card",render:"svg",display:"negative",size:[462,600],regions:[],labelPrefix:"zone",description:"Channel strips side by side with vertical faders: source, optional EQ, pan, fader, mute and a scribble strip. Click a fader to move it.",emulates:"Audio mixing console channel strip",options:[{key:"zones",label:"Channels",type:"number",min:1,max:16,default:4,help:"One strip per zone; roles are zone1_… through zoneN_…"},{key:"per_row",label:"Strips per row",type:"number",min:1,max:16,default:8,help:"The console wraps past this, so sixteen channels stay legible."},{key:"eq",label:"Three-band EQ (0 off, 1 on)",type:"number",min:0,max:1,default:0,help:"Adds high/mid/low per strip, above the pan."}],build:function(e,t){const i=Math.max(1,Math.min(16,Math.round(e.zones??4))),o=1===Math.round(e.eq??0),r=t?.bound??(()=>!0),a=Array.from({length:i},(e,t)=>t+1),s=t?.filtering?a.filter(e=>(e=>[`zone${e}_volume`,`zone${e}_mute`,`zone${e}_balance`,`zone${e}_source`,`zone${e}_eq_low`,`zone${e}_eq_mid`,`zone${e}_eq_high`])(e).some(r)):a,n=s.length?s:[a[0]],l=o&&(!t?.filtering||n.some(e=>["low","mid","high"].some(t=>r(`zone${e}_eq_${t}`)))),d=n.length,c=Math.max(1,Math.min(d,Math.round(e.per_row??8))),h=Math.ceil(d/c),p=46+(l?96:0),f=p+44,u=f+oi+118-36,g=28+c*ii+6*(c-1),m=36+h*u+14*(h-1)+12,x=[],y=[];for(const[e,t]of n.entries()){const i=e%c,o=Math.floor(e/c),r=14+110*i,a=36+o*(u+14),s=a+46,n=a+p,d=a+f,h=r+52;y.push(B`
      <rect x=${r} y=${a} width=${ii} height=${u}
            rx="6" fill="#15171b" stroke="#272b32" />
      ${l?B`<line x1=${r+8} y1=${n-6} x2=${r+ii-8}
                y2=${n-6} stroke="#22262c" />`:""}
      <line x1=${r+8} y1=${d-8} x2=${r+ii-8}
            y2=${d-8} stroke="#22262c" />
      <!-- Scribble strip. Backlit rather than paper: the strip sits at
           the foot of a dark console and the card draws its text light,
           so a cream plate would be light-on-light. -->
      <rect x=${r+6} y=${m-46} width=${92} height="26"
            rx="3" fill="#1d2127" stroke="#343a44" />
    `),x.push({id:`src${t}`,role:`zone${t}_source`,kind:"text",group:`src${t}`,x:r+6,y:a+12,w:92,align:"middle",size:12,placeholder:""}),x.push({id:`srcbtn${t}`,role:"",kind:"button",text:"SRC",group:`src${t}`,action:"source_cycle",target:`zone${t}_source`,x:h-26,y:a+28,w:52,h:18}),l&&["high","mid","low"].forEach((e,i)=>{const o=s+30*i;x.push({id:`${e}lbl${t}`,role:"",kind:"text",group:`eq${e}${t}`,text:e.toUpperCase(),x:r+8,y:o+12,w:32,align:"start",size:9}),x.push({id:`${e}${t}`,role:`zone${t}_eq_${e}`,kind:"bar",group:`eq${e}${t}`,action:"set_level",target:`zone${t}_eq_${e}`,x:r+42,y:o+4,w:54,h:8,min:-18,max:18}),x.push({id:`${e}v${t}`,role:`zone${t}_eq_${e}`,kind:"text",group:`eq${e}${t}`,x:r+42,y:o+24,w:54,align:"end",unit:"",decimals:1,size:9,placeholder:""})}),x.push({id:`panl${t}`,role:"",kind:"text",text:"L",group:`pan${t}`,x:r+8,y:n+26,w:12,align:"start",size:9}),x.push({id:`panr${t}`,role:"",kind:"text",text:"R",group:`pan${t}`,x:r+ii-18,y:n+26,w:12,align:"start",size:9}),x.push({id:`pan${t}`,role:`zone${t}_balance`,kind:"bar",group:`pan${t}`,action:"set_level",target:`zone${t}_balance`,x:r+20,y:n+16,w:64,h:8,min:-100,max:100}),x.push({id:`panlbl${t}`,role:"",kind:"text",text:"PAN",group:`pan${t}`,x:r+8,y:n+2,w:40,align:"start",size:9}),x.push({id:`fad${t}`,role:`zone${t}_volume`,kind:"fader",group:`fader${t}`,action:"set_level",target:`zone${t}_volume`,x:h-26,y:d,w:52,h:oi,min:-80,max:10,ticks:7}),x.push({id:`down${t}`,role:"",kind:"button",text:"−",group:`fader${t}`,action:"level_down",target:`zone${t}_volume`,x:r+8,y:d+105-28,w:22,h:22}),x.push({id:`up${t}`,role:"",kind:"button",text:"+",group:`fader${t}`,action:"level_up",target:`zone${t}_volume`,x:r+8,y:d+105+6,w:22,h:22}),x.push({id:`db${t}`,role:`zone${t}_volume`,kind:"text",group:`fader${t}`,x:r+6,y:d+oi+8,w:92,align:"middle",unit:"dB",decimals:1,size:14}),x.push({id:`mlamp${t}`,role:`zone${t}_mute`,kind:"lamp",group:`mute${t}`,x:r+10,y:d+oi+42,w:12,on:"#ef4444",off:"#2a1717"}),x.push({id:`mute${t}`,role:"",kind:"button",text:"MUTE",group:`mute${t}`,action:"mute_toggle",target:`zone${t}_mute`,x:r+28,y:d+oi+39,w:66,h:20}),x.push({id:`name${t}`,role:"",kind:"text",text:`ZONE ${t}`,x:r+8,y:m-28,w:88,align:"middle",size:11,unit:""})}return{size:[g,m],artNode:B`
    <rect x="0" y="0" width=${g} height=${m} rx="8" fill="#0e1013" />
    <rect x="0" y="0" width=${g} height="26" rx="8" fill="#171a1f" />
    <rect x="0" y="18" width=${g} height="8" fill="#171a1f" />
    <text x="14" y="18" fill="#a7b2c0" font-size="12" letter-spacing="1.5"
          font-family="inherit">ZONE MIXER</text>
    ${y}
  `,regions:x}}},ai=420,si=B`
  <rect x="0" y="0" width=${ai} height=${300} rx="10" fill="#101216" />
  <rect x="0" y="0" width=${ai} height="34" rx="10" fill="#1a1e24" />
  <rect x="0" y="24" width=${ai} height="10" fill="#1a1e24" />
  <text x="16" y="23" fill="#a7b2c0" font-size="12" letter-spacing="1.5"
        font-family="inherit">ROOM CONTROL</text>

  <!-- Source display: the big pane, as on a panel's home page. -->
  <rect x="16" y="48" width=${388} height="64" rx="6"
        fill="#0a0c0f" stroke="#252a31" />

  <!-- Level meter well -->
  <rect x="16" y="126" width=${388} height="58" rx="6"
        fill="#14171c" stroke="#252a31" />
  <text x="28" y="146" fill="#a7b2c0" font-size="11" letter-spacing="1.2"
        font-family="inherit">VOLUME</text>

  <!-- Status row -->
  <rect x="16" y="196" width=${388} height="46" rx="6"
        fill="#14171c" stroke="#252a31" />
`,ni=108,li="#3d4551",di="#a7b2c0";const ci={id:"storage-tanks",name:"Water Storage Tanks",card:"plant-equipment-card",render:"svg",display:"negative",size:[444,358],regions:[],description:"One to four storage tanks side by side against a shared scale, because a tank farm is read by comparing tanks. High-level alarms sit at the top of each tank where the float is. Roles are tank1_level, tank1_high_alarm, tank1_low_alarm and so on, plus a shared pressure.",emulates:"Cold water storage tank set",options:[{key:"tanks",label:"Tanks",type:"number",min:1,max:4,default:2,help:"The drawing widens to suit. Unbound tanks hide themselves."}],build:function(e){const t=Math.max(1,Math.min(4,Math.round(e.tanks??2))),i=52+t*ni+26*(t-1)+150,o=[],r=[];for(let e=0;e<t;e++){const t=e+1,i=26+134*e;r.push(B`
      <!-- Shell, with a domed top so it reads as a tank and not a bar chart -->
      <path d=${`M ${i} 96\n                 Q ${i} 74 ${i+22} 74\n                 L ${i+ni-22} 74\n                 Q ${i+ni} 74 ${i+ni} 96\n                 L ${i+ni} 284\n                 L ${i} 284 Z`}
            fill=${"#20262e"} stroke=${li} stroke-width="2" />
      <!-- Quarter marks: a fill with no scale beside it is a mood, not a level -->
      ${[25,50,75].map(e=>B`
        <line x1=${i+4} y1=${284-184*e/100}
              x2=${i+16} y2=${284-184*e/100}
              stroke=${li} stroke-width="1" />
      `)}
      <text x=${i+54} y=${304} text-anchor="middle"
            fill=${di} font-size="11" letter-spacing="1.2"
            font-family="inherit">TANK ${t}</text>
    `),o.push({id:`lvl${t}`,role:`tank${t}_level`,kind:"bar",x:i+6,y:94,w:96,h:184,min:0,max:100,vertical:!0}),o.push({id:`lvlt${t}`,role:`tank${t}_level`,kind:"text",x:i,y:268,w:ni,align:"middle",decimals:0,unit:"%",size:22,placeholder:"--"}),o.push({id:`hi${t}`,role:`tank${t}_high_alarm`,kind:"lamp",label:"HIGH",x:i+54-7,y:32,w:14,on:"#ef4444",off:"#2a1717"}),o.push({id:`lo${t}`,role:`tank${t}_low_alarm`,kind:"lamp",label:"LOW",x:i+54-7,y:314,w:14,on:"#f59e0b",off:"#2a2317"})}const a=26+t*ni+26*(t-1)+30,s=[{id:"press",role:"pressure",kind:"text",x:a,y:104,w:118,align:"start",decimals:2,size:26,unit:"",placeholder:"--",group:"pressure"},{id:"press_u",role:"pressure",kind:"text",show:"unit",x:a,y:122,w:118,align:"start",size:11,group:"pressure"},{id:"press_lbl",role:"",kind:"text",text:"PRESSURE",x:a,y:86,w:118,align:"start",size:10,group:"pressure"},{id:"fill",role:"fill_valve",kind:"lamp",label:"FILL",x:a,y:166,w:14,on:"#3ddc84",off:"#16281d"},{id:"fault",role:"common_fault",kind:"lamp",label:"FAULT",x:a,y:204,w:14,on:"#ef4444",off:"#2a1717"}];return{size:[i,358],artNode:B`
    <rect x="0" y="0" width=${i} height=${358} rx="10" fill="#101216" />
    <text x="16" y="26" fill=${di} font-size="12" letter-spacing="1.6"
          font-family="inherit">WATER STORAGE</text>
    ${r}
    <!-- Common outlet header the tanks feed -->
    <line x1=${26} y1=${328} x2=${a-14}
          y2=${328}
          stroke="#2563eb" stroke-width="5" stroke-linecap="round" />
  `,regions:[...o,...s]}}},hi="#a7b2c0",pi="#38bdf8",fi={id:"pool-plant",name:"Pool Plant",card:"plant-equipment-card",render:"svg",display:"negative",size:[420,290],artNode:B`
  <defs>
    <linearGradient id="pool-water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.25" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width=${420} height=${290} rx="10" fill="#101216" />
  <text x="16" y="26" fill=${hi} font-size="12" letter-spacing="1.6"
        font-family="inherit">POOL</text>

  <!-- The pool itself: a sectioned basin, deep end to the right -->
  <path d="M 24 128 L 232 128 L 232 206 Q 232 216 222 216
           L 34 216 Q 24 216 24 206 Z"
        fill="url(#pool-water)" stroke=${"#3d4551"} stroke-width="2" />
  <path d="M 24 140 Q 60 132 96 140 T 168 140 T 232 140"
        fill="none" stroke=${pi} stroke-width="2" opacity="0.65" />
  <path d="M 24 154 Q 60 146 96 154 T 168 154 T 232 154"
        fill="none" stroke=${pi} stroke-width="1.5" opacity="0.35" />

  <!-- Return and suction, so the pump lamp has something to belong to -->
  <line x1="24" y1="236" x2="232" y2="236" stroke="#2563eb"
        stroke-width="4" stroke-linecap="round" opacity="0.8" />
  <text x="24" y="256" fill=${hi} font-size="11" letter-spacing="1.2"
        font-family="inherit">CIRCULATION</text>
`,regions:[{id:"wt",role:"water_temp",kind:"text",x:20,y:86,w:168,align:"start",decimals:1,size:52,unit:"",placeholder:"--"},{id:"wt_u",role:"water_temp",kind:"text",show:"unit",x:192,y:72,w:40,align:"start",size:16},{id:"wt_lbl",role:"",kind:"text",text:"WATER",x:20,y:46,w:168,align:"start",size:10},{id:"htr",role:"heater",kind:"lamp",label:"HEATER",x:262,y:58,w:16,on:"#f97316",off:"#2a1d11"},{id:"htr_sp",role:"heater_setpoint",kind:"text",x:324,y:70,w:80,align:"end",decimals:1,size:20,unit:"",placeholder:"",group:"heater_sp"},{id:"htr_sp_l",role:"",kind:"text",text:"HEATER SET",x:324,y:84,w:80,align:"end",size:9,group:"heater_sp"},{id:"solar",role:"solar",kind:"lamp",label:"SOLAR",x:262,y:110,w:16,on:"#fbbf24",off:"#2a2512"},{id:"solar_sp",role:"solar_setpoint",kind:"text",x:324,y:122,w:80,align:"end",decimals:1,size:20,unit:"",placeholder:"",group:"solar_sp"},{id:"solar_sp_l",role:"",kind:"text",text:"SOLAR SET",x:324,y:136,w:80,align:"end",size:9,group:"solar_sp"},{id:"pump",role:"filter_pump",kind:"lamp",label:"PUMP",x:262,y:162,w:16,on:"#3ddc84",off:"#16281d"},{id:"pmode",role:"pump_mode",kind:"text",x:262,y:206,w:142,align:"start",size:13,placeholder:"",group:"pump_mode"},{id:"pmode_l",role:"",kind:"text",text:"PUMP MODE",x:262,y:220,w:142,align:"start",size:9,group:"pump_mode"},{id:"mode",role:"pool_mode",kind:"text",x:262,y:248,w:142,align:"start",size:13,placeholder:"",group:"pool_mode"},{id:"mode_l",role:"",kind:"text",text:"POOL MODE",x:262,y:262,w:142,align:"start",size:9,group:"pool_mode"},{id:"fault",role:"fault",kind:"lamp",label:"FAULT",x:20,y:246,w:14,on:"#ef4444",off:"#2a1717"}],description:"Pool heating and circulation. Water temperature is the hero; heater, solar and filter pump explain why it is what it is. Read-only — stack the mode selects and setpoint numbers underneath, which Home Assistant's own rows do better than a drawing. Pair with a water meter faceplate for consumption.",emulates:"Pool chlorinator / heat pump controller"},ui={band:[0,8],label:"FRIDGE"},gi={band:[-26,-12],label:"FREEZER"},mi="#171d25",xi="#4a5462",yi="#323a45",$i="#4a5462",_i="#a7b2c0";function wi(e,t,i,o){const r=t+34+10;return[{id:"temp",role:"temperature",kind:"text",x:e,y:t,w:i-26,align:"end",decimals:1,size:34,unit:"",placeholder:"--"},{id:"temp_u",role:"temperature",kind:"text",show:"unit",x:e+i-24,y:t+34-14,w:24,align:"start",size:14},{id:"band",role:"temperature",kind:"bar",x:e,y:r,w:i,h:6,min:o.band[0],max:o.band[1]},{id:"sp",role:"setpoint",kind:"text",x:e,y:r+12,w:i,align:"middle",decimals:1,size:12,unit:"",placeholder:"",group:"setpoint"},{id:"sp_lbl",role:"",kind:"text",text:"SETPOINT",x:e,y:r+28,w:i,align:"middle",size:10,group:"setpoint"}]}function bi(e,t,i=62){return[{id:"door",role:"door",kind:"lamp",label:"DOOR",x:e,y:t,w:14,on:"#f59e0b",off:"#2a2317"},{id:"comp",role:"compressor",kind:"lamp",label:"COMP",x:e+i,y:t,w:14,on:"#3ddc84",off:"#16281d"},{id:"alarm",role:"alarm",kind:"lamp",label:"ALARM",x:e+2*i,y:t,w:14,on:"#ef4444",off:"#2a1717"}]}function vi(e,t,i){return B`
    <rect x="0" y="0" width=${e} height=${t} rx="10" fill="#101216" />
    <text x="16" y="25" fill=${_i} font-size="12" letter-spacing="1.6"
          font-family="inherit">${i}</text>
  `}const ki=96,zi=118;function Ai(e){return t=>{const i=Math.max(0,Math.min(6,Math.round(t.doors??2))),o=Math.max(0,Math.min(8,Math.round(t.drawers??0))),r=i+(o>0?1:0)||1,a=78,s=20,n=Math.max(300,40+r*a+8*(r-1)),l=[];let d=s;for(let e=0;e<i;e++)l.push(B`
        <rect x=${d} y=${106} width=${a} height=${98}
              rx="5" fill=${mi} stroke=${xi} stroke-width="1.5" />
        <rect x=${d+a-14} y=${130} width="5" height="30"
              rx="2.5" fill=${_i} opacity="0.7" />
      `),d+=86;if(o>0){const e=98/o;for(let t=0;t<o;t++){const i=106+t*e;l.push(B`
          <rect x=${d} y=${i+1} width=${a} height=${Math.max(4,e-3)}
                rx="3" fill=${mi} stroke=${xi} stroke-width="1.2" />
          <rect x=${d+39-12} y=${i+e/2-1.5} width="24"
                height="3" rx="1.5" fill=${_i} opacity="0.6" />
        `)}}return{size:[n,270],artNode:B`
      ${vi(n,270,`UNDER-BENCH ${e.label}`)}
      <rect x=${12} y=${ki} width=${n-24}
            height=${zi} rx="8"
            fill=${yi} stroke=${$i} stroke-width="2" />
      <rect x=${12} y=${88} width=${n-24}
            height="10" rx="3" fill=${$i} />
      ${l}
    `,regions:[...wi(n-150,20,134,e),...bi(s,226,74)]}}}const Mi=360,Ci=300;function Si(e){return()=>{const t=170,i=B`
      ${vi(Mi,Ci,`WALK-IN ${e.label}`)}
      <rect x="22" y=${72} width=${316} height=${t} rx="8"
            fill=${yi} stroke=${$i} stroke-width="2" />
      <!-- One wide insulated door with the handle and the kick plate -->
      <rect x="40" y=${88} width=${200} height=${138}
            rx="6" fill=${mi} stroke=${xi} stroke-width="1.8" />
      <rect x=${226} y=${135} width="7"
            height="44" rx="3.5" fill=${_i} opacity="0.75" />
      <rect x="48" y=${196} width=${184}
            height="22" rx="3" fill="#161b21" />
      <text x="52" y=${266} fill=${_i} font-size="11"
            letter-spacing="1.2" font-family="inherit">
        ${e===gi?"FREEZER ROOM":"COLD ROOM"}
      </text>
    `;return{size:[Mi,Ci],artNode:i,regions:[...wi(220,14,124,e),...bi(28,256,80)]}}}const Ei=330;function Ni(e){return t=>{const i=Math.max(1,Math.min(2,Math.round(t.doors??1))),o=104,r=Math.max(260,44+i*o+8*(i-1)+128),a=[];let s=30;for(let e=0;e<i;e++)a.push(B`
        <rect x=${s} y=${76} width=${o} height=${190}
              rx="6" fill=${mi} stroke=${xi} stroke-width="1.6" />
        <rect x=${s+o-16} y=${145} width="6"
              height="52" rx="3" fill=${_i} opacity="0.7" />
      `),s+=112;const n=B`
      ${vi(r,Ei,`UPRIGHT ${e.label}`)}
      <rect x=${22} y=${64} width=${i*o+8*(i-1)+16}
            height=${214} rx="8"
            fill=${yi} stroke=${$i} stroke-width="2" />
      ${a}
    `;return{size:[r,Ei],artNode:n,regions:[...wi(r-146,56,130,e),...bi(r-124-34,282)]}}}const Oi=[{key:"doors",label:"Doors",type:"number",min:0,max:6,default:2,help:"How many hinged doors the cabinet has, left to right."},{key:"drawers",label:"Drawers",type:"number",min:0,max:8,default:0,help:"Drawers stack in a bay to the right of the doors. A cabinet with neither draws a single door."}],Pi={card:"plant-equipment-card",render:"svg",display:"negative",regions:[]};function Ti(e,t){return`${e}. Temperature against its ${t.band[0]} to ${t.band[1]} °C band is the primary reading; door, compressor and alarm are lamps. Doors and drawers are drawn to identify the cabinet, not bound separately — a real unit has one door switch for the whole thing.`}const Ri=[{key:"doors",label:"Doors",type:"number",min:1,max:2,default:1,help:"Single or double upright."}],Li=[Se,we,Me,ve,Pe,Ye,ct,Le,Je,ot,ti,{id:"av-room-controller",name:"AV Room Controller",card:"room-controller-card",render:"svg",display:"negative",size:[ai,300],artNode:si,regions:[{id:"source",role:"source",kind:"text",x:32,y:76,w:356,align:"start",size:20,placeholder:""},{id:"source_label",role:"",kind:"text",text:"SOURCE",x:32,y:100,w:120,align:"start",size:11},{id:"display_lamp",role:"display_power",kind:"lamp",x:374,y:58,w:14,on:"#3ddc84",off:"#16281d"},{id:"power",role:"",kind:"button",text:"DISPLAY",action:"power_toggle",target:"display_power",x:288,y:86,w:100,h:22},{id:"vol_bar",role:"volume",kind:"bar",x:28,y:154,w:210,h:12,min:0,max:100},{id:"vol_text",role:"volume",kind:"text",x:250,y:165,w:60,align:"start",decimals:0,size:18},{id:"vol_down",role:"",kind:"button",text:"−",action:"level_down",target:"volume",x:316,y:148,w:40,h:24},{id:"vol_up",role:"",kind:"button",text:"+",action:"level_up",target:"volume",x:360,y:148,w:40,h:24},{id:"mute_lamp",role:"mute",kind:"lamp",x:30,y:210,w:12,on:"#ef4444",off:"#2a1717"},{id:"mute",role:"",kind:"button",text:"MUTE",action:"mute_toggle",target:"mute",x:52,y:206,w:64,h:24},{id:"mic_lamp",role:"mic_live",kind:"lamp",label:"MIC",x:150,y:210,w:12,on:"#f59e0b",off:"#2a2317"},{id:"fault_lamp",role:"fault",kind:"lamp",label:"FAULT",x:220,y:210,w:12,on:"#ef4444",off:"#2a1717"},{id:"online_lamp",role:"online",kind:"lamp",label:"ONLINE",x:300,y:210,w:12,on:"#3ddc84",off:"#16281d"}],description:"A room at a glance: source, display power, volume and mute, with mic, fault and online indicators. Bind whichever joins carry them."},ft,gt,$t,_t,bt,Ot,Pt,Tt,Rt,jt,Gt,Jt,ri,Wt,{id:"indoor-unit",name:"Indoor Unit (full status)",card:"hvac-controller-card",render:"svg",display:"negative",size:[qt,366],pages:["status","more"],artNode:Zt,regions:Qt,description:"Every point an indoor unit reports: room against setpoint, what it is doing as well as what it is set to, the manufacturer's fault code, and lamps for run, alarm, filter, compressor, fan, heater, comms, eco and forced thermostat off, with keys for setpoint, on/off and clearing the filter sign, and drop-downs for mode and fan speed. For one unit you are looking into, where fcu-unit is for two hundred in a grid.",emulates:"Generic VRV or BMS indoor unit"},{...Pi,id:"underbench-fridge",name:"Under-bench Fridge",size:[300,270],description:Ti("Under-counter refrigerator, 1-6 doors or 1-8 drawers",ui),emulates:"Under-counter commercial refrigerator",options:Oi,build:Ai(ui)},{...Pi,id:"underbench-freezer",name:"Under-bench Freezer",size:[300,270],description:Ti("Under-counter freezer, 1-6 doors or 1-8 drawers",gi),emulates:"Under-counter commercial freezer",options:Oi,build:Ai(gi)},{...Pi,id:"walkin-fridge",name:"Walk-in Fridge",size:[Mi,Ci],description:Ti("Walk-in cold room",ui),emulates:"Walk-in cold room",build:Si(ui)},{...Pi,id:"walkin-freezer",name:"Walk-in Freezer",size:[Mi,Ci],description:Ti("Walk-in freezer room",gi),emulates:"Walk-in freezer room",build:Si(gi)},{...Pi,id:"upright-fridge",name:"Upright Fridge",size:[260,Ei],description:Ti("Upright reach-in refrigerator",ui),emulates:"Upright reach-in refrigerator",options:Ri,build:Ni(ui)},{...Pi,id:"upright-freezer",name:"Upright Freezer",size:[260,Ei],description:Ti("Upright reach-in freezer",gi),emulates:"Upright reach-in freezer",options:Ri,build:Ni(gi)},ci,fi];function Ii(e){return Li.filter(t=>t.card===e)}function Ui(e,t){const i=Ii(e);return i.find(e=>e.id===t)??i[0]}function ji(e,t={},i){if(!e.build)return e;const o={};for(const i of e.options??[]){const e=t[i.key];o[i.key]="number"==typeof e&&Number.isFinite(e)?Math.max(i.min,Math.min(i.max,e)):i.default}return{...e,...e.build(o,i)}}const Di="opt__",Gi="ent__",Fi="lbl__";function Hi(e){const t=e.replace(/_/g," ").trim();return t.charAt(0).toUpperCase()+t.slice(1)}const Bi={id:"",name:"",card:"",render:"svg",size:[1,1],regions:[]};function Wi(e,t={}){class i extends le{constructor(){super(...arguments),this._label=e=>{const i=e.name;if("title"===i)return"Title";if("faceplate"===i)return"Faceplate";if("device"===i)return"Device (fills every point below)";if("hide_unbound"===i)return"Hide controls with nothing bound";if(i.startsWith(Di)){const e=i.slice(5),t=(this._faceplate().options??[]).find(t=>t.key===e);return t?.label??Hi(e)}if(i.startsWith(Fi))return`${Hi(i.slice(5))} name`;if(i.startsWith(Gi))return Hi(i.slice(5));const o=(t.numbers??[]).find(e=>e.key===i);return o?.label??Hi(i)}}setConfig(e){this._config=e}_faceplate(){const t=this._config?.panel;return ji((t&&"screens"in t?t.screens[t.default_screen]??Object.values(t.screens)[0]:t??Ui(e,this._config?.faceplate))??Bi,this._config?.options??{})}_labelKeys(){const e=this._faceplate();return e.labelPrefix?e.regions.map(e=>/^name(\d+)$/.exec(e.id)?.[1]).filter(e=>Boolean(e)).map(t=>`${e.labelPrefix}${t}`):[]}_roles(){const e=[...new Set(this._faceplate().regions.map(e=>e.role))].filter(Boolean);return t.expandRoles?t.expandRoles(e):e}_emit(e){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_data(){const i=this._config??{},o={title:i.title??i.name??"",hide_unbound:!1!==i.hide_unbound,faceplate:i.panel?"":Ui(e,i.faceplate)?.id??"",device:i.device??""};for(const e of this._faceplate().options??[])o[Di+e.key]=i.options?.[e.key]??e.default;for(const e of t.numbers??[])o[e.key]=i[e.key];for(const e of this._labelKeys())o[Fi+e]=i.labels?.[e]??"";for(const e of this._roles())o[Gi+e]=i.entities?.[e]??"";return o}_fromData(i){const o={...this._config,type:this._config?.type??`custom:${e}`,faceplate:String(i.faceplate??"")};o.panel&&delete o.faceplate;const r=String(i.title??"").trim();r?o.title=r:delete o.title,r&&delete o.name,!1===i.hide_unbound?o.hide_unbound=!1:delete o.hide_unbound;const a=String(i.device??"").trim();a?o.device=a:delete o.device;const s={};for(const e of this._faceplate().options??[]){const t=Number(i[Di+e.key]);Number.isFinite(t)&&(s[e.key]=t)}Object.keys(s).length?o.options=s:delete o.options;for(const e of t.numbers??[]){const t=Number(i[e.key]);Number.isFinite(t)?o[e.key]=t:delete o[e.key]}const n={};for(const e of this._labelKeys()){const t=String(i[Fi+e]??"").trim();t&&(n[e]=t)}Object.keys(n).length?o.labels=n:delete o.labels;const l={};for(const e of this._roles()){const t=String(i[Gi+e]??"").trim();t&&(l[e]=t)}return Object.keys(l).length?o.entities=l:delete o.entities,o}_schema(){const i=this._faceplate(),o=Ii(e).map(e=>({value:e.id,label:e.emulates?`${e.name} — ${e.emulates}`:e.name})),r=[{name:"title",selector:{text:{}}},{name:"faceplate",selector:{select:{mode:"dropdown",options:o}}},{name:"device",selector:{device:{}}},{name:"hide_unbound",selector:{boolean:{}}}];for(const e of i.options??[])r.push({name:Di+e.key,selector:{number:{min:e.min,max:e.max,mode:"box"}}});for(const e of t.numbers??[])r.push({name:e.key,selector:{number:{min:e.min,max:e.max,step:e.step??1,mode:"box"}}});for(const e of this._labelKeys())r.push({name:Fi+e,selector:{text:{}}});for(const e of this._roles())r.push({name:Gi+e,selector:{entity:{}}});return r}render(){if(!this._config)return q;const e=this._faceplate(),t=this._roles(),i=t.filter(e=>this._config?.entities?.[e]).length,o=H`
        <p class="note">${e.description??""}</p>
        <p class="note">
          ${i} of ${t.length} points set.
          ${this._config.device?"Points left blank are matched from the device.":!1===this._config.hide_unbound?"Points left blank stay dark on the card.":"Points left blank are left off the card."}
        </p>
      `;return customElements.get("ha-form")?H`
          ${o}
          <ha-form
            .hass=${this.hass}
            .data=${this._data()}
            .schema=${this._schema()}
            .computeLabel=${this._label}
            @value-changed=${e=>this._emit(this._fromData(e.detail.value))}
          ></ha-form>
        `:H`${o}${this._fallback()}`}_fallback(){const i=this._data(),o=Object.keys(this.hass?.states??{}).sort(),r=e=>t=>{const o=t.target.value;this._emit(this._fromData({...i,[e]:o}))};return H`
        <div class="editor">
          <label>
            Title
            <input .value=${String(i.title??"")} @change=${r("title")} />
          </label>
          <label>
            Faceplate
            <select @change=${r("faceplate")}>
              ${Ii(e).map(e=>H`<option value=${e.id}
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
            <input .value=${String(i.device??"")} @change=${r("device")} />
          </label>
          ${(this._faceplate().options??[]).map(e=>H`
              <label>
                ${e.label}
                <input type="number" min=${e.min} max=${e.max}
                  .value=${String(i[Di+e.key]??e.default)}
                  @change=${r(Di+e.key)} />
                ${e.help?H`<span class="note">${e.help}</span>`:q}
              </label>
            `)}
          ${(t.numbers??[]).map(e=>H`
              <label>
                ${e.label}
                <input type="number" min=${e.min} max=${e.max}
                  step=${e.step??1}
                  .value=${String(i[e.key]??"")}
                  @change=${r(e.key)} />
              </label>
            `)}
          ${this._labelKeys().map(e=>H`
              <label>
                ${Hi(e)} name
                <input .value=${String(i[Fi+e]??"")}
                  placeholder="shown on the strip"
                  @change=${r(Fi+e)} />
              </label>
            `)}
          <datalist id="fp-entities">
            ${o.map(e=>H`<option value=${e}></option>`)}
          </datalist>
          ${this._roles().map(e=>H`
              <label>
                ${Hi(e)}
                <input list="fp-entities" placeholder="entity id"
                  .value=${String(i[Gi+e]??"")}
                  @change=${r(Gi+e)} />
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
    `,customElements.define(`${e}-editor`,i)}const qi={energy_total:/metertotal$|_energy_total$|_kwh_total$|_accumulated_power$/,power_total:/3phase_active_power$|_active_power$|_power_total$/,power_l1:/active_power_p1$/,power_l2:/active_power_p2$/,power_l3:/active_power_p3$/,volts_l1:/phase_1_v$|_l1_n$|_voltage_l1$/,volts_l2:/phase_2_v$|_l2_n$|_voltage_l2$/,volts_l3:/phase_3_v$|_l3_n$|_voltage_l3$/,current_l1:/phase_1_a$|_current_l1$/,current_l2:/phase_2_a$|_current_l2$/,current_l3:/phase_3_a$|_current_l3$/,power_factor:/power_factor$/,frequency:/frequency$/,volume_total:/_cubicmetre$|_volume_total$|_water_total$|watermeter_total$/,bypass_total:/_bypass_total$|_bypass_cubicmetre$/,flow_rate:/_flow_rate$|_flowrate$|_l_min$|_l_s$|_m3_h$/,battery:/_battery$|_battery_level$|_batt$/,alarm:/_alarm$|_common_fault$/,reverse_flow:/_reverse_flow$|_reverse$/,run:/_running$|_run_status$|_on_off_status$|_startstopstatus$/,fault:/_alarm$|_fault$|_common_fault$/,fault_code:/_malfunction_code$|_malfunctioncode$|_fault_code$|_error_code$/,hvac_mode:/(?<!controller)(?<!ventilation)_mode$|_mode_status$|_operation_mode$|_airconmodestatus$/,hvac_action:/_thermostat$|_thermo_status$|_thermostatus$|_hvac_action$/,room_temp:/_room_temperature$|_room_temp$|_roomtemp$|_space_temp(erature)?$/,setpoint:/(?<!cooling|heating|cool|heat|humidity|rh|controller)_setpoint$|_set_temperature$|_set_temp$|_stpt$|_tempadjust$/,setpoint_adjust:/_setpoint_adjust$|_temp_adjust$|_temp_offset$/,setpoint_cool:/_cooling_setpoint$|_setpoint_cool$|_cool_setpoint$/,setpoint_heat:/_heating_setpoint$|_setpoint_heat$|_heat_setpoint$/,fan_speed:/_fan_speed$|_fan_status$|_fanstatus$|_airflowrate(status)?$/,fan_running:/_indoor_fan$|_indoorfanstatus$|_fan_running$|_supply_fan$/,swing:/_air_direction$|_airdirection(status)?$|_swing(_mode)?$|_vane$|_louvre$/,filter:/(?<!reset)_filter$|(?<!reset)_filter_sign$|_filtersign$|_filter_alarm$|_filter_dirty$/,filter_dp:/_filter_dp$|_filter_differential_pressure$/,filter_reset:/_reset_filter_sign$|_filter_reset$|_reset_filter$/,gas_total:/_accumulated_gas$|_gas_total$/,lock_power:/_wall_controller_power$|_remote_lock_on_off$|_lock_power$/,lock_mode:/_wall_controller_mode$|_remote_lock_mode$|_lock_mode$/,lock_setpoint:/_wall_controller_setpoint$|_remote_lock_setpoint$|_lock_setpoint$/,central_rejected:/_reject_sub_group_control$|_central_control_rejection$/,ventilation_mode:/_ventilation_mode$/,ventilation_amount:/_ventilation_amount$/,compressor:/_compressor$|_compressorstatus$/,heater:/_heater$|_heaterstatus$/,comms:/_communication$|_communicationstatus$|_comms$|_offline$/,energy_saving:/_energy_saving$|_energyefficiencystatus$|_eco$|_setback$/,thermo_off:/_forced_thermostat_off$|_forcedthermooffstatus$/,forced_off:/_forced_stop$|_systemforcedoff$|_forced_off$/,supply_air_temp:/_supply_air_temp(erature)?$|_discharge_air_temp$|_sat$/,return_air_temp:/_return_air_temp(erature)?$|_rat$/,outside_air_temp:/_outside_air_temp(erature)?$|_ambient_temp(erature)?$|_oat$/,humidity:/_humidity$|_relative_humidity$|_rh$/,humidity_setpoint:/_humidity_setpoint$|_rh_setpoint$/,co2:/_co2$|_carbon_dioxide$|_co2_level$/,valve_position:/_valve_position$|_valve$|_vlv_pos$/,damper_position:/_damper_position$|_damper$|_dmp_pos$/,occupancy:/_occupancy$|_occupied$/},Vi=new Set(["unavailable","unknown","none",""]),Ki={volts_avg:["volts_l1","volts_l2","volts_l3"],current_avg:["current_l1","current_l2","current_l3"]};function Yi(e,t){const i=e.entities??{},o=Zi(e,t),r=Object.values(i).filter(e=>e.device_id===o).map(e=>e.entity_id).filter(t=>void 0!==e.states[t]).sort();return r.length?r:Object.keys(e.states).filter(e=>e.includes(t)).sort()}function Zi(e,t){const i=e.devices??{};if(i[t])return t;const o=t.trim().toLowerCase(),r=Object.entries(i).find(([,e])=>(e.name_by_user??"").trim().toLowerCase()===o||(e.name??"").trim().toLowerCase()===o);return r?r[0]:t}function Qi(e,t){const i=Zi(e,t);if(Object.values(e.entities??{}).some(e=>e.device_id===i&&"crestron_cip"===e.platform))return e.devices?.[i]?.config_entries?.[0]}const Xi={button:"d",lamp:"d",level:"a",fader:"a",text:"s"},Ji={level:["number","input_number"],mute:["switch","input_boolean"]},eo={gain:"level",level:"level",volume:"level",vol:"level",mute:"mute"};function to(e,t,i,o){const r=function(e){const t=e.toLowerCase().replace(/[^a-z0-9]/g,"");for(const e of Object.keys(eo))if(t.endsWith(e))return t.slice(0,-e.length);return t}(t);if(!r)return"";const a=Ji[i]??[];let s="",n=1/0;for(const e of o){const[t,i=""]=e.split(".");if(a.length&&!a.includes(t))continue;const o=i.replace(/[^a-z0-9]/g,"");o.startsWith(r)&&(o.length<n&&(s=e,n=o.length))}return s}function io(e){const t=/^([a-z]+)_o(\d+)_(\d+)$/.exec(e);if(t){const e=Xi[t[1]];if(!e||Number(t[3])<1)return;return`o${t[2]}:${e}${t[3]}`}const i=e.lastIndexOf("_");if(i<=0)return;const o=Xi[e.slice(0,i)],r=e.slice(i+1);return!o||!/^\d+$/.test(r)||Number(r)<1?void 0:`${o}${r}`}function oo(e){const t=/^(?:o(\d+):)?([das])(\d+)$/.exec(e);if(t)return{obj:Number(t[1]??0),bus:t[2],join:Number(t[3])}}function ro(e,t){if(!t)return{dark:!0,stale:!1};const i=e.states[t];if(!i)return{entityId:t,dark:!0,stale:!1};const o=String(i.state);if(Vi.has(o.toLowerCase()))return{entityId:t,state:o,dark:!0,stale:!0};const r=Number(o);return{entityId:t,state:o,value:Number.isFinite(r)?r:void 0,unit:i.attributes.unit_of_measurement,dark:!1,stale:!1}}function ao(e,t,i){if(t[i])return ro(e,t[i]);if("clock"===i){const e=new Date;return{state:`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`,dark:!1,stale:!1}}const o=Ki[i];if(!o)return{dark:!0,stale:!1};const r=o.map(i=>ro(e,t[i]));if(r.some(e=>e.dark||void 0===e.value))return{dark:!0,stale:r.some(e=>e.stale)};const a=r.reduce((e,t)=>e+(t.value??0),0);return{value:a/r.length,state:String(a/r.length),unit:r[0].unit,dark:!1,stale:!1}}function so(e,t,i){const o=e.states[t];if(!o)return{entityId:t,dark:!0,stale:!1};if(Vi.has(String(o.state).toLowerCase()))return{entityId:t,state:o.state,dark:!0,stale:!0};const r=o.attributes,a=(e,i)=>{if(null==e)return{entityId:t,dark:!0,stale:!1};const o=Number(e);return{entityId:t,state:String(e),value:Number.isFinite(o)?o:void 0,unit:i,dark:!1,stale:!1}},s=e=>"string"==typeof e&&e?(e.charAt(0).toUpperCase()+e.slice(1)).replace(/_/g," "):e;switch(i){case"hvac_mode":return a(s(o.state));case"hvac_action":return a(s(r.hvac_action??o.state));case"setpoint":return a(r.temperature,"°C");case"room_temp":return a(r.current_temperature,"°C");case"fan_speed":return a(s(r.fan_mode));case"swing":return a(s(r.swing_mode));case"power":return a("off"===o.state?"off":"on");case"humidity":return a(r.current_humidity,"%");default:return{entityId:t,dark:!0,stale:!1}}}async function no(e,t,i,o,r=1,a){const s=i.target?t?.[i.target]:void 0;if(!s)return void o(`Nothing is bound to ${i.target??"this control"}.`);const n=e.states[s];if(!n)return void o(`${s} does not exist.`);if("source_cycle"===i.action){const t=s.split(".")[0];return"select"!==t&&"input_select"!==t?void o(`${s} is a ${t}; it has no source list to step.`):void await e.callService(t,"select_next",{entity_id:s,cycle:!0})}if("press"===i.action){const t=s.split(".")[0];return void("button"===t||"input_button"===t?await e.callService(t,"press",{entity_id:s}):"switch"===t||"input_boolean"===t?await e.callService("homeassistant","toggle",{entity_id:s}):o(`${s} is a ${t}; it cannot be pressed.`))}if("mute_toggle"===i.action||"power_toggle"===i.action){const t=s.split(".")[0];return"sensor"===t||"binary_sensor"===t?void o(`${s} is read-only — it reports state but cannot be set.`):void await e.callService("homeassistant","toggle",{entity_id:s})}const l=Number(n.state);if(!Number.isFinite(l))return void o(`${s} has no numeric level to change.`);const d=Number(n.attributes.min??-1/0),c=Number(n.attributes.max??1/0);let h;if("set_level"===i.action){if(void 0===a||!Number.isFinite(a))return;h=Math.min(c,Math.max(d,a));const e=Number(n.attributes.step);Number.isFinite(e)&&e>0&&(h=Math.round(h/e)*e),h=Math.round(100*h)/100}else{const e=Number(r)||1,t="level_up"===i.action?e:-e;if(h=Math.min(c,Math.max(d,l+t)),h===l)return void o(`${s} is already at its ${t>0?"maximum":"minimum"}.`)}if(h===l)return;const p=s.split(".")[0];"number"===p||"input_number"===p?await e.callService(p,"set_value",{entity_id:s,value:h}):o(`${s} is a ${p}; its level cannot be set from here.`)}function lo(e,t){if(!t)return;const i=(t.title??t.name??"").trim();return i||(e&&t.device?function(e,t){const i=e.devices??{},o=i[t]??Object.values(i).find(e=>{const i=t.trim().toLowerCase();return(e.name_by_user??"").trim().toLowerCase()===i||(e.name??"").trim().toLowerCase()===i});return(o?.name_by_user||o?.name)??void 0}(e,t.device):void 0)}const co=new Set(["mute_toggle","power_toggle","level_up","level_down","set_level","source_cycle"]);function ho(e,t,i){return e.group?i(e.group):e.role?t(e.role):!(e.target&&e.action&&co.has(e.action))||t(e.target)}function po(e,t,i,o,r=e=>e){const a=t.options??{},s=ji(i,a,{bound:()=>!0,filtering:!1}),n=r([...new Set(s.regions.flatMap(e=>[e.role,e.visible_role??"",e.label_role??""]))].filter(Boolean)),l={};for(const e of s.regions)e.role&&e.control&&(l[e.role]={control:e.control,kind:e.control_kind??""});const d=function(e,t,i={},o=[],r={}){const a={};for(const s of t){if(i[s]){a[s]=i[s];continue}const t=o.length?o:Object.keys(e.states),n=qi[s];if(n){const e=t.find(e=>n.test(e));if(e){a[s]=e;continue}}const l=io(s);if(l){const i=t.find(t=>e.states[t]?.attributes?.join===l);if(i){a[s]=i;continue}}const d=r[s];if(!d?.control)continue;const c=to(0,d.control,d.kind,Object.keys(e.states));c&&(a[s]=c)}return a}(e,n,t.entities??{},o,l),c=e=>{if(d[e])return!0;const t=Ki[e];return Boolean(t?.length&&t.every(e=>d[e]))};if(!1===t.hide_unbound)return{faceplate:s,bindings:d,roles:n,hidden:0};const h=ji(i,a,{bound:c,filtering:!0}),p=new Set;for(const e of h.regions)e.group&&e.role&&c(e.role)&&p.add(e.group);const f=e=>p.has(e),u=h.regions.filter(e=>ho(e,c,f)),g=new Set;let m=0;for(const e of h.regions)ho(e,c,f)||(e.group?g.add(e.group):m+=1);const x=g.size+m;return{faceplate:{...h,regions:u},bindings:d,roles:n,hidden:x}}function fo(e){return 1===e?"1 control hidden — nothing bound to it.":`${e} controls hidden — nothing bound to them.`}function uo(e){return io(e)?.startsWith("d")??!1}function go(e){const[t,i]=e.faceplate.size,o=function(e){return e.faceplate.regions.filter(t=>t.visible_role&&e.bindings[t.visible_role]?xo(ao(e.hass,e.bindings,t.visible_role)):!(t.visible_role&&e.unreportedIsOff&&uo(t.visible_role))&&(!t.page||t.page===e.page||Boolean(e.faceplate.page_companions?.[e.page]?.includes(t.page))))}(e);return H`
    <svg
      class="faceplate display-${e.faceplate.display??"positive"}"
      viewBox="0 0 ${t} ${i}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label=${e.faceplate.name}
      style=${`--faceplate-width:${t}px`}
    >
      ${function(e){if("image"===e.render&&e.art){const[t,i]=e.size;return B`<image href=${e.art} x="0" y="0" width=${t} height=${i} />`}return B`${e.artNode??""}`}(e.faceplate)}
      ${o.map(t=>function(e,t){const i=Boolean(e.climate&&mo.has(t.role)&&void 0!==e.hass.states[e.climate]?.attributes?.hvac_action),o=!e.climate||!i&&e.bindings[t.role]?ao(e.hass,e.bindings,t.role):so(e.hass,e.climate,t.role);switch(t.kind){case"text":return function(e,t){const i=e.role?"unit"===e.show?(t.unit??e.text??"").toUpperCase():t.dark&&void 0!==e.placeholder?e.placeholder:function(e,t=1,i){if(e.dark)return"--";if(void 0===e.value)return e.state??"--";const o=e.value.toFixed(t),r=i??e.unit??"";return r?`${o} ${r}`:o}(t,e.decimals??1,e.unit):e.text??"";if(!e.role&&!e.text)return B``;const o=e.align??"start",r=e.x+("end"===o?e.w??0:"middle"===o?(e.w??0)/2:0);return B`
    ${e.label?B`<text class="lcd-label" x=${e.x} y=${e.y-10}>${e.label}</text>`:""}
    <text
      class="lcd-value ${e.role?"":"chrome"} ${e.role&&t.dark?"dark":""} ${t.stale?"stale":""}"
      x=${r}
      y=${e.y+(e.size??22)}
      font-size=${e.size??22}
      text-anchor=${o}
      style=${e.color?`fill:${e.color}`:""}
    >${i}</text>
  `}(t,o);case"lamp":return function(e,t){const i=xo(t),o=(e.w??12)/2;return B`
    <circle
      class="lamp ${i?"lit":""}"
      cx=${e.x+o}
      cy=${e.y+o}
      r=${o}
      fill=${i?e.on??"#e34":e.off??"#3a1418"}
    />
    ${e.label?B`<text class="lamp-label" x=${e.x+o}
              y=${e.y+2*o+13} text-anchor="middle"
              font-size="11" letter-spacing="0.6" fill="#b8c2cf"
            >${e.label}</text>`:""}
  `}(t,o);case"bar":return function(e,t,i){const o=t.w??100,r=t.h??10;let a=t.max??100,s=t.min??0;if(t.auto_range&&i.entityId){const t=e.hass.states[i.entityId]?.attributes;"number"==typeof t?.min&&"number"==typeof t?.max&&(s=t.min,a=t.max)}const n=a-s||1,l=i.dark||void 0===i.value?0:Math.max(0,Math.min(1,(i.value-s)/n)),d="set_level"===t.action,c=i=>{const o=i.currentTarget.getBoundingClientRect();if(t.vertical){if(!o.height)return;const r=Math.min(1,Math.max(0,(o.bottom-i.clientY)/o.height));return void e.onAction(t,s+r*n)}if(!o.width)return;const r=Math.min(1,Math.max(0,(i.clientX-o.left)/o.width));e.onAction(t,s+r*n)},h=t.vertical?{x:t.x,y:t.y+r*(1-l),width:o,height:r*l}:{x:t.x,y:t.y,width:o*l,height:r};return B`
    <rect class="bar-track" x=${t.x} y=${t.y} width=${o} height=${r} rx="2" />
    <rect
      class="bar-fill"
      x=${h.x}
      y=${h.y}
      width=${h.width}
      height=${h.height}
      rx="2"
    />
    ${d?B`<rect
          class="bar-hit"
          x=${t.x}
          y=${t.y-8}
          width=${o}
          height=${r+16}
          fill="transparent"
          @click=${c}
        />`:""}
  `}(e,t,o);case"ring":return function(e,t){const i=(t.state??"").toLowerCase(),o=!t.dark&&"off"!==i&&"0"!==i&&"false"!==i;return B`
    <circle
      class="ring ${o?"lit":""}"
      cx=${e.x}
      cy=${e.y}
      r=${e.r??100}
      fill="none"
      stroke=${o?e.on??"#3aa0ff":e.off??"#1b2026"}
      stroke-width=${e.stroke??6}
    />
  `}(t,o);case"odometer":return function(e,t){const i=e.digits??5,o=e.redDigits??1,r=e.scale??1,a=(e.w??140)/i,s=e.h??34,n=t.dark||void 0===t.value?"-".repeat(i):String(Math.floor(Math.abs(t.value)/r)).slice(-i).padStart(i,"0");return B`
    <g class="odometer ${t.dark?"dark":""}">
      ${[...n].map((t,r)=>{const n=r>=i-o;return B`
          <rect
            class="odo-cell ${n?"odo-red":""}"
            x=${e.x+r*a}
            y=${e.y}
            width=${a-1.5}
            height=${s}
            rx="1.5"
          />
          <text
            class="odo-digit ${n?"odo-red-digit":""}"
            x=${e.x+r*a+(a-1.5)/2}
            y=${e.y+s-8}
            text-anchor="middle"
            font-size=${s-12}
          >${t}</text>
        `})}
    </g>
  `}(t,o);case"needle":return function(e,t){const i=e.r??26,o=e.scale??1,r=t.dark||void 0===t.value?0:Math.abs(t.value)/o%10/10,a=2*r*Math.PI-Math.PI/2,s=e.x+Math.cos(a)*(i-5),n=e.y+Math.sin(a)*(i-5);return B`
    <g class="dial ${t.dark?"dark":""}">
      <circle class="dial-face" cx=${e.x} cy=${e.y} r=${i} />
      ${[...Array(10).keys()].map(t=>{const o=t/10*2*Math.PI-Math.PI/2;return B`<line
          class="dial-tick"
          x1=${e.x+Math.cos(o)*(i-4)}
          y1=${e.y+Math.sin(o)*(i-4)}
          x2=${e.x+Math.cos(o)*i}
          y2=${e.y+Math.sin(o)*i}
        />`})}
      <line class="dial-needle" x1=${e.x} y1=${e.y} x2=${s} y2=${n} />
      <circle class="dial-hub" cx=${e.x} cy=${e.y} r="2.4" />
      ${e.label?B`<text class="dial-label" x=${e.x} y=${e.y+i+13}
                text-anchor="middle">${e.label}</text>`:""}
    </g>
  `}(t,o);case"fader":return function(e,t,i){const o=t.w??44,r=t.h??200,a=t.max??100,s=t.min??0,n=a-s||1,l=t.x+o/2,d=i.dark||void 0===i.value?0:Math.max(0,Math.min(1,(i.value-s)/n)),c=16,h=r-c,p=t.y+h*(1-d),f=i=>{const o=i.currentTarget.getBoundingClientRect();if(!o.height)return;const r=Math.min(1,Math.max(0,1-(i.clientY-o.top)/o.height));e.onAction(t,s+r*n)},u=t.ticks??5;return B`
    <g class="fader ${i.dark?"dark":""}">
      ${[...Array(u).keys()].map(e=>{const i=t.y+c/2+h*e/(u-1||1);return B`<line class="fader-tick"
          x1=${t.x+4} y1=${i} x2=${t.x+o-4} y2=${i} />`})}
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
      ${"set_level"===t.action?B`<rect class="fader-hit" x=${t.x} y=${t.y}
            width=${o} height=${r} fill="transparent" @click=${f} />`:""}
    </g>
  `}(e,t,o);case"button":return function(e,t,i){const o=t.w??44,r=t.h??26,a=void 0!==i&&!i.dark&&xo(i),s=a&&t.src_on||t.src,n=Boolean(t.src||t.src_on||t.icon),l=!s,d=[t.size?`font-size:${t.size}px`:"",t.color?`fill:${t.color}`:""].filter(Boolean).join(";");return B`
    <g class="button ${a?"lit":""} ${n?"art":""}"
       @click=${e.onPress?void 0:()=>e.onAction(t)}
       @pointerdown=${e.onPress?i=>{i.preventDefault(),e.onPress(t,!0)}:void 0}
       @pointerup=${e.onPress?()=>e.onPress(t,!1):void 0}
       @pointercancel=${e.onPress?()=>e.onPress(t,!1):void 0}
       @pointerleave=${e.onPress?()=>e.onPress(t,!1):void 0}
       role="button" tabindex="0">
      ${l?B`<rect
            x=${t.x}
            y=${t.y}
            width=${o}
            height=${r}
            rx=${t.radius??4}
          />`:""}
      ${s?B`<image
            href=${s}
            x=${t.x}
            y=${t.y}
            width=${o}
            height=${r}
            preserveAspectRatio="none"
          />`:""}
      ${t.icon?B`<image
            href=${t.icon}
            x=${t.x+.2*o}
            y=${t.y+.15*r}
            width=${.6*o}
            height=${.6*r}
            preserveAspectRatio="xMidYMid meet"
          />`:""}
      <text
        x=${t.x+o/2}
        y=${t.icon?t.y+.9*r:t.y+r/2+(t.size??12)/3}
        text-anchor="middle"
        style=${d}
      >${function(e,t){if(t.label_role&&e.bindings[t.label_role]){const i=ao(e.hass,e.bindings,t.label_role);if(!i.dark&&i.state)return i.state}return t.text??""}(e,t)}</text>
    </g>
  `}(e,t,o);case"plate":return function(e){return B`
    ${e.fill||e.border||!e.src?B`<rect
          class="plate"
          x=${e.x}
          y=${e.y}
          width=${e.w??0}
          height=${e.h??0}
          rx=${e.radius??0}
          fill=${e.fill??"none"}
          stroke=${e.border??"none"}
        />`:""}
    ${e.src?B`<image
          href=${e.src}
          x=${e.x}
          y=${e.y}
          width=${e.w??0}
          height=${e.h??0}
          preserveAspectRatio="xMidYMid meet"
        />`:""}
    ${e.text?B`<text
          class="plate-label"
          x=${e.x+(e.w??0)/2}
          y=${e.y+(e.size??16)}
          font-size=${e.size??16}
          text-anchor="middle"
          fill=${e.color??"currentColor"}
        >${e.text}</text>`:""}
  `}(t)}}(e,t))}
    </svg>
  `}const mo=new Set(["hvac_action"]);function xo(e){const t=e.state?.trim()??"",i=""===t?NaN:Number(t);return!e.dark&&void 0!==e.state&&(Number.isFinite(i)?0!==i:!["off","false","normal","ok"].includes(t.toLowerCase()))}const yo="bms-meter-card";class $o extends le{constructor(){super(),this._page=""}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e;const t=Ui(yo,e.faceplate);this._page=e.page??t.pages?.[0]??""}getCardSize(){return 4}static getConfigElement(){return document.createElement(`${yo}-editor`)}static getStubConfig(){return{type:`custom:${yo}`,faceplate:"schneider-pm2200"}}_onAction(e){const t=Ui(yo,this._config?.faceplate).pages??[];if(!t.length)return;if("page"===e.action&&e.target)return void(this._page=e.target);const i=t.indexOf(this._page),o="prev_page"===e.action?-1:1;this._page=t[(i+o+t.length)%t.length]}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:o}=po(this.hass,this._config,Ui(yo,this._config.faceplate),this._config.device?Yi(this.hass,this._config.device):[],e=>[...new Set(e.flatMap(e=>Ki[e]??[e]))]),r=i.filter(e=>!t[e]),a=i.length-r.length,s=0===a&&!1!==this._config.hide_unbound,n=lo(this.hass,this._config);return H`
      <ha-card>
        ${n?H`<div class="title">${n}</div>`:q}
        ${o&&a>0?H`<div class="hint muted">${fo(o)}</div>`:q}
        ${s?H`<div class="hint">
              Nothing bound. Set a device, or map roles such as
              <code>volts_l1</code> and <code>energy_total</code>.
            </div>`:H`<div class="frame">
          ${go({hass:this.hass,faceplate:e,bindings:t,page:this._page,onAction:e=>this._onAction(e)})}
        </div>`}
        ${r.length===i.length?H`<div class="hint">
              No entities bound. Set them in the card editor, or point the card
              at a device.
            </div>`:q}
      </ha-card>
    `}}$o.properties={hass:{attribute:!1},_config:{state:!0},_page:{state:!0}},$o.styles=a`
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
  `,customElements.define(yo,$o),Wi(yo,{expandRoles:e=>[...new Set(e.flatMap(e=>Ki[e]??[e]))]}),window.customCards??=[],window.customCards.push({type:yo,name:"BMS Meter Card",description:"A power meter that looks like a power meter.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const _o=3e5;const wo="hvac-controller-card",bo=["off","cool","heat","dry","fan_only","auto"],vo=e=>e.charAt(0).toUpperCase()+e.slice(1).replace(/_/g," ");class ko extends le{constructor(){super(),this._told="",this._bindings={},this._page=""}disconnectedCallback(){super.disconnectedCallback(),void 0!==this._tick&&window.clearInterval(this._tick),this._tick=void 0}async _send(e,t,i,o,r){const a={label:e,target:t,settings:i,want:o,at:Date.now()};this._change=a,this._told="",void 0===this._tick&&(this._tick=window.setInterval(()=>this.requestUpdate(),1e3));try{await r(),a.sent=!0}catch(e){a.refused=e?.message??String(e)}this.requestUpdate()}_assessment(){const e=this._change,t=this._config?.climate;if(!e||!t||!this.hass)return;const i=function(e,t,i){const o=`${e.label} → ${e.target}`;if(void 0!==e.refused)return{phase:"failed",text:`${o} was not sent: ${e.refused}`};if(!e.sent)return{phase:"sending",text:`Sending ${o}…`};if(!t)return{phase:"failed",text:`${o}: the unit is not reporting.`};const r=t.attributes??{},a=t=>!!t&&e.settings.includes(t),s=r.last_change,n=s?.at?Date.parse(s.at):NaN,l=!!s&&a(s.setting)&&Number.isFinite(n)&&n>=e.at-2e3;if(l&&"refused"===s.result)return{phase:"failed",text:`${o} was refused${s.reason?`: ${s.reason}`:"."}`};if(l&&"not_confirmed"===s.result)return{phase:"failed",text:`${o} was sent but not confirmed: the unit still reports ${d=s.reported,null==d||""===d?"nothing":String(d).replace(/_/g," ")}.`};var d;const c=(r.pending_changes??[]).filter(e=>a(e.setting));return c.some(e=>"held"===e.state)?{phase:"held",text:`${o} queued: the unit takes one change a minute per setting, so it goes in a moment.`}:c.length?{phase:"waiting",text:`${o} sent; waiting for the unit to confirm…`}:e.want(t)?{phase:"confirmed",text:`${o} confirmed by the unit.`}:i-e.at>_o?{phase:"failed",text:`${o} was sent but the unit has not confirmed it after ${Math.round(5)} minutes.`}:{phase:"waiting",text:`${o} sent; waiting for the unit to confirm…`}}(e,this.hass.states[t],Date.now());if(("confirmed"===i.phase||"failed"===i.phase)&&this._told!==i.phase){this._told=i.phase;const t=lo(this.hass,this._config)??"AC";this._notify(`${t}: ${i.text}`),void 0!==this._tick&&window.clearInterval(this._tick),this._tick=void 0,"confirmed"===i.phase&&window.setTimeout(()=>{this._change===e&&(this._change=void 0)},15e3)}return i}_status(){const e=this._assessment();if(!e)return q;const t={sending:"mdi:send-clock",held:"mdi:timer-sand",waiting:"mdi:progress-clock",confirmed:"mdi:check-circle",failed:"mdi:alert-circle"}[e.phase];return H`<div class="change ${e.phase}" role="status" aria-live="polite">
      <ha-icon icon=${t}></ha-icon>
      <span>${e.text}</span>
      ${"failed"===e.phase?H`<button class="dismiss" title="Dismiss"
                 @click=${()=>{this._change=void 0}}>✕</button>`:q}
    </div>`}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e;const t=Ui(wo,e.faceplate);this._page=e.page??t.pages?.[0]??""}getCardSize(){return 5}static getConfigElement(){return document.createElement(`${wo}-editor`)}static getStubConfig(){return{type:`custom:${wo}`,faceplate:"daikin-brc1e63"}}_setpoint(){if(!this.hass||!this._config)return;if(this._config.climate)return so(this.hass,this._config.climate,"setpoint").value;const e=this._config.entities?.setpoint;return e?Number(this.hass.states[e]?.state):void 0}async _onAction(e){if(!this.hass||!this._config)return;const t=this._config.climate;if("page"===e.action||"next_page"===e.action||"prev_page"===e.action){const t=Ui(wo,this._config.faceplate).pages??[];if(!t.length)return;if("page"===e.action&&e.target)return void(this._page=e.target);const i=t.indexOf(this._page),o="prev_page"===e.action?-1:1;return void(this._page=t[(i+o+t.length)%t.length])}if("filter_reset"===e.action){const e=this._bindings.filter_reset;if(!e)return void this._notify("No filter-reset button on this unit. The bridge only offers one where writing is enabled.");const t=this._bindings.filter,i=t?"on"===this.hass.states[t]?.state:void 0;return!1===i?void this._notify("No filter sign on this unit — nothing to clear."):(await this.hass.callService("button","press",{entity_id:e}),void this._notify(i?"Filter sign cleared.":"Filter reset sent."))}if(!t)return void this._notify("This controller is read-only — no climate entity is set.");const i=this._setpoint();switch(e.action){case"temp_up":case"temp_down":{if(void 0===i)return;const o="temp_up"===e.action?.5:-.5,r=Math.round(2*(i+o))/2;return void await this._send("Setpoint",`${r}°`,["temperature"],e=>Number(e.attributes.temperature)===r,()=>this.hass.callService("climate","set_temperature",{entity_id:t,temperature:r}))}case"power_toggle":{const e="off"!==this.hass.states[t]?.state;return void await this._send("Power",e?"Off":"On",["power"],t=>"off"===t.state===e,()=>this.hass.callService("climate",e?"turn_off":"turn_on",{entity_id:t}))}case"fan_cycle":{const e=this.hass.states[t]?.attributes.fan_modes??[];if(!e.length)return;const i=this.hass.states[t]?.attributes.fan_mode,o=e[(e.indexOf(i)+1)%e.length];return void await this._setFan(t,o)}case"mode_cycle":{const e=this.hass.states[t]?.attributes.hvac_modes??bo,i=this.hass.states[t]?.state??e[0],o=e[(e.indexOf(i)+1)%e.length];return void await this._setMode(t,o)}default:return}}_setMode(e,t){const i="auto"===t?e=>["auto","cool","heat","heat_cool"].includes(e.state):e=>e.state===t;return this._send("Mode",vo(t),"off"===t?["power"]:["hvac_mode","power"],i,()=>this.hass.callService("climate","set_hvac_mode",{entity_id:e,hvac_mode:t}))}_setFan(e,t){return this._send("Fan",vo(t),["fan_mode"],e=>e.attributes.fan_mode===t,()=>this.hass.callService("climate","set_fan_mode",{entity_id:e,fan_mode:t}))}_selects(){const e=this._config?.climate;if(!this.hass||!e)return q;const t=this.hass.states[e];if(!t)return q;const i=[],o=(e,t,o,r)=>{t.length&&i.push(H`
        <label>
          <span>${e}</span>
          <select
            .value=${o??""}
            @change=${e=>{const t=e.target.value;t&&t!==o&&r(t)}}
          >
            ${t.map(e=>H`<option
                value=${e}
                ?selected=${e===o}
              >${e}</option>`)}
          </select>
        </label>
      `)};return o("Mode",t.attributes.hvac_modes??[],t.state,t=>{this._setMode(e,t)}),o("Fan",t.attributes.fan_modes??[],t.attributes.fan_mode,t=>{this._setFan(e,t)}),i.length?H`<div class="picks">${i}</div>`:q}_spec(){const e=this._config?.climate,t=e?this.hass?.states[e]?.attributes:void 0;if(!t?.model)return q;const i=(e,t)=>"number"==typeof e?H`<span>${t} <b>${e.toFixed(1)} kW</b></span>`:q;return H`<div class="spec">
      <span class="model">${t.model}</span>
      ${i(t.rated_cooling_kw,"Cool")}
      ${i(t.rated_heating_kw,"Heat")}
    </div>`}_notify(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e},bubbles:!0,composed:!0}))}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:o}=po(this.hass,this._config.climate?{...this._config,hide_unbound:!1}:this._config,Ui(wo,this._config.faceplate),this._config.device?Yi(this.hass,this._config.device):[]);this._bindings=t;const r=this._config.climate?i.length:i.filter(e=>t[e]).length,a=0===r&&!1!==this._config.hide_unbound,s=lo(this.hass,this._config);return H`
      <ha-card>
        ${s?H`<div class="title">${s}</div>`:q}
        ${this._spec()}
        ${this._status()}
        ${this._config.climate||this._config.entities?q:H`<div class="hint">
              Nothing bound yet. Choose a climate entity in the editor, or map
              entities per role in YAML.
            </div>`}
        ${o&&r>0?H`<div class="hint muted">${fo(o)}</div>`:q}
        ${a?q:H`<div class="frame">
          ${go({hass:this.hass,climate:this._config.climate,faceplate:e,bindings:t,page:this._page,onAction:e=>{this._onAction(e)}})}
        </div>
        ${this._selects()}`}
      </ha-card>
    `}}ko.properties={hass:{attribute:!1},_config:{state:!0},_page:{state:!0},_change:{state:!0}},ko.styles=a`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    /* Mode and fan sit under the drawn panel: SVG has no select, and a
       native one is what works with a thumb on a phone. */
    .picks {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      flex-wrap: wrap;
    }
    .picks label {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1 1 140px;
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--secondary-text-color);
    }
    .picks select {
      flex: 1;
      min-width: 0;
      padding: 7px 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #444);
      background: var(--card-background-color, #1b2027);
      color: var(--primary-text-color, #e8edf3);
      font: inherit;
      font-size: 13px;
    }
    .title {
      font-weight: 600;
      font-size: 24px;
      line-height: 1.25;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 3px solid var(--primary-color);
    }
    .spec {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 24px;
      margin: -2px 0 12px;
      padding: 0 10px;
      font-size: 24px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .spec .model {
      font-family: var(--code-font-family, monospace);
      color: var(--primary-text-color);
    }
    .spec b { color: var(--primary-text-color); font-weight: 600; }
    .change {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 10px;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 16px;
      line-height: 1.3;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      border-left: 4px solid var(--info-color, #039be5);
    }
    .change ha-icon { flex: none; --mdc-icon-size: 22px; }
    .change span { flex: 1; }
    .change.sending ha-icon, .change.waiting ha-icon, .change.held ha-icon {
      color: var(--info-color, #039be5);
    }
    .change.confirmed { border-left-color: var(--success-color, #43a047); }
    .change.confirmed ha-icon { color: var(--success-color, #43a047); }
    .change.failed { border-left-color: var(--error-color, #db4437); }
    .change.failed ha-icon { color: var(--error-color, #db4437); }
    .change .dismiss {
      border: 0; background: none; cursor: pointer; font: inherit;
      color: var(--secondary-text-color); padding: 0 4px;
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      /* Grow with the card, as tall as the screen allows and no taller.
         A fixed 520px cap was right for a card a quarter of the page wide;
         in a room grid spanning the page it stopped the panel growing and
         left it small and centred in a wide card. The allowance is the
         top bar, the title and the mode and fan row. */
      max-height: calc(100vh - 170px);
      min-height: 0;
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
  `,customElements.define(wo,ko),Wi(wo),window.customCards??=[],window.customCards.push({type:wo,name:"HVAC Controller Card",description:"A wall controller that looks and behaves like the real one.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const zo="ac-history-card",Ao="ac-history-card:choice",Mo=[[/_room_temperature(_\d+)?$/,"Room temp"],[/^sensor\..*_setpoint(_\d+)?$/,"Setpoint"],[/_mode(_\d+)?$/,"Mode"],[/_running(_\d+)?$/,"On / off"],[/_compressor(_\d+)?$/,"Compressor"],[/_thermostat(_\d+)?$/,"Thermo on"],[/_indoor_fan(_\d+)?$/,"Indoor fan"],[/_fan_speed(_\d+)?$/,"Fan speed"],[/_air_direction(_\d+)?$/,"Air direction"],[/_heater(_\d+)?$/,"Heater"],[/_energy_saving(_\d+)?$/,"Energy saving"],[/_forced_thermostat_off(_\d+)?$/,"Forced thermo off"],[/_alarm(_\d+)?$/,"Alarm"],[/_(malfunction|fault)_code(_\d+)?$/,"Fault code"],[/_communication(_\d+)?$/,"Comms fault"],[/_filter(_\d+)?$/,"Filter sign"],[/_accumulated_power(_\d+)?$/,"Power used"],[/_accumulated_gas(_\d+)?$/,"Gas used"]],Co=["Room temp","Setpoint","Mode","On / off","Compressor"],So=[6,24,72,168],Eo=/^(button|event|switch|climate|update)\./;function No(e,t){const i=e.entities?.[t]?.device_id;if(!i)return[];const o=[],r=[];for(const t of Object.values(e.entities??{})){if(t.device_id!==i||t.hidden)continue;const a=t.entity_id;if(Eo.test(a)||!e.states[a])continue;const s=Mo.findIndex(([e])=>e.test(a));if(s>=0)o.push({entity:a,label:Mo[s][1],rank:s});else{const t=String(e.states[a].attributes.friendly_name??a);r.push({entity:a,label:t})}}return o.sort((e,t)=>e.rank-t.rank),r.sort((e,t)=>e.label.localeCompare(t.label)),[...o.map(({entity:e,label:t})=>({entity:e,label:t})),...r]}function Oo(e){try{window.localStorage.setItem(Ao,JSON.stringify(e))}catch{}}class Po extends le{constructor(){super(),this._graphKey="",this._open=!1;const e=function(){try{const e=window.localStorage.getItem(Ao),t=e?JSON.parse(e):null;if(t&&Array.isArray(t.labels))return t}catch{}return null}();this._labels=e?.labels??Co,this._hours=e?.hours??24}set hass(e){const t=!this._hass;this._hass=e,this._graph&&(this._graph.hass=e),t&&this.requestUpdate()}get hass(){return this._hass}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e,e.hours&&(this._hours=e.hours),this._open=Boolean(e.open)}getCardSize(){return this._open?6:1}static getStubConfig(){return{type:`custom:${zo}`}}_readings(){return this._hass&&this._config?.climate?No(this._hass,this._config.climate):[]}_toggle(e){this._labels=this._labels.includes(e)?this._labels.filter(t=>t!==e):[...this._labels,e],Oo({labels:this._labels,hours:this._hours})}_setHours(e){this._hours=e,Oo({labels:this._labels,hours:e})}async _drawGraph(e){const t=this.renderRoot.querySelector(".graph");if(!t)return;const i=e.filter(e=>this._labels.includes(e.label)),o=`${this._hours}|${i.map(e=>e.entity).join(",")}`;if(o===this._graphKey&&this._graph?.isConnected)return;if(this._graphKey=o,t.replaceChildren(),this._graph=void 0,!i.length)return;const r=await window.loadCardHelpers();if(o!==this._graphKey)return;const a=r.createCardElement({type:"history-graph",hours_to_show:this._hours,entities:i.map(e=>({entity:e.entity,name:e.label}))});a.hass=this._hass,t.replaceChildren(a),this._graph=a}updated(){this._open?this._drawGraph(this._readings()):(this._graph=void 0,this._graphKey="")}render(){if(!this._config)return q;if(!this._config.climate)return H`<ha-card><div class="note">ac-history-card needs
        <code>climate</code>.</div></ha-card>`;const e=this._readings();return H`<ha-card>
      <button class="head" @click=${()=>{this._open=!this._open}}
              aria-expanded=${this._open?"true":"false"}>
        <ha-icon icon="mdi:chart-timeline-variant"></ha-icon>
        <span>History</span>
        <ha-icon class="chev"
                 icon=${this._open?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
      </button>
      ${this._open?H`
        <div class="chips">
          ${e.map(e=>H`
            <button class="chip ${this._labels.includes(e.label)?"on":""}"
                    @click=${()=>this._toggle(e.label)}>${e.label}</button>`)}
        </div>
        <div class="chips ranges">
          ${So.map(e=>H`
            <button class="chip ${this._hours===e?"on":""}"
                    @click=${()=>this._setHours(e)}>
              ${e<48?`${e} h`:e/24+" days"}</button>`)}
        </div>
        ${e.some(e=>this._labels.includes(e.label))?q:H`<div class="note">Tap a reading above to plot it.</div>`}
        <div class="graph"></div>`:q}
    </ha-card>`}}Po.properties={_config:{state:!0},_open:{state:!0},_labels:{state:!0},_hours:{state:!0}},Po.styles=a`
    ha-card { overflow: hidden; }
    .head {
      display: flex; align-items: center; gap: 8px; width: 100%;
      padding: 10px 14px; border: 0; background: none; cursor: pointer;
      color: var(--primary-text-color); font: inherit; font-weight: 500;
    }
    .head .chev { margin-left: auto; }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 12px 8px; }
    .chip {
      border: 1px solid var(--divider-color); border-radius: 16px;
      padding: 4px 10px; background: none; cursor: pointer; font: inherit;
      font-size: 0.85em; color: var(--primary-text-color);
    }
    .chip.on {
      background: var(--primary-color); border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .ranges .chip { font-size: 0.8em; }
    .note { padding: 4px 14px 12px; color: var(--secondary-text-color); }
    .graph > * { --ha-card-box-shadow: none; --ha-card-border-width: 0; }
  `,customElements.get(zo)||(customElements.define(zo,Po),window.customCards??=[],window.customCards.push({type:zo,name:"AC History",description:"History of one AC unit, with the readings to plot picked by tapping."}));const To="ac-mapping-card";function Ro(e,t){const i=new Map,o=e.entities?.[t]?.device_id;if(!o)return i;for(const t of Object.values(e.entities??{})){if(t.device_id!==o)continue;const r=e.states[t.entity_id],a=r?.attributes.bacnet_object;"string"==typeof a&&i.set(a,{...r,entity_id:t.entity_id})}return i}class Lo extends le{constructor(){super(),this._open=!1}set hass(e){this._hass=e,!this._open&&this.hasUpdated||this.requestUpdate()}get hass(){return this._hass}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e,this._open=Boolean(e.open)}getCardSize(){return this._open?10:1}static getStubConfig(){return{type:`custom:${To}`}}_identity(e,t){const i=this._hass,o=i.entities?.[e],r=o?.device_id?i.devices?.[o.device_id]:void 0,a=o?.area_id??r?.area_id,s=a?i.areas?.[a]?.name??a:void 0,n=[t.gateway,void 0!==t.gateway_device_instance?`device ${t.gateway_device_instance}`:"",t.gateway_host].filter(Boolean).join(" · "),l=[["Name in Home Assistant",r?.name_by_user??r?.name],["Area",s],["Gateway",n],["DIII-NET address",t.diii_address],["AC number",t.ac_number],["Tag",t.tag],["Model",t.model],["System · outdoor unit",[t.system,t.outdoor].filter(Boolean).join(" · ")],["Climate entity",e]];return H`<table class="id">
      ${l.filter(([,e])=>null!=e&&""!==e).map(([e,t])=>H`<tr><th>${e}</th><td>${t}</td></tr>`)}
    </table>`}_objects(e,t){const i=Ro(this._hass,e);return H`<table class="objects">
      <thead><tr><th>Point</th><th>Object</th><th>Type, instance</th><th>Value</th></tr></thead>
      <tbody>
        ${t.map(e=>H`<tr class=${e.kind}>
          <td>${e.point}${"status"!==e.kind?H` <span class="tag">${e.kind}</span>`:q}</td>
          <td class="mono">${e.object}</td>
          <td class="mono">${e.type},${e.instance}</td>
          <td>${((e,t)=>{const o=i.get(e);if(o){const e=o.attributes.unit_of_measurement;return H`<span title=${o.entity_id}>${o.state}${e?` ${e}`:""}</span>`}return H`<span class="muted">${"status"===t?"not shown":"—"}</span>`})(e.object,e.kind)}</td>
        </tr>`)}
      </tbody>
    </table>
    <div class="note">Commands are what Home Assistant writes to; a status
      is what the unit reports. "Not shown": an entity Home Assistant has
      switched off. Hover a value for its entity.</div>`}render(){if(!this._config)return q;const e=this._config.climate;if(!e)return H`<ha-card><div class="note">ac-mapping-card needs
        <code>climate</code>.</div></ha-card>`;const t=this._hass?.states[e],i=t?.attributes??{},o=i.bacnet_objects??[];return H`<ha-card>
      <button class="head" @click=${()=>{this._open=!this._open}}
              aria-expanded=${this._open?"true":"false"}>
        <ha-icon icon="mdi:lan"></ha-icon>
        <span>BACnet mapping</span>
        <span class="addr">${i.diii_address??""}</span>
        <ha-icon class="chev"
                 icon=${this._open?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
      </button>
      ${this._open?H`<div class="body">
            ${t?this._identity(e,i):H`<div class="note">
              ${e} is not in Home Assistant.</div>`}
            ${o.length?this._objects(e,o):t?H`<div class="note">This entity does not list its
                BACnet objects.</div>`:q}
          </div>`:q}
    </ha-card>`}}Lo.properties={_config:{state:!0},_open:{state:!0}},Lo.styles=a`
    ha-card { overflow: hidden; }
    .head {
      display: flex; align-items: center; gap: 8px; width: 100%;
      padding: 10px 14px; border: 0; background: none; cursor: pointer;
      color: var(--primary-text-color); font: inherit; font-weight: 500;
    }
    .head .addr { color: var(--secondary-text-color); font-weight: 400; }
    .head .chev { margin-left: auto; }
    .body { padding: 0 12px 12px; overflow-x: auto; }
    table { border-collapse: collapse; width: 100%; font-size: 0.9em; }
    th, td { text-align: left; padding: 4px 8px 4px 0; vertical-align: top; }
    .id th { color: var(--secondary-text-color); font-weight: 400; white-space: nowrap; width: 1%; }
    .objects { margin-top: 10px; }
    .objects thead th {
      color: var(--secondary-text-color); font-weight: 500;
      border-bottom: 1px solid var(--divider-color);
    }
    .objects tbody tr + tr td { border-top: 1px solid var(--divider-color); }
    .objects tr.command td, .objects tr.reset td { background: rgba(3, 155, 229, 0.06); }
    .mono { font-family: var(--code-font-family, monospace); white-space: nowrap; }
    .tag {
      font-size: 0.75em; padding: 0 5px; border-radius: 8px;
      background: var(--info-color, #039be5); color: #fff;
    }
    .muted { color: var(--secondary-text-color); }
    .note { padding: 8px 2px 0; color: var(--secondary-text-color); font-size: 0.85em; }
  `,customElements.get(To)||(customElements.define(To,Lo),window.customCards??=[],window.customCards.push({type:To,name:"AC BACnet Mapping",description:"Where one AC unit lives on its gateway: address, tag and every BACnet object."}));const Io="pump-system-card";class Uo extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 5}static getConfigElement(){return document.createElement(`${Io}-editor`)}static getStubConfig(){return{type:`custom:${Io}`,faceplate:"vertical-pumpset",options:{pumps:3}}}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:o}=po(this.hass,this._config,Ui(Io,this._config.faceplate),this._config.device?Yi(this.hass,this._config.device):[]),r=e,a=i.filter(e=>t[e]).length,s=0===a&&!1!==this._config.hide_unbound,n=lo(this.hass,this._config);return H`
      <ha-card>
        ${n?H`<div class="title">${n}</div>`:q}
        ${s?q:H`<div class="frame">
          ${go({hass:this.hass,faceplate:r,bindings:t,page:"",onAction:()=>{}})}
        </div>`}
        ${o&&a>0?H`<div class="hint muted">${fo(o)}</div>`:q}
        ${0===a?H`<div class="hint">
              Nothing bound. Map <code>pump1_run</code>,
              <code>system_pressure</code> and the rest in YAML, or point the
              card at a device typed as a pump set.
            </div>`:q}
      </ha-card>
    `}}Uo.properties={hass:{attribute:!1},_config:{state:!0}},Uo.styles=a`
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
  `,customElements.define(Io,Uo),Wi(Io),window.customCards??=[],window.customCards.push({type:Io,name:"Pump System Card",description:"A booster set from one pump to ten, drawn to suit.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const jo="audio-zone-card";class Do extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 4}static getConfigElement(){return document.createElement(`${jo}-editor`)}static getStubConfig(){return{type:`custom:${jo}`,faceplate:"qsys-zone-rack",options:{zones:4}}}_notify(e){this._error=e,setTimeout(()=>{this._error=void 0},4e3)}async _onAction(e,t){this.hass&&this._config&&await no(this.hass,this._config.entities,e,e=>this._notify(e),Number(this._config.step??1),t)}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:o}=po(this.hass,this._config,Ui(jo,this._config.faceplate),this._config.device?Yi(this.hass,this._config.device):[]),r=function(e,t,i){return t?{...e,regions:e.regions.map(e=>{const o=/^name(\d+)$/.exec(e.id),r=o?t[`${i}${o[1]}`]:void 0;return r?{...e,text:r}:e})}:e}(e,this._config.labels,e.labelPrefix??"zone"),a=i.filter(e=>t[e]).length,s=0===a&&!1!==this._config.hide_unbound,n=lo(this.hass,this._config);return H`
      <ha-card>
        ${n?H`<div class="title">${n}</div>`:q}
        ${s?q:H`<div class="frame">
          ${go({hass:this.hass,faceplate:r,bindings:t,page:"",onAction:(e,t)=>{this._onAction(e,t)}})}
        </div>`}
        ${this._error?H`<div class="hint">${this._error}</div>`:q}
        ${o&&a>0?H`<div class="hint muted">${fo(o)}</div>`:q}
        ${0===a?H`<div class="hint">
              Nothing bound. Map <code>zone1_volume</code> and
              <code>zone1_mute</code> in YAML, or generate the card from the
              Q-SYS add-on.
            </div>`:q}
      </ha-card>
    `}}Do.properties={hass:{attribute:!1},_config:{state:!0},_error:{state:!0}},Do.styles=a`
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
  `,customElements.define(jo,Do),Wi(jo,{numbers:[{key:"step",label:"Trim step (dB)",min:.5,max:12,step:.5}]}),window.customCards??=[],window.customCards.push({type:jo,name:"Audio Zone Card",description:"Level, mute and trim for one to sixteen audio zones.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const Go="room-controller-card";class Fo extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 4}static getConfigElement(){return document.createElement(`${Go}-editor`)}static getStubConfig(){return{type:`custom:${Go}`,faceplate:"av-room-controller"}}_notify(e){this._error=e,setTimeout(()=>{this._error=void 0},4e3)}async _onAction(e,t){this.hass&&this._config&&await no(this.hass,this._config.entities,e,e=>this._notify(e),Number(this._config.step??1),t)}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:o}=po(this.hass,this._config,Ui(Go,this._config.faceplate),this._config.device?Yi(this.hass,this._config.device):[]),r=e,a=i.filter(e=>t[e]).length,s=0===a&&!1!==this._config.hide_unbound,n=lo(this.hass,this._config);return H`
      <ha-card>
        ${n?H`<div class="title">${n}</div>`:q}
        ${s?q:H`<div class="frame">
          ${go({hass:this.hass,faceplate:r,bindings:t,page:"",onAction:(e,t)=>{this._onAction(e,t)}})}
        </div>`}
        ${this._error?H`<div class="hint">${this._error}</div>`:q}
        ${o&&a>0?H`<div class="hint muted">${fo(o)}</div>`:q}
        ${0===a?H`<div class="hint">
              Nothing bound. Map <code>volume</code>, <code>mute</code>,
              <code>source</code> and <code>display_power</code> in YAML, or
              generate the card from the Crestron add-on.
            </div>`:q}
      </ha-card>
    `}}Fo.properties={hass:{attribute:!1},_config:{state:!0},_error:{state:!0}},Fo.styles=a`
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
  `,customElements.define(Go,Fo),Wi(Go,{numbers:[{key:"step",label:"Trim step",min:.5,max:25,step:.5}]}),window.customCards??=[],window.customCards.push({type:Go,name:"Room Controller Card",description:"One AV room: source, display, volume, mute and status.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const Ho="plant-equipment-card";class Bo extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 5}static getConfigElement(){return document.createElement(`${Ho}-editor`)}static getStubConfig(){return{type:`custom:${Ho}`,faceplate:"supply-fan-top"}}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:o}=po(this.hass,this._config,Ui(Ho,this._config.faceplate),this._config.device?Yi(this.hass,this._config.device):[]),r=e,a=i.filter(e=>t[e]).length,s=0===a&&!1!==this._config.hide_unbound,n=lo(this.hass,this._config);return H`
      <ha-card>
        ${n?H`<div class="title">${n}</div>`:q}
        ${s?q:H`<div class="frame">
          ${go({hass:this.hass,faceplate:r,bindings:t,page:"",onAction:()=>{}})}
        </div>`}
        ${o&&a>0?H`<div class="hint muted">${fo(o)}</div>`:q}
        ${0===a?H`<div class="hint">
              Nothing bound. Map the roles this faceplate names in YAML,
              or point the card at a device with <code>device:</code>.
            </div>`:q}
      </ha-card>
    `}}Bo.properties={hass:{attribute:!1},_config:{state:!0}},Bo.styles=a`
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
  `,customElements.define(Ho,Bo),Wi(Ho),window.customCards??=[],window.customCards.push({type:Ho,name:"Plant Equipment Card",description:"Supply and exhaust fans, hot water units and circulators.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const Wo="fire-panel-card",qo=["fire_alarm","fault","isolate","brigade_signal","power"];class Vo extends le{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 5}static getConfigElement(){return document.createElement(`${Wo}-editor`)}static getStubConfig(){return{type:`custom:${Wo}`,faceplate:"generic-fip",options:{zones:8}}}render(){if(!this._config||!this.hass)return q;const{faceplate:e,bindings:t,roles:i,hidden:o}=po(this.hass,this._config,Ui(Wo,this._config.faceplate),this._config.device?Yi(this.hass,this._config.device):[]),r=e,a=i.filter(e=>t[e]).length,s=qo.filter(e=>!t[e]),n=0===a&&!1!==this._config.hide_unbound,l=lo(this.hass,this._config);return H`
      <ha-card>
        ${l?H`<div class="title">${l}</div>`:q}
        <div class="banner">BMS MONITORING — NOT THE FIRE PANEL</div>
        ${s.length?H`<div class="gap">
              Not monitored by the BMS:
              ${s.map(e=>e.replace(/_/g," ").toUpperCase()).join(", ")}
            </div>`:q}
        ${n?q:H`<div class="frame">
          ${go({hass:this.hass,faceplate:r,bindings:t,page:"",onAction:()=>{}})}
        </div>`}
        ${o&&a>0?H`<div class="hint muted">${fo(o)}</div>`:q}
        ${0===a?H`<div class="hint">
              Nothing bound. Map <code>fire_alarm</code>,
              <code>zone1_alarm</code> and the rest, or point the card at a
              device with <code>device:</code>.
            </div>`:q}
      </ha-card>
    `}}Vo.properties={hass:{attribute:!1},_config:{state:!0}},Vo.styles=a`
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
  `,customElements.define(Wo,Vo),Wi(Wo),window.customCards??=[],window.customCards.push({type:Wo,name:"Fire Panel Card",description:"Zone and status mimic. Monitoring only — never the panel.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const Ko="crestron-panel-card",Yo=new Map;function Zo(e,t){return e.obj?{join:e.join,smart_object:e.obj,entry_id:t}:{join:e.join,entry_id:t}}class Qo extends le{constructor(){super(...arguments),this._held=new Map}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e;const t=e.panel_url;t&&t!==this._docUrl&&(this._docUrl=t,this._doc=void 0,function(e){let t=Yo.get(e);return t||(t=fetch(e,{cache:"no-cache"}).then(t=>{if(!t.ok)throw new Error(`${e}: ${t.status}`);return t.json()}),t.catch(()=>Yo.delete(e)),Yo.set(e,t)),t}(t).then(e=>{this._docUrl===t&&(this._doc=e)},e=>this._notify(`Could not load the panel: ${e.message??e}`)))}_entry(){if(this.hass&&this._config?.device)return Qi(this.hass,this._config.device)}_processorScreen(e){if(!this.hass||!this._config?.device||!this._entry())return;const t=Yi(this.hass,this._config.device);let i;for(const[o,r]of Object.entries(e.page_joins??{})){const a=t.find(e=>this.hass.states[e]?.attributes?.join===`d${r}`);if(!a||!e.screens[o])continue;const s=this.hass.states[a],n="on"===s.state?"9999":String(s.attributes.last_on??"");n&&(!i||n>i.at)&&(i={screen:o,at:n})}return i}_screenOf(e){const t=this._processorScreen(e),i=this._picked&&e.screens[this._picked.screen]?this._picked:void 0;if(t&&(!i||t.at>i.at))return{screen:t.screen,live:!0};if(i)return{screen:i.screen,live:!1};const o=this._config?.default_screen;return{screen:o&&e.screens[o]?o:e.screens[e.default_screen]?e.default_screen:Object.keys(e.screens)[0],live:!1}}async _onPress(e,t){if(!this.hass||!this._config)return;const i=this._entry(),o=oo(io(e.role)??""),r=e.target&&this._config.entities?.[e.target];if(!i||r||"d"!==o?.bus)return void(t&&await this._onAction(e));const a=Zo(o,i);if(t){if(this._held.has(e.id))return;const t=this.hass.callService("crestron_cip","set_digital",{...a,value:!0});return void this._held.set(e.id,{sent:t,at:Date.now()})}const s=this._held.get(e.id);if(!s)return;this._held.delete(e.id),await s.sent.catch(()=>{});const n=100-(Date.now()-s.at);n>0&&await new Promise(e=>setTimeout(e,n)),await this.hass.callService("crestron_cip","set_digital",{...a,value:!1})}getCardSize(){return 4}static getConfigElement(){return document.createElement(`${Ko}-editor`)}static getStubConfig(){return{type:`custom:${Ko}`,faceplate:""}}_notify(e){this._error=e,setTimeout(()=>{this._error=void 0},4e3)}_scale(){const e=Number(this._config?.scale??1);return Number.isFinite(e)&&e>0?e:1}_currentPage(e){return e?.length?this._page&&e.includes(this._page)?this._page:e[0]:""}async _onAction(e,t){if(!this.hass||!this._config)return;if("page"===e.action&&e.target)return void(this._page=e.target);const i=this._config.device?Qi(this.hass,this._config.device):void 0,o=e.target&&this._config.entities?.[e.target];if(i&&!o){const o=oo(io(e.role)??"");if("d"===o?.bus)return void await this.hass.callService("crestron_cip","press",Zo(o,i));if("a"===o?.bus&&"set_level"===e.action&&void 0!==t)return void await this.hass.callService("crestron_cip","set_analog",{...Zo(o,i),value:Math.round(Math.min(65535,Math.max(0,t)))})}await no(this.hass,this._config.entities,e,e=>this._notify(e),Number(this._config.step??1),t)}_renderList(e,t,i,o){const[r,a]=t.size,s=(e,t)=>e/t*100+"%",n=[`left:${s(e.x,r)}`,`top:${s(e.y,a)}`,`width:${s(e.w,r)}`,`height:${s(e.h,a)}`,`--gap:${e.spacing/Math.max(1,e.w-2*e.margin)*100}%`,`--pad:${s(e.margin,r)}`,e.background?`background:${e.background}`:""].filter(Boolean).join(";"),[l,d]=e.item_size;return H`<div class="list ${e.orientation}" style=${n}>
      ${e.items.map(r=>H`<div class="item" style=${`aspect-ratio:${l}/${d}`}>
        ${go({hass:this.hass,faceplate:{...t,size:e.item_size,regions:r.regions,pages:void 0,lists:void 0},bindings:i,page:"",onAction:(e,t)=>{this._onAction(e,t)},onPress:o?(e,t)=>{this._onPress(e,t)}:void 0,unreportedIsOff:o})}
      </div>`)}
    </div>`}render(){if(!this._config||!this.hass)return q;const e=lo(this.hass,this._config),t=this._config.panel_url?this._doc:this._config.panel;let i,o=[],r="",a=!1;if(!function(e){return"crestron-panel"===e?.format}(t)?i=t:(({screen:r,live:a}=this._screenOf(t)),i=t.screens[r],o=Object.keys(t.screens)),!i)return H`<ha-card>
        ${e?H`<div class="title">${e}</div>`:q}
        <div class="hint">
          ${this._config.panel_url?"Loading the panel…":"No panel loaded. Import the panel's project with the crestron_cip.import_panel action and set panel_url."}
        </div>
      </ha-card>`;const s=i.lists??[],n=new Set(s.flatMap(e=>e.items.flatMap(e=>e.regions.map(e=>e.id)))),{faceplate:l,bindings:d,roles:c,hidden:h}=po(this.hass,this._config,s.length?{...i,regions:[...i.regions,...s.flatMap(e=>e.items.flatMap(e=>e.regions))]}:i,this._config.device?Yi(this.hass,this._config.device):[]),p=s.length?{...l,regions:l.regions.filter(e=>!n.has(e.id))}:l,f=c.filter(e=>d[e]).length,u=0===f&&!1!==this._config.hide_unbound,g=p.pages,m=this._currentPage(g),x=Boolean(this._entry()),y=function(e,t,i=!1){const o=e.regions.filter(e=>e.visible_role);return!!o.length&&(!!o.every(e=>t[e.visible_role])||i&&o.some(e=>t[e.visible_role])&&o.every(e=>t[e.visible_role]||uo(e.visible_role)))}(p,d,x);return H`
      <ha-card>
        ${e?H`<div class="title">${e}</div>`:q}
        ${o.length>1&&!a?H`<div class="pages screens">
              ${o.map(e=>H`<button
                  class=${e===r?"on":""}
                  @click=${()=>{this._picked={screen:e,at:(new Date).toISOString()}}}
                >
                  ${e}
                </button>`)}
            </div>`:q}
        ${g&&g.length>1&&!u&&!y?H`<div class="pages">
              ${g.map(e=>H`<button
                  class=${e===m?"on":""}
                  @click=${()=>{this._page=e}}
                >
                  ${e}
                </button>`)}
            </div>`:q}
        ${u?q:H`<div class="frame" style=${`--faceplate-scale:${this._scale()}`}>
          <div class="screen">
          ${go({hass:this.hass,faceplate:p,bindings:d,page:m,onAction:(e,t)=>{this._onAction(e,t)},onPress:x?(e,t)=>{this._onPress(e,t)}:void 0,unreportedIsOff:x})}
          ${s.map(e=>this._renderList(e,p,d,x))}
          </div>
        </div>`}
        ${this._error?H`<div class="hint">${this._error}</div>`:q}
        ${h&&f>0?H`<div class="hint muted">${fo(h)}</div>`:q}
        ${0===f?H`<div class="hint">
              Nothing on this panel is bound. Point the card at the
              processor's device with <code>device:</code>.
            </div>`:q}
      </ha-card>
    `}}Qo.properties={hass:{attribute:!1},_config:{state:!0},_error:{state:!0},_page:{state:!0},_doc:{state:!0},_picked:{state:!0}},Qo.styles=a`
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
    .screen {
      position: relative;
      width: 100%;
      max-width: calc(var(--faceplate-width, 100000px) * var(--faceplate-scale, 1));
      margin: 0 auto;
    }
    .list {
      position: absolute;
      display: flex;
      box-sizing: border-box;
      gap: var(--gap, 0);
      padding: var(--pad, 0);
      overflow: auto;
      scrollbar-width: thin;
    }
    .list.horizontal {
      flex-direction: row;
    }
    .list.vertical {
      flex-direction: column;
    }
    .list .item {
      flex: 0 0 auto;
      height: 100%;
    }
    .list.vertical .item {
      width: 100%;
      height: auto;
    }
    .list .item .faceplate {
      width: 100%;
      height: 100%;
      max-width: none;
    }
    /* Held, not clicked: a long press must not scroll the dashboard or
       open the browser's context menu halfway through a volume ramp. */
    .button {
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
      /* Scale down to the column, never up past the drawing's own size:
         a one-channel console stretched across a wide card reads as a
         giant empty frame rather than a small instrument. */
      max-width: calc(var(--faceplate-width, 100000px) * var(--faceplate-scale, 1));
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
    /* An imported panel is usually a pale screen, which is the opposite
       of the dark instrument faces the hand-drawn faceplates emulate.
       Only the dark case was ever styled here, so a white panel drew its
       text in the theme's own colour — light on light, and invisible. */
    .display-positive .lcd-value {
      fill: #11161c;
      font-family: ui-monospace, Menlo, monospace;
      font-weight: 600;
    }
    .display-positive .lcd-label,
    .display-positive .lcd-value.chrome {
      fill: #333b45;
      font-family: inherit;
      letter-spacing: 0.4px;
      font-weight: 500;
    }
    .display-positive .lcd-value.dark {
      fill: #9aa3ad;
    }
    .display-positive .lcd-value.stale {
      fill: #8a6410;
    }
    .display-positive .plate-label {
      fill: #333b45;
    }
    /* A button whose face comes from the project draws its own artwork.
       The chassis fill underneath it is for buttons that have none, and
       on a pale panel it would be a dark block where the real one is a
       light key. The panel's own unlit face lives compiled inside a theme
       SWF and cannot be pulled out, so this is a neutral stand-in. */
    .display-positive .button.art rect {
      fill: rgba(16, 22, 30, 0.05);
      stroke: rgba(16, 22, 30, 0.14);
    }
    .display-positive .button.art text {
      fill: #11161c;
    }
    .display-positive .button:not(.art) rect {
      fill: #e9edf2;
      stroke: #c6ccd4;
    }
    .display-positive .button:not(.art) text {
      fill: #11161c;
    }
    .display-positive .button:hover rect {
      fill: rgba(16, 22, 30, 0.12);
    }
    .display-positive .bar-track {
      fill: rgba(16, 22, 30, 0.10);
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
  `,customElements.define(Ko,Qo),Wi(Ko,{numbers:[{key:"step",label:"Trim step (dB)",min:.5,max:12,step:.5}]}),window.customCards??=[],window.customCards.push({type:Ko,name:"Crestron Panel Card",description:"Your own XPanel project, imported and rendered as a card.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});const Xo="crestron-xpanel-card";let Jo,er=!1;function tr(e){return String(e)}function ir(e){const t=(e??"1280 / 800").split(/[/:]/).map(e=>parseFloat(e)),i=2===t.length?t[0]/t[1]:t[0];return Number.isFinite(i)&&i>0?i:1.6}function or(e){const t=Number(e);return Number.isFinite(t)&&t>0?Math.min(1,Math.max(.1,t)):1}function rr(e,t){return`${"https:"===e.protocol?"wss:":"ws:"}//${e.host}${t}`}function ar(e,t,i,o=!1){const r=e.slice(0,e.lastIndexOf("/")+1);return{url:e,base:r,parameters:{host:t.host,port:String(t.port),ipid:tr(t.ipid),bypasslogindialog:"true",id:"",password:"",enablessl:"false"},socketProxy:[{host:t.host,port:t.port,proxyUrl:i}],autoplay:"on",unmuteOverlay:"hidden",splashScreen:!1,contextMenu:"off",letterbox:"on",warnOnUnsupportedContent:!1,allowScriptAccess:!1,openUrlMode:"deny",logLevel:o?"info":"warn"}}const sr=[1280,800],nr=new Map;function lr(e){const t=e.lastIndexOf("/xpanel/");return t<0?void 0:`${e.slice(0,t)}/panel.json`}async function dr(e){const t=lr(e);if(!t)return{pages:[]};try{const e=await fetch(t,{cache:"no-cache"});if(!e.ok)return{pages:[]};const i=await e.json(),o=[...new Set(Object.values(i.page_joins??{}))].filter(e=>Number.isInteger(e)&&e>0).sort((e,t)=>e-t),[r,a]=i.size??[];return{pages:o,size:r>0&&a>0?[r,a]:void 0}}catch{return{pages:[]}}}function cr(e,t){if(t.device)return{device_id:Zi(e,t.device)};const i={entry_id:t.entry_id};return t.panel&&(i.panel=t.panel),i}async function hr(e,t,i){if(!e.callWS)throw new Error("this frontend cannot send websocket commands");const o=await e.callWS({type:"crestron_cip/xpanel_info",...cr(e,t)}),r=t.xpanel_url||o.xpanel_url;if(!r)throw new Error("This processor has no panel yet: add one under Settings → Devices & services → Crestron CIP → Configure, then pick the room's panel here.");const{pages:a,size:s}=await dr(r);s&&(i.size=s,i.owner?.requestUpdate());const n=new URLSearchParams({key:o.key});a.length&&n.set("pages",a.join(",")),o.panel&&n.set("panel",o.panel);const l=rr(window.location,`${o.relay}?${n}`);t.debug&&function(e){if(er||!e.callWS)return;er=!0;const t=[];let i;const o=()=>{i=void 0;const o=t.splice(0,200);o.length&&e.callWS({type:"crestron_cip/xpanel_log",lines:o}).catch(()=>{})};for(const e of["log","info","warn","error","debug"]){const r=console[e].bind(console);console[e]=(...a)=>{r(...a);const s=a.map(e=>e instanceof Error?`${e.name}: ${e.message}`:"string"==typeof e?e:(()=>{try{return JSON.stringify(e)}catch{return String(e)}})()).join(" ");t.push(`${e}: ${s}`),i??=setTimeout(o,1e3)}}window.addEventListener("error",e=>{t.push(`uncaught: ${e.message} at ${e.filename}:${e.lineno}`),i??=setTimeout(o,1e3)})}(e),await function(e){return window.RufflePlayer?.newest?Promise.resolve():(Jo??=new Promise((t,i)=>{const o=document.createElement("script");o.src=e,o.onload=()=>t(),o.onerror=()=>{Jo=void 0,i(new Error(`could not load Ruffle from ${e}`))},document.head.appendChild(o)}),Jo)}(t.ruffle_url??"/local/ruffle/0.7.1/ruffle.js");const d=window.RufflePlayer.newest().createPlayer(),[c,h]=i.size;Object.assign(d.style,{display:"block",position:"absolute",left:"0",top:"0",width:`${c}px`,height:`${h}px`,transformOrigin:"0 0"}),i.player=d,i.host.replaceChildren(d),await d.ruffle().load(ar(r,o,l,t.debug))}function pr(e,t){const i=`${Object.values(cr(e,t)).join(" ")} ${t.xpanel_url??"configured"}`;let o=nr.get(i);if(!o){const r=function(){const e=document.createElement("div");return e.className="crestron-xpanel-host",Object.assign(e.style,{position:"fixed",left:"-20000px",top:"0",width:"1280px",height:"800px",zIndex:"2",overflow:"hidden",background:"#000"}),document.body.appendChild(e),e}(),a={key:i,host:r,ready:Promise.resolve(),size:sr};a.ready=hr(e,t,a).catch(e=>{throw nr.delete(i),r.remove(),e}),nr.set(i,a),o=a}return o}function fr(e){const t=[],i=e=>{if(Array.isArray(e))e.forEach(i);else if(e&&"object"==typeof e){const o=e;o.type===`custom:${Xo}`&&o.background&&(o.device||o.entry_id)&&t.push(o),Object.values(e).forEach(i)}};return i(e),t}async function ur(e){if(!e.callWS)return 0;let t;try{t=[null,...(await e.callWS({type:"lovelace/dashboards/list"})).map(e=>e.url_path)]}catch{const e=window.location.pathname.split("/")[1];t=[e&&"lovelace"!==e?e:null]}let i=0;for(const o of t){let t;try{t=await e.callWS(o?{type:"lovelace/config",url_path:o}:{type:"lovelace/config"})}catch{continue}for(const o of fr(t))pr(e,o).ready.catch(()=>{}),i+=1}return i}class gr extends le{setConfig(e){if(!e.device&&!e.entry_id)throw new Error("device (or entry_id) is required: the processor the XPanel connects to");this._config=e,this._release()}getCardSize(){return 8}static getStubConfig(e){const t=Object.values(e?.entities??{}).find(e=>"crestron_cip"===e.platform&&e.device_id);return t?.device_id?{device:t.device_id}:{}}static getConfigForm(){return{schema:[{name:"device",required:!0,selector:{device:{filter:{integration:"crestron_cip"}}}},{name:"title",selector:{text:{}}},{name:"scale",selector:{number:{min:.1,max:1,step:.05,mode:"slider"}}},{name:"background",selector:{boolean:{}}},{name:"xpanel_url",selector:{text:{}}}],computeLabel:e=>({device:"Room panel (or processor)",title:"Title",scale:"Scale (of the size that fits the window)",background:"Load in the background when Home Assistant opens",xpanel_url:"Panel URL (leave empty to use the processor's configured panel)"}[e.name]??e.name)}}stageRect(){return this.renderRoot.querySelector(".stage")?.getBoundingClientRect()}headerBottom(){const e=getComputedStyle(this).getPropertyValue("--header-height");return parseFloat(e)||56}disconnectedCallback(){super.disconnectedCallback(),this._release()}updated(e){super.updated(e),!this._session&&this.hass&&this._config&&this.isConnected&&this._attach()}_release(){const e=this._session;this._session=void 0,e?.owner===this&&(e.owner=void 0,function(e){e.host.style.left="-20000px",e.host.style.clipPath=""}(e))}_attach(){const e=pr(this.hass,this._config);this._session=e,e.owner=this,this._error=void 0,function(e){const t=()=>{const i=e.owner;if(!i)return void(e.frame=void 0);const o=i.stageRect(),r=e.host.style;if(o&&o.width>0){r.left=`${o.left}px`,r.top=`${o.top}px`,r.width=`${o.width}px`,r.height=`${o.height}px`,e.player&&(e.player.style.transform=`scale(${o.width/e.size[0]})`);const t=i.headerBottom(),a=Math.max(0,Math.min(o.height,t-o.top));r.clipPath=a>0?`inset(${a}px 0 0 0)`:"",r.visibility="visible"}e.frame=requestAnimationFrame(t)};e.frame??=requestAnimationFrame(t)}(e),e.ready.catch(t=>{this._session===e&&(this._error=t.message)})}render(){if(!this._config)return q;const e=this._session?.size??sr,t=this._config.aspect_ratio?ir(this._config.aspect_ratio):e[0]/e[1],i=this._config.title?140:88,o=!1===this._config.fit_window?"100%":`min(100%, calc((100vh - var(--header-height, 56px) - ${i-56}px) * ${t}))`,r=or(this._config.scale),a=1===r?o:`calc(${o} * ${r})`;return H`
      <ha-card .header=${this._config.title}>
        <div class="stage" style="aspect-ratio: ${t}; width: ${a}"></div>
        ${this._error?H`<div class="error">${this._error}</div>`:q}
      </ha-card>
    `}}gr.properties={hass:{attribute:!1},_config:{state:!0},_error:{state:!0}},gr.styles=a`
    .stage {
      margin: 0 auto;
      background: #000;
      overflow: hidden;
    }
    .error {
      padding: 8px 12px;
      color: var(--error-color);
      font-size: 13px;
    }
  `,customElements.define(Xo,gr),function(){const e=document.querySelector("home-assistant");if(!e)return;let t=0;const i=()=>{e.hass?.callWS&&e.hass.devices?ur(e.hass).catch(()=>{}):++t<120&&setTimeout(i,500)};i()}(),window.customCards??=[],window.customCards.push({type:Xo,name:"Crestron XPanel Card",description:"The panel's own compiled XPanel, running live against its processor.",preview:!1,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});export{fr as backgroundCards,cr as infoTarget,tr as ipidParameter,dr as panelFacts,lr as panelJsonUrl,ar as playerOptions,ir as ratioOf,No as readingsFor,rr as relaySocketUrl,or as scaleOf,ur as startBackgroundPanels,Ro as valuesByObject};
