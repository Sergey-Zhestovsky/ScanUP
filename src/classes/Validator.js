export default class Validator {
  constructor(config = {}) {
    this.config = null;

    this.init(config);
  }

  init(config) {
    this.config = walkThroughConfig(config, {});

    function walkThroughConfig(currentConfig, object) {
      for (let fieldName in currentConfig) {
        let fieldConfig = currentConfig[fieldName];

        if (fieldConfig instanceof Object && !Array.isArray(fieldConfig)) {
          walkThroughConfig(fieldConfig, object[fieldName] = {});
        } else {
          if (typeof fieldConfig === typeof "")
            fieldConfig = [fieldConfig];

          if (fieldConfig instanceof Array)
            fieldConfig = prepareRules(fieldConfig)
        }

        object[fieldName] = fieldConfig;
      }

      return object;
    }

    function prepareRules(confArray) {
      return confArray.map(config => {
        if (Array.isArray(config))
          return setRule(...config);

        return config;
      });

      function setRule(rule, value = null, name = null) {
        return {
          rule,
          value,
          name,
          toString() {
            return this.rule;
          }
        }
      }
    }
  }

  validate(validationData, validationCore = this.validationCore) {
    let errors = {},
      isValid = walkThroughConfig(this.config, errors, validationData);

    function walkThroughConfig(config, errors, dataContext) {
      let isValid = true;

      for (let fieldName in config) {
        let fieldConfig = config[fieldName];

        if (fieldConfig instanceof Object && !Array.isArray(fieldConfig)) {
          isValid = isValid && walkThroughConfig(fieldConfig, errors[fieldName] = {}, dataContext[fieldName]);
        } else {
          let temp = validationByRules(dataContext[fieldName], fieldConfig);

          errors[fieldName] = temp.errors;
          isValid = isValid && temp.isValid;
        }
      }

      return isValid;

      function validationByRules(data, fieldConfigArray) {
        let errors = [], isValid = true;

        for (let i = 0; i < fieldConfigArray.length; i++) {
          let result = validationCore(data, fieldConfigArray[i]);

          if (result === false) {
            isValid = false;
            errors.push(fieldConfigArray[i].toString());
          }
        }

        return {
          isValid,
          errors
        }
      }
    }

    return isValid || errors;
  }

  validationCore(data, rule) {
    const func = {
      required,
      length,
      maxLength,
      minLength,
      min,
      max,
      email,
      password,
      number,
      test,
      backTest
    };

    return func[rule.toString()](data, rule.value);

    function required(value) {
      return value !== null && value !== undefined && value !== "";
    }

    function length(data, size) {
      if (data === null)
        return;

      return data.toString().length === size;
    }

    function maxLength(data, size) {
      if (data === null)
        return;

      return data.toString().length <= size;
    }

    function minLength(data, size) {
      if (data === null)
        return;

      return data.toString().length >= size;
    }

    function min(data, size) {
      return Number(data) >= size;
    }

    function max(data, size) {
      return Number(data) <= size;
    }

    function email(data) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(data).toLowerCase());
    }

    function password(pass, rePass) {
      return pass === rePass;
    }

    function number(string) {
      return (parseInt(string) === Number(string));
    }

    function test(str, regExp) {
      return regExp.test(str);
    }

    function backTest(str, regExp) {
      return !regExp.test(str);
    }
  }
}

// {
//   name: "val"
//   name2: {
//     subName1: "val"
//     subName2: {
//       subSubName1: "val"
//       subSubName2: "val"
//     }
//   }
// }

// {
//   name: ["setting1"]
//   name2: {
//     subName1: ["setting1", ["setting2", "additionalData"]]
//     subName2: {
//       subSubName1: ["setting1", ["setting2", "additionalData"]]
//       subSubName2: [["setting1", "additionalData", "name2.newSubName1"]]
//     }
//   }
// }
// // rules [rule] > "str"
// // rule {name: rules} > [r] > "str"
// // [r] = [validationF, additionalData, newName]

// {
//   // name: true
//   name2: {
//     // subName1: true
//     subName2: {
//       subSubName1: ["setting1"]
//     }
//     newSubName1: ["setting1"]
//   }
// }

// {
//   name: ["setting", ["setting", "additionalData"]]
//   name2: {
//     property: ["subName1", {
//       property: ["subSubName1"],
//       rules: [["setting", ["setting", "additionalData"]]]
//     }]
//     rules: [
//       ["setting", ["setting", "additionalData"]],
//       ["setting", ["setting", "additionalData"]]
//     ]
//   }
// }
//   // rule {property, rules} > [] > "str"
//   // property ["str"] > "str"
//   // rules [rule] > rule