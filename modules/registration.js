import axios from 'axios'
let form = document.forms.reg;

form.onsubmit = (e) => {
	e.preventDefault();

	let user = {
		"cart": [],
		"favoride": []
	};


	let fm = new FormData(e.target);

	fm.forEach((value, key) => {
		user[key] = value;
	});


	if (user.email && user.name && user.surname && user.password) {
		axios.post('http://localhost:3000/users', user)
			.then(res => {
				if (res.status === 200 || res.status === 201) {
					window.location.assign("/pages/login.html");
				}
			})
	} else {
		alert("Error");
	}
};


