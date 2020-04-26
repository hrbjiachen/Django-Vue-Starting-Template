
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from vuenote.serializers import NoteSerializer
from vuenote.models import Note

# Create your views here.


class NoteViewSet(viewsets.ModelViewSet):
    # check permissions
    permission_classes = (
        permissions.AllowAny,
    )
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = 'id'
