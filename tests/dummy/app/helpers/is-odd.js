import Ember from 'ember';

export function isOdd(params/*, hash*/) {
  return params[0] % 2 == 0;
}

export default Ember.Helper.helper(isOdd);
