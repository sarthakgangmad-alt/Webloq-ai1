/**
 * WebloqAI — Premium Consulting Intake Form
 * 
 * 6-Step Clean Qualification Funnel:
 * 01 / 06 Business Type
 * 02 / 06 Automation Targets
 * 03 / 06 Current Software Tools
 * 04 / 06 Monthly Enquiry Volume
 * 05 / 06 Operational Bottleneck
 * 06 / 06 Contact Details
 */

export function initDiscoveryForm() {
    const modal = document.getElementById('consulting-modal');
    if (!modal) return;

    const openBtns = document.querySelectorAll('[data-open-discovery]');
    const closeBtn = modal.querySelector('.modal-close');
    const form = modal.querySelector('#consulting-form');
    const steps = modal.querySelectorAll('.form-step-card');
    const progressText = modal.querySelector('.form-progress-indicator');
    const progressBar = modal.querySelector('.progress-bar-fill');
    const prevBtn = modal.querySelector('.btn-form-prev');
    const nextBtn = modal.querySelector('.btn-form-next');
    const submitBtn = modal.querySelector('.btn-form-submit');
    const successView = modal.querySelector('.form-success-container');

    let currentStep = 1;
    const totalSteps = 6;

    const formData = {
        businessType: '',
        workflows: [],
        tools: [],
        volume: '',
        bottleneck: '',
        name: '',
        company: '',
        email: '',
        phone: ''
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

    // Handle Option Selection
    modal.querySelectorAll('.form-choice-btn').forEach(choice => {
        choice.addEventListener('click', () => {
            const stepEl = choice.closest('.form-step-card');
            const isMulti = choice.dataset.multi === 'true';

            if (isMulti) {
                choice.classList.toggle('selected');
            } else {
                stepEl.querySelectorAll('.form-choice-btn').forEach(c => c.classList.remove('selected'));
                choice.classList.add('selected');
            }
        });
    });

    function showStep(stepNum) {
        steps.forEach(card => {
            card.classList.toggle('active', parseInt(card.dataset.step, 10) === stepNum);
        });

        if (successView) successView.classList.remove('active');
        if (form) form.style.display = 'block';

        if (progressText) progressText.textContent = `Step 0${stepNum} of 0${totalSteps}`;
        if (progressBar) progressBar.style.width = `${(stepNum / totalSteps) * 100}%`;

        if (prevBtn) prevBtn.style.visibility = stepNum > 1 ? 'visible' : 'hidden';

        if (stepNum === totalSteps) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'inline-flex';
        } else {
            if (nextBtn) nextBtn.style.display = 'inline-flex';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }

    function validateStep() {
        const stepCard = modal.querySelector(`.form-step-card[data-step="${currentStep}"]`);
        if (!stepCard) return true;

        if (currentStep === 1) {
            const selected = stepCard.querySelector('.form-choice-btn.selected');
            if (!selected) {
                alert('Please select your business type.');
                return false;
            }
            formData.businessType = selected.dataset.value;
        } else if (currentStep === 2) {
            const selected = Array.from(stepCard.querySelectorAll('.form-choice-btn.selected')).map(c => c.dataset.value);
            if (selected.length === 0) {
                alert('Please choose at least one workflow to automate.');
                return false;
            }
            formData.workflows = selected;
        } else if (currentStep === 3) {
            const selected = Array.from(stepCard.querySelectorAll('.form-choice-btn.selected')).map(c => c.dataset.value);
            formData.tools = selected.length > 0 ? selected : ['Standard tools / Spreadsheets'];
        } else if (currentStep === 4) {
            const selected = stepCard.querySelector('.form-choice-btn.selected');
            if (!selected) {
                alert('Please select your monthly inquiry volume.');
                return false;
            }
            formData.volume = selected.dataset.value;
        } else if (currentStep === 5) {
            const selected = stepCard.querySelector('.form-choice-btn.selected');
            if (!selected) {
                alert('Please select your primary operational friction point.');
                return false;
            }
            formData.bottleneck = selected.dataset.value;
        } else if (currentStep === 6) {
            const name = modal.querySelector('#clean-name')?.value.trim();
            const email = modal.querySelector('#clean-email')?.value.trim();
            const phone = modal.querySelector('#clean-phone')?.value.trim();
            const company = modal.querySelector('#clean-company')?.value.trim();

            if (!name || !email || !phone) {
                alert('Please enter your name, email, and WhatsApp number.');
                return false;
            }
            formData.name = name;
            formData.email = email;
            formData.phone = phone;
            formData.company = company || 'Your Company';
        }
        return true;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateStep()) {
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
            if (!validateStep()) return;

            form.style.display = 'none';
            if (prevBtn) prevBtn.style.visibility = 'hidden';
            if (submitBtn) submitBtn.style.display = 'none';
            if (progressText) progressText.textContent = 'Intake Completed';
            if (progressBar) progressBar.style.width = '100%';

            if (successView) {
                successView.innerHTML = `
                    <div class="success-icon-check">✓</div>
                    <h3 class="success-title">Thank You, ${formData.name}.</h3>
                    <p class="success-subtitle">
                        We have received your details for <strong>${formData.company}</strong> (${formData.businessType}).
                    </p>

                    <div class="success-summary-box">
                        <div class="sum-row">
                            <span class="sum-lbl">Target Workflows</span>
                            <span class="sum-val">${formData.workflows.join(', ')}</span>
                        </div>
                        <div class="sum-row">
                            <span class="sum-lbl">Primary Bottleneck</span>
                            <span class="sum-val">${formData.bottleneck}</span>
                        </div>
                        <div class="sum-row">
                            <span class="sum-lbl">Monthly Volume</span>
                            <span class="sum-val">${formData.volume}</span>
                        </div>
                    </div>

                    <p class="success-next-step">
                        Our lead automation engineer will review your workflow parameters and message you directly on WhatsApp at <strong>${formData.phone}</strong>.
                    </p>

                    <div class="success-action-row">
                        <a href="https://wa.me/917028288803?text=Hi%20WebloqAI%2C%20I%20just%20submitted%20a%20consultation%20intake%20for%20${encodeURIComponent(formData.company)}" target="_blank" class="btn btn-primary">
                            Chat on WhatsApp Directly →
                        </a>
                    </div>
                `;
                successView.classList.add('active');
            }
        });
    }
}
