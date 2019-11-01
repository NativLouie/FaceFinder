import React from 'react'




export const Rank = ({ name, entries }) => {
	return (
		<div>
			<div className='white f3'>
				{ `${ name }, You have checked ` }
			</div>
			<div className='white f1'>
				{ `${ entries } photos` }
			</div>

		</div>

	)
}
