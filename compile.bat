@echo off
D:
cd "D:\Web\Mastors CDN\Main"
node_modules\.bin\sass.cmd src/scss/mastorscdn.scss dist/css/mastorscdn.css --style=compressed --no-source-map
echo Exit: %errorlevel%
