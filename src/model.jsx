import React from "react";

const modelData = require("./model.json");

function dot_product(a, b) {
    var result = 0;
    if (a.length == b.length) {
        for (var i = 0; i < a.length; ++i) {
            result += a[i] * b[i];
        }
    }
    return result;
}

const model = {
    sample_values : modelData.sample_values,
    
    variables : modelData.variables.map(v => {return {"name" : v.name, "label" : v.label, "type": v.type, "unit" : v.unit, "values" : v.values}}),
    
    estimate : function(values) {
        var variables = modelData.variables;
    
        var means = variables.map(v => v['mean']);
        var stdevs = variables.map(v => v['sd']);
        var weights = variables.map(v => v['weight']);
    
        return (modelData.intercept +
                modelData.beta_logistic * 
                dot_product(values.map((v,i) => (v - means[i])/stdevs[i]), weights)
               )/ modelData.unit_scaling;
    }
}

export default model;
