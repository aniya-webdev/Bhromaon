// //Mobile Navigation

const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('.nav');
const logo = document.querySelector('.header__logo');
const navLinks = document.querySelectorAll('.nav a');

navIcon.addEventListener('click', function () {
	this.classList.toggle('nav-icon--active');
	nav.classList.toggle('nav--active');
	logo.classList.toggle('header__logo--active');
});

navLinks.forEach(function (item, index) {
	item.addEventListener('click', function () {
		navIcon.classList.remove('nav-icon--active');
		nav.classList.remove('nav--active');
		logo.classList.remove('header__logo--active');
	});

	item.addEventListener('keydown', function (event) {
		if (event.key === 'Tab' && !event.shiftKey && nav.classList.contains('nav--active')) {
		  event.preventDefault();
		  const nextIndex = index === navLinks.length - 1 ? 0 : index + 1;
		  navLinks[nextIndex].focus();
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
		logo.classList.remove('header__logo--active');
	}
});


//# sourceMappingURL=main.js.map
