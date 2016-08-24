import AMAZON_S3 from '../config/AMAZON_S3_KEYS';
import { RNS3 } from 'react-native-aws3';

const options = {
  keyPrefix: 'uploads/',
  bucket: AMAZON_S3.bucket,
  region: AMAZON_S3.region,
  accessKey: AMAZON_S3.accessKey,
  secretKey: AMAZON_S3.secretKey,
  successActionStatus: 201
};

const uploadImage = (uri, type, fileSize, callback) => {
	// console.log('image.origURL', image.origURL);
	let file = {
	  uri: 'file://' + uri,
	  name: '/' + type + '/' + fileSize + '.jpg',
	  type: 'image/jpg'
	};

	console.log('options', options);

	RNS3.put(file, options).then(response => {
		if (response.status !== 201) {
		  throw new Error('Failed to upload image to S3');
		}
			console.log('response.status', response);
		callback(response.body);
	})
	.catch(error => {
		console.log(error);
	});
};

export default uploadImage;