// Симуляція перевірки статусу CI/CD
document.addEventListener('DOMContentLoaded', function() {
    const statusElement = document.getElementById('build-status');
    const refreshBtn = document.getElementById('refresh-btn');
    const lastUpdateElement = document.getElementById('last-update');
    
    // Встановлюємо дату останнього оновлення
    const now = new Date();
    lastUpdateElement.textContent = now.toLocaleString('uk-UA');
    
    // Функція для отримання статусу
    function updateBuildStatus() {
        statusElement.innerHTML = 'Останній деплой: <span class="loading">Перевірка...</span>';
        
        // Симуляція запиту до API
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2; // 80% шанс успіху
            const time = new Date().toLocaleTimeString('uk-UA');
            
            if (isSuccess) {
                statusElement.innerHTML = `Останній деплой: <span class="success">✅ Успішно (${time})</span>`;
            } else {
                statusElement.innerHTML = `Останній деплой: <span class="error">❌ Помилка (${time})</span>`;
            }
        }, 1000);
    }
    
    // Оновлюємо статус при завантаженні
    updateBuildStatus();
    
    // Обробник кнопки оновлення
    refreshBtn.addEventListener('click', updateBuildStatus);
    
    // Додаємо ефект при наведенні на картки
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });
    
    // Проста анімація заголовка
    const title = document.querySelector('.hero h1');
    title.style.opacity = '0';
    title.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 300);
});