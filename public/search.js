window.SiteSearch = (() => {
    const PAGE_INDEX = [
        { path: '/home', title: 'Home', tag: 'Page', keywords: 'home welcome discover milne bay education province division schools quick access finder staff hub statistics' },
        { path: '/about', title: 'About Milne Bay Province', tag: 'Page', keywords: 'about land people population demographics gender equity education milne bay png islands cultures languages schools' },
        { path: '/basic', title: 'Basic Education', tag: 'Page', keywords: 'basic education primary elementary ece early childhood registration fees schools grades parents' },
        { path: '/post', title: 'Post Primary Education', tag: 'Page', keywords: 'post primary secondary high school national high grades 11 12 selection fees' },
        { path: '/vet', title: 'VET - Technical & Vocational', tag: 'Page', keywords: 'vet technical vocational training skills trade kwato certificates' },
        { path: '/fode', title: 'FODE - Flexible Open Distance Education', tag: 'Page', keywords: 'fode flexible open distance education study home flexible learning grades' },
        { path: '/news', title: 'News & Announcements', tag: 'Page', keywords: 'news announcements updates term dates circulars latest headlines' },
        { path: '/contact', title: 'Contact Us', tag: 'Page', keywords: 'contact phone email helpdesk address support division education office' },
        { path: '/policy', title: 'Policy Documents', tag: 'Page', keywords: 'policy documents circulars guidelines official rules' },
        { path: '/calendar', title: 'Academic Calendar', tag: 'Page', keywords: 'calendar term dates school year academic 2026 holidays' },
        { path: '/jobs', title: 'Job Vacancies', tag: 'Page', keywords: 'jobs vacancies employment teachers positions apply recruitment' },
        { path: '/exams', title: 'Exam Results', tag: 'Page', keywords: 'exam results grades grade 8 10 12 selection national examination' },
        { path: '/parents', title: 'Parent Portal', tag: 'Page', keywords: 'parents tff tuition fee free support school fees students' },
        { path: '/elearning', title: 'E-Learning', tag: 'Page', keywords: 'elearning online learning courses digital distance education portal' }
    ];

    let dynamic = [];
    let loaded = false;

    const load = async () => {
        if (loaded) return;
        loaded = true;
        try {
            const [newsRes, noticesRes, polRes] = await Promise.all([
                fetch('/api/news').then(r => r.ok ? r.json() : []),
                fetch('/api/notices').then(r => r.ok ? r.json() : []),
                fetch('/api/policies').then(r => r.ok ? r.json() : [])
            ]);
            if (Array.isArray(newsRes)) {
                newsRes.forEach(n => dynamic.push({
                    path: '/news/' + n.id,
                    title: n.title,
                    tag: 'News',
                    keywords: (n.title + ' ' + (n.summary || '') + ' ' + (n.body || '')).trim()
                }));
            }
            if (Array.isArray(noticesRes)) {
                noticesRes.forEach(n => dynamic.push({
                    path: '/news',
                    title: n.title,
                    tag: 'Notice',
                    keywords: (n.title + ' ' + (n.body || '')).trim()
                }));
            }
            if (Array.isArray(polRes)) {
                polRes.filter(d => d.active !== false).forEach(d => dynamic.push({
                    path: '/policy',
                    title: d.title || d.name || (d.document_url ? 'Policy Document' : ''),
                    tag: 'Policy',
                    keywords: ((d.title || '') + ' ' + (d.name || '') + ' ' + (d.category_name || '') + ' policy').trim()
                }));
            }
        } catch (e) {
            console.warn('SiteSearch: could not load live content.', e);
        }
    };

    const normalize = (s) => String(s == null ? '' : s).toLowerCase().trim();

    const search = (query) => {
        const q = normalize(query);
        if (!q) return [];
        const terms = q.split(/\s+/).filter(Boolean);
        const all = [...PAGE_INDEX, ...dynamic];
        const scored = [];
        for (const item of all) {
            const hay = normalize(item.title) + ' ' + normalize(item.keywords);
            const matched = terms.filter(t => hay.includes(t)).length;
            if (matched === 0) continue;
            const titleHit = terms.filter(t => normalize(item.title).includes(t)).length;
            const score = matched * 2 + titleHit * 3;
            scored.push({ item, score });
        }
        scored.sort((a, b) => b.score - a.score);
        return scored.slice(0, 15).map(x => x.item);
    };

    return { load, search };
})();