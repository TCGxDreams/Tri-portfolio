(function () {
    const SETTINGS_KEY = 'tri_gazette_admin_settings';
    let settings = null;
    try {
        const stored = localStorage.getItem(SETTINGS_KEY);
        if (stored) {
            settings = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to parse admin settings:', e);
    }

    if (!settings) return;

    // 1. Inject custom colors immediately to prevent color flash
    if (settings.colors) {
        const style = document.createElement('style');
        style.id = 'admin-custom-styles';
        let css = ':root {\n';
        if (settings.colors.light) {
            Object.entries(settings.colors.light).forEach(([variable, value]) => {
                if (value) css += `  --${variable}: ${value} !important;\n`;
            });
        }
        css += '}\n';

        if (settings.colors.dark) {
            css += '[data-theme="dark"] {\n';
            Object.entries(settings.colors.dark).forEach(([variable, value]) => {
                if (value) css += `  --${variable}: ${value} !important;\n`;
            });
            css += '}\n';
        }
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    // 2. Replace text contents of slots and projects once DOM is ready (before app.js runs)
    function applyDOMChanges() {
        if (settings.slots) {
            Object.entries(settings.slots).forEach(([slotName, textValue]) => {
                if (textValue !== undefined && textValue !== null && textValue.trim() !== '') {
                    const elements = document.querySelectorAll(`[data-admin-slot="${slotName}"]`);
                    elements.forEach(el => {
                        el.innerHTML = textValue;
                    });
                }
            });
        }

        if (settings.projects && settings.projects.length) {
            const projectArticles = document.querySelectorAll('.project');
            settings.projects.forEach((projData, idx) => {
                const article = projectArticles[idx];
                if (!article) return;
                
                if (projData.img) article.setAttribute('data-img', projData.img);
                if (projData.title) {
                    const cleanTitle = projData.title.replace(/<\/?[^>]+(>|$)/g, ""); // strip HTML tags for attr
                    article.setAttribute('data-title', cleanTitle);
                }
                if (projData.year) article.setAttribute('data-year', projData.year);
                
                const titleEl = article.querySelector('.project-title');
                const descEl = article.querySelector('.project-desc');
                const tagsEl = article.querySelector('.project-tags');
                
                if (titleEl && projData.title) {
                    let html = projData.title;
                    if (projData.year) {
                        html += ` <span class="year">[${projData.year}]</span>`;
                    }
                    titleEl.innerHTML = html;
                }
                
                if (descEl && projData.desc) {
                    descEl.innerHTML = projData.desc;
                }
                
                if (tagsEl && projData.tags) {
                    const tagList = projData.tags.split(',').map(t => t.trim()).filter(Boolean);
                    let tagsHtml = '';
                    tagList.forEach((tag, tIdx) => {
                        const accentClass = tIdx === 0 ? 'tag accent' : 'tag';
                        tagsHtml += `<span class="${accentClass}">${tag}</span>\n`;
                    });
                    tagsEl.innerHTML = tagsHtml;
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyDOMChanges);
    } else {
        applyDOMChanges();
    }
})();
