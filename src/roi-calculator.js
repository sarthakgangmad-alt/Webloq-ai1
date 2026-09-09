/**
 * WebloqAI — Interactive ROI & Hours-Saved Calculator
 * 
 * Inputs:
 * - Monthly Leads / Inquiries
 * - Average Current Response Time (Minutes/Hours)
 * - Employees Handling Inquiries / Repetitive Work
 * - Average Lead / Deal Value ($ / ₹)
 * - Weekly Repetitive Hours per Employee
 * 
 * Outputs:
 * - Estimated Monthly Hours Reclaimed
 * - Response Time Reduction (<30s)
 * - Estimated Additional Deals Recovered / Month
 * - Projected Monthly Operational Value
 * 
 * Clearly labeled as illustrative estimates.
 */

export function initROICalculator() {
    const calcContainer = document.getElementById('roi-calculator');
    if (!calcContainer) return;

    // Sliders
    const leadsInput = document.getElementById('roi-leads');
    const responseTimeInput = document.getElementById('roi-response-time');
    const teamSizeInput = document.getElementById('roi-team-size');
    const leadValueInput = document.getElementById('roi-lead-value');
    const hoursSpentInput = document.getElementById('roi-hours-spent');

    // Value Labels
    const leadsVal = document.getElementById('roi-val-leads');
    const responseTimeVal = document.getElementById('roi-val-response-time');
    const teamSizeVal = document.getElementById('roi-val-team-size');
    const leadValueVal = document.getElementById('roi-val-lead-value');
    const hoursSpentVal = document.getElementById('roi-val-hours-spent');

    // Outputs
    const outHours = document.getElementById('roi-out-hours');
    const outSpeed = document.getElementById('roi-out-speed');
    const outLeads = document.getElementById('roi-out-leads');
    const outValue = document.getElementById('roi-out-value');

    // Currency toggle (USD vs INR)
    let currency = '$';
    const currencyBtns = calcContainer.querySelectorAll('.currency-toggle-btn');
    currencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currencyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currency = btn.dataset.currency;
            calculate();
        });
    });

    function formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(Math.round(num));
    }

    function calculate() {
        const monthlyLeads = parseInt(leadsInput.value, 10);
        const currentResponseHours = parseFloat(responseTimeInput.value);
        const teamSize = parseInt(teamSizeInput.value, 10);
        const avgDealValue = parseInt(leadValueInput.value, 10);
        const weeklyRepetitiveHours = parseInt(hoursSpentInput.value, 10);

        // Update Slider Display Labels
        if (leadsVal) leadsVal.textContent = `${formatNumber(monthlyLeads)} leads / mo`;
        if (responseTimeVal) {
            responseTimeVal.textContent = currentResponseHours < 1 
                ? `${Math.round(currentResponseHours * 60)} minutes` 
                : `${currentResponseHours} hours`;
        }
        if (teamSizeVal) teamSizeVal.textContent = `${teamSize} ${teamSize === 1 ? 'person' : 'people'}`;
        if (leadValueVal) leadValueVal.textContent = `${currency}${formatNumber(avgDealValue)}`;
        if (hoursSpentVal) hoursSpentVal.textContent = `${weeklyRepetitiveHours} hrs / week / rep`;

        // 1. Estimated Hours Automated per Month
        // Each employee spends `weeklyRepetitiveHours` * 4.33 weeks on repetitive tasks.
        // Systems typically automate ~75% of routine data entry, triage & follow-up.
        const totalMonthlyRepetitiveHours = teamSize * weeklyRepetitiveHours * 4.33;
        const hoursAutomated = Math.round(totalMonthlyRepetitiveHours * 0.78);

        // 2. Response Time Reduction
        // Webloq AI responds in <30 seconds via WhatsApp/Web
        const responseReduction = currentResponseHours < 1 
            ? `${Math.round(currentResponseHours * 60)}m → <30s` 
            : `${currentResponseHours}h → <30s`;

        // 3. Estimated Recovered Leads / Closed Deals
        // Benchmark: Dropping response time from >1hr to <1min recovers ~12-18% of dropped leads.
        const recoveryRate = currentResponseHours >= 2 ? 0.14 : (currentResponseHours >= 0.5 ? 0.08 : 0.04);
        const additionalQualifiedLeads = Math.round(monthlyLeads * recoveryRate);
        const estimatedDealsClosed = Math.max(1, Math.round(additionalQualifiedLeads * 0.15));

        // 4. Projected Monthly Value Created
        // Direct Deal Value + Labor Productivity Savings ($30/hr or ₹600/hr equivalent)
        const laborRatePerHour = currency === '$' ? 28 : 650;
        const laborSavings = hoursAutomated * laborRatePerHour;
        const revenueOpportunity = estimatedDealsClosed * avgDealValue;
        const totalEstimatedImpact = laborSavings + (revenueOpportunity * 0.4); // Conservative blended capture

        // Animate or set outputs
        if (outHours) outHours.textContent = `~${formatNumber(hoursAutomated)} hrs`;
        if (outSpeed) outSpeed.textContent = responseReduction;
        if (outLeads) outLeads.textContent = `+${formatNumber(estimatedDealsClosed)} deals`;
        if (outValue) outValue.textContent = `~${currency}${formatNumber(totalEstimatedImpact)}`;
    }

    // Attach listeners
    [leadsInput, responseTimeInput, teamSizeInput, leadValueInput, hoursSpentInput].forEach(slider => {
        if (slider) {
            slider.addEventListener('input', calculate);
        }
    });

    calculate();
}
