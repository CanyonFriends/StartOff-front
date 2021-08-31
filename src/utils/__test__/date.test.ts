import { dateToString } from '../date';

const date = new Date('1998-01-22');

describe('Utils/dateToString', () => {
  it('undefined일 경우', () => {
    expect(dateToString(undefined)).toBe('');
  });

  it('date일 경우', () => {
    expect(dateToString(date)).toBe('1998-01-22');
  });
});
