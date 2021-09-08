import { makeProjectMock } from '../../__mocks__/client-mock-data';
import loginValidator from '../loginValidator';
import modifyProfileInfoCardValidator from '../modifyProfileInfoCardValidator';
import modifyProfileIntroduceValidator from '../modifyProfileIntroduceValidator';
import projectValidator from '../projectValidator';
import signupValidator from '../signupValidator';
import updatePasswordValidator from '../updatePasswordValidator';
import postFormValidator from '../postFormValidator';

describe('Validator/loginValidator', () => {
  it('모두 있을 경우', () => {
    const error = loginValidator({ id: 'id', pw: 'pw' });
    expect(error).toBe('');
  });

  it('id 없을 경우', () => {
    const error = loginValidator({ id: '', pw: 'pw' });
    expect(error).toBe('아이디를 입력해주시기 바랍니다');
  });

  it('pw 없을 경우', () => {
    const error = loginValidator({ id: 'id', pw: '' });
    expect(error).toBe('비밀번호를 입력해주시기 바랍니다');
  });
});

describe('Validator/modifyProfileInfoCardValidator', () => {
  it('내용이 있을 경우', () => {
    const error = modifyProfileInfoCardValidator({ textValue: 'value' });
    expect(error).toBe('');
  });

  it('내용이 없을 경우', () => {
    const error = modifyProfileInfoCardValidator({ textValue: '' });
    expect(error).toBe('내용을 입력해주십시오');
  });
});

describe('Validator/modifyProfileIntroduceValidator', () => {
  it('모두 있을 경우', () => {
    const error = modifyProfileIntroduceValidator({ nickname: 'nickname', imageurl: 'url', introduce: 'introduce' });
    expect(error).toBe('');
  });

  it('별명이 없을 경우', () => {
    const error = modifyProfileIntroduceValidator({ nickname: '', imageurl: 'url', introduce: 'introduce' });
    expect(error).toBe('별명을 입력해주십시오');
  });

  it('이미지 주소가 없을 경우', () => {
    const error = modifyProfileIntroduceValidator({ nickname: 'nickname', imageurl: '', introduce: 'introduce' });
    expect(error).toBe('');
  });

  it('소개가 없을 경우', () => {
    const error = modifyProfileIntroduceValidator({ nickname: 'nickname', imageurl: 'url', introduce: '' });
    expect(error).toBe('');
  });
});

describe('Validator/projectValidator', () => {
  it('모두 있을 경우', () => {
    const dummyProject = makeProjectMock({});
    const error = projectValidator(dummyProject);
    expect(error).toBe('');
  });

  it('프로젝트명이 없을 경우', () => {
    const dummyProject = makeProjectMock({});
    const error = projectValidator({ ...dummyProject, title: '' });
    expect(error).toBe('프로젝트명을 입력해주십시오');
  });

  it('시작일이 없을 경우', () => {
    const dummyProject = makeProjectMock({});
    const error = projectValidator({ ...dummyProject, startDate: undefined });
    expect(error).toBe('시작일을 입력해주십시오');
  });

  it('진행중이지 않고 종료일이 없을 경우', () => {
    const dummyProject = makeProjectMock({});
    const error = projectValidator({ ...dummyProject, endDate: undefined, isProgress: false });
    expect(error).toBe('종료일을 입력해주십시오');
  });

  it('진행중이고 종료일이 없을 경우', () => {
    const dummyProject = makeProjectMock({});
    const error = projectValidator({ ...dummyProject, endDate: undefined, isProgress: true });
    expect(error).toBe('');
  });
});

