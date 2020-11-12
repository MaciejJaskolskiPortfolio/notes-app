
import { TestBed } from '@angular/core/testing';
import { Notes } from 'src/app/data/notes.data';
import { Note } from 'src/app/models/note.model';

import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(NotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all notes', () => {
    const notes = service.getNotes();
    expect(notes).toEqual(Notes);
  });

  it('should increase \'id\' on adding note', () => {
    expect(service['id']).toBe(2);
    service.addNote(new Note());
    expect(service['id']).toBe(3);
  });

  it('should add new note on addNote()', () => {
    expect(service.getNotes().length).toBe(2);
    service.addNote(mockNote);
    expect(service.getNotes().length).toBe(3);
    expect(service.getNotes()[2]).toEqual(mockNote);
  });

  it('should remove note on removeNote()', () => {
    expect(service.getNotes().length).toBe(2);
    service.removeNote({...mockNote, id: 0});
    expect(service.getNotes().length).toBe(1);
    expect(service.getNotes()[0].id).toBe(1);
  });

  it('should change edited note', () => {
    service.editNote(mockNote);
    service.editedNote.subscribe(n => {
      expect(n).toEqual(mockNote);
    });
  });

  it('should patch note', () => {
    expect(service.getNotes()[0]).toEqual(Notes[0]);
    service.patchNote({ ...mockNote, id: 0, title: 'abc' });
    expect(service.getNotes()[0]).toEqual({ ...mockNote, id: 0, title: 'abc' });
  });
});


const mockNote: Note = {
  id: 2,
  title: 'title',
  color: '#000000',
  description: 'desc',
  icon: 'icon',
  date: new Date(2020, 11, 10)
};
