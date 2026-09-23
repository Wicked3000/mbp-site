window.NewsComponent = {
    _cache: [],

    async render() {
        const detailId = NewsComponent.getDetailId();
        const banners = await this.fetchNewsBanners();

        if (detailId !== null) {
            const data = await this.fetchNews();
            const item = data.find((n) => Number(n.id) === Number(detailId));
            if (item) return NewsComponent.renderDetail(item, banners);
        }

        this._cache = await this.fetchNews();
        const latest = this._cache.slice(0, 3);
        const archives = this._cache.slice(3);

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
                <section class="about-section" style="border-left-color: var(--text-secondary);">
                    <div class="section-header">
                        <div class="section-icon gold"><i data-lucide="archive"></i></div>
                        <h2>Old News / Archives</h2>
                    </div>
                    <div class="section-body text-content">
                        <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 1.05rem;">Past announcements and historical records.</p>
                        <div class="news-grid" style="opacity: 0.85;">
                            ${archives.map(cardHtml).join('')}
                        </div>
                    </div>
                </section>`
            : '';

        return `
            <div class="about-page">
                ${this.renderNewsBanner(banners)}

                <div class="about-content-wrapper">
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon blue"><i data-lucide="newspaper"></i></div>
                            <h2>Latest News</h2>
                        </div>
                        <div class="section-body text-content">
                            <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 1.05rem;">The most recent updates from the Milne Bay Province Division of Education.</p>
                            <div class="news-grid">
                                ${latest.length ? latest.map(cardHtml).join('') : defaultNewsCards()}
                            </div>
                        </div>
                    </section>

                    ${archivesHtml}
                </div>
            </div>
        `;
    },

    getDetailId() {
        const match = window.location.pathname.match(/^\/news\/(\d+)$/);
        return match ? Number(match[1]) : null;
    },

    renderDetail(item, banners) {
        const img = item.image_url || 'https://placehold.co/1200x500/eeeeee/999999?text=MBP+News';
        const story = (item.full_story || item.summary || item.body || '')
            .split(/\n{2,}/)
            .filter((p) => p.trim())
            .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
            .join('');

        return `
            <div class="about-page">
                ${this.renderNewsBanner(banners)}

                <div class="about-content-wrapper">
                    <div class="news-page-content" style="max-width: 860px; margin: 0 auto; padding: 0;">
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
                </div>
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

    async fetchNewsBanners() {
        const fallback = [
            {
                image_url: 'assets/slider/island.png',
                title: 'Discover Milne Bay',
                subtitle: 'Providing quality education and fostering unity across our islands, mountains, and seas.',
                order_index: 0,
                active: 1
            },
            {
                image_url: 'assets/slider/school.png',
                title: 'Empowering the Future',
                subtitle: 'Modern educational pathways and bright opportunities for every child.',
                order_index: 1,
                active: 1
            },
            {
                image_url: 'assets/slider/culture.png',
                title: 'Preserving Our Heritage',
                subtitle: 'Embracing our vibrant cultural heritage while advancing towards a prosperous future.',
                order_index: 2,
                active: 1
            }
        ];

        try {
            const res = await fetch('/api/banners');
            if (!res.ok) throw new Error('News banner fetch failed');
            const data = await res.json();
            const banners = Array.isArray(data)
                ? data.filter((banner) => Number(banner.active) === 1)
                : [];
            return banners.length ? banners : fallback;
        } catch (error) {
            console.warn('News banner: falling back to default slides.', error);
            return fallback;
        }
    },

    renderNewsBanner(banners) {
        const slides = Array.isArray(banners)
            ? banners.filter((banner) => Number(banner.active) === 1).sort((a, b) => Number(a.order_index || 0) - Number(b.order_index || 0))
            : [];
        const fallback = [
            { image_url: 'assets/slider/island.png', title: 'Discover Milne Bay', subtitle: 'Providing quality education and fostering unity across our islands, mountains, and seas.' },
            { image_url: 'assets/slider/school.png', title: 'Empowering the Future', subtitle: 'Modern educational pathways and bright opportunities for every child.' },
            { image_url: 'assets/slider/culture.png', title: 'Preserving Our Heritage', subtitle: 'Embracing our vibrant cultural heritage while advancing towards a prosperous future.' }
        ];
        const bannerSlides = slides.length ? slides : fallback;
        const showControls = bannerSlides.length > 1;

        return `
            <section class="news-banner-slider" aria-label="News announcements">
                ${bannerSlides.map((banner, index) => `
                    <div class="news-banner-slide${index === 0 ? ' active' : ''}" style="background-image: url('${escapeHtml(banner.image_url || fallback[index % fallback.length].image_url)}');">
                        <div class="banner-overlay"></div>
                        <div class="banner-content news-banner-content">
                            <h1>${escapeHtml(banner.title || 'News & Announcements')}</h1>
                            <p>${escapeHtml(banner.subtitle || 'Latest Updates from the Division of Education')}</p>
                        </div>
                    </div>
                `).join('')}
                ${showControls ? `
                    <button class="news-slider-btn news-prev-btn" type="button" aria-label="Previous news banner"><i data-lucide="chevron-left"></i></button>
                    <button class="news-slider-btn news-next-btn" type="button" aria-label="Next news banner"><i data-lucide="chevron-right"></i></button>
                    <div class="news-slider-dots" aria-label="News banner slides">
                        ${bannerSlides.map((_, index) => `<button class="news-dot${index === 0 ? ' active' : ''}" type="button" data-slide="${index}" aria-label="Show news banner ${index + 1}"></button>`).join('')}
                    </div>
                ` : ''}
            </section>
        `;
    },

    afterRender() {
        const slider = document.querySelector('.news-banner-slider');
        if (!slider) return;

        if (window.__newsBannerInterval) {
            clearInterval(window.__newsBannerInterval);
            window.__newsBannerInterval = null;
        }

        const slides = Array.from(slider.querySelectorAll('.news-banner-slide'));
        const dots = Array.from(slider.querySelectorAll('.news-dot'));
        const prevBtn = slider.querySelector('.news-prev-btn');
        const nextBtn = slider.querySelector('.news-next-btn');
        if (!slides.length) return;

        let currentSlide = 0;
        const goToSlide = (index) => {
            slides[currentSlide]?.classList.remove('active');
            dots[currentSlide]?.classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide]?.classList.add('active');
        };
        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);
        const startAutoSlide = () => {
            if (slides.length > 1) {
                window.__newsBannerInterval = setInterval(nextSlide, 5000);
            }
        };
        const resetInterval = () => {
            if (window.__newsBannerInterval) clearInterval(window.__newsBannerInterval);
            startAutoSlide();
        };

        nextBtn?.addEventListener('click', () => { nextSlide(); resetInterval(); });
        prevBtn?.addEventListener('click', () => { prevSlide(); resetInterval(); });
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => { goToSlide(index); resetInterval(); });
        });
        startAutoSlide();
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