import {Component, OnInit} from '@angular/core';
import {EventService} from '../.././demo/service/eventservice';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {Seance} from "../../controller/model/seance.model";
import {EmploiService} from "../../controller/service/emploi.service";
import {MyOption} from "../../controller/model/my-option.model";
import {AnneeUniversitaire} from "../../controller/model/anneeUniversitaire";
import * as moment from "moment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.scss']
})
export class EmploiComponent implements OnInit{
  get seances(): Array<Seance> {
    return this.emploiService.seances;
  }
  get myoptions(): Array<MyOption> {
    return this.emploiService.myoptions;
  }

  set myoptions(value: Array<MyOption>) {
    this.emploiService.myoptions = value;
  }
  set seances(value: Array<Seance>) {
    this.emploiService.seances = value;
  }
  get annees(): Array<AnneeUniversitaire> {
    return this.emploiService.annees;
  }

  set annees(value: Array<AnneeUniversitaire>) {
    this.emploiService.annees = value;
  }
  get anneeSel(): string {
    return this.emploiService.anneeSel;
  }

  set anneeSel(value: string) {
    this.emploiService.anneeSel = value;
  }

  get optSel(): string {
    return this.emploiService.optSel;
  }

  set optSel(value: string) {
    this.emploiService.optSel = value;
  }

  events = new Array();
  evenement:any;

  options: any;

  header: any;

  eventDialog: boolean;

  changedEvent: any;

  clickedEvent = null;
  input1: any;
  input2: any;
  myOptions: any;

  constructor(private router:Router,private emploiService:EmploiService) {}

  ngOnInit() {
    this.emploiService.findAllyears();
    this.emploiService.getAllOptions();
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
    }

    /*this.eventService.getEvents().then(events => {this.events = events; });
    this.changedEvent = {title: '', start: null, end: '', allDay: null};

    this.options = {
      plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
      defaultDate: '2017-02-01',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      eventClick: (e) => {
        this.eventDialog = true;

        this.clickedEvent = e.event;

        this.changedEvent.title = this.clickedEvent.title;
        this.changedEvent.start = this.clickedEvent.start;
        this.changedEvent.end = this.clickedEvent.end;
      }
    };*/
  }

  /*save() {
    this.eventDialog = false;

    this.clickedEvent.setProp('title', this.changedEvent.title);
    this.clickedEvent.setStart(this.changedEvent.start);
    this.clickedEvent.setEnd(this.changedEvent.end);
    this.clickedEvent.setAllDay(this.changedEvent.allDay);

    this.changedEvent = {title: '', start: null, end: '', allDay: null};
  }

  reset() {
    this.changedEvent.title = this.clickedEvent.title;
    this.changedEvent.start = this.clickedEvent.start;
    this.changedEvent.end = this.clickedEvent.end;
  }*/

  change1() {
this.anneeSel=this.input1;
  }

  change2() {
this.optSel=this.input2;
  }
  /*
  this.confirmationService.confirm({
            message: 'Voulez-vous vraiment supprimer les éléments sélectionnés ?',
            header: 'Attention',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteMultipleByCode().subscribe(data =>{
                    this.service.deleteMultipleIndexById();
                    this.selectes = null;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'la suppression est effectuée',
                        life: 3000
                    });
                });
            }
        });*/

  gotTo(viewEtudiant: string) {
    this.router.navigate([`${viewEtudiant}`]);
  }
  afficherSeance(input1: string, input2: string) {
    this.emploiService.afficherSeance(input1, input2).subscribe(
        data=>{
          this.seances=data;
          this.events=new Array();
          for(let i=0;i<this.seances.length;i++){
            console.log(this.seances);
            this.evenement={
              title:this.seances[i].libelle+' '+this.seances[i].heureDebut+' '+this.seances[i].heureFin,
              start:moment(this.seances[i].dateSeance).toDate(),
              end:moment(this.seances[i].dateSeance).toDate(),
              allDay: null
            }
            console.log(this.evenement);
            this.events.push(this.evenement);
            console.log();
          }
          console.log(this.events);
        },
            error => {
          alert('error');
        }
    );

  }

  /*changeEnents() {
    alert('hello');
    this.events=new Array();
    for(let i=0;i<this.seances.length;i++){
      console.log(this.seances);
      this.evenement={
        title:this.seances[i].libelle+' '+this.seances[i].heureDebut+' '+this.seances[i].heureFin,
        start:moment(this.seances[i].dateSeance).toDate(),
        end:moment(this.seances[i].dateSeance).toDate(),
        allDay: null
      }
      console.log(this.evenement);
      this.events.push(this.evenement);
      console.log();
    }
    console.log(this.events);

  }
  */
}
