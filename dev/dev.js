import React from 'react'
import { render } from 'react-dom'
import ZapierForm from '../src'

render(
	<ZapierForm action='https://hooks.zapier.com/hooks/catch/2384321/ao6t1c/'>
		{({ error, loading, success }) => {
			return (
				<div>
					{!success && !loading &&
						<div>
							<input type='email' name='Email' placeholder='Email' />
							<textarea name='Message' placeholder='Your message' />
							<button>Submit</button>
						</div>
					}
					{loading && <div>Loading...</div>}
					{error && <div>Something went wrong. Please try again later.</div>}
					{success && <div>Thank you for contacting us!</div>}
				</div>
			)
		}}
	</ZapierForm>,
	document.querySelector(`#container`)
)