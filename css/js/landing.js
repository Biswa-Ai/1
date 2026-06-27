document.addEventListener("DOMContentLoaded", () => {
    const firstTouchLayer = document.getElementById("first-touch-layer");
    const welcomeContent = document.getElementById("welcome-content");
    const actionLayer = document.getElementById("action-layer");
    const bgVideo = document.getElementById("bg-video");
    const bgMusic = document.getElementById("bg-music");

    firstTouchLayer.addEventListener("click", () => {
        firstTouchLayer.style.opacity = "0";
        setTimeout(() => firstTouchLayer.remove(), 500);

        // Try-catch block taaki agar file na bhi ho, toh code crash na kare
        if (bgVideo) bgVideo.play().catch(err => console.log("Video skipped."));
        if (bgMusic) bgMusic.play().catch(err => console.log("Audio skipped."));

        welcomeContent.classList.remove("hidden");
        welcomeContent.style.animation = "msgFadeIn 1s forwards";

        setTimeout(() => {
            welcomeContent.style.transition = "opacity 1.5s ease-out";
            welcomeContent.style.opacity = "0";
            
            setTimeout(() => {
                welcomeContent.classList.add("hidden");
                actionLayer.classList.remove("hidden");
                actionLayer.style.animation = "msgFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards";
            }, 1500);

        }, 4000); // 4 seconds ka wait taaki transition jaldi ho jaye
    });
});
