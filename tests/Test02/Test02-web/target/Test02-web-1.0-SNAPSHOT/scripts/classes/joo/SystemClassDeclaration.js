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

"package joo", [""],

"public class SystemClassDeclaration extends joo.NativeClassDeclaration",function($$private){with($$private)return[function(){joo.classLoader.init(joo.MemberDeclaration);}, 

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
    // instanceof or constructor may return false negatives:
    if (object instanceof type || object.constructor===type) {
      return true;
    }
    if (type["$class"]) {
      return (type["$class"]/*as NativeClassDeclaration*/).isInstance(object);
    }
    return false;
  },function()

{
  // publish as "joo.is()" for use from JavaScript:
  joo.getQualifiedObject("joo")["is"] = $$private.is_;
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
    var packageName/* : String*/ = packageDef.split(/\s+//*as String*/)[1] || "";
    this.package_ = joo.getOrCreatePackage(packageName);
    this.parseDirectives(packageName, directives);
    var classMatch/* : Array*/ = classDef.match(/^\s*((public|internal|final|dynamic)\s+)*class\s+([A-Za-z][a-zA-Z$_0-9]*)(\s+extends\s+([a-zA-Z$_0-9.]+))?(\s+implements\s+([a-zA-Z$_0-9.,\s]+))?\s*$/)/*as Array*/;
    var interfaces/* : String*/;
    if (classMatch) {
      if (classMatch[5]) {
        this.extends_ = classMatch[5];
      }
      interfaces = classMatch[7];
    } else {
      classMatch = classDef.match(/^\s*((public|internal)\s+)?interface\s+([A-Za-z][a-zA-Z$_0-9]*)(\s+extends\s+([a-zA-Z$_0-9.,\s]+))?\s*$/)/*as Array*/;
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
    this.interfaces = interfaces ? interfaces.split(/\s*,\s*//*as String*/)/*as Array*/ : [];
    this.memberDeclarations = memberDeclarations;
    this.publicStaticMethodNames = publicStaticMethodNames;
    var publicConstructor/* : Function*/ = joo.getQualifiedObject(fullClassName)/*as Function*/;
    if (publicConstructor) {
      this.native_ = true;
    } else {
      publicConstructor = joo.SystemClassDeclaration.createPublicConstructor(this);
      this.package_[this.className] = publicConstructor;
    }
    this.create(fullClassName, publicConstructor);
    var jooPackage/*:**/ = joo.getQualifiedObject("joo");
    this.privateStatics = { "assert": jooPackage.assert, "is": $$private.is_, "trace": jooPackage.trace };
  },

  "public function isNative",function isNative()/* : Boolean*/ {
    return this.native_;
  },

  //noinspection JSUnusedLocalSymbols
  "protected function parseDirectives",function parseDirectives(packageName/* : String*/, directives/* : Array*/)/* : void*/ { },

  "protected override function doComplete",function doComplete()/* : void*/ {
    this.superClassDeclaration = joo.classLoader.getRequiredClassDeclaration(this.extends_);
    this.superClassDeclaration.complete();
    this.level = this.superClassDeclaration.level + 1;
    this.privateStatics.$super = "$" + this.level+"super";
    var Super/* : Function*/ = this.superClassDeclaration.Public;
    if (!this.native_) {
      this.publicConstructor.prototype = new Super();
      this.publicConstructor["superclass"] = this.publicConstructor.prototype; // Ext Core compatibility!
    }
    this.Public = joo.NativeClassDeclaration.createEmptyConstructor(this.publicConstructor);
  },

  "protected function initMembers",function initMembers()/* : void*/ {
    this.initializerNames = [];
    this.staticInitializers = [];
    this.boundMethodNames = [];
    var memberDeclarations/* : Array*/ = this.memberDeclarations(this.privateStatics);
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
          var memberDeclaration/* : MemberDeclaration*/ = joo.MemberDeclaration.create(item);
          if (memberDeclaration) {
            if (!memberDeclaration.isNative()) {
              if (++i >= memberDeclarations.length) {
                throw new Error(this + ": Member expected after modifiers '" + item + "'.");
              }
              var member/* : Object*/ = memberDeclarations[i];
            }
            if (memberDeclaration.memberType == "function") {
              this.initMethod(memberDeclaration, member/*as Function*/);
            } else {
              for (var memberName/*:String*/ in member) {
                this._storeMember(this._createMemberDeclaration(memberDeclaration, {memberName: memberName}), member[memberName]);
              }
            }
          }
      }
    }
    var defaultConstructor/* : Function*/ = this.native_ ? this.publicConstructor :
      this.publicConstructor.prototype["$"+this.level+"super"] =
      this.initializerNames.length==0 ? this.superClassDeclaration.constructor_ : $$private.createSuperCall(this);
    if (!this.constructor_) {
      // create empty default constructor:
      this.constructor_ = defaultConstructor;
    }
    if (this.boundMethodNames.length>0) {
      this.constructor_ = $$private.createMethodBindingConstructor(this.constructor_, this.boundMethodNames);
    }
  },

  // must be defined static because otherwise, jooc will add .bind(this) to all function expressions!
  "private static function createSuperCall",function createSuperCall(cd/* : SystemClassDeclaration*/)/* : Function*/ {
    if (cd.extends_=="Object") {
      return function $super()/* : void*/ {
        for (var i/*:int*/ =0; i<cd.initializerNames.length; ++i) {
          var slot/* : String*/ = cd.initializerNames[i]/*as String*/;
          this[slot] = this[slot]();
        }
      };
    }
    return function $super()/* : void*/ {
      cd.superClassDeclaration.constructor_.apply(this,arguments);
      for (var i/*:int*/ =0; i<cd.initializerNames.length; ++i) {
        var slot/* : String*/ = cd.initializerNames[i]/*as String*/;
        this[slot] = this[slot]();
      }
    };
  },

  // must be defined static because otherwise, jooc will add .bind(this) to all function expressions!
  "private static function createMethodBindingConstructor",function createMethodBindingConstructor(constructor_/* : Function*/, boundMethodNames/* : Array*/)/* : Function*/ {
    return function $bindMethods()/* : void*/ {
      for (var i/*:int*/ =0; i<boundMethodNames.length; ++i) {
        var slot/* : String*/ = boundMethodNames[i]/*as String*/;
        this[slot] = this[slot].bind(this);
      }
      constructor_.apply(this, arguments);
    };
  },

  "protected function _initSlot",function _initSlot(memberDeclaration/* : MemberDeclaration*/)/* : void*/ {
    memberDeclaration.slot = memberDeclaration.isPrivate() && !memberDeclaration.isStatic()
            ? this.privateStatics["$"+memberDeclaration.memberName] = "$" + this.level + memberDeclaration.memberName
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
        && superMethod!==Object['prototype'][memberDeclaration.memberName];
      if (overrides !== memberDeclaration.isOverride()) {
        var msg/* : String*/ = overrides
                ? "Method overrides without 'override' modifier"
                : "Method with 'override' modifier does not override";
        throw new Error(this+": "+msg+": "+memberDeclaration);
      }
      if (overrides) {
        // found overriding: store super class' method as private member:
        this._storeMember(this._createMemberDeclaration(memberDeclaration, {_namespace: joo.MemberDeclaration.NAMESPACE_PRIVATE}), superMethod);
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

    // for compatibility with Prototype (which defines Node as an Object in IE):
    if (!target) {
      target = {};
    }
    
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
];},[],["joo.NativeClassDeclaration","Array","Error","joo.MemberDeclaration","Object"]
);