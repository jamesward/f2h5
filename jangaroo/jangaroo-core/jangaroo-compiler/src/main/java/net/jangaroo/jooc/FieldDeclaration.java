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
public class FieldDeclaration extends AbstractVariableDeclaration {

  private boolean isClassMember = false;

  public FieldDeclaration(JooSymbol[] modifiers,
                          JooSymbol symConstOrVar,
                          Ide ide,
                          TypeRelation optTypeRelation, Initializer optInitializer,
                          FieldDeclaration optNextFieldDeclaration,
                          JooSymbol optSymSemicolon
  ) {
    super(modifiers,
            MODIFIERS_SCOPE|MODIFIER_STATIC,
            symConstOrVar, ide, optTypeRelation, optInitializer, optNextFieldDeclaration, optSymSemicolon);
    // inherit modifiers of first declaration to those following this declaration
    if (optSymSemicolon != null && optNextFieldDeclaration != null) {
      optNextFieldDeclaration.setInheritedModifiers(modifiers);
    }
  }

  @Override
  protected void setInheritedModifiers(final JooSymbol[] modifiers) {
    super.setInheritedModifiers(modifiers);
    if (optNextVariableDeclaration != null) {
      optNextVariableDeclaration.setInheritedModifiers(modifiers);
    }
  }

  @Override
  public boolean isField() {
    return true;
  }

  public boolean isConst() {
    return optSymConstOrVar != null && "const".equals(optSymConstOrVar.getText())
      && (optInitializer == null || optInitializer.value.isCompileTimeConstant());
  }

  public void setIsClassMember(final boolean b) {
    isClassMember = b;
    FieldDeclaration nextField = (FieldDeclaration) optNextVariableDeclaration;
    if (nextField != null) {
      nextField.setIsClassMember(b);
    }
  }

  @Override
  public boolean isClassMember() {
    return isClassMember;
  }

  @Override
  public AstNode analyze(AstNode parentNode, AnalyzeContext context) {
    super.analyze(parentNode, context);
    if (!isStatic() && optInitializer != null && !optInitializer.value.isCompileTimeConstant()) {
      getClassDeclaration().addFieldWithInitializer(this);
    }
    return this;
  }

  @Override
  protected void generateAsApiCode(final JsWriter out) throws IOException {
    super.generateAsApiCode(out);
  }

  @Override
  protected void generateStartCode(JsWriter out) throws IOException {
    out.beginString();
    writeModifiers(out);
    if (optSymConstOrVar!=null)
      out.writeSymbol(optSymConstOrVar);
    out.endString();
    out.write(",{");
  }

  @Override
  protected void generateInitializerCode(JsWriter out) throws IOException {
    if (optInitializer != null) {
      out.writeSymbolWhitespace(optInitializer.symEq);
      out.write(':');
      boolean isCompileTimeConstant = optInitializer.value.isCompileTimeConstant();
      if (!isCompileTimeConstant) {
        out.writeToken("function(){return(");
      }
      optInitializer.value.generateCode(out);
      if (!isCompileTimeConstant) {
        out.writeToken(");}");
      }
    } else {
      out.write(": undefined");
    }
  }

  @Override
  protected void generateEndCode(JsWriter out) throws IOException {
    if (!hasPreviousVariableDeclaration()) {
      out.write('}');
      Debug.assertTrue(optSymSemicolon != null, "optSymSemicolon != null");
      out.writeSymbolWhitespace(optSymSemicolon);
      out.writeToken(",");
    }
  }

  public void generateInitCode(JsWriter out) throws IOException {
    String accessCode = "this" + (isPrivate() ? "[$" + getName() + "]" : "." + getName());
    out.write(";" + accessCode + "=" + accessCode + "()");
  }
}
