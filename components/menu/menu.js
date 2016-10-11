(function() {
	'use strict';

	//import
	let _template = window.fest['menu/menu.tmpl'];


	/**
	 * @class Menu
	 * Компонента "Меню"
	 */
	class Menu {

		/**
		 * constructor of Menu class
		 * @param el - element to maintain and render
		 * @param data - data to create (render) menu
		 */
		constructor ({el, data}) { // деструктуризация объекта
			this.el = el;
			this.data = data;

			this.render();

			this._initEvents();
		}

		setData(data){
			this.data = data;
		}

		/**
		 * Добавляем элемент меню
		 * @param {Object} item
		 */
		addItem (item) {
			this.data.items.push(item);
			this.render();
		}

		/**
		 * Удаляем пункт меню из данных
		 * и делаем ререндер, чтобы данные были консистентны (и внешне и внутренне все одинаково)
		 * @param  {Object} removedItem
		 */
		removeItem (removedItem) {
			this.data.items = this.data.items.filter( (item, index, arr) => {
				return index !== removedItem.index;
			});
			this.render();
		}

		/**
		 * Создаем HTML
		 */
		render () {
			this.el.innerHTML = _template(this.data);
		}

		/**
		* Удаления элемента меню
		* @param  {HTMLElement} item
		* @private
		*/
		_onremove(item) {
			let index = parseInt(item.parentNode.dataset.index, 10);

			this.removeItem({
				index
			});
		}

		/**
		* Выбор элемента меню
		* @param  {HTMLElement} item
		*/
		_onpick(item) {
			this.onPick(item);
		}

		/**
		* Развешиваем события
		*/
		_initEvents() {
			this.el.addEventListener('click', this._onClick.bind(this));
		}

		/**
		* Клик в любую область меню (функцию-обработчик "собираем" из дата-атрибута)
		* @param {Event} event
		* @private
		*/
		_onClick(event) {
			event.preventDefault();
			let item = event.target;

			try {
				this['_on' + item.dataset.action](item);
			} catch (e) {
				throw new Error(`Метод ${item.dataset.action} не определен!`);
			}

		}

	}

	// Export
	window.Menu = Menu;

})(window);