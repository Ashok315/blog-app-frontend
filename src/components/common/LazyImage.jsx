import { useEffect, useRef, useState } from "react";

export const LazyImage=({
        src="",
        alt="",
        className="",
        ...props
    })=>{

    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the image is about to enter the viewport, set it to load
                setIsLoaded(true);
                observer.unobserve(entry.target); // Stop observing once loaded
            }
            });
        },
        {
            rootMargin: '100px', // Load images a bit before they enter the viewport
            threshold: 0.1, // Trigger when 10% of the image is visible
        }
        );

        if (imageRef.current) {
        observer.observe(imageRef.current);
        }

        // Cleanup observer on component unmount
        return () => {
        if (imageRef.current) {
            observer.unobserve(imageRef.current);
        }
        };
    }, []);

    return(
        
           <img ref={imageRef} src={isLoaded?src:""} alt={alt} className={`${className} cursor-pointer`} loading="lazy" {...props} />

    )
}