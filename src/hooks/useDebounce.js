import { useEffect, useState } from 'react';

export const useDebounce = (value, delay) => {

    // 글자를 한번에 읽지않고 시간텀을두고 읽는 hook
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debounceValue;
};
