Set-Location ./dist

$deployTime = (Get-Date).ToString()

git add *
git commit -m "Deployment " + $deployTime
git push origin master

Set-Location ../
"Deployment success at $deployTime."