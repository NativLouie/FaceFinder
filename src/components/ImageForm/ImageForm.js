import React from 'react'
import './ImageForm.css'



export const ImageForm = () => {
	return (
		<div>
			<p className='f2' style={ { fontWeight: 'bold' } }>
				{ `I can detect faces in photos.Take me for a spin 😊 ` }
			</p>

			<div className='center br3'>

				<div className='form center pa4 br3 shadow-3'>
					<input className='f4 pa2 w-70 center' type='text' placeholder=' Enter image url..' />
					<button className='w-30 grow f4 link ph3 pv2 pa1 dib white bg-red'> DETECT</button>
				</div>

			</div>

		</div>

	)
}
