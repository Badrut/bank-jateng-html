// src/admin.js

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarToggleMobile = document.getElementById('sidebar-toggle-mobile');
    const contentContainer = document.getElementById('content-container');
    const pageTitle = document.getElementById('page-title');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    const addNasabahModal = document.getElementById('add-nasabah-modal');
    const openAddNasabahModalBtn = document.getElementById('open-add-nasabah-modal'); // Akan ditambahkan nanti di HTML Manajemen Nasabah
    const closeNasabahModalBtn = document.getElementById('close-nasabah-modal');
    const nasabahForm = document.getElementById('nasabah-form');
    const modalTitle = document.getElementById('modal-title');


    // --- Sidebar Toggle ---
    const toggleSidebar = () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
    };

    sidebarToggle.addEventListener('click', toggleSidebar);

    // Mobile sidebar toggle
    sidebarToggleMobile.addEventListener('click', () => {
        sidebar.classList.toggle('active-mobile');
    });

    // Close mobile sidebar if clicked outside
    document.addEventListener('click', (event) => {
        if (window.innerWidth < 1024 && sidebar.classList.contains('active-mobile') &&
            !sidebar.contains(event.target) && !sidebarToggleMobile.contains(event.target)) {
            sidebar.classList.remove('active-mobile');
        }
    });


    // --- Dynamic Content Loading ---
    const loadContent = (page) => {
        let contentHTML = '';
        let title = '';

        // Reset active menu
        navLinks.forEach(link => link.classList.remove('active-menu'));

        switch (page) {
            case 'dashboard':
                title = 'Dashboard';
                contentHTML = `
                    <h2 class="text-3xl font-bold mb-8 text-[var(--admin-primary-light)]">Ringkasan Dashboard Admin</h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div class="bg-[var(--admin-surface-white)] p-6 rounded-lg shadow-md flex items-center justify-between border border-[var(--admin-border-light)]">
                            <div>
                                <p class="text-sm text-[var(--admin-text-secondary)]">Total Nasabah</p>
                                <h3 class="text-3xl font-bold text-[var(--admin-text-dark)]">12,345</h3>
                            </div>
                            <i class="fas fa-users text-4xl text-[var(--admin-primary-light)] opacity-50"></i>
                        </div>
                        <div class="bg-[var(--admin-surface-white)] p-6 rounded-lg shadow-md flex items-center justify-between border border-[var(--admin-border-light)]">
                            <div>
                                <p class="text-sm text-[var(--admin-text-secondary)]">Total Saldo Simpanan</p>
                                <h3 class="text-3xl font-bold text-[var(--admin-text-dark)]">Rp 5.2 Triliun</h3>
                            </div>
                            <i class="fas fa-wallet text-4xl text-[var(--admin-accent-gold)] opacity-50"></i>
                        </div>
                        <div class="bg-[var(--admin-surface-white)] p-6 rounded-lg shadow-md flex items-center justify-between border border-[var(--admin-border-light)]">
                            <div>
                                <p class="text-sm text-[var(--admin-text-secondary)]">Pembiayaan Aktif</p>
                                <h3 class="text-3xl font-bold text-[var(--admin-text-dark)]">8,765</h3>
                            </div>
                            <i class="fas fa-hand-holding-usd text-4xl text-blue-500 opacity-50"></i>
                        </div>
                        <div class="bg-[var(--admin-surface-white)] p-6 rounded-lg shadow-md flex items-center justify-between border border-[var(--admin-border-light)]">
                            <div>
                                <p class="text-sm text-[var(--admin-text-secondary)]">Transaksi Hari Ini</p>
                                <h3 class="text-3xl font-bold text-[var(--admin-text-dark)]">1,234</h3>
                            </div>
                            <i class="fas fa-exchange-alt text-4xl text-purple-500 opacity-50"></i>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div class="bg-[var(--admin-surface-white)] p-6 rounded-lg shadow-md border border-[var(--admin-border-light)]">
                            <h3 class="text-lg font-bold text-[var(--admin-text-dark)] mb-4">Distribusi Produk Simpanan</h3>
                            <div class="relative h-72">
                                <canvas id="productDistributionChart"></canvas>
                            </div>
                        </div>
                        <div class="bg-[var(--admin-surface-white)] p-6 rounded-lg shadow-md border border-[var(--admin-border-light)]">
                            <h3 class="text-lg font-bold text-[var(--admin-text-dark)] mb-4">Tren Pembiayaan Baru (Bulanan)</h3>
                            <div class="relative h-72">
                                <canvas id="loanTrendChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="bg-[var(--admin-surface-white)] p-6 rounded-lg shadow-md border border-[var(--admin-border-light)]">
                        <h3 class="text-lg font-bold text-[var(--admin-text-dark)] mb-4">Aktivitas Terbaru</h3>
                        <ul class="divide-y divide-[var(--admin-border-light)]">
                            <li class="py-3 flex items-center">
                                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                                <div>
                                    <p class="font-medium">Rekening baru dibuka oleh <span class="font-semibold">Budi Santoso</span></p>
                                    <p class="text-sm text-[var(--admin-text-secondary)]">2 menit yang lalu</p>
                                </div>
                            </li>
                            <li class="py-3 flex items-center">
                                <i class="fas fa-exclamation-triangle text-orange-500 mr-3"></i>
                                <div>
                                    <p class="font-medium">Pembayaran angsuran <span class="font-semibold">Ani Fatimah</span> jatuh tempo</p>
                                    <p class="text-sm text-[var(--admin-text-secondary)]">1 jam yang lalu</p>
                                </div>
                            </li>
                            <li class="py-3 flex items-center">
                                <i class="fas fa-bell text-blue-500 mr-3"></i>
                                <div>
                                    <p class="font-medium">Pesan baru dari sistem: Update API Maintenance</p>
                                    <p class="text-sm text-[var(--admin-text-secondary)]">Kemarin</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                `;
                // Function to render charts after content is loaded
                setTimeout(() => {
                    renderDashboardCharts();
                }, 100);
                break;
            case 'nasabah':
                title = 'Manajemen Nasabah';
                contentHTML = `
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-3xl font-bold text-[var(--admin-primary-light)]">Daftar Nasabah</h2>
                        <button id="open-add-nasabah-modal" class="bg-[var(--admin-primary-light)] text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors flex items-center">
                            <i class="fas fa-plus mr-2"></i> Tambah Nasabah
                        </button>
                    </div>

                    <div class="bg-[var(--admin-surface-white)] p-6 rounded-lg shadow-md border border-[var(--admin-border-light)] table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nama Lengkap</th>
                                    <th>Email</th>
                                    <th>No. HP</th>
                                    <th>NIK</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-[var(--admin-border-light)]">
                                    <td>1001</td>
                                    <td>Budi Santoso</td>
                                    <td>budi.s@example.com</td>
                                    <td>081234567890</td>
                                    <td>3304xxxxxxxxxx123</td>
                                    <td><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Aktif</span></td>
                                    <td>
                                        <button class="text-blue-600 hover:text-blue-800 mr-2" title="Detail"><i class="fas fa-eye"></i></button>
                                        <button class="text-yellow-600 hover:text-yellow-800 mr-2" title="Edit"><i class="fas fa-edit"></i></button>
                                        <button class="text-red-600 hover:text-red-800" title="Hapus"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr class="border-b border-[var(--admin-border-light)]">
                                    <td>1002</td>
                                    <td>Siti Aminah</td>
                                    <td>siti.a@example.com</td>
                                    <td>085678901234</td>
                                    <td>3304xxxxxxxxxx456</td>
                                    <td><span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Aktif</span></td>
                                    <td>
                                        <button class="text-blue-600 hover:text-blue-800 mr-2" title="Detail"><i class="fas fa-eye"></i></button>
                                        <button class="text-yellow-600 hover:text-yellow-800 mr-2" title="Edit"><i class="fas fa-edit"></i></button>
                                        <button class="text-red-600 hover:text-red-800" title="Hapus"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr class="border-b border-[var(--admin-border-light)]">
                                    <td>1003</td>
                                    <td>Joko Susilo</td>
                                    <td>joko.s@example.com</td>
                                    <td>087890123456</td>
                                    <td>3304xxxxxxxxxx789</td>
                                    <td><span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Nonaktif</span></td>
                                    <td>
                                        <button class="text-blue-600 hover:text-blue-800 mr-2" title="Detail"><i class="fas fa-eye"></i></button>
                                        <button class="text-yellow-600 hover:text-yellow-800 mr-2" title="Edit"><i class="fas fa-edit"></i></button>
                                        <button class="text-red-600 hover:text-red-800" title="Hapus"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                </tbody>
                        </table>
                    </div>
                `;
                break;
            // Tambahkan case lain untuk halaman lainnya
            case 'rekening':
                title = 'Manajemen Rekening';
                contentHTML = `<h2 class="text-3xl font-bold text-[var(--admin-primary-light)]">Manajemen Rekening - Konten Akan Datang</h2>
                               <p class="mt-4 text-[var(--admin-text-secondary)]">Di sini akan ada daftar rekening nasabah, detail saldo, dan opsi manajemen.</p>`;
                break;
            case 'pembiayaan':
                title = 'Manajemen Pembiayaan';
                contentHTML = `<h2 class="text-3xl font-bold text-[var(--admin-primary-light)]">Manajemen Pembiayaan - Konten Akan Datang</h2>
                               <p class="mt-4 text-[var(--admin-text-secondary)]">Bagian ini akan menampilkan detail pembiayaan nasabah, status angsuran, dan persetujuan pengajuan.</p>`;
                break;
            case 'investasi':
                title = 'Manajemen Investasi';
                contentHTML = `<h2 class="text-3xl font-bold text-[var(--admin-primary-light)]">Manajemen Investasi - Konten Akan Datang</h2>
                               <p class="mt-4 text-[var(--admin-text-secondary)]">Modul untuk mengelola produk investasi dan portofolio nasabah.</p>`;
                break;
            case 'transaksi':
                title = 'Riwayat Transaksi';
                contentHTML = `<h2 class="text-3xl font-bold text-[var(--admin-primary-light)]">Riwayat Transaksi - Konten Akan Datang</h2>
                               <p class="mt-4 text-[var(--admin-text-secondary)]">Detail semua transaksi yang terjadi di sistem, dengan filter dan pencarian.</p>`;
                break;
            case 'nisbah':
                title = 'Nisbah & Bagi Hasil';
                contentHTML = `<h2 class="text-3xl font-bold text-[var(--admin-primary-light)]">Nisbah & Bagi Hasil - Konten Akan Datang</h2>
                               <p class="mt-4 text-[var(--admin-text-secondary)]">Pengelolaan rasio bagi hasil dan proses distribusi.</p>`;
                break;
            case 'notifikasi':
                title = 'Notifikasi & Pesan';
                contentHTML = `<h2 class="text-3xl font-bold text-[var(--admin-primary-light)]">Notifikasi & Pesan - Konten Akan Datang</h2>
                               <p class="mt-4 text-[var(--admin-text-secondary)]">Halaman untuk membuat dan mengelola notifikasi sistem untuk nasabah.</p>`;
                break;
            case 'zakat-infaq':
                title = 'Zakat & Infaq';
                contentHTML = `<h2 class="text-3xl font-bold text-[var(--admin-primary-light)]">Zakat & Infaq - Konten Akan Datang</h2>
                               <p class="mt-4 text-[var(--admin-text-secondary)]">Pencatatan dan laporan pembayaran zakat serta infaq.</p>`;
                break;
            case 'users-management':
                title = 'Manajemen Pengguna (Staf)';
                contentHTML = `<h2 class="text-3xl font-bold text-[var(--admin-primary-light)]">Manajemen Pengguna (Staf) - Konten Akan Datang</h2>
                               <p class="mt-4 text-[var(--admin-text-secondary)]">Manajemen akun staf bank, peran, dan hak akses.</p>`;
                break;
            case 'settings':
                title = 'Pengaturan Sistem';
                contentHTML = `<h2 class="text-3xl font-bold text-[var(--admin-primary-light)]">Pengaturan Sistem - Konten Akan Datang</h2>
                               <p class="mt-4 text-[var(--admin-text-secondary)]">Konfigurasi umum aplikasi, log, dll.</p>`;
                break;
            default:
                title = 'Halaman Tidak Ditemukan';
                contentHTML = `<p class="text-red-500">Konten untuk halaman ini belum tersedia.</p>`;
        }

        contentContainer.innerHTML = contentHTML;
        pageTitle.textContent = title;

        // Mark active menu
        const activeLink = document.querySelector(`.sidebar-nav a[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active-menu');
        }

        // Re-attach event listener for the "Tambah Nasabah" button IF it exists
        if (page === 'nasabah') {
            const currentOpenNasabahModalBtn = document.getElementById('open-add-nasabah-modal');
            if (currentOpenNasabahModalBtn) {
                currentOpenNasabahModalBtn.addEventListener('click', () => {
                    addNasabahModal.classList.remove('hidden');
                    addNasabahModal.classList.add('flex');
                    modalTitle.textContent = 'Tambah Nasabah Baru';
                    nasabahForm.reset();
                    // You might want to store current data-id for editing here if applicable
                });
            }
        }
    };

    // Initial load of dashboard content
    loadContent('dashboard');

    // Event listeners for sidebar navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.currentTarget.dataset.page;
            loadContent(page);
            // Close mobile sidebar after selection
            if (window.innerWidth < 1024) {
                sidebar.classList.remove('active-mobile');
            }
        });
    });

    // --- Modal Interactivity for Nasabah Form ---
    if (closeNasabahModalBtn) {
        closeNasabahModalBtn.addEventListener('click', () => {
            addNasabahModal.classList.add('hidden');
            addNasabahModal.classList.remove('flex');
        });
    }

    if (nasabahForm) {
        nasabahForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you'd collect form data and send it to your Laravel API here
            const formData = new FormData(nasabahForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Form Submitted (for demo):', data);
            alert('Data Nasabah akan disimpan ke API: ' + JSON.stringify(data, null, 2));

            // Close modal after submission (or show success message)
            addNasabahModal.classList.add('hidden');
            addNasabahModal.classList.remove('flex');
            nasabahForm.reset();
            // You might want to refresh the nasabah list here after successful API call
        });
    }

    // --- Chart.js Initialization (for Dashboard Page) ---
    function renderDashboardCharts() {
        const productDistributionCtx = document.getElementById('productDistributionChart');
        const loanTrendCtx = document.getElementById('loanTrendChart');

        // Check if contexts exist before creating charts
        if (productDistributionCtx) {
            new Chart(productDistributionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Simpanan Mudharabah', 'Simpanan Wadiah', 'Investasi Sukuk', 'Tabungan Haji', 'Deposito Syariah'],
                    datasets: [{
                        data: [35, 25, 20, 10, 10], // Sample data
                        backgroundColor: [
                            '#047857', // Primary Green
                            '#34D399', // Light Emerald
                            '#F59E0B', // Accent Gold
                            '#3B82F6', // Blue for contrast
                            '#8B5CF6'  // Purple for contrast
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
            new Chart(loanTrendCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                    datasets: [
                        {
                            label: 'Jumlah Pembiayaan Baru',
                            data: [300, 450, 400, 500, 550, 600], // Sample data
                            backgroundColor: '#047857', // Primary Green
                            borderColor: '#047857',
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
                                color: 'rgba(226, 232, 240, 0.5)' // admin-border-light with opacity
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
});