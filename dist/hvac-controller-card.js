const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:n,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,f=globalThis,x=f.trustedTypes,y=x?x.emptyScript:"",u=f.reactiveElementPolyfillSupport,g=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},m=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:m};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&n(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??m)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[g("elementProperties")]=new Map,k[g("finalized")]=new Map,u?.({ReactiveElement:k}),(f.reactiveElementVersions??=[]).push("2.1.2");const _=globalThis,b=t=>t,v=_.trustedTypes,A=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,z="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+E,C=`<${S}>`,M=document,P=()=>M.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,D="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,G=/-->/g,R=/>/g,O=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),T=/'/g,U=/"/g,H=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=B(1),j=B(2),W=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),F=new WeakMap,q=M.createTreeWalker(M,129);function Z(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=L;for(let e=0;e<i;e++){const i=t[e];let l,n,d=-1,c=0;for(;c<i.length&&(a.lastIndex=c,n=a.exec(i),null!==n);)c=a.lastIndex,a===L?"!--"===n[1]?a=G:void 0!==n[1]?a=R:void 0!==n[2]?(H.test(n[2])&&(r=RegExp("</"+n[2],"g")),a=O):void 0!==n[3]&&(a=O):a===O?">"===n[0]?(a=r??L,d=-1):void 0===n[1]?d=-2:(d=a.lastIndex-n[2].length,l=n[1],a=void 0===n[3]?O:'"'===n[3]?U:T):a===U||a===T?a=O:a===G||a===R?a=L:(a=O,r=void 0);const h=a===O&&t[e+1].startsWith("/>")?" ":"";o+=a===L?i+C:d>=0?(s.push(l),i.slice(0,d)+z+i.slice(d)+E+h):i+E+(-2===d?e:h)}return[Z(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[n,d]=Y(t,e);if(this.el=J.createElement(n,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&l.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(z)){const e=d[o++],i=s.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);l.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?st:"@"===a[1]?rt:et}),s.removeAttribute(t)}else t.startsWith(E)&&(l.push({type:6,index:r}),s.removeAttribute(t));if(H.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=v?v.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),q.nextNode(),l.push({type:2,index:++r});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===S)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)l.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===W)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=N(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);q.currentNode=s;let r=q.nextNode(),o=0,a=0,l=i[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new tt(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new ot(r,this,t)),this._$AV.push(e),l=i[++a]}o!==l?.index&&(r=q.nextNode(),o++)}return q.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),N(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new J(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new tt(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=b(t).nextSibling;b(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}let et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const s=t;let a,l;for(t=r[0],a=0;a<r.length-1;a++)l=Q(this,s[i+a],e,a),l===W&&(l=this._$AH[a]),o||=!N(l)||l!==this._$AH[a],l===K?t=K:t!==K&&(t+=(l??"")+r[a+1]),this._$AH[a]=l}o&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class rt extends et{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??K)===W)return;const i=this._$AH,s=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=_.litHtmlPolyfillSupport;at?.(J,tt),(_.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;class nt extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new tt(e.insertBefore(P(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}nt._$litElement$=!0,nt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:nt});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:nt}),(lt.litElementVersions??=[]).push("4.2.2");const ct={energy_total:/metertotal$|_energy_total$|_kwh_total$/,power_total:/3phase_active_power$|_active_power$|_power_total$/,power_l1:/active_power_p1$/,power_l2:/active_power_p2$/,power_l3:/active_power_p3$/,volts_l1:/phase_1_v$|_l1_n$|_voltage_l1$/,volts_l2:/phase_2_v$|_l2_n$|_voltage_l2$/,volts_l3:/phase_3_v$|_l3_n$|_voltage_l3$/,current_l1:/phase_1_a$|_current_l1$/,current_l2:/phase_2_a$|_current_l2$/,current_l3:/phase_3_a$|_current_l3$/,power_factor:/power_factor$/,frequency:/frequency$/,volume_total:/_cubicmetre$|_volume_total$|_water_total$|watermeter_total$/},ht=new Set(["unavailable","unknown","none",""]),pt={volts_avg:["volts_l1","volts_l2","volts_l3"],current_avg:["current_l1","current_l2","current_l3"]};function ft(t,e){if(!e)return{dark:!0,stale:!1};const i=t.states[e];if(!i)return{entityId:e,dark:!0,stale:!1};const s=String(i.state);if(ht.has(s.toLowerCase()))return{entityId:e,state:s,dark:!0,stale:!0};const r=Number(s);return{entityId:e,state:s,value:Number.isFinite(r)?r:void 0,unit:i.attributes.unit_of_measurement,dark:!1,stale:!1}}function xt(t,e,i){const s=t.states[e];if(!s)return{entityId:e,dark:!0,stale:!1};if(ht.has(String(s.state).toLowerCase()))return{entityId:e,state:s.state,dark:!0,stale:!0};const r=s.attributes,o=(t,i)=>{if(null==t)return{entityId:e,dark:!0,stale:!1};const s=Number(t);return{entityId:e,state:String(t),value:Number.isFinite(s)?s:void 0,unit:i,dark:!1,stale:!1}};switch(i){case"hvac_mode":return o(s.state);case"hvac_action":return o(r.hvac_action??s.state);case"setpoint":return o(r.temperature,"°C");case"room_temp":return o(r.current_temperature,"°C");case"fan_speed":return o(r.fan_mode);case"swing":return o(r.swing_mode);case"power":return o("off"===s.state?"off":"on");case"humidity":return o(r.current_humidity,"%");default:return{entityId:e,dark:!0,stale:!1}}}function yt(t){const[e,i]=t.faceplate.size,s=(r=t.faceplate,o=t.page,r.regions.filter(t=>!t.page||t.page===o));var r,o;return V`
    <svg
      class="faceplate display-${t.faceplate.display??"positive"}"
      viewBox="0 0 ${e} ${i}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label=${t.faceplate.name}
    >
      ${function(t){if("image"===t.render&&t.art){const[e,i]=t.size;return j`<image href=${t.art} x="0" y="0" width=${e} height=${i} />`}return j`${t.artNode??""}`}(t.faceplate)}
      ${s.map(e=>function(t,e){const i=t.climate&&!t.bindings[e.role]?xt(t.hass,t.climate,e.role):function(t,e,i){if(e[i])return ft(t,e[i]);if("clock"===i){const t=new Date;return{state:`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`,dark:!1,stale:!1}}const s=pt[i];if(!s)return{dark:!0,stale:!1};const r=s.map(i=>ft(t,e[i]));if(r.some(t=>t.dark||void 0===t.value))return{dark:!0,stale:r.some(t=>t.stale)};const o=r.reduce((t,e)=>t+(e.value??0),0);return{value:o/r.length,state:String(o/r.length),unit:r[0].unit,dark:!1,stale:!1}}(t.hass,t.bindings,e.role);switch(e.kind){case"text":return function(t,e){const i=t.role?"unit"===t.show?(e.unit??t.text??"").toUpperCase():e.dark&&void 0!==t.placeholder?t.placeholder:function(t,e=1,i){if(t.dark)return"--";if(void 0===t.value)return t.state??"--";const s=t.value.toFixed(e),r=i??t.unit??"";return r?`${s} ${r}`:s}(e,t.decimals??1,t.unit):t.text??"";if(!t.role&&!t.text)return j``;const s=t.align??"start",r=t.x+("end"===s?t.w??0:"middle"===s?(t.w??0)/2:0);return j`
    ${t.label?j`<text class="lcd-label" x=${t.x} y=${t.y-10}>${t.label}</text>`:""}
    <text
      class="lcd-value ${t.role?"":"chrome"} ${t.role&&e.dark?"dark":""} ${e.stale?"stale":""}"
      x=${r}
      y=${t.y+(t.size??22)}
      font-size=${t.size??22}
      text-anchor=${s}
    >${i}</text>
  `}(e,i);case"lamp":return function(t,e){const i=!e.dark&&void 0!==e.state&&!["off","0","false","normal","ok"].includes(e.state.toLowerCase()),s=(t.w??12)/2;return j`
    <circle
      class="lamp ${i?"lit":""}"
      cx=${t.x+s}
      cy=${t.y+s}
      r=${s}
      fill=${i?t.on??"#e34":t.off??"#3a1418"}
    />
    ${t.label?j`<text class="lamp-label" x=${t.x+s} y=${t.y+2*s+12}
              text-anchor="middle">${t.label}</text>`:""}
  `}(e,i);case"bar":return function(t,e){const i=t.w??100,s=t.h??10,r=t.max??100,o=e.dark||void 0===e.value?0:Math.max(0,Math.min(1,e.value/r));return j`
    <rect class="bar-track" x=${t.x} y=${t.y} width=${i} height=${s} rx="2" />
    <rect
      class="bar-fill"
      x=${t.x}
      y=${t.y}
      width=${i*o}
      height=${s}
      rx="2"
    />
  `}(e,i);case"ring":return function(t,e){const i=(e.state??"").toLowerCase(),s=!e.dark&&"off"!==i&&"0"!==i&&"false"!==i;return j`
    <circle
      class="ring ${s?"lit":""}"
      cx=${t.x}
      cy=${t.y}
      r=${t.r??100}
      fill="none"
      stroke=${s?t.on??"#3aa0ff":t.off??"#1b2026"}
      stroke-width=${t.stroke??6}
    />
  `}(e,i);case"odometer":return function(t,e){const i=t.digits??5,s=t.redDigits??1,r=t.scale??1,o=(t.w??140)/i,a=t.h??34,l=e.dark||void 0===e.value?"-".repeat(i):String(Math.floor(Math.abs(e.value)/r)).slice(-i).padStart(i,"0");return j`
    <g class="odometer ${e.dark?"dark":""}">
      ${[...l].map((e,r)=>{const l=r>=i-s;return j`
          <rect
            class="odo-cell ${l?"odo-red":""}"
            x=${t.x+r*o}
            y=${t.y}
            width=${o-1.5}
            height=${a}
            rx="1.5"
          />
          <text
            class="odo-digit ${l?"odo-red-digit":""}"
            x=${t.x+r*o+(o-1.5)/2}
            y=${t.y+a-8}
            text-anchor="middle"
            font-size=${a-12}
          >${e}</text>
        `})}
    </g>
  `}(e,i);case"needle":return function(t,e){const i=t.r??26,s=t.scale??1,r=e.dark||void 0===e.value?0:Math.abs(e.value)/s%10/10,o=2*r*Math.PI-Math.PI/2,a=t.x+Math.cos(o)*(i-5),l=t.y+Math.sin(o)*(i-5);return j`
    <g class="dial ${e.dark?"dark":""}">
      <circle class="dial-face" cx=${t.x} cy=${t.y} r=${i} />
      ${[...Array(10).keys()].map(e=>{const s=e/10*2*Math.PI-Math.PI/2;return j`<line
          class="dial-tick"
          x1=${t.x+Math.cos(s)*(i-4)}
          y1=${t.y+Math.sin(s)*(i-4)}
          x2=${t.x+Math.cos(s)*i}
          y2=${t.y+Math.sin(s)*i}
        />`})}
      <line class="dial-needle" x1=${t.x} y1=${t.y} x2=${a} y2=${l} />
      <circle class="dial-hub" cx=${t.x} cy=${t.y} r="2.4" />
      ${t.label?j`<text class="dial-label" x=${t.x} y=${t.y+i+13}
                text-anchor="middle">${t.label}</text>`:""}
    </g>
  `}(e,i);case"button":return function(t,e){const i=e.w??44,s=e.h??26;return j`
    <g class="button" @click=${()=>t.onAction(e)} role="button" tabindex="0">
      <rect x=${e.x} y=${e.y} width=${i} height=${s} rx="4" />
      <text
        x=${e.x+i/2}
        y=${e.y+s/2+4}
        text-anchor="middle"
      >${e.text??""}</text>
    </g>
  `}(t,e)}}(t,e))}
    </svg>
  `}const ut=400,gt=400,$t=62,mt=84,wt=276,kt=244,_t=[142,188,234,280],bt=352,vt=[112,172,232,292],At=j`
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

  <rect x="0" y="0" width="${ut}" height="${gt}" rx="12" fill="url(#pm-bezel)" />
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
  <rect x="${$t}" y="${mt}" width="${wt}" height="${kt}" fill="url(#pm-lcd)" />

  <!-- Title band -->
  <rect x="${$t}" y="${mt}" width="${wt}" height="24" fill="#6a7482" />
  <rect x="${$t}" y="${mt}" width="26" height="24" fill="#8d97a4" />
  <rect x="${312}" y="${mt}" width="26" height="24" fill="#8d97a4" />

  <!-- Soft-key legend, aligned over the four physical keys -->
  <line x1="${$t}" y1="${302}" x2="${338}" y2="${302}"
        stroke="#9aa392" stroke-width="1" />

  <!-- Keys -->
  ${vt.map(t=>j`
      <circle cx="${t}" cy="${bt}" r="21" fill="url(#pm-key)" />
      <circle cx="${t}" cy="${bt}" r="21" fill="none" stroke="#24282b" stroke-width="1.5" />
    `)}

  <!-- Indicator marks on the right edge -->
  <rect x="358" y="342" width="7" height="7" rx="1" fill="#22262a" />
  <rect x="358" y="356" width="7" height="7" rx="1" fill="#22262a" />
