joo.classLoader.prepare("package", [""],
"public class ArgumentError extends Error",function($$private){with($$private)return[ 
  "public function ArgumentError",function $ArgumentError(msg/* : String = ""*/, id/* : String = ""*/) {if(arguments.length<2){if(arguments.length<1){msg = "";}id = "";}this[$super]();
    // built-in class Error cannot be used in super-constructor call :-(
    this.name = "ArgumentError";
    this.message = "Error #"+id+": Parameter "+msg+" must have a legal value.";
  },

];},[],["Error"]
);