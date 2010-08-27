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
 */
class IfStatement extends KeywordStatement {

  Expr cond;
  Statement ifTrue;
  JooSymbol symElse;
  Statement ifFalse;

  public IfStatement(JooSymbol symIf, Expr cond, Statement ifTrue) {
    this(symIf, cond, ifTrue, null, null);
  }

  public IfStatement(JooSymbol symIf, Expr cond, Statement ifTrue, JooSymbol symElse, Statement ifFalse) {
    super(symIf);
    this.cond = cond;
    this.ifTrue = ifTrue;
    this.symElse = symElse;
    this.ifFalse = ifFalse;
  }

  @Override
  public void scope(final Scope scope) {
    cond.scope(scope);
    ifTrue.scope(scope);
    if (ifFalse != null)
      ifFalse.scope(scope);
  }

  public AstNode analyze(AstNode parentNode, AnalyzeContext context) {
    super.analyze(parentNode, context);
    cond = cond.analyze(this, context);
    ifTrue.analyze(this, context);
    if (ifFalse != null)
      ifFalse.analyze(this, context);
    return this;
  }

  protected void generateJsCode(JsWriter out) throws IOException {
    super.generateJsCode(out);
    cond.generateCode(out);
    ifTrue.generateCode(out);
    if (symElse != null) {
      out.writeSymbol(symElse);
      ifFalse.generateCode(out);
    }
  }

}
