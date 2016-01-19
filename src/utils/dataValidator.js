import _ from 'lodash';

/**
 * create custom Error object
 * @param  {string} key     validator key, same as api endpoint usually
 * @param  {string} message error message
 * @return {Error}
 */
var createError = (key, message)=>{
  var errMsg = `DataValidator: ${key}: ${message}`;
  return new Error(errMsg);
};


class DataValidator {
  constructor(){
    this.validators = {};
  }

  /**
   * add validator
   * @param {string} key       validator key
   * @param {func} validator
   */
  add(key, validator){
    this.validators[key] = function(data){
      return validator(key, data);
    };
  }

  /**
   * run validate by given validator key
   * @param  {string} key  validator key
   * @param  {object} data object to be validate
   * @return {Error/null}      return null if no error
   */
  doValidate(key, data){
    var validator = this.validators[key];
    var result = validator(data);
    if (result && typeof result === 'string') {
      return createError(key, result);
    }
    else{
      return null;
    }
  }
}

var dataValidator = new DataValidator();

dataValidator.add('reportmeta', (key, reports)=>{
  if (!Array.isArray(reports)) {
    return '[reports] is should be an array.';
  }

  if (reports.length === 0) {
    return '[reports] is empty.';
  }

  return null;
});

dataValidator.add('domains', (key, domains)=>{
  if (!Array.isArray(domains)) {
    return '[domains] is should be an array.';
  }

  if (domains.length === 0) {
    return '[domains] is empty.';
  }

  return null;
});

dataValidator.add('versions', (key, versions)=>{
  if (!Array.isArray(versions)) {
    return '[versions] is should be an array.';
  }

  if (!_.find(versions, {_id: 'Domains'})) {
    return 'Domain version is missing.';
  }

  if (!_.find(versions, {_id: 'Reports'})) {
    return 'Report version is missing.';
  }

  return null;
});

export default dataValidator;
