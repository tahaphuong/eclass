const views = {};

views.showComponent = async component => {
	let app = document.getElementById('app');
	let html;

	switch (component) {
		case 'heading': {
			html = components.section.replace(/{%COMPONENT%}/g, components.heading);
			app.innerHTML = html;

			let signInLink = document.getElementById('signIn');
			signInLink.onclick = signInLinkClickHandler;

			function signInLinkClickHandler() {
				views.showComponent('signIn');
			}

			break;
		}

		case 'signIn': {
			html = components.section.replace(/{%COMPONENT%}/g, components.signIn);
			app.innerHTML = html;

			let linkToSignUp = document.getElementById('link-to-sign-up');
			linkToSignUp.onclick = linkToSignUpHandler;

			let signInForm = document.getElementById('sign-in-form');
			signInForm.onsubmit = signInFormSubmitHandler;

			function linkToSignUpHandler() {
				views.showComponent('signUp');
			}

			function signInFormSubmitHandler(e) {
				e.preventDefault();

				// 1. Get data from UI
				let signInInfo = {
					email: signInForm.email.value,
					password: signInForm.password.value
				};

				// 2. Validate data from user
				let validateResults = [
					views.validate(signInInfo.email, validators.email, 'email-error', 'Invalid email, try again!'),
					views.validate(signInInfo.password, validators.password, 'password-error', 'Invalid password, Try again!')
				];

				// 3. Submit sign in
				if (allPassed(validateResults)) {
					controllers.signIn(signInInfo);
				}
			}

			break;
		}

		case 'signUp': {
			html = components.section.replace(/{%COMPONENT%}/g, components.signUp);
			app.innerHTML = html;

			let linkToSignIn = document.getElementById('link-to-sign-in');
			linkToSignIn.onclick = linkToSignInHandler;

			let signUpForm = document.getElementById('sign-up-form');
			signUpForm.onsubmit = signUpFormSubmitHandler;
			
			function linkToSignInHandler() {
				views.showComponent('signIn');
			}

			
			function signUpFormSubmitHandler(e) {
				e.preventDefault();
				
				// 1. Store info from the UI
				let signUpInfo = {
					username: signUpForm.username.value,
					email: signUpForm.email.value,
					password: signUpForm.password.value,
					confirmPassword: signUpForm.confirmPassword.value,
					// role: roleStd
				};

				// 2. Validate data from the user
				let validateResults = [
					views.validate(signUpInfo.username, validators.require, 'username-error', 'Username can not be empty!'),
					views.validate(signUpInfo.email, validators.email, 'email-error', 'Invalid email!'),
					views.validate(signUpInfo.password, validators.password, 'password-error', 'Invalid password!'),
					views.validate(
						signUpInfo.confirmPassword,
						value => value && value === signUpInfo.password,
						'confirm-password-error',
						'Invalid confirm password!'
					),
				];

				// 3. Submit sign up
				if (!validateResults.includes(false)) {
					console.log(allPassed(validateResults))
					controllers.signUp(signUpInfo);
				}
			}

			break;
		}

		case 'teacherHome': {
			const email = await firebase.auth().currentUser.email;
			const name = await firebase.auth().currentUser.displayName;

			//let centerHtml = components.centerNav.replace(/{%SUBMISSION%}/g, components.submit);
			let centerHtml = components.centerNav.replace(/{%ADDWORK%}/g, components.work);
			centerHtml = centerHtml.replace(/{%STUDENTLIST%}/g, components.studentList);

			let leftHtml = components.leftNav;

			let rightHtml = components.rightNav;

			let teacherHtml = leftHtml + centerHtml + rightHtml;
			html = components.mainHome.replace(/{%HOME%}/g, teacherHtml);

			app.innerHTML = html;

			// load thông tin lớp (của giáo viên)
			controllers.loadCurrentClassInfo(email);
			// load thông tin bài tập (phải load riêng vì không query được sub-collection (bảng lồng bảng))
			controllers.loadHomeworks(email);
			// load tên giáo viên
			views.displayLeftNav(name, email);

			// cho GV: nút add bài tập
			let formWork = document.getElementById('add-work-form');
			formWork.onsubmit = formAddHomeworkHandler;

			// cho GV: thêm học sinh vào lớp => display danh sách học sinh ở phía dưới
			let addInput = document.getElementById('add-student-input');
			let addBtn = document.getElementById('add-student');
			addBtn.onclick = addStudentHandler;

			// Sign out
			let signOutButton = document.getElementById('log-out');
			signOutButton.onclick = signOutHandler;
			function signOutHandler() {
				firebase.auth().signOut();
			}

			// Hàm xử lý sự kiện btn add học sinh được click
			function addStudentHandler(e) {
				e.preventDefault();
				views.disable('add-student')
				// Lấy email của học sinh và kiểm tra
				let emailStd = addInput.value.trim();
				if (views.validate(email, validators.email, 'add-student-error', 'Invalid email')) {
					const student = {
						email: emailStd,
						hearts: 3,
						points: 0,
						inClassAt: new Date().toISOString()
					};

					controllers.addStudent(student);
					views.enable('add-student')		
					views.clearInput('add-student-input')		
				}
			}

			// validate thông tin và add bài tập vào DB
			function formAddHomeworkHandler(e) {
				e.preventDefault();

				let createdAt = new Date().toISOString();
				let title = formWork.addWorkTitle.value.trim();
				let dl = formWork.addDeadline.value.trim();
				let ques = formWork.ques.value.trim();

				let errMess = 'Hãy điền hết các trường còn trống';
				let check = [
					views.validate(title, validators.require, 'add-work-error', errMess),
					views.validate(ques, validators.require, 'add-work-error', errMess),
					views.validate(dl, validators.require, 'add-work-error', errMess),
					views.validate(dl, validators.number, 'deadline-error', `Invalid<br>days`)
				];

				if (!check.includes(false)) {
					let deadline = new Date().setDate(new Date().getDate() + Number(dl));
					deadline = new Date(deadline).toISOString();

					let w = {
						assignments: [],
						title: title,
						content: ques,
						days: dl,
						deadline: deadline,
						createdAt: createdAt
					};

					// truyền vào DB
					controllers.addHomework(createdAt, w);

					// sau đó tự động scroll đến bài mới add (theo id)
					views.clearInput('addWorkTitle');
					views.clearInput('addDeadline');
					views.clearInput('ques');
				}
				if (check[0] == false) {
					views.setText('add-work-error', 'Please fill the title!');
				}
				if (check[1] == false) {
					views.setText('add-work-error', 'Please fill the task description!');
				}
				if (check[0] == false && check[1] == false) {
					views.setText('add-work-error', 'Please fill all fields!');
				}
			}
			break;
		}

		case 'studentHome': {
			const email = await firebase.auth().currentUser.email;
			const name = await firebase.auth().currentUser.displayName;

			let centerHtml = components.studentCenterNav.replace(/{%STUDENTSUBMISSION%}/g, components.studentSubmit);
			centerHtml = centerHtml.replace(/{%STUDENTSTUDENTLIST%}/g, components.studentStudentList);

			let leftHtml = components.studentLeftNav;

			let rightHtml = components.studentRightNav;

			let studentHtml = leftHtml + centerHtml + rightHtml;
			html = components.mainHome.replace(/{%HOME%}/g, studentHtml);

			app.innerHTML = html;

			// Load các lớp của học sinh
			controllers.loadClassesAndStudent(email);
			views.displayLeftNav(name, email);

			// Add GV - class
			let addTeInput = document.getElementById('add-teacher-input');
			let addTeBtn = document.getElementById('add-teacher-btn');
			addTeBtn.onclick = addTeacherHandler;

			// Sign out
			let signOutButton = document.getElementById('log-out');
			signOutButton.onclick = signOutHandler;

			function signOutHandler() {
				firebase.auth().signOut();
			}

			function addTeacherHandler(e) {
				e.preventDefault();
				views.disable('add-teacher')
				// Lấy email của GV và kiểm tra
				let emailTe = addTeInput.value.trim();
				if (views.validate(emailTe, validators.email, 'add-teacher-error', 'Invalid email')) {
					const student = {
						email: email,
						hearts: 3,
						points: 0,
						inClassAt: new Date().toISOString()
					};
					controllers.addTeacher(student, emailTe);
					views.enable('add-student')				
					views.clearInput('add-teacher-input')		
				}
			}
			break;
		}

		case 'loading': {
            app.innerHTML = components.loading

            break;
        }
	}
};

