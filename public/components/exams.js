window.ExamsComponent = {
    async render() {
        return `
            <div class="about-page">
                <div class="about-banner" style="background-color: var(--mbp-blue); background-size: cover; background-position: center; background-image: url('assets/slider/culture.png');">
                    <div class="banner-overlay" style="background: rgba(10, 25, 47, 0.75);"></div>
                    <div class="banner-content">
                        <h1>Exam Results & Info</h1>
                        <p>National and Provincial Examination Information</p>
                    </div>
                </div>
                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon blue"><i data-lucide="award"></i></div>
                            <h2>Examination Information Center</h2>
                        </div>
                        <div class="section-body text-content">
                            <div style="background: #e6f2ff; border: 1px solid #b3d7ff; border-radius: 8px; padding: 2rem; text-align: center; margin-bottom: 2rem;">
                                <h3 style="color: var(--mbp-blue); margin-bottom: 1rem;"><i data-lucide="info" style="vertical-align: middle; margin-right: 0.5rem;"></i>2026 Exam Results Pending</h3>
                                <p style="color: #333; margin-bottom: 1.5rem;">The Grade 8, Grade 10, and Grade 12 National Examination results for the 2026 academic year have not yet been released by the National Department of Education (NDOE).</p>
                                <p style="font-size: 0.9rem; color: #555;">Results are typically published in December. Students will need their Candidate Number to access results once available.</p>
                            </div>
                            
                            <h3 style="color: var(--mbp-blue); margin-top: 2rem; margin-bottom: 1rem;">Examination Schedules</h3>
                            <ul style="list-style-type: none; padding: 0;">
                                <li style="background: #fff; border: 1px solid #eee; padding: 1rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                                    <strong>Grade 8 National Examinations</strong>
                                    <span style="color: var(--mbp-green);">Oct 2026 (TBA)</span>
                                </li>
                                <li style="background: #fff; border: 1px solid #eee; padding: 1rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                                    <strong>Grade 10 Written Expression</strong>
                                    <span style="color: var(--mbp-green);">Jun 2026 (TBA)</span>
                                </li>
                                <li style="background: #fff; border: 1px solid #eee; padding: 1rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                                    <strong>Grade 10 National Examinations</strong>
                                    <span style="color: var(--mbp-green);">Oct 2026 (TBA)</span>
                                </li>
                                <li style="background: #fff; border: 1px solid #eee; padding: 1rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                                    <strong>Grade 12 Written Expression</strong>
                                    <span style="color: var(--mbp-green);">Aug 2026 (TBA)</span>
                                </li>
                                <li style="background: #fff; border: 1px solid #eee; padding: 1rem; border-radius: 4px; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                                    <strong>Grade 12 National Examinations</strong>
                                    <span style="color: var(--mbp-green);">Oct 2026 (TBA)</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
};
