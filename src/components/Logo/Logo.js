import React from 'react'
import Tilt from 'react-tilt'
import { logoImage } from '../Logo'
import './Logo.css'


export const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shawdow-2" options={ { max: 70, speed: 300 } } style={ { height: 350, width: 350 } } >
				<div className="Tilt-inner pa3">
					<img src={ logoImage } alt='face finder logo' style={ { paddingTop: '5px' } } />
				</div>
			</Tilt>
		</div>

	)
}
