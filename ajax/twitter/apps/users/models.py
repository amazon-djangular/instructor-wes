from django.db import models
import re
import bcrypt

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

# Create your models here.
class UserManager(models.Manager):
    def validate(self, form):
        errors = []
        if len(form['first_name']) < 2:
            errors.append("First name must be at least 2 characters long")
        if len(form['last_name']) < 2:
            errors.append("Last name must be at least 2 characters long")

        if User.objects.filter(email=form['email']):
            errors.append('Email must be unique')

        if not EMAIL_REGEX.match(form['email']):
            errors.append("Email must be valid")
        if len(form['password']) < 8:
            errors.append("Password must be at least 8 characters long")
        return errors

    def easy_create(self, form):
        pw_hash = bcrypt.hashpw(form['password'].encode(), bcrypt.gensalt())
        return User.objects.create(
            first_name=form['first_name'],
            last_name=form['last_name'],
            email=form['email'],
            pw_hash=pw_hash,
        )

    def login(self, form):
        matching_users = User.objects.filter(email=form['email'])
        if matching_users:
            user = matching_users[0]
            if bcrypt.checkpw(form['password'].encode(), user.pw_hash.encode()):
                return (True, user)
        return (False, "Email or password invalid")

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    pw_hash = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()