# # language: ru
# Функция: Создание и переоткрытие заметки
#   Сценарий: Включение экспериментальных функций
#     Пусть находимся на "главной"
#     И нажимаем на кнопку "Экспериментальные функции" и ждём загрузки
#   Сценарий: Создание каталога
#     Пусть находимся на "главной"
#     И смотрим на "панель действий"
#     Когда нажимаем на кнопку "Добавить каталог"
#     И нажимаем на кнопку "Создать новый"
#     Тогда находимся по адресу "/-/-/-/-/new-catalog-3"
#   Сценарий: Создание заметки
#     Пусть наводимся и нажимаем на элемент "действия каталога"
#     Когда нажимаем на кнопку "Inbox"
#     И смотрим на активную вкладку
#     И нажимаем на кнопку "Новая заметка"
#     И смотрим на подсказку
#     И ждём 1 секунду
#     И вводим "Жить здорово с Еленой Малышевой"
#     И нажимаем на клавишу "Enter"
#     И вводим "(Это не текст, это заметка)"
#     И смотрим на активную вкладку
#     Тогда видим кнопку "Жить здорово с Еленой Малышевой"
#   Сценарий: Переоткрытие заметки
#     Пусть перезагружаем страницу
#     Когда наводимся и нажимаем на элемент "действия каталога"
#     И нажимаем на кнопку "Inbox"
#     И смотрим на активную вкладку
#     И нажимаем на кнопку "Жить здорово с Еленой Малышевой"
#     И смотрим на подсказку
#     Тогда видим текст "Жить здорово с Еленой Малышевой"
#     И смотрим на активную вкладку
#     И нажимаем на кнопку "Жить здорово с Еленой Малышевой"
