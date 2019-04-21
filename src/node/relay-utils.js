/* Helper utilities for nodeDefinitions */
export const getWithType = function(promise, type) {
  return promise.then((result) => {
    result.__type__ = type;
    return result;
 });
};

export const isType = function(obj, type) {
  return obj.__type__ === type;
}
