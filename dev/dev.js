import React from 'react'
import { render } from 'react-dom'
import Form from '../src/index'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

render(
	<Form action='https://hooks.zapier.com/hooks/catch/2384321/kcli8e/'>
		{({ error, loading, success }) => {
			return (
				<div>
					{error && <div>Error!</div>}
					{loading && <div>Loading...</div>}
					{success && <div>Success!</div>}
					{!success && !loading &&
						<div>
							<input type='text' name='Name' placeholder='Name' />
							<input type='file' name='File' placeholder='Email' />
							<button>Submit</button>
						</div>
					}
				</div>
			)
		}}
	</Form>,
	containerEl
)