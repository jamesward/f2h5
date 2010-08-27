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
class CommaSeparatedList<NodeType extends AstNode> extends Expr {
  NodeType head;
  JooSymbol symComma;
  CommaSeparatedList<NodeType> tail;

  public CommaSeparatedList(NodeType head) {
    this(head, null, null);
  }

  public CommaSeparatedList(NodeType head, JooSymbol comma, CommaSeparatedList<NodeType> tail) {
    this.head = head;
    this.symComma = comma;
    this.tail = tail;
  }

  @Override
  public void scope(final Scope scope) {
    head.scope(scope);
    if (tail != null) {
      tail.scope(scope);
    }
  }

  @Override
  protected void generateJsCode(final JsWriter out) throws IOException {
    throw new UnsupportedOperationException("should not be called"); 
  }

  @Override
  public void generateCode(JsWriter out) throws IOException {
    head.generateCode(out);
    if (symComma != null) {
      generateTailCode(out);
    }
  }

  protected void generateTailCode(JsWriter out) throws IOException {
    out.writeSymbol(symComma);
    tail.generateCode(out);
  }


  public Expr analyze(AstNode parentNode, AnalyzeContext context) {
    super.analyze(parentNode, context);
    head.analyze(this, context);
    if (tail != null)
      tail.analyze(this, context);
    return this;
  }

  public JooSymbol getSymbol() {
    return head.getSymbol();
  }

}
