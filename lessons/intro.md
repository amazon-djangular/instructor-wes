# Introduction

There are a few things that aren't on the platform that we'll need to have covered for our Django + Angular exam. You can find all the resources here, and use them as a supplement to the lecture videos and the rest of the learn platform content.

The primary thing we have to keep in mind is that we've opted for a project structure in this cohort that is more similar to a real-world example of how a project would be architected. So while the platform will reference a MEAN project where Angular is actually served from within the MEAN application as a whole, that structure is not common in the real world. The implications of this mean that we have a very clear distinction between the responsibilities of Django and Angular.

Django's job is to store data in a database and send that data to a web client in json format upon request.

Angular's job is to act as the user interface and make requests on the user's behalf to the Django server.

Within this folder you will find sub-folders that will provide organization for content, further modularized into files whose names should be self-explanatory. If you would like to suggest an amendment to any of the content found in this section, please reach out to Wes directly.