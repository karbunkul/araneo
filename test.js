const araneo = require('./dist/lib/main');

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

console.log(chapter.custom((data) => {
  return {
    value: data['author'] = 'Alexander Pushkin',
    status: true,
  };
}).status);
