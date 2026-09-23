window.JobsComponent = {
    async render() {
        return `
            <div class="about-page">
                <div class="about-banner" style="background-color: var(--mbp-gold); background-size: cover; background-position: center; background-image: url('assets/slider/school.png');">
                    <div class="banner-overlay" style="background: rgba(10, 25, 47, 0.75);"></div>
                    <div class="banner-content">
                        <h1>Job Vacancies</h1>
                        <p>Join the Education Team in Milne Bay Province</p>
                    </div>
                </div>
                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon gold"><i data-lucide="briefcase"></i></div>
                            <h2>Current Opportunities</h2>
                        </div>
                        <div class="section-body text-content">
                            <div class="notice-item" style="border-left: 4px solid var(--mbp-gold); padding: 1.5rem; background: #fff; margin-bottom: 1.5rem; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                <h3 style="color: var(--mbp-blue); margin-bottom: 0.5rem;">Senior Secondary Teachers (Science & Math)</h3>
                                <p style="color: var(--text-secondary); margin-bottom: 1rem;">Multiple positions available for qualified science and mathematics teachers at Cameron Secondary School and Hagita Secondary School. Full boarding provided.</p>
                                <div style="display: flex; gap: 1rem; align-items: center;">
                                    <span style="font-size: 0.8rem; background: #f0f0f0; padding: 0.3rem 0.6rem; border-radius: 4px; color: #666;"><i data-lucide="map-pin" style="width: 14px; height: 14px; vertical-align: middle;"></i> Alotau District</span>
                                    <span style="font-size: 0.8rem; background: #f0f0f0; padding: 0.3rem 0.6rem; border-radius: 4px; color: #666;"><i data-lucide="clock" style="width: 14px; height: 14px; vertical-align: middle;"></i> Closes: 30 Aug 2026</span>
                                </div>
                            </div>
                            <div class="notice-item" style="border-left: 4px solid var(--mbp-gold); padding: 1.5rem; background: #fff; margin-bottom: 1.5rem; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                <h3 style="color: var(--mbp-blue); margin-bottom: 0.5rem;">Provincial Education Coordinator</h3>
                                <p style="color: var(--text-secondary); margin-bottom: 1rem;">Oversee educational programs and facilitate administrative support for primary schools in the island districts. Requires travel and a minimum of 5 years administrative experience.</p>
                                <div style="display: flex; gap: 1rem; align-items: center;">
                                    <span style="font-size: 0.8rem; background: #f0f0f0; padding: 0.3rem 0.6rem; border-radius: 4px; color: #666;"><i data-lucide="map-pin" style="width: 14px; height: 14px; vertical-align: middle;"></i> Provincial HQ, Alotau</span>
                                    <span style="font-size: 0.8rem; background: #f0f0f0; padding: 0.3rem 0.6rem; border-radius: 4px; color: #666;"><i data-lucide="clock" style="width: 14px; height: 14px; vertical-align: middle;"></i> Closes: 15 Sep 2026</span>
                                </div>
                            </div>
                            <p style="margin-top: 2rem; text-align: center; color: var(--text-secondary);">To apply, please submit your CV and cover letter to <strong>hr@mbp.education.gov.pg</strong> or visit the Provincial Education Office in Alotau.</p>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
};
