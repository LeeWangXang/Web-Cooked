// Sort Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.sort-dropdown');
    const toggle = document.querySelector('.sort-dropdown-toggle');
    const menu = document.querySelector('.sort-dropdown-menu');
    const options = document.querySelectorAll('.sort-option');
    const sortText = document.querySelector('.sort-text');

    // Toggle dropdown
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            const selectedText = this.querySelector('p').textContent;
            
            // Update active state
            options.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update toggle text
            sortText.textContent = selectedText;
            
            // QUAN TRỌNG: Thêm class applied khi đã chọn
            dropdown.classList.add('applied');
            
            // Close dropdown
            dropdown.classList.remove('active');
            
            // Dispatch custom event
            const event = new CustomEvent('sortChanged', {
                detail: { 
                    sortBy: selectedText.toLowerCase(),
                    displayText: selectedText
                }
            });
            dropdown.dispatchEvent(event);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdown.classList.remove('active');
        }
    });
});