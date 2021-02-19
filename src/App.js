import React, {useEffect, useState} from "react";
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import './App.css';

function App() {

    const [time, setTime] = useState(0);
    const [watchOn, setWatchOn] = useState(false);
    const [btnText, setBtnText] = useState('Start');

    useEffect(() => {
        !watchOn ? setBtnText('Start') : setBtnText('Stop');

        const unsubscribe$ = new Subject();
        interval(1000)
            .pipe(takeUntil(unsubscribe$))
            .subscribe(() => {
                if (watchOn) {
                    setTime(val => val + 1);
                }
            });
        return () => {
            unsubscribe$.next();
            unsubscribe$.complete();
        };

    }, [watchOn]);

    const handleStart = () => {
        setWatchOn(prevState => !prevState);
        if (btnText === 'Stop') {
            setTime(0);
        }
    }
    const handleWait = () => {
        if (time !== 0) {
            setWatchOn(false)
        }
    }
    const handleReset = () => {
        setTime(0);
        setWatchOn(true);
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>My first StopWatch</h1>
                <div className='stopwatch-container'>
                    <span>{('0' + Math.floor((time / 3600) % 100)).slice(-2)}:</span>
                    <span>{('0' + Math.floor((time / 60) % 60)).slice(-2)}:</span>
                    <span>{('0' + Math.floor(time % 60)).slice(-2)}</span>
                </div>
                <div className='btn-container'>
                    <div>
                        <button onClick={handleStart} className='btn border-green'>
                            {btnText}
                        </button>
                    </div>
                    <div>
                        <button onClick={handleWait} className='btn border-blue'>Wait</button>
                        <button onClick={handleReset} className='btn border-red'>Reset</button>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
