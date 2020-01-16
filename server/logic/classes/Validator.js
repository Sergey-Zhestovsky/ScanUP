class Validator {
  constructor(config = {}) {
    this.config = null;

    this.init(config);
  }

  requiredFields() {
    let result = [];

    walkThrought(this.config);

    function walkThrought(config) {
      for (let field in config) {
        let fieldConfig = config[field];

        if (Array.isArray(fieldConfig) && fieldConfig.some((el) => el.rule === "required"))
          result.push(field)
      
        if (fieldConfig instanceof Object)
          walkThrought(fieldConfig);
      }
    }

    return result;
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
      maxLength,
      minLength,
      min,
      max,
      email,
      password,
      number,
      test
    };

    return func[rule.toString()](data, rule.value);

    function required(value) {
      return value !== null && value !== undefined && value !== "";
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
  }
}

module.exports = Validator;