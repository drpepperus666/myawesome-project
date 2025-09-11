const dialog = document.getElementById('contactDialog');
const openButton = document.getElementById('openDialog');
const closeButton = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
const phoneInput = document.getElementById('phone');

let lastActiveElement = null;

if (openButton) {
    openButton.addEventListener('click', () => {
        lastActiveElement = document.activeElement;
        dialog.showModal();
        dialog.querySelector('input, select, textarea, button').focus();
    });
}

if (closeButton) {
    closeButton.addEventListener('click', () => {
        dialog.close('cancel');
    });
}

if (dialog) {
    dialog.addEventListener('close', () => {
        lastActiveElement?.focus();
    });
}

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const allInputs = form.querySelectorAll('input, select, textarea');
        allInputs.forEach(input => {
            input.setCustomValidity('');
            input.removeAttribute('aria-invalid');
        });

        if (!form.checkValidity()) {
            form.reportValidity();

            allInputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.setAttribute('aria-invalid', 'true');
                }
            });
            return;
        }

        dialog.close('success');
        form.reset();
        allInputs.forEach(input => input.removeAttribute('aria-invalid'));

        alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    });
}

if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let inputNumbersValue = this.value.replace(/\D/g, '');
        if (inputNumbersValue.startsWith('8')) {
            inputNumbersValue = '7' + inputNumbersValue.slice(1);
        }
        inputNumbersValue = inputNumbersValue.substring(0, 11);

        let formattedInputValue = '';

        if (inputNumbersValue.length > 0) {
            formattedInputValue = '+7';
        }
        if (inputNumbersValue.length > 1) {
            formattedInputValue += ' (' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 4) {
            formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 7) {
            formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 9) {
            formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }

        this.value = formattedInputValue;
    });
}

(function() {
    const KEY = 'theme';
    const btn = document.querySelector('.theme-toggle');
    
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem(KEY);
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('theme-dark');
        if (btn) btn.setAttribute('aria-pressed', 'true');
    }

    if (btn) {
        btn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('theme-dark');
            btn.setAttribute('aria-pressed', String(isDark));
            localStorage.setItem(KEY, isDark ? 'dark' : 'light');
        });
    }
})();