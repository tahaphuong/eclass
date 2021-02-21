const model = {
    currentClassInfo: null,
    currentClassHomeworks: null,
    userStudent: null
}

// tải thông tin của lớp hiện tại
model.saveCurrentClassInfo = classroom => {
    model.currentClassInfo = classroom
}

// tải bài tập và bài nộp của lớp hiện tại
model.saveCurrentClassHomeworks = homeworks => {
    model.currentClassHomeworks = homeworks
}

// tải thông tin học sinh (bao gồm danh sách các lớp có mặt học sinh)
model.saveUserStudent = student => {
    model.userStudent = student
}

model.updateNewAssignments = (asts, as) => {
    let index = asts.findIndex(element => element.email === as.email);
    if (index >= 0) {
        console.log(model.currentClassInfo.students, asts[index].email, asts[index].points, '')
        model.addPoints(model.currentClassInfo.students, asts[index].email, asts[index].points, '')
        asts.splice(index, 1)
        asts.splice(0, 0, as)
    } else {asts.splice(0, 0, as)}
}

model.updateNewRate = (asts, studentEmail, points, rating) => {
    let index = asts.findIndex(element => element.email === studentEmail);
    if (index >= 0) {
        asts[index].points = Number(points);
        asts[index].rating = rating;
    } else {console.log('Cant add rating/comment to students assignments')}
}

model.addPoints = (students, studentEmail, oldP, points) => {
    let index = students.findIndex(element => element.email === studentEmail);
    if (index >= 0) {
        students[index].points = Number(students[index].points) - Number(oldP) + Number(points);
    } else {console.log('Cant find students in class. Please check backend again.')}
}

// // tải email giáo viên đứng lớp hiện tại (cái hàm này không quan trọng lắm, tại em đã thêm email giáo viên vào info lớp)
// model.saveCurrentClassTeacher = teacher => {
// 	model.currentClassTeacherEmail = teacher;
// };

// LƯU Ý 
// Theo mô hình em đang làm thì em đang tải thông tin của một lớp riêng biệt
// nên nếu chuyển nhiều lớp sẽ phải tải lại database

// => Thêm 2 hàm model nữa 
// model.saveAllClassesInfo (array)
// model.saveAllAssignments => (array), mỗi phần tử là một map chứa 2 thuộc tính
    // email giáo viên (xác định lớp)
    // assignments (array, tương tự hàm model.saveCurrentClassHomeworks)



// update bài nộp mới của lớp hiện tại

