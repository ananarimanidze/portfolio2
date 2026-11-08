// ==============================================================
// Theme Toggle Logic (Light / Dark Mode)
// ==============================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

function updateThemeIcons() {
    if (!themeToggleLightIcon || !themeToggleDarkIcon) return;

    if (document.documentElement.classList.contains('dark')) {
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleLightIcon.classList.add('hidden');
    }
}

if (themeToggleBtn) {
    updateThemeIcons();

    themeToggleBtn.addEventListener('click', function () {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            console.log('თემა შეიცვალა: Light Mode');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            console.log('თემა შეიცვალა: Dark Mode');
        }
        updateThemeIcons();
    });
}

// ==============================================================
// API Fetch - კომპანიის თანამშრომლები
// ==============================================================
const employeesList = document.getElementById('employees-list');
const employeesLoading = document.getElementById('employees-loading');
const employeesError = document.getElementById('employees-error');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
        return response.json();
    })
    .then(function (users) {
        // კონსოლში სახელების დალოგვა
        console.log('კომპანიის თანამშრომლების სახელები:');
        users.forEach(function (user) {
            console.log(user.name);
        });

        // HTML-ში გამოჩენა
        if (employeesList && employeesLoading) {
            employeesLoading.style.display = 'none';

            users.forEach(function (user) {
                const li = document.createElement('li');
                li.className = 'flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-500 transition';

                // Avatar (სახელის პირველი ასო)
                const avatar = document.createElement('div');
                avatar.className = 'w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base shrink-0';
                avatar.textContent = user.name.charAt(0);

                // ინფო
                const info = document.createElement('div');
                info.className = 'min-w-0';

                const name = document.createElement('p');
                name.className = 'font-semibold text-slate-800 dark:text-white text-sm truncate';
                name.textContent = user.name;

                const email = document.createElement('a');
                email.className = 'text-xs text-indigo-600 dark:text-indigo-400 hover:underline truncate block';
                email.href = 'mailto:' + user.email;
                email.textContent = user.email;

                info.appendChild(name);
                info.appendChild(email);
                li.appendChild(avatar);
                li.appendChild(info);
                employeesList.appendChild(li);
            });
        }
    })
    .catch(function (error) {
        console.error('შეცდომა API-ს გამოძახებისას:', error);
        if (employeesLoading) employeesLoading.style.display = 'none';
        if (employeesError) employeesError.classList.remove('hidden');
    });

// ==============================================================
// Burger Menu - მობილური ნავიგაციის გახსნა/დახურვა
// ==============================================================
const burgerBtn = document.getElementById('burger-label');
const mobileMenu = document.getElementById('mobile-menu');

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', function (event) {
        // checkbox-ს ვიყენებთ CSS-ის გამო, ამიტომ ვეყრდნობით მის მდგომარეობას
        // label-ზე click-ი checkbox-ს ჯერ ვერ შეუცვლია მნიშვნელობას, ამიტომ !checked = ახალი მდგომარეობა
        const isNowOpen = !document.getElementById('menu-toggle').checked;

        if (isNowOpen) {
            mobileMenu.style.display = 'block';
            console.log('მობილური მენიუ გაიხსნა', { timestamp: new Date().toLocaleTimeString() });
        } else {
            mobileMenu.style.display = 'none';
            console.log('მობილური მენიუ დაიხურა', { timestamp: new Date().toLocaleTimeString() });
        }
    });
}
