Function.prototype.bind = function(object) {
  var fn = this;
  return (function $boundMethod() {
    return arguments.length ? fn.apply(object,arguments) : fn.call(object); // call is faster at least in Firefox.
  });
};

(function(theGlobalObject){
  // define alias "js" for the top-level package, so that name-clashes in AS3 can be resolved:
  theGlobalObject.js = theGlobalObject;
  // defined here to avoid global name space pollution and unneccessary closures:
  function clone(object) {
    var empty = function(){ };
    empty.prototype =  object;
    return new empty();
  };
  function createGetQualified(create) {
    return (function(name) {
      var object = theGlobalObject;
      if (name) {
        var parts = name.split(".");
        for (var i=0; i<parts.length; ++i) {
          var subobject = object[parts[i]];
          try {
            if(String(subobject).indexOf("[JavaPackage")==0) {
              subobject =  null;
            }
          } catch(e) {
            subobject = null;
          }
          if (!subobject) {
            if (create) {
              subobject = object[parts[i]] = {};
            } else {
              return null;
            }
          }
          object = subobject;
        }
      }
      return object;
    });
  }

  theGlobalObject.joo = {
    getOrCreatePackage: createGetQualified(true),
    getQualifiedObject: createGetQualified(false),
    classLoader: {
      prepare: function(packageDef, directives, classDef, memberFactory) {
        var classMatch = classDef.match(/^\s*((public|internal|final|dynamic)\s+)*class\s+([A-Za-z][a-zA-Z$_0-9]*)(\s+extends\s+([a-zA-Z$_0-9.]+))?(\s+implements\s+([a-zA-Z$_0-9.,\s]+))?\s*$/);
        var className = classMatch[3];
        var $extends = classMatch[5];
        var constructor;
        var publicConstructor = joo[className] = function() {
          constructor.apply(this, arguments);
        };
        var superConstructor;
        if ($extends) {
          superConstructor = joo[$extends];
          publicConstructor.prototype = clone(superConstructor.prototype);
        } else {
          superConstructor = Object;
          $extends = "Object";
        }
        publicConstructor.prototype[$extends] = superConstructor;
        var members = memberFactory(publicConstructor, {$super: $extends});
        var staticInitializer;
        for (var i = 0; i < members.length; ++i) {
          var memberDeclaration = members[i];
          switch (typeof memberDeclaration) {
            case "function": staticInitializer = memberDeclaration; break;
            case "string":
              var isStatic = memberDeclaration.match(/\bstatic\b/);
              var target = isStatic ? publicConstructor : publicConstructor.prototype;
              var member = members[++i];
              if (typeof member == "function") {
                var methodName = memberDeclaration.match(/function\s+([a-zA-Z$_0-9]+)/)[1];
                if (methodName == className) {
                  constructor = member;
                } else {
                  target[methodName] = member;
                }
              } else {
                for (var m in member) {
                  target[m] = member[m];
                }
              }
          }
        }
        if (staticInitializer) {
          staticInitializer();
        }
      },
      init: function() {
        // ignore
      }
    }
  };
})(this);// function assert(cond : Object, file : String, line : uint, column : uint) : void
joo.assert = function joo$assert(cond, file, line, column) {
  if (!cond)
    throw new Error(file+"("+line+":"+column+"): assertion failed");
};
// simulate ActionScript's Class object for type casts and "is"
joo.Class = function joo$Class(c){return c;};
joo.Class.$class = {
  isInstance: function(f){return typeof f=="function";}
};
// function trace(msg : String) : void
joo.trace = function joo$trace(msg) {
  msg = "AS3: " + msg;
  var console;
  if ((console = joo.getQualifiedObject("console")) && console.log) {
    console.log(msg);
  } else if ((console = joo.getQualifiedObject("runtime")) && console.trace) {
    console.trace(msg);
  } else if (console = joo.getQualifiedObject("trace")) {
    console(msg);
  }
};
joo.classLoader.prepare(/*
 * Copyright 2009 CoreMedia AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, 
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 * express or implied. See the License for the specific language 
 * governing permissions and limitations under the License.
 */

// JangarooScript runtime support. Author: Frank Wienberg

"package joo", [

// this makes jooc generate a with(joo) statement:
"import joo.*",""],

"public class MemberDeclaration",function(MemberDeclaration,$$private){with(joo)with(MemberDeclaration)with($$private)return[ 

  "public static const",{
          METHOD_TYPE_GET/* : String*/ : "get",
          METHOD_TYPE_SET/* : String*/ : "set",
          MEMBER_TYPE_VAR/* : String*/ : "var",
          MEMBER_TYPE_CONST/* : String*/ : "const",
          MEMBER_TYPE_FUNCTION/* : String*/ : "function",
          NAMESPACE_PRIVATE/* : String*/ : "private",
          NAMESPACE_INTERNAL/* : String*/ : "internal",
          NAMESPACE_PROTECTED/* : String*/ : "protected",
          NAMESPACE_PUBLIC/* : String*/ : "public",
          STATIC/* : String*/ : "static",
          FINAL/* : String*/ : "final",
          NATIVE/* : String*/ : "native",
          BOUND/* : String*/ : "bound",
          OVERRIDE/* : String*/ : "override"},

  "private static var",{ SUPPORTS_GETTERS_SETTERS/* : Boolean*/: undefined},
  "private static var",{ DEFINE_METHOD/* : Object*/: undefined},
  "private static var",{ LOOKUP_METHOD/* : Object*/: undefined},function()

{
  // no static initializers in system classes, use static block:
  SUPPORTS_GETTERS_SETTERS = "__defineGetter__" in Object.prototype;
  DEFINE_METHOD = {
    "get":  "__defineGetter__",
    "set": "__defineSetter__"
  };
  LOOKUP_METHOD = {
    "get": "__lookupGetter__",
    "set": "__lookupSetter__"
  };
},

  "public static function create",function create(memberDeclarationStr/* : String*/)/* : MemberDeclaration*/ {
    var tokens/* : Array*/ = memberDeclarationStr.split(/\s+/);
    // ignore imports:
    return tokens[0]=="import" ? null
           : new MemberDeclaration(tokens);
  },

  "internal var",{
          _namespace/* : String*/ : "internal",
          _static/* : Boolean*/ : false,
          _final/* : Boolean*/ : false,
          _native/* : Boolean*/ : false,
          _bound/* : Boolean*/ : false,
          _override/* : Boolean*/ : false,
          _cloneFactory/* : Function*/: undefined},
  "public var",{
          memberType/* : String*/: undefined,
          getterOrSetter/* : String*/: undefined,
          memberName/* : String*/: undefined,
          slot/* : String*/: undefined,
          value/* : **/: undefined},

  "public function MemberDeclaration",function $MemberDeclaration(tokens/* : Array*/) {this[$super]();
    for (var j/*:int*/ =0; j<tokens.length; ++j) {
      var token/* : String*/ = tokens[j];
      if (!this.memberType) {
        switch(token) {
          case STATIC:
          case FINAL:
          case NATIVE:
          case BOUND:
          case OVERRIDE:
            this["_"+token] = true; break;
          case MEMBER_TYPE_VAR:
          case MEMBER_TYPE_CONST:
          case MEMBER_TYPE_FUNCTION:
            this.memberType = token; break;
          default:
            // "private", "public", "protected", "internal" or a custom namespace:
            this._namespace = token;
        }
      } else {
        if (this.isMethod() && LOOKUP_METHOD[this.memberName]) {
          this.getterOrSetter = this.memberName; // detected getter or setter
        }
        this.memberName = token; // token following the member type is the member name
      }
    }
    if (!this.memberType) {
      throw new Error("Missing member type in declaration '" + tokens.join(" ") + "'.");
    }
  },

  "public function getQualifiedName",function getQualifiedName()/* : String*/ {
    return this._namespace+"::"+this.memberName;
  },

  "public function isPrivate",function isPrivate()/* : Boolean*/ {
    return this._namespace==NAMESPACE_PRIVATE;
  },

  "public function isStatic",function isStatic()/* : Boolean*/ {
    return this._static;
  },

  "public function isFinal",function isFinal()/* : Boolean*/ {
    return this._final;
  },

  "public function isNative",function isNative()/* : Boolean*/ {
    return this._native;
  },

  "public function isOverride",function isOverride()/* : Boolean*/ {
    return this._override;
  },

  "public function isBound",function isBound()/* : Boolean*/ {
    return this._bound;
  },

  "public function isMethod",function isMethod()/* : Boolean*/ {
    return this.memberType==MEMBER_TYPE_FUNCTION;
  },

  // public function retrieveMember(source : Object) : Function
  /* not needed if we take reflection seriously!
   retrieveMember: function joo$MemberDeclaration$getMember(source) {
   return this.getterOrSetter==METHOD_TYPE_GET ? source.__lookupGetter__(this.memberName)
   : this.getterOrSetter==METHOD_TYPE_SET ? source.__lookupSetter__(this.memberName)
   : source[this.memberName];
   },*/

  "public function getNativeMember",function getNativeMember(publicConstructor/* : Function*/)/* : **/ {
    var target/* : **/ = this.isStatic() ? publicConstructor : publicConstructor.prototype;
    if (this.memberType==MEMBER_TYPE_FUNCTION && this.getterOrSetter) {
      // native variables are only declared as getter/setter functions, never implemented as such:
      this.memberType = MEMBER_TYPE_VAR;
      this.getterOrSetter = null;
    }
    try {
      var member/* : **/ = target[this.memberName];
    } catch(e){if(is (e , Error)) {
      // ignore Firefox' native member access exceptions.
    }}
    if (typeof member!="function") {
      var memberObject/* : Object*/ = {};
      memberObject[this.memberName] = member;
      member = memberObject;
    }
    return member;
  },

  "public function hasOwnMember",function hasOwnMember(target/* : Object*/)/* : Boolean*/ {
    // fast path:
    if (!this.getterOrSetter && target.hasOwnProperty) {
      return target.hasOwnProperty(this.slot);
    }
    var value/* : **/ = this.retrieveMember(target);
    if (value!==undefined && target.constructor) {
      // is it really target's own member? Retrieve super's value:
      var superTarget/* : Object*/ = target.constructor.prototype;
      var superValue/* : **/ = this.retrieveMember(superTarget);
      if (value!==superValue) {
        return true;
      }
    }
    return false;
  },

  "public function retrieveMember",function retrieveMember(target/* : Object*/)/* : **/ {
    if (!target) {
      return undefined;
    }
    var slot/* : String*/ = this.slot;
    if (this.getterOrSetter) {
      if (SUPPORTS_GETTERS_SETTERS) {
        return target[LOOKUP_METHOD[this.getterOrSetter]](slot);
      } else {
        slot = this.getterOrSetter+"$"+slot;
      }
    }
    return target[slot];
  },

  "public function storeMember",function storeMember(target/* : Object*/)/* : void*/ {
    // store only if not native:
    if (!this.isNative()) {
      var slot/* : String*/ = this.slot;
      if (this.getterOrSetter) {
        if (SUPPORTS_GETTERS_SETTERS) {
          // defining a getter or setter disables the counterpart setter/getter from the prototype,
          // so copy that setter/getter before, if "target" does not already define it:
          var oppositeMethodType/*:**/ = this.getterOrSetter==METHOD_TYPE_GET ? METHOD_TYPE_SET : METHOD_TYPE_GET;
          var counterpart/* : Function*/ = target[LOOKUP_METHOD[oppositeMethodType]](slot);
          // if counterpart is defined, check that it is not overridden (differs from prototype's counterpart):
          if (counterpart && counterpart===target.constructor.prototype[LOOKUP_METHOD[oppositeMethodType]](slot)) {
              // set the counterpart directly on target. This may be redundant, but we cannot find out.
            target[DEFINE_METHOD[oppositeMethodType]](slot, counterpart);
          }
          target[DEFINE_METHOD[this.getterOrSetter]](slot, this.value);
          return;
        } else {
          slot = this.getterOrSetter+"$"+slot;
        }
      }
      target[slot] = this.value;
    }
  },

  "public function hasInitializer",function hasInitializer()/* : Boolean*/ {
    return this.memberType!=MEMBER_TYPE_FUNCTION && typeof this.value=="function" && this.value.constructor!==RegExp;
  },

  "public function _getCloneFactory",function _getCloneFactory()/* : Function*/ {
    if (!this._cloneFactory) {
      this._cloneFactory = function joo$MemberDeclaration$234_28()/* : void*/ { };
      this._cloneFactory.prototype = this;
    }
    return this._cloneFactory;
  },

  "public function clone",function clone(changedProperties/* : Object*/)/* : MemberDeclaration*/ {
    var CloneFactory/* : Function*/ = this._getCloneFactory();
    var clone/* : MemberDeclaration*/ = new CloneFactory();
    for (var m/*:String*/ in changedProperties) {
      clone[m] = changedProperties[m];
    }
    return clone;
  },

  "public function toString",function toString()/* : String*/ {
    var sb/* : Array*/ = [this._namespace];
    if (this._static) {
      sb.push(STATIC);
    }
    if (this._override) {
      sb.push(OVERRIDE);
    }
    if (this._bound) {
      sb.push(BOUND);
    }
    sb.push(this.memberType);
    if (this.getterOrSetter) {
      sb.push(this.getterOrSetter);
    }
    sb.push(this.memberName);
    return sb.join(" ");
  },

];},["create"]
);joo.classLoader.prepare(/*
 * Copyright 2009 CoreMedia AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, 
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 * express or implied. See the License for the specific language 
 * governing permissions and limitations under the License.
 */

// JangarooScript runtime support. Author: Frank Wienberg

"package joo", [

// this makes jooc generate a with(joo) statement:
"import joo.*",""],

"public class NativeClassDeclaration",function(NativeClassDeclaration,$$private){with(joo)with(NativeClassDeclaration)with($$private)return[ 

  "protected static function createEmptyConstructor",function createEmptyConstructor(constructor_/* : Function*/)/* : Function*/ {
    var emptyConstructor/* : Function*/ = function joo$NativeClassDeclaration$26_39()/* : void*/ {
      this.constructor = constructor_;
    };
    emptyConstructor.prototype =  constructor_.prototype;
    return emptyConstructor;
  },

  "public var",{
          level/* : int*/ : -1,
          fullClassName/* : String*/: undefined,
          constructor_/* : Function*/: undefined,
          publicConstructor/* : Function*/: undefined,
          completed/*  : Boolean*/ : false,
          inited/*  : Boolean*/ : false,
          Public/* : Function*/: undefined,
          superClassDeclaration/* : NativeClassDeclaration*/: undefined,
          interfaces/* : Array*/: undefined},

  "public function NativeClassDeclaration",function $NativeClassDeclaration() {this[$super]();
  },

  "public function create",function create(fullClassName/* : String*/, publicConstructor/* : Function*/)/* : NativeClassDeclaration*/ {
    this.fullClassName = fullClassName;
    this.publicConstructor = publicConstructor;
    this.publicConstructor["$class"] = this;
    return this;
  },

  "public function complete",function complete()/* : NativeClassDeclaration*/ {
    if (!this.completed) {
      this.completed = true;
      this.doComplete();
    }
    return this;
  },

  "protected function doComplete",function doComplete()/* : void*/ {
    this.interfaces = [];
    this.constructor_ = this.publicConstructor;
    this.Public = createEmptyConstructor(this.publicConstructor);
  },

  "public function init",function init()/* : NativeClassDeclaration*/ {
    if (!this.inited) {
      this.inited = true;
      this.complete();
      this.doInit();
    }
    return this;
  },

  "protected function doInit",function doInit()/* : void*/ {
  },

  "public function isInstance",function isInstance(object/* : Object*/)/* : Boolean*/ {
    return object instanceof this.constructor_ || object && object.constructor===this.constructor_;
  },

  "public function getQualifiedName",function getQualifiedName()/* : String*/ {
    // AS uses namespace notation (::) to separate package and class name:
    return this.fullClassName.replace(/\.([^\.]+)^/, "::");
  },

  "public function toString",function toString()/* : String*/ {
    return this.fullClassName;
  },
];},[]
);joo.classLoader.prepare(/*
 * Copyright 2009 CoreMedia AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, 
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 * express or implied. See the License for the specific language 
 * governing permissions and limitations under the License.
 */

// JangarooScript runtime support. Author: Frank Wienberg

"package joo", ["import joo.NativeClassDeclaration","import joo.MemberDeclaration",

// this makes jooc generate a with(joo) statement:
"import joo.*",""],

"public class SystemClassDeclaration extends NativeClassDeclaration",function(SystemClassDeclaration,$$private){with(joo)with(SystemClassDeclaration)with($$private)return[function(){joo.classLoader.init(MemberDeclaration);}, 

  "protected static function createDefaultConstructor",function createDefaultConstructor(superName/* : String*/)/* : Function*/ {
    return (function $DefaultConstructor()/* : void*/ {
      this[superName].apply(this,arguments);
    });
  },

  "protected static function createPublicConstructor",function createPublicConstructor(cd/* : NativeClassDeclaration*/)/* : Function*/ {
    return function joo$SystemClassDeclaration$constructor()/* : void*/ {
      this.constructor =  cd.publicConstructor;
      cd.constructor_.apply(this, arguments);
    };
  },

  "private static function is_",function is_(object/* : **/, type/* : Function*/)/* : Boolean*/ {
    if (!type || object===undefined || object===null) {
      return false;
    }
    if (type["$class"]) {
      return (type["$class"]).isInstance(object);
    }
    // fallback:
    return object instanceof type || object.constructor===type;
  },function()

{
  // publish as "joo.is()" for use from JavaScript:
  getQualifiedObject("joo")["is"] = is_;
},

  "protected var",{
          package_/* : Object*/: undefined,
          isInterface/* : Boolean*/ : false,
          namespace_/* : String*/ : "intern",
          className/* : String*/: undefined,
          native_/* : Boolean*/ : false,
          extends_/* : String*/ : "Object",
          privateStatics/* : Object*/: undefined,
          memberDeclarations/* : **/: undefined /* Function, then Array */,
          memberDeclarationsByQualifiedName/* : Object*/: undefined,
          initializerNames/* : Array*/: undefined/*<String>*/, // names of slots that contain initializer functions
          staticInitializers/* : Array*/: undefined/*<MemberDeclaration>*/,
          boundMethodNames/* : Array*/: undefined/*<String>*/,  // names of slots that contain methods that need to be bound to "this"
          publicStaticMethodNames/* : Array*/: undefined},

  "public function SystemClassDeclaration",function $SystemClassDeclaration(packageDef/* : String*/, directives/* : Array*/, classDef/* : String*/, memberDeclarations/* : Function*/,
          publicStaticMethodNames/* : Array*/) {this[$super]();
    var packageName/* : String*/ = packageDef.split(/\s+/)[1] || "";
    this.package_ = getOrCreatePackage(packageName);
    this.parseDirectives(packageName, directives);
    var classMatch/* : Array*/ = classDef.match(/^\s*((public|internal|final|dynamic)\s+)*class\s+([A-Za-z][a-zA-Z$_0-9]*)(\s+extends\s+([a-zA-Z$_0-9.]+))?(\s+implements\s+([a-zA-Z$_0-9.,\s]+))?\s*$/);
    var interfaces/* : String*/;
    if (classMatch) {
      if (classMatch[5]) {
        this.extends_ = classMatch[5];
      }
      interfaces = classMatch[7];
    } else {
      classMatch = classDef.match(/^\s*((public|internal)\s+)?interface\s+([A-Za-z][a-zA-Z$_0-9]*)(\s+extends\s+([a-zA-Z$_0-9.,\s]+))?\s*$/);
      this.isInterface = true;
      interfaces = classMatch[5];
    }
    if (!classMatch) {
      throw new Error("SyntaxError: \""+classDef+"\" does not match.");
    }
    this.namespace_ = classMatch[2];
    this.className    = classMatch[3];
    var fullClassName/* : String*/ = this.className;
    if (packageName) {
      fullClassName = packageName+"."+this.className;
    }
    this.interfaces = interfaces ? interfaces.split(/\s*,\s*/) : [];
    this.memberDeclarations = memberDeclarations;
    this.publicStaticMethodNames = publicStaticMethodNames;
    var publicConstructor/* : Function*/ = getQualifiedObject(fullClassName);
    if (publicConstructor) {
      this.native_ = true;
    } else {
      publicConstructor = createPublicConstructor(this);
      this.package_[this.className] = publicConstructor;
    }
    this.create(fullClassName, publicConstructor);
    this.privateStatics = { "Class": Class, "assert": assert, "is": is_, "trace": trace };
  },

  "public function isNative",function isNative()/* : Boolean*/ {
    return this.native_;
  },

  //noinspection JSUnusedLocalSymbols
  "protected function parseDirectives",function parseDirectives(packageName/* : String*/, directives/* : Array*/)/* : void*/ { },

  "protected override function doComplete",function doComplete()/* : void*/ {
    this.superClassDeclaration = classLoader.getRequiredClassDeclaration(this.extends_);
    this.superClassDeclaration.complete();
    this.level = this.superClassDeclaration.level + 1;
    this.privateStatics.$super = this.level+"super";
    var Super/* : Function*/ = this.superClassDeclaration.Public;
    if (!this.native_) {
      this.publicConstructor.prototype = new Super();
    }
    this.Public = NativeClassDeclaration.createEmptyConstructor(this.publicConstructor);
  },

  "protected function initMembers",function initMembers()/* : void*/ {
    this.initializerNames = [];
    this.staticInitializers = [];
    this.boundMethodNames = [];
    var memberDeclarations/* : Array*/ = this.memberDeclarations(this.publicConstructor, this.privateStatics);
    this.memberDeclarations = [];
    this.memberDeclarationsByQualifiedName = {};
    this.constructor_ = null;
    for (var i/*:int*/ =0; i<memberDeclarations.length; ++i) {
      var item/* : **/ = memberDeclarations[i];
      switch (typeof item) {
        case "undefined":
          continue;
        case "function":
          this.staticInitializers.push(item);
          break;
        case "string":
          var memberDeclaration/* : MemberDeclaration*/ = MemberDeclaration.create(item);
          if (memberDeclaration) {
            if (!memberDeclaration.isNative()) {
              if (++i >= memberDeclarations.length) {
                throw new Error(this + ": Member expected after modifiers '" + item + "'.");
              }
              var member/* : Object*/ = memberDeclarations[i];
            }
            if (memberDeclaration.memberType == "function") {
              this.initMethod(memberDeclaration, member);
            } else {
              for (var memberName/*:String*/ in member) {
                this._storeMember(this._createMemberDeclaration(memberDeclaration, {memberName: memberName}), member[memberName]);
              }
            }
          }
      }
    }
    var defaultConstructor/* : Function*/ = this.native_ ? this.publicConstructor :
      this.publicConstructor.prototype[this.level+"super"] =
      this.initializerNames.length==0 ? this.superClassDeclaration.constructor_ : createSuperCall(this);
    if (!this.constructor_) {
      // create empty default constructor:
      this.constructor_ = defaultConstructor;
    }
    if (this.boundMethodNames.length>0) {
      this.constructor_ = createMethodBindingConstructor(this.constructor_, this.boundMethodNames);
    }
  },

  // must be defined static because otherwise, jooc will add .bind(this) to all function expressions!
  "private static function createSuperCall",function createSuperCall(cd/* : SystemClassDeclaration*/)/* : Function*/ {
    if (cd.extends_=="Object") {
      return function $super()/* : void*/ {
        for (var i/*:int*/ =0; i<cd.initializerNames.length; ++i) {
          var slot/* : String*/ = cd.initializerNames[i];
          this[slot] = this[slot]();
        }
      };
    }
    return function $super()/* : void*/ {
      cd.superClassDeclaration.constructor_.apply(this,arguments);
      for (var i/*:int*/ =0; i<cd.initializerNames.length; ++i) {
        var slot/* : String*/ = cd.initializerNames[i];
        this[slot] = this[slot]();
      }
    };
  },

  // must be defined static because otherwise, jooc will add .bind(this) to all function expressions!
  "private static function createMethodBindingConstructor",function createMethodBindingConstructor(constructor_/* : Function*/, boundMethodNames/* : Array*/)/* : Function*/ {
    return function $bindMethods()/* : void*/ {
      for (var i/*:int*/ =0; i<boundMethodNames.length; ++i) {
        var slot/* : String*/ = boundMethodNames[i];
        this[slot] = this[slot].bind(this);
      }
      constructor_.apply(this, arguments);
    };
  },

  "protected function _initSlot",function _initSlot(memberDeclaration/* : MemberDeclaration*/)/* : void*/ {
    memberDeclaration.slot = memberDeclaration.isPrivate() && !memberDeclaration.isStatic()
            ? this.privateStatics["$"+memberDeclaration.memberName] = this.level + memberDeclaration.memberName
            : memberDeclaration.memberName;
  },

  "protected function initMethod",function initMethod(memberDeclaration/* : MemberDeclaration*/, member/* : Function*/)/* : void*/ {
    if (memberDeclaration.memberName == this.className && !memberDeclaration.isStatic()) {
      if (memberDeclaration.getterOrSetter) {
        throw new Error(this+": Class name cannot be used for getter or setter: "+memberDeclaration);
      }
      this.constructor_ = memberDeclaration.isNative() ? this.publicConstructor : member;
    } else {
      this._initSlot(memberDeclaration);
      if (memberDeclaration.isNative()) {
        member = memberDeclaration.getNativeMember(this.publicConstructor);
      }
      if (this.extends_!="Object") {
        var superMethod/* : Function*/ = memberDeclaration.retrieveMember(this.superClassDeclaration.Public.prototype);
      }
      var overrides/* : Boolean*/ = ! !superMethod
        && superMethod!==member
        && superMethod!==Object.prototype[memberDeclaration.memberName];
      if (overrides !== memberDeclaration.isOverride()) {
        var msg/* : String*/ = overrides
                ? "Method overrides without 'override' modifier"
                : "Method with 'override' modifier does not override";
        throw new Error(this+": "+msg+": "+memberDeclaration);
      }
      if (overrides) {
        // found overriding: store super class' method as private member:
        this._storeMember(this._createMemberDeclaration(memberDeclaration, {_namespace: MemberDeclaration.NAMESPACE_PRIVATE}), superMethod);
      }
      this._storeMember(memberDeclaration, member);
      if (memberDeclaration.isBound()) {
        this.boundMethodNames.push(memberDeclaration.slot);
      }
    }
  },

  "protected function _createMemberDeclaration",function _createMemberDeclaration(memberDeclaration/* : MemberDeclaration*/, changedProperties/* : Object*/)/* : MemberDeclaration*/ {
    var newMemberDeclaration/* : MemberDeclaration*/ = memberDeclaration.clone(changedProperties);
    this._initSlot(newMemberDeclaration);
    return newMemberDeclaration;
  },

  "protected function _storeMember",function _storeMember(memberDeclaration/* : MemberDeclaration*/, value/* : Object*/)/* : void*/ {
    this.memberDeclarations.push(memberDeclaration);
    this.memberDeclarationsByQualifiedName[memberDeclaration.getQualifiedName()] = memberDeclaration;
    memberDeclaration.value = value;
    var _static/* : Boolean*/ = memberDeclaration.isStatic();
    var _private/* : Boolean*/ = memberDeclaration.isPrivate();
    var target/* : Object*/ = _static ? _private ? this.privateStatics : this.publicConstructor : this.publicConstructor.prototype;
    if (!memberDeclaration.hasOwnMember(target)) {
      memberDeclaration.storeMember(target);
      if (memberDeclaration.hasInitializer()) {
        if (_static) {
          this.staticInitializers.push(memberDeclaration);
        } else {
          this.initializerNames.push(memberDeclaration.slot);
        }
      }
    }
  },

  "protected override function doInit",function doInit()/* : void*/ {
    this.superClassDeclaration.init();
    this.initMembers();
    for (var i/*:int*/ =0; i<this.staticInitializers.length; ++i) {
      var staticInitializer/* : **/ = this.staticInitializers[i];
      if (typeof staticInitializer=="function") {
        staticInitializer();
      } else {
        var target/* : Object*/ = staticInitializer.isPrivate() ? this.privateStatics : this.publicConstructor;
        target[staticInitializer.slot] = target[staticInitializer.slot]();
      }
    }
  },

  "public function getMemberDeclaration",function getMemberDeclaration(namespace_/* : String*/, memberName/* : String*/)/* : MemberDeclaration*/ {
    return this.memberDeclarationsByQualifiedName[namespace_+"::"+memberName];
  },
];},[]
);joo.classLoader.prepare(/*
 * Copyright 2009 CoreMedia AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, 
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 * express or implied. See the License for the specific language 
 * governing permissions and limitations under the License.
 */

// JangarooScript runtime support. Author: Frank Wienberg

"package joo", ["import joo.SystemClassDeclaration","import joo.NativeClassDeclaration",

// this makes jooc generate a with(joo) statement:
"import joo.*",""],

"public class SystemClassLoader",function(SystemClassLoader,$$private){with(joo)with(SystemClassLoader)with($$private)return[ function()

{
  // must use qualified name, otherwise a global property would be created:
  joo.classLoader = new SystemClassLoader();
},

  "public static const",{ classDeclarationsByName/* : Object*//*<String,SystemClassDeclaration>*/ :function(){return( {});}},

  "public var",{ debug/* : Boolean*/ : false},

  "public function SystemClassLoader",function $SystemClassLoader() {this[$super]();    
  },

  "public function prepare",function prepare(packageDef/* : String*/, directives/* : Array*/, classDef/* : String*/, memberFactory/* : Function*/,
                          publicStaticMethodNames/* : Array*/)/* : void*/ {
    var cd/* : SystemClassDeclaration*/ = this.createClassDeclaration(packageDef, directives, classDef, memberFactory, publicStaticMethodNames);
    classDeclarationsByName[cd.fullClassName] = cd;
  },

  "protected function createClassDeclaration",function createClassDeclaration(packageDef/* : String*/, directives/* : Array*/, classDef/* : String*/, memberFactory/* : Function*/,
                          publicStaticMethodNames/* : Array*/)/* : SystemClassDeclaration*/ {
    return new SystemClassDeclaration(packageDef, directives, classDef, memberFactory, publicStaticMethodNames).init();
  },

  "public function getClassDeclaration",function getClassDeclaration(fullClassName/* : String*/)/* : NativeClassDeclaration*/ {
    var cd/* : NativeClassDeclaration*/ = classDeclarationsByName[fullClassName];
    if (!cd) {
      var constructor_/* : Function*/ = getQualifiedObject(fullClassName);
      if (constructor_) {
        if (!constructor_["$class"]) {
          // create SystemClassDeclaration for native classes:
          cd = this.createNativeClassDeclaration(fullClassName, constructor_).init();
          classDeclarationsByName[fullClassName] = cd;
        } else {
          cd = constructor_["$class"];
        }
      }
    }
    return cd;
  },

  /**
   * @param className
   * @return
   * @throws Error - ClassNotFound
   */
  "public function getRequiredClassDeclaration",function getRequiredClassDeclaration(className/* : String*/)/* : NativeClassDeclaration*/ {
    var cd/* : NativeClassDeclaration*/ = this.getClassDeclaration(className);
    if (!cd) {
      throw new Error("Class not found: "+className);
    }
    return cd;
  },

  "protected function createNativeClassDeclaration",function createNativeClassDeclaration(fullClassName/* : String*/, nativeClass/* : Function*/)/* : NativeClassDeclaration*/ {
    return new NativeClassDeclaration().create(fullClassName, nativeClass);
  },

];},[]
);joo.classLoader.prepare(/**
 * API and documentation by Adobe�.
 * Licensed under http://creativecommons.org/licenses/by-nc-sa/3.0/
 */
"package", [""],

/**
 * The Array class lets you access and manipulate arrays.
 * Array indices are zero-based, which means that the first element in the array is [0], the second element is [1],
 * and so on. To create an Array object, you use the new Array() constructor . Array() can also be invoked as
 * a function. In addition, you can use the array access ([]) operator to initialize an array or access the elements
 * of an array.
 * <p>You can store a wide variety of data types in an array element, including numbers, strings, objects, and even
 * other arrays. You can create a multidimensional array by creating an indexed array and assigning to each of its
 * elements a different indexed array. Such an array is considered multidimensional because it can be used to represent
 * data in a table.</p>
 * <p>Arrays are sparse arrays, meaning there might be an element at index 0 and another at index 5, but nothing in the
 * index positions between those two elements. In such a case, the elements in positions 1 through 4 are undefined,
 * which indicates the absence of an element, not necessarily the presence of an element with the value undefined.</p>
 * <p>Array assignment is by reference rather than by value. When you assign one array variable to another array
 * variable, both refer to the same array:</p>
 * <pre>
 * var oneArray:Array = new Array("a", "b", "c");
 * var twoArray:Array = oneArray; // Both array variables refer to the same array.
 * twoArray[0] = "z";
 * trace(oneArray);               // Output: z,b,c.
 * </pre>
 * <p>Do not use the Array class to create associative arrays (also called hashes), which are data structures that
 * contain named elements instead of numbered elements. To create associative arrays, use the Object class.
 * Although ActionScript permits you to create associative arrays using the Array class, you cannot use any of
 * the Array class methods or properties with associative arrays.</p>
 * <p>You can extend the Array class and override or add methods. However, you must specify the subclass as dynamic
 * or you will lose the ability to store data in an array.</p>
 * @see Object
 */
"public class Array extends Object",function(Array,$$private){with(Array)with($$private)return[ 

  /**
   * Specifies case-insensitive sorting for the Array class sorting methods.
   * You can use this constant for the options parameter in the sort() or sortOn() method.
   * The value of this constant is 1.
   * @see Array#sort()
   * @see Array#sortOn()
   */
  "public static const",{ CASEINSENSITIVE/* : uint*/ : 1},

  /**
   * Specifies descending sorting for the Array class sorting methods.
   * You can use this constant for the options parameter in the sort() or sortOn() method.
   * The value of this constant is 2.
   * @see Array#sort()
   * @see Array#sortOn()
   */
  "public static const",{ DESCENDING/* : uint*/ : 2},

  /**
   * Specifies numeric (instead of character-string) sorting for the Array class sorting methods.
   * Including this constant in the options parameter causes the sort() and sortOn() methods to sort numbers as numeric
   * values, not as strings of numeric characters. Without the NUMERIC constant, sorting treats each array element as
   * a character string and produces the results in Unicode order.
   * <p>For example, given the array of values <code>[2005, 7, 35]</code>, if the NUMERIC constant is not included in
   * the options parameter, the sorted array is <code>[2005, 35, 7]</code>, but if the NUMERIC constant is included,
   * the sorted array is <code>[7, 35, 2005]</code>.
   * This constant applies only to numbers in the array; it does not apply to strings that contain numeric data such
   * as <code>["23", "5"]</code>.</p>
   * <p>The value of this constant is 16.</p>
   * @see Array#sort()
   * @see Array#sortOn()
   */
  "public static const",{ NUMERIC/* : uint*/ : 16},

  /**
   * Specifies that a sort returns an array that consists of array indices.
   * <p>You can use this constant for the options parameter in the sort() or sortOn() method, so you have access to
   * multiple views of the array elements while the original array is unmodified.</p>
   * <p>The value of this constant is 8.</p>
   * @see Array#sort()
   * @see Array#sortOn()
   */
  "public static const",{ RETURNINDEXEDARRAY/* : uint*/ : 8},

  /**
   * Specifies the unique sorting requirement for the Array class sorting methods.
   * <p>You can use this constant for the options parameter in the sort() or sortOn() method. The unique sorting
   * option terminates the sort if any two elements or fields being sorted have identical values.</p>
   * <p>The value of this constant is 4.</p>
   * @see Array#sort()
   * @see Array#sortOn()
   */
  "public static const",{ UNIQUESORT/* : uint*/ : 4},

  /**
   * A non-negative integer specifying the number of elements in the array.
   * <p>This property is automatically updated when new elements are added to the array.</p>
   * <p>When you assign a value to an array element (for example, my_array[index] = value), if index is a number,
   * and index+1 is greater than the length property, the length property is updated to index+1.</p>
   * <p><b>Example</b></p>
   * <p>The following code creates an Array object names with the string element Bill. It then uses the push() method to
   * add another string element Kyle. The length of the array, as determined by the length property, was one element
   * before the use of push() and is two elements after push() is called. Another string, Jeff, is added to make the
   * length of names three elements. The shift() method is then called twice to remove Bill and Kyle, making the final
   * array of length one.</p>
   * <pre>
   * var names:Array = new Array("Bill");
   * names.push("Kyle");
   * trace(names.length); // 2
   * names.push("Jeff");
   * trace(names.length); // 3
   *
   * names.shift();
   * names.shift();
   * trace(names.length); // 1
   * </pre>
   */
  "public native function get length"/*() : uint;*/,

  /**
   * Change the length of this array.
   * <p><b>Note:</b> If you assign a value to the length property that is shorter than the existing length, the array
   * will be truncated.</p>
   * @param value A non-negative integer specifying the new number of elements in the array.
   * @see Array#length
   */
  "public native function set length"/*(value : uint):void;*/,

  /**
   * Lets you create an array of the specified number of elements.
   * If you don't specify any parameters, an array containing 0 elements is created.
   * If you specify a number of elements, an array is created with numElements number of elements.
   * <p><b>Note:</b> The constructor accepts variable types of arguments. The constructor behaves differently depending
   * on the type and number of arguments passed, as detailed in the following.
   * ActionScript 3.0 does not support method or constructor overloading.</p>
   * <p>If there are more than one parameter or one parameter that is not a number, you create an array that contains
   * the specified elements. You can specify values of any type. The first element in an array always has an index
   * (or position) of 0.</p>
   * <p><b>Example</b></p>
   * The following example creates the Array object myArr with no arguments and an initial length of 0:
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_Array extends Sprite {
   *   public function Array_Array() {
   *     var myArr:Array = new Array();
   *     trace(myArr.length); // 0
   *   }
   * }
   * }
   * </pre>
   * <p><b>Example</b></p>
   * <p>The following example creates an Array object with 5 initial elements, with a length of 5, and populates the
   * first element with the string "one", and adds the string element "six" to the end of the array by using the push()
   * method:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_Array_2 extends Sprite {
   *   public function Array_Array_2() {
   *     var myArr:Array = new Array(5);
   *     trace(myArr.length); // 5
   *     myArr[0] = "one";
   *     myArr.push("six");
   *     trace(myArr);         // one,,,,,six
   *     trace(myArr.length); // 6
   *   }
   * }
   * }
   * </pre>
   * <p><b>Example</b></p>
   * The following example creates a new Array object with an initial length of 3, populates the array with the
   * string elements one, two, and three, and then converts the elements to a string.
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_Array_3 extends Sprite {
   *
   *   public function Array_Array_3() {
   *     var myArr:Array = new Array("one", "two", "three");
   *     trace(myArr.length); // 3
   *     trace(myArr);          // one,two,three
   *   }
   * }
   * }
   * </pre>
   * @param values A comma-separated list of one or more arbitrary values or an integer that specifies the number of
   *  elements in the array. If only a single numeric parameter is passed to the Array constructor, it is assumed to
   *  specify the array's length property.
   * @throws RangeError The argument is a number that is not an integer greater than or equal to 0.
   * @see Array#length
   */
  "public native function Array"/*(... values);*/,

  /**
   * Concatenates the elements specified in the parameters with the elements in an array and creates a new array.
   * If the parameters specify an array, the elements of that array are concatenated.
   * <p><b>Example</b></p>
   * The following code creates four Array objects:
   * <ul>
   * <li>The numbers array, which contains the numbers 1, 2, and 3.
   * <li>The letters array, which contains the letters a, b, and c.
   * <li>The numbersAndLetters array, which calls the concat() method to produce the array [1,2,3,a,b,c].
   * <li>The lettersAndNumbers array, which calls the concat() method to produce the array [a,b,c,1,2,3].
   * </ul>
   * <pre>
   * var numbers:Array = new Array(1, 2, 3);
   * var letters:Array = new Array("a", "b", "c");
   * var numbersAndLetters:Array = numbers.concat(letters);
   * var lettersAndNumbers:Array = letters.concat(numbers);
   *
   * trace(numbers);       // 1,2,3
   * trace(letters);       // a,b,c
   * trace(numbersAndLetters); // 1,2,3,a,b,c
   * trace(lettersAndNumbers); // a,b,c,1,2,3
   * </pre>
   * @param args A value of any data type (such as numbers, elements, or strings) to be concatenated in a new array.
   *   If you don't pass any values, the new array is a duplicate of the original array.
   * @return An array that contains the elements from this array followed by elements from the parameters.
   */
  "public native function concat"/*(... args) : Array;*/,

  /**
   * Executes a test function on each item in the array until an item is reached that returns false for the specified
   * function. You use this method to determine whether all items in an array meet a criterion, such as having values
   * less than a particular number.
   * <p>For this method, the second parameter, thisObject, must be null if the first parameter, callback, is a method
   * closure. Suppose you create a function in a movie clip called me:</p>
   * <pre>
   * function myFunction(){
   *  //your code here
   * }
   * </pre>
   * Suppose you then use the filter() method on an array called myArray:
   * <pre>
   * myArray.filter(myFunction, me);
   * </pre>
   * Because myFunction is a member of the Timeline class, which cannot be overridden by me, the runtime will throw
   * an exception. You can avoid this runtime error by assigning the function to a variable, as follows:
   * <pre>
   * var foo:Function = myFunction() {
   *   //your code here
   * };
   * myArray.filter(foo, me);
   * </pre>
   * <p><b>Example</b></p>
   * The following example tests two arrays to determine whether every item in each array is a number. It also
   * outputs the results of the test, showing that isNumeric is true for the first array and false for the second:
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_every extends Sprite {
   *   public function Array_every() {
   *     var arr1:Array = new Array(1, 2, 4);
   *     var res1:Boolean = arr1.every(isNumeric);
   *     trace("isNumeric:", res1); // true
   *
   *     var arr2:Array = new Array(1, 2, "ham");
   *     var res2:Boolean = arr2.every(isNumeric);
   *     trace("isNumeric:", res2); // false
   *   }
   *   private function isNumeric(element:*, index:int, arr:Array):Boolean {
   *     return (element is Number);
   *   }
   * }
   * }
   * </pre>
   * @param callback The function to run on each item in the array. This function can contain a simple comparison
   * (for example, item < 20) or a more complex operation, and is invoked with three arguments; the value of an item,
   * the index of an item, and the Array object:
   * <code>function callback(item:*, index:int, array:Array):Boolean;</code>
   * @param thisObject (default = null) An object to use as this for the function.
   * @return A Boolean value of true if all items in the array return true for the specified function; otherwise, false.
   * @see Array#some
   */
  "public function every",function every(callback/* : Function*/, thisObject/* : **/)/* : Boolean*/ {if(arguments.length<2){thisObject = null;}
    var i/* : uint*/ = 0,
            j/* : uint*/ = this.length;
    // for maximum performance, repeat for-loop code with different function invocations:
    if (thisObject) {
      for (; i < j; i++) {
        if (i in this) {
          if (!callback.call(thisObject, this[i], i, this)) {
            return false;
          }
        }
      }
    } else {
      for (; i < j; i++) {
        if (i in this) {
          if (!callback(this[i], i, this)) {
            return false;
          }
        }
      }
    }
    return true;
  },

  /**
   * Executes a test function on each item in the array and constructs a new array for all items that return true for
   * the specified function. If an item returns false, it is not included in the new array.
   * <p>For this method, the second parameter, thisObject, must be null if the first parameter, callback, is a method
   * closure. Suppose you create a function in a movie clip called me:</p>
   * <pre>
   * function myFunction(){
   *   //your code here
   * }
   * </pre>
   * <p>Suppose you then use the filter() method on an array called myArray:</p>
   * <pre>
   * myArray.filter(myFunction, me);
   * </pre>
   * <p>Because myFunction is a member of the Timeline class, which cannot be overridden by me, the runtime will throw
   * an exception. You can avoid this runtime error by assigning the function to a variable, as follows:</p>
   * <pre>
   * var foo:Function = myFunction() {
   *   //your code here
   * };
   * myArray.filter(foo, me);
   * </pre>
   * <p><b>Example</b></p>
   * <p>The following example creates an array of all employees who are managers:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_filter extends Sprite {
   *   public function Array_filter() {
   *     var employees:Array = new Array();
   *     employees.push({name:"Employee 1", manager:false});
   *     employees.push({name:"Employee 2", manager:true});
   *     employees.push({name:"Employee 3", manager:false});
   *     trace("Employees:");
   *     employees.forEach(traceEmployee);
   *
   *     var managers:Array = employees.filter(isManager);
   *     trace("Managers:");
   *     managers.forEach(traceEmployee);
   *   }
   *   private function isManager(element:*, index:int, arr:Array):Boolean {
   *     return (element.manager == true);
   *   }
   *   private function traceEmployee(element:*, index:int, arr:Array):void {
   *     trace("\t" + element.name + ((element.manager) ? " (manager)" : ""));
   *   }
   * }
   * }
   * </pre>
   * @param callback The function to run on each item in the array. This function can contain a simple comparison
   * (for example, item < 20) or a more complex operation, and is invoked with three arguments; the value of an item,
   * the index of an item, and the Array object:
   * <code>function callback(item:*, index:int, array:Array):void;</code>
   * @param thisObject (default = null) An object to use as this for the function.
   * @return A new array that contains all items from the original array that returned true.
   * @see Array#map
   */
  "public function filter",function filter(callback/* : Function*/, thisObject/* : **/)/* : Array*/ {
    var len/* : uint*/ = this.length;
    var res/* : Array*/ = [];
    var i/* : uint*/ = 0;
    var val/* : **/;
    if (thisObject) {
      // for maximum performance, repeat for-loop code with different function invocations:
      for (; i < len; i++) {
        if (i in this) {
          val = this[i];
          if (callback.call(thisObject, val, i, this)) {
            res.push(val);
          }
        }
      }
    } else {
      for (; i < len; i++) {
        if (i in this) {
          val = this[i];
          if (callback(val, i, this)) {
            res.push(val);
          }
        }
      }
    }
    return res;
  },

  /**
   * Executes a function on each item in the array.
   * <p>For this method, the second parameter, thisObject, must be null if the first parameter, callback, is a method
   * closure. Suppose you create a function in a movie clip called me:</p>
   * <pre>
   * function myFunction(){
   *   //your code here
   * }
   * </pre>
   * <p>Suppose you then use the filter() method on an array called myArray:</p>
   * <pre>
   * myArray.filter(myFunction, me);
   * </pre>
   * <p>Because myFunction is a member of the Timeline class, which cannot be overridden by me, the runtime will throw an
   * exception. You can avoid this runtime error by assigning the function to a variable, as follows:</p>
   * <pre>
   * var foo:Function = myFunction() {
   *   //your code here
   * };
   * myArray.filter(foo, me);
   * </pre>
   * <p><b>Example</b></p>
   * <p>The following example runs the trace() statement in the traceEmployee() function on each item in the array:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_forEach extends Sprite {
   *   public function Array_forEach() {
   *     var employees:Array = new Array();
   *     employees.push({name:"Employee 1", manager:false});
   *     employees.push({name:"Employee 2", manager:true});
   *     employees.push({name:"Employee 3", manager:false});
   *     trace(employees);
   *     employees.forEach(traceEmployee);
   *   }
   *   private function traceEmployee(element:*, index:int, arr:Array):void {
   *     trace(element.name + " (" + element.manager + ")");
   *   }
   * }
   * }
   * </pre>
   * <p>The following example also runs the trace() statement in a slightly altered traceEmployee() function on each item
   * in the array:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_forEach_2 extends Sprite {
   *   public function Array_forEach_2() {
   *      var employeeXML:XML = &lt;employees>
   *          &lt;employee name="Steven" manager="false" />
   *          &lt;employee name="Bruce" manager="true" />
   *          &lt;employee name="Rob" manager="false" />
   *        &lt;/employees>;
   *      var employeesList:XMLList = employeeXML.employee;
   *      var employeesArray:Array = new Array();
   *      for each (var tempXML:XML in employeesList) {
   *        employeesArray.push(tempXML);
   *     }
   *     employeesArray.sortOn("@name");
   *     employeesArray.forEach(traceEmployee);
   *   }
   *   private function traceEmployee(element:*, index:Number, arr:Array):void {
   *     trace(element.@name + ((element.@manager == "true") ? " (manager)" : ""));
   *   }
   * }
   * }
   * </pre>
   * @param callback The function to run on each item in the array. This function can contain a simple command
   * (for example, a trace() statement) or a more complex operation, and is invoked with three arguments; the value of
   * an item, the index of an item, and the Array object:
   * <code>function callback(item:*, index:int, array:Array):void;</code>
   * @param thisObject (default = null) An object to use as this for the function.
   */
  "public function forEach",function forEach(callback/*:Function*/, thisObject/*:**/)/* : void*/ {
    var i/* : uint*/ = 0,
            j/* : uint*/ = this.length;
    // for maximum performance, repeat for-loop code with different function invocations:
    if (thisObject) {
      for (; i < j; i++) {
        if (i in this) {
          callback.call(thisObject, this[i], i, this);
        }
      }
    } else {
      for (; i < j; i++) {
        if (i in this) {
          callback(this[i], i, this);
        }
      }
    }
  },


  /**
   * Searches for an item in an array by using strict equality (===) and returns the index position of the item.
   * <p><b>Example</b></p>
   * <p>The following example displays the position of the specified array:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_indexOf extends Sprite {
   *   public function Array_indexOf() {
   *     var arr:Array = new Array(123,45,6789);
   *     arr.push("123-45-6789");
   *     arr.push("987-65-4321");
   *
   *     var index:int = arr.indexOf("123");
   *     trace(index); // -1
   *
   *     var index2:int = arr.indexOf(123);
   *     trace(index2); // 0
   *   }
   * }
   * }
   * </pre>
   * @param searchElement The item to find in the array.
   * @param fromIndex (default = 0) The location in the array from which to start searching for the item.
   * @return A zero-based index position of the item in the array.
   *  If the searchElement argument is not found, the return value is -1.
   * @see Array#lastIndexOf()
   */
  "public function indexOf",function indexOf(searchElement/* : **/, fromIndex/* : int*/)/* : int*/ {if(arguments.length<2){fromIndex = 0;}
    var len/* : uint*/ = this.length;
    for (var i/*:uint*/ = (fromIndex < 0) ? Math.max(0, len + fromIndex) : fromIndex || 0; i < len; i++) {
      if (searchElement === this[i])
        return i;
    }
    return -1;
  },


  /**
   * Converts the elements in an array to strings, inserts the specified separator between the elements, concatenates
   * them, and returns the resulting string. A nested array is always separated by a comma (,), not by the separator
   * passed to the join() method.
   * <p><b>Example</b></p>
   * <p>The following code creates an Array object myArr with elements one, two, and three and then a string containing one
   * and two and three using the join() method.</p>
   * <pre>
   * var myArr:Array = new Array("one", "two", "three");
   * var myStr:String = myArr.join(" and ");
   * trace(myArr); // one,two,three
   * trace(myStr); // one and two and three
   * </pre>
   * <p>The following code creates an Array object specialChars with elements (, ), -, and a blank space and then creates a
   * string containing (888) 867-5309. Then, using a for loop, it removes each type of special character listed in
   * specialChars to produce a string (myStr) that contains only the digits of the phone number remaining: 888675309.
   * Note that other characters, such as +, could have been added to specialChars and then this routine would work with
   * international phone number formats.</p>
   * <pre>
   * var phoneString:String = "(888) 867-5309";
   *
   * var specialChars:Array = new Array("(", ")", "-", " ");
   * var myStr:String = phoneString;
   *
   * var ln:uint = specialChars.length;
   * for(var i:uint; i < ln; i++) {
   *   myStr = myStr.split(specialChars[i]).join("");
   * }
   *
   * var phoneNumber:Number = new Number(myStr);
   *
   * trace(phoneString); // (888) 867-5309
   * trace(phoneNumber); // 8888675309
   * </pre>
   * @param sep A character or string that separates array elements in the returned string. If you omit this parameter,
   *   a comma is used as the default separator.
   * @return A string consisting of the elements of an array converted to strings and separated by the specified parameter.
   * @see String#split
   */
  "public native function join"/*(sep : *) : String;*/,


  /**
   * Searches for an item in an array, working backward from the last item, and returns the index position of the
   * matching item using strict equality (===).
   * <p><b>Example</b></p>
   * <p>The following example displays the position of the specified array:</p>
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_lastIndexOf extends Sprite {
   *   public function Array_lastIndexOf() {
   *     var arr:Array = new Array(123,45,6789,123,984,323,123,32);
   *
   *     var index:int = arr.indexOf(123);
   *     trace(index); // 0
   *
   *     var index2:int = arr.lastIndexOf(123);
   *     trace(index2); // 6
   *   }
   * }
   * }
   * </pre>
   * @param searchElement The item to find in the array.
   * @param fromIndex (default = 0x7fffffff) The location in the array from which to start searching for the item.
   *   The default is the maximum value allowed for an index. If you do not specify fromIndex, the search starts at
   *   the last item in the array.
   * @return A zero-based index position of the item in the array. If the searchElement argument is not found, the
   *   return value is -1.
   * @see Array#indexOf()
   */
  "public function lastIndexOf",function lastIndexOf(searchElement/*:**/, fromIndex/*:int*/)/* : int*/ {if(arguments.length<2){fromIndex = 0x7fffffff;}
    // TODO: test!
    var len/* : uint*/ = this.length;
    for (var i/*:int*/ = ((fromIndex < 0) ? Math.max(len, len - fromIndex) : fromIndex || len) - 1; i >= 0; i--) {
      if (searchElement === this[i])
        return i;
    }
    return -1;
  },

  /**
   * Executes a function on each item in an array, and constructs a new array of items corresponding to the results of
   * the function on each item in the original array.
   * For this method, the second parameter, thisObject, must be null if the first parameter, callback, is a method
   * closure. Suppose you create a function in a movie clip called me:
   * <pre>
   * function myFunction(){
   *   //your code here
   * }
   * </pre>
   * Suppose you then use the filter() method on an array called myArray:
   * <pre>
   * myArray.filter(myFunction, me);
   * </pre>
   * Because myFunction is a member of the Timeline class, which cannot be overridden by me, Flash Player will throw
   * an exception. You can avoid this runtime error by assigning the function to a variable, as follows:
   * <pre>
   * var foo:Function = myFunction() {
   *   //your code here
   * };
   * myArray.filter(foo, me);
   * </pre>
   * <p><b>Example</b></p>
   * The following example changes all items in the array to use uppercase letters:
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_map extends Sprite {
   *   public function Array_map() {
   *     var arr:Array = new Array("one", "two", "Three");
   *     trace(arr); // one,two,Three
   *
   *     var upperArr:Array = arr.map(toUpper);
   *     trace(upperArr); // ONE,TWO,THREE
   *   }
   *   private function toUpper(element:*, index:int, arr:Array):String {
   *     return String(element).toUpperCase();
   *   }
   * }
   * }
   * </pre>
   * @param callback The function to run on each item in the array. This function can contain a simple command
   * (such as changing the case of an array of strings) or a more complex operation, and is invoked with three
   * arguments; the value of an item, the index of an item, and the Array object:
   * <code>function callback(item:*, index:int, array:Array):void;</code>
   * @param thisObject (default = null) An object to use as this for the function.
   * @return A new array that contains the results of the function on each item in the original array.
   * @see Array#filter()
   */
  "public function map",function map(callback/* : Function*/, thisObject/* : **/)/* : Array*/ {if(arguments.length<2){thisObject = null;}
    var results/* : Array*/ = [];
    var i/* : uint*/ = 0,
            j/* : uint*/ = this.length;
    // for maximum performance, repeat for-loop code with different function invocations:
    if (thisObject) {
      for (; i < j; i++) {
        results[i] = callback.call(thisObject, this[i], i, this);
      }
    } else {
      for (; i < j; i++) {
        results[i] = callback(this[i], i, this);
      }
    }
    return results;
  },


  /**
   * Removes the last element from an array and returns the value of that element.
   * <p><b>Example</b></p>
   * The following code creates an Array object letters with elements a, b, and c. The last element (c) is then removed
   * from the array using the pop() method and assigned to the String object letter.
   * <pre>
   * var letters:Array = new Array("a", "b", "c");
   * trace(letters); // a,b,c
   * var letter:String = letters.pop();
   * trace(letters); // a,b
   * trace(letter);  // c
   * </pre>
   * @return The value of the last element (of any data type) in the specified array.
   * @see Array#push()
   * @see Array#shift()
   * @see Array#unshift()
   */
  "public native function pop"/*() : Object;*/,


  /**
   * Adds one or more elements to the end of an array and returns the new length of the array.
   * <p><b>Example</b></p>
   * The following code creates an empty Array object letters and then populates the array with
   * the elements a, b, and c using the push() method.
   * <pre>
   * var letters:Array = new Array();
   *
   * letters.push("a");
   * letters.push("b");
   * letters.push("c");
   *
   * trace(letters.toString()); // a,b,c
   * </pre>
   * The following code creates an Array object letters, which is initially populated with the element a.
   * The push() method is then used once to add the elements b and c to the end of the array, which is three elements
   * after the push.
   * <pre>
   * var letters:Array = new Array("a");
   * var count:uint = letters.push("b", "c");
   *
   * trace(letters); // a,b,c
   * trace(count);   // 3
   * </pre>
   * @param args One or more values to append to the array.
   * @return An integer representing the length of the new array.
   * @see Array#pop()
   * @see Array#shift()
   * @see Array#unshift()
   */
  "public native function push"/*(... args) : uint;*/,


  /**
   * Reverses the array in place.
   * <p><b>Example</b></p>
   * The following code creates an Array object letters with elements a, b, and c. The order of the array elements is
   * then reversed using the reverse() method to produce the array [c,b,a].
   * <pre>
   * var letters:Array = new Array("a", "b", "c");
   * trace(letters); // a,b,c
   * letters.reverse();
   * trace(letters); // c,b,a
   * </pre>
   * @return The new array.
   */
  "public native function reverse"/*() : Array;*/,


  /**
   * Removes the first element from an array and returns that element.
   * The remaining array elements are moved from their original position, i, to i-1.
   * <p><b>Example</b></p>
   * <p>The following code creates the Array object letters with elements a, b, and c. The shift() method is then used to
   * remove the first element (a) from letters and assign it to the string firstLetter.</p>
   * <pre>
   * var letters:Array = new Array("a", "b", "c");
   * var firstLetter:String = letters.shift();
   * trace(letters);     // b,c
   * trace(firstLetter); // a
   * </pre>
   * @return The first element (of any data type) in an array.
   * @see Array#pop()
   * @see Array#push()
   * @see Array#unshift()
   */
  "public native function shift"/*() : Object;*/,

  /**
   * Returns a new array that consists of a range of elements from the original array, without modifying the original
   * array. The returned array includes the startIndex element and all elements up to, but not including, the endIndex
   * element.
   * <p><b>Example</b></p>
   * <p>The following code creates an Array object letters with elements [a,b,c,d,e,f]. The array someLetters is then
   * created by calling the slice() method on elements one (b) through three (d), resulting in an array with
   * elements b and c.</p>
   * <pre>
   * var letters:Array = new Array("a", "b", "c", "d", "e", "f");
   * var someLetters:Array = letters.slice(1,3);
   *
   * trace(letters);     // a,b,c,d,e,f
   * trace(someLetters); // b,c
   * </pre>
   * The following code creates an Array object letters with elements <code>[a,b,c,d,e,f]</code>.
   * The array someLetters is then created by calling the slice() method on element two (c), resulting in an array with
   * elements <code>[c,d,e,f]</code>.
   *
   * var letters:Array = new Array("a", "b", "c", "d", "e", "f");
   * var someLetters:Array = letters.slice(2);
   *
   * trace(letters);     // a,b,c,d,e,f
   * trace(someLetters); // c,d,e,f
   * </pre>
   * * The following code creates an Array object letters with elements [a,b,c,d,e,f]. The array someLetters is then
   * * created by calling the slice() method on the second to last element from the end (e), resulting in an array with
   * * elements e and f.
   * <pre>
   * var letters:Array = new Array("a", "b", "c", "d", "e", "f");
   * var someLetters:Array = letters.slice(-2);
   *
   * trace(letters);     // a,b,c,d,e,f
   * trace(someLetters); // e,f
   * </pre>
   * If you don't pass any parameters, a duplicate of the original array is created.
   * @param startIndex (default = 0) A number specifying the index of the starting point for the slice. If start is a
   * negative number, the starting point begins at the end of the array, where -1 is the last element.
   * @param endIndex (default = -1) A number specifying the index of the ending point for the slice. If you omit this
   * parameter, the slice includes all elements from the starting point to the end of the array. If end is a negative
   * number, the ending point is specified from the end of the array, where -1 is the last element.
   * @return An array that consists of a range of elements from the original array.
   */
  "public native function slice"/*(startIndex : int, endIndex : int) : Array;*/,

  /**
   * Executes a test function on each item in the array until an item is reached that returns true. Use this method to
   * determine whether any items in an array meet a criterion, such as having a value less than a particular number.
   *
   * For this method, the second parameter, thisObject, must be null if the first parameter, callback, is a method
   * closure. Suppose you create a function in a movie clip called me:
   * <pre>
   * function myFunction(){
   *   //your code here
   * }
   * </pre>
   * * Suppose you then use the filter() method on an array called myArray:
   * <pre>
   * myArray.filter(myFunction, me);
   * </pre>
   * Because myFunction is a member of the Timeline class, which cannot be overridden by me, the runtime will throw an
   * exception. You can avoid this runtime error by assigning the function to a variable, as follows:
   * <pre>
   * var foo:Function = myFunction() {
   *   //your code here
   * };
   * myArray.filter(foo, me);
   * </pre>
   * * <p><b>Example</b></p>
   * * The following example displays which values are undefined:
   * <pre>
   * package {
   * import flash.display.Sprite;
   * public class Array_some extends Sprite {
   *   public function Array_some() {
   *     var arr:Array = new Array();
   *     arr[0] = "one";
   *     arr[1] = "two";
   *     arr[3] = "four";
   *     var isUndef:Boolean = arr.some(isUndefined);
   *     if (isUndef) {
   *       trace("array contains undefined values: " + arr);
   *     } else {
   *       trace("array contains no undefined values.");
   *     }
   *   }
   *   private function isUndefined(element:*, index:int, arr:Array):Boolean {
   *     return (element == undefined);
   *   }
   * }
   * }
   * </pre>
   * @param callback The function to run on each item in the array. This function can contain a simple comparison
   * (for example item < 20) or a more complex operation, and is invoked with three arguments; the value of an item,
   * the index of an item, and the Array object:
   * <code>function callback(item:*, index:int, array:Array):Boolean;</code>
   * @param thisObject (default = null) An object to use as this for the function.
   * @return A Boolean value of true if any items in the array return true for the specified function; otherwise false.
   * @see Array#every()
   */
  "public function some",function some(callback/* : Function*/, thisObject/* : **/)/* : Boolean*/ {if(arguments.length<2){thisObject = null;}
    var i/* : uint*/ = 0,
            j/* : uint*/ = this.length;
    // for maximum performance, repeat for-loop code with different function invocations:
    if (thisObject) {
      for (; i < j; i++) {
        if (i in this) {
          if (callback.call(thisObject, this[i], i, this)) {
            return true;
          }
        }
      }
    } else {
      for (; i < j; i++) {
        if (i in this) {
          if (callback(this[i], i, this)) {
            return true;
          }
        }
      }
    }
    return false;
  },

  /**
   * Sorts the elements in an array. This method sorts according to Unicode values. (ASCII is a subset of Unicode.)
   * By default, Array.sort() works in the following way:
   * <ul>
   * <li>Sorting is case-sensitive (Z precedes a).
   * <li>Sorting is ascending (a precedes b).
   * <li>The array is modified to reflect the sort order; multiple elements that have identical sort fields are placed
   *   consecutively in the sorted array in no particular order.
   * <li>All elements, regardless of data type, are sorted as if they were strings, so 100 precedes 99, because "1" is
   *   a lower string value than "9".
   * </ul>
   * To sort an array by using settings that deviate from the default settings, you can either use one of the sorting
   * options described in the sortOptions portion of the ...args parameter description, or you can create your own
   * custom function to do the sorting. If you create a custom function, you call the sort() method, and use the name
   * of your custom function as the first argument (compareFunction).
   *
   * <p><b>Example</b></p>
   * The following code creates the Array object vegetables with elements
   * <code>[spinach, green pepper, cilantro, onion, avocado]</code>.
   * The array is then sorted by the sort() method, which is called with no parameters. The result is vegetables sorted
   * in alphabetical order (<code>[avocado, cilantro, green pepper, onion, spinach]</code>).
   * <pre>
   * var vegetables:Array = new Array("spinach",
   *   "green pepper",
   *   "cilantro",
   *   "onion",
   *   "avocado");
   *
   * trace(vegetables); // spinach,green pepper,cilantro,onion,avocado
   * vegetables.sort();
   * trace(vegetables); // avocado,cilantro,green pepper,onion,spinach
   * </pre>
   * The following code creates the Array object vegetables with elements
   * <code>[spinach, green pepper, Cilantro, Onion, and Avocado]</code>.
   * The array is then sorted by the sort() method, which is called with no parameters the first time; the result is
   * <code>[Avocado,Cilantro,Onion,green pepper,spinach]</code>.
   * Then sort() is called on vegetables again with the CASEINSENSITIVE constant as a parameter. The result is
   * vegetables sorted in alphabetical order (<code>[Avocado, Cilantro, green pepper, Onion, spinach]</code>).
   * <pre>
   * var vegetables:Array = new Array("spinach",
   *   "green pepper",
   *   "Cilantro",
   *   "Onion",
   *   "Avocado");
   *
   * vegetables.sort();
   * trace(vegetables); // Avocado,Cilantro,Onion,green pepper,spinach
   * vegetables.sort(Array.CASEINSENSITIVE);
   * trace(vegetables); // Avocado,Cilantro,green pepper,Onion,spinach
   * </pre>
   * The following code creates the empty Array object vegetables, which is then populated through five calls to push().
   * Each time push() is called, a new Vegetable object is created by a call to the Vegetable() constructor, which
   * accepts a String (name) and Number (price) object. Calling push() five times with the values shown results in the
   * following array:
   * <code>[lettuce:1.49, spinach:1.89, asparagus:3.99, celery:1.29, squash:1.44]</code>.
   * The sort() method is then used to sort the array, resulting in the array
   * <code>[asparagus:3.99, celery:1.29, lettuce:1.49, spinach:1.89, squash:1.44]</code>.
   * <pre>
   * var vegetables:Array = new Array();
   * vegetables.push(new Vegetable("lettuce", 1.49));
   * vegetables.push(new Vegetable("spinach", 1.89));
   * vegetables.push(new Vegetable("asparagus", 3.99));
   * vegetables.push(new Vegetable("celery", 1.29));
   * vegetables.push(new Vegetable("squash", 1.44));
   *
   * trace(vegetables);
   * // lettuce:1.49, spinach:1.89, asparagus:3.99, celery:1.29, squash:1.44
   *
   * vegetables.sort();
   *
   * trace(vegetables);
   * // asparagus:3.99, celery:1.29, lettuce:1.49, spinach:1.89, squash:1.44
   *
   * //The following code defines the Vegetable class
   * class Vegetable {
   *   private var name:String;
   *   private var price:Number;
   *
   *   public function Vegetable(name:String, price:Number) {
   *     this.name = name;
   *     this.price = price;
   *   }
   *
   *   public function toString():String {
   *     return " " + name + ":" + price;
   *   }
   * }
   * </pre>
   * The following example is exactly the same as the previous one, except that the sort() method is used with a custom
   * sort function (sortOnPrice), which sorts according to price instead of alphabetically. Note that the new function
   * getPrice() extracts the price.
   * <pre>
   * var vegetables:Array = new Array();
   * vegetables.push(new Vegetable("lettuce", 1.49));
   * vegetables.push(new Vegetable("spinach", 1.89));
   * vegetables.push(new Vegetable("asparagus", 3.99));
   * vegetables.push(new Vegetable("celery", 1.29));
   * vegetables.push(new Vegetable("squash", 1.44));
   *
   * trace(vegetables);
   * // lettuce:1.49, spinach:1.89, asparagus:3.99, celery:1.29, squash:1.44
   *
   * vegetables.sort(sortOnPrice);
   *
   * trace(vegetables);
   * // celery:1.29, squash:1.44, lettuce:1.49, spinach:1.89, asparagus:3.99
   *
   * function sortOnPrice(a:Vegetable, b:Vegetable):Number {
   *   var aPrice:Number = a.getPrice();
   *   var bPrice:Number = b.getPrice();
   *
   *   if(aPrice > bPrice) {
   *     return 1;
   *   } else if(aPrice < bPrice) {
   *     return -1;
   *   } else  {
   *     //aPrice == bPrice
   *     return 0;
   *   }
   * }
   *
   * // The following code defines the Vegetable class and should be in a separate package.
   * class Vegetable {
   *   private var name:String;
   *   private var price:Number;
   *
   *   public function Vegetable(name:String, price:Number) {
   *     this.name = name;
   *     this.price = price;
   *   }
   *
   *   public function getPrice():Number {
   *     return price;
   *   }
   *
   *   public function toString():String {
   *     return " " + name + ":" + price;
   *   }
   * }
   * </pre>
   * The following code creates the Array object numbers with elements <code>[3,5,100,34,10]</code>.
   * A call to sort() without any parameters sorts alphabetically, producing the undesired result
   * <code>[10,100,3,34,5]</code>.
   * To properly sort numeric values, you must pass the constant NUMERIC to the sort() method, which sorts numbers
   * as follows: <code>[3,5,10,34,100]</code>.
   * <p><b>Note:</b> The default behavior of the sort() function is to handle each entity as a string.
   * The Array.NUMERIC argument does not actually convert other data types to the Number data type; it simply allows
   * the sort algorithm to recognize numbers.</p>
   * <pre>
   * var numbers:Array = new Array(3,5,100,34,10);
   *
   * trace(numbers); // 3,5,100,34,10
   * numbers.sort();
   * trace(numbers); // 10,100,3,34,5
   * numbers.sort(Array.NUMERIC);
   * trace(numbers); // 3,5,10,34,100
   * </pre>
   * @param args The arguments specifying a comparison function and one or more values that determine the behavior of
   *   the sort. This method uses the syntax and argument order <code>Array.sort(compareFunction, sortOptions)</code>
   *   with the arguments defined as follows:
   * <ul>
   * <li>compareFunction - A comparison function used to determine the sorting order of elements in an array.
   *   This argument is optional. A comparison function should take two arguments to compare.
   *   Given the elements A and B, the result of compareFunction can have one of the following three values:
   *   <ul>
   *   <li>-1, if A should appear before B in the sorted sequence
   *   <li>0, if A equals B
   *   <li>1, if A should appear after B in the sorted sequence
   *   </ul>
   * <li>sortOptions - One or more numbers or defined constants, separated by the | (bitwise OR) operator, that change
   *   the behavior of the sort from the default. This argument is optional. The following values are acceptable for
   *   sortOptions:
   *   <ul>
   *   <li>1 or Array.CASEINSENSITIVE
   *   <li>2 or Array.DESCENDING
   *   <li>4 or Array.UNIQUESORT
   *   <li>8 or Array.RETURNINDEXEDARRAY
   *   <li>16 or Array.NUMERIC
   *   </ul>
   * </ul>
   * For more information, see the Array.sortOn() method.
   * <p><b>Note:</b> The Array.sort() method is defined in the ECMAScript (ECMA-262) edition 3 language specification,
   * but the array sorting options introduced in Flash Player 7 are Flash-specific extensions to ECMA-262.
   * @return The return value depends on whether you pass any arguments, as described in the following list:
   * <ul>
   * <li>If you specify a value of 4 or Array.UNIQUESORT for the sortOptions argument of the ...args parameter and two
   * or more elements being sorted have identical sort fields, Flash returns a value of 0 and does not modify the array.
   * <li>If you specify a value of 8 or Array.RETURNINDEXEDARRAY for the sortOptions argument of the ...args parameter,
   * Flash returns a sorted numeric array of the indices that reflects the results of the sort and does not modify the
   * array.
   * <li>Otherwise, Flash returns nothing and modifies the array to reflect the sort order.
   * </ul>
   * @see Array#sortOn()
   */
  "public native function sort"/*(... args) : Array;*/,

  /**
   * Sorts the elements in an array according to one or more fields in the array.
   * The array should have the following characteristics:
   * <ul>
   * <li>The array is an indexed array, not an associative array.
   * <li>Each element of the array holds an object with one or more properties.
   * <li>All of the objects have at least one property in common, the values of which can be used to sort the array.
   * Such a property is called a field.
   * </ul>
   * <p>If you pass multiple fieldName parameters, the first field represents the primary sort field, the second
   * represents the next sort field, and so on. Flash sorts according to Unicode values. (ASCII is a subset of Unicode.)
   * If either of the elements being compared does not contain the field that is specified in the fieldName parameter,
   * the field is assumed to be set to undefined, and the elements are placed consecutively in the sorted array in no
   * particular order.</p>
   * By default, Array.sortOn() works in the following way:
   * <ul>
   * <li>Sorting is case-sensitive (Z precedes a).
   * <li>Sorting is ascending (a precedes b).
   * <li>The array is modified to reflect the sort order; multiple elements that have identical sort fields are placed
   *   consecutively in the sorted array in no particular order.
   * <li>Numeric fields are sorted as if they were strings, so 100 precedes 99, because "1" is a lower string value
   *   than "9".
   * </ul>
   * <p>Use the options parameter to override the default sort behavior. To sort a simple array (for example, an array
   * with only one field), or to specify a sort order that the options parameter doesn't support, use Array.sort().</p>
   * To pass multiple flags, separate them with the bitwise OR (|) operator:
   * <pre>
   * my_array.sortOn(someFieldName, Array.DESCENDING | Array.NUMERIC);
   * </pre>
   * Specify a different sorting option for each field when you sort by more than one field. The options parameter
   * accepts an array of sort options such that each sort option corresponds to a sort field in the fieldName parameter.
   * The following example sorts the primary sort field, a, using a descending sort; the secondary sort field, b, using
   * a numeric sort; and the tertiary sort field, c, using a case-insensitive sort:
   * <pre>
   * Array.sortOn (["a", "b", "c"], [Array.DESCENDING, Array.NUMERIC, Array.CASEINSENSITIVE]);
   * </pre>
   * <b>Note:</b> The fieldName and options arrays must have the same number of elements; otherwise, the options array
   * is ignored. Also, the Array.UNIQUESORT and Array.RETURNINDEXEDARRAY options can be used only as the first element
   * in the array; otherwise, they are ignored.
   * <p><b>Example</b></p>
   * The following code creates an empty Array object vegetables and the array is then populated using five calls to
   * push(). Each time push() is called, a new Vegetable object is created by calling the Vegetable() constructor,
   * which accepts a String (name) and Number (price) object. Calling push() five times with the values shown results
   * in the following array:
   * <code>[lettuce:1.49, spinach:1.89, asparagus:3.99, celery:1.29, squash:1.44]</code>.
   * The sortOn() method is then used with the name parameter to produce the following array:
   * <code>[asparagus:3.99, celery:1.29, lettuce:1.49, spinach:1.89, squash:1.44]</code>.
   * The sortOn() method is then called again with the price parameter, and the NUMERIC and DESCENDING constants to
   * produce an array sorted by numbers in descending order:
   * <code>[asparagus:3.99, spinach:1.89, lettuce:1.49, squash:1.44, celery:1.29]</code>.
   * <pre>
   * var vegetables:Array = new Array();
   * vegetables.push(new Vegetable("lettuce", 1.49));
   * vegetables.push(new Vegetable("spinach", 1.89));
   * vegetables.push(new Vegetable("asparagus", 3.99));
   * vegetables.push(new Vegetable("celery", 1.29));
   * vegetables.push(new Vegetable("squash", 1.44));
   *
   * trace(vegetables);
   * // lettuce:1.49, spinach:1.89, asparagus:3.99, celery:1.29, squash:1.44
   *
   * vegetables.sortOn("name");
   * trace(vegetables);
   * // asparagus:3.99, celery:1.29, lettuce:1.49, spinach:1.89, squash:1.44
   *
   * vegetables.sortOn("price", Array.NUMERIC | Array.DESCENDING);
   * trace(vegetables);
   * // asparagus:3.99, spinach:1.89, lettuce:1.49, squash:1.44, celery:1.29
   *
   * class Vegetable {
   * public var name:String;
   * public var price:Number;
   *
   * public function Vegetable(name:String, price:Number) {
   * this.name = name;
   * this.price = price;
   * }
   *
   * public function toString():String {
   * return " " + name + ":" + price;
   * }
   * }
   * </pre>
   *  The following code creates an empty Array object records and the array is then populated using three calls to
   * push(). Each time push() is called, the strings name and city and a zip number are added to records. Three for
   * loops are used to print the array elements. The first for loop prints the elements in the order in which they were
   * added. The second for loop is run after records has been sorted by name and then city using the sortOn() method.
   * The third for loop produces different output because records is re-sorted by city then by name.
   * <pre>
   * var records:Array = new Array();
   * records.push({name:"john", city:"omaha", zip:68144});
   * records.push({name:"john", city:"kansas city", zip:72345});
   * records.push({name:"bob", city:"omaha", zip:94010});
   *
   * for(var i:uint = 0; i < records.length; i++) {
   *   trace(records[i].name + ", " + records[i].city);
   * }
   * // Results:
   * // john, omaha
   * // john, kansas city
   * // bob, omaha
   *
   * trace("records.sortOn('name', 'city');");
   * records.sortOn(["name", "city"]);
   * for(var i:uint = 0; i < records.length; i++) {
   * trace(records[i].name + ", " + records[i].city);
   * }
   * // Results:
   * // bob, omaha
   * // john, kansas city
   * // john, omaha
   *
   * trace("records.sortOn('city', 'name');");
   * records.sortOn(["city", "name"]);
   * for(var i:uint = 0; i < records.length; i++) {
   *   trace(records[i].name + ", " + records[i].city);
   * }
   * // Results:
   * // john, kansas city
   * // bob, omaha
   * // john, omaha
   * </pre>
   * <p>The following code creates an empty Array object users and the array is then populated using four calls to push().
   * Each time push() is called, a User object is created with the User() constructor and a name string and age uint
   * are added to users. The resulting array set is <code>[Bob:3,barb:35,abcd:3,catchy:4]</code>.</p>
   * The array is then sorted in the following ways:
   * <ol>
   * <li>By name only, producing the array
   *   <code>[Bob:3,abcd:3,barb:35,catchy:4]</code>
   * <li>By name and using the CASEINSENSITIVE constant, producing the array
   *   <code>[abcd:3,barb:35,Bob:3,catchy:4]</code>
   * <li>By name and using the CASEINSENSITIVE and DESCENDING constants, producing the array
   *   <code>[catchy:4,Bob:3,barb:35,abcd:3]</code>
   * <li>By age only, producing the array
   *   <code>[abcd:3,Bob:3,barb:35,catchy:4]</code>
   * <li>By age and using the NUMERIC constant, producing the array
   *   <code>[Bob:3,abcd:3,catchy:4,barb:35]</code>
   * <li>By age and using the DESCENDING and NUMERIC constants, producing the array
   *   <code>[barb:35,catchy:4,Bob:3,abcd:3]</code>
   * </ol>
   * An array called indices is then created and assigned the results of a sort by age and using the NUMERIC and
   * RETURNINDEXEDARRAY constants, resulting in the array [Bob:3,abcd:3,catchy:4,barb:35], which is then printed out
   * using a for loop.
   * <pre>
   * class User {
   *   public var name:String;
   *   public var age:Number;
   *   public function User(name:String, age:uint) {
   *     this.name = name;
   *     this.age = age;
   *   }
   *
   *   public function toString():String {
   *     return this.name + ":" + this.age;
   *   }
   * }
   *
   * var users:Array = new Array();
   * users.push(new User("Bob", 3));
   * users.push(new User("barb", 35));
   * users.push(new User("abcd", 3));
   * users.push(new User("catchy", 4));
   *
   * trace(users); // Bob:3,barb:35,abcd:3,catchy:4
   *
   * users.sortOn("name");
   * trace(users); // Bob:3,abcd:3,barb:35,catchy:4
   *
   * users.sortOn("name", Array.CASEINSENSITIVE);
   * trace(users); // abcd:3,barb:35,Bob:3,catchy:4
   *
   * users.sortOn("name", Array.CASEINSENSITIVE | Array.DESCENDING);
   * trace(users); // catchy:4,Bob:3,barb:35,abcd:3
   *
   * users.sortOn("age");
   * trace(users); // abcd:3,Bob:3,barb:35,catchy:4
   *
   * users.sortOn("age", Array.NUMERIC);
   * trace(users); // Bob:3,abcd:3,catchy:4,barb:35
   *
   * users.sortOn("age", Array.DESCENDING | Array.NUMERIC);
   * trace(users); // barb:35,catchy:4,Bob:3,abcd:3
   *
   * var indices:Array = users.sortOn("age", Array.NUMERIC | Array.RETURNINDEXEDARRAY);
   * var index:uint;
   * for(var i:uint = 0; i < indices.length; i++) {
   *   index = indices[i];
   *   trace(users[index].name, ": " + users[index].age);
   * }
   *
   * // Results:
   * // Bob : 3
   * // abcd : 3
   * // catchy : 4
   * // barb : 35
   * </pre>
   * @param fieldName A string that identifies a field to be used as the sort value, or an array in which the first
   * element represents the primary sort field, the second represents the secondary sort field, and so on.
   * @param options (default = null) One or more numbers or names of defined constants, separated by the bitwise OR (|)
   * operator, that change the sorting behavior. The following values are acceptable for the options parameter:
   * <ul>
   * <li>Array.CASEINSENSITIVE or 1
   * <li>Array.DESCENDING or 2
   * <li>Array.UNIQUESORT or 4
   * <li>Array.RETURNINDEXEDARRAY or 8
   * <li>Array.NUMERIC or 16
   * </ul>
   * Code hinting is enabled if you use the string form of the flag (for example, DESCENDING) rather than the numeric
   * form (2).
   * @return The return value depends on whether you pass any parameters:
   * <ul>
   *   <li>If you specify a value of 4 or Array.UNIQUESORT for the options parameter, and two or more elements being
   * sorted have identical sort fields, a value of 0 is returned and the array is not modified.
   *   <li>If you specify a value of 8 or Array.RETURNINDEXEDARRAY for the options parameter, an array is returned
   * that reflects the results of the sort and the array is not modified.
   *   <li>Otherwise, nothing is returned and the array is modified to reflect the sort order.
   * </ul>
   * @see Array#sort()
   public function sortOn(fieldName : Object, options : Object = null) : Array {
   // TODO: implement!
   // Mind that this method is not even supported in Firefox, so it changes Array.prototype and may break
   // for [each] in loops!
   return null;
   }
   */

  /**
   * Adds elements to and removes elements from an array. This method modifies the array without making a copy.
   * <p><b>Note:</b> To override this method in a subclass of Array, use ...args for the parameters, as this example
   * shows:</p>
   * <pre>
   * public override function splice(...args) {
   *   // your statements here
   * }
   * </pre>
   * <p><b>Example</b></p>
   * The following code creates the Array object vegetables with the elements
   * <code>[spinach, green pepper, cilantro, onion, avocado]</code>.
   * The splice() method is then called with the parameters 2 and 2, which assigns cilantro and onion to the spliced
   * array. The vegetables array then contains [spinach,green pepper,avocado]. The splice() method is called a second
   * time using the parameters 1, 0, and the spliced array to assign
   * <code>[spinach,cilantro,onion,green pepper,avocado]</code> to vegetables.
   * <pre>
   * var vegetables:Array = new Array("spinach",
   * "green pepper",
   * "cilantro",
   * "onion",
   * "avocado");
   *
   * var spliced:Array = vegetables.splice(2, 2);
   * trace(vegetables); // spinach,green pepper,avocado
   * trace(spliced);    // cilantro,onion
   *
   * vegetables.splice(1, 0, spliced);
   * trace(vegetables); // spinach,cilantro,onion,green pepper,avocado
   * </pre>
   * @param startIndex An integer that specifies the index of the element in the array where the insertion or deletion
   * begins. You can use a negative integer to specify a position relative to the end of the array (for example, -1 is
   * the last element of the array).
   * @param deleteCount An integer that specifies the number of elements to be deleted. This number includes the
   * element specified in the startIndex parameter. If you do not specify a value for the deleteCount parameter, the
   * method deletes all of the values from the startIndex element to the last element in the array. If the value
   * is 0, no elements are deleted.
   * @param values An optional list of one or more comma-separated values, or an array, to insert into the array at
   * the position specified in the startIndex parameter.
   * @return An array containing the elements that were removed from the original array.
   */
  "public native function splice"/*(startIndex : int, deleteCount : uint, ... values) : Array;*/,

  /**
   * Returns a string that represents the elements in the specified array. Every element in the array, starting with
   * index 0 and ending with the highest index, is converted to a concatenated string and separated by commas. In the
   * ActionScript 3.0 implementation, this method returns the same value as the Array.toString() method.
   * @return A string of array elements.
   * @see Array#toString()
   */
  "public native function toLocaleString"/*() : String;*/,

  /**
   * Returns a string that represents the elements in the specified array. Every element in the array, starting with
   * index 0 and ending with the highest index, is converted to a concatenated string and separated by commas.
   * To specify a custom separator, use the Array.join() method.
   * <p><b>Example</b></p>
   * The following code creates an Array, converts the values to strings, and stores them in the vegnums variable of
   * the String data type.
   * <pre>
   * var vegetables:Array = new Array();
   * vegetables.push(1);
   * vegetables.push(2);
   * vegetables.push(3);
   * vegetables.push(4);
   * vegetables.push(5);
   * var vegnums:String = vegetables.toString();
   * trace(vegnums+",6");
   * // 1,2,3,4,5,6
   * </pre>
   * @return A string of array elements.
   * @see String#split()
   * @see Array#join()
   */
  "public native function toString"/*() : String;*/,

  /**
   * Adds one or more elements to the beginning of an array and returns the new length of the array. The other elements
   * in the array are moved from their original position, i, to i+1.
   * <p><b>Example</b></p>
   * The following code creates the empty Array object names. The strings Bill and Jeff are added by the push() method,
   * and then the strings Alfred and Kyle are added to the beginning of names by two calls to the unshift() method.
   * <pre>
   * var names:Array = new Array();
   * names.push("Bill");
   * names.push("Jeff");
   *
   * trace(names); // Bill,Jeff
   *
   * names.unshift("Alfred");
   * names.unshift("Kyle");
   *
   * trace(names); // Kyle,Alfred,Bill,Jeff
   * </pre>
   * @param args One or more numbers, elements, or variables to be inserted at the beginning of the array.
   * @return An integer representing the new length of the array.
   * @see Array#pop()
   * @see Array#push()
   * @see Array#shift()
   */
  "public native function unshift"/*(... args) : uint;*/,

];},[]
);joo.classLoader.prepare(/*
 * Copyright 2009 CoreMedia AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, 
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 * express or implied. See the License for the specific language 
 * governing permissions and limitations under the License.
 */

// JangarooScript runtime support. Author: Frank Wienberg

"package joo", [

// this makes jooc generate a with(joo) statement:
"import joo.*",""],

"public class ImportMap",function(ImportMap,$$private){with(joo)with(ImportMap)with($$private)return[ 

  "private var",{ importsByName/* : Object*/: undefined},
  "private var",{ importedPackages/* : Array*/: undefined},

  "public function ImportMap",function $ImportMap() {this[$super]();
    this[$importsByName] = {};
    this[$importedPackages] = [""]; // always "import" top level package!
  },

  /**
   * Add a class to the list of imports.
   * If the unqualified class name if already contained in this ImportMap, the existing entry is
   * removed and the new entry is not added to avoid ambiguous imports (AS3 standard).
   * @param fullClassName the fully qualified class name of the class to be imported.
   */
  "public function addImport",function addImport(fullClassName/* : String*/)/* : void*/ {
    var afterLastDotIndex/* : int*/ = fullClassName.lastIndexOf(".")+1;
    var packageName/* : String*/ = fullClassName.substring(0,afterLastDotIndex);
    var className/* : String*/ = fullClassName.substring(afterLastDotIndex);
    if (className == "*") {
      this[$importedPackages].push(packageName);
    } else {
      if (className in this[$importsByName] && this[$importsByName][className]!=fullClassName) {
        delete this[$importsByName][className]; // remove ambiguous import
      } else {
        this[$importsByName][className] = fullClassName;
      }
    }
  },

  "public function getImports",function getImports()/* : Array*//*<String>*/ {
    var imports/* : Array*/ = [];
    for/* each*/ (var $1 in this[$importsByName]) {var im/*:String*/ = this[$importsByName][$1];
      imports.push(im);
    }
    return imports;
  },

  "public function findQualifiedName",function findQualifiedName(className/* : String*/)/* : String*/ {
    if (className.indexOf(".") < 0) {
      // not already qualified:
      var fqn/* : String*/ = this[$importsByName][className];
      if (fqn) {
        return fqn;
      }
      // check candidates resulting of *-imports:
      var packages/* : Array*/ = this[$importedPackages];
      for (var i/*:int*/ = packages.length-1; i >= 0; --i) {
        fqn = packages[i] + className;
        if (classLoader.getClassDeclaration(fqn)) {
          return fqn;
        }
      }
    }
    return className;
  },

  "public function addToMap",function addToMap(map/* : Object*/)/* : Object*/ {
    for (var im/* : String*/ in this[$importsByName]) {
      map[im] = classLoader.getRequiredClassDeclaration(this[$importsByName][im]).publicConstructor;
    }
    return map;
  },

  "public function init",function init()/* : void*/ {
    for (var im/* : String*/ in this[$importsByName]) {
      classLoader.getRequiredClassDeclaration(this[$importsByName][im]).init();
    }
  },

];},[]
);joo.classLoader.prepare(/*
 * Copyright 2009 CoreMedia AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, 
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 * express or implied. See the License for the specific language 
 * governing permissions and limitations under the License.
 */

// JangarooScript runtime support. Author: Frank Wienberg

"package joo", ["import joo.ImportMap","import joo.SystemClassDeclaration","import joo.NativeClassDeclaration",

// this makes jooc generate a with(joo) statement:
"import joo.*",""],

"public class ClassDeclaration extends joo.SystemClassDeclaration",function(ClassDeclaration,$$private){with(joo)with(ClassDeclaration)with($$private)return[ 

  "private var",{ importMap/* : ImportMap*/: undefined},

  "public function ClassDeclaration",function $ClassDeclaration(packageDef/*:String*/, directives/* : Array*/, classDef/*:String*/, memberDeclarations/*:Function*/,
          publicStaticMethods/* : Array*/) {
    this[$super](packageDef, directives, classDef, memberDeclarations, publicStaticMethods);
  },

  "public function getDependencies",function getDependencies()/* : Array*/ {
    var dependencies/*:Array*/ = this[$importMap].getImports();
    dependencies.push(this[$importMap].findQualifiedName(this.extends_));
    return dependencies;
  },

  "override protected function parseDirectives",function parseDirectives(packageName/* : String*/, directives/* : Array*/)/*:void*/ {
    // super.parseDirectives(packageName, directives); // we know it's empty!
    this[$importMap] = new ImportMap();
    this[$importMap].addImport(packageName+".*");
    directives.forEach(this[$parseDirective]);
  },

  "private bound function parseDirective",function parseDirective(directive/* : String*/)/* : void*/ {
    var importMatch/* : Array*/ = directive.match(/^\s*import\s+(([a-zA-Z$_0-9]+\.)*(\*|[a-zA-Z$_0-9]+))\s*$/);
    if (importMatch) {
      this[$importMap].addImport(importMatch[1]);
    }
    // else: TODO! use namespace, annotations, package-scope functions, namespace declarations...
  },

  "override protected function doComplete",function doComplete()/*:void*/ {
    this.extends_ = this[$importMap].findQualifiedName(this.extends_);
    this[$doComplete]();
    for (var i/*:int*/ =0; i<this.interfaces.length; ++i) {
      this.interfaces[i] = this[$importMap].findQualifiedName(this.interfaces[i]);
    }
    this[$importMap].addToMap(this.privateStatics);
    createInitializingConstructor(this);
    this.publicStaticMethodNames.forEach(this[$createInitializingStaticMethod]);
  },

  "private static function createInitializingConstructor",function createInitializingConstructor(classDeclaration/* : ClassDeclaration*/)/* : void*/ {
    // anonymous function has to be inside a static function, or jooc will add ".bind(this)":
    classDeclaration.constructor_ = function joo$ClassDeclaration$66_37()/* : void*/ {
      classDeclaration.init();
      assert((classDeclaration.constructor_!=null), "/home/mohlendo/p4/moh-jangaroo-akerlof/target/checkout/jangaroo-core/jangaroo-runtime/src/main/joo/joo/ClassDeclaration.as", 68, 7); // must have been set, at least to a default constructor!
      classDeclaration.constructor_.apply(this, arguments);
    };
  },

  "private bound function createInitializingStaticMethod",function createInitializingStaticMethod(methodName/* : String*/)/* : void*/ {
    var classDeclaration/* : ClassDeclaration*/ = this;
    classDeclaration.publicConstructor[methodName] = function joo$ClassDeclaration$75_54()/* : **/ {
      //assert(!classDeclaration.inited);
      classDeclaration.init();
      return classDeclaration.publicConstructor[methodName].apply(null, arguments);
    };
  },

  "private bound function deleteInitializingStaticMethod",function deleteInitializingStaticMethod(methodName/* : String*/)/* : void*/ {
    delete this.publicConstructor[methodName];
  },

  "protected override function doInit",function doInit()/*:void*/ {
    this.publicStaticMethodNames.forEach(this[$deleteInitializingStaticMethod]);
    this[$doInit]();
    this.interfaces.forEach(function joo$ClassDeclaration$89_29(interface_/* : String*/, i/* : uint*/, interfaces/* : Array*/)/* : void*/ {
      interfaces[i] = classLoader.getRequiredClassDeclaration(interface_);
      interfaces[i].init();
    }.bind(this));
  },

  /**
   * Determines if the specified <code>Object</code> is assignment-compatible
   * with the object represented by this <code>ClassDefinition</code>.
   * The method returns <code>true</code> if the specified
   * <code>Object</code> argument is non-null and can be cast to the
   * reference type represented by this <code>Class</code> object without
   * raising a <code>ClassCastException.</code> It returns <code>false</code>
   * otherwise.
   */
  "public override function isInstance",function isInstance(object/* : Object*/)/* : Boolean*/ {
    return typeof object == "object" && object.constructor["$class"] ? this.isAssignableFrom(object.constructor["$class"]) : false;
  },

  /**
   * Determines if the class or interface represented by this
   * <code>ClassDefinition</code> object is either the same as, or is a super class or
   * super interface of, the class or interface represented by the specified
   * <code>ClassDefinition</code> parameter. It returns <code>true</code> if so;
   * otherwise it returns <code>false</code>.
   */
  "protected bound function isAssignableFrom",function isAssignableFrom(cd/* : NativeClassDeclaration*/)/* : Boolean*/ {
    do {
      if (this===cd) {
        return true;
      }
      // TODO: optimize: pre-calculate set of all implemented interfaces of a class!
      if (this.isInterface) {
        // I am an interface: search all implemented interfaces recursively:
        if (cd.interfaces.some(this.isAssignableFrom)) {
          return true;
        }
      }
      cd = cd.superClassDeclaration;
    } while(cd);
    return false;
  },

];},[]
);joo.classLoader.prepare(/*
 * Copyright 2009 CoreMedia AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, 
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 * express or implied. See the License for the specific language 
 * governing permissions and limitations under the License.
 */

// JangarooScript runtime support. Author: Frank Wienberg

"package joo", ["import joo.ImportMap","import joo.ClassDeclaration","import joo.SystemClassLoader","import joo.SystemClassDeclaration",

// this makes jooc generate a with(joo) statement:
"import joo.*",""],

"public class StandardClassLoader extends joo.SystemClassLoader",function(StandardClassLoader,$$private){with(joo)with(StandardClassLoader)with($$private)return[ 

  "private static var",{ classDeclarations/* : Array*/ :function(){return( []);}},

  "private var",{ importMap/* : ImportMap*/: undefined},

  "public function StandardClassLoader",function $StandardClassLoader() {this[$super]();
    this[$importMap] = new ImportMap();
  },

  "override protected function createClassDeclaration",function createClassDeclaration(packageDef/* : String*/, directives/* : Array*/, classDef/* : String*/, memberFactory/* : Function*/,
                                                  publicStaticMethodNames/* : Array*/)/*:SystemClassDeclaration*/ {
    var cd/* : ClassDeclaration*/ = new ClassDeclaration(packageDef, directives, classDef, memberFactory, publicStaticMethodNames);
    classDeclarations.push(cd); // remember all created classes for later initialization.
    return cd;
  },

  "public function loadScript",function loadScript(uri/* : String*/)/* : Object*/ {
    var script/* : Object*/ = window.document.createElement("script");
    script.type = "text/javascript";
    window.document.getElementsByTagName("HEAD")[0].appendChild(script);
    script.src = uri;
    return script;
  },

  /**
   * Import the class given by its fully qualified class name (package plus name).
   * All imports are collected in a hash and can be used in the #complete() callback function.
   * @param fullClassName : String the fully qualified class name (package plus name) of the class to load and import.
   */
  "public function import_",function import_(fullClassName/* : String*/)/* : void*/ {    
    this[$importMap].addImport(fullClassName);
  },

  /**
   * Run the static main method of a class given by its fully qualified name (package plus name), handing through the
   * given arguments (args).
   * The main method is executed after all classes are completed (see #complete()).
   * @param mainClassName : String the fully qualified name (package plus name) or the constructor function
   *   of the class to run.
   * @param args the arguments to hand over to the main method of the given class.
   */
  "public function run",function run(mainClassName/* : String, ...args*/)/* : void*/ {var args=Array.prototype.slice.call(arguments,1);
    this.complete(function joo$StandardClassLoader$66_19()/* : void*/ {
      var mainClass/* : SystemClassDeclaration*/ = this.getRequiredClassDeclaration(mainClassName);
      mainClass.publicConstructor["main"].apply(null,args);
    }.bind(this));
  },

  /**
   * Explicitly initialize the static members of the given class (constructor function).
   * If the class is not yet initialized, Initializers of static variables and static code blocks are called (once).
   * This is only necessary when you want to access constants of a class without importing the class,
   * or when you have loaded the class explicitly and want its static code to execute.
   * Explicit initializing is <i>not</i> necessary when you
   * - import the class or
   * - load the class and use the constructor or a static method of the class. This will trigger initialization
   *   automatically.
   * @param classes the classes (type Function) to initialize.
   * @return Function the initialized class (constructor function).
   */
  "public function init",function init(/*... classes*/)/* : Function*/ {var classes=arguments;
    var clazz/* : Function*/;
    for (var i/*:int*/ =0; i<classes.length; ++i) {
      if ("$class" in classes[i]) {
        ((clazz = classes[i])["$class"]).init();
      }
    }
    return clazz;
  },

  /**
   * Tell Jangaroo to load and initialize all required classes, then call the given function.
   * The function receives an import hash, which can be used in pure JavaScript in a 'with' statement
   * (Jangaroo does not support 'with', there, you would use import declarations!) like this:
   * <pre>
   * joo.classLoader.import_("com.custom.Foo");
   * joo.classLoader.complete(function(imports){with(imports){
   *   Foo.doSomething("bar");
   * }});
   * </pre>
   * @param onCompleteCallback : Function
   * @return void
   */
  "public function complete",function complete(onCompleteCallback/* : Function*/)/* : void*/ {
    this.completeAll();
    if (onCompleteCallback) {
      this.doCompleteCallbacks([onCompleteCallback]);
    }
  },

  "protected function completeAll",function completeAll()/* : void*/ {
    classDeclarations.forEach(function joo$StandardClassLoader$115_31(classDeclaration/* : ClassDeclaration*/)/* : void*/ {
      classDeclaration.complete();
      // init native class patches immediately:
      if (classDeclaration.isNative()) {
        classDeclaration.init();
      }
    });
  },

  "protected function doCompleteCallbacks",function doCompleteCallbacks(onCompleteCallbacks/* : Array*//*Function*/)/* : void*/ {
    if (onCompleteCallbacks.length) {
      this[$importMap].init();
      var importMap/* : Object*/ = this[$importMap].addToMap({});
      for (var i/*:int*/ = 0; i < onCompleteCallbacks.length; ++i) {
        (onCompleteCallbacks[i])(importMap);
      }
    }
  },
];},[]
);joo.classLoader.prepare(/*
 * Copyright 2009 CoreMedia AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, 
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 * express or implied. See the License for the specific language 
 * governing permissions and limitations under the License.
 */

// JangarooScript runtime support. Author: Frank Wienberg

"package joo", ["import joo.StandardClassLoader","import joo.SystemClassDeclaration",

// this makes jooc generate a with(joo) statement:
"import joo.*",
"import Error",""],

"public class DynamicClassLoader extends joo.StandardClassLoader",function(DynamicClassLoader,$$private){with(joo)with(DynamicClassLoader)with($$private)return[ 

  "public static const",{ STANDARD_URL_PREFIX/*:String*/ : "joo/classes/"},

  "private static function isEmpty",function isEmpty(object/* : Object*/)/* : Boolean*/ {
    //noinspection LoopStatementThatDoesntLoopJS
    for (var m/*:String*/ in object) {
      return false;
    }
    return true;
  },


  "public var",{ urlPrefix/* : String*/: undefined},
  "private var",{ onCompleteCallbacks/* : Array*//*<Function>*/ :function(){return( []);}},

  /**
   * Keep record of all classes whose dependencies still have to be loaded.
   */
  "private var",{ pendingDependencies/* : Array*//*<ClassDeclaration>*/ :function(){return( []);}},
  /**
   * false => pending
   * true => loading
   */
  "private var",{ pendingClassState/* : Object*//*<String,Boolean>*/ :function(){return( {});}},

  "override protected function createClassDeclaration",function createClassDeclaration(packageDef/* : String*/, directives/* : Array*/, classDef/* : String*/, memberFactory/* : Function*/,
                                                     publicStaticMethodNames/* : Array*/)/*:SystemClassDeclaration*/ {
    var cd/* : ClassDeclaration*/ = this[$createClassDeclaration](packageDef, directives, classDef, memberFactory, publicStaticMethodNames);
    this[$pendingDependencies].push(cd);
    if (delete this[$pendingClassState][cd.fullClassName]) {
      if (this.debug) {
        trace("prepared class " + cd.fullClassName + ", removed from pending classes.");
      }
      if (this[$onCompleteCallbacks].length) {
        this[$loadPendingDependencies]();
        if (isEmpty(this[$pendingClassState])) {
          var onCompleteCallbacks/* : Array*//*<Function>*/ = this[$onCompleteCallbacks];
          this[$onCompleteCallbacks] = [];
          // "invoke later":
          window.setTimeout(function joo$DynamicClassLoader$64_29()/* : void*/ {
            this.completeAll();
            this.doCompleteCallbacks(onCompleteCallbacks);
          }.bind(this), 0);
        }
      }
    }
    return cd;
  },

  // separate factory function to move the anonymous function out of the caller's scope:
  "private function createClassLoadErrorHandler",function createClassLoadErrorHandler(fullClassName/*:String*/, url/*:String*/)/*:Function*/ {
    return function joo$DynamicClassLoader$76_12()/*:void*/ {
      this.classLoadErrorHandler(fullClassName, url);
    }.bind(this);
  },

  "public function classLoadErrorHandler",function classLoadErrorHandler(fullClassName/*:String*/, url/*:String*/)/*:void*/ {
    trace("Class "+fullClassName+" not found at URL ["+url+"].");
  },

  /**
   * Import the class given by its fully qualified class name (package plus name).
   * All imports are collected in a hash and can be used in the #complete() callback function.
   * Additionally, the DynamicClassLoader tries to load the class from a URL if it is not present on #complete().
   * @param fullClassName : String the fully qualified class name (package plus name) of the class to load and import.
   */
  "public override function import_",function import_(fullClassName/* : String*/)/* : void*/ {
    this[$import_](fullClassName);
    this[$load](fullClassName);
  },

  "override public function run",function run(mainClassName/* : String, ...args*/)/*:void*/ {var args=Array.prototype.slice.call(arguments,1);
    this[$load](mainClassName);
    args.splice(0,0,mainClassName);
    this[$run].apply(this,args);
  },

  "private function load",function load(fullClassName/* : String*/)/* : void*/ {
    if (!this.getClassDeclaration(fullClassName)) {
      if (this[$onCompleteCallbacks].length==0) {
        if (this[$pendingClassState][fullClassName]===undefined) {
          // we are not yet in completion phase: just add to pending classes:
          this[$pendingClassState][fullClassName] = false;
          if (this.debug) {
            trace("added to pending classes: "+fullClassName+".");
          }
        }
      } else {
        if (this[$pendingClassState][fullClassName]!==true) {
          // trigger loading:
          this[$pendingClassState][fullClassName] = true;
          var url/* : String*/ = this.getUri(fullClassName);
          if (this.debug) {
            trace("triggering to load class "+fullClassName+" from URL "+url+".");
          }
          var script/*:Object*/ = this.loadScript(url);
          // script.onerror does not work in IE, but since this feature is for debugging only, we don't mind:
          script.onerror = this[$createClassLoadErrorHandler](fullClassName, script['src']);
        }
      }
    }
  },

  "protected function getBaseUri",function getBaseUri()/* : String*/ {
    if (typeof this.urlPrefix != "string") {
      this.urlPrefix = this[$determineUrlPrefix]();
    }
    return this.urlPrefix;
  },

  "private function determineUrlPrefix",function determineUrlPrefix()/*:String*/ {/*
    const*/var RUNTIME_URL_PATTERN/*:RegExp*/ = /^(.*)\bjangaroo-runtime(-debug)?.js$/;
    var scripts/*:Array*/ = window.document.getElementsByTagName("SCRIPT");
    for (var i/*:int*/ =0; i<scripts.length; ++i) {
      var match/*:Array*/ = RUNTIME_URL_PATTERN.exec(scripts[i].src);
      if (match) {
        return match[1] + "classes/";
      }
    }
    if (this.debug) {
      trace("WARNING: no joo.classLoader.urlPrefix set and Jangaroo Runtime script element not found. "
        + "Falling back to standard urlPrefix '" + STANDARD_URL_PREFIX + "'.");
    }
    return STANDARD_URL_PREFIX;
  },

  "protected function getUri",function getUri(fullClassName/* : String*/)/* : String*/ {
    var baseUri/* : String*/ = this.getBaseUri();
    return baseUri + fullClassName.replace(/\./g,"/") + ".js";
  },

  /**
   * Tell Jangaroo to load and initialize all required classes, then call the given function.
   * The function receives an import hash, which can be used in pure JavaScript in a 'with' statement
   * (Jangaroo does not support 'with', there, you would use import declarations!) like this:
   * <pre>
   * joo.classLoader.import_("com.custom.Foo");
   * joo.classLoader.complete(function(imports){with(imports){
   *   Foo.doSomething("bar");
   * }});
   * </pre>
   * @param onCompleteCallback : Function
   * @return void
   */
  "public override function complete",function complete(onCompleteCallback/* : Function*/)/* : void*/ {
    if (onCompleteCallback || this[$onCompleteCallbacks].length==0) {
      this[$onCompleteCallbacks].push(onCompleteCallback || defaultOnCompleteCallback);
    }
    this[$loadPendingDependencies]();
    if (isEmpty(this[$pendingClassState])) {
      // no deferred classes: do not behave any different than my super class
      this[$complete](onCompleteCallback);
    } else {
      for (var c/*:String*/ in this[$pendingClassState]) {
        this[$load](c);
      }
    }
  },

  "private static function defaultOnCompleteCallback",function defaultOnCompleteCallback()/* : void*/ {
    trace("All classes loaded!");
  },

  "private function loadPendingDependencies",function loadPendingDependencies()/*:void*/ {
    for (var j/*:int*/ =0; j<this[$pendingDependencies].length; ++j) {
      var dependencies/* : Array*/ = (this[$pendingDependencies][j]).getDependencies();
      for (var i/*:int*/ =0; i<dependencies.length; ++i) {
        this[$load](dependencies[i]);
      }
    }
    this[$pendingDependencies] = [];
  },
];},[]
);joo.classLoader.prepare(/*
 * Copyright 2009 CoreMedia AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// JangarooScript runtime support. Author: Manuel Ohlendorf

"package joo", ["import joo.DynamicClassLoader",

"import joo.*",""],

"public class ResourceBundleAwareClassLoader extends joo.DynamicClassLoader",function(ResourceBundleAwareClassLoader,$$private){with(joo)with(ResourceBundleAwareClassLoader)with($$private)return[ 

  "private static const",{ RESOURCE_BUNDLE_PATTERN/*:RegExp*/ : /_properties$/},

  "public var",{ supportedLocales/*:Array*/ :function(){return( ["en"]);}},
  "public var",{ localeCookieName/*:String*/ : "locale"},

  "private static function isBundleName",function isBundleName(fullClassName/*:String*/)/*:Boolean*/ {

    return ! !fullClassName.match(RESOURCE_BUNDLE_PATTERN);

  },

  "private function loadCookie",function loadCookie()/*:String*/ {
    var cookieKey/* : String*/ = this.localeCookieName.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
    var match/* : Array*/ = window.document.cookie.match("(?:^|;)\\s*" + cookieKey + "=([^;]*)");
    return match ? decodeURIComponent(match[1]) : null;
  },


  "public function getCurrentLocale",function getCurrentLocale()/*:String*/ {

    var userLocale/*:String*/ = this[$loadCookie]();

    if (!userLocale && window.navigator) {
      userLocale = window.navigator.language || window.navigator.browserLanguage || window.navigator.systemLanguage || window.navigator.userLanguage;
      if (userLocale) {
        userLocale = userLocale.replace(/-/g, "_");
      }
    }

    if (!userLocale) {
      userLocale = "en";
    }

    //find longest match
    var longestMatch/*:String*/;
    for (var i/*:int*/ = 0; i < this.supportedLocales.length; i++) {
      if (userLocale.indexOf(this.supportedLocales[i]) === 0) {
        if (!longestMatch || longestMatch.length > this.supportedLocales[i]) {
          longestMatch = this.supportedLocales[i];
        }
      }
    }
    return longestMatch;
  },

  "private function getCurrentLocaleSuffix",function getCurrentLocaleSuffix()/*:String*/ {
    var locale/*:String*/ = this.getCurrentLocale();
    //The default language "en" has no ending.
    return !locale || locale === "en"
      ? ""
      : "_" + locale;
  },

  "override protected function getUri",function getUri(fullClassName/* : String*/)/*:String*/ {

    if (isBundleName(fullClassName)) {

      fullClassName += this[$getCurrentLocaleSuffix]();

    }

    return this[$getUri](fullClassName);

  },

];},[]
);joo.classLoader = new joo.DynamicClassLoader();
joo.classLoader.debug = true;