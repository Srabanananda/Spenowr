export const getTypeList = typeArr => {
    return typeArr.map((each) => {
        const { item: { label, value } } = each;
        return { name: value, value: label };
    }) ?? [];
};

export const getSubTypeList = subTypeArr => {
    return subTypeArr.map((each) => {
        const { subItem: { label, value } } = each;
        return { name: value, value: label };
    }) ?? [];
};