import { useEffect, useState,useRef } from 'react';
import { Keyboard } from 'react-native';

const useKeyboard =()=> {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const keyboardInfo = useRef(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (info) => {
                keyboardInfo.current = info;
                setKeyboardVisible(true); 
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                keyboardInfo.current = null;
                setKeyboardVisible(false); 
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    });

    return {
        isKeyboardVisible,
        setKeyboardVisible,
        keyboardInfo : keyboardInfo.current
    };
};

export default useKeyboard;