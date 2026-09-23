window.CalendarComponent = {
    async render() {
        return `
            <div class="about-page">
                <div class="about-banner" style="background-color: var(--mbp-green); background-size: cover; background-position: center; background-image: url('assets/slider/island.png');">
                    <div class="banner-overlay" style="background: rgba(10, 25, 47, 0.75);"></div>
                    <div class="banner-content">
                        <h1>Academic Calendar 2026</h1>
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
                            <table class="data-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
                                <thead>
                                    <tr>
                                        <th style="background: var(--mbp-green); color: white; padding: 1rem; text-align: left;">Term / Event</th>
                                        <th style="background: var(--mbp-green); color: white; padding: 1rem; text-align: left;">Start Date</th>
                                        <th style="background: var(--mbp-green); color: white; padding: 1rem; text-align: left;">End Date</th>
                                        <th style="background: var(--mbp-green); color: white; padding: 1rem; text-align: left;">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="border-bottom: 1px solid #eee;">
                                        <td style="padding: 1rem; font-weight: bold;">Term 1</td>
                                        <td style="padding: 1rem;">26 Jan 2026</td>
                                        <td style="padding: 1rem;">10 Apr 2026</td>
                                        <td style="padding: 1rem;">11 Weeks</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #eee; background-color: #f9f9f9;">
                                        <td style="padding: 1rem; font-style: italic;">Term 1 Holiday</td>
                                        <td style="padding: 1rem;">13 Apr 2026</td>
                                        <td style="padding: 1rem;">17 Apr 2026</td>
                                        <td style="padding: 1rem;">1 Week</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #eee;">
                                        <td style="padding: 1rem; font-weight: bold;">Term 2</td>
                                        <td style="padding: 1rem;">20 Apr 2026</td>
                                        <td style="padding: 1rem;">26 Jun 2026</td>
                                        <td style="padding: 1rem;">10 Weeks</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #eee; background-color: #f9f9f9;">
                                        <td style="padding: 1rem; font-style: italic;">Term 2 Holiday</td>
                                        <td style="padding: 1rem;">29 Jun 2026</td>
                                        <td style="padding: 1rem;">10 Jul 2026</td>
                                        <td style="padding: 1rem;">2 Weeks</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #eee;">
                                        <td style="padding: 1rem; font-weight: bold;">Term 3</td>
                                        <td style="padding: 1rem;">13 Jul 2026</td>
                                        <td style="padding: 1rem;">18 Sep 2026</td>
                                        <td style="padding: 1rem;">10 Weeks</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #eee; background-color: #f9f9f9;">
                                        <td style="padding: 1rem; font-style: italic;">Term 3 Holiday</td>
                                        <td style="padding: 1rem;">21 Sep 2026</td>
                                        <td style="padding: 1rem;">25 Sep 2026</td>
                                        <td style="padding: 1rem;">1 Week</td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid #eee;">
                                        <td style="padding: 1rem; font-weight: bold;">Term 4</td>
                                        <td style="padding: 1rem;">28 Sep 2026</td>
                                        <td style="padding: 1rem;">11 Dec 2026</td>
                                        <td style="padding: 1rem;">11 Weeks</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="margin-top: 2rem; display: flex; justify-content: center;">
                                <a href="assets/downloads/calendar_2026.pdf" target="_blank" class="download-btn" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.5rem; background: var(--mbp-green); color: white; padding: 0.8rem 1.5rem; border-radius: 6px; font-weight: bold;"><i data-lucide="download"></i> Download Full Calendar (PDF)</a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }
};
