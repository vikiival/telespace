import { Button } from "@telegram-apps/telegram-ui"
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import "./styles.css"

// Define props for RepeatButton
interface RepeatButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  // text: string;
}

function RepeatButton({ onClick, loading }: RepeatButtonProps) {
  return (
    <Button
      loading={loading}
      mode="filled"
      size="m"
      stretched={true}
      aria-label="Play again."
      id="repeatButton"
      onClick={onClick}
    >
      Spin the wheel
    </Button>
  );
}

function WinningSound() {
  return (
    <audio autoPlay className="player" preload="false">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  );
}

// Define props for Spinner
interface SpinnerProps {
  onFinish: (position: number) => void;
  index: number;
  timer: number;
}

// Spinner component with forwardRef to expose the reset method
const Spinner = React.forwardRef(
  (
    { onFinish, timer, index }: SpinnerProps,
    ref: React.Ref<{ reset: () => void }>,
  ) => {
    const [position, setPosition] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = useState<number>(timer);
    // Dole je divko co ma takyto isty rozmer
    const iconHeight = 96;
    const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
    const speed = iconHeight * multiplier;
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const emojis = [
      "📡",
      "🛰️",
      "🪐",
      "🌍",
      "🌚",
      "🌞",
      "☄️",
      "💫",
      "🚀",
    ];

    const emojiSlots = Array.from({ length: 100 }, (_, i) => {
      return emojis[i % emojis.length];
    });

    const setStartPosition = () =>
      ((Math.floor(Math.random() * 9)) * iconHeight) * -1;
    const startPosition = useRef<number>(setStartPosition());

    const reset = useCallback(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      startPosition.current = setStartPosition();
      setPosition(startPosition.current);
      setTimeRemaining(timer);

      intervalRef.current = setInterval(tick, 100);
    }, [timer]);

    const moveBackground = () => {
      setPosition((prevPosition) => prevPosition - speed);
      setTimeRemaining((prevTime) => prevTime - 100);
    };

    const getSymbolFromPosition = () => {
      const totalSymbols = emojiSlots.length;
      const maxPosition = iconHeight * (totalSymbols - 1) * -1;
      let currentPosition = startPosition.current;

      for (let i = 0; i < (timer / 100) * multiplier; i++) {
        currentPosition -= iconHeight;
        if (currentPosition < maxPosition) currentPosition = 0;
      }

      // console.log(index, emojiSlots.at((position / -96) + 1));

      onFinish(currentPosition);
    };

    const tick = () => {
      if (timeRemaining <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        getSymbolFromPosition();
      } else {
        moveBackground();
      }
    };

    useEffect(() => {
      intervalRef.current = setInterval(tick, 100);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [tick]);

    useEffect(() => {
      if (ref) {
        (ref as MutableRefObject<{ reset: () => void }>).current = { reset };
      }
    }, [reset, ref]);

    // return (
    //   <div
    //     style={{ backgroundPosition: `50% ${position}px` }}
    //     className="icons"
    //   />
    // );

    return (
      <div
        className="transition-transform"
        style={{
          transform: `translateY(${position}px)`,
          height: `${iconHeight * 3}px`,
        }}
      >
        {emojiSlots.map((e, index) => (
          <div key={index} className="size-24 flex items-center justify-center">
            <span className="text-7xl">{e}</span>
          </div>
        ))}
      </div>
    );
  },
);

interface SlotMachineProps {
  onSuccess: (value: number) => void;
  // text: string;
}
// Define the main App component
export default function SlotMachine() {
  const [winner, setWinner] = useState<boolean | null>(null);
  const matches = useRef<number[]>([]);
  const childRefs = [
    useRef<{ reset: () => void }>(null),
    useRef<{ reset: () => void }>(null),
    useRef<{ reset: () => void }>(null),
  ];

  const handleClick = () => {
    setWinner(null);
    matches.current = [];
    childRefs.forEach((ref) => ref.current?.reset());
  };

  const finishHandler = (value: number) => {
    matches.current.push(value);
    if (matches.current.length === 3) {
      const isWinner = matches.current.every((match) =>
        match === matches.current[0]
      );
      setWinner(isWinner);

      if (isWinner) {
        // onSuccess(matches.current[0]);
      }
    }
  };

  return (
    <div>
      {winner && <WinningSound />}
      {/* {winner && <Confetti /> } */}

      <div className="spinner-parent">
        <div
          style={{
            position: "relative",
          }}
        >
          <div className="spinner-container">
            {childRefs.map((ref, index) => (
              <Spinner
                index={index}
                key={index}
                onFinish={finishHandler}
                timer={1000 + index * 400}
                ref={ref}
              />
            ))}
            {/* <div className="gradient-fade"></div> */}
          </div>
          <div
            style={{
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <div
              style={{
                width: `${96 * 3}px`,
                height: "33%",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            >
            </div>
          </div>
        </div>
      </div>

      <RepeatButton onClick={handleClick} loading={winner === null} />
    </div>
  );
}