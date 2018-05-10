import React from 'react'
import fetch from 'isomorphic-fetch'

import noop from './noop'

class ZapierForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false,
			loading: false,
			success: false,
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.onSuccess = this.onSuccess.bind(this)
		this.onError = this.onError.bind(this)
	}
	async onSubmit(e) {
		e.preventDefault()
		if (!this.props.canSubmit || this.honeypot.value) return

		this.setState({
			loading: true,
			error: false,
			success: false,
		})

		let data = new FormData(this.form)

		let notValid = await this.props.validate(data)
		if (notValid) {
			return this.setState({
				loading: false,
				error: false,
				success: false,
			})
		}

		this.props.onSubmit(data)

		let res
		let body
		try {
			res = await fetch(this.props.action, {
				method: `post`,
				body: data,
			})
		}
		catch(err){
			return this.onError(`Connection error`)
		}
		if (res.status !== 200) {
			return this.onError(`Error code ${res.statusText}`)
		}
		try{
			body = await res.json()
		}
		catch(err){
			return this.onError(`Error parsing JSON`)
		}
		if(body.status !== `success`){
			return this.onError(body)
		}
		this.onSuccess(res)
	}
	onSuccess(body) {
		this.props.onSuccess(body)
		this.setState({
			loading: false,
			success: body,
			error: false,
		})
	}
	onError(err) {
		console.error(err)
		this.props.onError(err)
		return this.setState({
			loading: false,
			error: err,
			success: false,
		})
	}
	render() {
		return (
			<form
				ref={form => this.form = form}
				onSubmit={this.onSubmit}
				{...this.formProps}
				>
				<div style={{ display: `none` }}>
					<input
						type='text'
						name={this.props.honeyPotName}
						ref={honeypot => this.honeypot = honeypot}
						/>
				</div>
				{this.props.children(this.state)}
			</form>
		)
	}
}

ZapierForm.defaultProps = {
	canSubmit: true,
	honeyPotName: `p_number`,
	onSubmit: noop,
	onSuccess: noop,
	onError: noop,
	validate: noop,
}

export default ZapierForm