// Ingredient Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filter = document.querySelector('.ingredient-filter');
    const toggle = document.querySelector('.ingredient-filter-toggle');
    const menu = document.querySelector('.ingredient-filter-menu');
    const options = document.querySelectorAll('.ingredient-option');

    // Hàm cập nhật badge
    function updateFilterBadge(selectedCount) {
        let badge = toggle.querySelector('.filter-badge');
        
        if (selectedCount > 0) {
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'filter-badge';
                // Chèn badge trước icon
                toggle.insertBefore(badge, toggle.querySelector('svg'));
            }
            badge.textContent = selectedCount;
            filter.classList.add('applied');
        } else {
            if (badge) badge.remove();
            filter.classList.remove('applied');
        }
    }

    // Toggle filter menu
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        filter.classList.toggle('active');
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
            
            // Toggle checkbox icon
            const checkbox = this.querySelector('.ingredient-checkbox');
            if (this.classList.contains('selected')) {
                checkbox.innerHTML = `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.1668 5.75L8.62516 16.2917L3.8335 11.5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
            } else {
                checkbox.innerHTML = '';
            }
            
            // Đếm số option đã chọn
            const selectedOptions = Array.from(document.querySelectorAll('.ingredient-option.selected'));
            
            // Cập nhật badge
            updateFilterBadge(selectedOptions.length);
            
            // Dispatch custom event
            const event = new CustomEvent('ingredientFilterChanged', {
                detail: { 
                    selectedIngredients: selectedOptions.map(opt => opt.querySelector('.ingredient-label').textContent.trim())
                }
            });
            filter.dispatchEvent(event);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!filter.contains(e.target)) {
            filter.classList.remove('active');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            filter.classList.remove('active');
        }
    });
});