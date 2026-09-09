/**
 * WebloqAI — Interactive Automation Builder
 * 
 * Features:
 * - Visual multi-node pipeline with animated active pulses
 * - Interactive step inspection (click any node to see inputs, AI prompt/logic, tools called, outputs)
 * - 3 Real-world workflow presets (Inbound Lead Qualification, 24/7 Support & Resolution, Stalled Lead Reactivation)
 * - "Run Live Simulation" mode animating data packets across the pipeline with live progress telemetry
 */

export function initAutomationBuilder() {
    const builderContainer = document.getElementById('automation-builder');
    if (!builderContainer) return;

    const workflows = {
        inbound: {
            name: "High-Ticket Inbound Lead Qualification",
            desc: "Captures new website/ad leads, uses AI to extract intent and budget, triggers instant WhatsApp outreach, updates CRM, and schedules directly with an account executive.",
            steps: [
                {
                    id: "lead",
                    label: "01 / Inbound Lead",
                    title: "Lead Capture Trigger",
                    badge: "EVENT TRIGGER",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>`,
                    input: "Visitor completes WebloqAI Discovery form / Ad inquiry submitted",
                    logic: "Webhook triggers event payload with UTM tags, company domain, and contact phone.",
                    output: "Payload validated & routed to Webloq AI Reasoning Engine in 42ms.",
                    tools: ["Webhook Ingestion", "Clearbit Enrichment", "Kafka Queue"]
                },
                {
                    id: "ai_qualify",
                    label: "02 / AI Reasoning",
                    title: "Intent & Budget Analysis",
                    badge: "AI CORE",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path></svg>`,
                    input: "Company name, inquiry text: 'Looking to automate our patient booking backlog'",
                    logic: "LLM evaluates company size, sector urgency, and budget tier against qualification matrix.",
                    output: "Score: 94/100 (High Intent, Healthcare Tier 1). Routed to priority queue.",
                    tools: ["Webloq AI Agent", "Vector RAG", "Sentiment Model"]
                },
                {
                    id: "whatsapp",
                    label: "03 / WhatsApp Push",
                    title: "Instant Personalized Outreach",
                    badge: "COMMUNICATION",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
                    input: "Lead Phone: +91 98XXX XXXXX | Lead Name: Dr. Mehta",
                    logic: "Dispatches WhatsApp message with verified badge in <12 seconds: 'Dr. Mehta, noticed your clinic handles 400+ weekly bookings...'",
                    output: "Message delivered. Dr. Mehta replies: 'Yes, how fast can you deploy?'",
                    tools: ["Meta WhatsApp Cloud API", "Dynamic Template Engine"]
                },
                {
                    id: "score",
                    label: "04 / Lead Scoring",
                    title: "Dynamic Priority Routing",
                    badge: "EVALUATION",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
                    input: "Customer message response timestamp: 38 seconds",
                    logic: "High responsiveness + clinical volume boosts deal priority score to Tier A VIP.",
                    output: "VIP tag appended. Dedicated AE calendar availability unlocked.",
                    tools: ["Scoring Engine", "Rule Evaluator"]
                },
                {
                    id: "crm",
                    label: "05 / CRM Sync",
                    title: "Automated Deal Staging",
                    badge: "DATA HYGIENE",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
                    input: "Structured transcript + enrichment dossier",
                    logic: "Creates HubSpot contact, creates 'Deal: Clinic Intake System', attaches full conversation audit.",
                    output: "Zero manual data entry required. Pipeline stage: 'Qualified — Discovery Scheduled'.",
                    tools: ["HubSpot API", "Salesforce API", "PostgreSQL Log"]
                },
                {
                    id: "calendar",
                    label: "06 / Booking Lock",
                    title: "Autonomous Calendar Lock",
                    badge: "SCHEDULING",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
                    input: "Customer selects: 'Thursday at 3:00 PM'",
                    logic: "System checks AE real-time Google Calendar slot, locks meeting, generates Google Meet link.",
                    output: "Calendar invite dispatched. Google Meet & WhatsApp confirmation pushed.",
                    tools: ["Google Calendar API", "Cal.com API", "Twilio SMS"]
                },
                {
                    id: "notify",
                    label: "07 / Sales Alert",
                    title: "Team Intelligence Briefing",
                    badge: "INTERNAL OPS",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
                    input: "Booking finalized + Full contextual background",
                    logic: "AI generates executive briefing dossier summarizing lead profile, pain points, and recommended solution.",
                    output: "Slack #sales-alerts pinged: 'Dr. Mehta booked for Thu 3 PM. Deal size: Enterprise'.",
                    tools: ["Slack Bot API", "Microsoft Teams Webhook"]
                }
            ]
        },
        support: {
            name: "24/7 Omnichannel Support & Ticket Resolution",
            desc: "Customer asks complex questions or tracking queries across web/WhatsApp; AI queries internal APIs, resolves 70%+ of tickets instantly, and escalates edge cases with context.",
            steps: [
                {
                    id: "lead",
                    label: "01 / Inquiry",
                    title: "Omnichannel Message",
                    badge: "EVENT TRIGGER",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
                    input: "Customer query: 'Where is order #89421? It was supposed to arrive yesterday.'",
                    logic: "Webhook captures customer phone, authentication token, and raw query.",
                    output: "Normalized ticket event routed to Support Agent 'Nova'.",
                    tools: ["Zendesk API", "WhatsApp Cloud API"]
                },
                {
                    id: "ai_qualify",
                    label: "02 / Intent & Entity",
                    title: "Order Extraction",
                    badge: "AI REASONING",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path></svg>`,
                    input: "Text parsing order entity '#89421'",
                    logic: "Agent identifies intent as ORDER_STATUS_QUERY and extracts order ID.",
                    output: "Entity confirmed. Triggers warehouse database lookup.",
                    tools: ["Webloq NLP", "Entity Tagger"]
                },
                {
                    id: "whatsapp",
                    label: "03 / ERP Lookup",
                    title: "Real-Time System Query",
                    badge: "API EXECUTION",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
                    input: "API call: GET /orders/89421/shipping",
                    logic: "Queries Shopify & logistics carrier (BlueDart/FedEx) in 85ms.",
                    output: "Status: 'Out for Delivery today by 4:00 PM with driver Ramesh (+91 99XXX)'.",
                    tools: ["Shopify GraphQL", "Logistics API"]
                },
                {
                    id: "score",
                    label: "04 / Natural Response",
                    title: "Empathetic Resolution",
                    badge: "RESPONSE GEN",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
                    input: "Order status payload",
                    logic: "AI generates personalized status response with live GPS tracking link.",
                    output: "Sent to WhatsApp in 1.4s total turnaround time.",
                    tools: ["Nova Support Model", "Template Renderer"]
                },
                {
                    id: "crm",
                    label: "05 / Ticket Closed",
                    title: "Automated Ticket Hygiene",
                    badge: "COMPLETION",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
                    input: "Resolution: Customer satisfied, ticket solved without human intervention",
                    logic: "Updates Zendesk/Freshdesk status to 'Resolved', logs CSAT prompt.",
                    output: "Zero human labor required. Ticket resolved in <2 seconds.",
                    tools: ["Zendesk", "Data Lake"]
                }
            ]
        },
        reactivation: {
            name: "Stalled Pipeline & Lead Reactivation",
            desc: "Monitors cold CRM leads who stalled >14 days; initiates hyper-personalized reactivation prompts with dynamic incentives, recovering lost pipeline revenue.",
            steps: [
                {
                    id: "lead",
                    label: "01 / Stalled Trigger",
                    title: "CRM Inactivity Audit",
                    badge: "SCHEDULED CRON",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
                    input: "CRON scan runs daily at 10:00 AM",
                    logic: "Finds 34 leads in 'Proposal Sent' stage with no activity in past 14 days.",
                    output: "Candidate batch passed to Ares Reactivation Agent.",
                    tools: ["HubSpot Filter API", "Postgres View"]
                },
                {
                    id: "ai_qualify",
                    label: "02 / Context Synthesis",
                    title: "Historical Analysis",
                    badge: "INTELLIGENCE",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
                    input: "Previous email exchanges, objection notes: 'Concerned about onboarding timeline'",
                    logic: "Agent synthesizes customized angle addressing exact onboarding timeline objection.",
                    output: "Tailored reactivation angle prepared.",
                    tools: ["Webloq Vector Memory", "Objection Matrix"]
                },
                {
                    id: "whatsapp",
                    label: "03 / Multi-Channel Ping",
                    title: "Hyper-Contextual Outreach",
                    badge: "OUTREACH",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"></path><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
                    input: "Drafted message sent via prospect's preferred channel (WhatsApp/Email)",
                    logic: "Prospect responds: 'That rapid 7-day deployment model solves our concern. Let's talk.'",
                    output: "Reactivation successful. Lead status flipped back to ACTIVE.",
                    tools: ["Sendgrid", "WhatsApp Cloud API"]
                },
                {
                    id: "score",
                    label: "04 / Direct Reschedule",
                    title: "Call Re-booked",
                    badge: "CONVERSION",
                    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
                    input: "AI presents 2 meeting slots matching rep calendar",
                    logic: "Slot confirmed for Tuesday 10:00 AM. CRM stage moved to 'Negotiation'.",
                    output: "Estimated recovered pipeline value: $4,500.",
                    tools: ["Calendly", "HubSpot Deal Stage"]
                }
            ]
        }
    };

    let currentPreset = 'inbound';
    let currentStepIndex = 1; // 0-indexed step
    let simulationTimer = null;
    let isSimulating = false;

    // Render presets and steps
    const navPresetBtns = builderContainer.querySelectorAll('.preset-btn');
    const nodesList = builderContainer.querySelector('.builder-nodes-list');
    const detailPanel = builderContainer.querySelector('.builder-detail-card');
    const simulateBtn = builderContainer.querySelector('.btn-simulate');

    function renderPipeline() {
        const wf = workflows[currentPreset];
        if (!nodesList || !wf) return;

        // Render nodes
        nodesList.innerHTML = wf.steps.map((step, idx) => `
            <div class="workflow-node ${idx === currentStepIndex ? 'active' : ''} ${idx < currentStepIndex ? 'completed' : ''}" data-step-index="${idx}">
                <div class="node-indicator">
                    <span class="node-icon">${step.icon}</span>
                    <span class="node-num">${idx + 1}</span>
                </div>
                <div class="node-content">
                    <span class="node-badge">${step.badge}</span>
                    <h4 class="node-title">${step.title}</h4>
                    <span class="node-sub">${step.label}</span>
                </div>
                ${idx < wf.steps.length - 1 ? '<div class="node-connector"><span class="pulse-line"></span></div>' : ''}
            </div>
        `).join('');

        // Rebind click events
        const nodeEls = nodesList.querySelectorAll('.workflow-node');
        nodeEls.forEach(el => {
            el.addEventListener('click', () => {
                if (isSimulating) stopSimulation();
                currentStepIndex = parseInt(el.dataset.stepIndex, 10);
                updateStepUI();
            });
        });

        updateStepUI();
    }

    function updateStepUI() {
        const wf = workflows[currentPreset];
        const step = wf.steps[currentStepIndex];
        if (!step || !detailPanel) return;

        // Update active class on nodes
        const nodeEls = nodesList.querySelectorAll('.workflow-node');
        nodeEls.forEach((el, idx) => {
            el.classList.toggle('active', idx === currentStepIndex);
            el.classList.toggle('completed', idx < currentStepIndex);
        });

        // Update detail card content
        detailPanel.innerHTML = `
            <div class="detail-header">
                <div class="detail-meta">
                    <span class="detail-badge">${step.badge}</span>
                    <span class="detail-step-tag">STEP ${currentStepIndex + 1} OF ${wf.steps.length}</span>
                </div>
                <h3 class="detail-title">${step.title}</h3>
                <p class="detail-label">${step.label}</p>
            </div>

            <div class="detail-grid">
                <div class="detail-box">
                    <div class="box-header">
                        <span class="box-dot input-dot"></span>
                        <span class="box-title">INPUT TELEMETRY</span>
                    </div>
                    <div class="box-content code-style">${step.input}</div>
                </div>

                <div class="detail-box">
                    <div class="box-header">
                        <span class="box-dot logic-dot"></span>
                        <span class="box-title">AI REASONING & LOGIC</span>
                    </div>
                    <div class="box-content">${step.logic}</div>
                </div>

                <div class="detail-box">
                    <div class="box-header">
                        <span class="box-dot output-dot"></span>
                        <span class="box-title">AUTONOMOUS OUTPUT</span>
                    </div>
                    <div class="box-content highlight">${step.output}</div>
                </div>

                <div class="detail-box">
                    <div class="box-header">
                        <span class="box-dot tools-dot"></span>
                        <span class="box-title">INTEGRATED APIS & TOOLS</span>
                    </div>
                    <div class="tools-tags">
                        ${step.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>

            <div class="detail-footer">
                <button class="btn-prev-step" ${currentStepIndex === 0 ? 'disabled' : ''}>← Previous Step</button>
                <div class="step-progress-dots">
                    ${wf.steps.map((_, i) => `<span class="p-dot ${i === currentStepIndex ? 'active' : ''}"></span>`).join('')}
                </div>
                <button class="btn-next-step" ${currentStepIndex === wf.steps.length - 1 ? 'disabled' : ''}>Next Step →</button>
            </div>
        `;

        // Bind next/prev buttons
        const prevBtn = detailPanel.querySelector('.btn-prev-step');
        const nextBtn = detailPanel.querySelector('.btn-next-step');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentStepIndex > 0) {
                    currentStepIndex--;
                    updateStepUI();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentStepIndex < wf.steps.length - 1) {
                    currentStepIndex++;
                    updateStepUI();
                }
            });
        }
    }

    // Preset switcher buttons
    navPresetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navPresetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPreset = btn.dataset.preset;
            currentStepIndex = 0;
            if (isSimulating) stopSimulation();
            renderPipeline();
        });
    });

    // Run Live Simulation mode
    function startSimulation() {
        isSimulating = true;
        currentStepIndex = 0;
        updateStepUI();
        if (simulateBtn) simulateBtn.innerHTML = `<span>■</span> Stop Simulation`;

        const wf = workflows[currentPreset];
        simulationTimer = setInterval(() => {
            if (currentStepIndex < wf.steps.length - 1) {
                currentStepIndex++;
                updateStepUI();
            } else {
                // Completed one run
                stopSimulation();
            }
        }, 1800);
    }

    function stopSimulation() {
        isSimulating = false;
        if (simulationTimer) clearInterval(simulationTimer);
        if (simulateBtn) simulateBtn.innerHTML = `<span>▶</span> Run Live Simulation`;
    }

    if (simulateBtn) {
        simulateBtn.addEventListener('click', () => {
            if (isSimulating) {
                stopSimulation();
            } else {
                startSimulation();
            }
        });
    }

    // Initialize
    renderPipeline();
}
