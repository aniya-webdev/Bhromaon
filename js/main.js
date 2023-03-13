//Mobile Navigation

const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

navIcon.addEventListener('click', function () {
	this.classList.toggle('nav-icon--active');
	nav.classList.toggle('nav--active');
});

navLinks.forEach(function (item, index) {
	item.addEventListener('click', function () {
		navIcon.classList.remove('nav-icon--active');
		nav.classList.remove('nav--active');
	});

	item.addEventListener('keydown', function (event) {
		if (event.key === 'Tab' && !event.shiftKey && index === navLinks.length - 1) {
			event.preventDefault();
			navIcon.focus();
		} 
	});
});

navIcon.addEventListener('keydown', function (event) {
	if (event.key === 'Tab' && event.shiftKey && document.activeElement === navIcon) {
		event.preventDefault();
		navLinks[navLinks.length - 1].focus();
	}
});

document.addEventListener('keydown', function (event) {
	if (event.key === 'Escape') {
		navIcon.classList.remove('nav-icon--active');
		nav.classList.remove('nav--active');
	}
});


//# sourceMappingURL=main.js.map
