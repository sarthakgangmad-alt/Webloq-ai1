/**
 * WebloqAI — Minimalist ROI & Capacity Calculator
 * 
 * Clean, practical business estimation tool.
 * Clearly marked as an illustrative estimate.
 */

export function initROICalculator() {
    const container = document.getElementById('clean-roi-calculator');
    if (!container) return;

    const leadsSlider = document.getElementById('calc-leads');
    const dealValSlider = document.getElementById('calc-deal-val');
    const hoursSlider = document.getElementById('calc-hours');
    const teamSlider = document.getElementById('calc-team');

    const leadsVal = document.getElementById('calc-val-leads');
    const dealVal = document.getElementById('calc-val-deal');
    const hoursVal = document.getElementById('calc-val-hours');
    const teamVal = document.getElementById('calc-val-team');

    const outHours = document.getElementById('calc-out-hours');
    const outSpeed = document.getElementById('calc-out-speed');
    const outCapacity = document.getElementById('calc-out-capacity');

    function formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(Math.round(num));
    }

    function calculate() {
        const leads = parseInt(leadsSlider.value, 10);
        const deal = parseInt(dealValSlider.value, 10);
        const weeklyHours = parseInt(hoursSlider.value, 10);
        const team = parseInt(teamSlider.value, 10);

        if (leadsVal) leadsVal.textContent = `${formatNumber(leads)} / mo`;
        if (dealVal) dealVal.textContent = `$${formatNumber(deal)}`;
        if (hoursVal) hoursVal.textContent = `${weeklyHours} hrs / wk`;
        if (teamVal) teamVal.textContent = `${team} ${team === 1 ? 'person' : 'people'}`;

        // 1. Estimated Hours Automated / Month
        // Standard automation eliminates ~70% of repetitive data entry, triage & reminders
        const monthlyRepetitiveHours = team * weeklyHours * 4.33;
        const automatedHours = Math.round(monthlyRepetitiveHours * 0.70);

        // 2. Response Time Improvement
        // From average 2-4 hours manual lag down to under 30 seconds
        const speedImprovement = "Hours → < 30 sec";

        // 3. Estimated Capacity Gained
        // Equivalent to gaining extra capacity without additional hiring
        const extraFTECapacity = (automatedHours / 160).toFixed(1);

        if (outHours) outHours.textContent = `~${formatNumber(automatedHours)} hrs / mo`;
        if (outSpeed) outSpeed.textContent = speedImprovement;
        if (outCapacity) outCapacity.textContent = `+${extraFTECapacity}x team capacity`;
    }

    [leadsSlider, dealValSlider, hoursSlider, teamSlider].forEach(slider => {
        if (slider) {
            slider.addEventListener('input', calculate);
        }
    });

    calculate();
}
