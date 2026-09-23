window.PolicyComponent = {
    async render() {
        const escapeHtml = (str) =>
            String(str == null ? '' : str).replace(/[&<>"']/g, (c) => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            }[c]));

        let policiesHtml = '';
        try {
            const [catRes, docRes] = await Promise.all([
                fetch('/api/policies?type=categories'),
                fetch('/api/policies')
            ]);
            
            if (catRes.ok && docRes.ok) {
                const categories = await catRes.json();
                const docs = await docRes.json();
                
                policiesHtml = categories.map(cat => {
                    const catDocs = docs.filter(d => Number(d.category_id) === Number(cat.id) && d.active);
                    if (catDocs.length === 0) return '';
                    
                    return `
                        <div class="policy-category" style="margin-bottom: 2.5rem;">
                            <h3 style="color: var(--mbp-blue); font-size: 1.25rem; margin-bottom: 0.5rem; border-bottom: 2px solid var(--mbp-gold); padding-bottom: 0.5rem;">${escapeHtml(cat.name)}</h3>
                            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${escapeHtml(cat.description)}</p>
                            <div class="resource-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; display: grid;">
                                ${catDocs.map(doc => `
                                    <div class="resource-card" style="text-align: left; padding: 1.5rem; border-top: 4px solid var(--mbp-green); display: flex; flex-direction: column; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                                        ${doc.thumbnail_url ? `<img src="${escapeHtml(doc.thumbnail_url)}" alt="Thumbnail" style="width:100%; height:140px; object-fit:cover; border-radius:4px; margin-bottom:1rem; border: 1px solid #eee;">` : `<i data-lucide="file-text" style="color: var(--mbp-green); width: 32px; height: 32px; margin-bottom: 1rem;"></i>`}
                                        <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--mbp-blue);">${escapeHtml(doc.title)}</h4>
                                        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; flex-grow: 1; line-height: 1.4;">${escapeHtml(doc.description)}</p>
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; border-top: 1px solid #eee; padding-top: 1rem;">
                                            <span style="font-size: 0.75rem; color: #888; font-weight: 500;">${escapeHtml(doc.file_size)} • ${escapeHtml(doc.file_type)}</span>
                                            <a href="${escapeHtml(doc.document_url)}" target="_blank" class="download-btn" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.5rem; background: var(--mbp-blue); color: white; padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.85rem; font-weight: bold;"><i data-lucide="download" style="width:14px; height:14px;"></i> Download</a>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('');
            }
        } catch (error) {
            console.error("Failed to load policies", error);
            policiesHtml = `<p>Failed to load policy documents. Please try again later.</p>`;
        }
        
        if (!policiesHtml.trim()) {
            policiesHtml = `<p>No policy documents are currently available.</p>`;
        }

        return `
            <div class="about-page">
                <div class="about-banner" style="background-color: var(--mbp-blue); background-size: cover; background-position: center; background-image: url('assets/slider/school.png');">
                    <div class="banner-overlay" style="background: rgba(10, 25, 47, 0.75);"></div>
                    <div class="banner-content">
                        <h1>Policy Documents</h1>
                        <p>Educational Guidelines and Frameworks for Milne Bay Province</p>
                    </div>
                </div>
                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon blue"><i data-lucide="file-text"></i></div>
                            <h2>Official Policies</h2>
                        </div>
                        <div class="section-body text-content">
                            ${policiesHtml}
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
};
