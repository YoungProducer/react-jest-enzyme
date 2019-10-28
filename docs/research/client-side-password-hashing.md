# Client side password hashing

This document serves to describe the potential benefits and disadvantages of client side password hashing.

## Benefits

No plaintext password is received by any part of the InferStat infrastructure. Mitigating any potential for passwords
to be exposed by error traces or logging.

Potentially protects the user if they have used that password on multiple sites if at some point between the hashing
and the server side hashing the password is compromised, this relies on either HTTPS being somehow not used or the
attacker having access to the server pre-server hashing (probably at the web API level).

## Negatives

### Validation

No way to validate password requirements in the backend. This means that it is only possible to validate the password
requirements in the client side before the hashing takes place, the repercussion of this is that potentially a user with
direct access to the API can create an account with an insecure password, compromising overall security of the system.

To carry this out the user would need to bypass the GUI. This isn't a security vulnerability in the overall system as
the user would need to be authenticated with the system to carry this out.

Having the front end as the source of truth for password validation is acceptable, as any bypassing of it would be an
explicit action by the user and pose a risk only to them to downgrade the complexity of their password.

## Potential implementations

### With bcrypt

Most JS bcrypt implementations available rely on node-gyp to compile C/C++ source code for use with the V8 engine, as
this will be client-side we are limited in which packages can be used.

On NPM there is a plain JS implementation advertised as around 30% slower than the native implementation which should
work in browser.

https://www.npmjs.com/package/bcryptjs

Example usage:

```
const bcrypt = require('bcryptjs');

const password = process.argv[2]; // first arg is password

const salt = bcrypt.genSaltSync(10); // This would need to be static once generated and never updated or all stored passwords will be invalid

const hash = bcrypt.hashSync(password, salt);

console.log(hash);
// eg: $2a$10$2OJyxwbSjum3sXAvPF74N.7VUbxod5eK24o.n7Q0pRlrT5NJEuQ1C
```

This implementation when minified is 21K, so would increase our current JS bundle size by about 18% (at time of
writing it is 116.22 KB).

### With hash.js

https://www.npmjs.com/package/hash.js

```
const sha512 = require('hash.js/lib/hash/sha/512');

function hashPassword({email, password}) {
	return sha512() // Salt the password with the email
		.update(`${password}${email}`)
		.digest('hex');
}

const hashedPassword = hashPassword({
	email: admin@InferStat.com,
	password: "password"
});

console.log(hashedPassword);
// d61f6cbcb36c64f637b2f9725299f4f6c218ebee7e870da776046aadf3d52cb1523103ad7323e4db818b22b23c162c3a87478efbbaac06354554f73ac9dfd93f
```

### With redux

The hash could then be sent to the backend via redux during the action creator stage when account creation & login
actions are created.

eg:

```
const hashFunction = require('./someHashFunctionSomewhere');

function createLoginAction(password, email) {
	const hash = hashFunction({password, email});

	return {
		type: LOGIN,
		payload: {
			email,
			hashedPassword: hash
		}
	};
}
```

By hashing it at the actionCreators it would prevent plaintext passwords entering the redux store on the client's local
machine, also prevent it potentially appearing in any action log traces we might send to error reporting services like
sentry.

## Versioning login hashing

We might want to version credentials and enable users to upgrade between different hashes.

Details about what hashing function was used in the client (eg: bcrypt, sha512) could be sent along with credentials
when a user logs in as part of the login request eg:

```
POST /api/auth/login {
	email: "someone@something.com",
	password: "password",
	verion: "plaintext"
}

POST /api/auth/login {
	email: "someone@something.com",
	password: "d61f6cbcb36c64f637b2f9725299f4f6c218ebee7e870da776046aadf3d52cb1523103ad7323e4db818b22b23c162c3a87478efbbaac06354554f73ac9dfd93f",
	verion: "sha512"
}
```

We could use this as an upgrade process to upgrade security requirements as users log in, the version information could
be stored by publicApi along with their credentials and used to determine what version of the hashing function was
used client side. Subsequently an upgrade process could be added to the API to "challenge" the client to authenticate
with their stored credentials and upgrade to a later one.
