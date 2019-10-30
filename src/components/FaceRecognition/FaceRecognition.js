import React from 'react'
import './FaceRecognition.css'


export const FaceRecognition = ({ imageUrl, boxArea }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={ imageUrl } width='500px' height='auto' />
				<div className='bounding-box' style={ { top: boxArea.topRow, right: boxArea.rightCol, bottom: boxArea.bottomRow, left: boxArea.leftCol } }> </div>
			</div>

		</div>
	)
}
