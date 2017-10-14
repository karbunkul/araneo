import araneo from './lib/main';

const obj = {
  toc: {
    chapter: {
      title: 'Chapter 1',
      sub: []
    },
    depth: 3,
  }
};

const safe = araneo(obj);

const chapter = safe.node('toc.chapter');

// console.log(chapter.isExist.val);
console.log(chapter.custom((data) => {
  return {
    value: data['author'] = 'Alexander Pushkin',
    status: true,
  };
}).value);
// console.log(chapter.isExist.isString.val);
// console.log(safe.node('toc.depth').isNumber.val);
