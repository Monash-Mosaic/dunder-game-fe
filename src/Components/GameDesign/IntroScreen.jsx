import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import "@fontsource/jersey-25"; // Jersey 25 font
import Lightning from './Lightning/Lightning';


const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const IntroScreen = ({ onStart }) => {
    // useEffect(() => {
    //     document.body.style.overflow = "hidden";
    //     return () => {
    //         document.body.style.overflow = "auto";
    //     };
    // }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Lightning background effect */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <Lightning
                    hue={200}
                    xOffset={0}
                    speed={0.7}
                    intensity={1}
                    size={1}
                />
            </div>

            {/* Main content */}
            <Box
                sx={{
                    fontFamily: "'Jersey 25', monospace",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "white",
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 4,
                    textAlign: "center",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    zIndex: 1, // Bring above lightning
                    position: 'relative', // Needed for zIndex to apply
                }}
            >
                {/* Title */}
                <MotionTypography
                    variant="h2"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    sx={{
                        fontFamily: "'Jersey 25', monospace",
                        fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                        px: 3,
                        py: 1,
                        background: "rgba(0, 0, 0, 0.96)",
                        borderRadius: "10px",
                        textShadow: "0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff",
                        color: "#00ffff",
                        mb: 4,
                    }}
                >
                    CTRL ALT DEBUNK
                </MotionTypography>

                {/* Rules Box */}
                <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    sx={{
                        maxWidth: "600px",
                        fontSize: "1.7rem",
                        p: 2,
                        background: "rgba(255, 255, 255, 0.8)",
                        borderRadius: "10px",
                        lineHeight: "2.2rem",
                        textShadow: "0 0 5px rgba(255,255,255,0.5)",
                        color: "#000",
                        mb: 4,
                    }}
                >
                    <p>Echo’s talking nonsense. You’ve got the facts.</p>
                    <p>Echo plays first. Twice. Every round for 5 rounds.</p>
                    <p>Time to clap back with cold, hard facts.</p>
                    <p>
                        You get <strong>3 lives</strong>. That’s two mistakes more than the
                        internet allows.
                    </p>
                    <p>Ready to outsmart Echo and drop truth bombs?</p>
                    <p>Go and debunk some junk.</p>
                </MotionBox>

                {/* Start Button */}
                <MotionButton
                    onClick={onStart}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                        fontFamily: "'Jersey 25', monospace",
                        fontSize: "1.8rem",
                        px: 4,
                        py: 1.5,
                        backgroundColor: "#00ffff",
                        color: "#000",
                        borderRadius: "10px",
                        boxShadow: "0 0 15px #0ff, 0 0 30px #0ff",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#00e6e6",
                        },
                    }}
                >
                    Start Game
                </MotionButton>
            </Box>
        </div>
    );
};

export default IntroScreen;
