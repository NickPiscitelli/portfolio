npx next build
npx next export
rm -rf docs
mv out docs
touch docs/.nojekyll
