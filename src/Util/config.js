import Clarifai from 'clarifai';





const apiKey = '75817d8fc4c44b49aba96dfc171bbc9c';
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
	app
}
