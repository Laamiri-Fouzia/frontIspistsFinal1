import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    animations: [
        trigger('inline', [
            state('hidden', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*',
            })),
            state('hiddenAnimated', style({
                height: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent, public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Accueil', icon: 'pi pi-fw pi-home',
                items: [
                    {label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['/']}
                ]
            },
            /*{
                label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
                items: [
                    {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
                    {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
                    {label: 'Float Label', icon: 'pi pi-bookmark', routerLink: ['/uikit/floatlabel']},
                    {label: 'Invalid State', icon: 'pi pi-exclamation-circle', routerLink: ['/uikit/invalidstate']},
                    {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
                    {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
                    {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
                    {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
                    {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
                    {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
                    {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
                    {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu']},
                    {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
                    {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
                    {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
                    {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']}
                ]
            },
            {
                label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['utilities'],
                items: [
                    {label: 'Display', icon: 'pi pi-fw pi-desktop', routerLink: ['utilities/display']},
                    {label: 'Elevation', icon: 'pi pi-fw pi-external-link', routerLink: ['utilities/elevation']},
                    {label: 'FlexBox', icon: 'pi pi-fw pi-directions', routerLink: ['utilities/flexbox']},
                    {label: 'Icons', icon: 'pi pi-fw pi-search', routerLink: ['utilities/icons']},
                    {label: 'Text', icon: 'pi pi-fw pi-pencil', routerLink: ['utilities/text']},
                    {label: 'Widgets', icon: 'pi pi-fw pi-star-o', routerLink: ['utilities/widgets']},
                    {label: 'Grid System', icon: 'pi pi-fw pi-th-large', routerLink: ['utilities/grid']},
                    {label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', routerLink: ['utilities/spacing']},
                    {label: 'Typography', icon: 'pi pi-fw pi-align-center', routerLink: ['utilities/typography']}
                ]
            },*/
            {
                label: 'Programme', icon: 'pi pi-fw pi-copy', routerLink: ['/pages'],
                items: [
                    {label: 'Module', icon: 'pi pi-fw pi-pencil', routerLink: ['/view/myModule']},
                    {label: 'Filiere/Option/Module', icon: 'pi pi-fw pi-th-large', routerLink: ['/view/filiere']},
                    {label: 'Les inscriptions', icon: 'pi pi-fw pi-book',
                        items: [
                            {
                                label: 'Nouveau Etudiant',routerLink: ['/view/inscriptionNouveauEtudiant']
                            },
                            {
                                label: 'Ancien Etudiant',routerLink: ['/view/inscriptionAncienEtudiant']
                            },
                        ]

                    },
                    {label: 'Les coordonateurs', icon: 'pi pi-fw pi-sitemap',
                                items: [
                                    {
                                        label: 'Coordonateur module',routerLink: ['#']
                                    },
                                    {
                                        label: 'Coordonateur option',routerLink: ['#']
                                    },
                                ]
                            },
                    {label: 'Les ponderations', icon: 'pi pi-fw pi-percentage', routerLink: ['/view/ponderation']},
                    {label: 'Les PVs', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/view/note-etudiant-semestre']},
                    {label: 'Les PV Etudiant', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/view/etudiant']},
                    /*{label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud']},
                    {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
                    {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline']},
                    {label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
                    {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'], target: '_blank'},
                    {label: 'Error', icon: 'pi pi-fw pi-exclamation-triangle', routerLink: ['/error'], target: '_blank'},
                    {label: '404', icon: 'pi pi-fw pi-times', routerLink: ['/404'], target: '_blank'},
                    {label: 'Empty', icon: 'pi pi-fw pi-clone', routerLink: ['/pages/empty']},*/
                ]
            },
            {
                label: 'Les Notes', icon: 'pi pi-fw pi-file', routerLink: ['/pages'],
                items: [
                    {label: 'Notes Normale', icon: 'pi pi-fw pi-pencil', routerLink: ['/view/noteEtudiantModule']},
                    {label: 'Notes rattrapage', icon: 'pi pi-fw pi-pencil', routerLink: ['/view/noteEtudiantModuleRat']},
                    {label: 'Résultats', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
                    {label: 'testPDF', icon: 'pi pi-fw pi-times', routerLink: ['/view/testpdf']},

                ]
            },
            {
                label: 'Emploi du temps', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages'],

                items: [
                    {label: 'Emploi Etudiant', icon: 'pi pi-fw pi-users', routerLink: ['/pages/calendar']},
                    {label: 'Emploi Prof', icon: ' pi pi-fw pi-user', routerLink: ['/pages/calendar']},

                ]
            },

            {
                label: 'Les abscences', icon: 'pi pi-fw pi-check-square', routerLink: ['/pages'],
                items: [
                    {label: 'Liste Abscence', icon: 'pi pi-fw pi-calendar', routerLink: ['/view/absence']},
                    {label: 'Justifications', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
                    {label: 'Consultation Absences', icon: 'pi pi-fw pi-globe', routerLink: ['/view/consultation']},

                ]
            },
            /*{
                label: 'Les coordonateurs', icon: 'pi pi-fw pi-sitemap',
                items: [
                    {n
                        label: 'Coordonateurs', icon: 'pi pi-fw pi-sign-in',
                        items: [
                            {kd
                                label: 'Coordonateur module', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in' },
                                ]
                            },
                            {j
                                label: 'Coordonateur option', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in' },
                                ]
                            },
                        ]
                    }
                ]
            },*/
            {
                label: 'Fichiers', icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'Outils', icon: 'pi pi-fw pi-shopping-cart', url: ['https://www.primefaces.org/store']
                    },
                    {
                        label: 'Documents', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
                    }
                ]
            }
        ];
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
