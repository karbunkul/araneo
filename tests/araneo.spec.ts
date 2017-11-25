import 'mocha';
import { expect } from 'chai';
import araneo from '../lib/main';
import Araneo from '../lib/araneo';

const obj = {
  toc: {
    chapter: {
      'sub-chapter': {
        title: 'Sub-chapter title'
      },
      title: ' Chapter 1 ',
    },
    depth: 2,
  }
};

describe('Araneo init', () => {
  const safe = araneo(obj);

  console.log(safe.node('toc.depth').isString().error);

  it('should return instance of Araneo', () => {
    expect(safe instanceof Araneo).to.equal(true);
  });

  it('path is undefined return source obj', () => {
    expect(safe.node().value['toc']['depth'] == obj['toc']['depth']).to.equal(true);
  });

  it('check node by path', () => {
    expect(safe.node('toc.depth').value == obj['toc']['depth']).to.equal(true);
  });

  it('check node value is number', () => {
    expect(safe.node('toc.depth').isNumber().status).to.equal(true);
  });

  it('check node value is string', () => {
    expect(safe.node('toc.chapter.sub-chapter.title').isString().status).to.equal(true);
  });

  it('check node value is not exist', () => {
    expect(safe.node('toc.chapter.sub-chapter.tit').isExist().status).to.equal(false);
  });

  it('trim space in string', () => {
    expect(safe.node('toc.chapter.title').trim().value == 'Chapter 1').to.equal(true);
  });

  it('match string', () => {
    expect(safe.node( 'toc.chapter.title').match(undefined,/\d/).value == '1').to.equal(true);
    expect(safe.node('toc.chapter.title').match(undefined,'1').value == '1').to.equal(true);
  });

  it('replace string', () => {
    expect(safe.node('toc.chapter.title').trim().replace(undefined,/\d/, '9').value == 'Chapter 9').to.equal(true);
    expect(safe.node('toc.chapter.title').trim().replace(undefined,'1', '9').value == 'Chapter 9').to.equal(true);
  });
});
