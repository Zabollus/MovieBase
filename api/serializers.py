from rest_framework import serializers
from api.models import Person, Genre, Movie, PersonMovie


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'first_name', 'last_name']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']


class PersonMovieSerializer(serializers.ModelSerializer):
    person = PersonSerializer()

    class Meta:
        model = PersonMovie
        fields = ['person', 'movie', 'role']


class MovieSerializer(serializers.ModelSerializer):
    starring = PersonMovieSerializer(source='personmovie_set', many=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'director', 'screenplay', 'starring', 'year', 'rating', 'genre', 'description']
        depth = 1
