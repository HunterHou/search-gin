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
echo 'cd ./app'
cd ./app
echo 'rm -rf vuehome'
rm -rf vuehome
echo 'mkdir -p vuehome/dist'
mkdir -p vuehome/dist
echo 'cd ..'
cd ..
echo 'cd vuehome'
cd vuehome
if [ $levelKey -ge 1 ]; then

    echo 开始打包前端文件
    echo 'npm run generate'
    npm run generate
    echo 打包完成，开始移动到app目录
    echo 'cp -R dist ../app/vuehome'
    cp -R dist ../app/vuehome
fi
cd ..
if [ $levelKey -ge 2 ]; then
    echo 移动完成，打包APP
    echo 'go build -o app/appVue.exe -ldflags "-H=windowsgui" '
    go build -o app/appVue.exe -ldflags "-H=windowsgui"
    echo 移动配置文件 '*.*(1)'
    echo 'cp dirList.ini app/dirList.ini(1)'
    echo 'cp setting.json app/setting.json(1)'
    cp dirList.ini 'app/dirList.ini(1)'
    cp setting.json 'app/setting.json(1)'
    echo APP打包完成！！！
fi
if [ $levelKey -ge 3 ]; then
    echo 移动源到 Election代码目录
    echo 'cp -R app election/src'
    cp -R app election/src

fi
echo 'SUCCESS,OVER !!!'
