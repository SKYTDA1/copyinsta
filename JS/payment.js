// Khởi tạo danh sách thanh toán mẫu
let payments = [
    { id: 1, name: 'Karthi', schedule: 'First', billNumber: '00012223', amountPaid: 35000, balanceAmount: 55000, date: '2021-08-09' },
    // Thêm các thanh toán mẫu khác nếu cần
];

// Hàm hiển thị danh sách thanh toán
function renderPayments() {
    const paymentTableBody = document.getElementById('paymentTableBody');
    paymentTableBody.innerHTML = ''; // Xóa nội dung cũ
    payments.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.name}</td>
            <td>${payment.schedule}</td>
            <td>${payment.billNumber}</td>
            <td>${payment.amountPaid}</td>
            <td>${payment.balanceAmount}</td>
            <td>${payment.date}</td>
            <td>
                <button class="edit" onclick="openEditPaymentModal(${payment.id})">✏️</button>
                <button class="delete" onclick="deletePayment(${payment.id})">🗑️</button>
                <button class="view" onclick="viewPayment(${payment.id})">👁️</button>
            </td>
        `;
        paymentTableBody.appendChild(row); // Thêm hàng mới vào bảng
    });
}

// Hàm mở modal để thêm thanh toán mới
function openAddPaymentModal() {
    document.getElementById('paymentId').value = ''; // Xóa ID cũ
    document.getElementById('modalTitle').textContent = 'Add Payment'; // Đặt tiêu đề modal
    document.getElementById('paymentForm').reset(); // Xóa dữ liệu form
    document.getElementById('paymentModal').style.display = 'block'; // Hiển thị modal
}

// Hàm mở modal để sửa thanh toán
function openEditPaymentModal(id) {
    const payment = payments.find(p => p.id === id); // Tìm thanh toán theo ID
    document.getElementById('paymentId').value = payment.id;
    document.getElementById('name').value = payment.name;
    document.getElementById('schedule').value = payment.schedule;
    document.getElementById('billNumber').value = payment.billNumber;
    document.getElementById('amountPaid').value = payment.amountPaid;
    document.getElementById('balanceAmount').value = payment.balanceAmount;
    document.getElementById('date').value = payment.date;
    document.getElementById('modalTitle').textContent = 'Edit Payment'; // Đặt tiêu đề modal
    document.getElementById('paymentModal').style.display = 'block'; // Hiển thị modal
}

// Hàm đóng modal
function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none'; // Ẩn modal
}

// Xử lý sự kiện submit form để thêm/sửa thanh toán
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định
    const id = document.getElementById('paymentId').value;
    const name = document.getElementById('name').value;
    const schedule = document.getElementById('schedule').value;
    const billNumber = document.getElementById('billNumber').value;
    const amountPaid = document.getElementById('amountPaid').value;
    const balanceAmount = document.getElementById('balanceAmount').value;
    const date = document.getElementById('date').value;

    if (id) {
        // Sửa thanh toán
        const payment = payments.find(p => p.id === parseInt(id));
        payment.name = name;
        payment.schedule = schedule;
        payment.billNumber = billNumber;
        payment.amountPaid = amountPaid;
        payment.balanceAmount = balanceAmount;
        payment.date = date;
    } else {
        // Thêm thanh toán mới
        const newPayment = {
            id: payments.length ? payments[payments.length - 1].id + 1 : 1,
            name,
            schedule,
            billNumber,
            amountPaid,
            balanceAmount,
            date
        };
        payments.push(newPayment);
    }

    closePaymentModal(); // Đóng modal
    renderPayments(); // Cập nhật danh sách thanh toán
});

// Hàm xóa thanh toán
function deletePayment(id) {
    payments = payments.filter(payment => payment.id !== id); // Lọc danh sách thanh toán
    renderPayments(); // Cập nhật danh sách thanh toán
}

// Hàm xem chi tiết thanh toán
function viewPayment(id) {
    const payment = payments.find(p => p.id === id);
    alert(`
        Name: ${payment.name}
        Payment Schedule: ${payment.schedule}
        Bill Number: ${payment.billNumber}
        Amount Paid: ${payment.amountPaid}
        Balance Amount: ${payment.balanceAmount}
        Date: ${payment.date}
    `); // Hiển thị chi tiết thanh toán
}

// Hiển thị danh sách thanh toán ban đầu
renderPayments();
