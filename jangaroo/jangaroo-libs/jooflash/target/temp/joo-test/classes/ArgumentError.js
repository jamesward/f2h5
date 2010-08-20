joo.classLoader.prepare("package",
"public class ArgumentError extends Error",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
"public function ArgumentError",function(msg,id){if(arguments.length<2){if(arguments.length<1){msg="";}id="";}this[$super]();

this.name="ArgumentError";
this.message="Error #"+id+": Parameter "+msg+" must have a legal value.";
},

];},[],["Error"]
);