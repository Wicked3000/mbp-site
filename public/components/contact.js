window.ContactComponent = {
    async render() {
        return `
            <div class="contact-page-wrapper">
                <div class="contact-overlay"></div>
                <div class="contact-container">
                    <div class="contact-info-col">
                        <h2>Have Any Questions?</h2>
                        <p>Reach out to the Milne Bay Province Division of Education for inquiries regarding our programs, school policies, teacher deployments, or general assistance. We are here to help our community.</p>
                        
                        <div class="contact-details">
                            <div class="contact-item">
                                <i data-lucide="smartphone"></i>
                                <span>(+675) 6410603 / (+675) 6411305</span>
                            </div>
                            <div class="contact-item">
                                <i data-lucide="mail"></i>
                                <span>support@mbp.education.gov.pg</span>
                            </div>
                            <div class="contact-item">
                                <i data-lucide="map-pin"></i>
                                <span>Milne Bay Division of Education<br>Free Mail Bag, Alotau<br>Milne Bay Province, Papua New Guinea</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="contact-form-col">
                        <div class="contact-form-card">
                            <form id="contactForm">
                                <div id="formMessage" style="margin-bottom: 1rem; padding: 10px; border-radius: 5px; display: none;"></div>
                                <div class="form-group">
                                    <input type="text" id="contactName" placeholder="Enter Your Name *" required>
                                </div>
                                <div class="form-group">
                                    <input type="email" id="contactEmail" placeholder="Enter Your Email *" required>
                                </div>
                                <div class="form-group">
                                    <input type="tel" id="contactPhone" placeholder="Enter Your Phone Number (e.g. +675 1234 5678) *" required>
                                </div>
                                <div class="form-group">
                                    <textarea id="contactMsg" placeholder="Enter Your Message *" required></textarea>
                                </div>
                                <button type="submit" class="btn-send" id="btnSubmit">Send Us <i data-lucide="arrow-right"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        const btnSubmit = document.getElementById('btnSubmit');

        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const name = document.getElementById('contactName').value;
                const email = document.getElementById('contactEmail').value;
                const phone = document.getElementById('contactPhone').value.trim();
                const message = document.getElementById('contactMsg').value;

                const validPhone = /^[0-9+\-() ]{7,20}$/.test(phone) && (phone.match(/[0-9]/g) || []).length >= 7;
                if (!validPhone) {
                    formMessage.style.display = 'block';
                    formMessage.style.backgroundColor = '#f8d7da';
                    formMessage.style.color = '#721c24';
                    formMessage.textContent = 'Please enter a valid phone number (at least 7 digits).';
                    return;
                }
                
                btnSubmit.disabled = true;
                btnSubmit.innerHTML = 'Sending... <i data-lucide="loader" class="spin"></i>';
                if(window.lucide) lucide.createIcons();

                try {
                    const response = await fetch('/api/submit-contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email, phone, message })
                    });
                    
                    const result = await response.json();
                    
                    if (response.ok) {
                        formMessage.style.display = 'block';
                        formMessage.style.backgroundColor = '#d4edda';
                        formMessage.style.color = '#155724';
                        formMessage.textContent = 'Message sent successfully!';
                        contactForm.reset();
                    } else {
                        throw new Error(result.message || 'Error submitting form');
                    }
                } catch (error) {
                    formMessage.style.display = 'block';
                    formMessage.style.backgroundColor = '#f8d7da';
                    formMessage.style.color = '#721c24';
                    formMessage.textContent = 'Failed to send message: ' + error.message;
                } finally {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = 'Send Us <i data-lucide="arrow-right"></i>';
                    if(window.lucide) lucide.createIcons();
                }
            });
        }
    }
};
