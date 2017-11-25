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

  public isString(params = {err: undefined}): this {
    const {err = 'isString check failed'} = params;
    if (this.status) {
      if (!isString(this._value)) {
        this.message(err);
      }
    }
    return this
  }

  public isNumber(err = undefined): this {
    if (this.status) {
      if (!isNumber(this._value)) {
        this.message(err || 'isNumber check failed');
      }
    }
    return this;
  }

  public isExist(err = undefined): this {
    if (this.status) {
      if (!(!!this._value)) {
        this.message(err || 'isExist check failed');
      }
    }
    return this;
  }

  public required(err = undefined, fields: string[]): this {
    if (this.status) {
      if (!isObject(this.value)) {
        for (let prop of fields) {
          if (!this.value.hasOwnProperty(prop)) {
            this.message(err || `Missing required prop ${prop}`);
          }
        }
      }else {
        this.message('Value is not object');
      }
    }
    return this;
  }

  public trim(err = undefined): this {
    if (this.status) {
      if (isString(this.value)){
        this._value = this._value.trim();
      } else{
        this.message(err || 'Value is not string');
      }
    }
    return this;
  }

  public match(err = undefined, regexp: string|RegExp) {
    if (this.status) {
      if (isString(this.value)){
        this._value = this._value.match(regexp);
      } else{
        this.message(err || 'Value is not string');
      }
    }
    return this;
  }

  public replace(err = undefined, regexp: string|RegExp, value: string) {
    if (this.status) {
      if (isString(this.value)){
        this._value = this._value.replace(regexp, value);
      } else{
        this.message('Value is not string');
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
