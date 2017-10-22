import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { AboutComponent } from './components/about/about.component';
import { BooksComponent } from './components/books/books.component';
import { CharacterComponent} from "./components/characters/characters.component";
import { SeriesComponent } from "./components/series/series.component";
import { BookProfileComponent } from "./components/bookProfile/bookProfile.component";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        AboutComponent,
        BooksComponent,
        CharacterComponent,
        SeriesComponent,
        BookProfileComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'about', pathMatch: 'full' },
            { path: 'about', component: AboutComponent },
            { path: 'books', component: BooksComponent },
            { path: 'characters', component: CharacterComponent },
            { path: 'series', component: SeriesComponent },
            { path: 'bookProfile/:id' , component: BookProfileComponent },
            { path: '**', redirectTo: 'about' }
        ])
    ]
})
export class AppModuleShared {
}
