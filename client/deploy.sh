echo starting deplyment ....    

echo remoting the client folder to heroku app...

heroku git:remote -a gags-clone

echo DONE ✅                 

echo push and deply the client app...

git push --force heroku `git subtree split --prefix client HEAD`:master
