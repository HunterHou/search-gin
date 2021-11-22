cd ./app  
rm -rf vuehome 
mkdir -p vuehome/dist 
cd .. 
cd vuehome 
echo 开始打包前端文件 
npm run generate 
echo 打包完成，开始移动到app目录 
cp -R dist  ../app/vuehome 
cd .. 
echo 移动完成，打包APP 
go build -o app/appVue.exe -ldflags "-H=windowsgui" 
echo 移动配置文件 目标名称 '*(1)' 
cp dirList.ini 'app/dirList.ini(1)' 
echo APP打包完成！！！ 
cp -R app election/src
