document.addEventListener('DOMContentLoaded', function() {
    // Таби для травм
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Видалити активний клас у всіх
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Додати активний клас натиснутій кнопці
            btn.classList.add('active');
            
            // Показати відповідний контент
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Плавна прокрутка для навігації
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Активна навігація при скролі
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Анімація статистики
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const originalText = stat.textContent;
        stat.textContent = '0';
        
        let counter = 0;
        const target = originalText.replace(/\D/g, '');
        const increment = target / 50;
        
        const updateCounter = () => {
            if (counter < target) {
                counter += increment;
                stat.textContent = Math.floor(counter) + originalText.replace(/[0-9]/g, '');
                setTimeout(updateCounter, 20);
            } else {
                stat.textContent = originalText;
            }
        };
        
        // Запускати при попаданні в область видимості
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
    
    // Ефект для екстрених номерів
    const phoneNumbers = document.querySelectorAll('.phone-number');
    phoneNumbers.forEach(number => {
        number.addEventListener('click', function() {
            const tempInput = document.createElement('input');
            tempInput.value = this.textContent;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Візуальний ефект
            const originalColor = this.style.color;
            this.style.color = 'green';
            setTimeout(() => {
                this.style.color = originalColor;
            }, 500);
        });
    });
    
    // Кнопка "Почати навчання"
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            ctaButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Завантаження...';
            setTimeout(() => {
                ctaButton.innerHTML = '<i class="fas fa-book-medical"></i> Почати навчання';
            }, 1500);
        });
    }
    
    // Консольне повідомлення
    console.log('%c🏥 Сайт "Перша медична допомога"', 'color: #e63946; font-size: 18px; font-weight: bold;');
    console.log('%cВаші знання можуть врятувати життя!', 'color: #457b9d;');
    console.log('%c📞 Запам\'ятайте: Швидка - 103, Поліція - 102, Пожежна - 101', 'color: #2a9d8f;');
});