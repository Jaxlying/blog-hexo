echo "generate"
hexo g
echo "commit"
cd public
git add .
git commit