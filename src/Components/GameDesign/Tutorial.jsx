import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    MobileStepper,
    Box,
    Typography
} from '@mui/material';

const tutorialImages = [
    '/images/assets/step1.png',
    '/images/assets/step2.png',
    '/images/assets/step3.png',
    '/images/assets/step4.png',
    '/images/assets/step5.png',
    '/images/assets/step6.png'
];

export default function TutorialDialog({ open, onClose }) {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = tutorialImages.length;

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleSkip = () => {
        localStorage.setItem('seenTutorial', 'true');
        onClose();
    };

    const handleFinish = () => {
        localStorage.setItem('seenTutorial', 'true');
        onClose();
    };

    return (
        <Dialog open={open} fullWidth maxWidth="lg">
            <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <img
                        src={tutorialImages[activeStep]}
                        alt={`Tutorial step ${activeStep + 1}`}
                        style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
                    />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Step {activeStep + 1} of {maxSteps}
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-between' }}>
                <Button onClick={handleSkip}>Skip</Button>
                <MobileStepper
                    variant="dots"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        activeStep === maxSteps - 1 ? (
                            <Button onClick={handleFinish}>Start Game</Button>
                        ) : (
                            <Button onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Next
                            </Button>
                        )
                    }
                    backButton={
                        <Button onClick={handleBack} disabled={activeStep === 0}>
                            Back
                        </Button>
                    }
                />
            </DialogActions>
        </Dialog>
    );
}
