controllers.signUp = async signUpInfo => {
	let email = signUpInfo.email;
	let password = signUpInfo.password;
	let displayName = signUpInfo.username;
	let button = document.getElementById('sign-up-btn');

	// Lock the button while data is being handled
	views.disable('sign-up-btn')
	// Clear the message in sign up form
	views.setText('sign-up-error', '');
	views.setText('sign-up-success', '');

	try {
		await firebase.auth().createUserWithEmailAndPassword(email, password);
		await firebase.auth().currentUser.updateProfile({
			displayName
		});	
		
		await firebase
		.firestore()
		.collection('studentdemo')
		.doc(email)
		.set({
			classes: ['gvtienganh@gmail.com'],
			email: email,
			username: displayName
		})

		let std = {
			email: email,
			hearts: 3,
			points: 0, 
			inClassAt: new Date().toISOString()
		}

		await firebase
		.firestore()
		.collection('classdemo')
		.doc('gvtienganh@gmail.com')
		.update({
			students: firebase.firestore.FieldValue.arrayUnion(std)
		})

	} catch (error) {
		views.setText('sign-up-error', error.message);
		console.log(error.message)
	}

	// Unlock the button

};

controllers.signIn = async signInfo => {
	let email = signInfo.email;
	let password = signInfo.password;
	let button = document.getElementById('sign-in-btn');

	// Lock the button login while data is being handled

	views.setText('sign-in-error', '');
	views.setText('sign-in-success', '');

	// Communicate with firebase to check username and password
	try {
		let result = await firebase.auth().signInWithEmailAndPassword(email, password);
		if (!result.user) {
			throw new Error('You must verify your email!');
		}
	} catch (error) {
		views.setText('sign-in-error', error.message + ' ⛔');

		// Unlock the button if login is failed
	}
};

