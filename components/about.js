window.AboutComponent = {
    async render() {
        return `
            <div class="about-page">
                <!-- Banner Section -->
                <div class="about-banner">
                    <div class="banner-overlay"></div>
                    <div class="banner-content">
                        <h1>About Milne Bay Province</h1>
                        <p>Our Land, Our People, Our Education</p>
                    </div>
                </div>
                
                <!-- Content Sections -->
                <div class="about-content-wrapper">
                    
                    <!-- Image Placeholders -->
                    <div class="about-image-gallery">
                        <div class="about-image-placeholder"><i data-lucide="image"></i></div>
                        <div class="about-image-placeholder"><i data-lucide="image"></i></div>
                        <div class="about-image-placeholder"><i data-lucide="image"></i></div>
                        <div class="about-image-placeholder"><i data-lucide="image"></i></div>
                    </div>

                    <!-- Land and People Section -->
                    <section class="about-section">
                        <div class="section-header">
                            <div class="section-icon"><i data-lucide="map"></i></div>
                            <h2>Land and People</h2>
                        </div>
                        <div class="section-body text-content">
                            <div class="about-map-container" style="text-align: center; margin-bottom: 2rem;">
                                <img src="assets/about/milne_bay_map.jpg" alt="Map of Milne Bay Province" style="max-width: 100%; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border: 4px solid white;">
                            </div>
                            <p>Milne Bay occupies the eastern half of the island of Papua New Guinea, which is 100 south and 1510 East of the equator and to the Northeastern tip of Australia. Milne Bay comprises about 10 large islands and more than 150 smaller islands and atolls. The province has a land and sea area of 16 200 sq km.</p>
                            
                            <p>The land area is mostly covered by tropical rain forests that are divided by massive mountain ranges. Sustainable use and protection of its natural resources, which are of global significance, have attracted worldwide interest in recent years particularly its gold and areas of arable land for potential agricultural production, an abundant supply of fresh water, large tropical forests, and extensive maritime fisheries.</p>
                            
                            <p>The Milne Bay population is about 210,000, 85 per cent of whom live in rural areas. There are 48 different languages with approved orthographies spoken throughout the province. As demonstrated by the heterogeneity of languages spoken there is a wide diversity of physical characteristics and culture.</p>
                            
                            <p>With its current growth rate of 2.5% per annum, the population is projected to reach 315,618 by the year 2020. According to the 2000 census, 45 per cent of the population is estimated to be below the age of 15 years. The Papua New Guinea Human Development Report, 1998 (Office of National Planning, 1999) Has projected that by 2010 the school age population and the economically active population will have grown by 45 percent and 67 per cent respectively.</p>
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
    }
};
