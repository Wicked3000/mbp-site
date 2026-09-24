window.PageBannerDefaults = {
    about: { page: 'about', title: 'About Milne Bay Province', subtitle: 'Our Land, Our People, Our Education', image_url: 'assets/about/banner.png' },
    basic: { page: 'basic', title: 'Basic Education', subtitle: 'Foundations for the Future of Milne Bay', image_url: 'assets/basic/banner.png' },
    post: { page: 'post', title: 'Post Primary Education', subtitle: 'Secondary & High School Pathways in Milne Bay Province', image_url: 'assets/post/banner.png' },
    vet: { page: 'vet', title: 'Vocational Education', subtitle: 'Skills Oriented Pathways in Milne Bay Province', image_url: 'assets/vet/banner.png' },
    fode: { page: 'fode', title: 'Flexible Open & Distance Education', subtitle: 'Alternative Pathways to Academic Success in Milne Bay', image_url: 'assets/fode/banner.png' }
};

window.PageBanners = {
    cache: {},
    async get(page) {
        if (this.cache[page]) return this.cache[page];
        const defaults = window.PageBannerDefaults[page] || {};
        try {
            const res = await fetch(`/api/page-banners?page=${page}`);
            if (res.ok) {
                const data = await res.json();
                const merged = { ...defaults, ...(data || {}) };
                if (!merged.image_url) merged.image_url = defaults.image_url || '';
                this.cache[page] = merged;
                return merged;
            }
        } catch (err) {
            return defaults;
        }
        return defaults;
    },
    safeUrl(url) {
        return String(url || '').replace(/["']/g, (m) => (m === '"' ? '&quot;' : '&#39;'));
    },
    reset() {
        this.cache = {};
    }
};