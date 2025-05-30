# language: ru
Функция: Фильтр в списках

  Сценарий: При нажатии на инпут уже выбран элемент не действует как фильтр
    Пусть находимся в новой статье
    И наводимся и нажимаем на элемент "действия каталога"
    Когда нажимаем на кнопку "Настроить каталог"
    Тогда видим форму "Настройки каталога"
    Пусть смотрим на активную форму
    Когда заполняем форму
      """
      Директория: test/a/b
      Стиль: Красный
      """
    И смотрим на выпадающий список
    И нажимаем на кнопку "Красный"
    И смотрим на активную форму
    И нажимаем на поле "Стиль"
    И смотрим на выпадающий список
    И видим текст "Синий" на странице
