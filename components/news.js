window.NewsComponent = {
    async render() {
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
                <div class="ticker-label">BREAKING</div>
                <div class="ticker-wrap">
                    <div class="ticker-move">
                        <div class="ticker-group">
                            <span class="ticker-item">ALL SCHOOLS: Term 3 Commences on 15 Jun 2026</span>
                            <span class="ticker-item">NEW DIRECTIVE: PEB Resolutions finalized for upcoming academic year</span>
                            <span class="ticker-item">REMINDER: Grade 10 Mock Exams begin next week</span>
                        </div>
                        <div class="ticker-group">
                            <span class="ticker-item">ALL SCHOOLS: Term 3 Commences on 15 Jun 2026</span>
                            <span class="ticker-item">NEW DIRECTIVE: PEB Resolutions finalized for upcoming academic year</span>
                            <span class="ticker-item">REMINDER: Grade 10 Mock Exams begin next week</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="news-page-content" style="max-width: 1200px; margin: 4rem auto; padding: 0 2rem;">
                
                <!-- Latest News Section -->
                <section id="latest-news" class="news-main-section">
                    <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--mbp-blue-dark); text-align: left;">Latest News</h2>
                    <p class="section-subtitle" style="margin-bottom: 2rem; text-align: left; margin-left: 0; max-width: none;">The most recent updates from the Division of Education.</p>
                    
                    <div class="news-grid">
                        <div class="news-card">
                            <img src="https://placehold.co/600x400/eeeeee/999999?text=News+Thumbnail" alt="News Thumbnail" class="news-thumbnail">
                            <div class="news-card-content">
                                <div class="news-date">15 Jun 2026</div>
                                <h3>Term 3 Commences Soon</h3>
                                <p>All primary and secondary schools across the province are preparing for the start of Term 3. Teachers are advised to review the updated syllabus materials.</p>
                                <a href="#" class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                            </div>
                        </div>
                        <div class="news-card">
                            <img src="https://placehold.co/600x400/eeeeee/999999?text=News+Thumbnail" alt="News Thumbnail" class="news-thumbnail">
                            <div class="news-card-content">
                                <div class="news-date">02 Jun 2026</div>
                                <h3>New TVET Facilities Opening</h3>
                                <p>The Kwato VET Centre has officially opened its new technical workshop, expanding opportunities for vocational training in the region.</p>
                                <a href="#" class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                            </div>
                        </div>
                        <div class="news-card">
                            <img src="https://placehold.co/600x400/eeeeee/999999?text=News+Thumbnail" alt="News Thumbnail" class="news-thumbnail">
                            <div class="news-card-content">
                                <div class="news-date">28 May 2026</div>
                                <h3>Provincial Education Board Meeting</h3>
                                <p>The quarterly PEB meeting concluded with new resolutions regarding remote school funding and teacher deployment for the upcoming academic year.</p>
                                <a href="#" class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Old News / Archives Section -->
                <section class="news-main-section" style="margin-top: 5rem;">
                    <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem; color: var(--text-secondary); text-align: left;">Old News / Archives</h2>
                    <p class="section-subtitle" style="margin-bottom: 2rem; text-align: left; margin-left: 0; max-width: none;">Past announcements and historical records.</p>
                    
                    <div class="news-grid" style="opacity: 0.85;">
                        <div class="news-card">
                            <img src="https://placehold.co/600x400/eeeeee/999999?text=News+Thumbnail" alt="News Thumbnail" class="news-thumbnail">
                            <div class="news-card-content">
                                <div class="news-date">14 May 2026</div>
                                <h3>Esa'ala District Teacher Placements</h3>
                                <p>New teacher placements for Esa'ala district have been finalized. Deployment schedules will be distributed to district coordinators.</p>
                                <a href="#" class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                            </div>
                        </div>
                        <div class="news-card">
                            <img src="https://placehold.co/600x400/eeeeee/999999?text=News+Thumbnail" alt="News Thumbnail" class="news-thumbnail">
                            <div class="news-card-content">
                                <div class="news-date">05 May 2026</div>
                                <h3>National Exam Preparations</h3>
                                <p>Mock exams for Grades 8, 10, and 12 are scheduled to begin next month. Schools are advised to ensure all examination protocols are in place.</p>
                                <a href="#" class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                            </div>
                        </div>
                        <div class="news-card">
                            <img src="https://placehold.co/600x400/eeeeee/999999?text=News+Thumbnail" alt="News Thumbnail" class="news-thumbnail">
                            <div class="news-card-content">
                                <div class="news-date">20 Apr 2026</div>
                                <h3>Launch of E-Learning Portal</h3>
                                <p>The new provincial E-learning portal is now live, providing students with access to digital resources and supplementary learning materials.</p>
                                <a href="#" class="read-more">Read More <i data-lucide="arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;
    },

    afterRender() {
        // --- Slider Logic ---
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
    }
};
