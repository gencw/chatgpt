import { useState } from "react";

const useTextInput = (
  initialValue = "",
  onChangeCallback: (text: string) => void = () => {}
) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (text: string) => {
    setValue(text);
    if (onChangeCallback) {
      onChangeCallback(text); // 调用传入的回调函数
    }
  };

  return {
    value,
    onChange: handleChange,
    reset: () => setValue(""), // 可选的重置函数
  };
};

export default useTextInput;
