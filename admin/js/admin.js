// js/admin.js

let contentContainer;
let pageTitleElement; // This refers to the h1 inside the header
let layoutTitleElement; // This refers to the <title> tag in index.html
let navLinks;
let sidebar;
let mainContent;
let currentChart = null; // To destroy previous chart instances

// Utility function to manage modal visibility
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (show) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            modal.querySelector('form')?.reset(); // Reset form when opened
        } else {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
}

// Global modal initialization (called once from index.html)
function initializeModals() {
    // --- Nasabah Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'open-add-nasabah-modal' || e.target.closest('#open-add-nasabah-modal')) {
            e.preventDefault();
            toggleModal('add-nasabah-modal', true);
            document.getElementById('nasabah-modal-title').textContent = 'Tambah Nasabah Baru';
        }
    });
    document.getElementById('close-nasabah-modal')?.addEventListener('click', () => toggleModal('add-nasabah-modal', false));
    document.getElementById('nasabah-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form Nasabah Submitted (for demo):', data);
        alert('Data Nasabah akan disimpan ke API: ' + JSON.stringify(data, null, 2));
        toggleModal('add-nasabah-modal', false);
    });

    // --- Rekening Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'open-add-rekening-modal' || e.target.closest('#open-add-rekening-modal')) {
            e.preventDefault();
            toggleModal('add-rekening-modal', true);
            document.getElementById('rekening-modal-title').textContent = 'Buka Rekening Baru';
        }
    });
    document.getElementById('close-rekening-modal')?.addEventListener('click', () => toggleModal('add-rekening-modal', false));
    document.getElementById('rekening-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form Rekening Submitted (for demo):', data);
        alert('Data Rekening akan disimpan ke API: ' + JSON.stringify(data, null, 2));
        toggleModal('add-rekening-modal', false);
    });

    // --- Pembiayaan Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'open-add-pembiayaan-modal' || e.target.closest('#open-add-pembiayaan-modal')) {
            e.preventDefault();
            toggleModal('add-pembiayaan-modal', true);
            document.getElementById('pembiayaan-modal-title').textContent = 'Ajukan Pembiayaan Baru';
        }
    });
    document.getElementById('close-pembiayaan-modal')?.addEventListener('click', () => toggleModal('add-pembiayaan-modal', false));
    document.getElementById('pembiayaan-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form Pembiayaan Submitted (for demo):', data);
        alert('Data Pembiayaan akan disimpan ke API: ' + JSON.stringify(data, null, 2));
        toggleModal('add-pembiayaan-modal', false);
    });

    // --- Investasi Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'open-add-investasi-modal' || e.target.closest('#open-add-investasi-modal')) {
            e.preventDefault();
            toggleModal('add-investasi-modal', true);
            document.getElementById('investasi-modal-title').textContent = 'Tambah Produk Investasi Baru';
        }
    });
    document.getElementById('close-investasi-modal')?.addEventListener('click', () => toggleModal('add-investasi-modal', false));
    document.getElementById('investasi-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form Investasi Submitted (for demo):', data);
        alert('Data Investasi akan disimpan ke API: ' + JSON.stringify(data, null, 2));
        toggleModal('add-investasi-modal', false);
    });

    // --- ZISWAF Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'open-add-ziswaf-modal' || e.target.closest('#open-add-ziswaf-modal')) {
            e.preventDefault();
            toggleModal('add-ziswaf-modal', true);
            document.getElementById('ziswaf-modal-title').textContent = 'Catat Penerimaan ZISWAF';
        }
    });
    document.getElementById('close-ziswaf-modal')?.addEventListener('click', () => toggleModal('add-ziswaf-modal', false));
    document.getElementById('ziswaf-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form ZISWAF Submitted (for demo):', data);
        alert('Data ZISWAF akan disimpan ke API: ' + JSON.stringify(data, null, 2));
        toggleModal('add-ziswaf-modal', false);
    });

    // --- User Management Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.id === 'open-add-user-modal' || e.target.closest('#open-add-user-modal')) {
            e.preventDefault();
            toggleModal('add-user-modal', true);
            document.getElementById('user-modal-title').textContent = 'Tambah Pengguna Sistem Baru';
        }
    });
    document.getElementById('close-user-modal')?.addEventListener('click', () => toggleModal('add-user-modal', false));
    document.getElementById('user-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form User Submitted (for demo):', data);
        alert('Data Pengguna akan disimpan ke API: ' + JSON.stringify(data, null, 2));
        toggleModal('add-user-modal', false);
    });

    console.log('All modals initialized.');
}


// Functions to be called after the layout is loaded
function initializeLayout() {
    sidebar = document.getElementById('sidebar');
    mainContent = document.getElementById('main-content');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarToggleMobile = document.getElementById('sidebar-toggle-mobile');
    contentContainer = document.getElementById('content-container');
    pageTitleElement = document.getElementById('page-title'); // This element is INSIDE base-layout.html
    layoutTitleElement = document.getElementById('layout-title'); // This is the <title> tag in index.html
    navLinks = document.querySelectorAll('.sidebar-nav a');

    // --- Sidebar Toggle ---
    const toggleSidebar = () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
    };

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Mobile sidebar toggle
    if (sidebarToggleMobile) {
        sidebarToggleMobile.addEventListener('click', () => {
            sidebar.classList.toggle('active-mobile');
        });
    }

    // Close mobile sidebar if clicked outside
    document.addEventListener('click', (event) => {
        if (window.innerWidth < 1024 && sidebar && sidebar.classList.contains('active-mobile') &&
            !sidebar.contains(event.target) && !sidebarToggleMobile.contains(event.target)) {
            sidebar.classList.remove('active-mobile');
        }
    });

    // Event listeners for sidebar navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.currentTarget.dataset.page;
            navigateTo(page);
            // Close mobile sidebar after selection
            if (window.innerWidth < 1024 && sidebar) {
                sidebar.classList.remove('active-mobile');
            }
        });
    });

    console.log('Layout initialized.');
}


