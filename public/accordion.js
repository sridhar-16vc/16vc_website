document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const content = item.querySelector('.faq-content');
        const plus = item.querySelector('.plus');
        
        // Initially hide all content except first item
        if (!item.classList.contains('active')) {
            content.style.display = 'none';
        }
        
        header.addEventListener('click', () => {
            // Toggle current item
            const isActive = item.classList.contains('active');
            
            // Close all items first
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-content').style.display = 'none';
                otherItem.querySelector('.plus').textContent = '+';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                content.style.display = 'block';
                plus.textContent = '-';
            }
        });
    });

    // Philosophy Accordion
    const philosophyItems = document.querySelectorAll('.accordion-item');
    
    philosophyItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.icon');
        
        // Initially hide all content except first item
        if (!item.classList.contains('active')) {
            content.style.display = 'none';
        }
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items first
            philosophyItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.display = 'none';
                otherItem.querySelector('.icon').textContent = '+';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                content.style.display = 'block';
                icon.textContent = '-';
            }
        });
    });
});