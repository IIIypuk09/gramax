# language: ru
Функция: Версионирование

  @next-only
  Сценарий: Переключение на тег
    Пусть смотрим на "правую панель"
    И видим кнопку "master"
    И нажимаем на кнопку "master"
    И смотрим на подсказку
    Когда нажимаем на кнопку "Z"
    И заново смотрим на "левую навигацию"
    И видим кнопку "Тег"
    И нажимаем на кнопку "Тег"
    Тогда находимся по адресу "/test-catalog:Z/teg"

  @next-only
  Сценарий: Переключение на мастер
    Пусть смотрим на "правую панель"
    И видим кнопку "Z"
    И нажимаем на кнопку "Z"
    И смотрим на подсказку
    Когда нажимаем на кнопку "master"
    И заново смотрим на "левую навигацию"
    Тогда находимся по адресу "/test-catalog/teg"
