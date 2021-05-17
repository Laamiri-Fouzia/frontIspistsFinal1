import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MyModule} from '../model/myModule.model';
import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MyModuleService {

    private url = environment.baseUrl + 'module/';
    private _items: Array<MyModule>;//une liste des objets myModule
    private _selected: MyModule;// l'objet myModule choisi
    private _selectes: Array<MyModule>;//la liste des objet myModule choisi

    private _createDialog: boolean;
    private _editDialog: boolean;
    private _viewDialog: boolean;
    private _submitted: boolean;


    // constructor(private messageService: MessageService,
    //             private confirmationService: ConfirmationService, private http: HttpClient) {
    // }
    constructor(private http: HttpClient) {
    }

    public findAll(): Observable<Array<MyModule>> {
        return this.http.get<Array<MyModule>>(this.url);
    }

    public save(): Observable<MyModule> {
        return this.http.post<MyModule>(this.url, this.selected);
    }

    public edit(): Observable<MyModule> {
        return this.http.put<MyModule>(this.url, this.selected);
    }

    public deleteByCode(): Observable<number> {
        return this.http.delete<number>(this.url + 'code/' + this.selected.code);
    }

    public deleteMultipleByCode(): Observable<number> {
        return this.http.post<number>(this.url + 'delete-multiple-by-code' , this.selectes);
    }

    public findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    public deleteIndexById(id: number) {
        this.items.splice(this.findIndexById(id), 1);
    }

    public deleteMultipleIndexById() {
        for (const item of this.selectes){
            this.deleteIndexById(item.id);
        }
    }

    get items(): Array<MyModule> {
        return this._items;
    }

    set items(value: Array<MyModule>) {
        this._items = value;
    }

    get selected(): MyModule {
        return this._selected;
    }

    set selected(value: MyModule) {
        this._selected = value;
    }

    get selectes(): Array<MyModule> {
        return this._selectes;
    }

    set selectes(value: Array<MyModule>) {
        this._selectes = value;
    }


    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }

    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get viewDialog(): boolean {
        return this._viewDialog;
    }

    set viewDialog(value: boolean) {
        this._viewDialog = value;
    }
}
