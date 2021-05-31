import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';

import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {GalleriaModule} from 'primeng/galleria';
import {InplaceModule} from 'primeng/inplace';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KnobModule} from 'primeng/knob';
import {LightboxModule} from 'primeng/lightbox';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from 'primeng/tag';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

import {AppComponent} from './app.component';
import {AppCodeModule} from './app.code.component'
import {AppMainComponent} from './app.main.component';
import {AppConfigComponent} from './app.config.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppRightMenuComponent} from './app.right-menu.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';

import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';
import {MenuService} from './app.menu.service';
import {CustomerService} from './demo/service/customerservice';
import {PhotoService} from './demo/service/photoservice';
import {ProductService} from './demo/service/productservice';
import {IconService} from './demo/service/iconservice';
import {MyModulesComponent} from "./view/admin/myModules/myModules.component";
import {MyModuleListComponent} from "./view/admin/myModules/myModule-list/myModule-list.component";
import {MyModuleEditComponent} from "./view/admin/myModules/myModule-edit/myModule-edit.component";
import {MyModuleViewComponent} from "./view/admin/myModules/myModule-view/myModule-view.component";
import {MyModuleCreateComponent} from "./view/admin/myModules/myModule-create/myModule-create.component";
import { FiliereComponent } from './view/admin/filiere/filiere.component';
import { FiliereListComponent } from './view/admin/filiere/filiere-list/filiere-list.component';
import { FiliereCreateComponent } from './view/admin/filiere/filiere-create/filiere-create.component';
import {ConfirmationService, MessageService} from "primeng/api";
import { MyOptionComponent } from './view/admin/my-option/my-option.component';
import { MyOptionListeComponent } from './view/admin/my-option/my-option-liste/my-option-liste.component';
import { MyOptionCreateComponent } from './view/admin/my-option/my-option-create/my-option-create.component';
import { NoteEtudiantModuleComponent } from './view/coodronnateurModule/note-etudiant-module/note-etudiant-module.component';
import { NoteEtudiantModuleEditComponent } from './view/coodronnateurModule/note-etudiant-module/note-etudiant-module-edit/note-etudiant-module-edit.component';
import { NoteEtudiantRatComponent } from './view/coodronnateurModule/note-etudiant-rat/note-etudiant-rat.component';
import { NoteEtudiantRatEditComponent } from './view/coodronnateurModule/note-etudiant-rat/note-etudiant-rat-edit/note-etudiant-rat-edit.component';
import { InscriptionNouveauEtudiantComponent } from './view/admin/inscription-nouveau-etudiant/inscription-nouveau-etudiant.component';
import { InscriptionNouveauCreateComponent } from './view/admin/inscription-nouveau-etudiant/inscription-nouveau-create/inscription-nouveau-create.component';
import { InscriptionAncienEtudiantComponent } from './view/admin/inscription-ancien-etudiant/inscription-ancien-etudiant.component';
import { InscriptionNouveauEditComponent } from './view/admin/inscription-nouveau-etudiant/inscription-nouveau-edit/inscription-nouveau-edit.component';
import { InscriptionAncienEditComponent } from './view/admin/inscription-ancien-etudiant/inscription-ancien-edit/inscription-ancien-edit.component';
import { ModuleSemestreOptionComponent } from './view/admin/module-semestre-option/module-semestre-option.component';
import { ModuleSemestreOptionCreateComponent } from './view/admin/module-semestre-option/module-semestre-option-create/module-semestre-option-create.component';
import { ModuleSemestreOptionListComponent } from './view/admin/module-semestre-option/module-semestre-option-list/module-semestre-option-list.component';
import {PonderationAffectComponent} from "./view/admin/ponderation/ponderation-affect/ponderation-affect.component";
import {PonderationCreateComponent} from "./view/admin/ponderation/ponderation-create/ponderation-create.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NoteEtudiantSemestreComponent} from "./view/admin/note-etudiant-semestre/note-etudiant-semestre.component";
import {NoteEtudiantSemestreModulesComponent} from "./view/admin/note-etudiant-semestre/note-etudiant-semestre-modules/note-etudiant-semestre-modules.component";
import { EtudiantComponent } from './view/etudiant/etudiant.component';
import { NoteSemestreOneComponent } from './view/etudiant/note-semestre-one/note-semestre-one.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        AppCodeModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        ChipModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TimelineModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppConfigComponent,
        AppRightMenuComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppCrudComponent,
        AppCalendarComponent,
        AppTimelineDemoComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        AppLoginComponent,
        MyModulesComponent,
        MyModulesComponent,
        MyModuleListComponent,
        MyModuleEditComponent,
        MyModuleViewComponent,
        MyModuleCreateComponent,
        FiliereComponent,
        FiliereListComponent,
        FiliereCreateComponent,
        MyOptionComponent,
        MyOptionListeComponent,
        MyOptionCreateComponent,
        NoteEtudiantModuleComponent,
        NoteEtudiantModuleEditComponent,
        NoteEtudiantRatComponent,
        NoteEtudiantRatEditComponent,
        InscriptionNouveauEtudiantComponent,
        InscriptionNouveauCreateComponent,
        InscriptionAncienEtudiantComponent,
        InscriptionNouveauEditComponent,
        InscriptionAncienEditComponent,
        ModuleSemestreOptionComponent,
        ModuleSemestreOptionCreateComponent,
        ModuleSemestreOptionListComponent,
        PonderationAffectComponent,
        PonderationCreateComponent,
        NoteEtudiantSemestreComponent,
        NoteEtudiantSemestreModulesComponent,
        EtudiantComponent,
        NoteSemestreOneComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MenuService,ConfirmationService,MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
