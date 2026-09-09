/**
 * WebloqAI — Clean WhatsApp Automation Demonstration
 * 
 * Authentic, clean WhatsApp chat interface paired with a clear,
 * human-first checklist of what happens behind the scenes.
 * No sci-fi terminals.
 */

export function initWhatsAppSimulator() {
    const container = document.getElementById('whatsapp-demo-section');
    if (!container) return;

    const demos = {
        booking: {
            title: "Appointment Booking",
            chat: [
                { sender: 'customer', text: "Hi, I'd like to book an appointment.", time: "10:14 AM" },
                { sender: 'ai', text: "Absolutely! I can help with that. What day works best for you?", time: "10:14 AM" },
                { sender: 'customer', text: "Tomorrow.", time: "10:15 AM" },
                { sender: 'ai', text: "I have 11:30 AM and 3:00 PM available tomorrow. Which one suits you?", time: "10:15 AM" },
                { sender: 'customer', text: "3 PM works.", time: "10:15 AM" },
                { sender: 'ai', text: "Perfect. You're booked for 3:00 PM tomorrow. I've sent a calendar invite to your email, and I'll send you a reminder beforehand. 📋", time: "10:15 AM" }
            ],
            checklist: [
                { label: "Understands natural customer request", desc: "Recognizes booking intent without rigid button menus" },
                { label: "Checks real-time team calendar", desc: "Verifies live slots on Google Calendar / EHR" },
                { label: "Locks the appointment slot", desc: "Instantly confirms and prevents double bookings" },
                { label: "Creates / updates CRM record", desc: "Logs contact info and meeting notes automatically" },
                { label: "Schedules automated reminders", desc: "Sends WhatsApp reminder 2 hours prior to avoid no-shows" }
            ]
        },
        lead: {
            title: "Lead Qualification",
            chat: [
                { sender: 'customer', text: "Hello, I saw your ad for commercial office leases.", time: "02:20 PM" },
                { sender: 'ai', text: "Hello! Welcome to Apex Real Estate. Are you looking to buy or lease commercial space?", time: "02:20 PM" },
                { sender: 'customer', text: "Looking to lease around 3,000 sq ft in Baner.", time: "02:21 PM" },
                { sender: 'ai', text: "We have two ready-to-move corporate floors in Baner matching that size. What is your preferred monthly budget range?", time: "02:21 PM" },
                { sender: 'customer', text: "Around 1.5 to 2 Lakhs per month.", time: "02:22 PM" },
                { sender: 'ai', text: "Both units fit your budget. I've sent the floor plans above. Can our leasing director call you at 4:30 PM today for a walkthrough?", time: "02:22 PM" }
            ],
            checklist: [
                { label: "Instant response in <15 seconds", desc: "Engages the lead while interest is peak" },
                { label: "Gathers qualification criteria", desc: "Extracts size, location, and verified budget" },
                { label: "Scores lead priority", desc: "Identifies high-value commercial opportunity" },
                { label: "Syncs directly to CRM pipeline", desc: "Creates qualified deal in HubSpot / Salesforce" },
                { label: "Alerts the assigned sales executive", desc: "Sales rep receives instant notification with full context" }
            ]
        }
    };

    let activeKey = 'booking';

    const tabBtns = container.querySelectorAll('.wa-demo-tab');
    const chatBody = container.querySelector('.wa-clean-chat-body');
    const checkList = container.querySelector('.wa-checklist-container');

    function render() {
        const d = demos[activeKey];
        if (!d || !chatBody || !checkList) return;

        // Render Chat
        chatBody.innerHTML = d.chat.map(msg => `
            <div class="clean-msg-row ${msg.sender === 'customer' ? 'msg-customer' : 'msg-ai'}">
                <div class="clean-msg-bubble">
                    <p class="clean-msg-text">${msg.text}</p>
                    <span class="clean-msg-time">${msg.time} ${msg.sender === 'ai' ? '✓✓' : ''}</span>
                </div>
            </div>
        `).join('');

        // Render Checklist
        checkList.innerHTML = `
            <div class="checklist-header">
                <span class="checklist-pill">HANDLED AUTOMATICALLY</span>
                <h3>Behind Every Message</h3>
                <p>What happens in under 2 seconds without human staff:</p>
            </div>

            <ul class="checklist-items">
                ${d.checklist.map(item => `
                    <li class="check-item">
                        <div class="check-icon">✓</div>
                        <div class="check-text">
                            <strong>${item.label}</strong>
                            <span>${item.desc}</span>
                        </div>
                    </li>
                `).join('')}
            </ul>

            <div class="checklist-cta-strip">
                <span>Deploy this workflow for your business:</span>
                <button class="btn btn-primary btn-sm" data-open-discovery>Get Started →</button>
            </div>
        `;
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeKey = btn.dataset.demo;
            render();
        });
    });

    render();
}
