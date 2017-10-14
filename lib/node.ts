import {isBoolean, isNumber, isObject, isString} from "util";

export default class Node {
  private _source: any;
  private _status: boolean = true;
  private _value: any;
  private _error: string;

  constructor(data: any) {
    this._source = data;
    this._value = {...data};
  }

  /**
   * Custom for validation
   * @param {Function} callback
   * @returns {Node}
   */
  public custom(callback:Function) {
    Promise.resolve(callback(this._value)).then(res => {
      // if res object
      if (isObject(res) && res.hasOwnProperty('value') && res.hasOwnProperty('status')) {
        this._value = res.value;
        this._status = res.status;
      }
      // if single value
      if (isBoolean(res)) {
        this._status = res;
      }else {
        this._value = res;
      }
    });
    return this;
  }

  get isString() {

    if (this.status) {
      if (!isString(this._value)) {
        this.message('iString check failed')
      }
    }

    (this._status)
      ? this._status = isString(this._value)
      : false;
    return this
  }

  get isNumber() {
    this._value = isNumber(this._value);
    return this;
  }

  get isExist() {
    this._value = !!(this._value);
    return this;
  }

  get error() {
    return this._error;
  }

  private message(message: string) {
    this._error = `${message} context: ${JSON.stringify(this.value)}`
  }

  get status(): boolean {
    return this._status;
  }

  get value(): any {
    return this._value;
  }

  get source(): any {
    return this._source;
  }
}
