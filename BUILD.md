# Инструкция по сборке приложения с использованием Electron

Этот документ содержит подробные инструкции по сборке десктопной версии игры Super Mario JS с использованием Electron для различных платформ.

## Содержание

- [Требования](#требования)
- [Установка зависимостей](#установка-зависимостей)
- [Разработка](#разработка)
- [Сборка для Windows](#сборка-для-windows)
- [Сборка для macOS](#сборка-для-macos)
- [Сборка для Linux](#сборка-для-linux)
- [Сборка для всех платформ](#сборка-для-всех-платформ)
- [Настройка иконок](#настройка-иконок)
- [Структура проекта](#структура-проекта)
- [Устранение неполадок](#устранение-неполадок)

## Требования

### Общие требования для всех платформ

- **Node.js**: версия 14 или выше
- **npm** или **yarn**
- **Git**

### Дополнительные требования для сборки под конкретные платформы

#### Для сборки Windows приложений

- **Windows**: Windows 7 или выше
- Опционально: **NSIS** (автоматически устанавливается electron-builder)

#### Для сборки macOS приложений

- **macOS**: macOS 10.13 или выше
- **Xcode Command Line Tools**: установить через `xcode-select --install`
- Для подписи приложения: Apple Developer аккаунт

#### Для сборки Linux приложений

- **Linux**: Ubuntu 18.04+, Debian, Fedora, или другой дистрибутив
- Дополнительные пакеты (для Ubuntu/Debian):
  ```bash
  sudo apt-get install build-essential libgconf-2-4 rpm
  ```

## Установка зависимостей

1. Клонируйте репозиторий:
```bash
git clone https://github.com/andchir/mario-js.git
cd mario-js
```

2. Установите все необходимые зависимости:
```bash
npm install
```

Это установит:
- Electron
- electron-builder (для сборки приложений)
- Vite (для сборки веб-версии)
- Phaser (игровой движок)
- Все вспомогательные пакеты

## Разработка

Для запуска приложения в режиме разработки с горячей перезагрузкой:

```bash
npm run electron:dev
```

Эта команда:
1. Запускает Vite dev server на порту 5173
2. Ожидает запуска сервера
3. Запускает Electron приложение, которое подключается к dev серверу
4. Открывает DevTools для отладки

### Только веб-версия

Если вы хотите запустить только веб-версию без Electron:

```bash
npm run dev
```

Затем откройте браузер по адресу `http://localhost:5173`

## Сборка для Windows

### На Windows

```bash
npm run electron:build:win
```

Эта команда создаст:
- **NSIS установщик** (`.exe`) - полноценный инсталлятор с возможностью установки/удаления
- **Portable версию** (`.exe`) - автономное приложение без установки

Готовые файлы будут находиться в папке `dist-electron/`:
- `Super Mario JS Setup X.X.X.exe` - установщик
- `Super Mario JS X.X.X.exe` - portable версия

### Кросс-платформенная сборка

На macOS или Linux можно собрать Windows версию (требуется wine):

```bash
# Установка wine на macOS
brew install wine

# Установка wine на Ubuntu/Debian
sudo apt-get install wine

# Сборка
npm run electron:build:win
```

## Сборка для macOS

### На macOS

```bash
npm run electron:build:mac
```

Эта команда создаст:
- **DMG образ** (`.dmg`) - стандартный формат для распространения macOS приложений
- **ZIP архив** (`.zip`) - сжатая версия приложения

Готовые файлы будут находиться в папке `dist-electron/`:
- `Super Mario JS-X.X.X.dmg`
- `Super Mario JS-X.X.X-mac.zip`

### Подпись приложения

Для распространения через App Store или для избежания предупреждений безопасности, необходимо подписать приложение:

1. Получите сертификат разработчика от Apple
2. Установите переменные окружения:
```bash
export APPLE_ID="your-apple-id@example.com"
export APPLE_ID_PASSWORD="app-specific-password"
export CSC_LINK="/path/to/certificate.p12"
export CSC_KEY_PASSWORD="certificate-password"
```
3. Запустите сборку:
```bash
npm run electron:build:mac
```

### Кросс-платформенная сборка

Сборка macOS приложений на других платформах не рекомендуется и может не работать корректно.

## Сборка для Linux

### На Linux

```bash
npm run electron:build:linux
```

Эта команда создаст несколько форматов:
- **AppImage** (`.AppImage`) - универсальный формат, работает на большинстве дистрибутивов
- **DEB пакет** (`.deb`) - для Debian/Ubuntu
- **RPM пакет** (`.rpm`) - для Fedora/RHEL/CentOS

Готовые файлы будут находиться в папке `dist-electron/`:
- `Super Mario JS-X.X.X.AppImage`
- `super-mario-js_X.X.X_amd64.deb`
- `super-mario-js-X.X.X.x86_64.rpm`

### Установка AppImage

```bash
chmod +x Super\ Mario\ JS-X.X.X.AppImage
./Super\ Mario\ JS-X.X.X.AppImage
```

### Установка DEB пакета

```bash
sudo dpkg -i super-mario-js_X.X.X_amd64.deb
```

### Установка RPM пакета

```bash
sudo rpm -i super-mario-js-X.X.X.x86_64.rpm
```

### Кросс-платформенная сборка

На macOS или Windows можно собрать Linux версию (требуется Docker):

```bash
# Установка Docker
# Следуйте инструкциям на https://docs.docker.com/get-docker/

# Сборка
npm run electron:build:linux
```

## Сборка для всех платформ

Для сборки приложения для текущей платформы (автоматически определяется):

```bash
npm run electron:build
```

## Настройка иконок

Для правильного отображения иконки приложения, необходимо создать файлы иконок для каждой платформы:

### Windows (icon.ico)

1. Создайте PNG изображение размером 256x256 пикселей
2. Конвертируйте в ICO формат (можно использовать онлайн-конвертеры или imagemagick)
3. Разместите файл в `build/icon.ico`

Используя imagemagick:
```bash
convert icon.png -define icon:auto-resize=256,128,64,48,32,16 build/icon.ico
```

### macOS (icon.icns)

1. Создайте PNG изображение размером 1024x1024 пикселей
2. Создайте ICNS файл (на macOS):
```bash
mkdir icon.iconset
sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset -o build/icon.icns
rm -rf icon.iconset
```
3. Разместите файл в `build/icon.icns`

### Linux (icon.png)

1. Создайте PNG изображение размером 512x512 пикселей
2. Разместите файл в `build/icon.png`

### Автоматическая генерация иконок

Можно использовать пакет electron-icon-builder:

```bash
npm install --save-dev electron-icon-builder
```

Затем создайте исходное изображение 1024x1024 и запустите:

```bash
npx electron-icon-builder --input=./icon-source.png --output=./build
```

## Структура проекта

После настройки Electron, структура проекта выглядит следующим образом:

```
mario-js/
├── src/                      # Исходный код игры
│   ├── index.js              # Точка входа
│   ├── scenes/               # Игровые сцены
│   └── entities/             # Игровые сущности
├── electron/                 # Electron конфигурация
│   ├── main.js               # Главный процесс Electron
│   └── preload.js            # Preload скрипт
├── build/                    # Иконки приложения
│   ├── icon.ico              # Windows иконка
│   ├── icon.icns             # macOS иконка
│   └── icon.png              # Linux иконка
├── dist/                     # Собранная веб-версия (после npm run build)
├── dist-electron/            # Собранные Electron приложения
├── index.html                # HTML точка входа
├── package.json              # Зависимости и конфигурация
├── vite.config.js            # Vite конфигурация
└── BUILD.md                  # Этот файл
```

## Устранение неполадок

### Ошибка: "Cannot find module 'electron'"

Решение:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Ошибка при сборке: "Cannot create symlinks"

На Windows может потребоваться запуск от имени администратора или включение режима разработчика:
1. Настройки → Обновление и безопасность → Для разработчиков
2. Включите "Режим разработчика"

### Большой размер приложения

Electron приложения включают в себя Node.js и Chromium, поэтому минимальный размер будет около 50-100 МБ. Для уменьшения размера:

1. Используйте `electron-builder` опции для исключения ненужных файлов
2. Убедитесь, что `node_modules` не включаются в сборку (только production зависимости)
3. Используйте сжатие (уже включено в electron-builder)

### Приложение не запускается на Windows 7

Electron 28+ требует Windows 10 или выше. Для поддержки Windows 7:
- Используйте Electron 22 или ниже
- Измените версию в package.json: `"electron": "^22.0.0"`

### Проблемы с иконками

Если иконки не отображаются:
1. Убедитесь, что файлы находятся в папке `build/`
2. Проверьте формат файлов (ICO для Windows, ICNS для macOS, PNG для Linux)
3. Проверьте пути в `package.json` секции `build`

### Ошибка "Application not responding"

Если приложение зависает при запуске:
1. Проверьте консоль DevTools (в режиме разработки)
2. Убедитесь, что файлы dist/ собраны корректно: `npm run build`
3. Проверьте пути в electron/main.js

## Дополнительная информация

### Документация

- [Electron документация](https://www.electronjs.org/docs)
- [electron-builder документация](https://www.electron.build/)
- [Vite документация](https://vitejs.dev/)
- [Phaser документация](https://photonstorm.github.io/phaser3-docs/)

### Автоматическая сборка через GitHub Actions

Для настройки автоматической сборки при каждом релизе, можно использовать GitHub Actions. Пример workflow будет добавлен в будущих обновлениях.

### Публикация

- **Windows**: можно публиковать в Microsoft Store
- **macOS**: можно публиковать в Mac App Store (требуется подпись и нотаризация)
- **Linux**: можно публиковать в Snap Store, Flathub

## Поддержка

Если у вас возникли проблемы со сборкой, пожалуйста, создайте issue в репозитории проекта с подробным описанием проблемы и шагами для воспроизведения.
