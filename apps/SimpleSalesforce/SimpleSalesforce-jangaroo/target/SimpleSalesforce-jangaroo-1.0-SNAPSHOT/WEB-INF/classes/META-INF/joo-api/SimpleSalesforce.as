package
{

import flash.display.Sprite;
import flash.text.TextField;

import com.salesforce.Connection;

import com.salesforce.objects.LoginRequest;
import com.salesforce.AsyncResponder;
import com.salesforce.results.LoginResult;
import com.salesforce.results.QueryResult;

public class SimpleSalesforce extends flash.display.Sprite
{

  var con:Connection;

  public native function SimpleSalesforce();
}
}