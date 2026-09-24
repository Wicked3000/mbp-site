window.HomeComponent = {
    async render() {
        const noticesHtml = await HomeComponent.fetchNoticesHtml();
        const newsHtml = await HomeComponent.fetchNewsHtml();
        const welcomeHtml = await HomeComponent.fetchWelcomeHtml();
        return `
            <div class="hero-slider-container">
                <div class="hero-slide active" style="background-image: url('assets/slider/mbp-img1.png');">
                    <div class="hero-content">
                        <h1>Discover Milne Bay</h1>
                        <p>Providing quality education and fostering unity across our islands, mountains, and seas.</p>
                    </div>
                </div>
                <div class="hero-slide" style="background-image: url('assets/slider/mbp-img3.png');">
                    <div class="hero-content">
                        <h1>Empowering the Future</h1>
                        <p>Modern educational pathways and bright opportunities for every child.</p>
                    </div>
                </div>
                <div class="hero-slide" style="background-image: url('assets/slider/mbp-img2.png');">
                    <div class="hero-content">
                        <h1>Preserving Our Heritage</h1>
                        <p>Embracing our vibrant cultural heritage while advancing towards a prosperous future.</p>
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

            ${welcomeHtml}

            <!-- Quick Access Section -->
            <div class="quick-access-section">
                <h3 class="qa-title">Quick Access</h3>
                <div class="quick-access-grid">
                    <a href="https://gfb742e44b55c34-doeapps.adb.ap-sydney-1.oraclecloudapps.com/ords/r/emis/where-is-my-school/landing?session=616876509072831" target="_blank" class="qa-btn blue"><i data-lucide="search"></i><span>School Finder</span></a>
                    <a href="/policy" data-link class="qa-btn green"><i data-lucide="file-text"></i><span>Policy Documents</span></a>
                    <a href="/calendar" data-link class="qa-btn green"><i data-lucide="calendar"></i><span>Calendar</span></a>
                    <a href="/jobs" data-link class="qa-btn green"><i data-lucide="briefcase"></i><span>Job Vacancies</span></a>
                    
                    <a href="/news" data-link class="qa-btn blue"><i data-lucide="newspaper"></i><span>News</span></a>
                    <a href="/exams" data-link class="qa-btn green"><i data-lucide="award"></i><span>Exam Results</span></a>
                    <a href="/parents" data-link class="qa-btn green"><i data-lucide="users"></i><span>Parent Portal</span></a>
                    <a href="/elearning" data-link class="qa-btn green"><i data-lucide="laptop"></i><span>E-Learning</span></a>
                </div>
            </div>

            <div class="home-content-wrapper">
                <!-- 1. Foundational Educational Pillars -->
                <section class="home-section">
                    <h2 class="section-title">Educational Pathways</h2>
                    <p class="section-subtitle">A seamless journey from early childhood to technical proficiency.</p>
                    <div class="pillars-grid">
                        <div class="pillar-card">
                            <div class="pillar-icon gold"><i data-lucide="baby"></i></div>
                            <h3>Early Childhood</h3>
                            <p>The crucial foundational pillar of education.</p>
                        </div>
                        <div class="pillar-card">
                            <div class="pillar-icon green"><i data-lucide="book-open"></i></div>
                            <h3>Primary Education</h3>
                            <p>Developing basic literacy and numeracy.</p>
                        </div>
                        <div class="pillar-card">
                            <div class="pillar-icon blue"><i data-lucide="graduation-cap"></i></div>
                            <h3>Secondary Education</h3>
                            <p>Advanced learning and tertiary preparation.</p>
                        </div>
                        <div class="pillar-card">
                            <div class="pillar-icon red"><i data-lucide="wrench"></i></div>
                            <h3>VET</h3>
                            <p>Technical and vocational skills training.</p>
                        </div>
                    </div>
                </section>

                <!-- 2. Secure Staff & Teacher Portals -->
                <section class="home-section glass-panel staff-hub-section">
                    <div class="staff-hub-content">
                        <h2>Staff Hub</h2>
                        <p>Secure utility portals for Milne Bay teachers and administrators.</p>
                        <div class="staff-links">
                            <a href="https://erodss.school/" target="_blank" rel="noopener" class="staff-btn"><i data-lucide="file-check"></i> eRODSS Portal</a>
                            <a href="http://apps.education.gov.pg:8081/ords/f?p=141:HOME:2806478635712:::::" target="_blank" rel="noopener" class="staff-btn"><i data-lucide="file-spreadsheet"></i> School Grant Acquittal</a>
                            <a href="http://apps.education.gov.pg:8081/ords/f?p=144:LOGIN_DESKTOP:7583393779533:::::" target="_blank" rel="noopener" class="staff-btn"><i data-lucide="credit-card"></i> MyPaySlip</a>
                        </div>
                    </div>
                </section>

                <!-- 4. Live Statistics -->
                <section class="home-section stats-section">
                    <div class="stat-card">
                        <div class="stat-icon"><i data-lucide="building-2"></i></div>
                        <div class="stat-number" data-target="345">0</div>
                        <div class="stat-label">Active Schools</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i data-lucide="users-2"></i></div>
                        <div class="stat-number" data-target="48500">0</div>
                        <div class="stat-label">Enrolled Students</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon"><i data-lucide="user-check"></i></div>
                        <div class="stat-number" data-target="1850">0</div>
                        <div class="stat-label">Registered Teachers</div>
                    </div>
                </section>

                <!-- Notice Board -->
                <section class="home-section notice-board-section">
                    <div class="notice-header">
                        <i data-lucide="bell-ring" class="notice-icon"></i>
                        <h2>Official Notice Board</h2>
                    </div>
                    <div class="notice-list">
                        ${noticesHtml}
                    </div>
                </section>

                <!-- Latest News & Announcements -->
                <section class="home-section news-section">
                    <h2 class="section-title">Latest News & Announcements</h2>
                    <p class="section-subtitle">Stay up to date with the Milne Bay Province Division of Education.</p>
                    
                    <!-- News Ticker -->
                    <div class="news-ticker-container" style="margin-bottom: 2rem;">
                        <div class="ticker-label">NEWS</div>
                        <div class="ticker-wrap">
                            <div class="ticker-move" id="home-ticker-move">
                                <!-- Ticker items will be injected here -->
                            </div>
                        </div>
                    </div>

                    <div class="news-grid">
                        ${newsHtml}
                    </div>
                    <div class="view-all-news">
                        <a href="/news#latest-news" data-link class="qa-btn blue" style="width: 100%; justify-content: center; margin-top: 2rem;"><i data-lucide="newspaper"></i><span>VIEW ALL NEWS</span></a>
                    </div>
                </section>

                <!-- Provincial Plans Documents -->
                <section class="home-section">
                    <h2 class="section-title">Provincial Education Plans</h2>
                    <p class="section-subtitle">Strategic documents guiding the future of education in Milne Bay Province.</p>
                    <div class="plans-presentation">
                        <div class="plans-thumb-wrap">
                            <img src="assets/plans/edu-plan-cover.png" alt="Provincial Education Plans Cover" class="plans-cover-img">
                        </div>
                        <div class="plans-actions">
                            <a href="assets/downloads/education_plan.pdf" download class="qa-btn blue plans-download-btn"><i data-lucide="download"></i><span>Download Full Plan (PDF)</span></a>
                        </div>
                    </div>
                </section>

                <!-- 5. Document & Resource Library -->
                <section class="home-section resources-section">
                    <h2 class="section-title">Resource Library Highlights</h2>
                    <div class="resource-grid">
                        <div class="resource-card">
                            <i data-lucide="calendar"></i>
                            <h4>2026 Academic Calendar</h4>
                            <a href="assets/downloads/calendar_2026.pdf" download class="download-btn" style="text-decoration:none; display:inline-block; margin-top:10px;"><i data-lucide="download"></i> Download</a>
                        </div>
                        <div class="resource-card">
                            <i data-lucide="file-text"></i>
                            <h4>PEB Circulars</h4>
                            <a href="assets/downloads/peb_circulars.pdf" download class="download-btn" style="text-decoration:none; display:inline-block; margin-top:10px;"><i data-lucide="download"></i> Download</a>
                        </div>
                        <div class="resource-card">
                            <i data-lucide="book"></i>
                            <h4>Syllabus Updates</h4>
                            <a href="assets/downloads/syllabus_updates.pdf" download class="download-btn" style="text-decoration:none; display:inline-block; margin-top:10px;"><i data-lucide="download"></i> Download</a>
                        </div>
                        <div class="resource-card">
                            <i data-lucide="dollar-sign"></i>
                            <h4>School Fee Structures</h4>
                            <a href="assets/downloads/school_fee_structures.pdf" download class="download-btn" style="text-decoration:none; display:inline-block; margin-top:10px;"><i data-lucide="download"></i> Download</a>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    async fetchWelcomeHtml() {
        const escapeHtml = (str) =>
            String(str == null ? '' : str).replace(/[&<>"']/g, (c) => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            }[c]));

        const build = (w) => {
            if (!w || Number(w.active) === 0 || !(w.title || w.message)) return '';
            const image = w.image_url
                ? `<div class="welcome-media"><img src="${escapeHtml(w.image_url)}" alt="${escapeHtml(w.title || 'Welcome to Milne Bay Province Division of Education')}" /></div>`
                : '';
            const paragraphs = String(w.message || '')
                .split(/\r?\n/)
                .filter((line) => line.trim())
                .map((line) => `<p>${escapeHtml(line)}</p>`)
                .join('');
            return `
            <section class="welcome-section">
                <div class="welcome-card glass-panel">
                    ${image}
                    <div class="welcome-text">
                        ${w.kicker ? `<span class="welcome-kicker">${escapeHtml(w.kicker)}</span>` : ''}
                        ${w.title ? `<h2 class="welcome-title">${escapeHtml(w.title)}</h2>` : ''}
                        <div class="welcome-message">${paragraphs}</div>
                        <a href="/about" data-link class="welcome-btn"><span>Learn More About Us</span><i data-lucide="arrow-right"></i></a>
                    </div>
                </div>
            </section>`;
        };

        try {
            const res = await fetch('/api/welcome');
            if (res.ok) {
                const data = await res.json();
                if (data && data.title) return build(data);
            }
        } catch (error) {
            console.warn('Welcome message: falling back to static content.', error);
        }

        const fallback = {
            kicker: 'Milne Bay Province Division of Education',
            title: 'Welcome to Our Province',
            message: 'Warm greetings from the Milne Bay Province Division of Education. We serve more than 48,000 students across 345 schools, from island communities to the mainland.\n\nOur vision is a well-educated and healthy population that is self reliant, wise in the use of its resources, and able to participate meaningfully in the development of our province and nation.\n\nPlease explore our site to learn about our schools, programs, news, and the many pathways we offer every child to succeed.',
            image_url: 'assets/about/img1.png',
            active: 1
        };
        return build(fallback);
    },

    async fetchNewsHtml() {
        const fallback = `
            <div class="news-card">
                <img src="https://placehold.co/600x400/eeeeee/999999?text=News+Thumbnail" alt="News Thumbnail" class="news-thumbnail">
                <div class="news-card-content">
                    <div class="news-date">15 Jun 2026</div>
                    <h3>Term 3 Commences Soon</h3>
                    <p>All primary and secondary schools across the province are preparing for the start of Term 3. Teachers are advised to review the updated syllabus materials.</p>
                    <a href="/news" data-link class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                </div>
            </div>
            <div class="news-card">
                <img src="https://placehold.co/600x400/eeeeee/999999?text=News+Thumbnail" alt="News Thumbnail" class="news-thumbnail">
                <div class="news-card-content">
                    <div class="news-date">02 Jun 2026</div>
                    <h3>New TVET Facilities Opening</h3>
                    <p>The Kwato VET Centre has officially opened its new technical workshop, expanding opportunities for vocational training in the region.</p>
                    <a href="/news" data-link class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                </div>
            </div>
            <div class="news-card">
                <img src="https://placehold.co/600x400/eeeeee/999999?text=News+Thumbnail" alt="News Thumbnail" class="news-thumbnail">
                <div class="news-card-content">
                    <div class="news-date">28 May 2026</div>
                    <h3>Provincial Education Board Meeting</h3>
                    <p>The quarterly PEB meeting concluded with new resolutions regarding remote school funding and teacher deployment for the upcoming academic year.</p>
                    <a href="/news" data-link class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                </div>
            </div>`;

        const escapeHtml = (str) =>
            String(str == null ? '' : str).replace(/[&<>"']/g, (c) => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            }[c]));

        const formatDate = (d) => {
            const date = new Date(d);
            if (isNaN(date.getTime())) return '';
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        };

        try {
            const res = await fetch('/api/news');
            if (!res.ok) throw new Error('News fetch failed');
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                return data
                    .slice(0, 3)
                    .map((n) => {
                        const img = n.image_url || 'https://placehold.co/600x400/eeeeee/999999?text=MBP+News';
                        return `
                        <div class="news-card">
                            <img src="${escapeHtml(img)}" alt="${escapeHtml(n.title)}" class="news-thumbnail">
                            <div class="news-card-content">
                                <div class="news-date">${escapeHtml(formatDate(n.published_at))}</div>
                                <h3>${escapeHtml(n.title)}</h3>
                                <p>${escapeHtml(n.summary || n.body)}</p>
<a href="/news/${n.id}" data-link class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                            </div>
                        </div>`;
                    })
                    .join('');
            }
            return fallback;
        } catch (error) {
            console.warn('Latest News: falling back to static content.', error);
            return fallback;
        }
    },

    async fetchLatestNewsHtml() {
        const fallback = `
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

        const escapeHtml = (str) =>
            String(str == null ? '' : str).replace(/[&<>"']/g, (c) => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            }[c]));

        try {
            const res = await fetch('/api/latest-news');
            if (!res.ok) throw new Error('Latest news fetch failed');
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                const loopItems = [];
                const copies = Math.max(1, Math.ceil(4 / data.length));
                for (let c = 0; c < copies; c++) {
                    for (const li of data) {
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
                return `<div class="ticker-group">${joined}</div><div class="ticker-group">${joined}</div>`;
            }
            return fallback;
        } catch (error) {
            console.warn('Latest News ticker: falling back to static content.', error);
            return fallback;
        }
    },

    async fetchNoticesHtml() {
        const fallback = `
            <div class="notice-item">
                <div class="notice-title">Important Update: Term 3 School Fees</div>
                <p class="notice-desc">All outstanding school fees for Term 3 must be deposited into the provincial trust account before July 10th, 2026.</p>
            </div>
            <div class="notice-item">
                <div class="notice-title">Teacher Postings 2026</div>
                <p class="notice-desc">The final list of teacher deployments for remote schools has been published. Please check the eRODSS portal for confirmation.</p>
            </div>
            <div class="notice-item">
                <div class="notice-title">Weather Alert</div>
                <p class="notice-desc">Schools in the island districts are advised to monitor marine weather warnings and take necessary precautions.</p>
            </div>`;

        const escapeHtml = (str) =>
            String(str == null ? '' : str).replace(/[&<>"']/g, (c) => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            }[c]));

        try {
            const res = await fetch('/api/notices');
            if (!res.ok) throw new Error('Notice fetch failed');
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                return data
                    .slice(0, 4)
                    .map((n) => `
                        <div class="notice-item">
                            <div class="notice-title">${escapeHtml(n.title)}</div>
                            <p class="notice-desc">${escapeHtml(n.body)}</p>
                        </div>`)
                    .join('');
            }
            return fallback;
        } catch (error) {
            console.warn('Notice Board: falling back to static content.', error);
            return fallback;
        }
    },

    afterRender() {
        // --- Slider Logic ---
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
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

        if (nextBtn) {
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


        // --- Statistics Counter Logic ---
        const statNumbers = document.querySelectorAll('.stat-number');
        let animated = false;

        const animateStats = () => {
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const duration = 2000; 
                const increment = target / (duration / 16); 
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.innerText = target.toLocaleString() + "+";
                    }
                };
                updateCounter();
            });
        };

        const statsSection = document.querySelector('.stats-section');
        if (statsSection && window.IntersectionObserver) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !animated) {
                    animated = true;
                    animateStats();
                }
            }, { threshold: 0.5 });
            observer.observe(statsSection);
        } else if(statsSection) {
            animateStats(); // Fallback if IntersectionObserver not supported
        }

        // --- News Ticker Logic ---
        const tickerMove = document.getElementById('home-ticker-move');
        if (tickerMove) {
            HomeComponent.fetchLatestNewsHtml().then(html => {
                tickerMove.innerHTML = html;
            });
        }

        // --- Plans Thumbnail Entrance Animation ---
        const plansSection = document.querySelector('.plans-presentation');
        if (plansSection) {
            if (window.IntersectionObserver) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            plansSection.classList.add('in-view');
                            observer.unobserve(plansSection);
                        }
                    });
                }, { threshold: 0.3 });
                observer.observe(plansSection);
            } else {
                plansSection.classList.add('in-view');
            }
        }
    }
};
