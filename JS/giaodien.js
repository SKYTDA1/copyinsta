// Tài khoản admin mặc định
const adminAccount = {
    email: 'tranthaiduong23072004@gmail.com',
    password: 'duongyeuqanh'
};

// Kiểm tra định dạng email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Lắng nghe sự kiện bấm nút "Sign In"
document.getElementById('signInBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    // Lấy giá trị từ các trường input
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Kiểm tra định dạng email
    if (!validateEmail(email)) {
        alert('Định dạng email không hợp lệ');
        return;
    }

    // Kiểm tra thông tin đăng nhập
    if (email === adminAccount.email && password === adminAccount.password) {
        // Điều hướng đến trang chính
        window.location.href = '/HTML/dashboard.html';
    } else {
        alert('Thông tin đăng nhập không chính xác');
    }
});

// Lắng nghe sự kiện bấm vào "Forgot your password?"
document.getElementById('forgotPassword').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Vui lòng liên hệ admin@example.com để đặt lại mật khẩu.');
});
