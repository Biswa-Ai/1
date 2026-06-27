/**
 * Frontend communication abstraction module. 
 * Secure processing context requires masking structural configurations via a server layer.
 */
(function(window) {
    "use strict";

    const API_TARGET_ENDPOINT = "/api/chat";

    async function sendToCore(userPromptPayload) {
        const response = await fetch(API_TARGET_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: userPromptPayload })
        });

        if (!response.ok) {
            throw new Error(`Pipeline execution failure. Network status code: ${response.status}`);
        }

        const data = await response.json();
        return data.reply;
    }

    window.BiswaAPI = {
        sendToCore: sendToCore
    };

})(window);
