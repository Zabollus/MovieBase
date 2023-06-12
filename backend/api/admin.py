from django.contrib import admin
from api.models import Person, Genre, Movie, PersonMovie

# Register your models here.
admin.site.register(Person)
admin.site.register(Genre)
admin.site.register(Movie)
admin.site.register(PersonMovie)
