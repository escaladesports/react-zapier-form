import ZapierForm from '../dist'
import React from 'react'
import { render } from 'react-dom'

const el = document.createElement(`div`)
document.body.appendChild(el)

render(
	<ZapierForm action='https://hooks.zapier.com/hooks/catch/2384321/ao6t1c/'>
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
	el
)