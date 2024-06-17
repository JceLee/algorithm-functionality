// TODO 이메일을 입력받아, 해당 이메일이 올바른 이메일 형식인지 확인합니다. 올바르다면 true 올바르지 않다면 false 를 리턴해주세요.
export const validateEmail = (email) => {
    const hasWhitespace = /\s/.test(email);

    const isValidEmail =
        /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi.test(email);

    if (hasWhitespace || !isValidEmail) return false;

    return true;
};
