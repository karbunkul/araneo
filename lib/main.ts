import Araneo, {IAraneoOptions} from './araneo';

const obj = (obj: object, options?: IAraneoOptions): Araneo => {
  return new Araneo(obj, options);
};

export default obj

module.exports = obj;
module.exports.default = obj;
