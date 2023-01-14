npx next build
npx next export
rm -rf docs
mv out docs
touch docs/.nojekyll
git add docs
git commit -m "pages"
git push origin main:pages --force
git reset --hard HEAD~1