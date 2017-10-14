import {isBoolean} from "util";
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

  /**
   * Check if exist node value by path
   * @param {string} path
   * @returns {boolean}
   */
  public isExist(path: string): boolean {
    return this.node(path).isExist.value;
  }

  /**
   * Add value to cache
   * @param {string} path
   * @param value
   */
  private cache(path: string, value: any) {
    this._caches = {
      ...this.caches,
      [path]:value,
    };
  }

  /**
   * Getter for caches
   * @returns {Object}
   */
  private get caches() {
    return this._caches;
  }

  /**
   * Setter for property path
   * @param {string} value
   */
  private set path(value: string) {
    this._segments = value.split('.');
    this._path = value;
  }

  /**
   * Getter for property segments
   * @returns {string[]}
   */
  private get segments(): string[] {
    return this._segments;
  }

  /**
   * Get node object from path
   * @param {string} path
   * @returns {Node}
   */
  public node(path: string): Node {
    this.path = path;
    if (this._cache && this.caches.hasOwnProperty(path))
      return new Node(this.caches[path]);
    const data = this.nextNode(this.segments);
    if (this._cache) this.cache(path, data);
    return new Node(data);
  }

  /**
   * Get next node from path
   * @param {string[]} segments
   * @param {Object} current
   * @param {number} index
   * @returns {Object | boolean}
   */
  private nextNode(segments: string[], current: object = null, index: number = 0): object|boolean {
    const key = (index < segments.length)
      ? segments[index]
      : segments[segments.length - 1];
    const safe = (current)
      ? current[key]
      : this.source[segments[0]];
    if (safe) {
      if ((++index == segments.length)) return safe;
      return this.nextNode(segments, safe, index);
    }else {
      return false;
    }
  }
}
