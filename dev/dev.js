import React from 'react'
import { render } from 'react-dom'
import ZapierForm from '../src'

render(
	<ZapierForm action='https://hooks.zapier.com/hooks/catch/asdf/asdf/'>
		{({ error, loading, success }) => {
			return (
				<main>
					{error && <div>Something went wrong. Please try again later.</div>}
					{!success && !loading &&
						<div>
							<div>
								<input type='email' name='Email' placeholder='Email' />
							</div>
							<div>
								<textarea name='Message' placeholder='Your message' />
							</div>
							<button>Submit</button>
						</div>
					}
					{loading && <div>Loading...</div>}
					{success && <div>Thank you for contacting us!</div>}
				</main>
			)
		}}
	</ZapierForm>,
	document.querySelector(`#container`)
)