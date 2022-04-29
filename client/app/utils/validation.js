import Validator from 'validatorjs';

export const allFieldsValidation = (data, rules, options) => {
  const vali = new Validator(data, rules, options);
  const vResp = { isValid: vali.passes() };
  if (!vResp.isValid) {
    vResp.errors = vali.errors.all();
  }
  return vResp;
};
