document.addEventListener("DOMContentLoaded", function() {
    // Mảng chứa danh sách sinh viên
    let students = [
        { name: "John Doe", age: 21 },
        { name: "Jane Doe", age: 22 }
    ];

    // Hàm hiển thị danh sách sinh viên trên bảng
    function renderStudents() {
        const studentsTableBody = document.getElementById("students-table-body");
        studentsTableBody.innerHTML = ""; // Xóa nội dung cũ

        // Tạo hàng mới cho mỗi sinh viên
        students.forEach((student, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>
                    <button class="edit-button" data-index="${index}">Edit</button>
                    <button class="delete-button" data-index="${index}">Delete</button>
                </td>
            `;
            studentsTableBody.appendChild(row);
        });

        // Thêm sự kiện cho các nút edit và delete
        document.querySelectorAll(".edit-button").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                editStudent(index);
            });
        });

        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                deleteStudent(index);
            });
        });
    }

    // Hàm thêm sinh viên mới
    function addStudent(name, age) {
        students.push({ name, age });
        renderStudents();
    }

    // Hàm sửa thông tin sinh viên
    function editStudent(index) {
        let newName = prompt("Enter new name:", students[index].name);
        let newAge = prompt("Enter new age:", students[index].age);
        if (newName && newAge) {
            students[index] = { name: newName, age: parseInt(newAge) };
            renderStudents();
        }
    }

    // Hàm xóa sinh viên khỏi danh sách
    function deleteStudent(index) {
        students.splice(index, 1);
        renderStudents();
    }

    // Thêm sự kiện cho nút "Add Student"
    document.getElementById("add-student-btn").addEventListener("click", function() {
        let name = prompt("Enter student name:");
        let age = prompt("Enter student age:");
        if (name && age) {
            addStudent(name, parseInt(age));
        }
    });

    // Thêm sự kiện cho nút "Logout"
    document.querySelector(".logout").addEventListener("click", function() {
        window.location.href = "/HTML/giaodien.html"; // Chuyển hướng đến trang đăng nhập
    });

    // Hiển thị danh sách sinh viên ban đầu
    renderStudents();
});
