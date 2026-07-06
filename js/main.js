document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        // Ouverture / Fermeture au clic sur le bouton burger
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fermeture lorsqu'on clique sur un lien de la nav
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Fermeture lorsqu'on clique en dehors de la nav
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            // Si le menu est actif et qu'on clique en dehors du menu et du bouton de bascule
            if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // 2. Animation "Reveal" au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // 3. Timeline Interactive (si elle existe sur la page)
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const timelinePanels = document.querySelectorAll('.timeline-panel');
    const timelineWrapper = document.querySelector('.timeline-nav-wrapper');

    if (timelineSteps.length > 0) {
        timelineSteps.forEach(step => {
            step.addEventListener('click', () => {
                timelineSteps.forEach(s => s.classList.remove('active'));
                timelinePanels.forEach(p => p.classList.remove('active'));

                step.classList.add('active');

                const targetId = step.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }

                if (window.innerWidth <= 900 && timelineWrapper) {
                    const scrollLeftPos = step.offsetLeft - (timelineWrapper.clientWidth / 2) + (step.clientWidth / 2);
                    timelineWrapper.scrollTo({ left: scrollLeftPos, behavior: 'smooth' });
                }
            });
        });
    }

    // 4. Modale de contact (si elle existe sur la page)
    const modal = document.getElementById("contact-modal");

    window.openContactModal = function () {
        if (modal) {
            modal.classList.add("show");
            document.body.style.overflowY = "hidden";
        }
    };

    window.closeContactModal = function () {
        if (modal) {
            modal.classList.remove("show");
            document.body.style.overflowY = "";
        }
    };

    // Fermer en cliquant en dehors
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            window.closeContactModal();
        }
    });

    // 5. Système de filtrage pour la page Expériences & Labs
    const filterBtns = document.querySelectorAll('.filter-btn');
    const labCards = document.querySelectorAll('.lab-card');

    if (filterBtns.length > 0 && labCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Retirer la classe 'active' de tous les boutons
                filterBtns.forEach(b => b.classList.remove('active'));
                // 2. Ajouter la classe 'active' au bouton cliqué
                btn.classList.add('active');

                // 3. Récupérer la catégorie du bouton
                const filterValue = btn.getAttribute('data-filter');

                // 4. Filtrer les cartes
                labCards.forEach(card => {
                    const cardCategories = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

    // 6. Gestion de la Modale Dynamique des Labs
    const labModal = document.getElementById('dynamic-lab-modal');

    // Fonction pour ouvrir la modale et la remplir
    window.openLabModal = function (buttonElement) {
        // Remonter jusqu'à la carte parente
        const card = buttonElement.closest('.lab-card');

        // Récupérer les éléments de la carte
        const title = card.querySelector('.lab-title').innerText;
        const desc = card.querySelector('.lab-desc').innerText;
        const imgSrc = card.querySelector('.lab-img').src;
        const tags = card.querySelector('.tech-tags').innerHTML;
        const bilan = card.querySelector('.hidden-bilan').innerHTML;

        // Injecter dans la modale
        document.getElementById('modal-lab-title').innerText = title;
        document.getElementById('modal-lab-desc').innerText = desc;
        document.getElementById('modal-lab-img').src = imgSrc;
        document.getElementById('modal-lab-tags').innerHTML = tags;
        document.getElementById('modal-lab-bilan').innerHTML = bilan;

        // Afficher la modale
        if (labModal) {
            labModal.classList.add("show");
            document.body.style.overflowY = "hidden";
        }
    };

    // Fonction pour fermer la modale
    window.closeLabModal = function () {
        if (labModal) {
            labModal.classList.remove("show");
            document.body.style.overflowY = "";
        }
    };

    // Fermer la modale en cliquant en dehors du contenu
    window.addEventListener('click', function (event) {
        if (event.target === labModal) {
            closeLabModal();
        }
    });
});