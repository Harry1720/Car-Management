document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.policy-tab');
    const contents = document.querySelectorAll('.policy-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            
            // Xóa trạng thái active từ tất cả tabs và contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Thêm trạng thái active cho tab được click và content tương ứng
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
            
            // Lưu tab đang active vào localStorage
            localStorage.setItem('activeTab', target);
        });
    });
    
    // Khôi phục tab active từ localStorage hoặc dùng tab mặc định
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab && document.getElementById(savedTab)) {
        tabs.forEach(t => {
            if (t.dataset.target === savedTab) {
                t.click();
            }
        });
    }
});
