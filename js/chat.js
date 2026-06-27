document.addEventListener("DOMContentLoaded", () => {
    // Structural DOM Node Mapping
    const sidebar = document.getElementById("sidebar");
    const openSidebarBtn = document.getElementById("open-sidebar-btn");
    const closeSidebarBtn = document.getElementById("close-sidebar-btn");
    const menuItems = document.querySelectorAll(".menu-item");
    const viewPanels = document.querySelectorAll(".view-panel");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const chatScroller = document.getElementById("chat-scroller");

    // Sidebar Layout Controls
    openSidebarBtn.addEventListener("click", () => sidebar.classList.remove("collapsed"));
    closeSidebarBtn.addEventListener("click", () => sidebar.classList.add("collapsed"));

    // Dynamic Navigation System Management 
    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove("active"));
            viewPanels.forEach(p => p.classList.remove("active"));

            item.classList.add("active");
            const targetId = item.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");

            if(window.innerWidth <= 768) sidebar.classList.add("collapsed");
        });
    });

    // Dynamic Height Control for Text Inputs
    chatInput.addEventListener("input", function() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });

    // Chat Pipeline Ingestion Handler
    async function executeSubmission() {
        const text = chatInput.value.trim();
        if(!text) return;

        appendMessage("user", text);
        chatInput.value = "";
        chatInput.style.height = "auto";

        const systemIndicator = appendMessage("system", `<i class="fa-solid fa-circle-notch fa-spin"></i> Structuring transmission core response...`);

        try {
            const data = await window.BiswaAPI.sendToCore(text);
            systemIndicator.remove();
            appendMessage("system", data);
        } catch(err) {
            systemIndicator.remove();
            appendMessage("system", `<span style="color: #ff4a4a;">Unable to connect to BISWA AI. Please try again.</span>`);
        }
    }

    function appendMessage(sender, rawContent) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender === "user" ? "user-msg" : "system-msg");
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="avatar"><i class="fa-solid ${sender === 'user' ? 'fa-user-astronaut' : 'fa-brain'}"></i></div>
            <div class="msg-bubble">
                <p>${rawContent}</p>
                <span style="font-size: 0.65rem; color: var(--text-muted); display:block; margin-top:5px; text-align:right;">${timestamp}</span>
            </div>
        `;
        
        chatScroller.appendChild(messageDiv);
        chatScroller.scrollTop = chatScroller.scrollHeight;
        return messageDiv;
    }

    sendBtn.addEventListener("click", executeSubmission);
    chatInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            executeSubmission();
        }
    });
});

// Specialized System Node Tool Global Forwarder
function useTool(toolName) {
    document.querySelector('[data-target="chat-panel"]').click();
    const input = document.getElementById("chat-input");
    input.value = `[System Node Task Initiated: Processing via ${toolName}] -> Please assist with: `;
    input.focus();
      }
