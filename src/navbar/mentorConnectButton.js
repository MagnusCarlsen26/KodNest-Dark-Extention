export default function mentorConnectButton() {

    // Dark theme styles for Mentor Connect
    const style = document.createElement("style");
    style.textContent = `
    /* Mentor Connect container with white border */
    #mentor-connect {
        border: 1px solid #fff !important;
        border-radius: 6px; /* optional: slightly rounded corners */
        padding: 4px 8px;   /* spacing so text/icon don't touch border */
    }

    /* Force text white */
    #mentor-connect span {
        color: #fff !important;
    }

    /* SVG base stroke in white */
    #mentor-connect svg {
        stroke: #fff !important;
        color: #fff !important;
    }

    /* SVG path: white stroke + black fill */
    #mentor-connect svg path {
        stroke: #fff !important;
        fill: #000 !important;
    }
    `;
    document.head.appendChild(style);

    // Immediate inline effect (so you don't wait for style injection)
    const mentor = document.querySelector("#mentor-connect");
    if (!mentor) return false;

    mentor.style.setProperty("border", "1px solid #fff", "important");
    mentor.style.setProperty("border-radius", "6px", "important");
    mentor.style.setProperty("padding", "4px 8px", "important");
    
    mentor.querySelector("span").style.setProperty("color", "#fff", "important");
    mentor.querySelector("svg").style.setProperty("stroke", "#fff", "important");
    mentor.querySelector("svg path").style.setProperty("fill", "#000", "important");
    mentor.querySelector("svg path").style.setProperty("stroke", "#fff", "important");

    return true;

}