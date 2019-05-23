# Django Setup
Due to the differences in how requests will be handled when using Angular, we'll have to set up our Django project in a slightly different way than originally stated on the learn platform. You can find differences between Django 1.10 and 2.2 elsewhere in this folder.

### Install and configure Django with django-cors-headers.
CORS is a security feature that prevents malicious actors from accessing and modifying our data if they are trying to gain access to our API from an untrusted source. In any stack, CORS has to be configured to allow for requests from specific hosts. This can be as broad or narrow as the project dictates, but by default, Django will only allow requests from the same port it is running on. Because we're running Angular as a separate "microservice", we will not be able to use Django's default settings. To override those settings and allow Angular to make requests from a different port, we're using a package called `django-cors-headers`. Conveniently, installing this package will also install a fresh version of django. The steps to get a project up and running with django-cors-headers are as follows:

  1. Create a new virtual environment for your project.
  2. Use pip to install django-cors-headers: `pip install django-cors-headers`. This will install Django for you.
  3. Modify settings.py.
```python
# add the corsheaders app to INSTALLED_APPS
INSTALLED_APPS = [
  ...
  'corsheaders',
  ...
]

# Add CorsMiddleware to MIDDLEWARE before CommonMiddleware
MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]

# Create a new list called CORS_ORIGIN_WHITELIST and add your Angular host address (localhost:4200 by default)
CORS_ORIGIN_WHITELIST = [
    "http://localhost:4200",
    "http://127.0.0.1:4200"
]
```

That's it! You should be able to accept HTTP requests from your Angular app!