import { useEffect, useState } from "react";
import ToggleSounds from "./ToggleSounds";


export function CounterTimer({ allowSound, setAllowSound, children }) {
    const [time, setTime] = useState(formatTime(new Date()));

    useEffect(function () {
        const id = setInterval(function () {
            setTime(formatTime(new Date()));
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return (
        <>
            <h1>Workout timer</h1>
            <time>For your workout on {time}</time>
            <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
            {children}
        </>
    )
}


export function formatTime(date) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(date);
}