import generateUUID from '../generateUUID';

describe('Utils/generateUUID', () => {
  it('자리수 테스트', () => {
    expect(generateUUID()).toHaveLength(36);
    expect(typeof generateUUID()).toBe('string');
  });

  it('-로 끊어서 테스트', () => {
    const [first, second, third, fourth, fifth] = generateUUID().split('-');
    expect(first).toHaveLength(8);
    expect(second).toHaveLength(4);
    expect(third).toHaveLength(4);
    expect(third[0]).toBe('4');
    expect(fourth).toHaveLength(4);
    expect(fifth).toHaveLength(12);
  });
});
