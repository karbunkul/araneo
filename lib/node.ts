import {isBoolean, isNumber, isObject, isString} from "util";

export interface IAraneoNodeError {
  message: string;
  context: any;
}

export default class Node {
  private _source: any;
  private _status: boolean = true;
  private _value: any;
  private _error: IAraneoNodeError;

  constructor(data: any) {
    this._source = data;
    this._value = isObject(data) ? {...data} : data;
  }

  public isString() {
    if (this.status) {
      if (!isString(this._value)) {
        this.message('isString check failed');
      }
    }
    return this
  }

  public isNumber() {
    console.log('method isNumber');
    if (this.status) {
      if (!isNumber(this._value)) {
        this.message('isNumber check failed');
      }
    }
    return this;
  }

  public isExist() {
    if (this.status) {
      if (!(!!this._value)) {
        this.message('isExist check failed');
      }
    }
    return this;
  }

  private message(message: string) {
    this._status = false;
    this._error = {
      message: message,
      context: this.value,
    };
  }

  get error() {
    return this._error;
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
