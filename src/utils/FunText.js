"use client";
import { useRef } from "react";
import gsap from "gsap";

export default function FunText({ 
    children, 
    className = "", 
    color = "text-black", 
    hoverColor = "#a855f7"
}) {
    if (typeof children !== "string") {
        return <span className={className}>{children}</span>;
    }

    const letters = children.split("");

    const rubberBand = (e) => {
        const target = e.target;

        gsap.killTweensOf(target);

        const tl = gsap.timeline();

        tl.to(target, {
            scaleX: 1.25,
            scaleY: 0.75,
            y: 5,
            color: hoverColor,
            duration: 0.1,
            ease: "power2.out"
        })
        .to(target, {
            scaleX: 0.75,
            scaleY: 1.25,
            y: -15, 
            rotation: Math.random() * 30 - 15,
            duration: 0.1,
            ease: "power2.out"
        })
        .to(target, {
            scaleX: 1.1,
            scaleY: 0.9,
            y: 0,
            rotation: 0,
            color: "inherit", 
            duration: 0.6,
            ease: "elastic.out(1.2, 0.4)" 
        });
    };

    return (
        <span className={`inline-block cursor-default ${className} ${color}`}>
            {letters.map((letter, i) => (
                <span 
                    key={i} 
                    onMouseEnter={rubberBand}
                    className="inline-block min-w-[0.3em] origin-bottom will-change-transform"
                >
                    {letter === " " ? "\u00A0" : letter}
                </span>
            ))}
        </span>
    );
}