window.ElearningComponent = {
    async render() {
        return `
            <div class="about-page">
                <div class="about-banner" style="background-color: var(--mbp-green); background-size: cover; background-position: center;">
                    <div class="banner-overlay"></div>
                    <div class="banner-content">
                        <h1>E-Learning</h1>
                        <p>Digital Education Platforms</p>
                    </div>
                </div>
                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon green"><i data-lucide="laptop"></i></div>
                            <h2>Digital Resources</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>This page is currently under construction. The E-Learning hub will host digital courses, learning materials, and remote education resources.</p>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
};
