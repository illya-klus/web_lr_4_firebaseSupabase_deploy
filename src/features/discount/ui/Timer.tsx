import { useEffect, useState } from "react"



const Timer = ( {startSeconds} : {startSeconds : number} ) => {
    const [seconds, setSeconds] = useState(startSeconds);

    useEffect(() => {
        if(seconds <= 0) return;
        const interval = setInterval( () => {
            setSeconds(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    const formatTime = (seconds : number) => {
        const minutes = Math.floor(seconds / 60);

        const hours = Math.floor(minutes / 60);
        const restMinutes = minutes % 60;
        const restSeconds = seconds % 60;

        let resHours = hours < 10 ? "0" + hours : "" + hours;
        let resMinutes = restMinutes < 10 ? ":0" + restMinutes : ":" + restMinutes;
        let resSeconds = restSeconds < 10 ? ":0" + restSeconds : ":" + restSeconds;

        return resHours + resMinutes + resSeconds;
    }

    return(
        <div className="text-2xl sm:text-3xl font-black text-cyan-800 tracking-wider">
            {formatTime(seconds)}
        </div>
    )
}

export default Timer;