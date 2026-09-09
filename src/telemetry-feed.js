/**
 * WebloqAI — Live Automation Simulation Feed
 * 
 * Generates an authentic continuous stream of simulated business operations:
 * - Real-time timestamps with millisecond precision
 * - Dynamic throughput counters
 * - Filterable by pipeline type (WhatsApp, Leads, Voice, CRM, Internal Ops)
 */

export function initTelemetryFeed() {
    const feedContainer = document.getElementById('telemetry-feed');
    if (!feedContainer) return;

    const listEl = feedContainer.querySelector('.telemetry-feed-list');
    const countEl = feedContainer.querySelector('.stat-events-count');
    const latencyEl = feedContainer.querySelector('.stat-latency');
    const filterBtns = feedContainer.querySelectorAll('.feed-filter-btn');

    let currentFilter = 'all';
    let totalEvents = 142890;
    let isPaused = false;

    const eventPool = [
        { type: 'whatsapp', tag: 'WHATSAPP_AI', text: 'Incoming inquiry from +91 98401 XXXXX parsed: "Looking for corporate team booking"', latency: '18ms' },
        { type: 'leads', tag: 'LEAD_SCORE', text: 'Entity enriched via Clearbit: Apex Logistics Inc (ARR: $12M+). Lead Tier: A+', latency: '42ms' },
        { type: 'crm', tag: 'CRM_MUTATION', text: 'Deal created in HubSpot: "Apex Logistics - Enterprise Autonomous Dispatch"', latency: '85ms' },
        { type: 'voice', tag: 'VOICE_AGENT', text: 'Inbound call answered by "Vera": Clinic appointment triage completed in 1m 12s', latency: '320ms' },
        { type: 'whatsapp', tag: 'CALENDAR_LOCK', text: 'Google Calendar slot locked for Thu 14:00 IST. Meeting invite pushed to WhatsApp', latency: '110ms' },
        { type: 'ops', tag: 'DOC_PARSER', text: 'Invoice #INV-2026-88 extracted: $14,250 matching PO #PO-9912. Synced with QuickBooks', latency: '240ms' },
        { type: 'leads', tag: 'REACTIVATION', text: 'Stalled lead (18 days cold) re-engaged via WhatsApp follow-up. Deal reactivated', latency: '95ms' },
        { type: 'whatsapp', tag: 'SUPPORT_RESOLVED', text: 'Order status query #OR-7721 resolved in 1.4s. CSAT rating: 5/5', latency: '28ms' },
        { type: 'ops', tag: 'DAILY_BRIEF', text: 'Atlas generated daily operational executive digest: 48 leads processed, 14 calls booked', latency: '380ms' },
        { type: 'voice', tag: 'VOICE_OUTBOUND', text: 'Follow-up call completed for dental checkup reminder. Confirmed for Monday 10:00 AM', latency: '290ms' }
    ];

    function getTimestamp() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        const ms = String(now.getMilliseconds()).padStart(3, '0');
        return `${hrs}:${mins}:${secs}.${ms}`;
    }

    function addRandomEvent() {
        if (isPaused || !listEl) return;

        const candidate = eventPool[Math.floor(Math.random() * eventPool.length)];

        // Filter check
        if (currentFilter !== 'all' && candidate.type !== currentFilter) {
            return;
        }

        totalEvents++;
        if (countEl) countEl.textContent = totalEvents.toLocaleString();
        if (latencyEl) latencyEl.textContent = `${Math.floor(Math.random() * 80 + 310)}ms`;

        const item = document.createElement('div');
        item.className = `feed-item item-${candidate.type} reveal-fade`;
        item.innerHTML = `
            <span class="feed-time">${getTimestamp()}</span>
            <span class="feed-badge badge-${candidate.type}">${candidate.tag}</span>
            <span class="feed-text">${candidate.text}</span>
            <span class="feed-lat">${candidate.latency}</span>
        `;

        listEl.insertBefore(item, listEl.firstChild);

        // Keep maximum 30 items
        if (listEl.children.length > 30) {
            listEl.removeChild(listEl.lastChild);
        }
    }

    // Interval to spawn events smoothly
    const interval = setInterval(addRandomEvent, 1200);

    // Initial fill of 6 events
    for (let i = 0; i < 6; i++) {
        addRandomEvent();
    }

    // Filter clicks
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
        });
    });

    // Pause on mouseenter
    listEl.addEventListener('mouseenter', () => isPaused = true);
    listEl.addEventListener('mouseleave', () => isPaused = false);
}
