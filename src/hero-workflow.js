/**
 * WebloqAI — Minimalist Hero Workflow Visualization
 * 
 * "Quiet Technology":
 * A clean, elegant SVG/HTML workflow demonstration showing:
 * Customer Message → AI Understanding → Instant Action → (WhatsApp / CRM / Calendar)
 * 
 * Features:
 * - Subtle, occasional pulsing lines
 * - Interactive step trigger
 * - Pure CSS/SVG micro-animations (0% CPU/GPU overhead)
 */

export function initHeroWorkflow() {
    const container = document.getElementById('hero-workflow-diagram');
    if (!container) return;

    const steps = [
        { id: 'step-inquiry', label: '1. Customer Message', detail: '"Can I book a consultation for Thursday?"', type: 'input' },
        { id: 'step-ai', label: '2. AI Reasoning', detail: 'Identifies intent, checks real-time availability', type: 'ai' },
        { id: 'step-action', label: '3. Instant Action', detail: 'Coordinates tools in under 2 seconds', type: 'action' }
    ];

    const targets = [
        { label: 'WhatsApp', desc: 'Confirmation sent' },
        { label: 'CRM', desc: 'Record updated' },
        { label: 'Calendar', desc: 'Slot locked' }
    ];

    container.innerHTML = `
        <div class="workflow-card-frame">
            <div class="workflow-card-header">
                <span class="wf-dot green"></span>
                <span class="wf-title">Autonomous Workflow Architecture</span>
                <span class="wf-speed">&lt; 2s turnaround</span>
            </div>

            <div class="workflow-flow-grid">
                <!-- Step 1: Input -->
                <div class="wf-node wf-input active" id="wf-node-1">
                    <div class="wf-node-badge">INPUT</div>
                    <div class="wf-node-title">Customer Message</div>
                    <div class="wf-node-desc">"Can I book a consultation for Thursday?"</div>
                </div>

                <div class="wf-connector">
                    <span class="wf-line"></span>
                    <span class="wf-arrow">→</span>
                </div>

                <!-- Step 2: AI Core -->
                <div class="wf-node wf-ai active" id="wf-node-2">
                    <div class="wf-node-badge">AI REASONING</div>
                    <div class="wf-node-title">Understands & Qualifies</div>
                    <div class="wf-node-desc">Evaluates intent, checks calendar availability</div>
                </div>

                <div class="wf-connector">
                    <span class="wf-line"></span>
                    <span class="wf-arrow">→</span>
                </div>

                <!-- Step 3: Branch Actions -->
                <div class="wf-branch-group">
                    <div class="wf-node wf-subnode active">
                        <div class="wf-sub-title">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            WhatsApp
                        </div>
                        <span class="wf-sub-desc">Booking confirmed with client</span>
                    </div>

                    <div class="wf-node wf-subnode active">
                        <div class="wf-sub-title">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                            CRM System
                        </div>
                        <span class="wf-sub-desc">Deal created & tagged automatically</span>
                    </div>

                    <div class="wf-node wf-subnode active">
                        <div class="wf-sub-title">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            Calendar
                        </div>
                        <span class="wf-sub-desc">Time slot locked with Google Meet</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}
