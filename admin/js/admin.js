// js/admin.js

let contentContainer;
let pageTitleElement; // This refers to the h1 inside the header
let layoutTitleElement; // This refers to the <title> tag in index.html
let navLinks;
let sidebar;
let mainContent;
let currentChart = null; // To destroy previous chart instances
let currentChart2 = null; // To destroy previous chart instances for the second chart

// Utility function to manage modal visibility
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (modal) {
        if (show) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            // Only reset form if it's an input form, not a display modal
            if (modal.querySelector('form')) {
                modal.querySelector('form').reset(); 
            }
        } else {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
}

// Global modal initialization (called once from index.html)
function initializeModals() {
    // --- Add Nasabah Modal ---
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
        showNotification('Data Nasabah akan disimpan ke API: ' + JSON.stringify(data, null, 2), 'success');
        toggleModal('add-nasabah-modal', false);
    });

    // --- Detail Nasabah Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('open-detail-nasabah-modal') || e.target.closest('.open-detail-nasabah-modal')) {
            e.preventDefault();
            // Simulate fetching data for the clicked row
            const row = e.target.closest('tr');
            const nasabahData = {
                id: row.cells[0].textContent,
                nama_lengkap: row.cells[1].textContent,
                email: row.cells[2].textContent,
                nomor_hp: row.cells[3].textContent,
                nik: row.cells[4].textContent,
                status: row.cells[5].textContent,
                tempat_lahir: 'Semarang', 
                tanggal_lahir: '1990-01-15', 
                jenis_kelamin: 'Laki-laki', 
                status_perkawinan: 'Menikah', 
                nama_ibu_kandung: 'Ibu Budi', 
                alamat_ktp: 'Jl. Contoh No. 123, RT 01/RW 01, Kel. Demo, Kec. Uji, Kota/Kab. Simulasi, Provinsi Contoh', 
                alamat_domisili: '(Sama dengan KTP)', 
                pekerjaan: 'Karyawan Swasta', 
                penghasilan_bulanan: 'Rp 7.500.000', 
                sumber_dana: 'Gaji Bulanan', 
                tujuan_hubungan_bank: 'Tabungan dan Pembayaran tagihan', 
                upload_ktp: 'Tersedia', 
                upload_npwp: 'Tersedia',
                upload_kk: 'Tersedia'
            };
            showNasabahDetailModal(nasabahData);
        }
    });
    document.getElementById('close-detail-nasabah-modal')?.addEventListener('click', () => toggleModal('detail-nasabah-modal', false));


    // --- Add Rekening Modal ---
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
        showNotification('Data Rekening akan disimpan ke API: ' + JSON.stringify(data, null, 2), 'success');
        toggleModal('add-rekening-modal', false);
    });

    // --- Detail Rekening Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('open-detail-rekening-modal') || e.target.closest('.open-detail-rekening-modal')) {
            e.preventDefault();
            // Simulate fetching data for the clicked row
            const row = e.target.closest('tr');
            const rekeningData = {
                id_rekening: row.cells[0].textContent,
                nomor_rekening: row.cells[1].textContent,
                nama_nasabah_rekening: row.cells[2].textContent,
                jenis_rekening: row.cells[3].textContent,
                setoran_awal: row.cells[4].textContent, // Assuming this is saldo in table
                status_rekening: row.cells[5].textContent,
                tanggal_pembukaan: row.cells[6].textContent,
                // Additional simulated data not directly in table cells
                nasabah_id_rekening: 'IDN-001', // Placeholder
                akad_rekening: 'Wadiah Yad Dhamanah', // Placeholder
                tujuan_pembukaan_rekening: 'Tabungan gaji bulanan dan transaksi sehari-hari', // Placeholder
                saldo_terkini: row.cells[4].textContent // Using the same cell as setoran_awal for current balance
            };
            showRekeningDetailModal(rekeningData);
        }
    });
    document.getElementById('close-detail-rekening-modal')?.addEventListener('click', () => toggleModal('detail-rekening-modal', false));


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
        showNotification('Data Pembiayaan akan disimpan ke API: ' + JSON.stringify(data, null, 2), 'success');
        toggleModal('add-pembiayaan-modal', false);
    });

    // --- Detail Pembiayaan Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('open-detail-pembiayaan-modal') || e.target.closest('.open-detail-pembiayaan-modal')) {
            e.preventDefault();
            // Simulate fetching data for the clicked row
            const row = e.target.closest('tr');
            const pembiayaanData = {
                id_pembiayaan: row.cells[0].textContent,
                nama_nasabah_pembiayaan: row.cells[1].textContent,
                jenis_pembiayaan: row.cells[2].textContent,
                jumlah_pembiayaan: row.cells[3].textContent,
                tenor_pembiayaan: row.cells[4].textContent,
                status_pembiayaan: row.cells[5].textContent,
                tanggal_pengajuan: row.cells[6].textContent,
                // Additional simulated data not directly in table cells
                nasabah_id_pembiayaan: 'IDN-002', // Placeholder
                akad_pembiayaan: 'Murabahah', // Placeholder - often derived from jenis_pembiayaan
                tujuan_pembiayaan: 'Pembelian kendaraan roda empat', // Placeholder
                jenis_jaminan: 'BPKB Kendaraan', // Placeholder
                nilai_jaminan: 'Rp 70.000.000', // Placeholder
                dokumen_pendukung_pembiayaan: 'Tersedia' // Simulate file status
            };
            showPembiayaanDetailModal(pembiayaanData);
        }
    });
    document.getElementById('close-detail-pembiayaan-modal')?.addEventListener('click', () => toggleModal('detail-pembiayaan-modal', false));


    // --- Add Investasi Modal ---
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
        showNotification('Data Investasi akan disimpan ke API: ' + JSON.stringify(data, null, 2), 'success');
        toggleModal('add-investasi-modal', false);
    });

    // --- Detail Investasi Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('open-detail-investasi-modal') || e.target.closest('.open-detail-investasi-modal')) {
            e.preventDefault();
            // Simulate fetching data for the clicked row
            const row = e.target.closest('tr');
            const investasiData = {
                id_investasi: row.cells[0].textContent,
                nama_nasabah_investasi: row.cells[1].textContent,
                jenis_investasi: row.cells[2].textContent, // e.g., Saham Syariah TLKM
                nilai_investasi: row.cells[3].textContent,
                tanggal_mulai_investasi: row.cells[4].textContent,
                jangka_waktu_investasi: row.cells[5].textContent,
                status_investasi: row.cells[6].textContent,
                // Additional simulated data not directly in table cells
                nasabah_id_investasi: 'IDN-003', // Placeholder
                akad_investasi: 'Musyarakah', // Placeholder
                frekuensi_bagi_hasil: 'Bulanan' // Placeholder
            };
            showInvestasiDetailModal(investasiData);
        }
    });
    document.getElementById('close-detail-investasi-modal')?.addEventListener('click', () => toggleModal('detail-investasi-modal', false));


    // --- Add ZISWAF Modal ---
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
        showNotification('Data ZISWAF akan disimpan ke API: ' + JSON.stringify(data, null, 2), 'success');
        toggleModal('add-ziswaf-modal', false);
    });

    // --- Detail ZISWAF Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('open-detail-ziswaf-modal') || e.target.closest('.open-detail-ziswaf-modal')) {
            e.preventDefault();
            // Simulate fetching data for the clicked row
            const row = e.target.closest('tr');
            const ziswafData = {
                id_ziswaf: row.cells[0].textContent,
                tanggal_penerimaan_ziswaf: row.cells[1].textContent,
                jenis_ziswaf: row.cells[2].textContent,
                nama_muzakki_donatur: row.cells[3].textContent,
                nominal_ziswaf: row.cells[4].textContent,
                status_ziswaf: row.cells[5].textContent, // Assuming this is status in table
                // Additional simulated data not directly in table cells
                sumber_dana_ziswaf: 'Penghasilan', // Placeholder
                tujuan_ziswaf: 'Fakih Miskin' // Placeholder
            };
            showZiswafDetailModal(ziswafData);
        }
    });
    document.getElementById('close-detail-ziswaf-modal')?.addEventListener('click', () => toggleModal('detail-ziswaf-modal', false));

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
        showNotification('Data Pengguna akan disimpan ke API: ' + JSON.stringify(data, null, 2), 'success');
        toggleModal('add-user-modal', false);
    });

    // --- Detail User Modal ---
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('open-detail-user-modal') || e.target.closest('.open-detail-user-modal')) {
            e.preventDefault();
            // Simulate fetching data for the clicked row
            const row = e.target.closest('tr');
            const userData = {
                id_user: row.cells[0].textContent,
                nama_lengkap_user: row.cells[1].textContent,
                email_user: row.cells[2].textContent,
                peran_user: row.cells[3].textContent,
                status_user: row.cells[4].textContent, // Assuming this is status in table
                waktu_dibuat_user: row.cells[5].textContent, // Assuming this is waktu dibuat in table
                // Additional simulated data not directly in table cells
                nomor_pegawai_user: 'BJS-00' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'), // Placeholder
                unit_kerja_user: 'Divisi Operasional' // Placeholder
            };
            showUserDetailModal(userData);
        }
    });
    document.getElementById('close-detail-user-modal')?.addEventListener('click', () => toggleModal('detail-user-modal', false));

    // --- Detail Transaksi Modal --- (NEWLY ADDED)
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('open-detail-transaksi-modal') || e.target.closest('.open-detail-transaksi-modal')) {
            e.preventDefault();
            // Simulate fetching data for the clicked row
            const row = e.target.closest('tr');
            const transaksiData = {
                id_transaksi: row.cells[0].textContent,
                tanggal_transaksi: row.cells[1].textContent,
                jenis_transaksi: row.cells[2].textContent,
                sumber_tujuan: row.cells[3].textContent,
                nominal_transaksi: row.cells[4].textContent,
                status_transaksi: row.cells[5].textContent,
                deskripsi_transaksi: row.cells[6].textContent,
                // Add more simulated data if necessary for a complete detail view
            };
            showTransaksiDetailModal(transaksiData);
        }
    });
    document.getElementById('close-detail-transaksi-modal')?.addEventListener('click', () => toggleModal('detail-transaksi-modal', false));


    console.log('All modals initialized.');
}

