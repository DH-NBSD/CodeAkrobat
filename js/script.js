document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Einfaches Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
    });

    // Smooth Scroll für Anker-Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toast = document.getElementById('status-toast');

    // Funktion zum Auslesen der URL-Parameter
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status) {
        if (status === 'success') {
            toast.textContent = "✓ Nachricht erfolgreich versendet!";
            toast.classList.remove('error');
        } else if (status === 'error') {
            toast.textContent = "✗ Fehler beim Senden. Versuchen Sie es später erneut.";
            toast.classList.add('error');
        }

        // Toast anzeigen
        toast.classList.add('show');

        // Nach 5 Sekunden wieder ausblenden
        setTimeout(() => {
            toast.classList.remove('show');
            
            // Optional: URL säubern, damit die Meldung beim Refresh verschwindet
            const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({path: cleanUrl}, '', cleanUrl);
        }, 5000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.skill-progress');

    const showProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                // Wir lesen die Variable --w aus, die du im HTML gesetzt hast
                const targetWidth = bar.style.getPropertyValue('--w');
                bar.style.width = targetWidth;
                
                // Sobald die Animation läuft, brauchen wir den Observer für dieses Element nicht mehr
                observer.unobserve(bar);
            }
        });
    };

    const options = {
        threshold: 0.5 // Animation startet, wenn 50% des Balkens sichtbar sind
    };

    const observer = new IntersectionObserver(showProgress, options);

    progressBars.forEach(bar => {
        // Zuerst setzen wir die Breite auf 0, damit sie "wachsen" kann
        bar.style.width = '0';
        observer.observe(bar);
    });
});
