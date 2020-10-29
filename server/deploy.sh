echo starting deplyment ....

echo navigagting to the toplevel of the working tree....

cd ..

echo DONE ✅ 

echo remoting the server folder to heroku server app...

heroku git:remote -a discuss-mania

echo DONE ✅                 

echo push and deply the server app...

git push --force heroku `git subtree split --prefix server HEAD`:master