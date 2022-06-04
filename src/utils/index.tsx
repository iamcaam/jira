import { useEffect, useState } from "react";

export const isFalsy = (value) => value === 0 ? false : !value;

// 在一個函數裡，改變傳入的物件(對象)本身是不好的
export const cleanObject = (object: any) => {
    const result = { ...object }; // 等同於 Object.assign({}, object)

    Object.keys(result).forEach(key => {
        // 要排除0的狀況
        const value = result[key];
        //檢查value
        if(isFalsy(value))
            delete result[key];
    });

    return result;
}

// 自訂義Hook
export const useMount = (callback) => {
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

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 每次在value變化以後，設置一個定時器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 每次在上一個useEffect處理完以後再運行
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}