window.ParentsComponent = {
    async render() {
        return `
            <div class="about-page">
                <div class="about-banner" style="background-color: var(--mbp-green); background-size: cover; background-position: center; background-image: url('assets/slider/island.png');">
                    <div class="banner-overlay" style="background: rgba(10, 25, 47, 0.75);"></div>
                    <div class="banner-content">
                        <h1>Parents & Community</h1>
                        <p>Resources and Information for Parents and Guardians</p>
                    </div>
                </div>
                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon green"><i data-lucide="users"></i></div>
                            <h2>Parent & Citizen Associations</h2>
                        </div>
                        <div class="section-body text-content">
                            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">Parents play a crucial role in the educational development of our children. The Milne Bay Provincial Education Board encourages all parents to actively participate in their local school's Board of Management (BOM) and Parents and Citizens (P&C) associations.</p>
                            
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                                <div style="background: #fff; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid var(--mbp-green);">
                                    <h3 style="color: var(--mbp-green); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="book-open"></i> Supported Learning at Home</h3>
                                    <p style="color: var(--text-secondary);">Creating a supportive environment at home is essential for student success. Ensure your child has a quiet place to study and a regular routine for homework.</p>
                                </div>
                                <div style="background: #fff; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid var(--mbp-blue);">
                                    <h3 style="color: var(--mbp-blue); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="handshake"></i> School Governance</h3>
                                    <p style="color: var(--text-secondary);">School Boards of Management are responsible for the infrastructure and financial governance of schools. Engage with your local BOM to support community development.</p>
                                </div>
                                <div style="background: #fff; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border-top: 4px solid var(--mbp-gold);">
                                    <h3 style="color: var(--mbp-gold); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"><i data-lucide="wallet"></i> TFF Policy Information</h3>
                                    <p style="color: var(--text-secondary);">Learn about the Government's Tuition Fee Free (TFF) policy and how project fees are regulated within Milne Bay schools.</p>
                                </div>
                            </div>
                            
                            <div style="background: #f0f8ff; border: 1px solid #cce5ff; padding: 1.5rem; border-radius: 8px;">
                                <h3 style="color: var(--mbp-blue); margin-bottom: 1rem;">Contacting the Division</h3>
                                <p style="margin-bottom: 1rem;">For queries related to provincial education policies, teacher postings, or major disciplinary issues, please contact the Provincial Education Office via our <a href="#contact" style="color: var(--mbp-blue); font-weight: bold; text-decoration: underline;">Contact Page</a>.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
};
