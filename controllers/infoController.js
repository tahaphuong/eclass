// CLASS INFO DATABASE

// cho GV: load tất cả các info của lớp HIỆN TẠI
controllers.loadCurrentClassInfo = async classroom => {
    let currentClassInfo = await firebase
        .firestore()
        .collection('classdemo')
        .doc(classroom)
        .get()

    await model.saveCurrentClassInfo(currentClassInfo.data())

    views.showCurrentClassHomeworksList()
    views.displayCurrentClassInfo(model.currentClassInfo)
    views.showListStudent(model.currentClassInfo.students)
}

// cho HS: load các lớp hiện tại (theo email giáo viên)
controllers.loadClassesAndStudent = async (studentEmail, teacherEmail) => {
    await firebase
        .firestore()
        .collection('studentdemo')
        .doc(studentEmail)
        .get()
        .then(doc => {
            if (doc.exists) {
                // lưu danh sách lớp của mỗi học sinh
                model.saveUserStudent(doc.data());
                let listClassID = doc.data().classes;

                console.log(listClassID);
                views.showListClassOfAStudent(model.userStudent);
                
                if (!teacherEmail && model.userStudent.classes) {
                    controllers.loadCurrentClassInfo(model.userStudent.classes[0]);
                    controllers.loadHomeworks(model.userStudent.classes[0])
                    document.getElementById(model.userStudent.classes[0]).className = "this-class"
                }
                
                // CHUYỂN LỚP: Hàm chuyển qua lại giữa các lớp
                if (model.userStudent.classes && model.userStudent.classes.length != 0) {
                    // Lưu thông tin của lớp hiện tại vào model. 
                    for (let i = 0; i < listClassID.length; i++) {
                        if (model.userStudent.classes[i] == teacherEmail) {
                            controllers.loadCurrentClassInfo(model.userStudent.classes[i]);
                            controllers.loadHomeworks(model.userStudent.classes[i])
                            document.getElementById(model.userStudent.classes[i]).className = "this-class"
                        }
                    }
                    // Lưu bài tập của lớp hiện tại vào model (hien da chuyen sang ham khac)
                } else {
                    console.log('no student/ no class')
                    let std = document.getElementById('std-list')
                    std.innerHTML = `Bạn hiện chưa có lớp nào!<br>Bạn có thể tìm email gvtienganh@gmail.com để vào lớp Tiếng Anh`
                }
            } else {
                let std = document.getElementById('std-list')
                std.innerHTML = `Bạn hiện chưa phải học sinh hợp lệ. Something was wrong with backend.`
            }
        })
}

// cho giáo viên: thêm học sinh
controllers.addStudent = async student => {
    let listStudent = model.currentClassInfo.students;
    let teacherEmail = firebase.auth().currentUser.email
    let input = document.getElementById('add-student-input');
    let error = document.getElementById('add-student-error');

    try {
        // Kiểm tra xem email của học sinh đó đã có trong lớp hay chưa
        // Nếu có rồi thì thông báo lỗi và return hàm ngay
        for (let std of listStudent) {
            if (student.email === std.email) {
                error.innerText = 'Email của học sinh đã tồn tại trong lớp!';
                return;
            }
        }

        // Kiểm tra xem email của học sinh đó đã đăng kí hay chưa
        await firebase
            .firestore()
            .collection('studentdemo')
            .doc(student.email)
            .get().then(async doc => {
                if (doc.exists) {
                    // Add vào model => display trước rồi add vào database sau
                    listStudent.push(student)
                    views.showListStudent(listStudent);
                    views.displayCurrentClassInfo(model.currentClassInfo)
                    input.value = '';

                    // Add email HS vào DB của lớp
                    await firebase
                        .firestore()
                        .collection('classdemo')
                        .doc(teacherEmail)
                        .update({
                            students: firebase.firestore.FieldValue.arrayUnion(student)
                        });

                    // Add email GV vào profile học sinh
                    await firebase
                        .firestore()
                        .collection('studentdemo')
                        .doc(student.email)
                        .update({
                            classes: firebase.firestore.FieldValue.arrayUnion(teacherEmail)
                        });
                } else { views.setText('add-student-error', 'email chưa đăng ký') }
            })
    } catch (error) { views.setText('add-student-error', 'thông tin chưa hợp lệ') }
}

// cho HS: Add vào một lớp học
controllers.addTeacher = async (student, teacherEmail) => {
    let input = document.getElementById('add-teacher-input');
    let error = document.getElementById('add-teacher-error');

    // Kiểm tra xem email của giáo viên đó có trong classes của HS hay chưa 
    if (model.userStudent.classes.includes(teacherEmail)) {
        error.innerText = 'Bạn đã tồn tại trong lớp này!'; // đoạn này chỉ để check 1 vòng ngoài, vì bthg thì danh sách lớp học ở profile HS phải khớp với data() này
        return;
    }

    try {
        // Kiểm tra xem email của giáo viên đó đã đăng kí hay chưa (ở mục else)
        await firebase
            .firestore()
            .collection('classdemo')
            .doc(teacherEmail)
            .get().then(async doc => {
                if (doc.exists) {

                    // Add vào model => display trước rồi add vào database sau
                    // Kiểm tra xem email của học sinh đó đã có trong lớp hay chưa
                    let listStudent = doc.data().students
                    // Nếu có rồi thì thông báo lỗi và return hàm ngay
                    for (let std of listStudent) {
                        if (student.email === std.email) {
                            error.innerText = 'Bạn đã tồn tại trong lớp này!'; // đoạn này chỉ để check lại 1 vòng, vì bthg thì danh sách lớp học ở profile hsinh phải khớp với data() này
                            return;
                        }
                    }

                    // update danh sách lớp/GV ở profile add vao đầu tiên => lúc nào log in cũng vào lớp mới nhất (index 0)
                    model.userStudent.classes.splice(0, 0, teacherEmail)

                    // Add email GV vào profile học sinh => add từ model
                    await firebase
                        .firestore()
                        .collection('studentdemo')
                        .doc(student.email)
                        .update({
                            classes: model.userStudent.classes
                        });

                    // Add email HS vào DB của lớp
                    await firebase
                        .firestore()
                        .collection('classdemo')
                        .doc(teacherEmail)
                        .update({
                            students: firebase.firestore.FieldValue.arrayUnion(student)
                        });

                    controllers.loadClassesAndStudent(student.email)

                } else { views.setText('add-teacher-error', 'đây không phải email giáo viên') }
            })
    } catch (error) { views.setText('add-teacher-error', error.message) }
}




