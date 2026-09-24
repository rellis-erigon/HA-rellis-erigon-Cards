const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(s,e,i)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:n,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,f=globalThis,x=f.trustedTypes,u=x?x.emptyScript:"",g=f.reactiveElementPolyfillSupport,m=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?u:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},$=(e,t)=>!l(e,t),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&n(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const o=s?.call(this);r?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...c(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(t)i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=s;const o=r.fromAttribute(t,e.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(void 0!==e){const o=this.constructor;if(!1===s&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??$)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[m("elementProperties")]=new Map,b[m("finalized")]=new Map,g?.({ReactiveElement:b}),(f.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,_=e=>e,v=k.trustedTypes,A=v?v.createPolicy("lit-html",{createHTML:e=>e}):void 0,z="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,S=`<${E}>`,M=document,P=()=>M.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,L="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,G=/>/g,O=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,T=/"/g,H=/^(?:script|style|textarea|title)$/i,B=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),j=B(1),V=B(2),W=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),K=new WeakMap,q=M.createTreeWalker(M,129);function Y(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const Z=(e,t)=>{const i=e.length-1,s=[];let r,o=2===t?"<svg>":3===t?"<math>":"",a=D;for(let t=0;t<i;t++){const i=e[t];let l,n,d=-1,c=0;for(;c<i.length&&(a.lastIndex=c,n=a.exec(i),null!==n);)c=a.lastIndex,a===D?"!--"===n[1]?a=R:void 0!==n[1]?a=G:void 0!==n[2]?(H.test(n[2])&&(r=RegExp("</"+n[2],"g")),a=O):void 0!==n[3]&&(a=O):a===O?">"===n[0]?(a=r??D,d=-1):void 0===n[1]?d=-2:(d=a.lastIndex-n[2].length,l=n[1],a=void 0===n[3]?O:'"'===n[3]?T:U):a===T||a===U?a=O:a===R||a===G?a=D:(a=O,r=void 0);const h=a===O&&e[t+1].startsWith("/>")?" ":"";o+=a===D?i+S:d>=0?(s.push(l),i.slice(0,d)+z+i.slice(d)+C+h):i+C+(-2===d?t:h)}return[Y(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class J{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,o=0;const a=e.length-1,l=this.parts,[n,d]=Z(e,t);if(this.el=J.createElement(n,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=q.nextNode())&&l.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(z)){const t=d[o++],i=s.getAttribute(e).split(C),a=/([.?@])?(.*)/.exec(t);l.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?ie:"?"===a[1]?se:"@"===a[1]?re:te}),s.removeAttribute(e)}else e.startsWith(C)&&(l.push({type:6,index:r}),s.removeAttribute(e));if(H.test(s.tagName)){const e=s.textContent.split(C),t=e.length-1;if(t>0){s.textContent=v?v.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],P()),q.nextNode(),l.push({type:2,index:++r});s.append(e[t],P())}}}else if(8===s.nodeType)if(s.data===E)l.push({type:2,index:r});else{let e=-1;for(;-1!==(e=s.data.indexOf(C,e+1));)l.push({type:7,index:r}),e+=C.length-1}r++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,s){if(t===W)return t;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=N(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(t=Q(e,r._$AS(e,t.values),r,s)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??M).importNode(t,!0);q.currentNode=s;let r=q.nextNode(),o=0,a=0,l=i[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new ee(r,r.nextSibling,this,e):1===l.type?t=new l.ctor(r,l.name,l.strings,this,e):6===l.type&&(t=new oe(r,this,e)),this._$AV.push(t),l=i[++a]}o!==l?.index&&(r=q.nextNode(),o++)}return q.currentNode=M,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),N(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new X(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new J(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new ee(this.O(P()),this.O(P()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=_(e).nextSibling;_(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}let te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(e,t=this,i,s){const r=this.strings;let o=!1;if(void 0===r)e=Q(this,e,t,0),o=!N(e)||e!==this._$AH&&e!==W,o&&(this._$AH=e);else{const s=e;let a,l;for(e=r[0],a=0;a<r.length-1;a++)l=Q(this,s[i+a],t,a),l===W&&(l=this._$AH[a]),o||=!N(l)||l!==this._$AH[a],l===F?e=F:e!==F&&(e+=(l??"")+r[a+1]),this._$AH[a]=l}o&&!s&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}}class se extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}}class re extends te{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??F)===W)return;const i=this._$AH,s=e===F&&i!==F||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ae=k.litHtmlPolyfillSupport;ae?.(J,ee),(k.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class ne extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let r=s._$litPart$;if(void 0===r){const e=i?.renderBefore??null;s._$litPart$=r=new ee(t.insertBefore(P(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ne._$litElement$=!0,ne.finalized=!0,le.litElementHydrateSupport?.({LitElement:ne});const de=le.litElementPolyfillSupport;de?.({LitElement:ne}),(le.litElementVersions??=[]).push("4.2.2");const ce={energy_total:/metertotal$|_energy_total$|_kwh_total$/,power_total:/3phase_active_power$|_active_power$|_power_total$/,power_l1:/active_power_p1$/,power_l2:/active_power_p2$/,power_l3:/active_power_p3$/,volts_l1:/phase_1_v$|_l1_n$|_voltage_l1$/,volts_l2:/phase_2_v$|_l2_n$|_voltage_l2$/,volts_l3:/phase_3_v$|_l3_n$|_voltage_l3$/,current_l1:/phase_1_a$|_current_l1$/,current_l2:/phase_2_a$|_current_l2$/,current_l3:/phase_3_a$|_current_l3$/,power_factor:/power_factor$/,frequency:/frequency$/,volume_total:/_cubicmetre$|_volume_total$|_water_total$|watermeter_total$/},he=new Set(["unavailable","unknown","none",""]),pe={volts_avg:["volts_l1","volts_l2","volts_l3"],current_avg:["current_l1","current_l2","current_l3"]};function fe(e,t,i={},s=[]){const r={};for(const o of t){if(i[o]){r[o]=i[o];continue}const t=s.length?s:Object.keys(e.states),a=ce[o];if(!a)continue;const l=t.find(e=>a.test(e));l&&(r[o]=l)}return r}function xe(e,t){if(!t)return{dark:!0,stale:!1};const i=e.states[t];if(!i)return{entityId:t,dark:!0,stale:!1};const s=String(i.state);if(he.has(s.toLowerCase()))return{entityId:t,state:s,dark:!0,stale:!0};const r=Number(s);return{entityId:t,state:s,value:Number.isFinite(r)?r:void 0,unit:i.attributes.unit_of_measurement,dark:!1,stale:!1}}function ue(e,t,i){const s=e.states[t];if(!s)return{entityId:t,dark:!0,stale:!1};if(he.has(String(s.state).toLowerCase()))return{entityId:t,state:s.state,dark:!0,stale:!0};const r=s.attributes,o=(e,i)=>{if(null==e)return{entityId:t,dark:!0,stale:!1};const s=Number(e);return{entityId:t,state:String(e),value:Number.isFinite(s)?s:void 0,unit:i,dark:!1,stale:!1}};switch(i){case"hvac_mode":return o(s.state);case"hvac_action":return o(r.hvac_action??s.state);case"setpoint":return o(r.temperature,"°C");case"room_temp":return o(r.current_temperature,"°C");case"fan_speed":return o(r.fan_mode);case"swing":return o(r.swing_mode);case"power":return o("off"===s.state?"off":"on");case"humidity":return o(r.current_humidity,"%");default:return{entityId:t,dark:!0,stale:!1}}}function ge(e){const[t,i]=e.faceplate.size,s=(r=e.faceplate,o=e.page,r.regions.filter(e=>!e.page||e.page===o));var r,o;return j`
    <svg
      class="faceplate display-${e.faceplate.display??"positive"}"
      viewBox="0 0 ${t} ${i}"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label=${e.faceplate.name}
    >
      ${function(e){if("image"===e.render&&e.art){const[t,i]=e.size;return V`<image href=${e.art} x="0" y="0" width=${t} height=${i} />`}return V`${e.artNode??""}`}(e.faceplate)}
      ${s.map(t=>function(e,t){const i=e.climate&&!e.bindings[t.role]?ue(e.hass,e.climate,t.role):function(e,t,i){if(t[i])return xe(e,t[i]);if("clock"===i){const e=new Date;return{state:`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`,dark:!1,stale:!1}}const s=pe[i];if(!s)return{dark:!0,stale:!1};const r=s.map(i=>xe(e,t[i]));if(r.some(e=>e.dark||void 0===e.value))return{dark:!0,stale:r.some(e=>e.stale)};const o=r.reduce((e,t)=>e+(t.value??0),0);return{value:o/r.length,state:String(o/r.length),unit:r[0].unit,dark:!1,stale:!1}}(e.hass,e.bindings,t.role);switch(t.kind){case"text":return function(e,t){const i=e.role?"unit"===e.show?(t.unit??e.text??"").toUpperCase():t.dark&&void 0!==e.placeholder?e.placeholder:function(e,t=1,i){if(e.dark)return"--";if(void 0===e.value)return e.state??"--";const s=e.value.toFixed(t),r=i??e.unit??"";return r?`${s} ${r}`:s}(t,e.decimals??1,e.unit):e.text??"";if(!e.role&&!e.text)return V``;const s=e.align??"start",r=e.x+("end"===s?e.w??0:"middle"===s?(e.w??0)/2:0);return V`
    ${e.label?V`<text class="lcd-label" x=${e.x} y=${e.y-10}>${e.label}</text>`:""}
    <text
      class="lcd-value ${e.role?"":"chrome"} ${e.role&&t.dark?"dark":""} ${t.stale?"stale":""}"
      x=${r}
      y=${e.y+(e.size??22)}
      font-size=${e.size??22}
      text-anchor=${s}
    >${i}</text>
  `}(t,i);case"lamp":return function(e,t){const i=t.state?.trim()??"",s=""===i?NaN:Number(i),r=!t.dark&&void 0!==t.state&&(Number.isFinite(s)?0!==s:!["off","false","normal","ok"].includes(i.toLowerCase())),o=(e.w??12)/2;return V`
    <circle
      class="lamp ${r?"lit":""}"
      cx=${e.x+o}
      cy=${e.y+o}
      r=${o}
      fill=${r?e.on??"#e34":e.off??"#3a1418"}
    />
    ${e.label?V`<text class="lamp-label" x=${e.x+o} y=${e.y+2*o+12}
              text-anchor="middle">${e.label}</text>`:""}
  `}(t,i);case"bar":return function(e,t){const i=e.w??100,s=e.h??10,r=e.max??100,o=t.dark||void 0===t.value?0:Math.max(0,Math.min(1,t.value/r));return V`
    <rect class="bar-track" x=${e.x} y=${e.y} width=${i} height=${s} rx="2" />
    <rect
      class="bar-fill"
      x=${e.x}
      y=${e.y}
      width=${i*o}
      height=${s}
      rx="2"
    />
  `}(t,i);case"ring":return function(e,t){const i=(t.state??"").toLowerCase(),s=!t.dark&&"off"!==i&&"0"!==i&&"false"!==i;return V`
    <circle
      class="ring ${s?"lit":""}"
      cx=${e.x}
      cy=${e.y}
      r=${e.r??100}
      fill="none"
      stroke=${s?e.on??"#3aa0ff":e.off??"#1b2026"}
      stroke-width=${e.stroke??6}
    />
  `}(t,i);case"odometer":return function(e,t){const i=e.digits??5,s=e.redDigits??1,r=e.scale??1,o=(e.w??140)/i,a=e.h??34,l=t.dark||void 0===t.value?"-".repeat(i):String(Math.floor(Math.abs(t.value)/r)).slice(-i).padStart(i,"0");return V`
    <g class="odometer ${t.dark?"dark":""}">
      ${[...l].map((t,r)=>{const l=r>=i-s;return V`
          <rect
            class="odo-cell ${l?"odo-red":""}"
            x=${e.x+r*o}
            y=${e.y}
            width=${o-1.5}
            height=${a}
            rx="1.5"
          />
          <text
            class="odo-digit ${l?"odo-red-digit":""}"
            x=${e.x+r*o+(o-1.5)/2}
            y=${e.y+a-8}
            text-anchor="middle"
            font-size=${a-12}
          >${t}</text>
        `})}
    </g>
  `}(t,i);case"needle":return function(e,t){const i=e.r??26,s=e.scale??1,r=t.dark||void 0===t.value?0:Math.abs(t.value)/s%10/10,o=2*r*Math.PI-Math.PI/2,a=e.x+Math.cos(o)*(i-5),l=e.y+Math.sin(o)*(i-5);return V`
    <g class="dial ${t.dark?"dark":""}">
      <circle class="dial-face" cx=${e.x} cy=${e.y} r=${i} />
      ${[...Array(10).keys()].map(t=>{const s=t/10*2*Math.PI-Math.PI/2;return V`<line
          class="dial-tick"
          x1=${e.x+Math.cos(s)*(i-4)}
          y1=${e.y+Math.sin(s)*(i-4)}
          x2=${e.x+Math.cos(s)*i}
          y2=${e.y+Math.sin(s)*i}
        />`})}
      <line class="dial-needle" x1=${e.x} y1=${e.y} x2=${a} y2=${l} />
      <circle class="dial-hub" cx=${e.x} cy=${e.y} r="2.4" />
      ${e.label?V`<text class="dial-label" x=${e.x} y=${e.y+i+13}
                text-anchor="middle">${e.label}</text>`:""}
    </g>
  `}(t,i);case"button":return function(e,t){const i=t.w??44,s=t.h??26;return V`
    <g class="button" @click=${()=>e.onAction(t)} role="button" tabindex="0">
      <rect x=${t.x} y=${t.y} width=${i} height=${s} rx="4" />
      <text
        x=${t.x+i/2}
        y=${t.y+s/2+4}
        text-anchor="middle"
      >${t.text??""}</text>
    </g>
  `}(e,t)}}(e,t))}
    </svg>
  `}const me=400,ye=400,$e=62,we=84,be=276,ke=244,_e=[142,188,234,280],ve=352,Ae=[112,172,232,292],ze=V`
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

  <rect x="0" y="0" width="${me}" height="${ye}" rx="12" fill="url(#pm-bezel)" />
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
  <rect x="${$e}" y="${we}" width="${be}" height="${ke}" fill="url(#pm-lcd)" />

  <!-- Title band -->
  <rect x="${$e}" y="${we}" width="${be}" height="24" fill="#6a7482" />
  <rect x="${$e}" y="${we}" width="26" height="24" fill="#8d97a4" />
  <rect x="${312}" y="${we}" width="26" height="24" fill="#8d97a4" />

  <!-- Soft-key legend, aligned over the four physical keys -->
  <line x1="${$e}" y1="${302}" x2="${338}" y2="${302}"
        stroke="#9aa392" stroke-width="1" />

  <!-- Keys -->
  ${Ae.map(e=>V`
      <circle cx="${e}" cy="${ve}" r="21" fill="url(#pm-key)" />
      <circle cx="${e}" cy="${ve}" r="21" fill="none" stroke="#24282b" stroke-width="1.5" />
    `)}

  <!-- Indicator marks on the right edge -->
  <rect x="358" y="342" width="7" height="7" rx="1" fill="#22262a" />
  <rect x="358" y="356" width="7" height="7" rx="1" fill="#22262a" />
`,Ce=76,Ee={id:"schneider-pm2200",name:"Schneider EasyLogic PM2200",description:"Square panel-mount analyser: pale LCD with a title band, four labelled rows and a soft-key legend over four push keys.",emulates:"Schneider Electric EasyLogic PM2200",card:"bms-meter-card",render:"svg",display:"positive",size:[me,ye],artNode:ze,pages:["summary","amps","volts","power"],regions:[{id:"s-v",role:"volts_avg",kind:"text",page:"summary",x:Ce,y:_e[0],w:182,align:"end",label:"V avg",decimals:1,size:26},{id:"s-i",role:"current_avg",kind:"text",page:"summary",x:Ce,y:_e[1],w:182,align:"end",label:"I avg",decimals:2,size:26},{id:"s-p",role:"power_total",kind:"text",page:"summary",x:Ce,y:_e[2],w:182,align:"end",label:"P total",decimals:2,size:26},{id:"s-e",role:"energy_total",kind:"text",page:"summary",x:Ce,y:_e[3],w:182,align:"end",label:"E total",decimals:1,size:26},{id:"i1",role:"current_l1",kind:"text",page:"amps",x:Ce,y:_e[0],w:182,align:"end",label:"I1",decimals:2,size:26},{id:"i2",role:"current_l2",kind:"text",page:"amps",x:Ce,y:_e[1],w:182,align:"end",label:"I2",decimals:2,size:26},{id:"i3",role:"current_l3",kind:"text",page:"amps",x:Ce,y:_e[2],w:182,align:"end",label:"I3",decimals:2,size:26},{id:"iavg",role:"current_avg",kind:"text",page:"amps",x:Ce,y:_e[3],w:182,align:"end",label:"I avg",decimals:2,size:26},{id:"u1",role:"volts_l1",kind:"text",page:"volts",x:Ce,y:_e[0],w:182,align:"end",label:"V1-N",decimals:1,size:26},{id:"u2",role:"volts_l2",kind:"text",page:"volts",x:Ce,y:_e[1],w:182,align:"end",label:"V2-N",decimals:1,size:26},{id:"u3",role:"volts_l3",kind:"text",page:"volts",x:Ce,y:_e[2],w:182,align:"end",label:"V3-N",decimals:1,size:26},{id:"uavg",role:"volts_avg",kind:"text",page:"volts",x:Ce,y:_e[3],w:182,align:"end",label:"V avg",decimals:1,size:26},{id:"pw1",role:"power_l1",kind:"text",page:"power",x:Ce,y:_e[0],w:182,align:"end",label:"P1",decimals:2,size:26},{id:"pw2",role:"power_l2",kind:"text",page:"power",x:Ce,y:_e[1],w:182,align:"end",label:"P2",decimals:2,size:26},{id:"pw3",role:"power_l3",kind:"text",page:"power",x:Ce,y:_e[2],w:182,align:"end",label:"P3",decimals:2,size:26},{id:"pwf",role:"power_factor",kind:"text",page:"power",x:Ce,y:_e[3],w:182,align:"end",label:"PF",decimals:2,size:26},{id:"t-sum",role:"",kind:"text",page:"summary",text:"Total",x:$e,y:82,w:be,align:"middle",size:15},{id:"t-amp",role:"",kind:"text",page:"amps",text:"Current",x:$e,y:82,w:be,align:"middle",size:15},{id:"t-vol",role:"",kind:"text",page:"volts",text:"Voltage",x:$e,y:82,w:be,align:"middle",size:15},{id:"t-pow",role:"",kind:"text",page:"power",text:"Power",x:$e,y:82,w:be,align:"middle",size:15},{id:"sk1",role:"",kind:"text",text:"I",x:68,y:304,w:60,align:"middle",size:13},{id:"sk2",role:"",kind:"text",text:"U-V",x:128,y:304,w:60,align:"middle",size:13},{id:"sk3",role:"",kind:"text",text:"PQS",x:188,y:304,w:60,align:"middle",size:13},{id:"sk4",role:"",kind:"text",text:"▶",x:248,y:304,w:60,align:"middle",size:13},{id:"k1",role:"",kind:"button",x:Ae[0]-26,y:331,w:52,h:42,text:"",action:"page",target:"amps"},{id:"k2",role:"",kind:"button",x:Ae[1]-26,y:331,w:52,h:42,text:"",action:"page",target:"volts"},{id:"k3",role:"",kind:"button",x:Ae[2]-26,y:331,w:52,h:42,text:"",action:"page",target:"power"},{id:"k4",role:"",kind:"button",x:Ae[3]-26,y:331,w:52,h:42,text:"",action:"page",target:"summary"}]},Se=460,Me={id:"generic-3phase",name:"Generic 3-phase meter",description:"Single-page readout for boards where the physical meter is unknown.",card:"bms-meter-card",render:"svg",display:"negative",size:[Se,260],artNode:V`
  <defs>
    <linearGradient id="g3p-case" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4a5159" />
      <stop offset="100%" stop-color="#343a40" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${Se}" height="${260}" rx="10" fill="url(#g3p-case)" />
  <rect x="14" y="14" width="${432}" height="${232}" rx="6"
        fill="#151b17" stroke="#090c0a" stroke-width="2" />
  <line x1="14" y1="110" x2="${446}" y2="110" stroke="#3c4a40" stroke-width="1" />
  <line x1="14" y1="186" x2="${446}" y2="186" stroke="#3c4a40" stroke-width="1" />
`,regions:[{id:"etot",role:"energy_total",kind:"text",x:34,y:34,w:390,label:"Total energy",unit:"kWh",decimals:1,size:40},{id:"ptot",role:"power_total",kind:"text",x:34,y:124,w:180,label:"Power",unit:"kW",decimals:2,size:28},{id:"pf",role:"power_factor",kind:"text",x:250,y:124,w:174,label:"Power factor",decimals:2,size:28},{id:"v1",role:"volts_l1",kind:"text",x:34,y:200,w:120,label:"L1-N",unit:"V",decimals:0,size:22},{id:"v2",role:"volts_l2",kind:"text",x:174,y:200,w:120,label:"L2-N",unit:"V",decimals:0,size:22},{id:"v3",role:"volts_l3",kind:"text",x:314,y:200,w:110,label:"L3-N",unit:"V",decimals:0,size:22}]},Pe=230,Ne=380,Ie=V`
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
  <rect x="0" y="22" width="${Pe}" height="${336}" rx="6" fill="url(#din3p-case)" />
  <rect x="18" y="0" width="${194}" height="30" rx="3" fill="#333940" />
  <rect x="18" y="${350}" width="${194}" height="30" rx="3" fill="#333940" />

  <!-- Terminal detail, top and bottom -->
  ${[0,1,2,3].map(e=>V`<rect x="${26+45*e}" y="4" width="34" height="20" rx="2" fill="#23282d" />`)}
  ${[0,1,2,3].map(e=>V`<rect x="${26+45*e}" y="${354}" width="34" height="20" rx="2" fill="#23282d" />`)}

  <!-- Display -->
  <rect x="20" y="52" width="${190}" height="168" rx="3" fill="url(#din3p-lcd)" />
  <rect x="20" y="52" width="${190}" height="168" rx="3"
        fill="none" stroke="#1d2226" stroke-width="3" />
  <line x1="28" y1="108" x2="${202}" y2="108" stroke="#9fae88" stroke-width="1" />
  <line x1="28" y1="164" x2="${202}" y2="164" stroke="#9fae88" stroke-width="1" />

  <!-- Key cluster -->
  <rect x="20" y="234" width="${190}" height="62" rx="4" fill="#2e343a" />
`,Le={id:"din-3phase-analyser",name:"DIN-rail 3-phase analyser",description:"Portrait DIN-mounted analyser with a stacked per-phase display. Generic to the form factor, not modelled on a specific product.",card:"bms-meter-card",render:"svg",display:"positive",size:[Pe,Ne],artNode:Ie,pages:["volts","amps","power"],regions:[{id:"r1",role:"volts_l1",kind:"text",page:"volts",x:34,y:62,w:162,label:"L1",unit:"V",decimals:1,size:30},{id:"r2",role:"volts_l2",kind:"text",page:"volts",x:34,y:118,w:162,label:"L2",unit:"V",decimals:1,size:30},{id:"r3",role:"volts_l3",kind:"text",page:"volts",x:34,y:174,w:162,label:"L3",unit:"V",decimals:1,size:30},{id:"a1",role:"current_l1",kind:"text",page:"amps",x:34,y:62,w:162,label:"L1",unit:"A",decimals:2,size:30},{id:"a2",role:"current_l2",kind:"text",page:"amps",x:34,y:118,w:162,label:"L2",unit:"A",decimals:2,size:30},{id:"a3",role:"current_l3",kind:"text",page:"amps",x:34,y:174,w:162,label:"L3",unit:"A",decimals:2,size:30},{id:"pt",role:"power_total",kind:"text",page:"power",x:34,y:62,w:162,label:"Total",unit:"kW",decimals:2,size:30},{id:"pf",role:"power_factor",kind:"text",page:"power",x:34,y:118,w:162,label:"PF",decimals:2,size:30},{id:"en",role:"energy_total",kind:"text",page:"power",x:34,y:174,w:162,label:"Energy",unit:"kWh",decimals:0,size:30},{id:"k1",role:"",kind:"button",x:32,y:246,w:52,h:34,text:"V",action:"page",target:"volts"},{id:"k2",role:"",kind:"button",x:92,y:246,w:52,h:34,text:"A",action:"page",target:"amps"},{id:"k3",role:"",kind:"button",x:152,y:246,w:52,h:34,text:"kW",action:"page",target:"power"},{id:"lampL1",role:"volts_l1",kind:"lamp",x:40,y:310,w:14,label:"L1",on:"#5fd87a"},{id:"lampL2",role:"volts_l2",kind:"lamp",x:100,y:310,w:14,label:"L2",on:"#5fd87a"},{id:"lampL3",role:"volts_l3",kind:"lamp",x:160,y:310,w:14,label:"L3",on:"#5fd87a"}]},De=400,Re={id:"circutor-cvm-e3-mini",name:"Circutor CVM-E3-MINI",description:"Panel-mount three-phase analyser: negative LCD with three stacked values, magnitude and unit to the right, four-key bezel.",emulates:"Circutor CVM-E3-MINI-WiEth",card:"bms-meter-card",render:"svg",display:"negative",size:[De,330],artNode:V`
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

  <rect x="0" y="0" width="${De}" height="${330}" rx="7" fill="url(#cvm-bezel)" />
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
`,pages:["power","volts","amps","energy"],regions:[{id:"p-w",role:"power_total",kind:"text",page:"power",x:70,y:66,w:232,align:"end",unit:"",decimals:2,size:42},{id:"p-va",role:"apparent_power",kind:"text",page:"power",x:70,y:124,w:232,align:"end",decimals:2,size:42},{id:"p-var",role:"reactive_power",kind:"text",page:"power",x:70,y:180,w:232,align:"end",decimals:2,size:42},{id:"v1",role:"volts_l1",kind:"text",page:"volts",x:70,y:66,w:232,align:"end",decimals:1,size:42},{id:"v2",role:"volts_l2",kind:"text",page:"volts",x:70,y:124,w:232,align:"end",decimals:1,size:42},{id:"v3",role:"volts_l3",kind:"text",page:"volts",x:70,y:180,w:232,align:"end",decimals:1,size:42},{id:"a1",role:"current_l1",kind:"text",page:"amps",x:70,y:66,w:232,align:"end",decimals:2,size:42},{id:"a2",role:"current_l2",kind:"text",page:"amps",x:70,y:124,w:232,align:"end",decimals:2,size:42},{id:"a3",role:"current_l3",kind:"text",page:"amps",x:70,y:180,w:232,align:"end",decimals:2,size:42},{id:"e-tot",role:"energy_total",kind:"text",page:"energy",x:70,y:82,w:232,align:"end",decimals:1,size:44},{id:"e-pf",role:"power_factor",kind:"text",page:"energy",x:70,y:160,w:232,align:"end",decimals:2,size:36},{id:"k-prev",role:"",kind:"button",x:86,y:272,w:40,h:40,text:"‹",action:"prev_page"},{id:"k-menu",role:"",kind:"button",x:146,y:274,w:108,h:36,text:"☰",action:"next_page"},{id:"k-next",role:"",kind:"button",x:274,y:272,w:40,h:40,text:"›",action:"next_page"}]},Ge=200,Oe=200,Ue=V`
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
  <circle cx="${Ge}" cy="${Oe}" r="192" fill="url(#mj-brass)" />
  <circle cx="${Ge}" cy="${Oe}" r="192" fill="none" stroke="#8a7133" stroke-width="2" />
  <circle cx="${Ge}" cy="${Oe}" r="176" fill="none" stroke="#8a7133" stroke-width="1.2" />

  <!-- Knurling around the bezel -->
  <g stroke="#9c8138" stroke-width="1.6">
    ${[...Array(60).keys()].map(e=>{const t=e/60*Math.PI*2;return V`<line
        x1="${Ge+178*Math.cos(t)}" y1="${Oe+178*Math.sin(t)}"
        x2="${Ge+190*Math.cos(t)}" y2="${Oe+190*Math.sin(t)}" />`})}
  </g>

  <!-- Dial face -->
  <circle cx="${Ge}" cy="${Oe}" r="170" fill="url(#mj-face)" />

  <text class="mj-brand" x="${Ge}" y="78" text-anchor="middle">MEASURED AUTOMATION</text>

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
`,Te={id:"multijet-water-register",name:"Multi-jet water register",description:"Mechanical register: seven-digit odometer over four sweep dials, all reading one cumulative total.",emulates:"Multi-jet mechanical water meter register",card:"bms-meter-card",render:"svg",display:"positive",size:[400,400],artNode:Ue,regions:[{id:"odo",role:"volume_total",kind:"odometer",x:92,y:114,w:216,h:34,digits:7,redDigits:1,scale:1},{id:"units",role:"volume_total",kind:"text",show:"unit",x:100,y:164,w:200,align:"middle",size:14,text:"UNITS"},{id:"mult",role:"",kind:"text",text:"x1",x:316,y:120,w:40,align:"start",size:14},...[{id:"d1",x:104,scale:1,label:"x1"},{id:"d01",x:168,scale:.1,label:"x0.1"},{id:"d001",x:232,scale:.01,label:"x0.01"},{id:"d0001",x:296,scale:.001,label:"x0.001"}].map(e=>({id:e.id,role:"volume_total",kind:"needle",x:e.x,y:286,r:27,scale:e.scale,label:e.label}))]},He=180,Be=208,je={id:"daikin-brc1h63k",name:"Daikin BRC1H63K (Madoka)",description:"Round wall controller with an illuminated status ring and a dark display. Mode, room temperature and three touch keys.",emulates:"Daikin BRC1H63K Madoka",card:"hvac-controller-card",render:"svg",display:"negative",size:[360,400],artNode:V`
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
  <circle cx="${He}" cy="${Be}" r="${132}" fill="url(#madoka-face)" />
  <circle cx="${He}" cy="${Be}" r="${122}" fill="none"
          stroke="#0a0d11" stroke-width="2" />

  <!-- Specular highlight, so the glass reads as glass -->
  <ellipse cx="${146}" cy="${134}" rx="62" ry="26"
           fill="#ffffff" opacity="0.06" />
`,regions:[{id:"ring",role:"hvac_mode",kind:"ring",x:He,y:Be,r:128,stroke:7,on:"#2f8fff",off:"#161b21"},{id:"mode",role:"hvac_mode",kind:"text",x:90,y:130,w:180,align:"middle",size:19},{id:"roomlabel",role:"",kind:"text",text:"Room",x:88,y:164,w:70,align:"start",size:15},{id:"temp",role:"room_temp",kind:"text",x:84,y:182,w:172,align:"middle",unit:"",decimals:0,size:68},{id:"unit",role:"",kind:"text",text:"°C",x:258,y:190,w:34,align:"start",size:20},{id:"fan",role:"fan_speed",kind:"text",x:84,y:214,w:80,align:"start",size:14,placeholder:""},{id:"swing",role:"swing",kind:"text",x:84,y:234,w:80,align:"start",size:14,placeholder:""},{id:"sp",role:"setpoint",kind:"text",x:186,y:214,w:90,align:"end",label:"Set",decimals:0,size:18},{id:"minus",role:"",kind:"button",x:106,y:270,w:44,h:34,text:"−",action:"temp_down"},{id:"power",role:"",kind:"button",x:158,y:270,w:44,h:34,text:"○",action:"power_toggle"},{id:"plus",role:"",kind:"button",x:210,y:270,w:44,h:34,text:"+",action:"temp_up"}]},Ve=400,We=66,Fe=84,Ke=268,qe=170,Ye=118,Ze=252,Je=188,Qe=200,Xe=296,et=96,tt=30,it={id:"daikin-brc1e63",name:"Daikin BRC1E63",description:"Wired navigation controller: landscape LCD with mode, clock, set point and room temperature, over four pill keys and a navigation pad.",emulates:"Daikin BRC1E63 / BRC1E53 navigation remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[Ve,400],artNode:V`
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

  <rect x="0" y="0" width="${Ve}" height="${400}" rx="16" fill="url(#brc-bezel)" />
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
  <rect x="${We}" y="${Fe}" width="${Ke}" height="${124}" fill="url(#brc-lcd)" />
  <line x1="${qe}" y1="${Fe}" x2="${qe}" y2="${Je}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${qe}" y1="${Ye}" x2="${334}" y2="${Ye}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${Ze}" y1="${Ye}" x2="${Ze}" y2="${Je}" stroke="#8d9788" stroke-width="1.5" />
  <line x1="${We}" y1="${Je}" x2="${334}" y2="${Je}" stroke="#8d9788" stroke-width="1.5" />

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
    <rect x="46" y="228" width="${et}" height="${tt}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="${258}" y="228" width="${et}" height="${tt}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="46" y="332" width="${et}" height="${tt}" rx="15"
          fill="url(#brc-pill)" stroke="#d5d5d1" stroke-width="1.2" />
    <rect x="${258}" y="332" width="${et}" height="${tt}" rx="15"
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
  <circle cx="${Qe}" cy="${Xe}" r="${62}" fill="url(#brc-pad)"
          stroke="#cfcfca" stroke-width="1.5" />
  <circle cx="${Qe}" cy="${Xe}" r="${56}" fill="none"
          stroke="#e6e6e2" stroke-width="1" />
  <circle cx="${Qe}" cy="${Xe}" r="27" fill="#fbfbfa"
          stroke="#d0d0cb" stroke-width="1.5" />
  <text class="brc-enter" x="${Qe}" y="${303}" text-anchor="middle">&#8629;</text>

  <!-- Pad direction marks -->
  <g fill="#8b9097">
    <polygon points="${194},${256} ${206},${256} ${Qe},${246}" />
    <polygon points="${194},${336} ${206},${336} ${Qe},${346}" />
    <polygon points="${160},${290} ${160},${302} ${150},${Xe}" />
    <polygon points="${240},${290} ${240},${302} ${250},${Xe}" />
  </g>
`,regions:[{id:"mode",role:"hvac_mode",kind:"text",x:76,y:92,w:88,align:"start",size:22},{id:"fan",role:"fan_speed",kind:"text",x:92,y:142,w:24,align:"start",size:13,placeholder:""},{id:"clock",role:"clock",kind:"text",x:qe,y:88,w:164,align:"middle",size:22},{id:"sp-label",role:"",kind:"text",text:"Set temp",x:174,y:120,w:74,align:"start",size:11},{id:"sp",role:"setpoint",kind:"text",x:174,y:136,w:74,align:"middle",unit:"°C",decimals:0,size:26},{id:"room-label",role:"",kind:"text",text:"Room",x:256,y:120,w:74,align:"start",size:11},{id:"room",role:"room_temp",kind:"text",x:256,y:136,w:74,align:"middle",unit:"°C",decimals:0,size:26},{id:"status",role:"hvac_action",kind:"text",x:74,y:189,w:252,align:"start",size:12,placeholder:""},{id:"k-mode",role:"",kind:"button",x:46,y:228,w:et,h:tt,text:"",action:"mode_cycle"},{id:"k-power",role:"",kind:"button",x:258,y:228,w:et,h:tt,text:"",action:"power_toggle"},{id:"k-fan",role:"",kind:"button",x:46,y:332,w:et,h:tt,text:"",action:"fan_cycle"},{id:"k-up",role:"",kind:"button",x:178,y:238,w:44,h:30,text:"",action:"temp_up"},{id:"k-down",role:"",kind:"button",x:178,y:324,w:44,h:30,text:"",action:"temp_down"}]},st=30,rt=92,ot=V`
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
    ${[0,1,2,3,4,5].map(e=>V`<rect x="${34+9*e}" y="26" width="4" height="22" rx="2" />`)}
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
  <rect x="${st}" y="${rt}" width="${340}" height="${96}" fill="url(#brc315-lcd)" />
  <!-- Schedule ring, left of the display -->
  <g transform="translate(${74} ${144})">
    <circle cx="0" cy="0" r="30" fill="none" stroke="#7f8a74" stroke-width="1.4" />
    ${[0,3,6,9,12,15,18,21].map(e=>{const t=e/24*Math.PI*2-Math.PI/2,i=37*Math.cos(t),s=37*Math.sin(t)+3;return V`<text class="brc315-ring" x="${i}" y="${s}" text-anchor="middle">${e}</text>`})}
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
`,at=348,lt=318,nt=74;const dt={id:"vertical-pumpset",name:"Vertical multistage pump set",description:"Packaged booster skid: vertical multistage pumps on a common manifold with a bladder vessel and control panel. Choose how many pumps.",card:"pump-system-card",render:"svg",display:"negative",size:[494,452],options:[{key:"pumps",label:"Pumps",type:"number",min:1,max:10,default:3,help:"The skid widens to suit; roles are pump1_… through pumpN_…"}],build:function(e){const t=e.pumps??3,i=112+96*(t-1)+190,s=56+96*(t-1)+70,r=[...Array(t).keys()].map(e=>56+96*e),o=V`
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
    <rect x="18" y="${lt}" width="${s-40}" height="20" rx="10" fill="#aeb6bd" />
    <rect x="18" y="${lt}" width="${s-40}" height="7" rx="3.5" fill="#cfd6db" />

    <!-- Skid -->
    <rect x="10" y="${at}" width="${s-24}" height="16" rx="3" fill="#b6bdc3" />
    <rect x="10" y="${364}" width="${s-24}" height="8" fill="#98a0a7" />
    <rect x="22" y="${372}" width="26" height="18" fill="#a8b0b6" />
    <rect x="${s-60}" y="${372}" width="26" height="18" fill="#a8b0b6" />

    ${r.map(e=>function(e){return V`
    <!-- Fan cowl -->
    <rect x="${e-18}" y="${48}" width="36" height="26" rx="3" fill="#1e2124" />
    <!-- Motor -->
    <rect x="${e-27}" y="${nt}" width="54" height="96" rx="5" fill="#26292d" />
    <g stroke="#3a3f44" stroke-width="1.4">
      ${[0,1,2,3,4,5].map(t=>V`<line x1="${e-27}" y1="${88+13*t}"
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
    <rect x="${s-46}" y="232" width="44" height="86" rx="20" fill="url(#ps-vessel)" />
    <rect x="${s-30}" y="318" width="12" height="16" fill="#9aa3ab" />

    <!-- Control panel on its stand -->
    <rect x="${s+8}" y="56" width="150" height="212" rx="5"
          fill="url(#ps-panel)" stroke="#aeb4b9" stroke-width="1.5" />
    <rect x="${s+20}" y="150" width="126" height="64" rx="3" fill="#c6ccd1" />
    <g stroke="#b2b8bd" stroke-width="2">
      ${[0,1,2,3,4,5,6].map(e=>V`<line x1="${s+26}" y1="${158+8*e}"
                          x2="${s+140}" y2="${158+8*e}" />`)}
    </g>
    <rect x="${s+76}" y="${268}" width="14" height="96" fill="#b0b7bd" />
    <rect x="${s+40}" y="360" width="86" height="10" rx="2" fill="#9aa2a9" />

    <!-- Panel HMI -->
    <rect x="${s+36}" y="74" width="94" height="58" rx="3"
          fill="#14323d" stroke="#0d222a" stroke-width="2" />
  `,a=[{id:"press",role:"system_pressure",kind:"text",x:s+42,y:78,w:82,align:"middle",decimals:2,size:22},{id:"sp",role:"pressure_setpoint",kind:"text",x:s+42,y:106,w:82,align:"middle",label:"",decimals:2,size:13},{id:"fault",role:"common_fault",kind:"lamp",x:s+138,y:60,w:12,on:"#ef4444",off:"#3a2020"}];return r.forEach((e,t)=>{const i=t+1;a.push({id:`run${i}`,role:`pump${i}_run`,kind:"lamp",x:e-7,y:28,w:14,on:"#3ddc84",off:"#16281d"}),a.push({id:`flt${i}`,role:`pump${i}_fault`,kind:"lamp",x:e+14,y:28,w:10,on:"#ef4444",off:"#2a1717"}),a.push({id:`spd${i}`,role:`pump${i}_speed`,kind:"text",x:e-34,y:394,w:68,align:"middle",unit:"%",decimals:0,size:15,placeholder:""}),a.push({id:`amp${i}`,role:`pump${i}_current`,kind:"text",x:e-34,y:412,w:68,align:"middle",unit:"A",decimals:1,size:13,placeholder:""}),a.push({id:`lbl${i}`,role:"",kind:"text",text:`P${i}`,x:e-34,y:432,w:68,align:"middle",size:12})}),{size:[i,452],artNode:o,regions:a}},regions:[]},ct=80,ht=80,pt=240,ft=96,xt=104,ut=208,gt=[Re,Ee,Le,Me,Te,it,{id:"daikin-brc2e61",name:"Daikin BRC2E61",description:"Simplified wired controller: a small central display surrounded by large flat keys for power, temperature, fan and louvre.",emulates:"Daikin BRC2E61 simplified remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[400,400],artNode:V`
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
    <line x1="${ct}" y1="14" x2="${ct}" y2="386" />
    <line x1="${320}" y1="14" x2="${320}" y2="386" />
    <line x1="14" y1="${ht}" x2="386" y2="${ht}" />
    <line x1="14" y1="${320}" x2="386" y2="${320}" />
  </g>

  <!-- Power indicator and key, top centre -->
  <rect x="192" y="22" width="16" height="9" rx="2" fill="#5f6a5c" />
  <g transform="translate(193 40)" stroke="#4a5057" stroke-width="1.8" fill="none">
    <circle cx="7" cy="8" r="6.5" />
    <line x1="7" y1="0" x2="7" y2="7" />
  </g>

  <!-- Display surround and glass -->
  <rect x="${ct}" y="${ht}" width="${pt}" height="${pt}" rx="16"
        fill="url(#brc2-sur)" />
  <rect x="${ft}" y="${xt}" width="${ut}" height="${200}" rx="2"
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
`,regions:[{id:"mode",role:"hvac_mode",kind:"text",x:104,y:112,w:192,align:"middle",size:20},{id:"sp",role:"setpoint",kind:"text",x:106,y:208,w:104,align:"start",unit:"",decimals:0,size:48},{id:"spunit",role:"",kind:"text",text:"°C",x:192,y:232,w:24,align:"start",size:16},{id:"fan",role:"fan_speed",kind:"text",x:216,y:222,w:78,align:"end",size:16,placeholder:""},{id:"room",role:"room_temp",kind:"text",x:104,y:262,w:192,align:"middle",label:"",unit:"°C",decimals:0,size:16},{id:"k-power",role:"",kind:"button",x:120,y:12,w:160,h:62,text:"",action:"power_toggle"},{id:"k-up",role:"",kind:"button",x:326,y:14,w:66,h:60,text:"",action:"temp_up"},{id:"k-down",role:"",kind:"button",x:326,y:326,w:66,h:60,text:"",action:"temp_down"},{id:"k-mode",role:"",kind:"button",x:12,y:14,w:62,h:60,text:"",action:"mode_cycle"},{id:"k-fan",role:"",kind:"button",x:12,y:326,w:62,h:60,text:"",action:"fan_cycle"}]},je,{id:"daikin-brc315d7",name:"Daikin BRC315D7",description:"Schedule controller, cover closed: wide segmented display with timer rows, temperature and mode icons.",emulates:"Daikin BRC315D7 schedule remote controller",card:"hvac-controller-card",render:"svg",display:"positive",size:[400,400],artNode:ot,regions:[{id:"hdr",role:"",kind:"text",text:"ONETIME  DAILY  TIMER",x:114,y:94,w:160,align:"start",size:10},{id:"t1",role:"",kind:"text",text:"--:--",x:122,y:114,w:108,align:"middle",size:22},{id:"t2",role:"",kind:"text",text:"--:--",x:122,y:150,w:108,align:"middle",size:22},{id:"sp",role:"setpoint",kind:"text",x:244,y:106,w:64,align:"middle",unit:"",decimals:0,size:38},{id:"spunit",role:"",kind:"text",text:"°C",x:306,y:130,w:20,align:"start",size:12},{id:"room",role:"room_temp",kind:"text",x:244,y:154,w:64,align:"middle",label:"",decimals:0,size:16},{id:"mode",role:"hvac_mode",kind:"text",x:244,y:172,w:120,align:"start",size:11},{id:"k-power",role:"",kind:"button",x:290,y:56,w:72,h:20,text:"",action:"power_toggle"}]},dt];function mt(e){return gt.filter(t=>t.card===e)}function yt(e,t){const i=mt(e);return i.find(e=>e.id===t)??i[0]}const $t="bms-meter-card";class wt extends ne{constructor(){super(),this._page=""}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e;const t=yt($t,e.faceplate);this._page=e.page??t.pages?.[0]??""}getCardSize(){return 4}static getConfigElement(){return document.createElement(`${$t}-editor`)}static getStubConfig(){return{type:`custom:${$t}`,faceplate:"schneider-pm2200"}}_faceplate(){return yt($t,this._config?.faceplate)}_onAction(e){const t=this._faceplate().pages??[];if(!t.length)return;if("page"===e.action&&e.target)return void(this._page=e.target);const i=t.indexOf(this._page),s="prev_page"===e.action?-1:1;this._page=t[(i+s+t.length)%t.length]}render(){if(!this._config||!this.hass)return F;const e=this._faceplate(),t=[...new Set(e.regions.map(e=>e.role))].filter(Boolean),i=[...new Set(t.flatMap(e=>pe[e]??[e]))],s=fe(this.hass,i,this._config.entities??{},this._config.device?function(e,t){const i=e.entities;if(i){const e=Object.keys(i).filter(e=>i[e]?.device_id===t);if(e.length)return e}return Object.keys(e.states).filter(e=>e.includes(t))}(this.hass,this._config.device):[]),r=i.filter(e=>!s[e]);return j`
      <ha-card>
        ${this._config.name?j`<div class="title">${this._config.name}</div>`:F}
        <div class="frame">
          ${ge({hass:this.hass,faceplate:e,bindings:s,page:this._page,onAction:e=>this._onAction(e)})}
        </div>
        ${r.length===i.length?j`<div class="hint">
              No entities bound. Set them in the card editor, or point the card
              at a device.
            </div>`:F}
      </ha-card>
    `}}wt.properties={hass:{attribute:!1},_config:{state:!0},_page:{state:!0}},wt.styles=o`
    ha-card {
      padding: 12px;
      overflow: hidden;
    }
    .title {
      font-weight: 600;
      padding: 0 4px 8px;
      color: var(--primary-text-color);
    }
    .frame {
      width: 100%;
    }
    .faceplate {
      width: 100%;
      height: auto;
      display: block;
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
    .hint {
      padding: 10px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;class bt extends ne{setConfig(e){this._config=e}_emit(e){const t={...this._config,...e};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){if(!this._config)return F;const e=mt($t),t=yt($t,this._config.faceplate);return j`
      <div class="editor">
        <label>
          Faceplate
          <select
            @change=${e=>this._emit({faceplate:e.target.value})}
          >
            ${e.map(e=>j`<option value=${e.id} ?selected=${e.id===t.id}>
                ${e.name}
              </option>`)}
          </select>
        </label>
        <p class="note">${t.description??""}</p>
        ${t.emulates?j`<p class="note">Emulates ${t.emulates}. Product names
              and marks belong to their respective owners.</p>`:F}
        <label>
          Name
          <input
            type="text"
            .value=${this._config.name??""}
            @change=${e=>this._emit({name:e.target.value})}
          />
        </label>
        <p class="note">
          Entities are matched by role from the device's own points. Override
          any of them in YAML with an <code>entities:</code> block.
        </p>
      </div>
    `}}bt.properties={hass:{attribute:!1},_config:{state:!0}},bt.styles=o`
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
      margin: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
  `,customElements.define($t,wt),customElements.define(`${$t}-editor`,bt),window.customCards??=[],window.customCards.push({type:$t,name:"BMS Meter Card",description:"A power meter that looks like a power meter.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-Cards"});const kt="hvac-controller-card",_t=["off","cool","heat","dry","fan_only","auto"];class vt extends ne{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 5}static getConfigElement(){return document.createElement(`${kt}-editor`)}static getStubConfig(){return{type:`custom:${kt}`,faceplate:"daikin-brc1e63"}}_faceplate(){return yt(kt,this._config?.faceplate)}_setpoint(){if(!this.hass||!this._config)return;if(this._config.climate)return ue(this.hass,this._config.climate,"setpoint").value;const e=this._config.entities?.setpoint;return e?Number(this.hass.states[e]?.state):void 0}async _onAction(e){if(!this.hass||!this._config)return;const t=this._config.climate;if(!t)return void this._notify("This controller is read-only — no climate entity is set.");const i=this._setpoint();switch(e.action){case"temp_up":case"temp_down":{if(void 0===i)return;const s="temp_up"===e.action?.5:-.5;return void await this.hass.callService("climate","set_temperature",{entity_id:t,temperature:Math.round(2*(i+s))/2})}case"power_toggle":{const e="off"!==this.hass.states[t]?.state;return void await this.hass.callService("climate",e?"turn_off":"turn_on",{entity_id:t})}case"fan_cycle":{const e=this.hass.states[t]?.attributes.fan_modes??[];if(!e.length)return;const i=this.hass.states[t]?.attributes.fan_mode,s=e[(e.indexOf(i)+1)%e.length];return void await this.hass.callService("climate","set_fan_mode",{entity_id:t,fan_mode:s})}case"mode_cycle":{const e=this.hass.states[t]?.attributes.hvac_modes??_t,i=this.hass.states[t]?.state??e[0],s=e[(e.indexOf(i)+1)%e.length];return void await this.hass.callService("climate","set_hvac_mode",{entity_id:t,hvac_mode:s})}default:return}}_notify(e){this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:e},bubbles:!0,composed:!0}))}render(){if(!this._config||!this.hass)return F;const e=this._faceplate(),t=[...new Set(e.regions.map(e=>e.role))].filter(Boolean),i=fe(this.hass,t,this._config.entities??{});return j`
      <ha-card>
        ${this._config.name?j`<div class="title">${this._config.name}</div>`:F}
        ${this._config.climate||this._config.entities?F:j`<div class="hint">
              Nothing bound yet. Choose a climate entity in the editor, or map
              entities per role in YAML.
            </div>`}
        <div class="frame">
          ${ge({hass:this.hass,climate:this._config.climate,faceplate:e,bindings:i,page:"",onAction:e=>{this._onAction(e)}})}
        </div>
      </ha-card>
    `}}vt.properties={hass:{attribute:!1},_config:{state:!0}},vt.styles=o`
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
  `;class At extends ne{setConfig(e){this._config=e}_emit(e){const t={...this._config,...e};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){if(!this._config||!this.hass)return F;const e=mt(kt),t=yt(kt,this._config.faceplate),i=Object.keys(this.hass.states).filter(e=>e.startsWith("climate.")).sort();return j`
      <div class="editor">
        <label>
          Controller
          <select @change=${e=>this._emit({faceplate:e.target.value})}>
            ${e.map(e=>j`<option value=${e.id} ?selected=${e.id===t.id}>
                ${e.name}
              </option>`)}
          </select>
        </label>
        <p class="note">${t.description??""}</p>
        <label>
          Climate entity
          <select @change=${e=>this._emit({climate:e.target.value})}>
            <option value="">— none —</option>
            ${i.map(e=>j`<option value=${e} ?selected=${e===this._config?.climate}>
                ${e}
              </option>`)}
          </select>
        </label>
        ${i.length?F:j`<p class="warn">
              No climate entities exist on this system. Without one the
              controller is read-only, and its readings must be mapped
              per-role in YAML.
            </p>`}
        ${t.emulates?j`<p class="note">Emulates ${t.emulates}. Product names
              and marks belong to their respective owners.</p>`:F}
      </div>
    `}}At.properties={hass:{attribute:!1},_config:{state:!0}},At.styles=o`
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
  `,customElements.define(kt,vt),customElements.define(`${kt}-editor`,At),window.customCards??=[],window.customCards.push({type:kt,name:"HVAC Controller Card",description:"A wall controller that looks and behaves like the real one.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-Cards"});const zt="pump-system-card";class Ct extends ne{setConfig(e){if(!e)throw new Error("Invalid configuration");this._config=e}getCardSize(){return 5}static getConfigElement(){return document.createElement(`${zt}-editor`)}static getStubConfig(){return{type:`custom:${zt}`,faceplate:"vertical-pumpset",options:{pumps:3}}}_faceplate(){return function(e,t={}){if(!e.build)return e;const i={};for(const s of e.options??[]){const e=t[s.key];i[s.key]="number"==typeof e&&Number.isFinite(e)?Math.max(s.min,Math.min(s.max,e)):s.default}return{...e,...e.build(i)}}(yt(zt,this._config?.faceplate),this._config?.options??{})}render(){if(!this._config||!this.hass)return F;const e=this._faceplate(),t=[...new Set(e.regions.map(e=>e.role))].filter(Boolean),i=fe(this.hass,t,this._config.entities??{}),s=t.filter(e=>i[e]).length;return j`
      <ha-card>
        ${this._config.name?j`<div class="title">${this._config.name}</div>`:F}
        <div class="frame">
          ${ge({hass:this.hass,faceplate:e,bindings:i,page:"",onAction:()=>{}})}
        </div>
        ${0===s?j`<div class="hint">
              Nothing bound. Map <code>pump1_run</code>,
              <code>system_pressure</code> and the rest in YAML, or point the
              card at a device typed as a pump set.
            </div>`:F}
      </ha-card>
    `}}Ct.properties={hass:{attribute:!1},_config:{state:!0}},Ct.styles=o`
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
    .hint {
      padding: 8px 4px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
  `;class Et extends ne{setConfig(e){this._config=e}_emit(e){const t={...this._config,...e};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){if(!this._config)return F;const e=mt(zt),t=yt(zt,this._config.faceplate),i=this._config.options??{};return j`
      <div class="editor">
        <label>
          Faceplate
          <select @change=${e=>this._emit({faceplate:e.target.value})}>
            ${e.map(e=>j`<option value=${e.id} ?selected=${e.id===t.id}>
                ${e.name}
              </option>`)}
          </select>
        </label>
        ${(t.options??[]).map(e=>j`
            <label>
              ${e.label}
              <input
                type="number"
                min=${e.min}
                max=${e.max}
                .value=${String(i[e.key]??e.default)}
                @change=${t=>this._emit({options:{...i,[e.key]:Number(t.target.value)}})}
              />
              ${e.help?j`<span class="note">${e.help}</span>`:F}
            </label>
          `)}
        <p class="note">${t.description??""}</p>
      </div>
    `}}Et.properties={hass:{attribute:!1},_config:{state:!0}},Et.styles=o`
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
      margin: 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
  `,customElements.define(zt,Ct),customElements.define(`${zt}-editor`,Et),window.customCards??=[],window.customCards.push({type:zt,name:"Pump System Card",description:"A booster set from one pump to ten, drawn to suit.",preview:!0,documentationURL:"https://github.com/rellis-erigon/HA-rellis-erigon-Cards"});
