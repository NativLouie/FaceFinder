const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (email) => {

	if (email.length <= 0) {
		console.log('email is empty')
		return true;
	} else if (emailReg.test(email) === false) {
		console.log('email is not good format')
		return true;
	}
}



export const validateName = (name) => {
	if (name.length <= 0) {
		console.log('name is empty')
		return true;
	}
}

export const validatePassword = (password) => {
	if (password.length < 4) {
		console.log('password too short')
		return true;
	}
}
