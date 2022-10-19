from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from models import Movie, Person, Genre
from serializers import MovieSerializer, PersonSerializer, GenreSerializer

# Create your views here.
class MovieView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
