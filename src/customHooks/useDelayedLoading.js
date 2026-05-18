import { useEffect, useState } from "react";

export const useDelayedLoading = (isLoading, delay = 3000) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer;

    if (isLoading) {
      timer = setTimeout(() => {
        setShow(true);
      }, delay);
    } else {
      setShow(false);
    }

    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return show;
};
