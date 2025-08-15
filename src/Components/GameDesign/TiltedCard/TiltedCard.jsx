import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./TiltedCard.css";

const springValues = {
    damping: 30,
    stiffness: 100,
    mass: 2,
};

const borderColors = {
    claim: "#e53935",     // red
    counter: "#1e88e5",   // blue
};

export default function TiltedCard({
    imageSrc,
    type,
    altText = "Tilted card image",
    captionText = "",
    containerHeight = "50px",
    containerWidth = "50%",
    imageHeight = "10px",
    imageWidth = "10px",
    scaleOnHover = 1.05,
    rotateAmplitude = 12,
    showMobileWarning = false,
}) {
    const borderColor = borderColors[type] || "#9e9e9e";
    const ref = useRef(null);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);

    function handleMouse(e) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);
    }

    return (
        <figure
            ref={ref}
            className="tilted-card-figure"
            style={{
                height: containerHeight,
                width: containerWidth,
                margin: 0,
            }}
            onMouseMove={handleMouse}
            onMouseEnter={() => scale.set(scaleOnHover)}
            onMouseLeave={() => {
                rotateX.set(0);
                rotateY.set(0);
                scale.set(1);
            }}
        >
            {/* Image with tilt effect */}
            <motion.div
                className="tilted-card-inner"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    rotateX,
                    rotateY,
                    scale,
                    overflow: "visible",
                    border: `0px solid ${borderColor}`,
                }}
            >
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="tilted-card-img"
                    style={{
                        width: imageWidth,
                        height: imageHeight,
                        // objectFit: "cover",
                        display: "block",
                    }}
                />
            </motion.div>

            {/* Caption directly below the image */}
            {/* <div
                className="tilted-card-caption"
                style={{
                    width: imageWidth,
                    padding: "6px 8px",
                    fontSize: "0.9rem",
                    color: "#2d2d2d",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    borderTop: "none",
                }}
            >
                {captionText}
            </div> */}
        </figure>
    );
}
