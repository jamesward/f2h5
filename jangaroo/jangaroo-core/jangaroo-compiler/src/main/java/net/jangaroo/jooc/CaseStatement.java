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
class CaseStatement extends KeywordStatement {

  Expr expr;
  JooSymbol symColon;

  public CaseStatement(JooSymbol symCase, Expr expr, JooSymbol symColon) {
    super(symCase);
    this.expr = expr;
    this.symColon = symColon;
  }

  @Override
  public void scope(final Scope scope) {
    expr.scope(scope);
  }

  public AstNode analyze(AstNode parentNode, AnalyzeContext context) {
    super.analyze(parentNode, context);
    expr = expr.analyze(this, context);
    return this;
  }

  protected void generateJsCode(JsWriter out) throws IOException {
    super.generateJsCode(out);
    expr.generateCode(out);
    out.writeSymbol(symColon);
  }

}
