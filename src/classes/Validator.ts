import ValidationError, { ValidationErrorCodes } from "./ValidationError";
import isObject from "../modules/isObject";

interface RecursiveConfig<EndPoint> {
  [name: string]: RecursiveConfig<EndPoint> | EndPoint;
}

export type Config = RecursiveConfig<OriginConfigProperty>;
type OriginConfigProperty = Rules | OriginConfigOption[];
type OriginConfigOption = Rules | [Rules, any?, string?];

type ValidationConfig = RecursiveConfig<Rule[]>;

export type DataObject = RecursiveConfig<OriginValidationData>;
type OriginValidationData = string | [string, any?];

type ErrorObject = RecursiveConfig<ValidationError[]>;

class ValidationData {

  public value: string;
  public additional: any = null;

  constructor(data: OriginValidationData) {
    if (Array.isArray(data)) {
      this.value = data[0];
      this.additional = data[1];
    } else {
      this.value = data;
    }
  }
}

export enum Rules {
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
  backTest,
};

type RuleError = { [index in Rules]: ValidationErrorCodes };

const ruleError: RuleError = {
  [Rules.required]: ValidationErrorCodes.REQUIRED,
  [Rules.length]: ValidationErrorCodes.DEFAULT,
  [Rules.maxLength]: ValidationErrorCodes.DEFAULT,
  [Rules.minLength]: ValidationErrorCodes.DEFAULT,
  [Rules.min]: ValidationErrorCodes.DEFAULT,
  [Rules.max]: ValidationErrorCodes.DEFAULT,
  [Rules.email]: ValidationErrorCodes.EMAIL,
  [Rules.password]: ValidationErrorCodes.PASSWORD,
  [Rules.number]: ValidationErrorCodes.DEFAULT,
  [Rules.test]: ValidationErrorCodes.DEFAULT,
  [Rules.backTest]: ValidationErrorCodes.DEFAULT
};

class Rule {

  public error: ValidationError | null = null;

  constructor(
    public rule: Rules,
    public value: any = null,
    public name: string | null = null
  ) { }

  get Rule() {
    return this.rule;
  }

  get Error() {
    if (this.error === null)
      this.error = ValidationError.create(ruleError[this.rule]);

    return this.error;
  }
}

export default class Validator {

  public config: ValidationConfig;

  constructor(config: Config) {
    this.config = this.init(config);
  }

  static showError(errors: ErrorObject, withValid: boolean = false) {
    return walkThroughErrors(errors);

    function walkThroughErrors(errors: ErrorObject, output: any = {}) {
      for (let errorName in errors) {
        let errorField = errors[errorName];

        if (isObject(errorField))
          output[errorName] = walkThroughErrors(errorField as ErrorObject);
        else if (errorField.length)
          output[errorName] = (errorField as ValidationError[])[0].Message;
        else if (withValid)
          output[errorName] = null;
      }

      return output;
    }
  }

  init(config: Config): ValidationConfig {
    return walkThroughConfig(config, {});

    function walkThroughConfig(currentConfig: Config,
      result: ValidationConfig): ValidationConfig {
      for (let fieldName in currentConfig) {
        let fieldConfig = currentConfig[fieldName];

        if (isObject(fieldConfig)) {
          result[fieldName] = walkThroughConfig(fieldConfig as Config, {});
        } else {
          if (!Array.isArray(fieldConfig))
            fieldConfig = [fieldConfig] as OriginConfigOption[];

          result[fieldName] = prepareRules(fieldConfig);
        }
      }

      return result;
    }

    function prepareRules(confArray: OriginConfigOption[]): Rule[] {
      return confArray.map(config => {
        if (Array.isArray(config))
          return new Rule(...config);

        return new Rule(config);
      });
    }
  }

  validate(validationData: DataObject) {
    let validationCore = this.validationCore,
      errors = {},
      isValid = walkThroughConfig(this.config, errors, validationData);

    function walkThroughConfig(config: ValidationConfig,
      errors: ErrorObject, dataContext: DataObject): boolean {
      let isValid: boolean = true;

      for (let fieldName in config) {
        let fieldConfig = config[fieldName],
          dataConfig = dataContext[fieldName];

        if (isObject(fieldConfig)) {
          if (!isObject(dataConfig))
            throw new Error("Validation data object don't match to config object");

          isValid = walkThroughConfig(fieldConfig as ValidationConfig,
            errors[fieldName] = {}, dataConfig as DataObject) && isValid;

        } else {
          let temp = validationByRules(dataConfig as OriginValidationData,
            fieldConfig as Rule[]);

          errors[fieldName] = temp.errors;
          isValid = isValid && temp.isValid;
        }
      }

      return isValid;

      function validationByRules(data: OriginValidationData,
        fieldConfigArray: Rule[]): { isValid: boolean, errors: ValidationError[] } {
        let validationData = new ValidationData(data),
          errors: ValidationError[] = [],
          isValid: boolean = true;

        for (let i = 0; i < fieldConfigArray.length; i++) {
          let currentRule = fieldConfigArray[i],
            result = validationCore(validationData, currentRule);

          if (result === false) {
            isValid = false;
            errors.push(currentRule.Error);
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

  private validationCore(data: ValidationData, rule: Rule): boolean {
    const ruleFunctions: { [index in Rules]: Function } = {
      [Rules.required]: required,
      [Rules.length]: length,
      [Rules.maxLength]: maxLength,
      [Rules.minLength]: minLength,
      [Rules.min]: min,
      [Rules.max]: max,
      [Rules.email]: email,
      [Rules.password]: password,
      [Rules.number]: number,
      [Rules.test]: test,
      [Rules.backTest]: backTest
    };

    return ruleFunctions[rule.rule](data.value, rule.value, data.additional);

    function required(value: string) {
      return value !== null && value !== undefined && value !== "";
    }

    function length(data: string, size: number) {
      if (data === null)
        return;

      return data.toString().length === size;
    }

    function maxLength(data: string, size: number) {
      if (data === null)
        return;

      return data.toString().length <= size;
    }

    function minLength(data: string, size: number) {
      if (data === null)
        return;

      return data.toString().length >= size;
    }

    function min(data: string, size: number) {
      return Number(data) >= size;
    }

    function max(data: string, size: number) {
      return Number(data) <= size;
    }

    function email(data: string) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(data).toLowerCase());
    }

    function password(pass: string, rePass: string, rePassDirectly: string) {
      if (rePassDirectly)
        return pass === rePassDirectly;

      return pass === rePass;
    }

    function number(string: string) {
      return (parseInt(string) === Number(string));
    }

    function test(str: string, regExp: RegExp) {
      return regExp.test(str);
    }

    function backTest(str: string, regExp: RegExp) {
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