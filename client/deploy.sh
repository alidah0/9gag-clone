echo starting deplyment .... 

echo navigagting to the toplevel of the working tree....

cd ..

echo DONE ✅ 

echo remoting the client folder to heroku app...

heroku git:remote -a gags-clone

echo DONE ✅                 

echo push and deply the client app...

git push --force heroku `git subtree split --prefix client HEAD`:master
