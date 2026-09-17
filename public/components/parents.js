window.ParentsComponent = {
    async render() {
        return `
            <div class="about-page">
                <div class="about-banner" style="background-color: var(--mbp-blue); background-size: cover; background-position: center;">
                    <div class="banner-overlay"></div>
                    <div class="banner-content">
                        <h1>Parent Portal</h1>
                        <p>Information and Resources for Parents</p>
                    </div>
                </div>
                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon blue"><i data-lucide="users"></i></div>
                            <h2>Welcome Parents</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>This page is currently under construction. The Parent Portal will provide direct access to student progress, notices, and resources for guardians.</p>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
};
