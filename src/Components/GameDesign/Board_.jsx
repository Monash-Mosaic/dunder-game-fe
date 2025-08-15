import { CLAIM_CARDS, COUNTER_CARDS } from "./Cards";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import wood_bg from "./assets/wood_overlay.jpg";
import stone_border from "./assets/stone_border.jpg";
import { motion } from "framer-motion";


const GameBoard = () => {
    const [round, setRound] = useState(1);
    const [playerHealth, setPlayerHealth] = useState(3);
    const [isGameOver, setIsGameOver] = useState(false);

    const [playerHand, setPlayerHand] = useState([]);
    const [currentClaims, setCurrentClaims] = useState([]);
    const [currentClaimIndex, setCurrentClaimIndex] = useState(0);
    const [selectedCounter, setSelectedCounter] = useState(null);
    const [playedCardIds, setPlayedCardIds] = useState([]);
    const [discardPile, setDiscardPile] = useState([]);
    const [showRoundIntro, setShowRoundIntro] = useState(false);
    const [currentRound, setCurrentRound] = useState(1);

    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // const [gamebg, setGamebg] = useState("");


    useEffect(() => {
        startRound(round);
        // setGamebg(`/images/assets/board_layout_${round}.png`)
    }, [round]);

    const claims_round = CLAIM_CARDS.filter((c) => c.round === round);
    // console.log(claims_round);
    const counterIdsThisRound = claims_round.map(c => c.counterId);
    const filteredCounterCards = COUNTER_CARDS.filter(card => counterIdsThisRound.includes(card.id));


    const startRound = (roundNumber) => {
        setShowRoundIntro(true);
        setCurrentRound(roundNumber);

        setTimeout(() => {
            const claimsForRound = CLAIM_CARDS.filter((c) => c.round === roundNumber);
            const shuffled = [...claimsForRound].sort(() => Math.random() - 0.5);
            setCurrentClaims(shuffled.slice(0, 2));
            setDiscardPile([]);
            // setPlayerHand(COUNTER_CARDS);
            setPlayerHand(filteredCounterCards);
            setCurrentClaimIndex(0);
            setSelectedCounter(null);
            setPlayedCardIds([]);
            setShowRoundIntro(false);
        }, 1500);
    };

    const handleCounterClick = (card) => {
        if (playedCardIds.includes(card.id)) return;
        setSelectedCounter(card);
    };

    const handlePlayCounter = () => {
        if (!selectedCounter || playedCardIds.includes(selectedCounter.id)) return;

        const currentClaim = currentClaims[currentClaimIndex];
        const isCorrect = selectedCounter.id === currentClaim.counterId;

        if (isCorrect && !isGameOver) {
            setFeedbackMessage(currentClaim.right);
        } else {
            setFeedbackMessage(currentClaim.wrong);
            setPlayerHealth((hp) => {
                const newHp = hp - 1;
                if (newHp <= 0) {
                    setFeedbackMessage(currentClaim.wrong);
                    setTimeout(() => {
                        setIsGameOver(true);
                    }, 1500);
                    // setIsGameOver(true);
                }
                return newHp;
            });
        }

        setFeedbackOpen(true); // open feedback dialog

        setDiscardPile((prev) => [...prev, selectedCounter]);
        setPlayerHand(prev => prev.filter(card => card.id !== selectedCounter.id));
    };

    const handleCloseFeedback = () => {
        setFeedbackOpen(false);

        if (currentClaimIndex < 1) {
            setCurrentClaimIndex((index) => index + 1);
            setSelectedCounter(null);
        } else {
            if (round === 5 || playerHealth <= 0) {
                setIsGameOver(true);
            } else {
                setRound((r) => r + 1);
            }
        }
    };

    const handleRestart = () => {
        setRound(1);
        setPlayerHealth(3);
        setIsGameOver(false);
        setDiscardPile([]);
        startRound(1);
    };

    const currentClaim = currentClaims[currentClaimIndex];


    const RoundIntroScreen = ({ round }) => (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                backgroundImage: "url(/images/assets/loading_scr.jpg)",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
                px: 4,
            }}
        >
            <Typography
                variant="h2"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    color: 'white',
                    textShadow: '2px 2px 6px black',
                    fontSize: '3rem'
                }}
            >
                Round {round}
            </Typography>

            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    color: 'white',
                    textShadow: '1px 1px 5px black',
                    fontSize: '2rem'
                }}
            >
                Get Ready to Rumble!
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    color: 'white',
                    maxWidth: '500px',
                    textShadow: '1px 1px 4px black',
                    fontSize: '1.25rem'
                }}
            >
                Tip: Always read the claim carefully, AND WIN
            </Typography>

        </Box>
    );


    if (isGameOver) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    backgroundImage: `url(${wood_bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "40px solid",
                    borderImage: `url(${stone_border}) 40 round`,
                }}
            >
                <Box textAlign="center" p={4} bgcolor="rgba(0,0,0,0.6)" borderRadius={2}>
                    <Typography variant="h4" gutterBottom color="white">
                        {playerHealth <= 0 ? "Echo Wins!" : "You Win!"}
                    </Typography>
                    <Button variant="contained" onClick={handleRestart}>
                        Restart Game
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <>
            {showRoundIntro ? (
                <RoundIntroScreen round={currentRound} />
            ) : (
                <Box
                    sx={{
                        width: "90vw",
                        margin: "auto",
                        overflowY: "auto",
                        position: "relative",
                        backgroundColor: "#000",
                        border: "2px solid #444",
                        borderRadius: 4,
                        boxShadow: 3,
                    }}
                >
                    <Box
                        sx={{
                            minHeight: "100vh",
                            border: "40px solid",
                            borderImage: `url(${stone_border}) 40 round`,
                            boxSizing: "border-box",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundImage: `url(${wood_bg})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            position: "relative",
                        }}
                    >
                        {/* Echo's cards */}
                        <Box display="flex" justifyContent="center" gap={2} mt={4}>
                            {claims_round.map(card => (
                                // card.title = "",
                                <GameCard card={card} isDisabled={true} />
                            ))}
                        </Box>

                        {/* Game board */}
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: 1200,
                                height: 800,
                                p: 4,
                                pt: 2,
                                backgroundImage: `url(/images/assets/board_layout_${currentRound}.png)`,
                                // backgroundImage: {gamebg},
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundBlendMode: "lighten",
                                borderRadius: 3,
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                                overflow: "hidden",
                            }}
                        >
                            {!isGameOver && currentClaim && (
                                <Dialog
                                    open={feedbackOpen}
                                    onClose={handleCloseFeedback}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: 3,
                                            p: 2,
                                            boxShadow:
                                                selectedCounter?.id === currentClaim.counterId
                                                    ? '0 0 25px 6px rgba(0, 255, 0, 0.6)' // green glow
                                                    : '0 0 25px 6px rgba(255, 0, 0, 0.6)', // red glow
                                            backgroundColor: "#ffffff",
                                        }
                                    }}
                                >
                                    <DialogTitle>
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {selectedCounter?.id === currentClaim.counterId ? "Lets Gooo!" : "Oh Nooo!"}
                                        </motion.div>
                                    </DialogTitle>

                                    <DialogContent>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Typography variant="body1">{feedbackMessage}</Typography>
                                        </motion.div>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={handleCloseFeedback} color="primary" autoFocus>
                                            Continue
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            )}

                            {/* Round Number Badge
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 16,
                                    left: 16,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    width: 150,
                                    height: 150,
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/images/assets/round_layout.png"
                                    alt="Round"
                                    sx={{ width: 150, height: 150, position: "relative" }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        color: "black",
                                        fontWeight: "bold",
                                        textShadow: "1px 1px 3px black",
                                    }}
                                >
                                    {round}
                                </Typography>
                            </Box> */}

                            {/* Health UI */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 24,
                                    right: 24,
                                    zIndex: 1000,
                                    display: "flex",
                                    gap: 1,
                                }}
                            >
                                {Array.from({ length: playerHealth }).map((_, idx) => (
                                    <Box
                                        key={idx}
                                        component="img"
                                        src="/images/assets/health.png"
                                        alt="Health"
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            animation: "pulse 1.5s infinite",
                                            "@keyframes pulse": {
                                                "0%": { transform: "scale(1)" },
                                                "50%": { transform: "scale(1.1)" },
                                                "100%": { transform: "scale(1)" },
                                            },
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* Center Cards */}
                            {currentClaim && (
                                <Box display="flex" justifyContent="center">
                                    <GameCard
                                        card={currentClaim}
                                        isCenter
                                        playedBy="echo"
                                        style={{ zIndex: 2 }}
                                    />
                                </Box>
                            )}

                            {selectedCounter && (
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    flexDirection="column"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handlePlayCounter}
                                    >
                                        Play Counter
                                    </Button>
                                    <GameCard
                                        card={selectedCounter}
                                        isCenter
                                        playedBy="player"
                                        style={{ zIndex: 1 }}
                                    />
                                </Box>
                            )}
                        </Box>

                        {/* Player Hand */}
                        <Box
                            display="flex"
                            justifyContent="center"
                            flexWrap="wrap"
                            gap={2}
                            mb={4}
                        >
                            {playerHand.map(card => (
                                <GameCard
                                    key={card.id}
                                    card={card}
                                    onClick={() => handleCounterClick(card)}
                                    isSelected={selectedCounter?.id === card.id}
                                    playedBy="player"
                                />
                            ))}
                        </Box>

                        {/* Discard Pile */}
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 16,
                                right: 16,
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: 1,
                                zIndex: 10,
                            }}
                        >
                            {discardPile.map((card, index) => (
                                <GameCard
                                    // key={index}
                                    card={card}
                                    playedBy="discard"
                                    compact
                                    isDisabled
                                />
                            ))}
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default GameBoard;
