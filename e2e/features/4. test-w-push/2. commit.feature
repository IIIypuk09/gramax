# language: ru
Функция: Коммит

  Сценарий: Открытие меню пропсов статьи
    Пусть смотрим на "левую навигацию"
    И смотрим на "Без названия"
    И наводим мышку
    И смотрим на "панель действий статьи"
    Когда нажимаем на иконку "три точки"
    И смотрим на подсказку
    И нажимаем на кнопку "Настроить"
    Тогда видим форму "Настройки статьи"

  Сценарий: Изменение пропсов статьи
    Пусть смотрим на активную форму
    Когда заполняем форму
      """
      Заголовок: Тест
      URL: test1
      """
    И нажимаем на кнопку "Сохранить"
    И заново смотрим на "левую навигацию"
    И нажимаем на кнопку "Тест"

  Сценарий: Коммит
    Когда смотрим на "левую панель"
    И смотрим на "нижнюю панель"
    И нажимаем на иконку "облачка"
    И видим форму "публикация" без заголовка
    Тогда смотрим на активную форму
    И смотрим на "левую панель"
    И видим текст "test1.md"
    И нажимаем на кнопку "Опубликовать"
    И смотрим на активную форму
    И ждём конца загрузки
