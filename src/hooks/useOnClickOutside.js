import { useEffect } from 'react';

const useOnClickOutside = (ref, handler) => {
    // 모달 외부클릭시에 모달이 꺼지는 hook
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
        };
    }, []);
};

export default useOnClickOutside;
