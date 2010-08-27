joo.classLoader.prepare("package",/*
{

import flash.display.Sprite
import flash.text.TextField

import com.salesforce.Connection

import com.salesforce.objects.LoginRequest
import com.salesforce.AsyncResponder
import com.salesforce.results.LoginResult
import com.salesforce.results.QueryResult*/

"public class SimpleSalesforce extends flash.display.Sprite",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super',$loginSuccess=$$l+'loginSuccess',$querySuccess=$$l+'querySuccess';return[function(){joo.classLoader.init(com.salesforce.objects.LoginRequest,flash.text.TextField,com.salesforce.Connection,com.salesforce.AsyncResponder);},


  "var",{ con/*:Connection*/: undefined},

  "public function SimpleSalesforce",function $SimpleSalesforce()
  {this[$super]();
    this.con = new com.salesforce.Connection();
    this.con.serverUrl = "https://localhost/services/Soap/u/9.0";

    var lr/*:LoginRequest*/ = new com.salesforce.objects.LoginRequest();
    lr.username = "dev@mavericks.demo";
    lr.password = "123456";
    lr.callback = new com.salesforce.AsyncResponder($$bound(this,$loginSuccess));

    this.con.login(lr);
  },

  "private function loginSuccess",function loginSuccess(result/*:LoginResult*/)/*:void*/
  {
    this.con.query("SELECT Id, FirstName, LastName FROM Contact", new com.salesforce.AsyncResponder($$bound(this,$querySuccess)));
  },

  "private function querySuccess",function querySuccess(result/*:QueryResult*/)/*:void*/
  {
    for (var i/*:int*/ = 0; i < result.size; i++)
    {
      var tf/*:TextField*/ = new flash.text.TextField();
      tf.y = i * 15;
      tf.text = result.records[i].FirstName + " " + result.records[i].LastName;
      this.addChild(tf);
    }
  },
];},[],["flash.display.Sprite","com.salesforce.Connection","com.salesforce.objects.LoginRequest","com.salesforce.AsyncResponder","flash.text.TextField"]
);