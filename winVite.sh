#!/bin/bash
levelKey=${1}
printf '执行参数：levelKey[{%s}] \n' "$levelKey"
levelValue=''
if [ ! "$levelKey" ]; then
    levelKey=2
    levelValue='vueGo'
elif [ $levelKey -eq 0 ]; then
    levelKey=0
    levelValue='none'
elif [ $levelKey -eq 1 ]; then
    levelValue='vue'
elif [ $levelKey -eq 2 ]; then
    levelValue='vueGo'
elif [ $levelKey -eq 3 ]; then
    levelValue='vueGoElection'
fi
printf '执行级别：levelKey[{%s}]--levelValue[{%s}] \n' $levelKey $levelValue
echo 'cd ./viteApp'
cd ./viteApp
echo 'rm -rf dist'
rm -rf dist
echo 'mkdir -p dist'
mkdir -p dist
echo 'cd ..'
cd ..
echo 'cd vitehome'
cd vitehome
if [ $levelKey -ge 1 ]; then

    echo 开始打包前端文件
    echo 'yarn build'
    yarn build
    echo '打包完成，开始移动到app目录'
    echo 'cp -R dist ../viteApp/dist'
    cp -R dist ../viteApp/
fi
cd ..
cd gosrc
if [ $levelKey -ge 2 ]; then
    echo '移动完成，打包APP'
    go build -o ../viteApp/appVite.exe -ldflags "-H=windowsgui" -tags=prod
    
    echo 移动配置文件 '*.*(1)'
    echo 'cp setting.json ../viteApp/setting.json(1)'
    cp setting.json '../viteApp/setting.json(1)'

    echo 'cp ffmpeg.exe ../viteApp/ffmpeg.exe'
    cp ffmpeg.exe '../viteApp/ffmpeg.exe'

    echo 'APP打包完成！！！'
fi
if [ $levelKey -ge 3 ]; then
    echo 移动源到 Election代码目录
    echo 'cp -R viteApp election/src'
    cp -R viteApp election/src
#TODO Electron 打包系统
fi
echo 'SUCCESS,OVER !!!'
