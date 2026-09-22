window.NewsComponent = {
    _cache: [],

    async render() {
        const detailId = NewsComponent.getDetailId();
        if (detailId !== null) {
            const data = await this.fetchNews();
            const item = data.find((n) => Number(n.id) === Number(detailId));
            if (item) return NewsComponent.renderDetail(item);
        }

        this._cache = await this.fetchNews();
        const latest = this._cache.slice(0, 3);
        const archives = this._cache.slice(3);

        const latestNews = await this.fetchLatestNews();
        let tickerHtml = '';
        if (latestNews.length) {
            const loopItems = [];
            const copies = Math.max(1, Math.ceil(4 / latestNews.length));
            for (let c = 0; c < copies; c++) {
                for (const li of latestNews) {
                    if (li.is_external) {
                        loopItems.push(`<a class="ticker-item" href="${escapeHtml(li.external_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(li.title)}</a>`);
                    } else if (li.news_id) {
                        loopItems.push(`<a class="ticker-item" href="/news/${li.news_id}" data-link>${escapeHtml(li.title)}</a>`);
                    } else {
                        loopItems.push(`<span class="ticker-item">${escapeHtml(li.title)}</span>`);
                    }
                }
            }
            const joined = loopItems.join('');
            tickerHtml = `<div class="ticker-group">${joined}</div><div class="ticker-group">${joined}</div>`;
        } else {
            tickerHtml = `
                <div class="ticker-group">
                    <span class="ticker-item">ALL SCHOOLS: Term 3 Commences on 15 Jun 2026</span>
                    <span class="ticker-item">NEW DIRECTIVE: PEB Resolutions finalized for upcoming academic year</span>
                    <span class="ticker-item">REMINDER: Grade 10 Mock Exams begin next week</span>
                </div>
                <div class="ticker-group">
                    <span class="ticker-item">ALL SCHOOLS: Term 3 Commences on 15 Jun 2026</span>
                    <span class="ticker-item">NEW DIRECTIVE: PEB Resolutions finalized for upcoming academic year</span>
                    <span class="ticker-item">REMINDER: Grade 10 Mock Exams begin next week</span>
                </div>`;
        }

        const cardHtml = (n) => {
            const img = n.image_url || 'https://placehold.co/600x400/eeeeee/999999?text=MBP+News';
            return `
                <div class="news-card">
                    <img src="${escapeHtml(img)}" alt="${escapeHtml(n.title)}" class="news-thumbnail">
                    <div class="news-card-content">
                        <div class="news-date">${escapeHtml(formatNewsDate(n.published_at))}</div>
                        <h3>${escapeHtml(n.title)}</h3>
                        <p>${escapeHtml(n.summary || n.body)}</p>
                        <a href="/news/${n.id}" data-link class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                    </div>
                </div>`;
        };

        const archivesHtml = archives.length
            ? `
                <!-- Old News / Archives Section -->
                <section class="news-main-section" style="margin-top: 5rem;">
                    <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-secondary); text-align: left;">Old News / Archives</h2>
                    <p class="section-subtitle" style="margin-bottom: 2rem; text-align: left; margin-left: 0; max-width: none;">Past announcements and historical records.</p>
                    <div class="news-grid" style="opacity: 0.85;">
                        ${archives.map(cardHtml).join('')}
                    </div>
                </section>`
            : '';

        return `
            <div class="hero-slider-container" style="height: 400px; margin-top: 0;">
                <div class="hero-slide active" style="background-image: url('assets/slider/island.png'); background-position: center 30%;">
                    <div class="hero-content">
                        <h1>Provincial Sports Carnival</h1>
                        <p>Schools across the province gather for the annual athletics meet.</p>
                    </div>
                </div>
                <div class="hero-slide" style="background-image: url('assets/slider/school.png'); background-position: center 30%;">
                    <div class="hero-content">
                        <h1>Teachers Workshop 2026</h1>
                        <p>Upskilling our educators with modern teaching methodologies.</p>
                    </div>
                </div>
                <div class="hero-slide" style="background-image: url('assets/slider/culture.png'); background-position: center 30%;">
                    <div class="hero-content">
                        <h1>New TVET Facilities Launched</h1>
                        <p>Expanding vocational training opportunities in rural districts.</p>
                    </div>
                </div>
                
                <button class="slider-btn prev-btn" aria-label="Previous Slide"><i data-lucide="chevron-left"></i></button>
                <button class="slider-btn next-btn" aria-label="Next Slide"><i data-lucide="chevron-right"></i></button>
                
                <div class="slider-dots">
                    <div class="dot active" data-slide="0"></div>
                    <div class="dot" data-slide="1"></div>
                    <div class="dot" data-slide="2"></div>
                </div>
            </div>

            <!-- News Ticker -->
            <div class="news-ticker-container">
                <div class="ticker-label">NEWS</div>
                <div class="ticker-wrap">
                    <div class="ticker-move">
                        ${tickerHtml}
                    </div>
                </div>
            </div>

            <div class="news-page-content" style="max-width: 1200px; margin: 4rem auto; padding: 0 2rem;">
                
                <!-- Latest News Section -->
                <section id="latest-news" class="news-main-section">
                    <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--mbp-blue-dark); text-align: left;">Latest News</h2>
                    <p class="section-subtitle" style="margin-bottom: 2rem; text-align: left; margin-left: 0; max-width: none;">The most recent updates from the Division of Education.</p>
                    
                    <div class="news-grid">
                        ${latest.length ? latest.map(cardHtml).join('') : defaultNewsCards()}
                    </div>
                </section>

                ${archivesHtml}
            </div>
        `;
    },

    getDetailId() {
        const match = window.location.pathname.match(/^\/news\/(\d+)$/);
        return match ? Number(match[1]) : null;
    },

    renderDetail(item) {
        const img = item.image_url || 'https://placehold.co/1200x500/eeeeee/999999?text=MBP+News';
        const story = (item.full_story || item.summary || item.body || '')
            .split(/\n{2,}/)
            .filter((p) => p.trim())
            .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
            .join('');

        return `
            <div class="news-page-content" style="max-width: 860px; margin: 3rem auto; padding: 0 2rem;">
                <a href="/news" data-link class="back-to-news"><i data-lucide="arrow-left"></i> Back to All News</a>

                <article class="news-article">
                    <div class="news-date">${escapeHtml(formatNewsDate(item.published_at))}</div>
                    <h1 class="news-article-title">${escapeHtml(item.title)}</h1>

                    <div class="news-article-img-wrap">
                        <img src="${escapeHtml(img)}" alt="${escapeHtml(item.title)}">
                    </div>

                    <div class="news-article-story">
                        ${story || `<p>${escapeHtml(item.summary || item.body)}</p>`}
                    </div>

                    <div class="news-article-footer">
                        <a href="/news" data-link class="read-more"><i data-lucide="arrow-left"></i> Back to All News</a>
                    </div>
                </article>
            </div>
        `;
    },

    async fetchNews() {
        try {
            const res = await fetch('/api/news');
            if (!res.ok) throw new Error('News fetch failed');
            const data = await res.json();
            if (Array.isArray(data)) return data;
            return [];
        } catch (error) {
            console.warn('News page: falling back to static content.', error);
            return [];
        }
    },

    async fetchLatestNews() {
        try {
            const res = await fetch('/api/latest-news');
            if (!res.ok) throw new Error('Latest news fetch failed');
            const data = await res.json();
            if (Array.isArray(data)) return data.slice(0, 4);
            return [];
        } catch (error) {
            console.warn('Latest news ticker: falling back to static content.', error);
            return [];
        }
    },

    afterRender() {
        // --- Slider Logic (list page only) ---
        const slides = document.querySelectorAll('.hero-slider-container .hero-slide');
        const dots = document.querySelectorAll('.hero-slider-container .dot');
        const prevBtn = document.querySelector('.hero-slider-container .prev-btn');
        const nextBtn = document.querySelector('.hero-slider-container .next-btn');
        let currentSlide = 0;
        let slideInterval;

        function goToSlide(n) {
            if(!slides.length) return;
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }

        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startAutoSlide();
        }

        if (nextBtn && slides.length) {
            nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
            prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                    resetInterval();
                });
            });

            startAutoSlide();
        }
    }
};

function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function formatNewsDate(d) {
    const date = new Date(d);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function defaultNewsCards() {
    return `
        <div class="news-card">
            <img src="https://placehold.co/600x400/eeeeee/999999?text=News+Thumbnail" alt="News Thumbnail" class="news-thumbnail">
            <div class="news-card-content">
                <div class="news-date">15 Jun 2026</div>
                <h3>Term 3 Commences Soon</h3>
                <p>All primary and secondary schools across the province are preparing for the start of Term 3. Teachers are advised to review the updated syllabus materials.</p>
                <a href="/news" data-link class="read-more">Read More <i data-lucide="arrow-right"></i></a>
            </div>
        </div>`;
}