# Handy pip and Django Command Reference

##### pip
- `pip freeze > requirements.txt`
  - This takes all the packages installed on your venv and enumerates them in a .txt file called `requirements.txt`. Careful, this will create a new file wherever your present working directory is, so make sure your terminal is navigated to the right location.
- `pip install -r requirements.txt`
  - This will install all packages from the requirements.txt file onto your currently active venv. Your present working directory needs to have direct access to the requirements.txt file. In other words, when you use `ls` or `dir`, you should see requirements.txt listed before you run this command.

##### Django
- `python manage.py shell`
  - Enter the django shell. Don't forget to import your models!