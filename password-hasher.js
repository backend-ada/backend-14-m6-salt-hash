import crypto from 'node:crypto';

const getSalt = () => crypto.randomUUID();

const hashSaltedPassword = (password, salt) => {
	return crypto
		.createHash('sha256')
		.update(salt + password)
		.digest('hex');
};

export { getSalt, hashSaltedPassword };
