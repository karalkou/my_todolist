(function () {
 	'use strict';

	//import
	let Menu = window.Menu;
	let Form = window.Form;
	let Model = window.Model;

	let menuModel = new Model({
		resource: '/data/menu.json'
	});

	let menu = new Menu({
		el: document.querySelector('.js-menu'),
		/*data: {
			title: 'SIMPLE TO DO LIST',
			items: [{task: 'to do smth'}]
		}*/ // осталось от предыдущего варианта, когда данные передавались сразу тут, а не подтягивались через Model
	});

	/**
	 * Вызов метода подписки на "событие" update модели
	 * в частности данное "событие" генерируется при создании
	 * инстанса класса Model (см. model.js).
	 */
	menuModel.on('update', (data) => {
		menu.setData(data);
		menu.render();
	});

	let form = new Form({
		el: document.querySelector('.js-form')
	});

	/**
	 *  при получении события добавления от формы,
	 *  инициируем обработчик добавления элемента в меню
	 */
	form.on('add', (event) => {
			menu.addItem(event.detail);
		}
	);

	// fetch данные с сервера
	menuModel.fetch();

})();