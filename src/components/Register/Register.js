import React from 'react'
import { validateEmail, validateName, validatePassword } from '../../Util'




export default class Register extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			error: ''
		}
	}

	handleOnNameChange = (event) => {
		this.setState({ name: event.target.value })
	}

	handleOnEmailChange = (event) => {
		this.setState({ email: event.target.value })
	}

	handleOnPasswordChange = (event) => {
		this.setState({ password: event.target.value })
	}

	handleOnSubmitSignIn = () => {

		const { email, password, name } = this.state

		if (validateName(name)) {
			this.setState({ error: "Name can not be empty" })
			return
		} else if (validateEmail(email)) {
			this.setState({ error: 'Email is not valid' })
			return
		} else if (validatePassword(password)) {
			this.setState({ error: 'Password must be 4 or characters' })
			return
		}


		fetch('http://localhost:3001/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password,
				name: name
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user) {
					this.props.loadUser(user)
					this.props.onRouteChange('home');
				}
			})
	}

	render () {
		const { error } = this.state
		return (
			<article className="br3 ba b--black-10 mv4 w-200 w-100-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">

							<legend className="f1 fw6 ph0 mh0">Register</legend>

							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>

								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="text"
									name="name"
									id="name"
									onChange={ this.handleOnNameChange }
								/>

							</div>


							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
									onChange={ this.handleOnEmailChange }
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									onChange={ this.handleOnPasswordChange }

								/>
							</div>

						</fieldset>
						<div>
							<p style={ { color: 'red', fontSize: '15px' } }>{ error }</p>
						</div>

						<div className="">
							<input
								onClick={ this.handleOnSubmitSignIn }
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
								type="submit"
								value="Register"


							/>
						</div>
					</div>
				</main>
			</article>

		)

	}

}
