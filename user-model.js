import fs from 'node:fs';
import { getSalt, hashSaltedPassword } from './password-hasher.js';

const usersBuffer = fs.readFileSync('./database.json');
const users = JSON.parse(usersBuffer);

const getUserByName = (username) =>
	users.find((user) => user.username == username);

const saveUser = (username, password) => {
	if (!username || !password) return { error: 'Missing data' };

	const salt = getSalt();
	const hashedPassword = hashSaltedPassword(password, salt);
	const hashAndSalt = `${salt}:${hashedPassword}`;

	users.push({ username, password: hashAndSalt });
	fs.writeFileSync('./database.json', JSON.stringify(users));

	return { message: `User ${username} saved successfully!` };
};

export { getUserByName, saveUser };
