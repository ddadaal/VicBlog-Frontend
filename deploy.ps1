Param(
  [string]$PAT,
  [string]$user,
  [string]$repo,
  [string]$CNAME,
  [string]$email,
  [string]$name
)

$repo_url="https://${PAT}:x-oauth-basic@github.com/${user}/${repo}.git"

Set-Location ./dist

$CNAME | Out-File -encoding ASCII ./CNAME

git init
git config user.email $email
git config user.name $name
git remote add origin $repo_url
git add *
git commit -m "update"
git push origin master -f

Set-Location ../
"Successfully deployed to ${user}/${repo}"