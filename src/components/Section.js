//не имеет разметки. Отвечает за отрисовку элементов на странице, принимает
//items как массив данных, что будет отрисован, renderer - функция отрисовки
//и селектор контейнера, куда будет происходить отрисовка

export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //отрисовывает указанный элемент
  addItem(element) {
    this._container.append(element);
  }

  addUserItem(element) {
    this._container.prepend(element);
  }

  renderItems(array, userDataId) {
    array.forEach(item => {
      this._renderer(item, userDataId);
    });
  }

}
