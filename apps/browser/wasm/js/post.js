var o=(Z,Q)=>()=>(Q||Z((Q={exports:{}}).exports,Q),Q.exports);var f=o((E1)=>{E1.byteLength=H1;E1.toByteArray=N1;E1.fromByteArray=z1;var H=[],w=[],w1=typeof Uint8Array!=="undefined"?Uint8Array:Array,L="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(j=0,B=L.length;j<B;++j)H[j]=L[j],w[L.charCodeAt(j)]=j;var j,B;w[45]=62;w[95]=63;function s(Z){var Q=Z.length;if(Q%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var Y=Z.indexOf("=");if(Y===-1)Y=Q;var $=Y===Q?0:4-Y%4;return[Y,$]}function H1(Z){var Q=s(Z),Y=Q[0],$=Q[1];return(Y+$)*3/4-$}function T1(Z,Q,Y){return(Q+Y)*3/4-Y}function N1(Z){var Q,Y=s(Z),$=Y[0],J=Y[1],D=new w1(T1(Z,$,J)),F=0,q=J>0?$-4:$,K;for(K=0;K<q;K+=4)Q=w[Z.charCodeAt(K)]<<18|w[Z.charCodeAt(K+1)]<<12|w[Z.charCodeAt(K+2)]<<6|w[Z.charCodeAt(K+3)],D[F++]=Q>>16&255,D[F++]=Q>>8&255,D[F++]=Q&255;if(J===2)Q=w[Z.charCodeAt(K)]<<2|w[Z.charCodeAt(K+1)]>>4,D[F++]=Q&255;if(J===1)Q=w[Z.charCodeAt(K)]<<10|w[Z.charCodeAt(K+1)]<<4|w[Z.charCodeAt(K+2)]>>2,D[F++]=Q>>8&255,D[F++]=Q&255;return D}function C1(Z){return H[Z>>18&63]+H[Z>>12&63]+H[Z>>6&63]+H[Z&63]}function j1(Z,Q,Y){var $,J=[];for(var D=Q;D<Y;D+=3)$=(Z[D]<<16&16711680)+(Z[D+1]<<8&65280)+(Z[D+2]&255),J.push(C1($));return J.join("")}function z1(Z){var Q,Y=Z.length,$=Y%3,J=[],D=16383;for(var F=0,q=Y-$;F<q;F+=D)J.push(j1(Z,F,F+D>q?q:F+D));if($===1)Q=Z[Y-1],J.push(H[Q>>2]+H[Q<<4&63]+"==");else if($===2)Q=(Z[Y-2]<<8)+Z[Y-1],J.push(H[Q>>10]+H[Q>>4&63]+H[Q<<2&63]+"=");return J.join("")}});var t=o((k1)=>{/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */k1.read=function(Z,Q,Y,$,J){var D,F,q=J*8-$-1,K=(1<<q)-1,X=K>>1,W=-7,U=Y?J-1:0,G=Y?-1:1,_=Z[Q+U];U+=G,D=_&(1<<-W)-1,_>>=-W,W+=q;for(;W>0;D=D*256+Z[Q+U],U+=G,W-=8);F=D&(1<<-W)-1,D>>=-W,W+=$;for(;W>0;F=F*256+Z[Q+U],U+=G,W-=8);if(D===0)D=1-X;else if(D===K)return F?NaN:(_?-1:1)*(1/0);else F=F+Math.pow(2,$),D=D-X;return(_?-1:1)*F*Math.pow(2,D-$)};k1.write=function(Z,Q,Y,$,J,D){var F,q,K,X=D*8-J-1,W=(1<<X)-1,U=W>>1,G=J===23?Math.pow(2,-24)-Math.pow(2,-77):0,_=$?0:D-1,x=$?1:-1,O=Q<0||Q===0&&1/Q<0?1:0;if(Q=Math.abs(Q),isNaN(Q)||Q===1/0)q=isNaN(Q)?1:0,F=W;else{if(F=Math.floor(Math.log(Q)/Math.LN2),Q*(K=Math.pow(2,-F))<1)F--,K*=2;if(F+U>=1)Q+=G/K;else Q+=G*Math.pow(2,1-U);if(Q*K>=2)F++,K/=2;if(F+U>=W)q=0,F=W;else if(F+U>=1)q=(Q*K-1)*Math.pow(2,J),F=F+U;else q=Q*Math.pow(2,U-1)*Math.pow(2,J),F=0}for(;J>=8;Z[Y+_]=q&255,_+=x,q/=256,J-=8);F=F<<J|q,X+=J;for(;X>0;Z[Y+_]=F&255,_+=x,F/=256,X-=8);Z[Y+_-x]|=O*128}});/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */var y=f(),I=t(),e=typeof Symbol==="function"&&typeof Symbol.for==="function"?Symbol.for("nodejs.util.inspect.custom"):null;var u=M;var V1=50;var h=2147483647;M.TYPED_ARRAY_SUPPORT=O1();if(!M.TYPED_ARRAY_SUPPORT&&typeof console!=="undefined"&&typeof console.error==="function")console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function O1(){try{let Z=new Uint8Array(1),Q={foo:function(){return 42}};return Object.setPrototypeOf(Q,Uint8Array.prototype),Object.setPrototypeOf(Z,Q),Z.foo()===42}catch(Z){return!1}}Object.defineProperty(M.prototype,"parent",{enumerable:!0,get:function(){if(!M.isBuffer(this))return;return this.buffer}});Object.defineProperty(M.prototype,"offset",{enumerable:!0,get:function(){if(!M.isBuffer(this))return;return this.byteOffset}});function N(Z){if(Z>h)throw new RangeError('The value "'+Z+'" is invalid for option "size"');let Q=new Uint8Array(Z);return Object.setPrototypeOf(Q,M.prototype),Q}function M(Z,Q,Y){if(typeof Z==="number"){if(typeof Q==="string")throw new TypeError('The "string" argument must be of type string. Received type number');return g(Z)}return $1(Z,Q,Y)}M.poolSize=8192;function $1(Z,Q,Y){if(typeof Z==="string")return m1(Z,Q);if(ArrayBuffer.isView(Z))return L1(Z);if(Z==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof Z);if(T(Z,ArrayBuffer)||Z&&T(Z.buffer,ArrayBuffer))return v(Z,Q,Y);if(typeof SharedArrayBuffer!=="undefined"&&(T(Z,SharedArrayBuffer)||Z&&T(Z.buffer,SharedArrayBuffer)))return v(Z,Q,Y);if(typeof Z==="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let $=Z.valueOf&&Z.valueOf();if($!=null&&$!==Z)return M.from($,Q,Y);let J=B1(Z);if(J)return J;if(typeof Symbol!=="undefined"&&Symbol.toPrimitive!=null&&typeof Z[Symbol.toPrimitive]==="function")return M.from(Z[Symbol.toPrimitive]("string"),Q,Y);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof Z)}M.from=function(Z,Q,Y){return $1(Z,Q,Y)};Object.setPrototypeOf(M.prototype,Uint8Array.prototype);Object.setPrototypeOf(M,Uint8Array);function J1(Z){if(typeof Z!=="number")throw new TypeError('"size" argument must be of type number');else if(Z<0)throw new RangeError('The value "'+Z+'" is invalid for option "size"')}function p1(Z,Q,Y){if(J1(Z),Z<=0)return N(Z);if(Q!==void 0)return typeof Y==="string"?N(Z).fill(Q,Y):N(Z).fill(Q);return N(Z)}M.alloc=function(Z,Q,Y){return p1(Z,Q,Y)};function g(Z){return J1(Z),N(Z<0?0:d(Z)|0)}M.allocUnsafe=function(Z){return g(Z)};M.allocUnsafeSlow=function(Z){return g(Z)};function m1(Z,Q){if(typeof Q!=="string"||Q==="")Q="utf8";if(!M.isEncoding(Q))throw new TypeError("Unknown encoding: "+Q);let Y=D1(Z,Q)|0,$=N(Y),J=$.write(Z,Q);if(J!==Y)$=$.slice(0,J);return $}function c(Z){let Q=Z.length<0?0:d(Z.length)|0,Y=N(Q);for(let $=0;$<Q;$+=1)Y[$]=Z[$]&255;return Y}function L1(Z){if(T(Z,Uint8Array)){let Q=new Uint8Array(Z);return v(Q.buffer,Q.byteOffset,Q.byteLength)}return c(Z)}function v(Z,Q,Y){if(Q<0||Z.byteLength<Q)throw new RangeError('"offset" is outside of buffer bounds');if(Z.byteLength<Q+(Y||0))throw new RangeError('"length" is outside of buffer bounds');let $;if(Q===void 0&&Y===void 0)$=new Uint8Array(Z);else if(Y===void 0)$=new Uint8Array(Z,Q);else $=new Uint8Array(Z,Q,Y);return Object.setPrototypeOf($,M.prototype),$}function B1(Z){if(M.isBuffer(Z)){let Q=d(Z.length)|0,Y=N(Q);if(Y.length===0)return Y;return Z.copy(Y,0,0,Q),Y}if(Z.length!==void 0){if(typeof Z.length!=="number"||i(Z.length))return N(0);return c(Z)}if(Z.type==="Buffer"&&Array.isArray(Z.data))return c(Z.data)}function d(Z){if(Z>=h)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+h.toString(16)+" bytes");return Z|0}M.isBuffer=function Z(Q){return Q!=null&&Q._isBuffer===!0&&Q!==M.prototype};M.compare=function Z(Q,Y){if(T(Q,Uint8Array))Q=M.from(Q,Q.offset,Q.byteLength);if(T(Y,Uint8Array))Y=M.from(Y,Y.offset,Y.byteLength);if(!M.isBuffer(Q)||!M.isBuffer(Y))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(Q===Y)return 0;let $=Q.length,J=Y.length;for(let D=0,F=Math.min($,J);D<F;++D)if(Q[D]!==Y[D]){$=Q[D],J=Y[D];break}if($<J)return-1;if(J<$)return 1;return 0};M.isEncoding=function Z(Q){switch(String(Q).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};M.concat=function Z(Q,Y){if(!Array.isArray(Q))throw new TypeError('"list" argument must be an Array of Buffers');if(Q.length===0)return M.alloc(0);let $;if(Y===void 0){Y=0;for($=0;$<Q.length;++$)Y+=Q[$].length}let J=M.allocUnsafe(Y),D=0;for($=0;$<Q.length;++$){let F=Q[$];if(T(F,Uint8Array))if(D+F.length>J.length){if(!M.isBuffer(F))F=M.from(F);F.copy(J,D)}else Uint8Array.prototype.set.call(J,F,D);else if(!M.isBuffer(F))throw new TypeError('"list" argument must be an Array of Buffers');else F.copy(J,D);D+=F.length}return J};function D1(Z,Q){if(M.isBuffer(Z))return Z.length;if(ArrayBuffer.isView(Z)||T(Z,ArrayBuffer))return Z.byteLength;if(typeof Z!=="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof Z);let Y=Z.length,$=arguments.length>2&&arguments[2]===!0;if(!$&&Y===0)return 0;let J=!1;for(;;)switch(Q){case"ascii":case"latin1":case"binary":return Y;case"utf8":case"utf-8":return b(Z).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Y*2;case"hex":return Y>>>1;case"base64":return R1(Z).length;default:if(J)return $?-1:b(Z).length;Q=(""+Q).toLowerCase(),J=!0}}M.byteLength=D1;function y1(Z,Q,Y){let $=!1;if(Q===void 0||Q<0)Q=0;if(Q>this.length)return"";if(Y===void 0||Y>this.length)Y=this.length;if(Y<=0)return"";if(Y>>>=0,Q>>>=0,Y<=Q)return"";if(!Z)Z="utf8";while(!0)switch(Z){case"hex":return a1(this,Q,Y);case"utf8":case"utf-8":return M1(this,Q,Y);case"ascii":return i1(this,Q,Y);case"latin1":case"binary":return u1(this,Q,Y);case"base64":return d1(this,Q,Y);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return r1(this,Q,Y);default:if($)throw new TypeError("Unknown encoding: "+Z);Z=(Z+"").toLowerCase(),$=!0}}M.prototype._isBuffer=!0;function E(Z,Q,Y){let $=Z[Q];Z[Q]=Z[Y],Z[Y]=$}M.prototype.swap16=function Z(){let Q=this.length;if(Q%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let Y=0;Y<Q;Y+=2)E(this,Y,Y+1);return this};M.prototype.swap32=function Z(){let Q=this.length;if(Q%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let Y=0;Y<Q;Y+=4)E(this,Y,Y+3),E(this,Y+1,Y+2);return this};M.prototype.swap64=function Z(){let Q=this.length;if(Q%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let Y=0;Y<Q;Y+=8)E(this,Y,Y+7),E(this,Y+1,Y+6),E(this,Y+2,Y+5),E(this,Y+3,Y+4);return this};M.prototype.toString=function Z(){let Q=this.length;if(Q===0)return"";if(arguments.length===0)return M1(this,0,Q);return y1.apply(this,arguments)};M.prototype.toLocaleString=M.prototype.toString;M.prototype.equals=function Z(Q){if(!M.isBuffer(Q))throw new TypeError("Argument must be a Buffer");if(this===Q)return!0;return M.compare(this,Q)===0};M.prototype.inspect=function Z(){let Q="",Y=V1;if(Q=this.toString("hex",0,Y).replace(/(.{2})/g,"$1 ").trim(),this.length>Y)Q+=" ... ";return"<Buffer "+Q+">"};if(e)M.prototype[e]=M.prototype.inspect;M.prototype.compare=function Z(Q,Y,$,J,D){if(T(Q,Uint8Array))Q=M.from(Q,Q.offset,Q.byteLength);if(!M.isBuffer(Q))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof Q);if(Y===void 0)Y=0;if($===void 0)$=Q?Q.length:0;if(J===void 0)J=0;if(D===void 0)D=this.length;if(Y<0||$>Q.length||J<0||D>this.length)throw new RangeError("out of range index");if(J>=D&&Y>=$)return 0;if(J>=D)return-1;if(Y>=$)return 1;if(Y>>>=0,$>>>=0,J>>>=0,D>>>=0,this===Q)return 0;let F=D-J,q=$-Y,K=Math.min(F,q),X=this.slice(J,D),W=Q.slice(Y,$);for(let U=0;U<K;++U)if(X[U]!==W[U]){F=X[U],q=W[U];break}if(F<q)return-1;if(q<F)return 1;return 0};function F1(Z,Q,Y,$,J){if(Z.length===0)return-1;if(typeof Y==="string")$=Y,Y=0;else if(Y>2147483647)Y=2147483647;else if(Y<-2147483648)Y=-2147483648;if(Y=+Y,i(Y))Y=J?0:Z.length-1;if(Y<0)Y=Z.length+Y;if(Y>=Z.length)if(J)return-1;else Y=Z.length-1;else if(Y<0)if(J)Y=0;else return-1;if(typeof Q==="string")Q=M.from(Q,$);if(M.isBuffer(Q)){if(Q.length===0)return-1;return Q1(Z,Q,Y,$,J)}else if(typeof Q==="number"){if(Q=Q&255,typeof Uint8Array.prototype.indexOf==="function")if(J)return Uint8Array.prototype.indexOf.call(Z,Q,Y);else return Uint8Array.prototype.lastIndexOf.call(Z,Q,Y);return Q1(Z,[Q],Y,$,J)}throw new TypeError("val must be string, number or Buffer")}function Q1(Z,Q,Y,$,J){let D=1,F=Z.length,q=Q.length;if($!==void 0){if($=String($).toLowerCase(),$==="ucs2"||$==="ucs-2"||$==="utf16le"||$==="utf-16le"){if(Z.length<2||Q.length<2)return-1;D=2,F/=2,q/=2,Y/=2}}function K(W,U){if(D===1)return W[U];else return W.readUInt16BE(U*D)}let X;if(J){let W=-1;for(X=Y;X<F;X++)if(K(Z,X)===K(Q,W===-1?0:X-W)){if(W===-1)W=X;if(X-W+1===q)return W*D}else{if(W!==-1)X-=X-W;W=-1}}else{if(Y+q>F)Y=F-q;for(X=Y;X>=0;X--){let W=!0;for(let U=0;U<q;U++)if(K(Z,X+U)!==K(Q,U)){W=!1;break}if(W)return X}}return-1}M.prototype.includes=function Z(Q,Y,$){return this.indexOf(Q,Y,$)!==-1};M.prototype.indexOf=function Z(Q,Y,$){return F1(this,Q,Y,$,!0)};M.prototype.lastIndexOf=function Z(Q,Y,$){return F1(this,Q,Y,$,!1)};function h1(Z,Q,Y,$){Y=Number(Y)||0;let J=Z.length-Y;if(!$)$=J;else if($=Number($),$>J)$=J;let D=Q.length;if($>D/2)$=D/2;let F;for(F=0;F<$;++F){let q=parseInt(Q.substr(F*2,2),16);if(i(q))return F;Z[Y+F]=q}return F}function c1(Z,Q,Y,$){return m(b(Q,Z.length-Y),Z,Y,$)}function v1(Z,Q,Y,$){return m(f1(Q),Z,Y,$)}function b1(Z,Q,Y,$){return m(R1(Q),Z,Y,$)}function g1(Z,Q,Y,$){return m(t1(Q,Z.length-Y),Z,Y,$)}M.prototype.write=function Z(Q,Y,$,J){if(Y===void 0)J="utf8",$=this.length,Y=0;else if($===void 0&&typeof Y==="string")J=Y,$=this.length,Y=0;else if(isFinite(Y))if(Y=Y>>>0,isFinite($)){if($=$>>>0,J===void 0)J="utf8"}else J=$,$=void 0;else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let D=this.length-Y;if($===void 0||$>D)$=D;if(Q.length>0&&($<0||Y<0)||Y>this.length)throw new RangeError("Attempt to write outside buffer bounds");if(!J)J="utf8";let F=!1;for(;;)switch(J){case"hex":return h1(this,Q,Y,$);case"utf8":case"utf-8":return c1(this,Q,Y,$);case"ascii":case"latin1":case"binary":return v1(this,Q,Y,$);case"base64":return b1(this,Q,Y,$);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return g1(this,Q,Y,$);default:if(F)throw new TypeError("Unknown encoding: "+J);J=(""+J).toLowerCase(),F=!0}};M.prototype.toJSON=function Z(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function d1(Z,Q,Y){if(Q===0&&Y===Z.length)return y.fromByteArray(Z);else return y.fromByteArray(Z.slice(Q,Y))}function M1(Z,Q,Y){Y=Math.min(Z.length,Y);let $=[],J=Q;while(J<Y){let D=Z[J],F=null,q=D>239?4:D>223?3:D>191?2:1;if(J+q<=Y){let K,X,W,U;switch(q){case 1:if(D<128)F=D;break;case 2:if(K=Z[J+1],(K&192)===128){if(U=(D&31)<<6|K&63,U>127)F=U}break;case 3:if(K=Z[J+1],X=Z[J+2],(K&192)===128&&(X&192)===128){if(U=(D&15)<<12|(K&63)<<6|X&63,U>2047&&(U<55296||U>57343))F=U}break;case 4:if(K=Z[J+1],X=Z[J+2],W=Z[J+3],(K&192)===128&&(X&192)===128&&(W&192)===128){if(U=(D&15)<<18|(K&63)<<12|(X&63)<<6|W&63,U>65535&&U<1114112)F=U}}}if(F===null)F=65533,q=1;else if(F>65535)F-=65536,$.push(F>>>10&1023|55296),F=56320|F&1023;$.push(F),J+=q}return l1($)}var Y1=4096;function l1(Z){let Q=Z.length;if(Q<=Y1)return String.fromCharCode.apply(String,Z);let Y="",$=0;while($<Q)Y+=String.fromCharCode.apply(String,Z.slice($,$+=Y1));return Y}function i1(Z,Q,Y){let $="";Y=Math.min(Z.length,Y);for(let J=Q;J<Y;++J)$+=String.fromCharCode(Z[J]&127);return $}function u1(Z,Q,Y){let $="";Y=Math.min(Z.length,Y);for(let J=Q;J<Y;++J)$+=String.fromCharCode(Z[J]);return $}function a1(Z,Q,Y){let $=Z.length;if(!Q||Q<0)Q=0;if(!Y||Y<0||Y>$)Y=$;let J="";for(let D=Q;D<Y;++D)J+=e1[Z[D]];return J}function r1(Z,Q,Y){let $=Z.slice(Q,Y),J="";for(let D=0;D<$.length-1;D+=2)J+=String.fromCharCode($[D]+$[D+1]*256);return J}M.prototype.slice=function Z(Q,Y){let $=this.length;if(Q=~~Q,Y=Y===void 0?$:~~Y,Q<0){if(Q+=$,Q<0)Q=0}else if(Q>$)Q=$;if(Y<0){if(Y+=$,Y<0)Y=0}else if(Y>$)Y=$;if(Y<Q)Y=Q;let J=this.subarray(Q,Y);return Object.setPrototypeOf(J,M.prototype),J};function R(Z,Q,Y){if(Z%1!==0||Z<0)throw new RangeError("offset is not uint");if(Z+Q>Y)throw new RangeError("Trying to access beyond buffer length")}M.prototype.readUintLE=M.prototype.readUIntLE=function Z(Q,Y,$){if(Q=Q>>>0,Y=Y>>>0,!$)R(Q,Y,this.length);let J=this[Q],D=1,F=0;while(++F<Y&&(D*=256))J+=this[Q+F]*D;return J};M.prototype.readUintBE=M.prototype.readUIntBE=function Z(Q,Y,$){if(Q=Q>>>0,Y=Y>>>0,!$)R(Q,Y,this.length);let J=this[Q+--Y],D=1;while(Y>0&&(D*=256))J+=this[Q+--Y]*D;return J};M.prototype.readUint8=M.prototype.readUInt8=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,1,this.length);return this[Q]};M.prototype.readUint16LE=M.prototype.readUInt16LE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,2,this.length);return this[Q]|this[Q+1]<<8};M.prototype.readUint16BE=M.prototype.readUInt16BE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,2,this.length);return this[Q]<<8|this[Q+1]};M.prototype.readUint32LE=M.prototype.readUInt32LE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,4,this.length);return(this[Q]|this[Q+1]<<8|this[Q+2]<<16)+this[Q+3]*16777216};M.prototype.readUint32BE=M.prototype.readUInt32BE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,4,this.length);return this[Q]*16777216+(this[Q+1]<<16|this[Q+2]<<8|this[Q+3])};M.prototype.readBigUInt64LE=z(function Z(Q){Q=Q>>>0,k(Q,"offset");let Y=this[Q],$=this[Q+7];if(Y===void 0||$===void 0)S(Q,this.length-8);let J=Y+this[++Q]*256+this[++Q]*65536+this[++Q]*16777216,D=this[++Q]+this[++Q]*256+this[++Q]*65536+$*16777216;return BigInt(J)+(BigInt(D)<<BigInt(32))});M.prototype.readBigUInt64BE=z(function Z(Q){Q=Q>>>0,k(Q,"offset");let Y=this[Q],$=this[Q+7];if(Y===void 0||$===void 0)S(Q,this.length-8);let J=Y*16777216+this[++Q]*65536+this[++Q]*256+this[++Q],D=this[++Q]*16777216+this[++Q]*65536+this[++Q]*256+$;return(BigInt(J)<<BigInt(32))+BigInt(D)});M.prototype.readIntLE=function Z(Q,Y,$){if(Q=Q>>>0,Y=Y>>>0,!$)R(Q,Y,this.length);let J=this[Q],D=1,F=0;while(++F<Y&&(D*=256))J+=this[Q+F]*D;if(D*=128,J>=D)J-=Math.pow(2,8*Y);return J};M.prototype.readIntBE=function Z(Q,Y,$){if(Q=Q>>>0,Y=Y>>>0,!$)R(Q,Y,this.length);let J=Y,D=1,F=this[Q+--J];while(J>0&&(D*=256))F+=this[Q+--J]*D;if(D*=128,F>=D)F-=Math.pow(2,8*Y);return F};M.prototype.readInt8=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,1,this.length);if(!(this[Q]&128))return this[Q];return(255-this[Q]+1)*-1};M.prototype.readInt16LE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,2,this.length);let $=this[Q]|this[Q+1]<<8;return $&32768?$|4294901760:$};M.prototype.readInt16BE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,2,this.length);let $=this[Q+1]|this[Q]<<8;return $&32768?$|4294901760:$};M.prototype.readInt32LE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,4,this.length);return this[Q]|this[Q+1]<<8|this[Q+2]<<16|this[Q+3]<<24};M.prototype.readInt32BE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,4,this.length);return this[Q]<<24|this[Q+1]<<16|this[Q+2]<<8|this[Q+3]};M.prototype.readBigInt64LE=z(function Z(Q){Q=Q>>>0,k(Q,"offset");let Y=this[Q],$=this[Q+7];if(Y===void 0||$===void 0)S(Q,this.length-8);let J=this[Q+4]+this[Q+5]*256+this[Q+6]*65536+($<<24);return(BigInt(J)<<BigInt(32))+BigInt(Y+this[++Q]*256+this[++Q]*65536+this[++Q]*16777216)});M.prototype.readBigInt64BE=z(function Z(Q){Q=Q>>>0,k(Q,"offset");let Y=this[Q],$=this[Q+7];if(Y===void 0||$===void 0)S(Q,this.length-8);let J=(Y<<24)+this[++Q]*65536+this[++Q]*256+this[++Q];return(BigInt(J)<<BigInt(32))+BigInt(this[++Q]*16777216+this[++Q]*65536+this[++Q]*256+$)});M.prototype.readFloatLE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,4,this.length);return I.read(this,Q,!0,23,4)};M.prototype.readFloatBE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,4,this.length);return I.read(this,Q,!1,23,4)};M.prototype.readDoubleLE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,8,this.length);return I.read(this,Q,!0,52,8)};M.prototype.readDoubleBE=function Z(Q,Y){if(Q=Q>>>0,!Y)R(Q,8,this.length);return I.read(this,Q,!1,52,8)};function V(Z,Q,Y,$,J,D){if(!M.isBuffer(Z))throw new TypeError('"buffer" argument must be a Buffer instance');if(Q>J||Q<D)throw new RangeError('"value" argument is out of bounds');if(Y+$>Z.length)throw new RangeError("Index out of range")}M.prototype.writeUintLE=M.prototype.writeUIntLE=function Z(Q,Y,$,J){if(Q=+Q,Y=Y>>>0,$=$>>>0,!J){let q=Math.pow(2,8*$)-1;V(this,Q,Y,$,q,0)}let D=1,F=0;this[Y]=Q&255;while(++F<$&&(D*=256))this[Y+F]=Q/D&255;return Y+$};M.prototype.writeUintBE=M.prototype.writeUIntBE=function Z(Q,Y,$,J){if(Q=+Q,Y=Y>>>0,$=$>>>0,!J){let q=Math.pow(2,8*$)-1;V(this,Q,Y,$,q,0)}let D=$-1,F=1;this[Y+D]=Q&255;while(--D>=0&&(F*=256))this[Y+D]=Q/F&255;return Y+$};M.prototype.writeUint8=M.prototype.writeUInt8=function Z(Q,Y,$){if(Q=+Q,Y=Y>>>0,!$)V(this,Q,Y,1,255,0);return this[Y]=Q&255,Y+1};M.prototype.writeUint16LE=M.prototype.writeUInt16LE=function Z(Q,Y,$){if(Q=+Q,Y=Y>>>0,!$)V(this,Q,Y,2,65535,0);return this[Y]=Q&255,this[Y+1]=Q>>>8,Y+2};M.prototype.writeUint16BE=M.prototype.writeUInt16BE=function Z(Q,Y,$){if(Q=+Q,Y=Y>>>0,!$)V(this,Q,Y,2,65535,0);return this[Y]=Q>>>8,this[Y+1]=Q&255,Y+2};M.prototype.writeUint32LE=M.prototype.writeUInt32LE=function Z(Q,Y,$){if(Q=+Q,Y=Y>>>0,!$)V(this,Q,Y,4,4294967295,0);return this[Y+3]=Q>>>24,this[Y+2]=Q>>>16,this[Y+1]=Q>>>8,this[Y]=Q&255,Y+4};M.prototype.writeUint32BE=M.prototype.writeUInt32BE=function Z(Q,Y,$){if(Q=+Q,Y=Y>>>0,!$)V(this,Q,Y,4,4294967295,0);return this[Y]=Q>>>24,this[Y+1]=Q>>>16,this[Y+2]=Q>>>8,this[Y+3]=Q&255,Y+4};function q1(Z,Q,Y,$,J){G1(Q,$,J,Z,Y,7);let D=Number(Q&BigInt(4294967295));Z[Y++]=D,D=D>>8,Z[Y++]=D,D=D>>8,Z[Y++]=D,D=D>>8,Z[Y++]=D;let F=Number(Q>>BigInt(32)&BigInt(4294967295));return Z[Y++]=F,F=F>>8,Z[Y++]=F,F=F>>8,Z[Y++]=F,F=F>>8,Z[Y++]=F,Y}function K1(Z,Q,Y,$,J){G1(Q,$,J,Z,Y,7);let D=Number(Q&BigInt(4294967295));Z[Y+7]=D,D=D>>8,Z[Y+6]=D,D=D>>8,Z[Y+5]=D,D=D>>8,Z[Y+4]=D;let F=Number(Q>>BigInt(32)&BigInt(4294967295));return Z[Y+3]=F,F=F>>8,Z[Y+2]=F,F=F>>8,Z[Y+1]=F,F=F>>8,Z[Y]=F,Y+8}M.prototype.writeBigUInt64LE=z(function Z(Q,Y=0){return q1(this,Q,Y,BigInt(0),BigInt("0xffffffffffffffff"))});M.prototype.writeBigUInt64BE=z(function Z(Q,Y=0){return K1(this,Q,Y,BigInt(0),BigInt("0xffffffffffffffff"))});M.prototype.writeIntLE=function Z(Q,Y,$,J){if(Q=+Q,Y=Y>>>0,!J){let K=Math.pow(2,8*$-1);V(this,Q,Y,$,K-1,-K)}let D=0,F=1,q=0;this[Y]=Q&255;while(++D<$&&(F*=256)){if(Q<0&&q===0&&this[Y+D-1]!==0)q=1;this[Y+D]=(Q/F>>0)-q&255}return Y+$};M.prototype.writeIntBE=function Z(Q,Y,$,J){if(Q=+Q,Y=Y>>>0,!J){let K=Math.pow(2,8*$-1);V(this,Q,Y,$,K-1,-K)}let D=$-1,F=1,q=0;this[Y+D]=Q&255;while(--D>=0&&(F*=256)){if(Q<0&&q===0&&this[Y+D+1]!==0)q=1;this[Y+D]=(Q/F>>0)-q&255}return Y+$};M.prototype.writeInt8=function Z(Q,Y,$){if(Q=+Q,Y=Y>>>0,!$)V(this,Q,Y,1,127,-128);if(Q<0)Q=255+Q+1;return this[Y]=Q&255,Y+1};M.prototype.writeInt16LE=function Z(Q,Y,$){if(Q=+Q,Y=Y>>>0,!$)V(this,Q,Y,2,32767,-32768);return this[Y]=Q&255,this[Y+1]=Q>>>8,Y+2};M.prototype.writeInt16BE=function Z(Q,Y,$){if(Q=+Q,Y=Y>>>0,!$)V(this,Q,Y,2,32767,-32768);return this[Y]=Q>>>8,this[Y+1]=Q&255,Y+2};M.prototype.writeInt32LE=function Z(Q,Y,$){if(Q=+Q,Y=Y>>>0,!$)V(this,Q,Y,4,2147483647,-2147483648);return this[Y]=Q&255,this[Y+1]=Q>>>8,this[Y+2]=Q>>>16,this[Y+3]=Q>>>24,Y+4};M.prototype.writeInt32BE=function Z(Q,Y,$){if(Q=+Q,Y=Y>>>0,!$)V(this,Q,Y,4,2147483647,-2147483648);if(Q<0)Q=4294967295+Q+1;return this[Y]=Q>>>24,this[Y+1]=Q>>>16,this[Y+2]=Q>>>8,this[Y+3]=Q&255,Y+4};M.prototype.writeBigInt64LE=z(function Z(Q,Y=0){return q1(this,Q,Y,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});M.prototype.writeBigInt64BE=z(function Z(Q,Y=0){return K1(this,Q,Y,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function U1(Z,Q,Y,$,J,D){if(Y+$>Z.length)throw new RangeError("Index out of range");if(Y<0)throw new RangeError("Index out of range")}function W1(Z,Q,Y,$,J){if(Q=+Q,Y=Y>>>0,!J)U1(Z,Q,Y,4,340282346638528860000000000000000000000,-340282346638528860000000000000000000000);return I.write(Z,Q,Y,$,23,4),Y+4}M.prototype.writeFloatLE=function Z(Q,Y,$){return W1(this,Q,Y,!0,$)};M.prototype.writeFloatBE=function Z(Q,Y,$){return W1(this,Q,Y,!1,$)};function X1(Z,Q,Y,$,J){if(Q=+Q,Y=Y>>>0,!J)U1(Z,Q,Y,8,179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,-179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);return I.write(Z,Q,Y,$,52,8),Y+8}M.prototype.writeDoubleLE=function Z(Q,Y,$){return X1(this,Q,Y,!0,$)};M.prototype.writeDoubleBE=function Z(Q,Y,$){return X1(this,Q,Y,!1,$)};M.prototype.copy=function Z(Q,Y,$,J){if(!M.isBuffer(Q))throw new TypeError("argument should be a Buffer");if(!$)$=0;if(!J&&J!==0)J=this.length;if(Y>=Q.length)Y=Q.length;if(!Y)Y=0;if(J>0&&J<$)J=$;if(J===$)return 0;if(Q.length===0||this.length===0)return 0;if(Y<0)throw new RangeError("targetStart out of bounds");if($<0||$>=this.length)throw new RangeError("Index out of range");if(J<0)throw new RangeError("sourceEnd out of bounds");if(J>this.length)J=this.length;if(Q.length-Y<J-$)J=Q.length-Y+$;let D=J-$;if(this===Q&&typeof Uint8Array.prototype.copyWithin==="function")this.copyWithin(Y,$,J);else Uint8Array.prototype.set.call(Q,this.subarray($,J),Y);return D};M.prototype.fill=function Z(Q,Y,$,J){if(typeof Q==="string"){if(typeof Y==="string")J=Y,Y=0,$=this.length;else if(typeof $==="string")J=$,$=this.length;if(J!==void 0&&typeof J!=="string")throw new TypeError("encoding must be a string");if(typeof J==="string"&&!M.isEncoding(J))throw new TypeError("Unknown encoding: "+J);if(Q.length===1){let F=Q.charCodeAt(0);if(J==="utf8"&&F<128||J==="latin1")Q=F}}else if(typeof Q==="number")Q=Q&255;else if(typeof Q==="boolean")Q=Number(Q);if(Y<0||this.length<Y||this.length<$)throw new RangeError("Out of range index");if($<=Y)return this;if(Y=Y>>>0,$=$===void 0?this.length:$>>>0,!Q)Q=0;let D;if(typeof Q==="number")for(D=Y;D<$;++D)this[D]=Q;else{let F=M.isBuffer(Q)?Q:M.from(Q,J),q=F.length;if(q===0)throw new TypeError('The value "'+Q+'" is invalid for argument "value"');for(D=0;D<$-Y;++D)this[D+Y]=F[D%q]}return this};var P={};function l(Z,Q,Y){P[Z]=class $ extends Y{constructor(){super();Object.defineProperty(this,"message",{value:Q.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${Z}]`,this.stack,delete this.name}get code(){return Z}set code(J){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:J,writable:!0})}toString(){return`${this.name} [${Z}]: ${this.message}`}}}l("ERR_BUFFER_OUT_OF_BOUNDS",function(Z){if(Z)return`${Z} is outside of buffer bounds`;return"Attempt to access memory outside buffer bounds"},RangeError);l("ERR_INVALID_ARG_TYPE",function(Z,Q){return`The "${Z}" argument must be of type number. Received type ${typeof Q}`},TypeError);l("ERR_OUT_OF_RANGE",function(Z,Q,Y){let $=`The value of "${Z}" is out of range.`,J=Y;if(Number.isInteger(Y)&&Math.abs(Y)>4294967296)J=Z1(String(Y));else if(typeof Y==="bigint"){if(J=String(Y),Y>BigInt(2)**BigInt(32)||Y<-(BigInt(2)**BigInt(32)))J=Z1(J);J+="n"}return $+=` It must be ${Q}. Received ${J}`,$},RangeError);function Z1(Z){let Q="",Y=Z.length,$=Z[0]==="-"?1:0;for(;Y>=$+4;Y-=3)Q=`_${Z.slice(Y-3,Y)}${Q}`;return`${Z.slice(0,Y)}${Q}`}function n1(Z,Q,Y){if(k(Q,"offset"),Z[Q]===void 0||Z[Q+Y]===void 0)S(Q,Z.length-(Y+1))}function G1(Z,Q,Y,$,J,D){if(Z>Y||Z<Q){let F=typeof Q==="bigint"?"n":"",q;if(D>3)if(Q===0||Q===BigInt(0))q=`>= 0${F} and < 2${F} ** ${(D+1)*8}${F}`;else q=`>= -(2${F} ** ${(D+1)*8-1}${F}) and < 2 ** ${(D+1)*8-1}${F}`;else q=`>= ${Q}${F} and <= ${Y}${F}`;throw new P.ERR_OUT_OF_RANGE("value",q,Z)}n1($,J,D)}function k(Z,Q){if(typeof Z!=="number")throw new P.ERR_INVALID_ARG_TYPE(Q,"number",Z)}function S(Z,Q,Y){if(Math.floor(Z)!==Z)throw k(Z,Y),new P.ERR_OUT_OF_RANGE(Y||"offset","an integer",Z);if(Q<0)throw new P.ERR_BUFFER_OUT_OF_BOUNDS;throw new P.ERR_OUT_OF_RANGE(Y||"offset",`>= ${Y?1:0} and <= ${Q}`,Z)}var o1=/[^+/0-9A-Za-z-_]/g;function s1(Z){if(Z=Z.split("=")[0],Z=Z.trim().replace(o1,""),Z.length<2)return"";while(Z.length%4!==0)Z=Z+"=";return Z}function b(Z,Q){Q=Q||1/0;let Y,$=Z.length,J=null,D=[];for(let F=0;F<$;++F){if(Y=Z.charCodeAt(F),Y>55295&&Y<57344){if(!J){if(Y>56319){if((Q-=3)>-1)D.push(239,191,189);continue}else if(F+1===$){if((Q-=3)>-1)D.push(239,191,189);continue}J=Y;continue}if(Y<56320){if((Q-=3)>-1)D.push(239,191,189);J=Y;continue}Y=(J-55296<<10|Y-56320)+65536}else if(J){if((Q-=3)>-1)D.push(239,191,189)}if(J=null,Y<128){if((Q-=1)<0)break;D.push(Y)}else if(Y<2048){if((Q-=2)<0)break;D.push(Y>>6|192,Y&63|128)}else if(Y<65536){if((Q-=3)<0)break;D.push(Y>>12|224,Y>>6&63|128,Y&63|128)}else if(Y<1114112){if((Q-=4)<0)break;D.push(Y>>18|240,Y>>12&63|128,Y>>6&63|128,Y&63|128)}else throw new Error("Invalid code point")}return D}function f1(Z){let Q=[];for(let Y=0;Y<Z.length;++Y)Q.push(Z.charCodeAt(Y)&255);return Q}function t1(Z,Q){let Y,$,J,D=[];for(let F=0;F<Z.length;++F){if((Q-=2)<0)break;Y=Z.charCodeAt(F),$=Y>>8,J=Y%256,D.push(J),D.push($)}return D}function R1(Z){return y.toByteArray(s1(Z))}function m(Z,Q,Y,$){let J;for(J=0;J<$;++J){if(J+Y>=Q.length||J>=Z.length)break;Q[J+Y]=Z[J]}return J}function T(Z,Q){return Z instanceof Q||Z!=null&&Z.constructor!=null&&Z.constructor.name!=null&&Z.constructor.name===Q.name}function i(Z){return Z!==Z}var e1=function(){let Q=new Array(256);for(let Y=0;Y<16;++Y){let $=Y*16;for(let J=0;J<16;++J)Q[$+J]="0123456789abcdef"[Y]+"0123456789abcdef"[J]}return Q}();function z(Z){return typeof BigInt==="undefined"?Q2:Z}function Q2(){throw new Error("BigInt not supported")}var Y2=new TextEncoder,Z2=new TextDecoder,A=self,$2=async(Z)=>{let Q=await A.wasm._ralloc(Z.byteLength);return new Uint8Array(A.wasm.wasmMemory.buffer).set(Z,Q),Q},_1=async(Z)=>{let Q=Y2.encode(Z),Y=await $2(Q);return[Q.byteLength,Y]},a=(Z)=>{let Q=r(Z);if(Q?.buf.length==0)return{buf:void 0,ok:Q.ok};return{buf:Z2.decode(Q.buf),ok:Q.ok}},r=(Z)=>{let Q=new Uint8Array(A.wasm.wasmMemory.buffer),Y=Buffer.from(Q.slice(Z,Z+9)),$=Y.readUint32LE(0),J=Y.readUInt32LE(4),D=Y.readUint8(8)!=1,F=Q.slice(J,J+$);return A.wasm._rfree(J,$),A.wasm._rfree(Z,9),{buf:F,ok:D}};self.Buffer=u;self.ptr2str=a;self.ptr2bytes=r;self.str2ptr=_1;self.emscriptenhttpconnections={};var J2=new BroadcastChannel("pthreads-broadcast");J2.addEventListener("message",(Z)=>{if(Z.data.type==="cancel-clone"){if(self.cancelToken===Z.data.id&&Date.now()-Z.data.date<1000)Object.values(self.emscriptenhttpconnections).forEach((Q)=>{Q?.abortController?.abort()})}});Object.assign(Module,{emscriptenhttpconnect:async function(Z,Q,Y,$){return new Promise((D)=>{let F=Date.now()>>10;if(!Y)Y="GET";let q=(C)=>{self.wasm={wasmMemory:Module.HEAPU8,_rfree:Module._rfree,_ralloc:Module._ralloc};let p=Module._get_store(C);return a(p)?.buf},K=q(1),X=q(2),W=q(3)||"git",U=q(4),G=new XMLHttpRequest,_=new AbortController;if(G.open(Y,K&&K!=="null"?K+Z.replace(/https?:\/\//,"/"):Z,!0),G.responseType="arraybuffer",X)G.setRequestHeader("x-private-token",X);if(W)G.setRequestHeader("x-git-username",W);if(U)G.setRequestHeader("x-protocol",U);if(self.emscriptenhttpconnections[F]={xhr:G,abortController:_,resultbufferpointer:0,buffersize:Q},$)Object.keys($).forEach((C)=>G.setRequestHeader(C,$[C]));let x=Date.now(),O=0,n=0;if(G.onprogress=(C)=>{let p=Date.now();if(p-x>1000)O=C.loaded-n,n=C.loaded,x=p,self.postMessage({type:"clone-progress",progress:{type:"download",data:{id:self.cancelToken,bytes:C.loaded,downloadSpeedBytes:O}}})},_.signal.addEventListener("abort",()=>{G.abort()}),Y==="GET")G.onload=function(){D(F)},G.onerror=function(){D(F)},G.onabort=function(){D(F)},G.send();else D(F)})},emscriptenhttpwrite:function(Z,Q,Y){let $=self.emscriptenhttpconnections[Z],J=new Uint8Array(Module.HEAPU8.buffer,Q,Y).slice(0);if(!$.content)$.content=J;else{let D=new Uint8Array($.content.length+J.length);D.set($.content),D.set(J,$.content.length),$.content=D}},emscriptenhttpread:function(Z,Q,Y){function $(D,F){let q=self.emscriptenhttpconnections[Z],K=q.xhr.response.byteLength-q.resultbufferpointer;if(K>F)K=F;let X=new Uint8Array(q.xhr.response,q.resultbufferpointer,K);return writeArrayToMemory(X,D),q.resultbufferpointer+=K,K}return new Promise((D)=>{let F=self.emscriptenhttpconnections[Z];if(F.content)F.xhr.onload=function(){D($(Q,Y))},F.xhr.onabort=function(){D(-1)},F.xhr.send(F.content.buffer),F.content=null;else D($(Q,Y))})},emscriptenhttpfree:function(Z){delete self.emscriptenhttpconnections[Z]}});
