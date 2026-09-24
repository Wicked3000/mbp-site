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

            <!-- Key Provincial Education Statistics -->
            <section class="stats-band">
                <div class="stat-card b-blue">
                    <div class="stat-icon"><i data-lucide="building-2"></i></div>
                    <div class="stat-number" data-target="345">0</div>
                    <div class="stat-label">Active Schools</div>
                </div>
                <div class="stat-card b-green">
                    <div class="stat-icon"><i data-lucide="users-2"></i></div>
                    <div class="stat-number" data-target="48500">0</div>
                    <div class="stat-label">Enrolled Students</div>
                </div>
                <div class="stat-card b-gold">
                    <div class="stat-icon"><i data-lucide="user-check"></i></div>
                    <div class="stat-number" data-target="1850">0</div>
                    <div class="stat-label">Registered Teachers</div>
                </div>
                <div class="stat-card b-red">
                    <div class="stat-icon"><i data-lucide="graduation-cap"></i></div>
                    <div class="stat-number" data-target="100" data-suffix="%">0</div>
                    <div class="stat-label">FODE Outreach</div>
                </div>
            </section>

            ${welcomeHtml}

            <div class="home-content-wrapper">
                <!-- 0. Districts at a Glance -->
                <section class="explorer-section">
                    <div class="explorer-head">
                        <span class="explorer-kicker">Across All Districts</span>
                        <h2 class="section-title">Explore Our Districts</h2>
                        <p class="section-subtitle">Every Milne Bay district is served by schools, FODE centres and learning outreach from the mainland capital to the remote islands.</p>
                    </div>
                    <div class="explorer-grid">
                        ${HomeComponent.renderDistrictCards()}
                    </div>
                </section>

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

                <!-- FODE Learning Portal Feature -->
                <section class="fode-feature">
                    <div class="fode-blurb">
                        <span class="fode-badge"><i data-lucide="graduation-cap"></i> Flexible Open & Distance Education</span>
                        <h2>Learn from Anywhere in Milne Bay</h2>
                        <p>FODE lets students across all four districts continue secondary education and matriculation from home with study packages, assignments and exam support reaching even the most remote islands.</p>
                        <div class="fode-mini-grid">
                            <div class="fode-mini">
                                <i data-lucide="book-open"></i>
                                <h4>Grades 9–12 Curriculum</h4>
                                <p>National syllabus packages and study guides for every subject.</p>
                            </div>
                        </div>
                        <div class="fode-actions">
                            <a href="/fode" data-link class="fode-btn primary"><span>Visit the FODE Page</span><i data-lucide="arrow-right"></i></a>
                            <a href="/post" data-link class="fode-btn ghost"><span>View Selection Lists</span></a>
                        </div>
                    </div>
                    <div class="fode-dashboard">
                        <div class="fode-dash-head">
                            <div>
                                <span>Student & Teacher Portal</span>
                                <h3>Digital Resource Center</h3>
                            </div>
                            <span class="fode-dash-dot"></span>
                        </div>
                        <a href="/post" data-link class="fode-link">
                            <span class="fode-link-icon blue"><i data-lucide="file-text"></i></span>
                            <span class="fode-link-text">
                                <span class="fode-link-title">Course & Assignment Downloads</span>
                                <span class="fode-link-sub">Grades 9 to 12 English, Science, Mathematics & Social Science</span>
                            </span>
                            <i data-lucide="chevron-right" class="fode-link-arrow"></i>
                        </a>
                        <a href="/exams" data-link class="fode-link">
                            <span class="fode-link-icon green"><i data-lucide="trophy"></i></span>
                            <span class="fode-link-text">
                                <span class="fode-link-title">FODE Examination Results</span>
                                <span class="fode-link-sub">Check grade transcripts and certification status</span>
                            </span>
                            <i data-lucide="chevron-right" class="fode-link-arrow"></i>
                        </a>
                        <div class="fode-dash-foot">
                            <span><i data-lucide="circle-check"></i> Free for registered Milne Bay students</span>
                        </div>
                    </div>
                </section>

                <!-- VET Section -->
                <section class="vet-section">
                    <div class="vet-blurb">
                        <span class="vet-badge"><i data-lucide="wrench"></i> Vocational Technical Training</span>
                        <h2>Milne Bay VET Courses</h2>
                        <p>Trade skills and technical certification pathways for registered Milne Bay students.</p>
                        <div class="vet-grid">
