document.addEventListener("DOMContentLoaded", () => {
    const firstTouchLayer = document.getElementById("first-touch-layer");
    const welcomeContent = document.getElementById("welcome-content");
    const actionLayer = document.getElementById("action-layer");
    const bgVideo = document.getElementById("bg-video");
    const bgMusic = document.getElementById("bg-music");

    // Unified interactive ignition sequencing 
    firstTouchLayer.addEventListener("click", () => {
        // Core Web Audio API unlock protocols
        firstTouchLayer.style.opacity = "0";
        setTimeout(() => firstTouchLayer.remove(), 500);

        // Asset Pipeline Triggering
        bgVideo.play().catch(err => console.log("Video tracking initialization deferred."));
        bgMusic.play().catch(err => console.log("Audio device allocation restricted."));

        // Cinematic Scene Timing Array
        welcomeContent.classList.remove("hidden");
        welcomeContent.style.animation = "msgFadeIn 1s forwards";

        // Automated transition from entry splash state to explicit interactive Action Buttons
        setTimeout(() => {
            welcomeContent.style.transition = "opacity 1.5s ease-out";
            welcomeContent.style.opacity = "0";
            
            setTimeout(() => {
                welcomeContent.classList.add("hidden");
                actionLayer.classList.remove("hidden");
                actionLayer.style.animation = "msgFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards";
            }, 1500);

        }, 6500); // Transitions exactly within the target 6-8 second design parameter
    });
});
