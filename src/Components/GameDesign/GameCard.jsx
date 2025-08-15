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
        const audio = new Audio(flipsound);
        audio.play();
    };

    const handleClick = () => {
        if (!isDisabled && onClick) {
            playClickSound();
            onClick();
        }
    };

    const cardWidth = compact ? "80px" : isCenter ? "280px" : "240px";
    const cardHeight = compact ? "120px" : isCenter ? "360px" : "300px";

    const [cardPath, setcardPath] = useState("");

    const flyInFrom =
        playedBy === "player"
            ? { x: -300, y: 300 }
            : playedBy === "echo"
                ? { x: 300, y: -300 }
                : { x: 0, y: 0 };

    useEffect(() => {
        setcardPath("/images/assets/card_back.jpg");
        if (playedBy === "echo") {
            setcardPath(`/images/Claimcards/${card.id}.png`);
        } else if (playedBy === "player") {
            setcardPath(`/images/Countercards/${card.id}.png`);
        }
        console.log(cardPath)
    }, [playedBy, card]);


    return (
        <AnimatePresence>
            <motion.div
                onClick={handleClick}
                initial={{ ...flyInFrom, opacity: 0 }}
                animate={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: isSelected ? 1.1 : 1,
                }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.5, type: "spring" }}
                style={{
                    margin: "8px",
                    padding: "4px",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.5 : 1,
                    width: cardWidth,
                    height: cardHeight,
                }}
            >
                <TiltedCard
                    imageSrc={cardPath}
                    // imageSrc={`/images/assets/card_characters/${card.image}`}
                    type={card.type}
                    // altText={card.title}
                    // captionText={card.title}
                    containerHeight={cardHeight}
                    containerWidth={cardWidth}
                    imageHeight={cardHeight}
                    imageWidth={cardWidth}
                    scaleOnHover={1.05}
                    rotateAmplitude={10}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default GameCard;
