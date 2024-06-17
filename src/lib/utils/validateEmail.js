// TODO 이메일을 입력받아, 해당 이메일이 올바른 이메일 형식인지 확인합니다.
// 올바르다면 true 올바르지 않다면 false 를 리턴해주세요.

export const validateEmail = (email) => {
  const emailReg = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(.[0-9a-zA-Z_-]+){1,2}$/;

  if (!emailReg.test(email)) {
    return false;
  } else {
    return true;
  }
};
