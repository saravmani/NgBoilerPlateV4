import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../../services/chat.service';
import { Subscription } from 'rxjs';

export interface DefaultChatOption {
  id: string;
  text: string;
  icon: string;
  category: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  isOpen = false;
  isMinimized = false;
  newMessage = '';
  messages: ChatMessage[] = [];
  isTyping = false;
  showDefaultOptions = true;
  
  defaultOptions: DefaultChatOption[] = [
    {
      id: 'portfolio-help',
      text: 'Portfolio help',
      icon: 'fas fa-chart-pie',
      category: 'Portfolio'
    },
    {
      id: 'stock-analysis',
      text: 'Stock analysis',
      icon: 'fas fa-chart-line',
      category: 'Stocks'
    },
    {
      id: 'mutual-funds',
      text: 'Mutual funds',
      icon: 'fas fa-coins',
      category: 'Funds'
    },
    {
      id: 'market-trends',
      text: 'Market trends',
      icon: 'fas fa-trending-up',
      category: 'Market'
    },
    {
      id: 'risk-assessment',
      text: 'Risk help',
      icon: 'fas fa-shield-alt',
      category: 'Risk'
    },
    {
      id: 'tax-planning',
      text: 'Tax planning',
      icon: 'fas fa-calculator',
      category: 'Tax'
    }
  ];
  
  private subscriptions: Subscription = new Subscription();

  constructor(private chatService: ChatService) {}
  ngOnInit(): void {
    this.subscriptions.add(
      this.chatService.messages$.subscribe(messages => {
        this.messages = messages;
        // Show options after AI responds or initially
        this.updateOptionsVisibility();
      })
    );

    this.subscriptions.add(
      this.chatService.isTyping$.subscribe(isTyping => {
        this.isTyping = isTyping;
        // Show options again after AI finishes typing
        if (!isTyping && this.messages.length > 1) {
          setTimeout(() => {
            this.showDefaultOptions = true;
          }, 500);
        }
      })
    );
  }

  private updateOptionsVisibility(): void {
    // Show options initially or when explicitly set
    if (this.messages.length <= 1) {
      this.showDefaultOptions = true;
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleChat(): void {
    if (this.isMinimized) {
      this.isMinimized = false;
    } else {
      this.isOpen = !this.isOpen;
    }
  }

  minimizeChat(): void {
    this.isMinimized = true;
  }

  closeChat(): void {
    this.isOpen = false;
    this.isMinimized = false;
  }
  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.showDefaultOptions = false; // Hide options when user sends message
      this.chatService.sendMessage(this.newMessage.trim()).subscribe();
      this.newMessage = '';
    }
  }

  sendDefaultOption(option: DefaultChatOption): void {
    this.showDefaultOptions = false; // Hide options when option is selected
    this.chatService.sendMessage(option.text).subscribe();
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
  clearChat(): void {
    this.showDefaultOptions = true; // Show options when chat is cleared
    this.chatService.clearChat();
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      try {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Error scrolling to bottom:', err);
      }
    }
  }
}
