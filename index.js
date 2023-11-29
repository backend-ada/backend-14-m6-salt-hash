const crypto = require('node:crypto');
const fs = require('node:fs');

const usersBuffer = fs.readFileSync('./database.json');
const users = JSON.parse(usersBuffer);

const addSalt = () => crypto.randomUUID();

// const hashPasswordWithoutSalt = (password) =>
// 	crypto.createHash('sha256').update(password).digest('hex');

const hashSaltedPassword = (password, salt) => {
	return crypto
		.createHash('sha256')
		.update(salt + password)
		.digest('hex');
};

const saveUser = (username, password) => {
	const salt = addSalt();
	const hashedPassword = hashSaltedPassword(password, salt);

	const saltedHash = `${salt}:${hashedPassword}`;

	users.push({ username, password: saltedHash });

	const stringifiedData = JSON.stringify(users);

	fs.writeFileSync('./database.json', stringifiedData);
};

const login = (username, password) => {
	const userFound = users.find((user) => user.username == username);

	if (!userFound) return 'User not found';

	const userCredentials = userFound.password.split(':');
	const salt = userCredentials[0];
	const hash = userCredentials[1];

	const hashedPassword = hashSaltedPassword(password, salt);

	if (hash === hashedPassword) return 'User logged';

	return 'Wrong password';
};

// saveUser('noelia', 'qwer2134');
// saveUser('juan', 'qwer2134');
// saveUser('maria', 'qwer2134');
// saveUser('marcelo', 'qwer2134');

const result = login('noelia', 'qwer2134');
console.log(result);

// const result = login('maria', 'qwer1234');

//--- HASH SIN SALT ---//

// 5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9
// 5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9
// 5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9
// SALT --> 156d104f-0340-4548-88d6-e7f14591e657
// SALT 2 --> ca620fb8-188f-42fb-a410-ea3d7b2a64b4
// 6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b
// 6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b
// 6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b
// SALT --> 919594bd-6145-4cf7-b553-59adbc0ae266
// SALT 2 --> 2a5388b9-0555-451f-adbf-04dc3bcd7b95
// d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35
// d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35
// d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35
// SALT --> 1299dc0f-ef5d-483f-b0be-3388ce8ffa07
// SALT 2 --> 3af01e71-5c9a-4b6a-b0c5-c21b25113212

//--- HASH CON SALT ---//

// --------------WITHOUT SALT----------------
// 5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9
// 5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9
// 5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9
// --------------WITH SALT----------------
// 6901f2284228be8f5631010422fb4233a3c177f8706323f10a6897d00cfbd1b2
// 8d1d6c99f1293fd45abbe31e8be21c62595cd1d63cc5b8ef7dbdf8331e5c8a29
// 3eb8b3ca2bf93886099fda28f8da5d85f3420d31d10e5adfc5908ca430683932
// --------------WITHOUT SALT----------------
// 6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b
// 6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b
// 6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b
// --------------WITH SALT----------------
// 64e559acac71cbac4a3b2aa2009414e1d81ea263f873c7d606e304ac30fbd141
// 1fe560ccf86a992a9f172d36f07e4e81b2b19e0aa6ff2744b5b9c70260b84446
// 854e9987f39441b5636b6ede35d743dbec824951b4fcc16802e8581406d6764b
// --------------WITHOUT SALT----------------
// d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35
// d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35
// d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35
// --------------WITH SALT----------------
// 8c4fbf9d445c069b8495b0d623fc6526b182786f78e7e1b6484fa7fa840d5eb1
// dd213794e9cf186adc2d994731cd03e4cfeef87692a7f010782b8090ad4a4ec6
// 50e3ee8f12be776e1fb1e2168f8826815296940396945f3d6231439d2e765b8e
