import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './components/app/app.component';
import { BookProfileComponent } from "./components/bookProfile/bookProfile.component";
import { BooksComponent } from './components/books/books.component';
import { CharacterComponent } from "./components/characters/characters.component";
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { SeriesComponent } from "./components/series/series.component";
import { SeriesProfileComponent } from "./components/seriesProfile/seriesProfile.component";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        AboutComponent,
        BooksComponent,
        CharacterComponent,
        SeriesComponent,
        BookProfileComponent,
        SeriesProfileComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'about', pathMatch: 'full' },
            { path: 'about', component: AboutComponent },
            { path: 'books', component: BooksComponent },
            { path: 'characters', component: CharacterComponent },
            { path: 'series', component: SeriesComponent },
            { path: 'bookProfile/:id' , component: BookProfileComponent },
            { path: 'seriesProfile/:id', component: SeriesProfileComponent },
            { path: '**', redirectTo: 'about' }
        ])
    ]
})
export class AppModuleShared {
}
