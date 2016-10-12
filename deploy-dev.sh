echo "checkout dev"
git checkout master
echo "generate"
hexo g
echo "commit"
cd public
git add .
git commit
echo "push"
git push