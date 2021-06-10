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
import {NoteEtudiantSemestreComponent} from "./view/admin/note-etudiant-semestre/note-etudiant-semestre.component";
import {PonderationAffectComponent} from "./view/admin/ponderation/ponderation-affect/ponderation-affect.component";
import {EtudiantComponent} from "./view/etudiant/etudiant.component";
import {AbsenceEditComponent} from "./view/professeur/absence-edit/absence-edit.component";
import {AbsenceEtudiantComponent} from "./view/etudiant/absence-etudiant/absence-etudiant.component";
import {TestpdfComponent} from "./view/testpdf/testpdf.component";
import {NoteSemestreOneComponent} from "./view/etudiant/note-semestre-one/note-semestre-one.component";
import {ImageUploadComponent} from "./view/test/image-upload/image-upload.component";
import {ConsultationAbsencesComponent} from "./view/admin/consultation-absences/consultation-absences.component";
import {LoginComponent} from "./view/login/login.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    //{path: '', component: tandiroh },
                    {path: 'view/myModule', component: MyModulesComponent},
                    {path: 'view/filiere', component: FiliereComponent},
                    {path: 'view/noteEtudiantModule', component: NoteEtudiantModuleComponent},
                    {path: 'view/noteEtudiantModuleRat', component: NoteEtudiantRatComponent},
                    {path: 'view/inscriptionNouveauEtudiant', component: InscriptionNouveauEtudiantComponent},
                    {path: 'view/inscriptionAncienEtudiant', component: InscriptionAncienEtudiantComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'view/note-etudiant-semestre', component: NoteEtudiantSemestreComponent},
                    {path: 'view/ponderation', component: PonderationAffectComponent},
                    {path: 'view/etudiant', component: EtudiantComponent},
                    {path: 'view/absence', component: AbsenceEditComponent},
                    {path: 'view/absenceEtudiant', component: AbsenceEtudiantComponent},
                    {path: 'view/test', component: TestpdfComponent},
                    {path: 'view/imageUpload', component: ImageUploadComponent},
                    {path: 'view/consultation', component: ConsultationAbsencesComponent},
                    {path: 'view/login', component: LoginComponent},
                    {path: 'view/note-semestre-one', component: NoteSemestreOneComponent},
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
