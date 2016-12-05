//formats output according to the result view
exports.formatOutput = function (object) {
  var x = [];
  Object.keys(object).forEach(function (v) {
    if (Object.keys(object[v]).length > 0) {
      x.push({
        label: v,
        value: JSON.stringify(object[v])
      });
    } else {
      x.push({
        label: v,
        value: object[v]
      });
    }

  });
  return x;
};

//builds an entity from attributes form
exports.buildEntityFromAttributes = function (listattributes, listvalues) {
  var obj = {};
  if (typeof listattributes === "string") {
    obj[listattributes] = listvalues;
  } else {
    for (var i = 0; i < listattributes.length && i < listvalues.length; i++) {
      obj[listattributes[i]] = listvalues[i];
    }
  }
  return obj;
};

//builds search criteria object for /entity/search api
exports.buildCriteria = function (listattributes, listvalues) {
  var c = [];
  if (typeof listattributes === "string") {
    c.push({
      "attribute_type": listattributes,
      "attribute_value": listvalues
    });
  } else {
    for (var i = 0; i < listattributes.length && i < listvalues.length; i++) {
      c.push({
        "attribute_type": listattributes[i],
        "attribute_value": listvalues[i]
      });
    }
  }
  return c;
}
