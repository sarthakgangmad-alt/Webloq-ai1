/**
 * WebloqAI — Industries Section Module
 * "Built Around Your Business"
 */

export function initIndustries() {
    const container = document.getElementById('industries-section');
    if (!container) return;

    const industries = {
        realestate: {
            title: "Real Estate & Developers",
            tagline: "Never lose a high-budget buyer to a 4-hour response delay.",
            examples: [
                "Instant WhatsApp qualification of incoming Meta & portal ad inquiries",
                "Automated collection of budget, preferred configuration, and timeline",
                "Direct calendar scheduling for site walkthroughs with sales directors",
                "Automated property brochure dispatch and post-visit follow-up sequences"
            ]
        },
        healthcare: {
            title: "Healthcare & Clinics",
            tagline: "Free up reception staff while ensuring zero patient hold times.",
            examples: [
                "24/7 patient appointment scheduling via WhatsApp and website",
                "Intelligent triage routing patients to the right specialist schedule",
                "Automated consultation reminders at T-24h and T-2h to cut no-shows",
                "Direct synchronization with Google Calendar, EHR, and clinic databases"
            ]
        },
        restaurants: {
            title: "Restaurants & Hospitality",
            tagline: "Table reservations and guest inquiries handled on autopilot.",
            examples: [
                "Automated table booking and party-size confirmation via WhatsApp",
                "Instant menu recommendations, dietary notes, and parking info",
                "VIP guest tagging in CRM for personalized returning guest hospitality",
                "Zero staff distraction during high-volume dinner rush hours"
            ]
        },
        professional: {
            title: "Professional Services & Legal",
            tagline: "Pre-qualify consultations before they reach partner calendars.",
            examples: [
                "Intake forms that verify case scope, jurisdiction, and retainer budget",
                "Automatic conflict-free calendar booking for paid consultation slots",
                "Client document collection, ID verification, and intake notes in CRM",
                "Automated proposal follow-ups to revive stalled commercial agreements"
            ]
        },
        ecommerce: {
            title: "E-Commerce & Retail",
            tagline: "Resolve 70%+ of customer inquiries instantly without human tickets.",
            examples: [
                "Instant answers to 'Where is my order?' by querying live logistics APIs",
                "Automated return, replacement, and exchange qualification flows",
                "Abandoned cart recovery conversations over WhatsApp with high conversion",
                "VIP buyer post-purchase check-ins and review collection"
            ]
        },
        education: {
            title: "Education & Coaching",
            tagline: "Capture interested students and book discovery sessions automatically.",
            examples: [
                "Course syllabus, fee structure, and eligibility queries answered 24/7",
                "Webinar registration, attendance tracking, and reminder workflows",
                "Automated parent-teacher meeting scheduling with zero back-and-forth",
                "Instant student lead scoring routed to admissions counselors"
            ]
        },
        homeservices: {
            title: "Home & Field Services",
            tagline: "Book service visits and send dispatch updates without phone tag.",
            examples: [
                "Instant quote estimation based on customer room size / service requirements",
                "Technician schedule matching and calendar appointment locking",
                "Automated technician dispatch notifications and ETA texts",
                "Automated post-job invoice follow-ups and Google review requests"
            ]
        },
        b2b: {
            title: "B2B & Technology",
            tagline: "Fast-track enterprise deals with instant inbound qualification.",
            examples: [
                "Enrich inbound corporate domains with company headcount and revenue",
                "Pre-qualify buying intent and route enterprise leads to senior reps",
                "Stalled deal re-engagement sequences that trigger when pipeline goes cold",
                "Automated weekly executive briefing sent to Slack #leadership"
            ]
        }
    };

    let activeKey = 'realestate';

    const chips = container.querySelectorAll('.industry-chip');
    const contentArea = container.querySelector('.industry-content-box');

    function render() {
        const item = industries[activeKey];
        if (!item || !contentArea) return;

        contentArea.innerHTML = `
            <div class="ind-details-header">
                <span class="ind-pill">${item.title}</span>
                <h3 class="ind-tagline">“${item.tagline}”</h3>
            </div>

            <div class="ind-examples-grid">
                ${item.examples.map(ex => `
                    <div class="ind-example-item">
                        <div class="ind-check">✓</div>
                        <p class="ind-text">${ex}</p>
                    </div>
                `).join('')}
            </div>

            <div class="ind-action-strip">
                <p>Have a business in this space? We can map your exact automation architecture.</p>
                <button class="btn btn-primary btn-sm" data-open-discovery>Explore This Setup →</button>
            </div>
        `;
    }

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeKey = chip.dataset.industry;
            render();
        });
    });

    render();
}
