// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du téléchargement du CV
    const downloadBtn = document.getElementById('downloadCV');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            try {
                window.open('https://drive.google.com/uc?export=download&id=13KvxaBd0nV6DI3f87TiPlZ30qym7-m3q', '_blank');
            } catch (error) {
                console.error('Erreur lors du téléchargement du CV:', error);
            }
        });
    }

    // Animation au défilement
    const sections = document.querySelectorAll('.section');
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(section);
        });
    }

    // Ajout de l'attribut rel="noopener" à tous les liens externes
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener');
        }
    });

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                try {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } catch (error) {
                    console.error('Erreur lors du défilement:', error);
                    // Fallback pour les navigateurs qui ne supportent pas smooth scroll
                    window.scrollTo(0, target.offsetTop);
                }
            }
        });
    });

    // Vérification des images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.error('Erreur de chargement de l\'image:', this.src);
            this.style.display = 'none';
        });
    });
}); 