import { useEffect, useState } from "react";

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 887px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 887px)");

    const handleChange = (e) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isDesktop;
};
