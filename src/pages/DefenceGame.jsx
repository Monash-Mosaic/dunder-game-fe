import Board from "../Components/GameDesign/Board_";
import IntroScreen from "../Components/GameDesign/IntroScreen";
import TutorialDialog from "../Components/GameDesign/Tutorial";
import { useState } from "react";
import "./DefenceGame.css"; // new styles for fitting game screen

function DefenceGame() {
    const [stage, setStage] = useState("intro"); // 'intro' | 'tutorial' | 'game'

    const handleIntroStart = () => {
        const seenTutorial = localStorage.getItem("seenTutorial");
        if (seenTutorial === "true") {
            setStage("game");
        } else {
            setStage("tutorial");
        }
    };

    const handleTutorialComplete = () => {
        localStorage.setItem("seenTutorial", "true");
        setStage("game");
    };

    return (
        <div className="game-wrapper">
            {stage === "intro" && <IntroScreen onStart={handleIntroStart} />}
            {stage === "tutorial" && (
                <TutorialDialog open={true} onClose={handleTutorialComplete} />
            )}
            {stage === "game" && (
                <div className="game-board">
                    <Board />
                </div>
            )}
        </div>
    );
}

export default DefenceGame;
