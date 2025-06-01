import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { ChatComponent } from './features/chat/chat.component';
ModuleRegistry.registerModules([ AllCommunityModule ]);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NgBoilerPlateV4';
}


    
    