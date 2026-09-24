window.AboutComponent = {
    async render() {
        const banner = await window.PageBanners.get('about');
        return `
            <div class="about-page">
                <!-- Banner Section -->
                <div class="about-banner" style="background-image: url('${window.PageBanners.safeUrl(banner.image_url)}'); background-size: cover; background-position: center 25%;">
                    <div class="banner-overlay"></div>
                    <div class="banner-content">
                        <h1>${banner.title}</h1>
                        <p>${banner.subtitle}</p>
                    </div>
                </div>
                
                <!-- Content Sections -->
                <div class="about-content-wrapper">
                    
                    <!-- Image Placeholders -->
                    <div class="about-image-gallery">
                        <img src="assets/about/img1.png" alt="Milne Bay Province image 1" class="about-gallery-img">
                        <img src="assets/about/img2.jpg" alt="Milne Bay Province image 2" class="about-gallery-img">
                        <img src="assets/about/img3.jpg" alt="Milne Bay Province image 3" class="about-gallery-img">
                        <img src="assets/about/img4.jpg" alt="Milne Bay Province image 4" class="about-gallery-img">
                    </div>

                    <!-- Land and People Section -->
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon"><i data-lucide="map"></i></div>
                            <h2>Land and People</h2>
                        </div>
                        <div class="section-body text-content">
                            <!-- Split Top Layout (Map & Geography) -->
                            <div class="about-grid-layout" style="margin-bottom: 2.5rem;">
                                <div class="about-map-container" title="Click to view full map">
                                    <img src="assets/about/milne_bay_map.jpg" alt="Map of Milne Bay Province" class="about-map-img">
                                    <span class="zoom-hint"><i data-lucide="zoom-in"></i> Click to view full map</span>
                                </div>
                                <div class="about-text-column">
                                    <p>Milne Bay occupies the eastern half of the island of Papua New Guinea, which is 100 south and 1510 East of the equator and to the Northeastern tip of Australia. Milne Bay comprises about 10 large islands and more than 150 smaller islands and atolls. The province has a land and sea area of 16 200 sq km.</p>
                                    
                                    <p>The land area is mostly covered by tropical rain forests that are divided by massive mountain ranges. Sustainable use and protection of its natural resources, which are of global significance, have attracted worldwide interest in recent years particularly its gold and areas of arable land for potential agricultural production, an abundant supply of fresh water, large tropical forests, and extensive maritime fisheries.</p>
                                </div>
                            </div>
                            
                            <!-- Full-Width Bottom Layout (Population & Demographics) -->
                            <div class="about-full-width-text">
                                <p>The Milne Bay population is about 210,000, 85 per cent of whom live in rural areas. There are 48 different languages with approved orthographies spoken throughout the province. As demonstrated by the heterogeneity of languages spoken there is a wide diversity of physical characteristics and culture.</p>
                                
                                <p>With its current growth rate of 2.5% per annum, the population is projected to reach 315,618 by the year 2020. According to the 2000 census, 45 per cent of the population is estimated to be below the age of 15 years. The Papua New Guinea Human Development Report, 1998 (Office of National Planning, 1999) Has projected that by 2010 the school age population and the economically active population will have grown by 45 percent and 67 per cent respectively.</p>
                            </div>
                        </div>
                    </section>

                    <!-- Gender Equity Section -->
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon red"><i data-lucide="scale"></i></div>
                            <h2>Gender Equity in Education</h2>
                        </div>
                        <div class="section-body text-content">
                            <p>At every level of education more males are represented than females. Cultural factors have been found to be the major obstruction to increasing participation of females at all levels of education (Gender Analysis in Papua New Guinea, World Bank, 1998).</p>
                            
                            <p>Access to informal education and training programs is even more difficult for women that are illiterate and the illiteracy rate among women is estimated at around 60 per cent.</p>
                            
                            <p>The Gender Equity in Education Policy (Department of Education, 2003) provides a framework of principles and practices to improve the lives of all children and promotes gender equity between girls and boys. Implementation of this policy has been slow moving with little or no resources being allocated to support.</p>
                        </div>
                    </section>

                </div>
            </div>
        `;
    },

    afterRender() {
        const container = document.querySelector('.about-map-container');
        const img = container && container.querySelector('.about-map-img');
        if (!container || !img) return;

        if (window.__aboutMapZoomBound) return;
        window.__aboutMapZoomBound = true;

        const buildLightbox = () => {
            if (document.getElementById('map-lightbox')) return;
            const lb = document.createElement('div');
            lb.className = 'lightbox';
            lb.id = 'map-lightbox';
            lb.hidden = true;
            lb.innerHTML = `
                <button type="button" class="lightbox-close" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
                <div class="lightbox-stage">
                    <img src="${img.getAttribute('src')}" alt="Map of Milne Bay Province">
                </div>
                <div class="lightbox-toolbar">
                    <button type="button" data-zoom="out" aria-label="Zoom out">−</button>
                    <button type="button" data-zoom="reset" aria-label="Reset zoom">↺</button>
                    <button type="button" data-zoom="in" aria-label="Zoom in">＋</button>
                    <span class="lightbox-hint">Scroll or pinch to zoom</span>
                </div>`;
            document.body.appendChild(lb);
        };

        buildLightbox();
        const lb = document.getElementById('map-lightbox');
        const lbi = lb.querySelector('.lightbox-stage img');

        let scale = 1;
        const MIN = 1, MAX = 8, STEP = 0.4;
        const apply = () => { lbi.style.transform = `scale(${scale})`; };
        const zoom = (dir) => {
            scale = Math.min(MAX, Math.max(MIN, +(scale + dir * STEP).toFixed(2)));
            apply();
        };

        const open = () => {
            scale = 1;
            apply();
            lb.hidden = false;
            requestAnimationFrame(() => lb.classList.add('open'));
            document.body.style.overflow = 'hidden';
        };
        const close = () => {
            lb.classList.remove('open');
            document.body.style.overflow = '';
            setTimeout(() => { lb.hidden = true; }, 250);
        };

        container.addEventListener('click', open);

        lb.querySelector('.lightbox-close').addEventListener('click', close);
        lb.querySelector('[data-zoom="in"]').addEventListener('click', () => zoom(1));
        lb.querySelector('[data-zoom="out"]').addEventListener('click', () => zoom(-1));
        lb.querySelector('[data-zoom="reset"]').addEventListener('click', () => { scale = 1; apply(); });
        lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
        lb.querySelector('.lightbox-stage').addEventListener('wheel', (e) => {
            e.preventDefault();
            zoom(e.deltaY < 0 ? 1 : -1);
        }, { passive: false });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lb.hidden) close();
        });
    }
};
