import Araneo, {IAraneoOptions} from './araneo';

const araneo = (obj: object, options?: IAraneoOptions): Araneo => {
  return new Araneo(obj, options);
};

export default araneo;