// Function to display custom notification/message box
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        const div = document.createElement('div');
        div.id = 'notification-container';
        div.className = 'fixed bottom-4 right-4 z-[10000] flex flex-col items-end space-y-2';
        document.body.appendChild(div);
    }

    const notification = document.createElement('div');
    notification.className = `p-4 rounded-lg shadow-lg text-white max-w-sm w-full animate-fade-in`;

    let bgColor = 'bg-gray-700'; // Default info
    if (type === 'success') {
        bgColor = 'bg-green-500';
    } else if (type === 'error') {
        bgColor = 'bg-red-500';
    } else if (type === 'warning') {
        bgColor = 'bg-yellow-500';
    }

    notification.classList.add(bgColor);
    notification.innerHTML = `<div class="font-bold mb-1">${type.charAt(0).toUpperCase() + type.slice(1)}!</div><div>${message}</div>`;

    notificationContainer.appendChild(notification);

    // Automatically remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('animate-fade-out'); // Assuming you have a fadeOut animation
        notification.addEventListener('animationend', () => notification.remove());
    }, 5000);
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

    // Profile Dropdown Toggle
    const profileTrigger = document.getElementById('profile-trigger');
    const profileDropdownContent = document.getElementById('profile-dropdown-content');

    if (profileTrigger) {
        profileTrigger.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent document click from closing it immediately
            toggleProfileDropdown(!profileDropdownContent.classList.contains('block'));
        });
    }

    // Close dropdown if clicked outside
    document.addEventListener('click', (event) => {
        const profileDropdownWrapper = document.getElementById('profile-dropdown-wrapper');
        // Ensure the click is outside both the trigger and the dropdown content
        if (profileDropdownWrapper && !profileDropdownWrapper.contains(event.target)) {
            toggleProfileDropdown(false);
        }
    });


    console.log('Layout initialized.');
}

