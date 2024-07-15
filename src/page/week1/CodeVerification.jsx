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

  const handleDigitInputClick = (index) => {
    inputRefs.current[index].focus();
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    } else if (index === 5) {
      const enteredCode = newInputValues.join("");
      if (enteredCode === CORRECT_CODE) {
        setStep(3);
      } else {
        setIsWrongCode(true);
        setTimeout(() => {
          setIsWrongCode(false);
          setInputValues(["", "", "", "", "", ""]);
          inputRefs.current[0].focus();
        }, 1000);
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !inputValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
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