// --- Dynamic Content Loading ---
async function navigateTo(pageName) {
    // Check if critical elements are available before proceeding
    if (!contentContainer || !pageTitleElement || !layoutTitleElement || !navLinks) {
        console.error('Core layout elements are not fully initialized for navigation.');
        return;
    }

    try {
        const response = await fetch(`views/${pageName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load page: ${pageName}.html status: ${response.status}`);
        }
        const htmlContent = await response.text();
        contentContainer.innerHTML = htmlContent;

        // Set page title (for the h1 inside the main content area)
        const pageTitleText = document.querySelector(`[data-page="${pageName}"] .sidebar-text`)?.textContent ||
                             pageName.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        pageTitleElement.textContent = pageTitleText; // This is the H1 element
        layoutTitleElement.textContent = `Bank Jateng Syariah - ${pageTitleText}`; // This is the <title> tag in the browser tab


        // Update active menu
        navLinks.forEach(link => link.classList.remove('active-menu'));
        const activeLink = document.querySelector(`.sidebar-nav a[data-page="${pageName}"]`);
        if (activeLink) {
            activeLink.classList.add('active-menu');
        }

        // Call page-specific JS initialization
        initializePage(pageName);

        console.log(`Mapsd to: ${pageName}`);

    } catch (error) {
        console.error('Error loading content:', error);
        contentContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-[300px] text-center bg-[var(--admin-surface-white)] p-8 rounded-lg shadow-md border border-[var(--admin-border-light)]">
                <i class="fas fa-exclamation-circle text-6xl text-red-500 mb-4"></i>
                <h2 class="text-3xl font-bold text-red-700 mb-3">Halaman Tidak Ditemukan atau Error</h2>
                <p class="text-lg text-[var(--admin-text-secondary)] mb-6">Maaf, konten untuk halaman ini tidak dapat dimuat.</p>
                <p class="text-sm text-[var(--admin-text-secondary)]">Silakan coba lagi atau hubungi administrator.</p>
            </div>
        `;
        // Update both titles even on error
        if (pageTitleElement) pageTitleElement.textContent = 'Error';
        if (layoutTitleElement) layoutTitleElement.textContent = `Bank Jateng Syariah - Error`;

        // Reset chart if error page is shown
        if (currentChart) {
            currentChart.destroy();
            currentChart = null;
        }
    }
}


// Page Specific JavaScript Initialization
function initializePage(pageName) {
    console.log(`Initializing page: ${pageName}`);

    // Destroy previous chart instance if it exists
    if (window.currentChart) {
        window.currentChart.destroy();
        window.currentChart = null;
    }

    // Update button IDs to trigger new modals
    const rekeningButton = document.getElementById('open-add-rekening-modal');
    if (rekeningButton) rekeningButton.onclick = () => toggleModal('add-rekening-modal', true);

    const pembiayaanButton = document.getElementById('open-add-pembiayaan-modal');
    if (pembiayaanButton) pembiayaanButton.onclick = () => toggleModal('add-pembiayaan-modal', true);

    const investasiButton = document.getElementById('open-add-investasi-modal');
    if (investasiButton) investasiButton.onclick = () => toggleModal('add-investasi-modal', true);

    const ziswafButton = document.getElementById('open-add-ziswaf-modal');
    if (ziswafButton) ziswafButton.onclick = () => toggleModal('add-ziswaf-modal', true);

    const userButton = document.getElementById('open-add-user-modal');
    if (userButton) userButton.onclick = () => toggleModal('add-user-modal', true);


    switch (pageName) {
        case 'dashboard':
            setTimeout(renderDashboardCharts, 100);
            break;
        case 'nasabah-index':
            // Logic specific to nasabah index if needed
            break;
        case 'rekening-index':
            // No specific JS needed for now, as data is hardcoded for demo
            break;
        // Add more cases for other pages if they need specific JS
        default:
            console.log('No specific JS for this page.');
            break;
    }
}

function renderDashboardCharts() {
    const productDistributionCtx = document.getElementById('productDistributionChart');
    const loanTrendCtx = document.getElementById('loanTrendChart');

    if (!productDistributionCtx && !loanTrendCtx) {
        console.warn("Chart canvas elements not found for dashboard. Skipping chart rendering.");
        return;
    }

    if (productDistributionCtx) {
        window.currentChart = new Chart(productDistributionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Simpanan Mudharabah', 'Simpanan Wadiah', 'Investasi Sukuk', 'Tabungan Haji', 'Deposito Syariah'],
                datasets: [{
                    data: [35, 25, 20, 10, 10], // Sample data
                    backgroundColor: [
                        'var(--admin-primary-light)',
                        '#34D399',
                        'var(--admin-accent-gold)',
                        '#3B82F6',
                        '#8B5CF6'
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Poppins'
                            }
                        }
                    },
                    title: {
                        display: false,
                    }
                }
            }
        });
    }

    if (loanTrendCtx) {
        window.currentChart = new Chart(loanTrendCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                datasets: [
                    {
                        label: 'Jumlah Pembiayaan Baru',
                        data: [300, 450, 400, 500, 550, 600],
                        backgroundColor: 'var(--admin-primary-light)',
                        borderColor: 'var(--admin-primary-light)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: { family: 'Poppins' }
                        },
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)'
                        }
                    },
                    x: {
                        ticks: {
                            font: { family: 'Poppins' }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}



// Expose functions to global scope (needed by index.html)
window.initializeLayout = initializeLayout;
window.navigateTo = navigateTo;
window.initializeModals = initializeModals;