// Function to toggle the profile dropdown visibility
function toggleProfileDropdown(show) {
    const dropdownContent = document.getElementById('profile-dropdown-content');
    const profileArrow = document.getElementById('profile-arrow');
    if (!dropdownContent || !profileArrow) {
        console.error("Profile dropdown elements not found.");
        return;
    }

    if (show) {
        // Show the dropdown with animation
        dropdownContent.classList.remove('hidden');
        // Apply animation classes with a small delay if needed, but Tailwind transitions generally handle this
        requestAnimationFrame(() => { // Use requestAnimationFrame for smoother transition
            dropdownContent.classList.remove('opacity-0', 'scale-95');
            dropdownContent.classList.add('block', 'opacity-100', 'scale-100');
        });
        profileArrow.classList.add('rotate-180');
    } else {
        // Hide the dropdown with animation
        dropdownContent.classList.remove('opacity-100', 'scale-100');
        dropdownContent.classList.add('opacity-0', 'scale-95');
        profileArrow.classList.remove('rotate-180');
        // Wait for the animation to complete before setting display to 'hidden'
        setTimeout(() => {
            dropdownContent.classList.add('hidden');
        }, 200); // This duration should match the transition-all duration
    }
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

        // Reset charts if error page is shown
        if (currentChart) {
            currentChart.destroy();
            currentChart = null;
        }
        if (currentChart2) {
            currentChart2.destroy();
            currentChart2 = null;
        }
    }
}


