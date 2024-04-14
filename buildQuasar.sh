#!/bin/bash
levelKey=${1}
printf '执行参数：levelKey[{%s}] \n' "$levelKey"
levelValue=''
if [ ! "$levelKey" ]; then
    levelKey=2
    levelValue='vueGo'
elif [ $levelKey == 0 ]; then
    levelKey=0
    levelValue='none'
elif [ $levelKey == 1 ]; then
    levelValue='vue'
elif [ $levelKey == 2 ]; then
    levelValue='vueGo'
fi
printf '执行级别：levelKey[{%s}]--levelValue[{%s}] \n' $levelKey $levelValue
echo 'cd ./qapp'
cd ./qapp
echo 'rm -rf dist'
rm -rf dist
# echo 'mkdir -p dist'
# mkdir -p dist
echo 'cd ..'
cd ..

if [ $levelKey == 1 ] || [  $levelKey == 2 ] || [ $levelKey == 3 ] || [ $levelKey == 4 ]; then
    echo 'cd electron_quasar'
    cd electron_quasar
    echo 开始打包前端文件
    echo 'yarn build'
    yarn build
    echo '打包完成，开始移动到app目录'
    echo 'cp -R dist/spa ../qapp/dist'
    # cp -R dist/spa ../qapp/dist
    # mv dist/spa ../qapp
    cp -R dist/spa ../qapp/dist
fi
cd ..
if [ $levelKey == 2 ] || [ $levelKey == 4 ]; then
    echo '移动完成，打包APP'
    cd gosrc
    go build -o ../qapp/appQuaser.exe -ldflags "-H=windowsgui" -tags=prod
    # go build -o ../qapp/appQuaser.exe  -tags=prod
    echo 移动配置文件 '*.*(1)'
    echo 'cp setting.json ../qapp/setting.json(1)'
    cp setting.json '../qapp/setting.json(1)'
    echo 'cp ffmpeg.exe ../qapp/ffmpeg.exe'
    cp ffmpeg.exe '../qapp/ffmpeg.exe'
    cd ..
    echo 'APP打包完成！！！'
fi

if [  $levelKey == 1 ] || [ $levelKey == 3 ] || [ $levelKey == 4 ]; then

    echo 移动源到 Election代码目录
    echo 'cp -R qapp electron_quasar/src-electron/icons'
    cp -R qapp electron_quasar/src-electron/icons
    echo 'cd electron_quasar'
    cd electron_quasar
    yarn topc
    echo 'Electron Package OVER'
#TODO
fi
echo 'SUCCESS,OVER !!!'
