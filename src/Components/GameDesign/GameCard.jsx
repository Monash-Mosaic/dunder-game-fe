// GameCard.jsx (updated responsive scaling)
import TiltedCard from "./TiltedCard/TiltedCard";
import { useState, useEffect } from "react";
import flipsound from "./assets/sounds/card_flip.mp3";
import { motion, AnimatePresence } from "framer-motion";

const GameCard = ({
  card,
  onClick,
  isDisabled,
  isSelected,
  isCenter,
  playedBy,
  compact = false,
}) => {
  const playClickSound = () => {
    try {
      const audio = new Audio(flipsound);
      audio.play();
    } catch (e) {}
  };

  const handleClick = () => {
    if (!isDisabled && onClick) {
      playClickSound();
      onClick();
    }
  };

  // Updated responsive sizes using clamp for proper viewport fit
  const cardWidth = compact
    ? "clamp(50px, 8vw, 90px)"
    : isCenter
    ? "clamp(120px, 25vw, 220px)"
    : "clamp(100px, 18vw, 180px)";

  const cardHeight = compact
    ? "clamp(70px, 10vh, 120px)"
    : isCenter
    ? "clamp(160px, 35vh, 320px)"
    : "clamp(140px, 28vh, 260px)";

  const [cardPath, setcardPath] = useState("/images/assets/card_back.jpg");

  const flyInFrom =
    playedBy === "player"
      ? { x: -300, y: 300 }
      : playedBy === "echo"
      ? { x: 300, y: -300 }
      : { x: 0, y: 0 };

  useEffect(() => {
    if (playedBy === "echo") {
      setcardPath(`/images/Claimcards/${card.id}.png`);
    } else if (playedBy === "player") {
      setcardPath(`/images/Countercards/${card.id}.png`);
    } else {
      setcardPath("/images/assets/card_back.jpg");
    }
  }, [playedBy, card?.id]);

  return (
    <AnimatePresence>
      <motion.div
        onClick={handleClick}
        initial={{ ...flyInFrom, opacity: 0 }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1,
          scale: isSelected ? 1.05 : 1,
        }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.45, type: "spring" }}
        style={{
          margin: "6px",
          padding: "2px",
          cursor: isDisabled ? "not-allowed" : "pointer",
          opacity: isDisabled ? 0.6 : 1,
          width: cardWidth,
          height: cardHeight,
          boxSizing: "border-box",
        }}
      >
        <TiltedCard
          imageSrc={cardPath}
          type={card?.type}
          containerHeight={cardHeight}
          containerWidth={cardWidth}
          imageHeight="100%"
          imageWidth="100%"
          scaleOnHover={1.05}
          rotateAmplitude={10}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default GameCard;
