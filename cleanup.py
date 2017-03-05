import os, os.path, shutil
preserved_files = [ "CNAME","README.md"]
preserved_folders = [".git",".vscode"]

directory = ".\\dist"

for name in os.listdir(directory):
    if os.path.isfile(os.path.join(directory,name)):
        if not name in preserved_files:
            print("Removing file "+name)
            os.remove(os.path.join(directory,name))
    if os.path.isdir(os.path.join(directory,name)):
        if not name in preserved_folders:
            print("Removing folder "+name)
            shutil.rmtree(os.path.join(directory,name))


