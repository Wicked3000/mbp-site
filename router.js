class Router {
    constructor() {
        this.routes = {
            '/': { component: 'HomeComponent', file: 'home.js' },
            '/home': { component: 'HomeComponent', file: 'home.js' },
            '/about': { component: 'AboutComponent', file: 'about.js' },
            '/basic': { component: 'BasicComponent', file: 'basic.js' },
            '/post': { component: 'PostComponent', file: 'post.js' },
            '/vet': { component: 'VetComponent', file: 'vet.js' },
            '/fode': { component: 'FodeComponent', file: 'fode.js' },
            '/news': { component: 'NewsComponent', file: 'news.js' },
            '/contact': { component: 'ContactComponent', file: 'contact.js' },
            '/policy': { component: 'PolicyComponent', file: 'policy.js' },
            '/calendar': { component: 'CalendarComponent', file: 'calendar.js' },
            '/jobs': { component: 'JobsComponent', file: 'jobs.js' },
            '/exams': { component: 'ExamsComponent', file: 'exams.js' },
            '/parents': { component: 'ParentsComponent', file: 'parents.js' },
            '/elearning': { component: 'ElearningComponent', file: 'elearning.js' }
        };

        this.appContent = document.getElementById('app-content');
        
        window.addEventListener('popstate', () => this.handleRoute(window.location.pathname));
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.getAttribute('href'));
            } else if (e.target.closest('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.closest('[data-link]').getAttribute('href'));
            }
        });

        // Initial route
        this.handleRoute(window.location.pathname);
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.handleRoute(url);
    }

    async handleRoute(url) {
        // Parse URL to separate pathname and hash
        const [path, hash] = url.split('#');
        const route = this.routes[path] || this.routes['/'];
        
        try {
            // Ensure component script is loaded
            if (!window[route.component]) {
                await this.loadScript(`components/${route.file}`);
            }

            const component = window[route.component];
            if (component && typeof component.render === 'function') {
                const html = await component.render();
                
                // Sanitize HTML using DOMPurify
                this.appContent.innerHTML = DOMPurify.sanitize(html, {
                    ADD_TAGS: ['style'], // Allow style tags inside components
                    ADD_ATTR: ['data-lucide'] // Allow lucide icons
                });

                // Render Lucide icons
                if (window.lucide) {
                    lucide.createIcons();
                }

                // Execute component-specific logic after rendering
                if (typeof component.afterRender === 'function') {
                    component.afterRender();
                }

                // Scroll to hash if provided
                if (hash) {
                    setTimeout(() => {
                        const target = document.getElementById(hash);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                } else {
                    window.scrollTo(0, 0);
                }
            } else {
                this.appContent.innerHTML = '<h2>Error: Component not found or invalid.</h2>';
            }
        } catch (error) {
            console.error('Routing Error:', error);
            this.appContent.innerHTML = '<h2>404 - Page Not Found</h2>';
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.appRouter = new Router();
});
