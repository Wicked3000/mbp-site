window.CalendarComponent = {
    async render() {
        return `
            <div class="about-page">
                <div class="about-banner" style="background-color: var(--mbp-green); background-size: cover; background-position: center;">
                    <div class="banner-overlay"></div>
                    <div class="banner-content">
                        <h1>Academic Calendar</h1>
                        <p>Term Dates, Holidays, and Important Events</p>
                    </div>
                </div>
                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon green"><i data-lucide="calendar"></i></div>
                            <h2>Provincial School Calendar</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>This page is currently under construction. The official academic calendar for schools in Milne Bay Province will be published here.</p>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
};
