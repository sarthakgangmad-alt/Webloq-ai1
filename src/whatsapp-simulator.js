/**
 * WebloqAI — Interactive WhatsApp & Backend Telemetry Simulator
 * 
 * Features:
 * - Realistic dark-mode WhatsApp UI with verified business badge, typing indicators, and timestamps
 * - Synchronized live backend telemetry terminal displaying real-time API logs, AI reasoning, and CRM mutations
 * - 3 Industry Scenarios:
 *    1. Clinic / Consultant Appointment Booking
 *    2. Real Estate High-Intent Lead Qualification
 *    3. E-Commerce Order Status & Resolution
 * - Replay, Pause, and Scenario switching controls
 */

export function initWhatsAppSimulator() {
    const container = document.getElementById('whatsapp-simulator');
    if (!container) return;

    const scenarios = {
        clinic: {
            title: "Healthcare Clinic Booking",
            customerName: "Ananya Sharma",
            customerAvatar: "AS",
            businessName: "Maval Healthcare AI",
            flow: [
                {
                    sender: "customer",
                    text: "Hi, I want to book a consultation with Dr. Kulkarni for tomorrow.",
                    time: "10:14 AM",
                    telemetry: [
                        { time: "10:14:02", tag: "INCOMING_WEBHOOK", msg: "WhatsApp Cloud API: payload received from +91 98201 XXXXX", level: "info" },
                        { time: "10:14:03", tag: "NLP_INTENT", msg: "Intent: APPOINTMENT_REQUEST | Specialist: Dr. Kulkarni | Window: Tomorrow", level: "ai" }
                    ]
                },
                {
                    sender: "ai",
                    text: "Hello Ananya! I'd be happy to schedule that for you with Dr. Kulkarni. For tomorrow, we have slots available at 11:30 AM and 3:00 PM. Which one suits you best?",
                    time: "10:14 AM",
                    telemetry: [
                        { time: "10:14:04", tag: "CALENDAR_QUERY", msg: "Google Calendar API: checked Dr. Kulkarni availability for 2026-09-10", level: "success" },
                        { time: "10:14:05", tag: "WHATSAPP_DISPATCH", msg: "Message dispatched via Meta Cloud API in 1.1s", level: "info" }
                    ]
                },
                {
                    sender: "customer",
                    text: "3:00 PM works perfectly.",
                    time: "10:15 AM",
                    telemetry: [
                        { time: "10:15:01", tag: "INCOMING_MESSAGE", msg: "Slot selection parsed: '15:00:00 IST'", level: "info" },
                        { time: "10:15:02", tag: "CRM_MUTATION", msg: "Patient record updated in Practo / EHR database", level: "db" }
                    ]
                },
                {
                    sender: "ai",
                    text: "You are confirmed for tomorrow at 3:00 PM with Dr. Kulkarni at Clinic Room 4. 📋\n\nI've sent the calendar invite to your email. I'll also send you a quick reminder 2 hours prior. Is there anything specific you'd like the doctor to note?",
                    time: "10:15 AM",
                    telemetry: [
                        { time: "10:15:03", tag: "CALENDAR_LOCK", msg: "Google Calendar OAuth: Event #EV-8921 created with auto-lock", level: "success" },
                        { time: "10:15:04", tag: "CRON_SCHEDULED", msg: "Automated reminder scheduled for T-120 minutes", level: "success" },
                        { time: "10:15:05", tag: "PIPELINE_COMPLETE", msg: "Booking completed in 1.4s with 0 human intervention", level: "highlight" }
                    ]
                }
            ]
        },
        realestate: {
            title: "Real Estate Buyer Qualification",
            customerName: "Rahul Deshmukh",
            customerAvatar: "RD",
            businessName: "Aura Luxury Residences AI",
            flow: [
                {
                    sender: "customer",
                    text: "Saw your ad for 3BHK penthouses in Baner. Are there any east-facing units left?",
                    time: "02:30 PM",
                    telemetry: [
                        { time: "14:30:01", tag: "INCOMING_WEBHOOK", msg: "Ad Lead ID #FB-77402 captured from Meta Ads", level: "info" },
                        { time: "14:30:02", tag: "RAG_RETRIEVAL", msg: "Querying Aura inventory vector DB: '3BHK East Baner'", level: "ai" }
                    ]
                },
                {
                    sender: "ai",
                    text: "Hello Rahul! Yes, we have two premium east-facing 3BHK penthouses remaining on the 18th and 22nd floors, featuring uninterrupted valley views.\n\nOur unit sizes range from 2,150 to 2,400 sq.ft. May I know what budget range you are targeting for your home?",
                    time: "02:30 PM",
                    telemetry: [
                        { time: "14:30:03", tag: "INVENTORY_MATCH", msg: "2 units matching criteria retrieved in 28ms", level: "success" },
                        { time: "14:30:04", tag: "QUALIFICATION_STEP", msg: "Prompt generated targeting budget qualification", level: "ai" }
                    ]
                },
                {
                    sender: "customer",
                    text: "Around 2.5 to 3 Cr. Would love to see the floor plans and visit this Saturday.",
                    time: "02:31 PM",
                    telemetry: [
                        { time: "14:31:01", tag: "SCORE_CALC", msg: "Budget extracted: 2.5 - 3.0 Cr INR | Lead Tier: Ultra-High (Score: 98/100)", level: "highlight" },
                        { time: "14:31:02", tag: "SALESFORCE_SYNC", msg: "Lead created in Salesforce: 'Baner Penthouse VIP - Rahul Deshmukh'", level: "db" }
                    ]
                },
                {
                    sender: "ai",
                    text: "Excellent, both units fit your budget comfortably. 📄 I've attached the architectural brochure and 3D walkthrough video above.\n\nI can reserve a private walkthrough for you this Saturday at 11:30 AM with our Senior Director. Would that work?",
                    time: "02:31 PM",
                    telemetry: [
                        { time: "14:31:03", tag: "DOCUMENT_PUSH", msg: "Media asset (Brochure.pdf, 4.2MB) dispatched via WhatsApp API", level: "info" },
                        { time: "14:31:04", tag: "SLACK_VIP_ALERT", msg: "#vip-leads alerted: 'Rahul Deshmukh (Budget: 3 Cr) requesting Saturday tour'", level: "highlight" }
                    ]
                }
            ]
        },
        support: {
            title: "E-Commerce Instant Order Resolution",
            customerName: "Pooja Verma",
            customerAvatar: "PV",
            businessName: "Kinetics Direct Support",
            flow: [
                {
                    sender: "customer",
                    text: "Can you tell me where my order #KD-99214 is? It hasn't arrived.",
                    time: "06:12 PM",
                    telemetry: [
                        { time: "18:12:01", tag: "INCOMING_QUERY", msg: "Text payload received: entity #KD-99214 extracted", level: "info" },
                        { time: "18:12:02", tag: "SHOPIFY_GET", msg: "GET /api/2024-01/orders/KD-99214.json (Status: 200 OK, 62ms)", level: "db" }
                    ]
                },
                {
                    sender: "ai",
                    text: "Hi Pooja! I pulled up order #KD-99214. It was dispatched yesterday via BlueDart Air (Tracking: BD8891024).\n\nGood news: it is currently out for delivery with your courier partner and scheduled to arrive by 8:00 PM tonight. 🚚\n\nLive GPS tracking: https://track.kinetics.co/KD-99214",
                    time: "06:12 PM",
                    telemetry: [
                        { time: "18:12:03", tag: "LOGISTICS_API", msg: "BlueDart API response: OUT_FOR_DELIVERY | ETA: 20:00", level: "success" },
                        { time: "18:12:04", tag: "ZENDESK_RESOLVED", msg: "Ticket created and marked auto-resolved in 1.2s", level: "highlight" }
                    ]
                },
                {
                    sender: "customer",
                    text: "Awesome, thank you so much! That was super fast.",
                    time: "06:13 PM",
                    telemetry: [
                        { time: "18:13:01", tag: "SENTIMENT_ANALYSIS", msg: "Customer Sentiment: POSITIVE (0.99 CSAT)", level: "ai" },
                        { time: "18:13:02", tag: "ANALYTICS_LOG", msg: "Metric logged: Zero-touch human resolution completed", level: "highlight" }
                    ]
                },
                {
                    sender: "ai",
                    text: "You're very welcome! If you need anything else once it arrives, just message here. Have a great evening!",
                    time: "06:13 PM",
                    telemetry: [
                        { time: "18:13:03", tag: "SESSION_END", msg: "Session closed gracefully. System returned to standby.", level: "info" }
                    ]
                }
            ]
        }
    };

    let activeScenario = 'clinic';
    let currentStep = 0;
    let timer = null;
    let isPlaying = true;

    const chatBody = container.querySelector('.wa-chat-body');
    const terminalLogs = container.querySelector('.wa-terminal-logs');
    const scenarioPills = container.querySelectorAll('.wa-scenario-pill');
    const replayBtn = container.querySelector('.btn-wa-replay');
    const playPauseBtn = container.querySelector('.btn-wa-playpause');
    const businessNameEl = container.querySelector('.wa-contact-name');
    const subtitleEl = container.querySelector('.wa-contact-status');

    function renderScenario() {
        const sc = scenarios[activeScenario];
        if (!sc) return;

        if (businessNameEl) businessNameEl.textContent = sc.businessName;
        if (subtitleEl) subtitleEl.textContent = "● Webloq AI Agent Active";

        // Reset conversation
        chatBody.innerHTML = '';
        terminalLogs.innerHTML = `
            <div class="terminal-line system-boot">
                <span class="term-time">[SYS_INIT]</span>
                <span class="term-tag">BOOT</span>
                <span class="term-msg">Listening on WhatsApp Webhook (Meta API v21.0)...</span>
            </div>
        `;

        currentStep = 0;
        stepConversation();
    }

    function stepConversation() {
        if (!isPlaying) return;
        const sc = scenarios[activeScenario];
        if (currentStep >= sc.flow.length) {
            // End of conversation
            if (playPauseBtn) playPauseBtn.innerHTML = `<span>▶</span> Restart`;
            isPlaying = false;
            return;
        }

        const msgData = sc.flow[currentStep];

        // If AI message, show typing indicator first
        if (msgData.sender === 'ai') {
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'wa-msg-bubble wa-ai typing';
            typingIndicator.innerHTML = `
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            `;
            chatBody.appendChild(typingIndicator);
            chatBody.scrollTop = chatBody.scrollHeight;

            setTimeout(() => {
                if (typingIndicator.parentNode) {
                    typingIndicator.parentNode.removeChild(typingIndicator);
                }
                appendMessage(msgData);
                appendTelemetry(msgData.telemetry);
                currentStep++;
                timer = setTimeout(stepConversation, 2400);
            }, 800);
        } else {
            appendMessage(msgData);
            appendTelemetry(msgData.telemetry);
            currentStep++;
            timer = setTimeout(stepConversation, 1600);
        }
    }

    function appendMessage(msg) {
        const bubble = document.createElement('div');
        bubble.className = `wa-msg-bubble wa-${msg.sender}`;
        bubble.innerHTML = `
            <div class="msg-text">${msg.text.replace(/\n/g, '<br>')}</div>
            <div class="msg-meta">
                <span class="msg-time">${msg.time}</span>
                ${msg.sender === 'ai' ? '<span class="msg-ticks">✓✓</span>' : ''}
            </div>
        `;
        chatBody.appendChild(bubble);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendTelemetry(telemetryList) {
        if (!telemetryList || !terminalLogs) return;

        telemetryList.forEach((item, i) => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = `terminal-line line-${item.level}`;
                line.innerHTML = `
                    <span class="term-time">[${item.time}]</span>
                    <span class="term-tag tag-${item.level}">${item.tag}</span>
                    <span class="term-msg">${item.msg}</span>
                `;
                terminalLogs.appendChild(line);
                terminalLogs.scrollTop = terminalLogs.scrollHeight;
            }, i * 250);
        });
    }

    // Scenario pill triggers
    scenarioPills.forEach(pill => {
        pill.addEventListener('click', () => {
            scenarioPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeScenario = pill.dataset.scenario;
            if (timer) clearTimeout(timer);
            isPlaying = true;
            if (playPauseBtn) playPauseBtn.innerHTML = `<span>❚❚</span> Pause`;
            renderScenario();
        });
    });

    // Replay button
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            if (timer) clearTimeout(timer);
            isPlaying = true;
            if (playPauseBtn) playPauseBtn.innerHTML = `<span>❚❚</span> Pause`;
            renderScenario();
        });
    }

    // Play/Pause button
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                isPlaying = false;
                if (timer) clearTimeout(timer);
                playPauseBtn.innerHTML = `<span>▶</span> Play`;
            } else {
                isPlaying = true;
                playPauseBtn.innerHTML = `<span>❚❚</span> Pause`;
                if (currentStep >= scenarios[activeScenario].flow.length) {
                    renderScenario();
                } else {
                    stepConversation();
                }
            }
        });
    }

    // Start when section intersects
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && currentStep === 0) {
                renderScenario();
            }
        });
    }, { threshold: 0.2 });

    observer.observe(container);
}
