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
                            <form id="contactForm" onsubmit="event.preventDefault(); alert('Message sent successfully!');">
                                <div class="form-group">
                                    <input type="text" placeholder="Enter Your Name *" required>
                                </div>
                                <div class="form-group">
                                    <input type="email" placeholder="Enter Your Email *" required>
                                </div>
                                <div class="form-group">
                                    <textarea placeholder="Enter Your Message *" required></textarea>
                                </div>
                                <button type="submit" class="btn-send">Send Us <i data-lucide="arrow-right"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
