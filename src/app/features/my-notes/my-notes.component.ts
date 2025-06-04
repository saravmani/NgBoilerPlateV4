import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  createdDate: Date;
  isImportant: boolean;
}

@Component({
  selector: 'app-my-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent {
  notes: Note[] = [
    {
      id: 1,
      title: 'Investment Strategy 2025',
      content: 'Focus on diversified portfolio with 60% equity, 30% bonds, and 10% commodities. Review quarterly and rebalance as needed.',
      category: 'Finance',
      createdDate: new Date('2025-01-15'),
      isImportant: true
    },
    {
      id: 2,
      title: 'Market Research Notes',
      content: 'Key trends to watch: AI adoption in finance, renewable energy growth, emerging market opportunities in Asia.',
      category: 'Research',
      createdDate: new Date('2025-02-10'),
      isImportant: false
    },
    {
      id: 3,
      title: 'Risk Management Guidelines',
      content: 'Never invest more than 5% in a single stock. Set stop-loss at 15%. Always maintain 6 months emergency fund.',
      category: 'Risk Management',
      createdDate: new Date('2025-03-01'),
      isImportant: true
    },
    {
      id: 4,
      title: 'Weekly Review Checklist',
      content: '1. Review portfolio performance\n2. Check news for held stocks\n3. Update expense tracking\n4. Review upcoming earnings',
      category: 'Planning',
      createdDate: new Date('2025-05-20'),
      isImportant: false
    },
    {
      id: 5,
      title: 'Tax Planning 2025',
      content: 'Max out 401k contributions, consider Roth IRA conversion, harvest tax losses in December, review HSA strategy.',
      category: 'Tax Planning',
      createdDate: new Date('2025-04-12'),
      isImportant: true
    }
  ];

  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Finance', 'Research', 'Risk Management', 'Planning', 'Tax Planning'];

  get filteredNotes(): Note[] {
    if (this.selectedCategory === 'All') {
      return this.notes;
    }
    return this.notes.filter(note => note.category === this.selectedCategory);
  }

  get importantNotes(): Note[] {
    return this.notes.filter(note => note.isImportant);
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
  }

  toggleImportant(noteId: number): void {
    const note = this.notes.find(n => n.id === noteId);
    if (note) {
      note.isImportant = !note.isImportant;
    }
  }
}
