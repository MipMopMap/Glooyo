import { useState, useEffect, useRef } from "react";

function useScroll() {
  const [scroll, setScroll] = useState(false);
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (scrollableDivRef.current) {
      if (scrollableDivRef.current.scrollTop > 0) {
        setScroll(true);
        console.log("scrolling");
      } else if (scrollableDivRef.current.scrollTop === 0) {
        setScroll(false);
        console.log("not scrolling");
      }
    }
  };

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv) {
      scrollableDiv.addEventListener("scroll", handleScroll);
      return () => {
        scrollableDiv.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return { scroll, scrollableDivRef };
}

export default useScroll;
