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
    
	// YouTube Video Control
function playVideo() {
    const iframe = document.querySelector('.video-player iframe');
    const playBtn = document.getElementById('play-btn');
    
    if (iframe) {
        // Змінюємо src, щоб активувати автопрогравання
        const currentSrc = iframe.src;
        if (!currentSrc.includes('autoplay=1')) {
            iframe.src = currentSrc.replace('autoplay=0', 'autoplay=1');
        }
        
        // Оновлюємо кнопку
        playBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Завантаження...';
        playBtn.disabled = true;
        
        // Через 3 секунди повертаємо нормальний стан
        setTimeout(() => {
            playBtn.innerHTML = '<i class="fas fa-check"></i> Відео запущено';
            playBtn.style.background = 'var(--medical-green)';
        }, 3000);
    }
}

// Альтернатива: показати картинку-прев'ю, якщо відео не працює
function showVideoAlternative() {
    const videoContainer = document.querySelector('.video-player');
    if (videoContainer) {
        videoContainer.innerHTML = `
            <div class="video-fallback">
                <img src="https://images.pexels.com/photos/4386469/pexels-photo-4386469.jpeg" 
                     alt="СЛР демонстрація" 
                     class="fallback-image">
                <div class="fallback-overlay">
                    <a href="https://www.youtube.com/watch?v=EEYkfN5ELkE" 
                       target="_blank" 
                       class="fallback-link">
                        <i class="fab fa-youtube"></i>
                        <span>Дивитися відео на YouTube</span>
                    </a>
                    <p class="fallback-note">Натисніть, щоб перейти до інструкції</p>
                </div>
            </div>
        `;
    }
}

// Перевірка чи відео завантажилось
document.addEventListener('DOMContentLoaded', function() {
    const videoIframe = document.querySelector('.video-player iframe');
    
    // Якщо відео не завантажиться за 5 секунд - показуємо альтернативу
    setTimeout(() => {
        if (videoIframe && !videoIframe.contentWindow) {
            showVideoAlternative();
        }
    }, 5000);
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