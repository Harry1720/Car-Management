document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(button => {
        button.addEventListener('click', function() {
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            
            const targetPanel = document.getElementById(button.dataset.target);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});