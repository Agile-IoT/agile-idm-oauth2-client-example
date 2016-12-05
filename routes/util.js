exports.formatOutput = function(object){
  var x = [];
  Object.keys(object).forEach(function(v){
      x.push({label: v, value:object[v]});
  });
  return x;
};

exports.buildEntityFromAttributes = function(listattributes, listvalues){
   var obj = {};
   if(typeof listattributes  === "string" ){
     obj[listattributes] = listvalues;
   }
   else {
     for(var i =0; i<listattributes.length && i<listvalues.length ; i++){
       obj[listattributes[i]]=listvalues[i];
     }     
   }
   return obj;
};
