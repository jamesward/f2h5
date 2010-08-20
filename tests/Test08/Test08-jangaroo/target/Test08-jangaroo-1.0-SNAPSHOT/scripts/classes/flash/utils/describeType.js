joo.classLoader.prepare("package flash.utils",/* {*/
"public function describeType",function describeType(value/* : Object*/)/* : Object*/ {
  var type/* : Class*/ = typeof value=="function" ? value : value.constructor;
  var methods/* : Array*/ = [];
  if (type && type.prototype) {
    for (var p/* : String*/ in type.prototype) {
      if (p.match(/^[a-zA-Z_]/)
        && !(typeof type.prototype.__lookupGetter__=="function"
             && (type.prototype.__lookupGetter__(p) || type.prototype.__lookupSetter__(p)))
        && typeof type.prototype[p]=="function") {
        methods.push(p);
      }
    }
  }
  return {
    attribute: function flash$utils$describeType$16_16(attr/* : String*/)/* : String*/ {
      return attr=="name" ? flash.utils.getQualifiedClassName(value) : null;
    },
    method: {
      "@name": methods
    }
  };
},,[]
);