// Page Specific JavaScript Initialization
function initializePage(pageName) {
    console.log(`Initializing page: ${pageName}`);

    // Destroy previous chart instances if they exist
    if (currentChart) {
        currentChart.destroy();
    }
    if (currentChart2) {
        currentChart2.destroy();
    }
    currentChart = null;
    currentChart2 = null;


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

    // Re-attach event listeners for "Detail" buttons in the Nasabah table if it's the nasabah-index page
    if (pageName === 'nasabah-index') {
        // No need to explicitly re-attach here, as the delegated event listener on `document.body` handles clicks
        // on elements with `open-detail-nasabah-modal` class, even if they are dynamically added.
        console.log('Detail nasabah modal listeners are handled by delegation in initializeModals.');
    }
    // Re-attach event listeners for "Detail" buttons in the Rekening table if it's the rekening-index page
    if (pageName === 'rekening-index') {
        // No need to explicitly re-attach here, as the delegated event listener on `document.body` handles clicks
        // on elements with `open-detail-rekening-modal` class, even if they are dynamically added.
        console.log('Detail rekening modal listeners are handled by delegation in initializeModals.');
    }
    // Re-attach event listeners for "Detail" buttons in the Pembiayaan table if it's the pembiayaan-index page
    if (pageName === 'pembiayaan-index') {
        // No need to explicitly re-attach here, as the delegated event listener on `document.body` handles clicks
        // on elements with `open-detail-pembiayaan-modal` class, even if they are dynamically added.
        console.log('Detail pembiayaan modal listeners are handled by delegation in initializeModals.');
    }
    // Re-attach event listeners for "Detail" buttons in the Investasi table if it's the investasi-index page
    if (pageName === 'investasi-index') {
        console.log('Detail investasi modal listeners are handled by delegation in initializeModals.');
    }
    // Re-attach event listeners for "Detail" buttons in the ZISWAF table if it's the ziswaf-index page
    if (pageName === 'ziswaf-index') {
        console.log('Detail ZISWAF modal listeners are handled by delegation in initializeModals.');
    }
    // Re-attach event listeners for "Detail" buttons in the User table if it's the user-index page
    if (pageName === 'user-index') {
        console.log('Detail user modal listeners are handled by delegation in initializeModals.');
    }
    // Re-attach event listeners for "Detail" buttons in the Transaksi table if it's the transaksi-index page
    if (pageName === 'transaksi-index') { // NEWLY ADDED
        console.log('Detail transaksi modal listeners are handled by delegation in initializeModals.');
    }


    switch (pageName) {
        case 'dashboard':
            setTimeout(renderDashboardCharts, 100);
            break;
        case 'nasabah-index':
            // Logic specific to nasabah index if needed (e.g., initial data fetch for the table)
            break;
        case 'rekening-index':
            // Logic specific to rekening index if needed (e.g., initial data fetch for the table)
            break;
        case 'pembiayaan-index':
            // Logic specific to pembiayaan index if needed (e.g., initial data fetch for the table)
            break;
        case 'investasi-index': 
            // Logic specific to investasi index if needed
            break;
        case 'ziswaf-index': 
            // Logic specific to ziswaf index if needed
            break;
        case 'user-index': 
            // Logic specific to user index if needed
            break;
        case 'transaksi-index': // NEWLY ADDED
            // Logic specific to transaksi index if needed
            break;
        // Add more cases for other pages if they need specific JS
        default:
            console.log('No specific JS for this page.');
            break;
    }
}

