export const isFalsy = (value) => value === 0 ? false : !value;

// 在一個函數裡，改變傳入的物件(對象)本身是不好的
export const cleanObject = (object: object) => {
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