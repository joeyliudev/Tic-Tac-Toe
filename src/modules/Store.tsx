import { useCallback, useEffect, useState } from "react";

/**
 * acted like the useState. but use localstorage instead of memory
 * @param key storageKey
 * @param initialValue value to store
 * @returns
 */
export default function useLocalStorage(key: string, initialValue: object) {
  const [internalValue, setInternalValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
    }
  });

  const setValue = useCallback(
    (value: object) => {
      try {
        const valueToStore =
          value instanceof Function ? value(internalValue) : value;
        setInternalValue(valueToStore ?? initialValue);
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    },
    [key, setInternalValue, internalValue, initialValue]
  );

  // Any time storage changes in another tab, update state
  useEffect(() => {
    function handleStorageChange() {
      try {
        const latestValue = localStorage.getItem(key);
        if (latestValue) {
          setValue(JSON.parse(latestValue));
        }
      } catch (err) {
        console.error(err);
      }
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return [internalValue, setValue];
}
