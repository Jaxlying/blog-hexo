echo 'generate'
hexo g
echo 'delete'
rm -rf ../lylllcc.github.io/*
echo 'copy'
cp -a ./public/* ../lylllcc.github.io/
echo 'copy project'
cp -a ./project/ ../lylllcc.github.io/project/

echo 'deploy'
cd ../lylllcc.github.io


git add .
git commit -m "$*"
echo 'push'
git push
