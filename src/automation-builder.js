/**
 * WebloqAI — "See What Automation Looks Like"
 * 
 * Simple, relatable, high-impact Before vs. After demonstrations.
 * No fake terminals. Pure clarity for business owners.
 */

export function initAutomationBuilder() {
    const container = document.getElementById('automation-showcase');
    if (!container) return;

    const scenarios = {
        booking: {
            title: "Appointment Booking",
            label: "Consultant, Clinic & Agency Scheduling",
            customerQuery: "“Can I book an appointment with your team tomorrow?”",
            before: {
                steps: [
                    "Employee reads message 45 minutes later",
                    "Switches tabs to check Google Calendar availability",
                    "Types manual reply with 2 proposed slots",
                    "Waits for customer to respond (often hours later)",
                    "Manually types client details into CRM and sends confirmation"
                ],
                timeTaken: "2 to 4 hours average turnaround",
                result: "High friction, back-and-forth delays, occasional double-bookings"
            },
            after: {
                steps: [
                    "AI understands intent and checks real-time calendar in <1 second",
                    "Replies instantly with verified open times",
                    "Customer selects 3:00 PM",
                    "Slot locked instantly on Google Calendar / EHR",
                    "CRM record created and WhatsApp confirmation sent with calendar invite"
                ],
                timeTaken: "< 30 seconds total turnaround",
                result: "Zero human effort, 100% calendar accuracy, delighted customer"
            }
        },
        lead: {
            title: "Inbound Lead Qualification",
            label: "Real Estate & High-Ticket Inquiries",
            customerQuery: "“Saw your ad for 3BHK penthouses. Are there any available?”",
            before: {
                steps: [
                    "Lead sits in ad dashboard until a sales rep checks it hours later",
                    "Rep calls or texts, but lead is already at work or busy",
                    "Basic budget questions asked over disjointed text messages",
                    "Rep forgets to log notes in CRM until end of day",
                    "Cold lead slips through the cracks without structured follow-up"
                ],
                timeTaken: "3 to 6 hours delay",
                result: "Low contact rate, cold leads, lost revenue opportunities"
            },
            after: {
                steps: [
                    "Lead captured instantly via webhook from ad / website / WhatsApp",
                    "AI initiates natural conversation within 15 seconds",
                    "Asks budget, timeline, and preferred location parameters",
                    "Scores prospect intent and updates CRM deal stage automatically",
                    "High-priority lead routed to top sales executive with full briefing"
                ],
                timeTaken: "Instant (< 15 seconds response)",
                result: "Consistent qualification, zero dropped leads, higher conversion"
            }
        },
        support: {
            title: "Customer Support & Status",
            label: "E-Commerce & Service Inquiries",
            customerQuery: "“Where is my order #48912? Was supposed to arrive today.”",
            before: {
                steps: [
                    "Customer submits ticket or sends message",
                    "Support agent opens ticketing software, searches customer email",
                    "Opens shipping portal / warehouse software in another tab",
                    "Copies tracking code, verifies dispatch status",
                    "Types manual reply to customer"
                ],
                timeTaken: "1 to 8 hours ticket queue",
                result: "High support headcount, frustrated customers, repetitive workload"
            },
            after: {
                steps: [
                    "AI extracts order entity #48912 from message",
                    "Queries warehouse / courier API in real time (80ms)",
                    "Replies instantly with live tracking link and estimated arrival time",
                    "Logs resolution in support desk and closes ticket automatically"
                ],
                timeTaken: "< 3 seconds instant resolution",
                result: "70%+ routine queries solved with zero staff involvement"
            }
        }
    };

    let activeKey = 'booking';

    const tabBtns = container.querySelectorAll('.showcase-tab-btn');
    const contentArea = container.querySelector('.showcase-content-area');

    function render() {
        const sc = scenarios[activeKey];
        if (!sc || !contentArea) return;

        contentArea.innerHTML = `
            <div class="showcase-query-banner">
                <span class="query-badge">EXAMPLE INQUIRY</span>
                <span class="query-text">${sc.customerQuery}</span>
            </div>

            <div class="showcase-comparison-grid">
                <!-- Before Card -->
                <div class="showcase-card card-before">
                    <div class="sc-card-header">
                        <span class="sc-tag tag-before">BEFORE (MANUAL PROCESS)</span>
                        <h4>Without Automation</h4>
                    </div>

                    <ul class="sc-steps-list">
                        ${sc.before.steps.map(s => `
                            <li>
                                <span class="step-cross">✕</span>
                                <span>${s}</span>
                            </li>
                        `).join('')}
                    </ul>

                    <div class="sc-card-footer footer-before">
                        <div class="footer-metric">
                            <span class="metric-lbl">TIME TAKEN</span>
                            <span class="metric-val text-red">${sc.before.timeTaken}</span>
                        </div>
                        <div class="footer-summary">${sc.before.result}</div>
                    </div>
                </div>

                <!-- After Card -->
                <div class="showcase-card card-after">
                    <div class="sc-card-header">
                        <span class="sc-tag tag-after">AFTER (WEBLOQAI SYSTEM)</span>
                        <h4>With Autonomous System</h4>
                    </div>

                    <ul class="sc-steps-list">
                        ${sc.after.steps.map(s => `
                            <li>
                                <span class="step-check">✓</span>
                                <span>${s}</span>
                            </li>
                        `).join('')}
                    </ul>

                    <div class="sc-card-footer footer-after">
                        <div class="footer-metric">
                            <span class="metric-lbl">TIME TAKEN</span>
                            <span class="metric-val text-green">${sc.after.timeTaken}</span>
                        </div>
                        <div class="footer-summary">${sc.after.result}</div>
                    </div>
                </div>
            </div>
        `;
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeKey = btn.dataset.scenario;
            render();
        });
    });

    render();
}