// Function to populate and show the Nasabah Detail Modal
function showNasabahDetailModal(data) {
    // Check if element exists before setting textContent to prevent errors
    const setTextContent = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Element with ID '${id}' not found in detail modal.`);
        }
    };

    setTextContent('detail_nama_lengkap', data.nama_lengkap);
    setTextContent('detail_nik', data.nik);
    setTextContent('detail_tempat_lahir', data.tempat_lahir);
    setTextContent('detail_tanggal_lahir', data.tanggal_lahir);
    setTextContent('detail_jenis_kelamin', data.jenis_kelamin);
    setTextContent('detail_status_perkawinan', data.status_perkawinan);
    setTextContent('detail_nama_ibu_kandung', data.nama_ibu_kandung);
    setTextContent('detail_email', data.email);
    setTextContent('detail_nomor_hp', data.nomor_hp);
    setTextContent('detail_alamat_ktp', data.alamat_ktp);
    setTextContent('detail_alamat_domisili', data.alamat_domisili);
    setTextContent('detail_pekerjaan', data.pekerjaan);
    setTextContent('detail_penghasilan_bulanan', data.penghasilan_bulanan);
    setTextContent('detail_sumber_dana', data.sumber_dana);
    setTextContent('detail_tujuan_hubungan_bank', data.tujuan_hubungan_bank);
    setTextContent('detail_upload_ktp', data.upload_ktp);
    setTextContent('detail_upload_npwp', data.upload_npwp);
    setTextContent('detail_upload_kk', data.upload_kk); 

    toggleModal('detail-nasabah-modal', true);
}

// Function to populate and show the Rekening Detail Modal
function showRekeningDetailModal(data) {
    // Check if element exists before setting textContent to prevent errors
    const setTextContent = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Element with ID '${id}' not found in rekening detail modal.`);
        }
    };

    setTextContent('detail_id_rekening', data.id_rekening);
    setTextContent('detail_nomor_rekening', data.nomor_rekening);
    setTextContent('detail_nasabah_id_rekening', data.nasabah_id_rekening);
    setTextContent('detail_nama_nasabah_rekening', data.nama_nasabah_rekening);
    setTextContent('detail_jenis_rekening', data.jenis_rekening);
    setTextContent('detail_akad_rekening', data.akad_rekening);
    setTextContent('detail_setoran_awal', data.setoran_awal);
    setTextContent('detail_tanggal_pembukaan', data.tanggal_pembukaan);
    setTextContent('detail_tujuan_pembukaan_rekening', data.tujuan_pembukaan_rekening);
    setTextContent('detail_status_rekening', data.status_rekening);
    setTextContent('detail_saldo_terkini', data.saldo_terkini);

    toggleModal('detail-rekening-modal', true);
}

