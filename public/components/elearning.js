window.ElearningComponent = {
    async render() {
        return `
            <div class="about-page">
                <div class="about-banner" style="background-color: var(--mbp-blue); background-size: cover; background-position: center; background-image: url('assets/slider/school.png');">
                    <div class="banner-overlay" style="background: rgba(10, 25, 47, 0.75);"></div>
                    <div class="banner-content">
                        <h1>E-Learning Portal</h1>
                        <p>Digital Resources and Remote Learning Initiatives</p>
                    </div>
                </div>
                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon blue"><i data-lucide="laptop"></i></div>
                            <h2>Digital Education in Milne Bay</h2>
                        </div>
                        <div class="section-body text-content">
                            <div style="background: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center; margin-bottom: 3rem;">
                                <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: #f0f4ff; border-radius: 50%; color: var(--mbp-blue); margin-bottom: 1.5rem;">
                                    <i data-lucide="rocket" style="width: 40px; height: 40px;"></i>
                                </div>
                                <h3 style="color: var(--mbp-blue); font-size: 1.5rem; margin-bottom: 1rem;">E-Learning Portal Coming Soon</h3>
                                <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto; line-height: 1.6;">The Milne Bay Provincial Education Division is currently developing a digital learning repository to provide students and teachers with access to curriculum materials, past exam papers, and educational videos.</p>
                            </div>
                            
                            <h3 style="color: var(--mbp-blue); margin-bottom: 1.5rem; text-align: center;">Planned Digital Resources</h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                                <div style="background: #fafafa; border: 1px solid #eaeaea; padding: 1.5rem; border-radius: 8px; text-align: center;">
                                    <i data-lucide="book" style="color: var(--mbp-green); width: 32px; height: 32px; margin-bottom: 1rem;"></i>
                                    <h4 style="margin-bottom: 0.5rem;">Digital Textbooks</h4>
                                    <p style="font-size: 0.9rem; color: #666;">Access to NDOE approved curriculum materials and teacher guides.</p>
                                </div>
                                <div style="background: #fafafa; border: 1px solid #eaeaea; padding: 1.5rem; border-radius: 8px; text-align: center;">
                                    <i data-lucide="video" style="color: var(--mbp-gold); width: 32px; height: 32px; margin-bottom: 1rem;"></i>
                                    <h4 style="margin-bottom: 0.5rem;">Video Lessons</h4>
                                    <p style="font-size: 0.9rem; color: #666;">Recorded lesson segments for Science, Math, and English core subjects.</p>
                                </div>
                                <div style="background: #fafafa; border: 1px solid #eaeaea; padding: 1.5rem; border-radius: 8px; text-align: center;">
                                    <i data-lucide="file-check" style="color: var(--mbp-blue); width: 32px; height: 32px; margin-bottom: 1rem;"></i>
                                    <h4 style="margin-bottom: 0.5rem;">Past Papers</h4>
                                    <p style="font-size: 0.9rem; color: #666;">Archive of Grade 8, 10, and 12 national examination papers for revision.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
};
