import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {MyModulesComponent} from "./view/admin/myModules/myModules.component";
import {FiliereComponent} from "./view/admin/filiere/filiere.component";
import {FiliereListComponent} from "./view/admin/filiere/filiere-list/filiere-list.component";
import {NoteEtudiantModule} from "./controller/model/note-etudiant-module.model";
import {NoteEtudiantModuleComponent} from "./view/coodronnateurModule/note-etudiant-module/note-etudiant-module.component";
import {NoteEtudiantRatComponent} from "./view/coodronnateurModule/note-etudiant-rat/note-etudiant-rat.component";
import {InscriptionNouveauEtudiantComponent} from "./view/admin/inscription-nouveau-etudiant/inscription-nouveau-etudiant.component";
import {InscriptionAncienEtudiantComponent} from "./view/admin/inscription-ancien-etudiant/inscription-ancien-etudiant.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    //{path: '', component: tandiroh },
                    {path: 'view/myModule', component: MyModulesComponent},
                    {path: 'view/filiere', component: FiliereListComponent},
                    {path: 'view/noteEtudiantModule', component: NoteEtudiantModuleComponent},
                    {path: 'view/noteEtudiantModuleRat', component: NoteEtudiantRatComponent},
                    {path: 'view/inscriptionNouveauEtudiant', component: InscriptionNouveauEtudiantComponent},
                    {path: 'view/inscriptionAncienEtudiant', component: InscriptionAncienEtudiantComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},

                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'accessdenied', component: AppAccessdeniedComponent},
            {path: '404', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/404'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
