window.JobsComponent = {
    async render() {
        return `
            <div class="about-page">
                <div class="about-banner" style="background-color: var(--mbp-gold); background-size: cover; background-position: center;">
                    <div class="banner-overlay"></div>
                    <div class="banner-content">
                        <h1>Job Vacancies</h1>
                        <p>Career Opportunities in Education</p>
                    </div>
                </div>
                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon gold"><i data-lucide="briefcase"></i></div>
                            <h2>Current Opportunities</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>This page is currently under construction. Teaching and administrative job vacancies within Milne Bay Province will be listed here.</p>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
};
