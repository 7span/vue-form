import { openBlock as Jt, createElementBlock as Xt, renderSlot as Zt, normalizeProps as Qt, mergeProps as kt, createCommentVNode as te } from "vue";
const ee = {
  componentPrefix: "V",
  errorAdapter: (t) => t
  // createModeId: "+", // Identifier that a form is in create mode
};
var re = typeof global == "object" && global && global.Object === Object && global;
const Ot = re;
var ne = typeof self == "object" && self && self.Object === Object && self, ae = Ot || ne || Function("return this")();
const h = ae;
var ie = h.Symbol;
const m = ie;
var St = Object.prototype, oe = St.hasOwnProperty, se = St.toString, O = m ? m.toStringTag : void 0;
function ce(t) {
  var e = oe.call(t, O), r = t[O];
  try {
    t[O] = void 0;
    var n = !0;
  } catch {
  }
  var s = se.call(t);
  return n && (e ? t[O] = r : delete t[O]), s;
}
var ue = Object.prototype, fe = ue.toString;
function le(t) {
  return fe.call(t);
}
var he = "[object Null]", pe = "[object Undefined]", et = m ? m.toStringTag : void 0;
function I(t) {
  return t == null ? t === void 0 ? pe : he : et && et in Object(t) ? ce(t) : le(t);
}
function P(t) {
  return t != null && typeof t == "object";
}
var ge = Array.isArray;
const R = ge;
function x(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var de = "[object AsyncFunction]", ye = "[object Function]", be = "[object GeneratorFunction]", ve = "[object Proxy]";
function wt(t) {
  if (!x(t))
    return !1;
  var e = I(t);
  return e == ye || e == be || e == de || e == ve;
}
var _e = h["__core-js_shared__"];
const G = _e;
var rt = function() {
  var t = /[^.]+$/.exec(G && G.keys && G.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function $e(t) {
  return !!rt && rt in t;
}
var me = Function.prototype, Te = me.toString;
function v(t) {
  if (t != null) {
    try {
      return Te.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var je = /[\\^$.*+?()[\]{}|]/g, Ae = /^\[object .+?Constructor\]$/, Oe = Function.prototype, Se = Object.prototype, we = Oe.toString, Ee = Se.hasOwnProperty, Ie = RegExp(
  "^" + we.call(Ee).replace(je, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Pe(t) {
  if (!x(t) || $e(t))
    return !1;
  var e = wt(t) ? Ie : Ae;
  return e.test(v(t));
}
function xe(t, e) {
  return t == null ? void 0 : t[e];
}
function _(t, e) {
  var r = xe(t, e);
  return Pe(r) ? r : void 0;
}
var Ce = _(h, "WeakMap");
const N = Ce;
var nt = Object.create, Fe = function() {
  function t() {
  }
  return function(e) {
    if (!x(e))
      return {};
    if (nt)
      return nt(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}();
const Me = Fe;
function De(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var Ge = function() {
  try {
    var t = _(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}();
const at = Ge;
function Le(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n && e(t[r], r, t) !== !1; )
    ;
  return t;
}
var Be = 9007199254740991, Ne = /^(?:0|[1-9]\d*)$/;
function Ue(t, e) {
  var r = typeof t;
  return e = e ?? Be, !!e && (r == "number" || r != "symbol" && Ne.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Et(t, e, r) {
  e == "__proto__" && at ? at(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function It(t, e) {
  return t === e || t !== t && e !== e;
}
var ze = Object.prototype, Ve = ze.hasOwnProperty;
function Pt(t, e, r) {
  var n = t[e];
  (!(Ve.call(t, e) && It(n, r)) || r === void 0 && !(e in t)) && Et(t, e, r);
}
function F(t, e, r, n) {
  var s = !r;
  r || (r = {});
  for (var c = -1, o = e.length; ++c < o; ) {
    var u = e[c], f = n ? n(r[u], t[u], u, r, t) : void 0;
    f === void 0 && (f = t[u]), s ? Et(r, u, f) : Pt(r, u, f);
  }
  return r;
}
var Re = 9007199254740991;
function xt(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Re;
}
function Ct(t) {
  return t != null && xt(t.length) && !wt(t);
}
var Ke = Object.prototype;
function K(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || Ke;
  return t === r;
}
function He(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var We = "[object Arguments]";
function it(t) {
  return P(t) && I(t) == We;
}
var Ft = Object.prototype, qe = Ft.hasOwnProperty, Ye = Ft.propertyIsEnumerable, Je = it(function() {
  return arguments;
}()) ? it : function(t) {
  return P(t) && qe.call(t, "callee") && !Ye.call(t, "callee");
};
const Xe = Je;
function Ze() {
  return !1;
}
var Mt = typeof exports == "object" && exports && !exports.nodeType && exports, ot = Mt && typeof module == "object" && module && !module.nodeType && module, Qe = ot && ot.exports === Mt, st = Qe ? h.Buffer : void 0, ke = st ? st.isBuffer : void 0, tr = ke || Ze;
const Dt = tr;
var er = "[object Arguments]", rr = "[object Array]", nr = "[object Boolean]", ar = "[object Date]", ir = "[object Error]", or = "[object Function]", sr = "[object Map]", cr = "[object Number]", ur = "[object Object]", fr = "[object RegExp]", lr = "[object Set]", hr = "[object String]", pr = "[object WeakMap]", gr = "[object ArrayBuffer]", dr = "[object DataView]", yr = "[object Float32Array]", br = "[object Float64Array]", vr = "[object Int8Array]", _r = "[object Int16Array]", $r = "[object Int32Array]", mr = "[object Uint8Array]", Tr = "[object Uint8ClampedArray]", jr = "[object Uint16Array]", Ar = "[object Uint32Array]", i = {};
i[yr] = i[br] = i[vr] = i[_r] = i[$r] = i[mr] = i[Tr] = i[jr] = i[Ar] = !0;
i[er] = i[rr] = i[gr] = i[nr] = i[dr] = i[ar] = i[ir] = i[or] = i[sr] = i[cr] = i[ur] = i[fr] = i[lr] = i[hr] = i[pr] = !1;
function Or(t) {
  return P(t) && xt(t.length) && !!i[I(t)];
}
function H(t) {
  return function(e) {
    return t(e);
  };
}
var Gt = typeof exports == "object" && exports && !exports.nodeType && exports, S = Gt && typeof module == "object" && module && !module.nodeType && module, Sr = S && S.exports === Gt, L = Sr && Ot.process, wr = function() {
  try {
    var t = S && S.require && S.require("util").types;
    return t || L && L.binding && L.binding("util");
  } catch {
  }
}();
const T = wr;
var ct = T && T.isTypedArray, Er = ct ? H(ct) : Or;
const Ir = Er;
var Pr = Object.prototype, xr = Pr.hasOwnProperty;
function Lt(t, e) {
  var r = R(t), n = !r && Xe(t), s = !r && !n && Dt(t), c = !r && !n && !s && Ir(t), o = r || n || s || c, u = o ? He(t.length, String) : [], f = u.length;
  for (var l in t)
    (e || xr.call(t, l)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    c && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    Ue(l, f))) && u.push(l);
  return u;
}
function Bt(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var Cr = Bt(Object.keys, Object);
const Fr = Cr;
var Mr = Object.prototype, Dr = Mr.hasOwnProperty;
function Gr(t) {
  if (!K(t))
    return Fr(t);
  var e = [];
  for (var r in Object(t))
    Dr.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
function W(t) {
  return Ct(t) ? Lt(t) : Gr(t);
}
function Lr(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var Br = Object.prototype, Nr = Br.hasOwnProperty;
function Ur(t) {
  if (!x(t))
    return Lr(t);
  var e = K(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !Nr.call(t, n)) || r.push(n);
  return r;
}
function q(t) {
  return Ct(t) ? Lt(t, !0) : Ur(t);
}
var zr = _(Object, "create");
const w = zr;
function Vr() {
  this.__data__ = w ? w(null) : {}, this.size = 0;
}
function Rr(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Kr = "__lodash_hash_undefined__", Hr = Object.prototype, Wr = Hr.hasOwnProperty;
function qr(t) {
  var e = this.__data__;
  if (w) {
    var r = e[t];
    return r === Kr ? void 0 : r;
  }
  return Wr.call(e, t) ? e[t] : void 0;
}
var Yr = Object.prototype, Jr = Yr.hasOwnProperty;
function Xr(t) {
  var e = this.__data__;
  return w ? e[t] !== void 0 : Jr.call(e, t);
}
var Zr = "__lodash_hash_undefined__";
function Qr(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = w && e === void 0 ? Zr : e, this;
}
function b(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
b.prototype.clear = Vr;
b.prototype.delete = Rr;
b.prototype.get = qr;
b.prototype.has = Xr;
b.prototype.set = Qr;
function kr() {
  this.__data__ = [], this.size = 0;
}
function M(t, e) {
  for (var r = t.length; r--; )
    if (It(t[r][0], e))
      return r;
  return -1;
}
var tn = Array.prototype, en = tn.splice;
function rn(t) {
  var e = this.__data__, r = M(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : en.call(e, r, 1), --this.size, !0;
}
function nn(t) {
  var e = this.__data__, r = M(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function an(t) {
  return M(this.__data__, t) > -1;
}
function on(t, e) {
  var r = this.__data__, n = M(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function p(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
p.prototype.clear = kr;
p.prototype.delete = rn;
p.prototype.get = nn;
p.prototype.has = an;
p.prototype.set = on;
var sn = _(h, "Map");
const E = sn;
function cn() {
  this.size = 0, this.__data__ = {
    hash: new b(),
    map: new (E || p)(),
    string: new b()
  };
}
function un(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function D(t, e) {
  var r = t.__data__;
  return un(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function fn(t) {
  var e = D(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function ln(t) {
  return D(this, t).get(t);
}
function hn(t) {
  return D(this, t).has(t);
}
function pn(t, e) {
  var r = D(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function j(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
j.prototype.clear = cn;
j.prototype.delete = fn;
j.prototype.get = ln;
j.prototype.has = hn;
j.prototype.set = pn;
function Nt(t, e) {
  for (var r = -1, n = e.length, s = t.length; ++r < n; )
    t[s + r] = e[r];
  return t;
}
var gn = Bt(Object.getPrototypeOf, Object);
const Ut = gn;
function dn() {
  this.__data__ = new p(), this.size = 0;
}
function yn(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
function bn(t) {
  return this.__data__.get(t);
}
function vn(t) {
  return this.__data__.has(t);
}
var _n = 200;
function $n(t, e) {
  var r = this.__data__;
  if (r instanceof p) {
    var n = r.__data__;
    if (!E || n.length < _n - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new j(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
function A(t) {
  var e = this.__data__ = new p(t);
  this.size = e.size;
}
A.prototype.clear = dn;
A.prototype.delete = yn;
A.prototype.get = bn;
A.prototype.has = vn;
A.prototype.set = $n;
function mn(t, e) {
  return t && F(e, W(e), t);
}
function Tn(t, e) {
  return t && F(e, q(e), t);
}
var zt = typeof exports == "object" && exports && !exports.nodeType && exports, ut = zt && typeof module == "object" && module && !module.nodeType && module, jn = ut && ut.exports === zt, ft = jn ? h.Buffer : void 0, lt = ft ? ft.allocUnsafe : void 0;
function An(t, e) {
  if (e)
    return t.slice();
  var r = t.length, n = lt ? lt(r) : new t.constructor(r);
  return t.copy(n), n;
}
function On(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, s = 0, c = []; ++r < n; ) {
    var o = t[r];
    e(o, r, t) && (c[s++] = o);
  }
  return c;
}
function Vt() {
  return [];
}
var Sn = Object.prototype, wn = Sn.propertyIsEnumerable, ht = Object.getOwnPropertySymbols, En = ht ? function(t) {
  return t == null ? [] : (t = Object(t), On(ht(t), function(e) {
    return wn.call(t, e);
  }));
} : Vt;
const Y = En;
function In(t, e) {
  return F(t, Y(t), e);
}
var Pn = Object.getOwnPropertySymbols, xn = Pn ? function(t) {
  for (var e = []; t; )
    Nt(e, Y(t)), t = Ut(t);
  return e;
} : Vt;
const Rt = xn;
function Cn(t, e) {
  return F(t, Rt(t), e);
}
function Kt(t, e, r) {
  var n = e(t);
  return R(t) ? n : Nt(n, r(t));
}
function Fn(t) {
  return Kt(t, W, Y);
}
function Mn(t) {
  return Kt(t, q, Rt);
}
var Dn = _(h, "DataView");
const U = Dn;
var Gn = _(h, "Promise");
const z = Gn;
var Ln = _(h, "Set");
const V = Ln;
var pt = "[object Map]", Bn = "[object Object]", gt = "[object Promise]", dt = "[object Set]", yt = "[object WeakMap]", bt = "[object DataView]", Nn = v(U), Un = v(E), zn = v(z), Vn = v(V), Rn = v(N), y = I;
(U && y(new U(new ArrayBuffer(1))) != bt || E && y(new E()) != pt || z && y(z.resolve()) != gt || V && y(new V()) != dt || N && y(new N()) != yt) && (y = function(t) {
  var e = I(t), r = e == Bn ? t.constructor : void 0, n = r ? v(r) : "";
  if (n)
    switch (n) {
      case Nn:
        return bt;
      case Un:
        return pt;
      case zn:
        return gt;
      case Vn:
        return dt;
      case Rn:
        return yt;
    }
  return e;
});
const J = y;
var Kn = Object.prototype, Hn = Kn.hasOwnProperty;
function Wn(t) {
  var e = t.length, r = new t.constructor(e);
  return e && typeof t[0] == "string" && Hn.call(t, "index") && (r.index = t.index, r.input = t.input), r;
}
var qn = h.Uint8Array;
const vt = qn;
function X(t) {
  var e = new t.constructor(t.byteLength);
  return new vt(e).set(new vt(t)), e;
}
function Yn(t, e) {
  var r = e ? X(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.byteLength);
}
var Jn = /\w*$/;
function Xn(t) {
  var e = new t.constructor(t.source, Jn.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var _t = m ? m.prototype : void 0, $t = _t ? _t.valueOf : void 0;
function Zn(t) {
  return $t ? Object($t.call(t)) : {};
}
function Qn(t, e) {
  var r = e ? X(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
var kn = "[object Boolean]", ta = "[object Date]", ea = "[object Map]", ra = "[object Number]", na = "[object RegExp]", aa = "[object Set]", ia = "[object String]", oa = "[object Symbol]", sa = "[object ArrayBuffer]", ca = "[object DataView]", ua = "[object Float32Array]", fa = "[object Float64Array]", la = "[object Int8Array]", ha = "[object Int16Array]", pa = "[object Int32Array]", ga = "[object Uint8Array]", da = "[object Uint8ClampedArray]", ya = "[object Uint16Array]", ba = "[object Uint32Array]";
function va(t, e, r) {
  var n = t.constructor;
  switch (e) {
    case sa:
      return X(t);
    case kn:
    case ta:
      return new n(+t);
    case ca:
      return Yn(t, r);
    case ua:
    case fa:
    case la:
    case ha:
    case pa:
    case ga:
    case da:
    case ya:
    case ba:
      return Qn(t, r);
    case ea:
      return new n();
    case ra:
    case ia:
      return new n(t);
    case na:
      return Xn(t);
    case aa:
      return new n();
    case oa:
      return Zn(t);
  }
}
function _a(t) {
  return typeof t.constructor == "function" && !K(t) ? Me(Ut(t)) : {};
}
var $a = "[object Map]";
function ma(t) {
  return P(t) && J(t) == $a;
}
var mt = T && T.isMap, Ta = mt ? H(mt) : ma;
const ja = Ta;
var Aa = "[object Set]";
function Oa(t) {
  return P(t) && J(t) == Aa;
}
var Tt = T && T.isSet, Sa = Tt ? H(Tt) : Oa;
const wa = Sa;
var Ea = 1, Ia = 2, Pa = 4, Ht = "[object Arguments]", xa = "[object Array]", Ca = "[object Boolean]", Fa = "[object Date]", Ma = "[object Error]", Wt = "[object Function]", Da = "[object GeneratorFunction]", Ga = "[object Map]", La = "[object Number]", qt = "[object Object]", Ba = "[object RegExp]", Na = "[object Set]", Ua = "[object String]", za = "[object Symbol]", Va = "[object WeakMap]", Ra = "[object ArrayBuffer]", Ka = "[object DataView]", Ha = "[object Float32Array]", Wa = "[object Float64Array]", qa = "[object Int8Array]", Ya = "[object Int16Array]", Ja = "[object Int32Array]", Xa = "[object Uint8Array]", Za = "[object Uint8ClampedArray]", Qa = "[object Uint16Array]", ka = "[object Uint32Array]", a = {};
a[Ht] = a[xa] = a[Ra] = a[Ka] = a[Ca] = a[Fa] = a[Ha] = a[Wa] = a[qa] = a[Ya] = a[Ja] = a[Ga] = a[La] = a[qt] = a[Ba] = a[Na] = a[Ua] = a[za] = a[Xa] = a[Za] = a[Qa] = a[ka] = !0;
a[Ma] = a[Wt] = a[Va] = !1;
function C(t, e, r, n, s, c) {
  var o, u = e & Ea, f = e & Ia, l = e & Pa;
  if (r && (o = s ? r(t, n, s, c) : r(t)), o !== void 0)
    return o;
  if (!x(t))
    return t;
  var Z = R(t);
  if (Z) {
    if (o = Wn(t), !u)
      return De(t, o);
  } else {
    var $ = J(t), Q = $ == Wt || $ == Da;
    if (Dt(t))
      return An(t, u);
    if ($ == qt || $ == Ht || Q && !s) {
      if (o = f || Q ? {} : _a(t), !u)
        return f ? Cn(t, Tn(o, t)) : In(t, mn(o, t));
    } else {
      if (!a[$])
        return s ? t : {};
      o = va(t, $, u);
    }
  }
  c || (c = new A());
  var k = c.get(t);
  if (k)
    return k;
  c.set(t, o), wa(t) ? t.forEach(function(g) {
    o.add(C(g, e, r, g, t, c));
  }) : ja(t) && t.forEach(function(g, d) {
    o.set(d, C(g, e, r, d, t, c));
  });
  var Yt = l ? f ? Mn : Fn : f ? q : W, tt = Z ? void 0 : Yt(t);
  return Le(tt || t, function(g, d) {
    tt && (d = g, g = t[d]), Pt(o, d, C(g, e, r, d, t, c));
  }), o;
}
var ti = 1, ei = 4;
function B(t) {
  return C(t, ti | ei);
}
const jt = (t, e) => {
  console.warn("[vue-list] " + t + ":" + e);
}, ri = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, s] of e)
    r[n] = s;
  return r;
}, At = {
  name: null,
  value: null,
  type: null,
  in: (t) => t,
  // Before setting the value in the state
  out: (t) => t
  // Before getting the value out of the state
}, ni = {
  props: {
    /**
     * Possible config
     * ['name','email'] Creates fields with null values
     * [{name:'email',value:'hello@hello.com'}] Creates field with default value
     */
    fields: {
      type: Array,
      required: !0
    },
    id: {
      type: [String, Number]
    },
    nativeId: String,
    get: {
      type: Function
    },
    save: {
      type: Function
    },
    delete: {
      type: Function
    },
    archive: {
      type: Function
    },
    // State represents the values binded with DOM
    formState: {
      type: Object
    },
    // Values represents the actual value after parsing data from DOM
    formValues: {
      type: Object
    }
  },
  data() {
    return {
      state: null,
      isGetting: !1,
      isSaving: !1,
      isDeleting: !1,
      isArchiving: !1,
      isArchived: !1,
      errors: {},
      error: null
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    /**
     * Serializing the fields creats the same format for
     * all the field config provided in fields prop.
     */
    serializedFields() {
      return this.fields.map((t, e) => {
        const r = typeof t;
        return r === "string" ? {
          ...At,
          name: t,
          value: null
        } : r === "object" && !Array.isArray(t) ? {
          ...At,
          ...t
        } : (jt("Invalid field config provided at index", e), null);
      }).filter((t) => t);
    },
    fieldErrors() {
      return Object.keys(this.errors).filter((t) => this.hasField(t)).reduce((t, e) => (t[e] = this.errors[e], t), {});
    },
    nonFieldErrors() {
      return Object.keys(this.errors).filter((t) => !this.hasField(t)).reduce((t, e) => (t[e] = this.errors[e], t), {});
    },
    values() {
      const t = {};
      return this.serializedFields.forEach((e) => {
        t[e.name] = e.out(this.state[e.name]);
      }), t;
    },
    mode() {
      return this.id == null ? "create" : "edit";
    },
    isCreating() {
      return this.mode === "create";
    },
    isEditing() {
      return this.mode === "edit";
    },
    isLoading() {
      return this.isGetting || this.isSaving || this.isDeleting;
    },
    scopes() {
      return {
        mode: this.mode,
        isCreating: this.isCreating,
        isEditing: this.isEditing,
        state: this.state,
        values: this.values,
        getItem: this.getItem,
        saveItem: this.saveItem,
        deleteItem: this.deleteItem,
        archiveItem: this.archiveItem,
        setValue: this.setValue,
        reset: this.reset,
        isSaving: this.isSaving,
        isGetting: this.isGetting,
        isDeleting: this.isDeleting,
        isArchiving: this.isArchiving,
        isLoading: this.isLoading,
        isArchived: this.isArchived,
        errors: this.errors || {},
        error: this.error,
        hasError: this.hasError,
        fieldErrors: this.fieldErrors,
        nonFieldErrors: this.nonFieldErrors
      };
    },
    hasError() {
      return this.error || Object.keys(this.errors).length > 0;
    }
  },
  methods: {
    init() {
      this.setState(), this.isEditing && this.getItem();
    },
    reset() {
      this.setState(), this.setErrors();
    },
    hasField(t) {
      return this.serializedFields.find((e) => e.name === t);
    },
    setState(t = {}) {
      const e = {};
      this.serializedFields.forEach((r) => {
        let n;
        Object.prototype.hasOwnProperty.call(t, r.name) ? n = t[r.name] : n = r.value, e[r.name] = r.in(n), e[r.name] = r.out(n);
      }), this.state = e, this.$emit("update:formState", this.state), this.$emit("update:formValues", this.values);
    },
    async getItem() {
      return this.isGetting = !0, this.setErrors(), this.get(this.id).then((t) => (this.validateIn(t) && (t.archivedAt ? this.isArchived = !0 : this.isArchived = !1, this.setState(t)), t)).catch((t) => {
        this.setErrors(t);
      }).finally(() => {
        this.isGetting = !1;
      });
    },
    async saveItem() {
      return this.isSaving = !0, this.setErrors(), this.save(this.id, B(this.values)).then((t) => (this.validateIn(t) && this.setState(t), t)).catch((t) => {
        this.setErrors(t);
      }).finally(() => {
        this.isSaving = !1;
      });
    },
    async deleteItem() {
      return this.isDeleting = !0, this.setErrors(), this.delete(this.id, B(this.values)).catch((t) => {
        this.setErrors(t);
      }).finally(() => {
        this.isDeleting = !1;
      });
    },
    async archiveItem() {
      return this.isArchiving = !0, this.setErrors(), this.archive(this.id, B(this.values)).catch((t) => {
        this.setErrors(t);
      }).finally(() => {
        this.isArchiving = !1;
      });
    },
    setValue(t, e) {
      this.state[t] = e;
    },
    setErrors(t) {
      if (t) {
        const { fields: e, message: r } = this.OPTIONS.errorAdapter(t);
        (e || r) && (this.errors = e, this.error = r, Object.keys(e).length > 0 && console.error(r, e));
      } else
        this.errors = {}, this.error = null;
    },
    validateIn(t) {
      return typeof t != "object" || Array.isArray(t) ? (jt("Invalid input/errors received", t), !1) : !0;
    }
  }
}, ai = ["id"];
function ii(t, e, r, n, s, c) {
  return Jt(), Xt("div", { id: r.nativeId }, [
    s.state ? Zt(t.$slots, "default", Qt(kt({ key: 0 }, c.scopes))) : te("", !0)
  ], 8, ai);
}
const oi = /* @__PURE__ */ ri(ni, [["render", ii]]), si = (t, e = {}) => {
  const r = Object.assign({}, ee, e), n = r.componentPrefix;
  t.component(`${n}Form`, {
    data() {
      return {
        OPTIONS: r
      };
    },
    provide: {
      OPTIONS: r
    },
    extends: oi
  });
}, ci = {
  install: si
};
typeof window < "u" && window.Vue && window.Vue.use(ci);
export {
  ci as default
};
