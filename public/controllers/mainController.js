const controllers = {};

controllers.init = () => {
	views.showComponent('loading')
	firebase.auth().onAuthStateChanged(onAuthStateChangedHandler);
	function onAuthStateChangedHandler(user) {
		views.showComponent('loading')
		if (user) {
			controllers.checkUser(user.email)
		} else {
			views.showComponent('signIn');
			throw new Error('you can not log in at the moment')
		}
	}
};

controllers.checkUser = async (email) => {
	let teacher = await firebase
	.firestore()
	.collection('classdemo')
	.get()
	
	let checkClass = false;

	for (doc of teacher.docs) {
		if (email == doc.id) {
			checkClass = true;
			views.showComponent('teacherHome')
			break;
		}
	}
	
	if (checkClass == false) {
		views.showComponent('studentHome')
	} 
}
