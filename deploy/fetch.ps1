Param(
  [string]$PAT,
  [string]$user,
  [string]$repo,
  [string]$email,
  [string]$name
)

$repoUrl="https://${PAT}:x-oauth-basic@github.com/${user}/${repo}.git"

git config --global user.email $email
git config --global user.name $name

git clone $repoUrl dist

