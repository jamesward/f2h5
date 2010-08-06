joo.classLoader.prepare(/*
 * Copyright 2009 CoreMedia AG
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

// JangarooScript runtime support. Author: Manuel Ohlendorf

"package joo", [""],

"public class ResourceBundleAwareClassLoader extends joo.DynamicClassLoader",function($$private){with($$private)return[ 

  "private static const",{ DAYS_TILL_LOCALE_COOKIE_EXPIRY/*:int*/ : 10*356},

  "private static const",{ RESOURCE_BUNDLE_PATTERN/*:RegExp*/ : /_properties$/},

  "public var",{ supportedLocales/*:Array*/: undefined},
  "public var",{ localeCookieName/*:String*/: undefined},
  "public var",{ localeCookiePath/*:String*/ :function(){return( joo.window.location.pathname);}},
  "public var",{ localeCookieDomain/*:String*/ : null},

  "public function ResourceBundleAwareClassLoader",function $ResourceBundleAwareClassLoader(supportedLocales/*:Array = ["en"]*/, localeCookieName/*:String = "joo.locale"*/) {if(arguments.length<2){if(arguments.length<1){supportedLocales = ["en"];}localeCookieName = "joo.locale";}
    var debug/*:Boolean*/ = joo.classLoader.debug;
    var urlPrefix/*:String*/ = (joo.classLoader/*as DynamicClassLoader*/).urlPrefix;
    this[$super]();
    this.debug = debug;
    this.urlPrefix = urlPrefix;
    this.supportedLocales = supportedLocales;
    this.localeCookieName = localeCookieName;
  },

  "private static function isBundleName",function isBundleName(fullClassName/*:String*/)/*:Boolean*/ {

    return ! !fullClassName.match($$private.RESOURCE_BUNDLE_PATTERN);

  },

  "private function escape",function escape(s/*:String*/)/*:String*/ {
    return s.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
  },

  "private function readLocaleFromCookie",function readLocaleFromCookie()/*:String*/ {
    var cookieKey/* : String*/ = this[$escape](this.localeCookieName);
    var match/* : Array*/ = joo.window.document.cookie.match("(?:^|;)\\s*" + cookieKey + "=([^;]*)");
    return match ? decodeURIComponent(match[1]) : null;
  },

  "private function setCookie",function setCookie(name/*:String*/, value/*:String*/,
                             path/*:String = null*/,
                             expires/*:Date = null*/,
                             domain/*:String = null*/,
                             secure/*:Boolean = false*/)/*:void*/ {if(arguments.length<6){if(arguments.length<5){if(arguments.length<4){if(arguments.length<3){path = null;}expires = null;}domain = null;}secure = false;}
    joo.window.document.cookie =
            name + "=" + encodeURIComponent(value) +
                    ((expires === null) ? "" : ("; expires=" + expires.toGMTString())) +
                    ((path === null) ? "" : ("; path=" + path)) +
                    ((domain === null) ? "" : ("; domain=" + domain)) +
                    (secure ? "; secure" : "");
  },

  "private function getLocaleCookieExpiry",function getLocaleCookieExpiry()/*:Date*/ {
    var date/*:Date*/ = new Date();
    date.setTime(date.getTime() + ($$private.DAYS_TILL_LOCALE_COOKIE_EXPIRY * 24 * 60 * 60 * 1000));
    return date;
  },

  "public function setLocale",function setLocale(locale/* :String*/ )/*:void*/ {
    this[$setCookie](this.localeCookieName, locale, this.localeCookiePath, this[$getLocaleCookieExpiry](), this.localeCookieDomain);
  },

  "public function getLocale",function getLocale()/*:String*/ {
    var userLocale/*:String*/ = this[$readLocaleFromCookie]();

    if (!userLocale && joo.window.navigator) {
      userLocale = joo.window.navigator.language || joo.window.navigator.browserLanguage || joo.window.navigator.systemLanguage || joo.window.navigator.userLanguage;
      if (userLocale) {
        userLocale = userLocale.replace(/-/g, "_");
      }
    }

    if (!userLocale) {
      userLocale = "en";
    }

    //find longest match
    var longestMatch/*:String*/;
    for (var i/*:int*/ = 0; i < this.supportedLocales.length; i++) {
      if (userLocale.indexOf(this.supportedLocales[i]) === 0) {
        if (!longestMatch || longestMatch.length > this.supportedLocales[i]) {
          longestMatch = this.supportedLocales[i];
        }
      }
    }
    return longestMatch;
  },

  "private function getCurrentLocaleSuffix",function getCurrentLocaleSuffix()/*:String*/ {
    var locale/*:String*/ = this.getLocale();
    //The default language "en" has no ending.
    return !locale || locale === "en"
      ? ""
      : "_" + locale;
  },

  "override protected function getUri",function getUri(fullClassName/* : String*/)/*:String*/ {

    if ($$private.isBundleName(fullClassName)) {

      fullClassName += this[$getCurrentLocaleSuffix]();

    }

    return this[$getUri](fullClassName);

  },

];},[],["joo.DynamicClassLoader","Date"]
);