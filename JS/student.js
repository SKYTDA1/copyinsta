document.addEventListener('DOMContentLoaded', function() {
    const studentsTable = document.getElementById('studentsTable'); // Bảng học sinh
    const addStudentBtn = document.getElementById('addStudentBtn'); // Nút thêm học sinh
    const studentModal = document.getElementById('studentModal'); // Modal học sinh
    const closeModal = document.getElementById('closeModal'); // Nút đóng modal
    const studentForm = document.getElementById('studentForm'); // Form học sinh
    const modalTitle = document.getElementById('modalTitle'); // Tiêu đề modal
    const saveStudentBtn = document.getElementById('saveStudentBtn'); // Nút lưu học sinh
    const searchInput = document.getElementById('search'); // Ô tìm kiếm

    let students = []; // Mảng lưu danh sách học sinh
    let editingStudentIndex = -1; // Chỉ số học sinh đang chỉnh sửa, -1 là thêm mới

    // Hàm hiển thị danh sách học sinh
    function renderStudents() {
        studentsTable.innerHTML = ''; // Xóa bảng hiện tại
        students.forEach((student, index) => {
            // Tạo hàng mới cho mỗi học sinh
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${student.photo}" alt="Student Photo" class="student-photo"></td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.enrollNumber}</td>
                <td>${student.dateOfAdmission}</td>
                <td>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
            studentsTable.appendChild(row);
        });
    }

    // Sự kiện khi bấm nút thêm học sinh
    addStudentBtn.addEventListener('click', function() {
        modalTitle.textContent = 'Add Student'; // Đổi tiêu đề modal
        studentForm.reset(); // Reset form
        editingStudentIndex = -1; // Đặt trạng thái là thêm mới
        studentModal.style.display = 'block'; // Hiển thị modal
    });

    // Sự kiện khi bấm nút đóng modal
    closeModal.addEventListener('click', function() {
        studentModal.style.display = 'none'; // Ẩn modal
    });

    // Sự kiện khi bấm ngoài modal để đóng modal
    window.addEventListener('click', function(event) {
        if (event.target == studentModal) {
            studentModal.style.display = 'none'; // Ẩn modal
        }
    });

    // Sự kiện khi submit form học sinh
    studentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn form submit mặc định

        // Đọc file hình ảnh
        const photoInput = studentForm.photo;
        const reader = new FileReader();
        reader.onload = function(e) {
            const newStudent = {
                name: studentForm.name.value,
                email: studentForm.email.value,
                phone: studentForm.phone.value,
                enrollNumber: studentForm.enrollNumber.value,
                dateOfAdmission: studentForm.dateOfAdmission.value,
                photo: e.target.result // Lưu ảnh dưới dạng base64
            };

            if (editingStudentIndex === -1) {
                students.push(newStudent); // Thêm học sinh mới vào mảng
            } else {
                students[editingStudentIndex] = newStudent; // Cập nhật thông tin học sinh
            }

            renderStudents(); // Hiển thị lại danh sách học sinh
            studentModal.style.display = 'none'; // Ẩn modal
        };

        if (photoInput.files[0]) {
            reader.readAsDataURL(photoInput.files[0]); // Đọc file ảnh nếu có
        }
    });

    // Sự kiện khi bấm nút chỉnh sửa hoặc xóa học sinh
    studentsTable.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit')) {
            // Sự kiện khi bấm nút chỉnh sửa
            editingStudentIndex = event.target.dataset.index; // Lấy chỉ số học sinh
            const student = students[editingStudentIndex]; // Lấy thông tin học sinh
            studentForm.name.value = student.name;
            studentForm.email.value = student.email;
            studentForm.phone.value = student.phone;
            studentForm.enrollNumber.value = student.enrollNumber;
            studentForm.dateOfAdmission.value = student.dateOfAdmission;
            modalTitle.textContent = 'Edit Student'; // Đổi tiêu đề modal
            studentModal.style.display = 'block'; // Hiển thị modal
        }

        if (event.target.classList.contains('delete')) {
            // Sự kiện khi bấm nút xóa
            const index = event.target.dataset.index; // Lấy chỉ số học sinh
            students.splice(index, 1); // Xóa học sinh khỏi mảng
            renderStudents(); // Hiển thị lại danh sách học sinh
        }
    });

    // Sự kiện khi nhập vào ô tìm kiếm
    searchInput.addEventListener('input', function() {
        const keyword = searchInput.value.toLowerCase(); // Lấy từ khóa tìm kiếm
        // Lọc danh sách học sinh theo từ khóa
        const filteredStudents = students.filter(student => 
            student.name.toLowerCase().includes(keyword) || 
            student.email.toLowerCase().includes(keyword) || 
            student.phone.includes(keyword) || 
            student.enrollNumber.includes(keyword) || 
            student.dateOfAdmission.includes(keyword)
        );
        studentsTable.innerHTML = ''; // Xóa bảng hiện tại
        filteredStudents.forEach((student, index) => {
            // Tạo hàng mới cho mỗi học sinh
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${student.photo}" alt="Student Photo" class="student-photo"></td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.enrollNumber}</td>
                <td>${student.dateOfAdmission}</td>
                <td>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
            studentsTable.appendChild(row);
        });
    });
    // Sự kiện khi bấm logout
    document.getElementById('logoutButton').addEventListener('click', function() {
        // Xử lý việc logout, ví dụ xóa token, session, etc.
        
        // Chuyển hướng đến trang đăng nhập
        window.location.href = '/HTML/giaodien.html';
    });
});
