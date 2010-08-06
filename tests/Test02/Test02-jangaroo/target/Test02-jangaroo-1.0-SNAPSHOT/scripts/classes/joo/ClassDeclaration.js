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

"public class ClassDeclaration extends joo.SystemClassDeclaration",function($$private){with($$private)return[ 

  "private var",{ importMap/* : ImportMap*/: undefined},
  "private var",{ dependencies/* : Array*/: undefined},

  "public function ClassDeclaration",function $ClassDeclaration(packageDef/*:String*/, directives/* : Array*/, classDef/*:String*/, memberDeclarations/*:Function*/,
          publicStaticMethods/* : Array*/, dependencies/* : Array*/) {
    this[$super](packageDef, directives, classDef, memberDeclarations, publicStaticMethods);
    this[$dependencies] = dependencies;
  },

  "public function getDependencies",function getDependencies()/* : Array*/ {
    var dependencies/*:Array*/ = this[$dependencies]
      ? this[$dependencies]            // new compiler output: explicit runtime dependencies
      : this[$importMap].getImports(); // backwards-compatibility for older compiler output
    dependencies = dependencies.concat([this[$importMap].findQualifiedName(this.extends_)]);
    return dependencies;
  },

  "override protected function parseDirectives",function parseDirectives(packageName/* : String*/, directives/* : Array*/)/*:void*/ {
    // super.parseDirectives(packageName, directives); // we know it's empty!
    this[$importMap] = new joo.ImportMap();
    this[$importMap].addImport(packageName+".*");
    directives.forEach(this[$parseDirective]);
  },

  "private bound function parseDirective",function parseDirective(directive/* : String*/)/* : void*/ {
    var importMatch/* : Array*/ = directive.match(/^\s*import\s+(([a-zA-Z$_0-9]+\.)*(\*|[a-zA-Z$_0-9]+))\s*$/)/*as Array*/;
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
    $$private.createInitializingConstructor(this);
    this.publicStaticMethodNames.forEach(this[$createInitializingStaticMethod]);
  },

  "private static function createInitializingConstructor",function createInitializingConstructor(classDeclaration/* : ClassDeclaration*/)/* : void*/ {
    // anonymous function has to be inside a static function, or jooc will add ".bind(this)":
    classDeclaration.constructor_ = function joo$ClassDeclaration$67_37()/* : void*/ {
      classDeclaration.init();
      assert((classDeclaration.constructor_!=null), "C:\\Users\\fwienber\\p4\\jangaroo\\target\\checkout\\jangaroo-core\\jangaroo-runtime\\src\\main\\joo\\joo\\ClassDeclaration.as", 69, 7); // must have been set, at least to a default constructor!
      classDeclaration.constructor_.apply(this, arguments);
    };
  },

  "private bound function createInitializingStaticMethod",function createInitializingStaticMethod(methodName/* : String*/)/* : void*/ {
    var classDeclaration/* : ClassDeclaration*/ = this;
    classDeclaration.publicConstructor[methodName] = function joo$ClassDeclaration$76_54()/* : **/ {
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
    this.interfaces.forEach(function joo$ClassDeclaration$90_29(interface_/* : String*/, i/* : uint*/, interfaces/* : Array*/)/* : void*/ {
      interfaces[i] = joo.classLoader.getRequiredClassDeclaration(interface_);
      interfaces[i].init();
    });
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

];},[],["joo.SystemClassDeclaration","joo.ImportMap","Array"]
);