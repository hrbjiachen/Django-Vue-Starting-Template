
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from vuenote.serializers import NoteSerializer
from vuenote.models import Note


class NoteViewSet(viewsets.ModelViewSet):
    # check permissions
    permission_classes = (
        permissions.IsAuthenticated,
    )

    serializer_class = NoteSerializer

    def get_queryset(self):
        return self.request.user.notes.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    lookup_field = 'id'


"""


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = 'id'
"""
