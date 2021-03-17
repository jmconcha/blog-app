// checks if data is empty, return true if empty otherwise false
const isEmpty = (data) => data.trim() === '';

// validate login data (email, password)
export const validateLogin = (data) => {
	const errors = {};

	if (isEmpty(data.email)) errors.email = 'Must not be empty';
	if (isEmpty(data.password)) errors.password = 'Must not be empty';

	return {
		errors,
		isValid: Object.keys(errors).length < 1,
	};
};

// validate signup data (email, password, confirmPassword, username)
export const validateSignup = (data) => {
	const errors = {};
	// regular expression to validate email
	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (isEmpty(data.email)) errors.email = 'Must not be empty';
	else if (!data.email.match(regEx)) errors.email = 'Must be a valid email';
	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	else if (data.password.length < 6) errors.password = 'Password must be at least 6 characters';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match';
	if (isEmpty(data.username)) errors.username = 'Must not be empty';

	return {
		errors,
		isValid: Object.keys(errors).length < 1,
	};
};

// validate user details (bio, website, location)
export const reduceUserDetails = (newData, oldData) => {
	const userData = {};
	//checks each property key and value of newData and oldData if the same
	// does not include in userData if true and not empty
	// otherwise include in userData
	for (let key in newData) {
		if (newData[key] !== oldData[key]) {
			userData[key] = newData[key];
		}
	}

	if (userData.website && !userData.website.startsWith('http')) {
		userData.website = `http://${userData.website}`;
	}

	return userData;
};