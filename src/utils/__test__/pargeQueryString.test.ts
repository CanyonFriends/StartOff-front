import parseQueryString from '../parseQueryString';

describe('Utils/pargeQueryString', () => {
  it('parsing', () => {
    const qs = '?page=10&size=20';
    const parsedObj = parseQueryString(qs);

    expect(parsedObj.page).toBe('10');
    expect(parsedObj.size).toBe('20');
  });
});