// Function to populate and show the Pembiayaan Detail Modal
function showPembiayaanDetailModal(data) {
    // Check if element exists before setting textContent to prevent errors
    const setTextContent = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Element with ID '${id}' not found in pembiayaan detail modal.`);
        }
    };

    setTextContent('detail_id_pembiayaan', data.id_pembiayaan);
    setTextContent('detail_nasabah_id_pembiayaan', data.nasabah_id_pembiayaan);
    setTextContent('detail_nama_nasabah_pembiayaan', data.nama_nasabah_pembiayaan);
    setTextContent('detail_jenis_pembiayaan', data.jenis_pembiayaan);
    setTextContent('detail_akad_pembiayaan', data.akad_pembiayaan);
    setTextContent('detail_jumlah_pembiayaan', data.jumlah_pembiayaan);
    setTextContent('detail_tenor_pembiayaan', data.tenor_pembiayaan);
    setTextContent('detail_tujuan_pembiayaan', data.tujuan_pembiayaan);
    setTextContent('detail_tanggal_pengajuan', data.tanggal_pengajuan);
    setTextContent('detail_status_pembiayaan', data.status_pembiayaan);
    setTextContent('detail_jenis_jaminan', data.jenis_jaminan);
    setTextContent('detail_nilai_jaminan', data.nilai_jaminan);
    setTextContent('detail_dokumen_pendukung_pembiayaan', data.dokumen_pendukung_pembiayaan);

    toggleModal('detail-pembiayaan-modal', true);
}

// Function to populate and show the Investasi Detail Modal
function showInvestasiDetailModal(data) {
    // Check if element exists before setting textContent to prevent errors
    const setTextContent = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Element with ID '${id}' not found in investasi detail modal.`);
        }
    };

    setTextContent('detail_id_investasi', data.id_investasi);
    setTextContent('detail_nasabah_id_investasi', data.nasabah_id_investasi);
    setTextContent('detail_nama_nasabah_investasi', data.nama_nasabah_investasi);
    setTextContent('detail_jenis_investasi', data.jenis_investasi);
    setTextContent('detail_akad_investasi', data.akad_investasi);
    setTextContent('detail_nilai_investasi', data.nilai_investasi);
    setTextContent('detail_jangka_waktu_investasi', data.jangka_waktu_investasi);
    setTextContent('detail_tanggal_mulai_investasi', data.tanggal_mulai_investasi);
    setTextContent('detail_frekuensi_bagi_hasil', data.frekuensi_bagi_hasil);
    setTextContent('detail_status_investasi', data.status_investasi);

    toggleModal('detail-investasi-modal', true);
}

