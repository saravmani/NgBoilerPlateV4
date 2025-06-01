import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay } from 'rxjs';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages = new BehaviorSubject<ChatMessage[]>([]);
  private isTyping = new BehaviorSubject<boolean>(false);

  messages$ = this.messages.asObservable();
  isTyping$ = this.isTyping.asObservable();

  constructor() {
    // Add initial welcome message
    const welcomeMessage: ChatMessage = {
      id: this.generateId(),
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    };
    this.messages.next([welcomeMessage]);
  }

  sendMessage(text: string): Observable<void> {
    // Add user message
    const userMessage: ChatMessage = {
      id: this.generateId(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    const currentMessages = this.messages.value;
    this.messages.next([...currentMessages, userMessage]);

    // Show typing indicator
    this.isTyping.next(true);

    // Mock AI response with delay
    return this.mockAIResponse(text).pipe(
      delay(1000 + Math.random() * 2000) // Random delay between 1-3 seconds
    );
  }

  private mockAIResponse(userText: string): Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        const responses = this.getResponseBasedOnInput(userText);
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const aiMessage: ChatMessage = {
          id: this.generateId(),
          text: randomResponse,
          isUser: false,
          timestamp: new Date()
        };

        const currentMessages = this.messages.value;
        this.messages.next([...currentMessages, aiMessage]);
        this.isTyping.next(false);
        
        observer.next();
        observer.complete();
      }, 1000 + Math.random() * 2000);
    });
  }

  private getResponseBasedOnInput(input: string): string[] {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return [
        "Hello! Nice to meet you. How can I assist you today?",
        "Hi there! What can I help you with?",
        "Hello! I'm here to help. What would you like to know?"
      ];
    }
    
    if (lowerInput.includes('help')) {
      return [
        "I'm here to help! You can ask me about stocks, mutual funds, or any general questions.",
        "I can assist you with portfolio management, investment advice, or general queries. What do you need help with?",
        "Happy to help! What specific topic would you like assistance with?"
      ];
    }
    
    if (lowerInput.includes('stock') || lowerInput.includes('stocks')) {
      return [
        "I can help you with stock information! Are you looking for specific stock analysis or general market trends?",
        "Stocks are a great investment option. Would you like to know about any particular stock or market sector?",
        "I'd be happy to discuss stocks with you. What specific information are you looking for?"
      ];
    }
    
    if (lowerInput.includes('mutual fund') || lowerInput.includes('funds')) {
      return [
        "Mutual funds are excellent for diversified investing. Are you interested in any specific type of fund?",
        "I can provide information about mutual funds. What would you like to know - fund types, performance, or recommendations?",
        "Mutual funds offer great diversification. Would you like suggestions based on your investment goals?"
      ];
    }
    
    if (lowerInput.includes('thank')) {
      return [
        "You're welcome! Is there anything else I can help you with?",
        "Happy to help! Feel free to ask if you have more questions.",
        "My pleasure! Let me know if you need anything else."
      ];
    }
    
    // Default responses
    return [
      "That's an interesting question! Could you provide more details so I can help you better?",
      "I understand. Can you tell me more about what you're looking for?",
      "Great question! I'd be happy to help. Could you elaborate a bit more?",
      "I'm here to assist you. Can you provide more context about your query?",
      "Thanks for asking! Could you give me more details so I can provide a better response?"
    ];
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  clearChat(): void {
    const welcomeMessage: ChatMessage = {
      id: this.generateId(),
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    };
    this.messages.next([welcomeMessage]);
  }
}