// Sửa thành innerHTML để sử dụng được nhiều mục đích
views.setText = function(id, text) {
	document.getElementById(id).innerHTML = text;
};

views.clearInput = id => {
    document.getElementById(id).value = ''
}

views.validate = function (value, validator, idErrorMessage, errorMessage) {
    if (validator(value)) {
        views.setText(idErrorMessage, '')
        return true
    } else {
        views.setText(idErrorMessage, errorMessage)
        return false
    }
};

views.disable = id => {
	document.getElementById(id).setAttribute('disabled', true);
};

views.enable = id => {
	document.getElementById(id).removeAttribute('disabled');
};

// các hàm display

views.displayLeftNav = (displayName, emailUser) => {
	views.setText('display-email', emailUser)
	if (displayName) {
		views.setText("display-name", displayName)
	} else {
		views.setText("display-name", 'Newcomer!')
	}
}

views.displayCurrentClassInfo = (currentClassInfo) => {
	if (currentClassInfo) {
		views.setText("name", currentClassInfo.name)
		views.setText("totalStudents", currentClassInfo.students.length)
		views.setText("teacherUsername", currentClassInfo.teacherName)
	} console.log("no class info. CHECK BACKEND")
}

views.displayDeadlinesLeft = (currentClassHomeworks) => {
	if (currentClassHomeworks) {
		views.setText("totalHomeworks", currentClassHomeworks.length)
		let t = 0;
		for (let hw of currentClassHomeworks) {
			if (hw.deadline >= new Date().toISOString()) {
				t += 1
			}
		}
		views.setText("deadlinesLeft", t)
		t = 0;
	} else {console.log('no homeworks')}
}

// CẦN LÀM
// DONE o classView. Hàm display ngày tháng Local ở dạng đọc được 
// 2. Hàm tự động scroll đến bài mới add/bài mới nộp theo ID