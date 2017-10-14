import {isBoolean, isObject} from "util";
import Node from "./node";

export interface IAraneoOptions {
  cache?: boolean;
}

export default class Araneo {
  private source: object;
  private _path: string;
  private _segments: string[] = [];
  private _cache: boolean = true;
  private _caches: object = {};

  constructor(obj: object, options?: IAraneoOptions) {
    this.source = obj;
    if (options && options.hasOwnProperty('cache') && isBoolean(options.cache))
      this._cache = options.cache;
  }

  public isExist(path: string): boolean {
    return this.node(path).isExist.value;
  }

  private cache(path: string, value: any) {
    this._caches = {
      ...this.caches,
      [path]:value,
    };
  }

  private get caches() {
    return this._caches;
  }

  private set path(value: string) {
    this._segments = value.split('.');
    this._path = value;
  }

  private get segments(): string[] {
    return this._segments;
  }

  public node(path: string): Node {
    this.path = path;
    if (this._cache && this.caches.hasOwnProperty(path))
      return new Node(this.caches[path]);
    const data = this.isNextNode(this.segments);
    if (this._cache) this.cache(path, data);
    return new Node(data);
  }

  private isNextNode(segments: string[], current: object = null, index: number = 0): object|boolean {
    const key = (index < segments.length)
      ? segments[index]
      : segments[segments.length - 1];
    const safe = (current)
      ? current[key]
      : this.source[segments[0]];
    if (safe) {
      if ((++index == segments.length)) return safe;
      return this.isNextNode(segments, safe, index);
    }else {
      return false;
    }
  }
}
