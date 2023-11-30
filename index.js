import { saveUser } from './user-model.js';
import login from './user-logger.js';

function main() {
	const [command, username, password] = process.argv.splice(2);

	if (command == 'save') return saveUser(username, password);
	if (command == 'login') return login(username, password);
}

console.log(main());
