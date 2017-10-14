import {isNumber, isString} from "util";

export default class Node {
  private _source: any;
  private _status: boolean = true;
  private _value: any;

  constructor(data: any) {
    this._source = data;
    this._value = {...data};
  }

  public custom(callback:Function) {
    Promise.resolve(callback(this._value)).then(res => {
      this._value = res.value;
      this._status = res.status;
    });
    return this;
  }

  get isString() {
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

  get status(): boolean {
    return this.status;
  }

  get value(): any {
    return this._value;
  }

  get source(): any {
    return this._source;
  }
}