describe('Validator/signupValidator', () => {
  it('모두 있을 경우', () => {
    const error = signupValidator({ id: 'id', pw: '1q2w3e4r', confirmPW: '1q2w3e4r', nickname: 'nickname' });
    expect(error).toBe('');
  });

  it('id가 없을 경우', () => {
    const error = signupValidator({ id: '', pw: '1q2w3e4r', confirmPW: '1q2w3e4r', nickname: 'nickname' });
    expect(error).toBe('이메일을 입력해주십시오');
  });

  it('별명이 없을 경우', () => {
    const error = signupValidator({ id: 'id', pw: '1q2w3e4r', confirmPW: '1q2w3e4r', nickname: '' });
    expect(error).toBe('별명은 2자리 이상이어야 합니다');
  });

  it('별명이 한 자리일 경우', () => {
    const error = signupValidator({ id: 'id', pw: '1q2w3e4r', confirmPW: '1q2w3e4r', nickname: 'n' });
    expect(error).toBe('별명은 2자리 이상이어야 합니다');
  });

  it('비밀번호가 없을 경우', () => {
    const error = signupValidator({ id: 'id', pw: '', confirmPW: '1q2w3e4r', nickname: 'nickname' });
    expect(error).toBe('비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다');
  });

  it('비밀번호가 올바르지 않을 경우', () => {
    const error = signupValidator({ id: 'id', pw: '1q🌟2w3e4r', confirmPW: '1q2w3e4r', nickname: 'nickname' });
    expect(error).toBe('비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다');
  });

  it('비밀번호 확인이 비밀번호와 다를 경우', () => {
    const error = signupValidator({ id: 'id', pw: '1q2w3e4r', confirmPW: '4r3e2w1q', nickname: 'nickname' });
    expect(error).toBe('비밀번호가 서로 다릅니다');
  });
});

describe('Validator/updatePasswordValidator', () => {
  it('모두 있을 경우', () => {
    const error = updatePasswordValidator({ currentPW: '1q2w3e4r', afterPW: '4r3e2w1q', confirmPW: '4r3e2w1q' });
    expect(error).toBe('');
  });

  it('현재 비밀번호가 없을 경우', () => {
    const error = updatePasswordValidator({ currentPW: '', afterPW: '4r3e2w1q', confirmPW: '4r3e2w1q' });
    expect(error).toBe('현재 비밀번호를 입력해 주십시오');
  });

  it('바꿀 비밀번호가 없을 경우', () => {
    const error = updatePasswordValidator({ currentPW: '1q2w3e4r', afterPW: '', confirmPW: '4r3e2w1q' });
    expect(error).toBe('비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다');
  });

  it('바꿀 비밀번호가 올바르지 않을 경우', () => {
    const error = updatePasswordValidator({ currentPW: '1q2w3e4r', afterPW: '4r3e🌟2w1q', confirmPW: '4r3e2w1q' });
    expect(error).toBe('비밀번호는 6자리 이상이고 영어와 숫자로만 구성되어야 합니다');
  });

  it('바꿀 비밀번호 확인이 바꿀 비밀번호와 다른 경우', () => {
    const error = updatePasswordValidator({ currentPW: '1q2w3e4r', afterPW: '4r3e2w1q', confirmPW: '1q2w3e4r' });
    expect(error).toBe('비밀번호가 서로 다릅니다');
  });
});

describe('Validator/postFormValidator', () => {
  it('모두 있을 경우', () => {
    const error = postFormValidator({
      title: 'title',
      content: 'content',
      maxPeople: 10,
      currentPeople: 5,
      postSkills: [],
    });
    expect(error).toBe('');
  });

  it('제목이 다섯글자 이하인 경우', () => {
    const error = postFormValidator({
      title: 'ti',
      content: 'content',
      maxPeople: 10,
      currentPeople: 5,
      postSkills: [],
    });
    expect(error).toBe('제목은 5글자 이상이여야합니다');
  });

  it('내용이 없을 경우', () => {
    const error = postFormValidator({
      title: 'title',
      content: '',
      maxPeople: 10,
      currentPeople: 5,
      postSkills: [],
    });
    expect(error).toBe('내용을 입력해주십시오');
  });

  it('현재인원수가 최대인원수보다 클 경우', () => {
    const error = postFormValidator({
      title: 'title',
      content: 'content',
      maxPeople: 10,
      currentPeople: 15,
      postSkills: [],
    });
    expect(error).toBe('현재인원은 최대인원보다 클 수 없습니다');
  });
});
