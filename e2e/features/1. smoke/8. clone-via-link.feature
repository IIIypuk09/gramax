# language: ru
Функция: Клонирование каталога по ссылке

  @next-only
  Сценарий: Аутентификация
    Пусть находимся в "/admin"
    Когда смотрим на активную форму
    И видим форму "Вход в аккаунт"
    Тогда заполняем форму
      """
      Логин: %next-login%
      Пароль: %next-password%
      """
    И нажимаем на кнопку "Войти"
    И находимся по адресу "/"

  @next
  Сценарий: Открытие меню добавления каталога
    Пусть находимся на "главной"
    И смотрим на "панель действий"
    Когда нажимаем на кнопку "Добавить каталог"
    Тогда видим кнопку "Загрузить существующий"

  @next
  Сценарий: Открытие формы клонирования
    Пусть смотрим на "панель действий"
    Когда нажимаем на кнопку "Загрузить существующий"
    Тогда видим форму "Загрузить существующий каталог"

  @next
  Сценарий: Выбор клонирования по публичной ссылке
    Пусть смотрим на активную форму
    И смотрим на выпадающий список
    Когда нажимаем на кнопку "Склонировать по ссылке"
    И смотрим на активную форму
    Тогда видим элемент "URL публичного git-репозитория"

  @next
  Сценарий: Ввод некорректной ссылки
    Пусть смотрим на активную форму
    Когда заполняем форму
      """
      URL публичного git-репозитория: https://example.com/invalid-repo
      """
    И ждём 2 секунды
    Тогда кнопка "Загрузить" неактивна

  @next
  Сценарий: Ввод корректной ссылки
    Пусть смотрим на активную форму
    Когда заполняем форму
      """
      URL публичного git-репозитория: https://github.com/pashokitsme/android-intent
      """
    И ждём 2 секунды
    Тогда смотрим на активную форму
    И кнопка "Загрузить" активна

  Сценарий: Клонирование репозитория
    Пусть смотрим на активную форму
    Когда нажимаем на кнопку "Загрузить" и ждём загрузки
    И ждём конца загрузки
    И нажимаем на кнопку "android-intent"
    И ждём конца загрузки
    Тогда находимся по адресу "/-/-/-/-/android-intent"

  @next-only
  Сценарий: Клонирование репозитория в next-версии
    Пусть смотрим на активную форму
    Когда заполняем форму
      """
      URL публичного git-репозитория: https://github.com/pashokitsme/android-intent
      """
    И ждём 2 секунды
    И нажимаем на кнопку "Загрузить" и ждём загрузки
    И нажимаем на кнопку "android-intent"
    И ждём конца загрузки
    Тогда находимся по адресу "/android-intent"
