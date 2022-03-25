import { reduce } from 'lodash';

export const getTotal = (data: any, field = 'count') => {
  return reduce(data, (sum, curr) => sum + curr[field], 0);
};

export function groupById(obj: any, field = '_id') {
  return reduce(
    obj,
    (res, curr) => {
      res[curr[field]] = res[curr[field]] || [];
      res[curr[field]].push(curr);
      return res;
    },
    {},
  );
}