// Function to populate and show the ZISWAF Detail Modal
function showZiswafDetailModal(data) {
    // Check if element exists before setting textContent to prevent errors
    const setTextContent = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Element with ID '${id}' not found in ZISWAF detail modal.`);
        }
    };

    setTextContent('detail_id_ziswaf', data.id_ziswaf);
    setTextContent('detail_tanggal_penerimaan_ziswaf', data.tanggal_penerimaan_ziswaf);
    setTextContent('detail_jenis_ziswaf', data.jenis_ziswaf);
    setTextContent('detail_nama_muzakki_donatur', data.nama_muzakki_donatur);
    setTextContent('detail_nominal_ziswaf', data.nominal_ziswaf);
    setTextContent('detail_sumber_dana_ziswaf', data.sumber_dana_ziswaf);
    setTextContent('detail_tujuan_ziswaf', data.tujuan_ziswaf);
    setTextContent('detail_status_ziswaf', data.status_ziswaf);

    toggleModal('detail-ziswaf-modal', true);
}

// Function to populate and show the User Detail Modal
function showUserDetailModal(data) {
    // Check if element exists before setting textContent to prevent errors
    const setTextContent = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Element with ID '${id}' not found in user detail modal.`);
        }
    };

    setTextContent('detail_id_user', data.id_user);
    setTextContent('detail_nomor_pegawai_user', data.nomor_pegawai_user);
    setTextContent('detail_nama_lengkap_user', data.nama_lengkap_user);
    setTextContent('detail_email_user', data.email_user);
    setTextContent('detail_peran_user', data.peran_user);
    setTextContent('detail_unit_kerja_user', data.unit_kerja_user);
    setTextContent('detail_status_user', data.status_user);
    setTextContent('detail_waktu_dibuat_user', data.waktu_dibuat_user);

    toggleModal('detail-user-modal', true);
}

// Function to populate and show the Transaksi Detail Modal (NEWLY ADDED)
function showTransaksiDetailModal(data) {
    // Check if element exists before setting textContent to prevent errors
    const setTextContent = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        } else {
            console.warn(`Element with ID '${id}' not found in transaksi detail modal.`);
        }
    };

    setTextContent('detail_id_transaksi', data.id_transaksi);
    setTextContent('detail_tanggal_transaksi', data.tanggal_transaksi);
    setTextContent('detail_jenis_transaksi', data.jenis_transaksi);
    setTextContent('detail_sumber_tujuan', data.sumber_tujuan);
    setTextContent('detail_nominal_transaksi', data.nominal_transaksi);
    setTextContent('detail_status_transaksi', data.status_transaksi);
    setTextContent('detail_deskripsi_transaksi', data.deskripsi_transaksi);

    toggleModal('detail-transaksi-modal', true);
}


function renderDashboardCharts() {
    const productDistributionCtx = document.getElementById('productDistributionChart');
    const loanTrendCtx = document.getElementById('loanTrendChart');

    // Sample data for charts
    const productDistributionData = {
        labels: ['Tabungan', 'Giro', 'Deposito', 'Pembiayaan', 'Investasi'],
        datasets: [{
            data: [30, 15, 20, 25, 10],
            backgroundColor: [
                '#3B82F6', // Blue
                '#10B981', // Emerald
                '#F59E0B', // Amber
                '#EF4444', // Red
                '#8B5CF6'  // Violet
            ],
            hoverOffset: 4
        }]
    };

    const loanTrendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        datasets: [{
            label: 'Pembiayaan Baru (Miliar Rp)',
            data: [10, 12, 15, 13, 16, 18],
            borderColor: '#047857', // Admin Primary Light
            backgroundColor: 'rgba(4, 120, 87, 0.2)',
            fill: true,
            tension: 0.3
        }]
    };

    // Ensure chart instances are destroyed before creating new ones
    if (currentChart) {
        currentChart.destroy();
    }
    if (currentChart2) {
        currentChart2.destroy();
    }

    if (productDistributionCtx) {
        currentChart = new Chart(productDistributionCtx, {
            type: 'doughnut',
            data: productDistributionData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#1e293b' // admin-text-dark
                        }
                    },
                    title: {
                        display: false,
                        text: 'Distribusi Produk'
                    }
                }
            }
        });
    }

    if (loanTrendCtx) {
        currentChart2 = new Chart(loanTrendCtx, {
            type: 'line',
            data: loanTrendData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#1e293b' // admin-text-dark
                        }
                    },
                    title: {
                        display: false,
                        text: 'Tren Pembiayaan'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#1e293b' // admin-text-dark
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#1e293b' // admin-text-dark
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
    }
    console.log('Dashboard charts rendered.');
}
