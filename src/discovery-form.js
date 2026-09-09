/**
 * WebloqAI — Interactive 6-Step Automation Discovery Engine
 * 
 * Steps:
 * 1. Business Type
 * 2. Target Workflows to Automate
 * 3. Monthly Inquiry Volume
 * 4. Current Tech Stack
 * 5. Primary Operational Bottleneck
 * 6. Contact Details & Architecture Plan Generator
 * 
 * Final State:
 * Displays dynamic "System Architecture Blueprint" + Direct Booking Confirmation
 */

export function initDiscoveryForm() {
    const modal = document.getElementById('discovery-modal');
    if (!modal) return;

    const openBtns = document.querySelectorAll('[data-open-discovery]');
    const closeBtn = modal.querySelector('.modal-close-btn');
    const form = modal.querySelector('#discovery-form');
    const stepCards = modal.querySelectorAll('.discovery-step');
    const progressFill = modal.querySelector('.progress-fill');
    const stepIndicator = modal.querySelector('.step-indicator-text');
    const nextBtn = modal.querySelector('.btn-step-next');
    const prevBtn = modal.querySelector('.btn-step-prev');
    const submitBtn = modal.querySelector('.btn-step-submit');
    const successView = modal.querySelector('.discovery-success-view');

    let currentStep = 1;
    const totalSteps = 6;

    // Form data store
    const formData = {
        businessType: '',
        workflows: [],
        volume: '',
        tools: [],
        bottleneck: '',
        name: '',
        email: '',
        phone: '',
        company: ''
    };

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        currentStep = 1;
        showStep(1);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Option selections
    modal.querySelectorAll('.selectable-option').forEach(option => {
        option.addEventListener('click', () => {
            const stepEl = option.closest('.discovery-step');
            const isMulti = option.dataset.multi === 'true';

            if (isMulti) {
                option.classList.toggle('selected');
            } else {
                stepEl.querySelectorAll('.selectable-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            }
        });
    });

    function showStep(stepNum) {
        stepCards.forEach(card => {
            card.classList.toggle('active', parseInt(card.dataset.step, 10) === stepNum);
        });

        if (successView) successView.classList.remove('active');
        if (form) form.style.display = 'block';

        if (progressFill) progressFill.style.width = `${(stepNum / totalSteps) * 100}%`;
        if (stepIndicator) stepIndicator.textContent = `STEP 0${stepNum} OF 0${totalSteps}`;

        if (prevBtn) prevBtn.style.visibility = stepNum > 1 ? 'visible' : 'hidden';

        if (stepNum === totalSteps) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'inline-flex';
        } else {
            if (nextBtn) nextBtn.style.display = 'inline-flex';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }

    function validateCurrentStep() {
        const currentCard = modal.querySelector(`.discovery-step[data-step="${currentStep}"]`);
        if (!currentCard) return true;

        if (currentStep === 1) {
            const selected = currentCard.querySelector('.selectable-option.selected');
            if (!selected) {
                alert('Please select your business type to proceed.');
                return false;
            }
            formData.businessType = selected.dataset.value;
        } else if (currentStep === 2) {
            const selected = Array.from(currentCard.querySelectorAll('.selectable-option.selected')).map(el => el.dataset.value);
            if (selected.length === 0) {
                alert('Please select at least one workflow to automate.');
                return false;
            }
            formData.workflows = selected;
        } else if (currentStep === 3) {
            const selected = currentCard.querySelector('.selectable-option.selected');
            if (!selected) {
                alert('Please select your average monthly inquiry volume.');
                return false;
            }
            formData.volume = selected.dataset.value;
        } else if (currentStep === 4) {
            const selected = Array.from(currentCard.querySelectorAll('.selectable-option.selected')).map(el => el.dataset.value);
            formData.tools = selected.length > 0 ? selected : ['Spreadsheets / Manual'];
        } else if (currentStep === 5) {
            const selected = currentCard.querySelector('.selectable-option.selected');
            if (!selected) {
                alert('Please select your primary operational bottleneck.');
                return false;
            }
            formData.bottleneck = selected.dataset.value;
        } else if (currentStep === 6) {
            const name = modal.querySelector('#input-name')?.value.trim();
            const email = modal.querySelector('#input-email')?.value.trim();
            const phone = modal.querySelector('#input-phone')?.value.trim();
            const company = modal.querySelector('#input-company')?.value.trim();

            if (!name || !email || !phone) {
                alert('Please provide your name, business email, and WhatsApp phone.');
                return false;
            }
            formData.name = name;
            formData.email = email;
            formData.phone = phone;
            formData.company = company || 'Your Enterprise';
        }
        return true;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateCurrentStep()) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                }
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateCurrentStep()) return;

            // Display Success Screen with generated custom architecture
            if (form) form.style.display = 'none';
            if (prevBtn) prevBtn.style.visibility = 'hidden';
            if (submitBtn) submitBtn.style.display = 'none';
            if (stepIndicator) stepIndicator.textContent = 'SYSTEM ARCHITECTURE GENERATED';
            if (progressFill) progressFill.style.width = '100%';

            if (successView) {
                successView.innerHTML = `
                    <div class="success-icon-badge">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h2 class="success-headline">WE'VE GOT A SYSTEM TO BUILD.</h2>
                    <p class="success-sub">Blueprint generated for <strong>${formData.company}</strong> (${formData.businessType}).</p>

                    <div class="blueprint-preview-box">
                        <div class="bp-header">
                            <span class="bp-tag">PROPOSED AUTOMATION STACK</span>
                            <span class="bp-latency">&lt; 400ms TARGET LATENCY</span>
                        </div>
                        <div class="bp-pipeline-diagram">
                            <div class="bp-node">INCOMING (${formData.volume})</div>
                            <span class="bp-arrow">→</span>
                            <div class="bp-node bp-ai">WEBLOQ AI REASONING</div>
                            <span class="bp-arrow">→</span>
                            <div class="bp-node">AUTONOMOUS SYNC</div>
                        </div>
                        <div class="bp-specs">
                            <div><strong>Target Workflows:</strong> ${formData.workflows.join(', ')}</div>
                            <div><strong>Primary Target:</strong> Eliminate "${formData.bottleneck}"</div>
                            <div><strong>Connected Stack:</strong> ${formData.tools.join(' + ')}</div>
                        </div>
                    </div>

                    <div class="success-cta-box">
                        <p>Our senior automation engineer is reviewing your workflow inputs. We will message you on WhatsApp at <strong>${formData.phone}</strong> shortly.</p>
                        <a href="https://wa.me/917028288803?text=Hi%20WebloqAI%2C%20I%20just%20submitted%20the%20Automation%20Discovery%20form%20for%20${encodeURIComponent(formData.company)}" target="_blank" class="btn btn-primary btn-wa-direct">
                            Connect Directly on WhatsApp →
                        </a>
                    </div>
                `;
                successView.classList.add('active');
            }
        });
    }
}
