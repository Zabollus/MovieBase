from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Person(models.Model):
    first_name = models.CharField(max_length=32, verbose_name='Imię')
    last_name = models.CharField(max_length=32, verbose_name='Nazwisko')

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Genre(models.Model):
    name = models.CharField(max_length=32, verbose_name='Nazwa')

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=128, verbose_name="Tytuł")
    director = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='movies_director', verbose_name='Reżyser')
    screenplay = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='movies_written', verbose_name='Scenarzysta')
    starring = models.ManyToManyField(Person, through="PersonMovie", verbose_name='Obsada')
    year = models.IntegerField(verbose_name='Rok')
    rating = models.DecimalField(max_digits=3, decimal_places=1, verbose_name='Ocena')
    genre = models.ManyToManyField(Genre, verbose_name='Gatunek')
    description = models.TextField()
    
    def __str__(self):
        return self.title


class PersonMovie(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    role = models.CharField(max_length=128, null=True)

    def __str__(self):
        return f'{self.person.first_name} {self.person.last_name} jako {self.role} w {self.movie.title}'


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    watch_list = models.ManyToManyField(Movie)

    def __str__(self):
        return f'Profil {self.user.username}'