<div class="vet-card">
    <i data-lucide="sprout"></i>
    <h3>Agriculture</h3>
    <p>Crop cultivation, livestock & horticulture skills.</p>
</div>
                            <div class="vet-card">
                                <i data-lucide="sparkles"></i>
                                <h3>Mechanical</h3>
                                <p>Engine repair, fabrication & automotive technology.</p>
                            </div>
                            <div class="vet-card">
                                <i data-lucide="zap"></i>
                                <h3>Hospitality</h3>
                                <p>Cooking, food service & tourism operations.</p>
                            </div>
                        </div>
                        <a href="/vet" data-link class="vet-btn primary">View VET Programs</a>
                    </div>
                </section>

                <!-- E-Services & Citizen Hub -->
                <section class="services-hub">
                    <div class="services-head">
                        <div>
                            <span class="explorer-kicker">Online Portals</span>
                            <h2 class="section-title">E-Services & Citizen Hub</h2>
                        </div>
                        <p class="services-head-text">Access school records, policy documents and the online tools that keep our province learning.</p>
                    </div>
                    <div class="services-grid">
                        ${HomeComponent.renderServiceCards()}
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

                <!-- WhatsApp Newsletter Section -->
                <section class="home-section whatsapp-newsletter-section">
                    <div class="wa-letter-card glass-panel">
                        <div class="wa-letter-head">
                            <div class="wa-letter-icon-wrap">
                                <i data-lucide="message-circle" class="wa-letter-icon"></i>
                            </div>
                            <div class="wa-letter-title-wrap">
                                <h2>Stay Connected via WhatsApp</h2>
                                <p class="section-subtitle">Get real-time updates on school announcements, exam results, and education news delivered straight to your phone.</p>
                            </div>
                        </div>
                        <div class="wa-letter-body">
                            <div id="wa-subscriber-list" class="wa-subscriber-list">
                                <p class="wa-loading">Loading subscribers...</p>
                            </div>
                            <div class="wa-actions">
                                <a href="/contact" data-link class="qa-btn gold"><i data-lucide="phone"></i><span>Subscribe via Contact Form</span></a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            <!-- District Explorer Modal -->
            <div class="district-modal" id="district-modal">
                <div class="district-modal-card">
                    <button class="district-modal-close" id="district-modal-close" type="button" aria-label="Close"><i data-lucide="x"></i></button>
                    <div class="district-modal-hero">
                        <img id="dm-img" src="" alt="">
                        <div class="district-modal-hero-mask"></div>
                        <div class="district-modal-hero-info">
                            <span id="dm-badge" class="district-card-badge"></span>
                            <h3 id="dm-title"></h3>
                        </div>
                    </div>
                    <div class="district-modal-body">
                        <div class="dm-meta">
                            <div><span>District HQ</span><strong id="dm-hq"></strong></div>
                            <div><span>LLG Areas</span><strong id="dm-llgs"></strong></div>
                        </div>
                        <div class="dm-facts">
                            <div class="dm-fact"><i data-lucide="school"></i><div><span>Schools Coverage</span><p id="dm-schools"></p></div></div>
                            <div class="dm-fact"><i data-lucide="laptop"></i><div><span>FODE & Outreach</span><p id="dm-fode"></p></div></div>
                        </div>
                        <h4>Overview & Education Focus</h4>
                        <p id="dm-desc" class="dm-desc"></p>
                        <h4>Key Highlights</h4>
                        <ul id="dm-highlights" class="dm-highlights"></ul>
                    </div>
                    <div class="district-modal-foot">
                        <a href="/about" data-link class="fode-btn primary"><span>Learn More About MBP Education</span><i data-lucide="arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
    },

    districtData: [
        {
            title: 'Alotau District',
            badge: 'Provincial Capital',
            hq: 'Alotau Town',
            img: 'assets/about/img1.png',
            desc: 'Home of the Division of Education headquarters and the province\'s largest cluster of schools, national high school, secondary schools and the central FODE facility for Milne Bay.',
            llgs: 'Alotau Urban, Huhu, Suau, Makamaka, Daga',
            schools: 'Largest cluster of schools in the province',
            fode: 'Central FODE centre in Alotau',
            highlights: [
                'Provincial Division of Education headquarters',
                'National high school and secondary options',
                'Largest teacher workforce in the province'
            ]
        },
        {
            title: 'Esa\'ala District',
            badge: 'Island District',
            hq: 'Normanby Island',
            img: 'assets/about/img2.jpg',
            desc: 'The D\'Entrecasteaux islands of Normanby, Fergusson and Dobu. Community schools and FODE study groups bring learning to scattered coastal and mountain villages.',
            llgs: 'Dobu, Duau, West Fergusson',
            schools: 'Community & primary schools on three main islands',
            fode: 'FODE study groups with visiting teachers',
            highlights: [
                'Community schools across Normanby & Fergusson',
                'Visiting-teacher FODE study groups',
                'Teacher housing support for island postings'
            ]
        },
        {
            title: 'Kiriwina / Goodenough',
            badge: 'Cultural Heritage',
            hq: 'Losuia & Bolubolu',
            img: 'assets/about/img3.jpg',
            desc: 'The Trobriand Islands and Goodenough Island, famous for culture and craftsmanship. Schools and a dedicated FODE centre keep every village connected to education.',
            llgs: 'Kiriwina Rural, Goodenough Island Rural',
            schools: 'Primary & community schools island-wide',
            fode: 'FODE centre at Losuia',
            highlights: [
                'FODE campus at Losuia for the Trobriand Islands',
                'Heritage-led classroom programs',
                'Secondary options on both islands'
            ]
        },
        {
            title: 'Samarai / Murua',
            badge: 'Maritime Archipelago',
            hq: 'Samarai & Woodlark',
            img: 'assets/about/img4.jpg',
            desc: 'Woodlark, Misima and the Louisiade Archipelago. Distance education and correspondence packages are the classroom lifeline across thousands of kilometres of ocean.',
            llgs: 'Bwanabwana, Louisiade, Yaleyamba, Murua',
            schools: 'Island classrooms from Samarai to Woodlark',
            fode: 'Correspondence & distance learning outreach',
            highlights: [
                'Samarai heritage island, former provincial capital',
                'Misima & Woodlark school networks',
                'Sea-transported study materials'
            ]
        }
    ],

    renderDistrictCards() {
        return this.districtData.map((d, i) => `
            <div class="district-card" data-district="${i}" role="button" tabindex="0" aria-label="View ${d.title} education profile">
                <div class="district-card-media">
                    <img src="${d.img}" alt="${d.title}" loading="lazy">
                    <div class="district-card-overlay"></div>
                    <span class="district-card-badge">${d.badge}</span>
                </div>
                <div class="district-card-body">
                    <h3>${d.title}</h3>
                    <p class="district-card-loc"><i data-lucide="map-pin"></i> ${d.hq}</p>
                    <p class="district-card-desc">${d.desc}</p>
                    <div class="district-card-facts">
                        <span><i data-lucide="school"></i> ${d.schools}</span>
                        <span><i data-lucide="laptop"></i> ${d.fode}</span>
                    </div>
                </div>
                <div class="district-card-foot">
                    <button type="button" class="district-card-btn">View District Profile <i data-lucide="arrow-right"></i></button>
                </div>
            </div>`).join('');
    },

    renderServiceCards() {
const services = [
    { icon: 'calendar', cls: 'blue', title: 'Academic Calendar', desc: 'Term dates, school holidays and key education events for Milne Bay Province.', href: '/calendar', cta: 'View Calendar' },
    { icon: 'map-pin', cls: 'green', title: 'School Finder', desc: 'Locate every school in Milne Bay Province on the national EMIS school map.', href: 'https://gfb742e44b55c34-doeapps.adb.ap-sydney-1.oraclecloudapps.com/ords/r/emis/where-is-my-school/landing?session=616876509072831', external: true, cta: 'Open School Finder' },
    { icon: 'file-text', cls: 'gold', title: 'Policy Documents', desc: 'PEB circulars, education policies and official directives from the Division.', href: '/policy', cta: 'Browse Documents' },
    { icon: 'list-checks', cls: 'blue', title: 'Selection Lists', desc: 'Grade 9 and Grade 11 national examination selection lists, grouped by school.', href: '/post', cta: 'View Selection Lists' },
    { icon: 'users', cls: 'green', title: 'Parent Portal', desc: 'School fees, term dates and guidance resources for parents and guardians.', href: '/parents', cta: 'Visit Parent Portal' },
    { icon: 'award', cls: 'red', title: 'Exam Results', desc: 'National examination results and transcript status for students.', href: '/exams', cta: 'Check Results' }
];
        return services.map((s) => `
            <div class="svc-card">
                <span class="svc-icon ${s.cls}"><i data-lucide="${s.icon}"></i></span>
                <h3>${s.title}</h3>
                <p>${s.desc}</p>
                <a href="${s.href}" ${s.external ? 'target="_blank" rel="noopener' : 'data-link'}" class="svc-link">${s.cta} <i data-lucide="arrow-right"></i></a>
            </div>`).join('');
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
        const statNumbers = document.querySelectorAll('.stats-band .stat-number');
        let animated = false;

        const animateStats = () => {
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const suffix = stat.getAttribute('data-suffix') || '+';
                const duration = 2000; 
                const increment = target / (duration / 16); 
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.innerText = target.toLocaleString() + suffix;
                    }
                };
                updateCounter();
            });
        };

        const statsBand = document.querySelector('.stats-band');
        if (statsBand && window.IntersectionObserver) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !animated) {
                    animated = true;
                    animateStats();
                }
            }, { threshold: 0.3 });
            observer.observe(statsBand);
        } else if (statsBand) {
            animateStats(); // Fallback if IntersectionObserver not supported
        }

        // --- District Explorer Modal ---
        const explorerGrid = document.querySelector('.explorer-grid');
        const districtModal = document.getElementById('district-modal');
        if (explorerGrid && districtModal) {
            const openDistrict = (index) => {
                const d = HomeComponent.districtData[index];
                if (!d) return;
                document.getElementById('dm-img').src = d.img;
                document.getElementById('dm-img').alt = d.title;
                document.getElementById('dm-title').textContent = d.title;
                document.getElementById('dm-badge').textContent = d.badge;
                document.getElementById('dm-hq').textContent = d.hq;
                document.getElementById('dm-llgs').textContent = d.llgs;
                document.getElementById('dm-schools').textContent = d.schools;
                document.getElementById('dm-fode').textContent = d.fode;
                document.getElementById('dm-desc').textContent = d.desc;
                const highlightsList = document.getElementById('dm-highlights');
                highlightsList.innerHTML = '';
                d.highlights.forEach((h) => {
                    const li = document.createElement('li');
                    li.textContent = h;
                    highlightsList.appendChild(li);
                });
                districtModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            };
            const closeDistrict = () => {
                districtModal.classList.remove('active');
                document.body.style.overflow = '';
            };

            explorerGrid.addEventListener('click', (e) => {
                const card = e.target.closest('.district-card');
                if (card) {
                    e.preventDefault();
                    openDistrict(+card.getAttribute('data-district'));
                }
            });
            explorerGrid.addEventListener('keydown', (e) => {
                const card = e.target.closest('.district-card');
                if (card && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    openDistrict(+card.getAttribute('data-district'));
                }
            });

            const dmCloseBtn = document.getElementById('district-modal-close');
            if (dmCloseBtn) dmCloseBtn.addEventListener('click', closeDistrict);
            districtModal.addEventListener('click', (e) => {
                if (e.target === districtModal) closeDistrict();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && districtModal.classList.contains('active')) closeDistrict();
            });
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

        // --- WhatsApp Subscriber List ---
        const waList = document.getElementById('wa-subscriber-list');
        if (waList) {
            (async () => {
                try {
                    const res = await fetch('/api/whatsapp-subscribers');
                    if (!res.ok) throw new Error('Fetch failed');
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        const items = data.slice(0, 6).map(s => `
                            <div class="wa-sub-item">
                                <span class="wa-sub-phone"><i data-lucide="phone"></i> ${s.phone || '—'}</span>
                                ${s.name ? `<span class="wa-sub-name"><i data-lucide="user"></i> ${s.name}</span>` : ''}
                            </div>
                        `).join('');
                        waList.innerHTML = `<div class="wa-sub-items">${items}</div>`;
                    } else {
                        waList.innerHTML = '<p class="wa-empty">No subscribers yet. Be the first to join!</p>';
                    }
                } catch (error) {
                    waList.innerHTML = '<p class="wa-empty">Unable to load subscriber list.</p>';
                }
                if (window.lucide) lucide.createIcons();
            })();
        }
    }
};
