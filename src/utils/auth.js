import Cookies from 'js-cookie'
const TokenKey = 'sessionid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
const flattenOptions = function(options, ancestor = []) {
  let flatOptions = [];
  options.forEach((option) => {
    const optionsStack = ancestor.concat(option);
    if (!option['children']) {
      flatOptions.push(optionsStack);
    } else {
        flatOptions.push(optionsStack);
      flatOptions = flatOptions.concat(flattenOptions(option['children'], optionsStack));
    }
  });
  return flatOptions;
};
export const getCascader = function(val,option){
  const flatOptions = flattenOptions(option);
  let filteredFlatOptions = flatOptions.filter(optionsStack => {
    return optionsStack.some(option => new RegExp(val, 'i').test(option['id']));
  });
  return filteredFlatOptions[0]
};
