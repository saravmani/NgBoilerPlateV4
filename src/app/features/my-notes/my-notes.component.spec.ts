import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyNotesComponent } from './my-notes.component';

describe('MyNotesComponent', () => {
  let component: MyNotesComponent;
  let fixture: ComponentFixture<MyNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default notes', () => {
    expect(component.notes.length).toBeGreaterThan(0);
  });

  it('should filter notes by category', () => {
    component.onCategoryChange('Finance');
    expect(component.filteredNotes.every(note => note.category === 'Finance')).toBeTruthy();
  });

  it('should toggle note importance', () => {
    const note = component.notes[0];
    const initialImportance = note.isImportant;
    component.toggleImportant(note.id);
    expect(note.isImportant).toBe(!initialImportance);
  });
});
