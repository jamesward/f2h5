package
{

import flash.display.Sprite;

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
    con.query("SELECT Id, LastName FROM Contact", new AsyncResponder(querySuccess));
  }

  private function querySuccess(result:QueryResult):void
  {
    trace("I found " + result.size + " records!");
  }
}
}
