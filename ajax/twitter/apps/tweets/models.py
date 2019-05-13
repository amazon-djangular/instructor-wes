from django.db import models
from ..users.models import User

# Create your models here.
class TweetManager(models.Manager):
    def validate(self, form):
        errors = []
        if len(form['content']) < 1:
            errors.append('Tweet cannot be empty!')
        if len(form['content']) > 255:
            errors.append('Tweet cannot exceed 255 characters!')
        return errors

    def easy_create(self, form, user_id):
        user = User.objects.get(id=user_id)
        Tweet.objects.create(
            content=form['content'],
            creator=user
        )

    def add_like(self, tweet_id, user_id):
        user = User.objects.get(id=user_id)
        tweet = Tweet.objects.get(id=tweet_id)
        tweet.liked_users.add(user)

    def remove_like(self, tweet_id, user_id):
        user = User.objects.get(id=user_id)
        tweet = Tweet.objects.get(id=tweet_id)
        tweet.liked_users.remove(user)

class Tweet(models.Model):
    content = models.CharField(max_length=255)
    creator = models.ForeignKey(User, related_name="created_tweets")
    liked_users = models.ManyToManyField(User, related_name="liked_tweets")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = TweetManager()