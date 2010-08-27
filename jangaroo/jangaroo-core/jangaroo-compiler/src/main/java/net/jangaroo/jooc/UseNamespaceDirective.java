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
 * @author Frank Wienberg
 */
public class UseNamespaceDirective extends NodeImplBase {

  JooSymbol useKeyword;
  JooSymbol namespaceKeyword;
  Ide namespace;

  public UseNamespaceDirective(JooSymbol useKeyword, JooSymbol namespaceKeyword, Ide namespace) {
    this.useKeyword = useKeyword;
    this.namespaceKeyword = namespaceKeyword;
    this.namespace = namespace;
  }

  @Override
  public void scope(final Scope scope) {
    namespace.scope(scope);
  }

  @Override
  public AstNode analyze(AstNode parentNode, AnalyzeContext context) {
    Jooc.warning(namespace.getSymbol(), "namespaces are not yet implemented, ignoring use namespace " + namespace.getName());
    namespace.analyze(this, context);
    return super.analyze(parentNode, context);
  }

  protected void generateJsCode(JsWriter out) throws IOException {
    out.beginString();
    out.writeSymbol(useKeyword);
    out.writeSymbol(namespaceKeyword);
    namespace.generateCode(out);
    out.endString();
    out.writeToken(",");
  }

  public JooSymbol getSymbol() {
      return useKeyword;
  }

}