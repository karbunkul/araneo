import araneo from './lib/main';
import * as util from "util";

const obj = {
  toc: {
    chapter: {
      'sub-chapter': {
        title: 'Sub-chapter title'
      },
      title: 'Chapter 1',
    },
    depth: 2,
  }
};

const log = (message: any) =>
  console.log(`${util.inspect(message)}\n-----`);

const safe = araneo(obj);
const title = safe.node('toc.chapter.sub-chapter.title');
log(title.isString().status);
