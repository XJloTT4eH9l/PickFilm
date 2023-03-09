import { useState, useEffect } from 'react';

const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebauncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebauncedValue(value);
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue;
}

export { useDebounce }