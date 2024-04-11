rm -rf Migrations
dotnet ef migrations add Create
dotnet ef database update

git add .
git commit -m ":bug:"
git push
