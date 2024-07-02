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

    // 비어있는 필드 중 첫번째 필드의 index를 찾는다.
    const emptyIndex = inputValues.indexOf(
      inputValues.find((value) => {
        return value === "";
      })
    );
    if (emptyIndex > -1) {
      // 만약 비어있는 필드가 있다면 (-1 이상을 반환한다면) 해당 필드로 포커스를 이동한다.
      inputRefs.current[emptyIndex].focus();
    } else {
      // 비어있는 필드가 없다면 (-1을 반환한다면) 마지막 필드로 포커스를 이동한다.
      inputRefs.current[inputValues.length - 1].focus();
    }
  };

  const handleInputChange = (index, value) => {
    // 입력 필드의 값이 변경될 때 호출됩니다.
    // 입력이 이뤄질 때마다 한칸 씩 다음 단계로 이동합니다.
    // 마지막 필드에 입력이 되면 코드가 일치하는지 비교를 합시다. 잘못된 코드가 입력되면 isWrongCode를 true로 설정합니다.

    // inputValues를 새로 map을 통해 배열을 넣어준다. 이 때 현재 위치한 인덱스의 값을 입력한 값으로 바꿔준다.
    setInputValues(
      inputValues.map((cur, idx) => {
        return index === idx ? value : cur;
      })
    );
    if (index !== inputValues.length - 1) {
      // 만약 입력한 필드의 다음 필드가 남아있다면, 포커스를 다음 필드로 이동한다.
      inputRefs.current[index + 1].focus();
    } else {
      // 입력한 필드가 마지막 필드일 경우, 코드가 일치하는지 비교한다.
      // 이 때 바로 inputValues가 마지막 입력값까지 가져오지 못했기에 inputValues에 입력값을 더해서 비교한다.
      if (inputValues.join("") + value !== CORRECT_CODE) {
        // 잘못된 코드가 입력되면 isWrongCode를 true로 설정한다.
        setIsWrongCode(true);
      } else {
        // 제대로 코드가 입력되었다면 isWrongCode를 false로 설정한다.
        setIsWrongCode(false);
      }
    }
  };

  const handleKeyDown = (event, index) => {
    // 입력이 일어 날 때 호출이 됩니다.
    // 백스페이스 키를 누를 때 지워지도록 합시다.
    // 이전 필드로 포커스를 이동시킵니다.

    // 백스페이스 키를 눌렀을 경우,
    if (event.keyCode === 8) {
      if (inputValues[index] === "" && index > 0) {
        // 현재 인덱스가 0이 아니고, 현재 필드의 값이 비었을 경우 (마지막 필드까지 전부 입력되지 않았을 경우) 이전 필드의 값을 삭제한다.
        setInputValues(
          inputValues.map((cur, idx) => {
            return index - 1 === idx ? (cur = "") : cur;
          })
        );
        // 포커스를 이전 필드로 이동한다.
        inputRefs.current[index - 1].focus();
      } else {
        // 현재 필드의 값이 비어있지 않을 경우 (마지막 필드까지 입력이 완료되었을 경우) 현재 필드의 값을 삭제한다.
        setInputValues(
          inputValues.map((cur, idx) => {
            return index === idx ? (cur = "") : cur;
          })
        );
      }
    }
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
