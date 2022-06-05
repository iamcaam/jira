import { useEffect, useState } from "react";

export const isFalsy = (value: unknown): boolean => value === 0 ? false : !value;

// 在一個函數裡，改變傳入的物件(對象)本身是不好的
export const cleanObject = (object: object) => {
    const result = { ...object }; // 等同於 Object.assign({}, object)

    Object.keys(result).forEach((key: string) => {
        // @ts-ignore
        const value = result[key]; // 要排除0的狀況
        
        if(isFalsy(value)) //檢查value
            // @ts-ignore
            delete result[key];
    });

    return result;
}

// 自訂義Hook
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, []);
}

const debounce = (func, delay) => {
    let timeout;

    return (...param) => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(function () {
            func(...param);
        }, delay)
    }
}

// 後面用泛型規範類型
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 每次在value變化以後，設置一個定時器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 每次在上一個useEffect處理完以後再運行
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray);
    return {
      value,
      setValue,
      add: (item: T) => setValue([...value, item]),
      clear: () => setValue([]),
      removeIndex: (index: number) => {
        const copy = [...value];
        copy.splice(index, 1);
        setValue(copy);
      },
    };
  };