Param(
  [string]$PAT,
  [string]$user,
  [string]$repo,
  [string]$email,
  [string]$name,
  [string]$CNAME
)

$repoUrl="https://${PAT}:x-oauth-basic@github.com/${user}/${repo}.git"

Set-Location ./dist

$CNAME | Out-File -encoding ASCII ./CNAME

git init
git config user.email $email
git config user.name $name
git remote add origin $repoUrl
git add *
git commit -m "Deployment"
git push origin master -f

Set-Location ../
"Deployment successful."