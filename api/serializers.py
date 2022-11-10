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


class PersonMovieIdSerializer(serializers.Serializer):
    person = serializers.PrimaryKeyRelatedField(queryset=Person.objects.all(), write_only=True)
    role = serializers.CharField(max_length=128)


class MovieSerializer(serializers.ModelSerializer):
    genre = GenreSerializer(read_only=True, many=True)
    genre_id = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all(), write_only=True, many=True)
    director = PersonSerializer(read_only=True)
    director_id = serializers.PrimaryKeyRelatedField(queryset=Person.objects.all(), write_only=True)
    screenplay = PersonSerializer(read_only=True)
    screenplay_id = serializers.PrimaryKeyRelatedField(queryset=Person.objects.all(), write_only=True)
    starring = PersonMovieSerializer(source='personmovie_set', many=True, read_only=True)
    starring_id = PersonMovieIdSerializer(many=True, write_only=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'director', 'director_id', 'screenplay', 'screenplay_id', 'starring', 'starring_id',
                  'year', 'rating', 'genre', 'genre_id', 'description']
        depth = 1

    def create(self, validated_data):
        genres = validated_data.pop('genre_id')
        director = validated_data.pop('director_id')
        screenplay = validated_data.pop('screenplay_id')
        starring = validated_data.pop('starring_id')
        movie = Movie.objects.create(**validated_data, director=director, screenplay=screenplay)
        movie.genre.set(genres)
        for star in starring:
            PersonMovie.objects.create(person=star['person'], movie=movie, role=star['role'])
        return movie

