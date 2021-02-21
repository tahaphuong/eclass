//HOMEWORK DATABASE

// cho HỌC SINH và GIÁO VIÊN ĐỨNG LỚP: Load toàn bộ thông tin bài tập trong lớp
controllers.loadHomeworks = async classroom => {
	let hw = await firebase
		.firestore()
		.collection('classdemo')
		.doc(classroom)
		.collection('homeworks')
		.get();

	let homeworks = [];

	for (let doc of hw.docs) {
		homeworks.push(doc.data());
	}

	model.saveCurrentClassHomeworks(homeworks);
	views.showCurrentClassHomeworksList();
	views.displayDeadlinesLeft(model.currentClassHomeworks);
};

// cho GV: add bai tap
controllers.addHomework = async (createdAt, w) => {
	// them vao model truoc
	model.currentClassHomeworks.push(w)
	views.showCurrentClassHomeworksList()
    views.displayDeadlinesLeft(model.currentClassHomeworks)

	// push vao database sau
	await firebase
		.firestore()
		.collection('classdemo')
		.doc(firebase.auth().currentUser.email)
		.collection('homeworks')
		.doc(createdAt)
		.set(w);
};


// cho HỌC SINH: add bài nộp
controllers.addAs = async (assign, emailTeacher, createdAt) => {
	for (let hw of model.currentClassHomeworks) {
		if (createdAt == hw.createdAt) {

			// them vao model truoc
			await model.updateNewAssignments(hw.assignments, assign);
			views.showAssignments(hw, assign.email)
			views.showListStudent(model.currentClassInfo.students)
			
			// push vao database sau
			console.log(hw.createdAt);
			await firebase
				.firestore()
				.collection('classdemo')
				.doc(emailTeacher)
				.collection('homeworks')
				.doc(createdAt)
				.update({
					assignments: hw.assignments
				});

			await firebase
				.firestore()
				.collection('classdemo')
				.doc(emailTeacher)
				.update({
					students: model.currentClassInfo.students
				});

			break;
		}
	}
};


controllers.addRate = async (oldP, points, rating, studentEmail, emailTeacher, createdAt) => {
	console.log(points, rating, studentEmail, emailTeacher, createdAt)
	for (let hw of model.currentClassHomeworks) {
		if (createdAt == hw.createdAt) {
	
			// them vao model truoc
			await model.updateNewRate(hw.assignments, studentEmail, points, rating);
			views.showAssignments(hw, emailTeacher)
			
			await model.addPoints(model.currentClassInfo.students, studentEmail, oldP, points)
			views.showListStudent(model.currentClassInfo.students)

			// add rate vao DB sau 
			
			await firebase
				.firestore()
				.collection('classdemo')
				.doc(emailTeacher)
				.collection('homeworks')
				.doc(createdAt)
				.update({
					assignments: hw.assignments
				});

			await firebase
				.firestore()
				.collection('classdemo')
				.doc(emailTeacher)
				.update({
					students: model.currentClassInfo.students
				});

			break;
		}
	}
};

controllers.loser = async (email, checkList) => {
	if (model.currentClassInfo.students) {
		console.log(checkList)
		for (let std of model.currentClassInfo.students) {
			if (std.email == email) {
				let remain = 3 - checkList.length
				if (remain <= 0) {remain = 0}
				std.hearts = remain
				break;
			} 
		}

		await firebase
		.firestore()
		.collection('classdemo')
		.doc(model.currentClassInfo.teacherEmail)	
		.update({
			students: model.currentClassInfo.students
		})
		checkList = []
	} else {console.log('can not find students of class. Something was wrong')}
}

// controller.setupHwOnSnapshot = function(emailTeacher, emailStudent) {
//     firebase
// 	.firestore()
// 	.collection('classdemo')
// 	.doc(emailTeacher)
//     .collection('homework')
//     .onSnapshot(snapshotHandler)

    
//     function snapshotHandler(snapshot) {
//         let docChanges = snapshot.docChanges()
//         for (let docChange of docChanges) {
//             let hw = docChange.doc.data()
//             hw.id = docChange.doc.id

//             if (docChange.type == 'modified') {
//                 views.showAssignments(hw, emailStudent)
// 				views.showListStudent(model.currentClassInfo.students)
//                 if (hw.id == model.currentConversation.id) {
//                     model.saveCurrentConversation(conversation)
//                     view.showCurrentConversation() 
//                 }
//             }
//             if (docChange.type == 'added') {
//                 model.updateConversation(conversation)
//             }
//             if (docChange.type == 'removed') {
//                 model.removeConversation(conversation)
//                 if(isCurrentConversation(conversation)) {
//                     if (model.conversations.length) {
//                         model.saveCurrentConversation(model.conversations[0])
//                     } else {
//                         model.saveCurrentConversation(null)
//                     }
//                     view.showCurrentConversation()
//                 }
//             }
//         }
//         view.showConversationsList()
//     } 
// }