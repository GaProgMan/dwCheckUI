import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { BooksComponent } from './components/books/books.component';
import { CharacterComponent } from './components/characters/characters.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CharacterComponent,
        BooksComponent,
        AboutComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'books', pathMatch: 'full' },
            { path: 'books', component: BooksComponent },
            { path: 'characters', component: CharacterComponent },
            { path: 'about', component: AboutComponent },
            { path: '**', redirectTo: 'about' }
        ])
    ]
})
export class AppModule {
}