`,zt=76,Et={id:"schneider-pm2200",name:"Schneider EasyLogic PM2200",description:"Square panel-mount analyser: pale LCD with a title band, four labelled rows and a soft-key legend over four push keys.",emulates:"Schneider Electric EasyLogic PM2200",card:"bms-meter-card",render:"svg",display:"positive",size:[ut,gt],artNode:At,pages:["summary","amps","volts","power"],regions:[{id:"s-v",role:"volts_avg",kind:"text",page:"summary",x:zt,y:_t[0],w:182,align:"end",label:"V avg",decimals:1,size:26},{id:"s-i",role:"current_avg",kind:"text",page:"summary",x:zt,y:_t[1],w:182,align:"end",label:"I avg",decimals:2,size:26},{id:"s-p",role:"power_total",kind:"text",page:"summary",x:zt,y:_t[2],w:182,align:"end",label:"P total",decimals:2,size:26},{id:"s-e",role:"energy_total",kind:"text",page:"summary",x:zt,y:_t[3],w:182,align:"end",label:"E total",decimals:1,size:26},{id:"i1",role:"current_l1",kind:"text",page:"amps",x:zt,y:_t[0],w:182,align:"end",label:"I1",decimals:2,size:26},{id:"i2",role:"current_l2",kind:"text",page:"amps",x:zt,y:_t[1],w:182,align:"end",label:"I2",decimals:2,size:26},{id:"i3",role:"current_l3",kind:"text",page:"amps",x:zt,y:_t[2],w:182,align:"end",label:"I3",decimals:2,size:26},{id:"iavg",role:"current_avg",kind:"text",page:"amps",x:zt,y:_t[3],w:182,align:"end",label:"I avg",decimals:2,size:26},{id:"u1",role:"volts_l1",kind:"text",page:"volts",x:zt,y:_t[0],w:182,align:"end",label:"V1-N",decimals:1,size:26},{id:"u2",role:"volts_l2",kind:"text",page:"volts",x:zt,y:_t[1],w:182,align:"end",label:"V2-N",decimals:1,size:26},{id:"u3",role:"volts_l3",kind:"text",page:"volts",x:zt,y:_t[2],w:182,align:"end",label:"V3-N",decimals:1,size:26},{id:"uavg",role:"volts_avg",kind:"text",page:"volts",x:zt,y:_t[3],w:182,align:"end",label:"V avg",decimals:1,size:26},{id:"pw1",role:"power_l1",kind:"text",page:"power",x:zt,y:_t[0],w:182,align:"end",label:"P1",decimals:2,size:26},{id:"pw2",role:"power_l2",kind:"text",page:"power",x:zt,y:_t[1],w:182,align:"end",label:"P2",decimals:2,size:26},{id:"pw3",role:"power_l3",kind:"text",page:"power",x:zt,y:_t[2],w:182,align:"end",label:"P3",decimals:2,size:26},{id:"pwf",role:"power_factor",kind:"text",page:"power",x:zt,y:_t[3],w:182,align:"end",label:"PF",decimals:2,size:26},{id:"t-sum",role:"",kind:"text",page:"summary",text:"Total",x:$t,y:82,w:wt,align:"middle",size:15},{id:"t-amp",role:"",kind:"text",page:"amps",text:"Current",x:$t,y:82,w:wt,align:"middle",size:15},{id:"t-vol",role:"",kind:"text",page:"volts",text:"Voltage",x:$t,y:82,w:wt,align:"middle",size:15},{id:"t-pow",role:"",kind:"text",page:"power",text:"Power",x:$t,y:82,w:wt,align:"middle",size:15},{id:"sk1",role:"",kind:"text",text:"I",x:68,y:304,w:60,align:"middle",size:13},{id:"sk2",role:"",kind:"text",text:"U-V",x:128,y:304,w:60,align:"middle",size:13},{id:"sk3",role:"",kind:"text",text:"PQS",x:188,y:304,w:60,align:"middle",size:13},{id:"sk4",role:"",kind:"text",text:"▶",x:248,y:304,w:60,align:"middle",size:13},{id:"k1",role:"",kind:"button",x:vt[0]-26,y:331,w:52,h:42,text:"",action:"page",target:"amps"},{id:"k2",role:"",kind:"button",x:vt[1]-26,y:331,w:52,h:42,text:"",action:"page",target:"volts"},{id:"k3",role:"",kind:"button",x:vt[2]-26,y:331,w:52,h:42,text:"",action:"page",target:"power"},{id:"k4",role:"",kind:"button",x:vt[3]-26,y:331,w:52,h:42,text:"",action:"page",target:"summary"}]},St=460,Ct={id:"generic-3phase",name:"Generic 3-phase meter",description:"Single-page readout for boards where the physical meter is unknown.",card:"bms-meter-card",render:"svg",display:"negative",size:[St,260],artNode:j`
  <defs>
    <linearGradient id="g3p-case" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a5159" />
      <stop offset="100%" stop-color="#343a40" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${St}" height="${260}" rx="10" fill="url(#g3p-case)" />
  <rect x="14" y="14" width="${432}" height="${232}" rx="6"
        fill="#151b17" stroke="#090c0a" stroke-width="2" />
  <line x1="14" y1="110" x2="${446}" y2="110" stroke="#3c4a40" stroke-width="1" />
  <line x1="14" y1="186" x2="${446}" y2="186" stroke="#3c4a40" stroke-width="1" />
`,regions:[{id:"etot",role:"energy_total",kind:"text",x:34,y:34,w:390,label:"Total energy",unit:"kWh",decimals:1,size:40},{id:"ptot",role:"power_total",kind:"text",x:34,y:124,w:180,label:"Power",unit:"kW",decimals:2,size:28},{id:"pf",role:"power_factor",kind:"text",x:250,y:124,w:174,label:"Power factor",decimals:2,size:28},{id:"v1",role:"volts_l1",kind:"text",x:34,y:200,w:120,label:"L1-N",unit:"V",decimals:0,size:22},{id:"v2",role:"volts_l2",kind:"text",x:174,y:200,w:120,label:"L2-N",unit:"V",decimals:0,size:22},{id:"v3",role:"volts_l3",kind:"text",x:314,y:200,w:110,label:"L3-N",unit:"V",decimals:0,size:22}]},Mt=230,Pt=380,Nt=j`
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
  <rect x="0" y="22" width="${Mt}" height="${336}" rx="6" fill="url(#din3p-case)" />
  <rect x="18" y="0" width="${194}" height="30" rx="3" fill="#333940" />
  <rect x="18" y="${350}" width="${194}" height="30" rx="3" fill="#333940" />

  <!-- Terminal detail, top and bottom -->
  ${[0,1,2,3].map(t=>j`<rect x="${26+45*t}" y="4" width="34" height="20" rx="2" fill="#23282d" />`)}
  ${[0,1,2,3].map(t=>j`<rect x="${26+45*t}" y="${354}" width="34" height="20" rx="2" fill="#23282d" />`)}

  <!-- Display -->
  <rect x="20" y="52" width="${190}" height="168" rx="3" fill="url(#din3p-lcd)" />
  <rect x="20" y="52" width="${190}" height="168" rx="3"
        fill="none" stroke="#1d2226" stroke-width="3" />
  <line x1="28" y1="108" x2="${202}" y2="108" stroke="#9fae88" stroke-width="1" />
  <line x1="28" y1="164" x2="${202}" y2="164" stroke="#9fae88" stroke-width="1" />

  <!-- Key cluster -->
  <rect x="20" y="234" width="${190}" height="62" rx="4" fill="#2e343a" />
`,It={id:"din-3phase-analyser",name:"DIN-rail 3-phase analyser",description:"Portrait DIN-mounted analyser with a stacked per-phase display. Generic to the form factor, not modelled on a specific product.",card:"bms-meter-card",render:"svg",display:"positive",size:[Mt,Pt],artNode:Nt,pages:["volts","amps","power"],regions:[{id:"r1",role:"volts_l1",kind:"text",page:"volts",x:34,y:62,w:162,label:"L1",unit:"V",decimals:1,size:30},{id:"r2",role:"volts_l2",kind:"text",page:"volts",x:34,y:118,w:162,label:"L2",unit:"V",decimals:1,size:30},{id:"r3",role:"volts_l3",kind:"text",page:"volts",x:34,y:174,w:162,label:"L3",unit:"V",decimals:1,size:30},{id:"a1",role:"current_l1",kind:"text",page:"amps",x:34,y:62,w:162,label:"L1",unit:"A",decimals:2,size:30},{id:"a2",role:"current_l2",kind:"text",page:"amps",x:34,y:118,w:162,label:"L2",unit:"A",decimals:2,size:30},{id:"a3",role:"current_l3",kind:"text",page:"amps",x:34,y:174,w:162,label:"L3",unit:"A",decimals:2,size:30},{id:"pt",role:"power_total",kind:"text",page:"power",x:34,y:62,w:162,label:"Total",unit:"kW",decimals:2,size:30},{id:"pf",role:"power_factor",kind:"text",page:"power",x:34,y:118,w:162,label:"PF",decimals:2,size:30},{id:"en",role:"energy_total",kind:"text",page:"power",x:34,y:174,w:162,label:"Energy",unit:"kWh",decimals:0,size:30},{id:"k1",role:"",kind:"button",x:32,y:246,w:52,h:34,text:"V",action:"page",target:"volts"},{id:"k2",role:"",kind:"button",x:92,y:246,w:52,h:34,text:"A",action:"page",target:"amps"},{id:"k3",role:"",kind:"button",x:152,y:246,w:52,h:34,text:"kW",action:"page",target:"power"},{id:"lampL1",role:"volts_l1",kind:"lamp",x:40,y:310,w:14,label:"L1",on:"#5fd87a"},{id:"lampL2",role:"volts_l2",kind:"lamp",x:100,y:310,w:14,label:"L2",on:"#5fd87a"},{id:"lampL3",role:"volts_l3",kind:"lamp",x:160,y:310,w:14,label:"L3",on:"#5fd87a"}]},Dt=400,Lt={id:"circutor-cvm-e3-mini",name:"Circutor CVM-E3-MINI",description:"Panel-mount three-phase analyser: negative LCD with three stacked values, magnitude and unit to the right, four-key bezel.",emulates:"Circutor CVM-E3-MINI-WiEth",card:"bms-meter-card",render:"svg",display:"negative",size:[Dt,330],artNode:j`
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

  <rect x="0" y="0" width="${Dt}" height="${330}" rx="7" fill="url(#cvm-bezel)" />
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
`,pages:["power","volts","amps","energy"],regions:[{id:"p-w",role:"power_total",kind:"text",page:"power",x:70,y:66,w:232,align:"end",unit:"",decimals:2,size:42},{id:"p-va",role:"apparent_power",kind:"text",page:"power",x:70,y:124,w:232,align:"end",decimals:2,size:42},{id:"p-var",role:"reactive_power",kind:"text",page:"power",x:70,y:180,w:232,align:"end",decimals:2,size:42},{id:"v1",role:"volts_l1",kind:"text",page:"volts",x:70,y:66,w:232,align:"end",decimals:1,size:42},{id:"v2",role:"volts_l2",kind:"text",page:"volts",x:70,y:124,w:232,align:"end",decimals:1,size:42},{id:"v3",role:"volts_l3",kind:"text",page:"volts",x:70,y:180,w:232,align:"end",decimals:1,size:42},{id:"a1",role:"current_l1",kind:"text",page:"amps",x:70,y:66,w:232,align:"end",decimals:2,size:42},{id:"a2",role:"current_l2",kind:"text",page:"amps",x:70,y:124,w:232,align:"end",decimals:2,size:42},{id:"a3",role:"current_l3",kind:"text",page:"amps",x:70,y:180,w:232,align:"end",decimals:2,size:42},{id:"e-tot",role:"energy_total",kind:"text",page:"energy",x:70,y:82,w:232,align:"end",decimals:1,size:44},{id:"e-pf",role:"power_factor",kind:"text",page:"energy",x:70,y:160,w:232,align:"end",decimals:2,size:36},{id:"k-prev",role:"",kind:"button",x:86,y:272,w:40,h:40,text:"‹",action:"prev_page"},{id:"k-menu",role:"",kind:"button",x:146,y:274,w:108,h:36,text:"☰",action:"next_page"},{id:"k-next",role:"",kind:"button",x:274,y:272,w:40,h:40,text:"›",action:"next_page"}]},Gt=200,Rt=200,Ot=j`
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
  <circle cx="${Gt}" cy="${Rt}" r="192" fill="url(#mj-brass)" />
  <circle cx="${Gt}" cy="${Rt}" r="192" fill="none" stroke="#8a7133" stroke-width="2" />
  <circle cx="${Gt}" cy="${Rt}" r="176" fill="none" stroke="#8a7133" stroke-width="1.2" />

  <!-- Knurling around the bezel -->
  <g stroke="#9c8138" stroke-width="1.6">
    ${[...Array(60).keys()].map(t=>{const e=t/60*Math.PI*2;return j`<line
        x1="${Gt+178*Math.cos(e)}" y1="${Rt+178*Math.sin(e)}"
        x2="${Gt+190*Math.cos(e)}" y2="${Rt+190*Math.sin(e)}" />`})}
  </g>

  <!-- Dial face -->
  <circle cx="${Gt}" cy="${Rt}" r="170" fill="url(#mj-face)" />

  <text class="mj-brand" x="${Gt}" y="78" text-anchor="middle">MEASURED AUTOMATION</text>

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
`,Tt={id:"multijet-water-register",name:"Multi-jet water register",description:"Mechanical register: seven-digit odometer over four sweep dials, all reading one cumulative total.",emulates:"Multi-jet mechanical water meter register",card:"bms-meter-card",render:"svg",display:"positive",size:[400,400],artNode:Ot,regions:[{id:"odo",role:"volume_total",kind:"odometer",x:92,y:114,w:216,h:34,digits:7,redDigits:1,scale:1},{id:"units",role:"volume_total",kind:"text",show:"unit",x:100,y:164,w:200,align:"middle",size:14,text:"UNITS"},{id:"mult",role:"",kind:"text",text:"x1",x:316,y:120,w:40,align:"start",size:14},...[{id:"d1",x:104,scale:1,label:"x1"},{id:"d01",x:168,scale:.1,label:"x0.1"},{id:"d001",x:232,scale:.01,label:"x0.01"},{id:"d0001",x:296,scale:.001,label:"x0.001"}].map(t=>({id:t.id,role:"volume_total",kind:"needle",x:t.x,y:286,r:27,scale:t.scale,label:t.label}))]},Ut=180,Ht=208,Bt={id:"daikin-brc1h63k",name:"Daikin BRC1H63K (Madoka)",description:"Round wall controller with an illuminated status ring and a dark display. Mode, room temperature and three touch keys.",emulates:"Daikin BRC1H63K Madoka",card:"hvac-controller-card",render:"svg",display:"negative",size:[360,400],artNode:j`
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
  <circle cx="${Ut}" cy="${Ht}" r="${132}" fill="url(#madoka-face)" />
  <circle cx="${Ut}" cy="${Ht}" r="${122}" fill="none"
          stroke="#0a0d11" stroke-width="2" />

  <!-- Specular highlight, so the glass reads as glass -->
  <ellipse cx="${146}" cy="${134}" rx="62" ry="26"
           fill="#ffffff" opacity="0.06" />
`,regions:[{id:"ring",role:"hvac_mode",kind:"ring",x:Ut,y:Ht,r:128,stroke:7,on:"#2f8fff",off:"#161b21"},{id:"mode",role:"hvac_mode",kind:"text",x:90,y:130,w:180,align:"middle",size:19},{id:"roomlabel",role:"",kind:"text",text:"Room",x:88,y:164,w:70,align:"start",size:15},{id:"temp",role:"room_temp",kind:"text",x:84,y:182,w:172,align:"middle",unit:"",decimals:0,size:68},{id:"unit",role:"",kind:"text",text:"°C",x:258,y:190,w:34,align:"start",size:20},{id:"fan",role:"fan_speed",kind:"text",x:84,y:214,w:80,align:"start",size:14,placeholder:""},{id:"swing",role:"swing",kind:"text",x:84,y:234,w:80,align:"start",size:14,placeholder:""},{id:"sp",role:"setpoint",kind:"text",x:186,y:214,w:90,align:"end",label:"Set",decimals:0,size:18},{id:"minus",role:"",kind:"button",x:106,y:270,w:44,h:34,text:"−",action:"temp_down"},{id:"power",role:"",kind:"button",x:158,y:270,w:44,h:34,text:"○",action:"power_toggle"},{id:"plus",role:"",kind:"button",x:210,y:270,w:44,h:34,text:"+",action:"temp_up"}]},Vt=400,jt=66,Wt=84,Kt=268,Ft=170,qt=118,Zt=252,Yt=188,Jt=200,Qt=296,Xt=96,te=30,ee={id:"daikin-brc1e63",name:"Daikin BRC1E63",description:"Wired navigation controller: landscape LCD with mode, clock, set point and room temperature, over four pill keys and a navigation pad.",emulates:"Daikin BRC1E63 / BRC1E53 navigation remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[Vt,400],artNode:j`
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

  <rect x="0" y="0" width="${Vt}" height="${400}" rx="16" fill="url(#brc-bezel)" />
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
  <rect x="${jt}" y="${Wt}" width="${Kt}" height="${124}" fill="url(#brc-lcd)" />
  <line x1="${Ft}" y1="${Wt}" x2="${Ft}" y2="${Yt}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${Ft}" y1="${qt}" x2="${334}" y2="${qt}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${Zt}" y1="${qt}" x2="${Zt}" y2="${Yt}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${jt}" y1="${Yt}" x2="${334}" y2="${Yt}" stroke="#8d9788" stroke-width="1.5" />

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
    <rect x="46" y="228" width="${Xt}" height="${te}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="${258}" y="228" width="${Xt}" height="${te}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="46" y="332" width="${Xt}" height="${te}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="${258}" y="332" width="${Xt}" height="${te}" rx="15"
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
  <circle cx="${Jt}" cy="${Qt}" r="${62}" fill="url(#brc-pad)"
          stroke="#cfcfca" stroke-width="1.5" />
  <circle cx="${Jt}" cy="${Qt}" r="${56}" fill="none"
          stroke="#e6e6e2" stroke-width="1" />
  <circle cx="${Jt}" cy="${Qt}" r="27" fill="#fbfbfa"
          stroke="#d0d0cb" stroke-width="1.5" />
  <text class="brc-enter" x="${Jt}" y="${303}" text-anchor="middle">&#8629;</text>

  <!-- Pad direction marks -->
  <g fill="#8b9097">
    <polygon points="${194},${256} ${206},${256} ${Jt},${246}" />
    <polygon points="${194},${336} ${206},${336} ${Jt},${346}" />
    <polygon points="${160},${290} ${160},${302} ${150},${Qt}" />
    <polygon points="${240},${290} ${240},${302} ${250},${Qt}" />
  </g>
`,regions:[{id:"mode",role:"hvac_mode",kind:"text",x:76,y:92,w:88,align:"start",size:22},{id:"fan",role:"fan_speed",kind:"text",x:92,y:142,w:24,align:"start",size:13,placeholder:""},{id:"clock",role:"clock",kind:"text",x:Ft,y:88,w:164,align:"middle",size:22},{id:"sp-label",role:"",kind:"text",text:"Set temp",x:174,y:120,w:74,align:"start",size:11},{id:"sp",role:"setpoint",kind:"text",x:174,y:136,w:74,align:"middle",unit:"°C",decimals:0,size:26},{id:"room-label",role:"",kind:"text",text:"Room",x:256,y:120,w:74,align:"start",size:11},{id:"room",role:"room_temp",kind:"text",x:256,y:136,w:74,align:"middle",unit:"°C",decimals:0,size:26},{id:"status",role:"hvac_action",kind:"text",x:74,y:189,w:252,align:"start",size:12,placeholder:""},{id:"k-mode",role:"",kind:"button",x:46,y:228,w:Xt,h:te,text:"",action:"mode_cycle"},{id:"k-power",role:"",kind:"button",x:258,y:228,w:Xt,h:te,text:"",action:"power_toggle"},{id:"k-fan",role:"",kind:"button",x:46,y:332,w:Xt,h:te,text:"",action:"fan_cycle"},{id:"k-up",role:"",kind:"button",x:178,y:238,w:44,h:30,text:"",action:"temp_up"},{id:"k-down",role:"",kind:"button",x:178,y:324,w:44,h:30,text:"",action:"temp_down"}]},ie=30,se=92,re=j`
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
    ${[0,1,2,3,4,5].map(t=>j`<rect x="${34+9*t}" y="26" width="4" height="22" rx="2" />`)}
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
  <rect x="${ie}" y="${se}" width="${340}" height="${96}" fill="url(#brc315-lcd)" />
  <!-- Schedule ring, left of the display -->
  <g transform="translate(${74} ${144})">
    <circle cx="0" cy="0" r="30" fill="none" stroke="#7f8a74" stroke-width="1.4" />
    ${[0,3,6,9,12,15,18,21].map(t=>{const e=t/24*Math.PI*2-Math.PI/2,i=37*Math.cos(e),s=37*Math.sin(e)+3;return j`<text class="brc315-ring" x="${i}" y="${s}" text-anchor="middle">${t}</text>`})}
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
`,oe=348,ae=318,le=74;const ne={id:"vertical-pumpset",name:"Vertical multistage pump set",description:"Packaged booster skid: vertical multistage pumps on a common manifold with a bladder vessel and control panel. Choose how many pumps.",card:"pump-system-card",render:"svg",display:"negative",size:[494,430],options:[{key:"pumps",label:"Pumps",type:"number",min:1,max:10,default:3,help:"The skid widens to suit; roles are pump1_… through pumpN_…"}],build:function(t){const e=t.pumps??3,i=112+96*(e-1)+190,s=56+96*(e-1)+70,r=[...Array(e).keys()].map(t=>56+96*t),o=j`
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
    <rect x="18" y="${ae}" width="${s-40}" height="20" rx="10" fill="#aeb6bd" />
    <rect x="18" y="${ae}" width="${s-40}" height="7" rx="3.5" fill="#cfd6db" />

    <!-- Skid -->
    <rect x="10" y="${oe}" width="${s-24}" height="16" rx="3" fill="#b6bdc3" />
    <rect x="10" y="${364}" width="${s-24}" height="8" fill="#98a0a7" />
    <rect x="22" y="${372}" width="26" height="18" fill="#a8b0b6" />
    <rect x="${s-60}" y="${372}" width="26" height="18" fill="#a8b0b6" />

    ${r.map(t=>function(t){return j`
    <!-- Fan cowl -->
    <rect x="${t-18}" y="${48}" width="36" height="26" rx="3" fill="#1e2124" />
    <!-- Motor -->
    <rect x="${t-27}" y="${le}" width="54" height="96" rx="5" fill="#26292d" />
    <g stroke="#3a3f44" stroke-width="1.4">
      ${[0,1,2,3,4,5].map(e=>j`<line x1="${t-27}" y1="${88+13*e}"
                          x2="${t+27}" y2="${88+13*e}" />`)}
    </g>
    <!-- Motor stool -->
    <rect x="${t-17}" y="${170}" width="34" height="22" rx="2" fill="#2f3337" />
    <!-- Stainless barrel -->
    <rect x="${t-21}" y="${192}" width="42" height="126" rx="4"
          fill="url(#ps-steel)" stroke="#8e969c" stroke-width="1" />
    <!-- Pump head and base -->
    <rect x="${t-25}" y="${312}" width="50" height="18" rx="3" fill="#6f7780" />
    <!-- Discharge into the manifold -->
    <rect x="${t-7}" y="${276}" width="14" height="42" fill="#9aa3ab" />
    <circle cx="${t}" cy="${272}" r="9" fill="#c7a34a" />
  `}(t))}

    <!-- Bladder vessel -->
    <rect x="${s-46}" y="232" width="44" height="86" rx="20" fill="url(#ps-vessel)" />
    <rect x="${s-30}" y="318" width="12" height="16" fill="#9aa3ab" />

    <!-- Control panel on its stand -->
    <rect x="${s+8}" y="56" width="150" height="212" rx="5"
          fill="url(#ps-panel)" stroke="#aeb4b9" stroke-width="1.5" />
    <rect x="${s+20}" y="150" width="126" height="64" rx="3" fill="#c6ccd1" />
    <g stroke="#b2b8bd" stroke-width="2">
      ${[0,1,2,3,4,5,6].map(t=>j`<line x1="${s+26}" y1="${158+8*t}"
                          x2="${s+140}" y2="${158+8*t}" />`)}
    </g>
    <rect x="${s+76}" y="${268}" width="14" height="96" fill="#b0b7bd" />
    <rect x="${s+40}" y="360" width="86" height="10" rx="2" fill="#9aa2a9" />

    <!-- Panel HMI -->
    <rect x="${s+36}" y="74" width="94" height="58" rx="3"
          fill="#14323d" stroke="#0d222a" stroke-width="2" />
  `,a=[{id:"press",role:"system_pressure",kind:"text",x:s+42,y:78,w:82,align:"middle",decimals:2,size:22},{id:"sp",role:"pressure_setpoint",kind:"text",x:s+42,y:106,w:82,align:"middle",label:"",decimals:2,size:13},{id:"fault",role:"common_fault",kind:"lamp",x:s+138,y:60,w:12,on:"#ef4444",off:"#3a2020"}];return r.forEach((t,e)=>{const i=e+1;a.push({id:`run${i}`,role:`pump${i}_run`,kind:"lamp",x:t-7,y:28,w:14,on:"#3ddc84",off:"#16281d"}),a.push({id:`flt${i}`,role:`pump${i}_fault`,kind:"lamp",x:t+14,y:28,w:10,on:"#ef4444",off:"#2a1717"}),a.push({id:`spd${i}`,role:`pump${i}_speed`,kind:"text",x:t-34,y:394,w:68,align:"middle",unit:"%",decimals:0,size:15,placeholder:""}),a.push({id:`lbl${i}`,role:"",kind:"text",text:`P${i}`,x:t-34,y:414,w:68,align:"middle",size:12})}),{size:[i,430],artNode:o,regions:a}},regions:[]},de=80,ce=80,he=240,pe=96,fe=104,xe=208,ye=[Lt,Et,It,Ct,Tt,ee,{id:"daikin-brc2e61",name:"Daikin BRC2E61",description:"Simplified wired controller: a small central display surrounded by large flat keys for power, temperature, fan and louvre.",emulates:"Daikin BRC2E61 simplified remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[400,400],artNode:j`
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
    <line x1="${de}" y1="14" x2="${de}" y2="386" />
    <line x1="${320}" y1="14" x2="${320}" y2="386" />
    <line x1="14" y1="${ce}" x2="386" y2="${ce}" />
    <line x1="14" y1="${320}" x2="386" y2="${320}" />
  </g>

  <!-- Power indicator and key, top centre -->
  <rect x="192" y="22" width="16" height="9" rx="2" fill="#5f6a5c" />
  <g transform="translate(193 40)" stroke="#4a5057" stroke-width="1.8" fill="none">
    <circle cx="7" cy="8" r="6.5" />
    <line x1="7" y1="0" x2="7" y2="7" />
  </g>

  <!-- Display surround and glass -->
  <rect x="${de}" y="${ce}" width="${he}" height="${he}" rx="16"
        fill="url(#brc2-sur)" />
  <rect x="${pe}" y="${fe}" width="${xe}" height="${200}" rx="2"
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
`,regions:[{id:"mode",role:"hvac_mode",kind:"text",x:104,y:112,w:192,align:"middle",size:20},{id:"sp",role:"setpoint",kind:"text",x:106,y:208,w:104,align:"start",unit:"",decimals:0,size:48},{id:"spunit",role:"",kind:"text",text:"°C",x:192,y:232,w:24,align:"start",size:16},{id:"fan",role:"fan_speed",kind:"text",x:216,y:222,w:78,align:"end",size:16,placeholder:""},{id:"room",role:"room_temp",kind:"text",x:104,y:262,w:192,align:"middle",label:"",unit:"°C",decimals:0,size:16},{id:"k-power",role:"",kind:"button",x:120,y:12,w:160,h:62,text:"",action:"power_toggle"},{id:"k-up",role:"",kind:"button",x:326,y:14,w:66,h:60,text:"",action:"temp_up"},{id:"k-down",role:"",kind:"button",x:326,y:326,w:66,h:60,text:"",action:"temp_down"},{id:"k-mode",role:"",kind:"button",x:12,y:14,w:62,h:60,text:"",action:"mode_cycle"},{id:"k-fan",role:"",kind:"button",x:12,y:326,w:62,h:60,text:"",action:"fan_cycle"}]},Bt,{id:"daikin-brc315d7",name:"Daikin BRC315D7",description:"Schedule controller, cover closed: wide segmented display with timer rows, temperature and mode icons.",emulates:"Daikin BRC315D7 schedule remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[400,400],artNode:re,regions:[{id:"hdr",role:"",kind:"text",text:"ONETIME  DAILY  TIMER",x:114,y:94,w:160,align:"start",size:10},{id:"t1",role:"",kind:"text",text:"--:--",x:122,y:114,w:108,align:"middle",size:22},{id:"t2",role:"",kind:"text",text:"--:--",x:122,y:150,w:108,align:"middle",size:22},{id:"sp",role:"setpoint",kind:"text",x:244,y:106,w:64,align:"middle",unit:"",decimals:0,size:38},{id:"spunit",role:"",kind:"text",text:"°C",x:306,y:130,w:20,align:"start",size:12},{id:"room",role:"room_temp",kind:"text",x:244,y:154,w:64,align:"middle",label:"",decimals:0,size:16},{id:"mode",role:"hvac_mode",kind:"text",x:244,y:172,w:120,align:"start",size:11},{id:"k-power",role:"",kind:"button",x:290,y:56,w:72,h:20,text:"",action:"power_toggle"}]},ne];function ue(t){return ye.filter(e=>e.card===t)}function ge(t,e){const i=ue(t);return i.find(t=>t.id===e)??i[0]}const $e="hvac-controller-card",me=["off","cool","heat","dry","fan_only","auto"];class we extends nt{setConfig(t){if(!t)throw new Error("Invalid configuration");this._config=t}getCardSize(){return 5}static getConfigElement(){return document.createElement(`${$e}-editor`)}static getStubConfig(){return{type:`custom:${$e}`,faceplate:"daikin-brc1e63"}}_faceplate(){return ge($e,this._config?.faceplate)}_setpoint(){if(!this.hass||!this._config)return;if(this._config.climate)return xt(this.hass,this._config.climate,"setpoint").value;const t=this._config.entities?.setpoint;return t?Number(this.hass.states[t]?.state):void 0}async _onAction(t){if(!this.hass||!this._config)return;const e=this._config.climate;if(!e)return void this._notify("This controller is read-only — no climate entity is set.");const i=this._setpoint();switch(t.action){case"temp_up":case"temp_down":{if(void 0===i)return;const s="temp_up"===t.action?.5:-.5;return void await this.hass.callService("climate","set_temperature",{entity_id:e,temperature:Math.round(2*(i+s))/2})}case"power_toggle":{const t="off"!==this.hass.states[e]?.state;return void await this.hass.callService("climate",t?"turn_off":"turn_on",{entity_id:e})}case"fan_cycle":{const t=this.hass.states[e]?.attributes.fan_modes??[];if(!t.length)return;const i=this.hass.states[e]?.attributes.fan_mode,s=t[(t.indexOf(i)+1)%t.length];return void await this.hass.callService("climate","set_fan_mode",{entity_id:e,fan_mode:s})}case"mode_cycle":{const t=this.hass.states[e]?.attributes.hvac_modes??me,i=this.hass.states[e]?.state??t[0],s=t[(t.indexOf(i)+1)%t.length];return void await this.hass.callService("climate","set_hvac_mode",{entity_id:e,hvac_mode:s})}default:return}}_notify(t){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:t},bubbles:!0,composed:!0}))}render(){if(!this._config||!this.hass)return K;const t=this._faceplate(),e=[...new Set(t.regions.map(t=>t.role))].filter(Boolean),i=function(t,e,i={},s=[]){const r={};for(const o of e){if(i[o]){r[o]=i[o];continue}const e=s.length?s:Object.keys(t.states),a=ct[o];if(!a)continue;const l=e.find(t=>a.test(t));l&&(r[o]=l)}return r}(this.hass,e,this._config.entities??{});return V`
      <ha-card>
        ${this._config.name?V`<div class="title">${this._config.name}</div>`:K}
        ${this._config.climate||this._config.entities?K:V`<div class="hint">
              Nothing bound yet. Choose a climate entity in the editor, or map
              entities per role in YAML.
            </div>`}
        <div class="frame">
          ${yt({hass:this.hass,climate:this._config.climate,faceplate:t,bindings:i,page:"",onAction:t=>{this._onAction(t)}})}
        </div>
      </ha-card>
    `}}we.properties={hass:{attribute:!1},_config:{state:!0}},we.styles=o`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .title {
      font-weight: 600;
      padding: 0 4px 8px;
      color: var(--primary-text-color);
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
    .hint {
      padding: 2px 4px 10px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;class ke extends nt{setConfig(t){this._config=t}_emit(t){const e={...this._config,...t};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}render(){if(!this._config||!this.hass)return K;const t=ue($e),e=ge($e,this._config.faceplate),i=Object.keys(this.hass.states).filter(t=>t.startsWith("climate.")).sort();return V`
      <div class="editor">
        <label>
          Controller
          <select @change=${t=>this._emit({faceplate:t.target.value})}>
            ${t.map(t=>V`<option value=${t.id} ?selected=${t.id===e.id}>
                ${t.name}
              </option>`)}
          </select>
        </label>
        <p class="note">${e.description??""}</p>
        <label>
          Climate entity
          <select @change=${t=>this._emit({climate:t.target.value})}>
            <option value="">— none —</option>
            ${i.map(t=>V`<option value=${t} ?selected=${t===this._config?.climate}>
                ${t}
              </option>`)}
          </select>
        </label>
        ${i.length?K:V`<p class="warn">
              No climate entities exist on this system. Without one the
              controller is read-only, and its readings must be mapped
              per-role in YAML.
            </p>`}
        ${e.emulates?V`<p class="note">Emulates ${e.emulates}. Product names
              and marks belong to their respective owners.</p>`:K}
      </div>
    `}}ke.properties={hass:{attribute:!1},_config:{state:!0}},ke.styles=o`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    select {
      padding: 6px 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font: inherit;
    }
    .note {
      margin: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .warn {
      margin: 0;
      font-size: 12px;
      color: var(--warning-color, #d98600);
    }
  `,customElements.define($e,we),customElements.define(`${$e}-editor`,ke),window.customCards??=[],window.customCards.push({type:$e,name:"HVAC Controller Card",description:"A wall controller that looks and behaves like the real one.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-Cards"});
