import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { GoCheck } from "react-icons/go";
import { TbMailFilled } from "react-icons/tb";
import { validateEmail } from "../../lib/utils/validateEmail.js";

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  required,
  className,
  innerClassName,
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className={clsx(className, innerClassName)}
  />
);

const CORRECT_CODE = "123456";

const CodeVerification = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
  const [isWrongCode, setIsWrongCode] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // TODO 문제2: 아래 세가지 함수를 완성시켜서 Step2 기능을 완성시킵시다. 각각 함수의 매개변수로 어떤 값이 들어오는지는 console 로 확인해봅시다.
  const handleDigitInputClick = (index) => {
    // 각 입력 필드를 클릭할 때 호출됩니다.
    // 첫 입력 필드를 비워 두었을 때 첫 필드를 포커스 하거나
    // 이미 입력된 값이 있을 때 비어있는 필드 중 첫번째 필드로 포커스 합니다.
    // console.log("handleDigitInputClick => ", index);
  };

  const handleInputChange = (index, value) => {
    // 입력 필드의 값이 변경될 때 호출됩니다.
    // 입력이 이뤄질 때마다 한칸 씩 다음 단계로 이동합니다.
    // 마지막 필드에 입력이 되면 코드가 일치하는지 비교를 합시다. 잘못된 코드가 입력되면 isWrongCode를 true로 설정합니다.
  };

  const handleKeyDown = (event, index) => {
    // 입력이 일어 날 때 호출이 됩니다.
    // 백스페이스 키를 누를 때 지워지도록 합시다.
    // 이전 필드로 포커스를 이동시킵니다.
  };

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen p-4">
      {step === 1 && (
        <>
          <div className="flex flex-col items-center mb-6">
            <div className="my-10 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <TbMailFilled size="2.8rem" />
            </div>
            <div className="mb-2 text-xl font-bold">Verify your email.</div>
            <div className="text-base font-normal">
              Please enter your email.
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 max-w-xs w-full">
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="sparta@coding.club"
              required
              className="w-full p-2 border rounded"
              innerClassName="font-sans text-base"
            />
            {isValidEmail ? null : (
              <span className="text-sm font-normal text-[#ff0030]">
                Invalid email format.
              </span>
            )}
            <button
              className="w-full rounded bg-blue-500 text-white px-4 py-2 font-bold mt-2"
              // TODO 문제1: 입력된 이메일이 올바른 이메일인지 체크해주는 로직입니다. 만약 올바르지 않다면, setIsValidEmail 를 false 로 변경합니다. 올바르다면 true 변경합니다. lib/validateEmail 에 있는 로직을 완성해주세요.
              onClick={() => {
                if (!validateEmail(email)) return setIsValidEmail(false);
                setIsValidEmail(true);
                setStep(2);
              }}
            >
              Verify
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="flex flex-col items-center mb-6">
            <div className="my-10 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <TbMailFilled size="2.8rem" />
            </div>
            <div className="mb-2 text-xl font-bold">Email sent!</div>
            <div className="text-center text-base font-normal text-gray-700">
              We’ve sent an email to {email}.
            </div>
            <div className="text-center text-base font-normal text-gray-700">
              Please check your inbox and enter the 6-digit code.
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex items-center justify-center gap-2 mb-4">
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  key={index}
                  ref={(ref) => {
                    if (ref) {
                      inputRefs.current[index] = ref;
                    }
                  }}
                  type="tel"
                  maxLength={1}
                  value={inputValues[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onClick={() => handleDigitInputClick(index)}
                  className={clsx("h-10 w-10 border rounded text-center", {
                    "bg-gray-100": inputValues[index] !== "",
                  })}
                />
              ))}
            </div>
            <span className="text-sm font-normal text-[#ff0030]">
              {isWrongCode && <>Wrong code. Try again.</>}
            </span>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div className="flex flex-col items-center mb-6">
            <div className="my-10 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
              <GoCheck size="2.8rem" />
            </div>
            <div className="mb-2 text-xl font-bold">Great!</div>
            <div className="text-center text-base font-normal text-gray-700">
              Your email is verified.
            </div>
            <button
              className="w-full rounded bg-blue-500 text-white px-4 py-2 font-bold mt-2"
              onClick={() => {
                setStep(1);
              }}
            >
              Go Back
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default CodeVerification;
