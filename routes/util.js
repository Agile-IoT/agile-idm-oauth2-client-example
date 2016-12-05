exports.formatOutput = function(object){
  var x = [];
  Object.keys(object).forEach(function(v){
      x.push({label: v, value:object[v]});
  });
  return x;
};
