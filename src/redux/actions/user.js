import { v4 as uuidv4 } from 'uuid';
import {
	LOADING_USER,
	DONE_LOADING_USER,
	USER_AUTHENTICATED,
	SET_USER_CREDENTIALS,
	SET_USER_NOTIFICATIONS,
	SET_USER_LIKES,
	USER_NOT_AUTHENTICATED,
} from '../types';
import {
	setErrors,
	clearErrors,
	loadingUI,
	doneLoadingUI,
} from './ui';
import {
	auth, 
	db, 
	storageRef, 
	imagesUrl
} from '../../util/firebase';
import {
	validateLogin,
	validateSignup,
} from '../../util/validators';

export const loginUser = (userData, history) => (dispatch) => {
	dispatch(loadingUI());
	const { errors, isValid } = validateLogin(userData);
	if (isValid) {
		auth
			.signInWithEmailAndPassword(userData.email, userData.password)
			.then((cred) => {
				dispatch(clearErrors());
				dispatch(doneLoadingUI());
				history.push('/');
				dispatch(getUserData(cred.user.uid));

				return cred.user.getIdToken();
			})
			.then((idToken) => {
				setFBIdToken(idToken);
			})
			.catch((err) => {
				dispatch(doneLoadingUI());
				if (
					err.code === 'auth/wrong-password' ||
					err.code === 'auth/user-not-found' ||
					err.code === 'auth/invalid-email'
				) {
					dispatch(
						setErrors({ general: 'Wrong credentials. Please try again', })
					);
				} else {
					console.error(err);
				}
			});
	} else {
		dispatch(doneLoadingUI());
		dispatch(
			setErrors(errors)
		);
	}
};

export const getUserData = (userId) => (dispatch) => {
	dispatch({
		type: USER_AUTHENTICATED,
	});
	dispatch({
		type: LOADING_USER,
	});
	db
		.collection('users')
		.where('userId', '==', userId)
		.limit(1)
		.get()
		.then((userSnapshots) => {
			const userDoc = userSnapshots.docs[0];
			dispatch(
				setUserCredentials({
					username: userDoc.id,
					...userDoc.data(),
				})
			);
			dispatch({
				type: DONE_LOADING_USER,
			});
		})
		.catch((err) => {
			dispatch({
				type: DONE_LOADING_USER,
			});
			console.error(err);
		});
};


export const signupUser = (newUserData, history) => (dispatch) => {
	dispatch(loadingUI());
	const { errors, isValid } = validateSignup(newUserData);
	if (isValid) {
		// checks first if username is available on firestore
		db
			.doc(`/users/${newUserData.username}`)
			.get()
			.then((userSnapshot) => {
				// checks if username is not taken
				if (!userSnapshot.exists) {
					// sign up user
					auth
						.createUserWithEmailAndPassword(newUserData.email, newUserData.password)
						.then((cred) => {
							newUserData.userId = cred.user.uid;
							return cred.user.getIdToken();
						})
						.then((idToken) => {
							setFBIdToken(idToken);
							dispatch(clearErrors())
							dispatch(doneLoadingUI());
							history.push('/');
							dispatch({
								type: LOADING_USER,
							});
							newUserData.imageUrl = `${imagesUrl}default.png`;
							newUserData.createdAt = new Date().toISOString();
							// store new user data to firestore
							return db
								.collection('users')
								.doc(newUserData.username)
								.set({
									userId: newUserData.userId,
									email: newUserData.email,
									createdAt: newUserData.createdAt,
									imageUrl: newUserData.imageUrl,
								});
						})
						.then(() => {
							dispatch({
								type: USER_AUTHENTICATED,
							});
							dispatch(
								setUserCredentials({
									username: newUserData.username,
									imageUrl: newUserData.imageUrl,
									createdAt: newUserData.createdAt,
									email: newUserData.email,
									userId: newUserData.userId,
								})
							);
							dispatch({
								type: DONE_LOADING_USER,
							});
						})
						.catch((err) => {
							dispatch(doneLoadingUI());
							if (err.code === 'auth/email-already-in-use') {
								dispatch(
									setErrors({ email: 'Already taken. Please choose another email', })
								);
							} else {
								console.error(err);
							}
						});
				} else {
					dispatch(
						setErrors({ username: 'Already taken. Please choose another username', })
					);
					dispatch(doneLoadingUI());
				}
			})
			.catch((err) => {
				console.error(err);
			});
	} else {
		dispatch(doneLoadingUI());
		dispatch(
			setErrors(errors)
		);
	}
};

const setUserCredentials = (setUserCredentials) => (dispatch) => {
	dispatch({
		type: SET_USER_CREDENTIALS,
		payload: setUserCredentials,
	});
};

const setFBIdToken = (token) => {
	if (localStorage) {
		localStorage.setItem('FBIdToken', token);
	} else {
		console.log('token not save in localStorage');
	}
};

export const logoutUser = () => (dispatch) => {
	auth
		.signOut()
		.then(() => {
			localStorage.removeItem('FBIdToken');
			dispatch({
				type: USER_NOT_AUTHENTICATED,
			})
		})
		.catch((err) => {
			console.error(err);
		});
};

export const uploadImage = (imageFile, userId) => (dispatch) => {
	const metadata = {
    contentType: imageFile.type,
  };
  const imageExt = imageFile.name.split('.').pop();
  const filename = `${uuidv4()}.${imageExt}`;

	const ref = storageRef.child(`images/${filename}`);
	ref
		.put(imageFile, metadata)
		.then(() => {
			db
				.doc(`/users/${userId}`)  
				.update({
					imageUrl: `${imagesUrl}${filename}?alt=media`,
				})
		})
		.catch((err) => {
			console.error(err);
		});
};