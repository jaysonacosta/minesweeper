import { useRef, useState } from 'react';

const useGameTimer = (): [number, () => void, () => void] => {
	const [startTime, setStartTime] = useState<number>();
	const [now, setNow] = useState<number>();
	const intervalRef = useRef<NodeJS.Timer>();

	const handleStart = () => {
		setStartTime(Date.now());
		setNow(Date.now());
		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setNow(Date.now());
		}, 1000);
	};

	const handleStop = () => {
		clearInterval(intervalRef.current);
	};

	let secondsPassed = 0;
	if (startTime !== undefined && now !== undefined) {
		secondsPassed = Math.floor((now - startTime) / 1000);
	}

	return [secondsPassed, handleStart, handleStop];
};

export default useGameTimer;
