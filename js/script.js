document.addEventListener('DOMContentLoaded', function() {
    // Update time elements
    function updateTimes() {
        const now = new Date();
        const timeOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        
        // Update deploy time
        const deployTime = document.getElementById('deploy-time');
        if (deployTime) {
            deployTime.textContent = now.toLocaleTimeString('uk-UA', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        
        // Update last update time
        const lastUpdate = document.getElementById('last-update');
        if (lastUpdate) {
            lastUpdate.textContent = now.toLocaleString('uk-UA', timeOptions);
        }
        
        // Update current time
        const currentTime = document.getElementById('current-time');
        if (currentTime) {
            currentTime.textContent = now.toLocaleString('uk-UA', timeOptions);
        }
    }
    
    // Simulate CI/CD status
    function updateStatus() {
        const statusElement = document.getElementById('status');
        const statusDot = document.getElementById('server-status');
        
        if (statusElement && statusDot) {
            // Random status for demo (90% success)
            const isSuccess = Math.random() > 0.1;
            
            if (isSuccess) {
                statusElement.textContent = 'Успішно';
                statusElement.style.color = '#10b981';
                statusDot.className = 'status-online';
                statusDot.textContent = '● Онлайн';
            } else {
                statusElement.textContent = 'В процесі...';
                statusElement.style.color = '#f59e0b';
                statusDot.className = 'status-online';
                statusDot.textContent = '● В процесі';
                
                // Auto-recover after 3 seconds
                setTimeout(() => {
                    statusElement.textContent = 'Успішно';
                    statusElement.style.color = '#10b981';
                }, 3000);
            }
        }
    }
    
    // Pipeline animation
    function animatePipeline() {
        const steps = document.querySelectorAll('.pipeline-step');
        steps.forEach((step, index) => {
            step.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    // Refresh button
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Оновлення...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                updateStatus();
                updateTimes();
                this.innerHTML = '<i class="fas fa-sync-alt"></i> Оновити статус';
                this.disabled = false;
                
                // Show notification
                showNotification('Статус оновлено успішно!');
            }, 1500);
        });
    }
    
    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Smooth scrolling for navigation links
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
    
    // Initialize
    updateTimes();
    updateStatus();
    animatePipeline();
    
    // Update time every minute
    setInterval(updateTimes, 60000);
    
    // Simulate status updates every 30 seconds
    setInterval(updateStatus, 30000);
    
    // Add some interactivity to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Console greeting
    console.log('%c🚀 CI/CD Pipeline Demo', 'color: #6366f1; font-size: 18px; font-weight: bold;');
    console.log('%cСайт автоматично деплоїться з GitHub на AWS!', 'color: #666;');
});
