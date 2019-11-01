import Clarifai from 'clarifai';





const apiKey = '2448c264c1db4d97a77774e2f87b75c6';
const particlesConfig = {
	"particles": {
		"number": {
			"value": 100,
			"density": {
				"enable": true,
				"value_area": 900
			}
		}
	}
}

const app = new Clarifai.App({
	apiKey: apiKey
});


export const config = {
	particlesConfig,
	app,
	Clarifai

}
