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

    variables : modelData.variables,

    estimate : function(data) {
        const days =
            modelData.intercept +
            modelData.beta_logistic *
            dot_product(
                data.map((v) => (v.value - v.mean) / v.sd),
                data.map((v) => v.weight)
            );
  
      return Math.min(Math.max(0, days), 6813) / modelData.unit_scaling;
    }
}

export default model;
