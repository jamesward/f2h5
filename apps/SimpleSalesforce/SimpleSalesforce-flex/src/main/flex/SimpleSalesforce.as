package
{

import flash.display.Sprite;
import flash.text.TextField;

import com.salesforce.Connection;

import com.salesforce.objects.LoginRequest;
import com.salesforce.AsyncResponder;
import com.salesforce.results.LoginResult;
import com.salesforce.results.QueryResult;

public class SimpleSalesforce extends Sprite
{

  var con:Connection;

  public function SimpleSalesforce()
  {
    con = new Connection();

    var lr:LoginRequest = new LoginRequest();
    lr.username = "dev@mavericks.demo";
    lr.password = "123456";
    lr.callback = new AsyncResponder(loginSuccess);

    con.login(lr);
  }

  private function loginSuccess(result:LoginResult):void
  {
    con.query("SELECT Id, FirstName, LastName FROM Contact", new AsyncResponder(querySuccess));
  }

  private function querySuccess(result:QueryResult):void
  {
    for (var i:int = 0; i < result.size; i++)
    {
      var tf:TextField = new TextField();
      tf.y = i * 15;
      tf.text = result.records[i].FirstName + " " + result.records[i].LastName;
      addChild(tf);
    }
  }
}
}
