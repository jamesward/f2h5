/*
 * Copyright 2008 CoreMedia AG
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

package net.jangaroo.jooc;

import java.io.IOException;

/**
 * @author Andreas Gawecki
 * @author Frank Wienberg
 */
public class Parameter extends IdeDeclaration {

  JooSymbol optSymConstOrRest;
  TypeRelation optTypeRelation;
  Initializer optInitializer;

  public Parameter(JooSymbol optSymConst, Ide ide, TypeRelation optTypeRelation, Initializer optInitializer) {
    super(new JooSymbol[0], 0, ide);
    this.optSymConstOrRest = optSymConst;
    this.optTypeRelation = optTypeRelation;
    this.optInitializer = optInitializer;
  }

  @Override
  public void scope(final Scope scope) {
    super.scope(scope);
    if (optTypeRelation != null) {
      optTypeRelation.scope(scope);
    }
    if (optInitializer != null) {
      optInitializer.scope(scope);
    }
  }

  @Override
  public AstNode analyze(AstNode parentNode, AnalyzeContext context) {
    super.analyze(parentNode, context);
    if (optTypeRelation!=null) {
      optTypeRelation.analyze(this, context);
      if (isRest() && !"Array".equals(optTypeRelation.getType().getSymbol().getText())) {
        //todo replace that condition with real Array definition lookup
        throw Jooc.error(optTypeRelation.getSymbol(), "Rest parameter must have Array type.");
      }
    }
    if (optInitializer!=null) {
      optInitializer.analyze(this, context);
    }
    return this;
  }

  public boolean isRest() {
    return optSymConstOrRest !=null && optSymConstOrRest.sym==sym.REST;
  }

  protected void generateAsApiCode(JsWriter out) throws IOException {
    if (optSymConstOrRest != null) {
      out.writeSymbol(optSymConstOrRest);
    }
    ide.generateCode(out);
    if (optTypeRelation!=null)
      optTypeRelation.generateCode(out);
    if (optInitializer != null) {
      optInitializer.generateCode(out);
    }
  }

  protected void generateJsCode(JsWriter out) throws IOException {
    Debug.assertTrue(getModifiers() == 0, "Parameters must not have any modifiers");
    boolean isRest = isRest();
    if (optSymConstOrRest != null) {
      out.beginCommentWriteSymbol(optSymConstOrRest);
      if (isRest) {
        ide.generateCode(out);
      }
      out.endComment();
    }
    if (!isRest) {
      ide.generateCode(out);
    }
    if (optTypeRelation!=null)
      optTypeRelation.generateCode(out);
    // in the method signature, comment out initializer code.
    if (optInitializer != null) {
      out.beginComment();
      optInitializer.generateCode(out);
      out.endComment();
    }
  }

  public boolean hasInitializer() {
    return optInitializer!=null &&
      // ignore initializers that assign undefined. Parameters are already undefined if not present.
      (!(optInitializer.value instanceof IdeExpr) ||
        !((IdeExpr)optInitializer.value).ide.getName().equals("undefined"));
  }

  void generateBodyInitializerCode(JsWriter out) throws IOException {
    out.writeToken(getName());
    optInitializer.generateCode(out);
    out.write(";");
  }

  void generateRestParamCode(JsWriter out, int paramIndex) throws IOException {
    String paramName = getName();
    if (paramName != null && !(paramName.equals("arguments") && paramIndex==0)) {
      out.write("var "+paramName+"=");
      if (paramIndex==0) {
        out.write("arguments;");
      } else {
        out.write("Array.prototype.slice.call(arguments,"+paramIndex+");");
      }
    }
  }

  @Override
  public IdeDeclaration resolveDeclaration() {
    return optTypeRelation == null ? null : optTypeRelation.getType().resolveDeclaration();
  }


}
