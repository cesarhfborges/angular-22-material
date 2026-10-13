import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export type IStatus = 'Pendente' | 'Audiência' | 'Julgamento' | 'Encerrado' | 'Arquivado';
export type ITipo = 'civel' | 'criminal';

export interface IProcesso {
  advogadoReclamado: string;
  advogadoReclamante: string;
  dataAjuizamento: Date;
  descricao: string;
  id: number;
  numeroProcesso: string;
  reclamado: string;
  reclamante: string;
  status: IStatus;
  tipoAcao: ITipo;
  valorCausa: number;
}

export interface Paginado<T> {
  data: T[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface FiltroPaginacao {
  page?: number;
  perPage?: number;
}

@Service()
export class ProcessosService {
  private readonly _token = 'IAa3AzLflO4ogK4WAevhXHPJstf8cIkwGfpVL3c7DBROwJrPqJlqGwIEXQhc';
  private readonly baseUrl = 'https://canarinho-api.chfb.com.br/api/mock/admin/trt';

  private readonly _http = inject(HttpClient);

  //   async getLista(): Promise<any> {
  //     const req = this._http.get('https://canarinho-api.chfb.com.br/api/mock/admin/trt/processos?page=1&per_page=10');
  //     return lastValueFrom(req);
  //   }

  listarProcessos({ page = 1, perPage = 10 }: FiltroPaginacao = {}): Promise<Paginado<IProcesso>> {
    const params = new HttpParams().set('page', page).set('per_page', perPage);

    // return this._http.get<Paginado<Processo>>(`${this.baseUrl}/processos`, { params }).pipe(
    //   catchError((err) => {
    //     console.error('Erro ao listar processos', err);
    //     return throwError(() => err);
    //   }),
    // );
    return lastValueFrom(this._http.get<Paginado<IProcesso>>(`${this.baseUrl}/processos`, { params }));
  }
}
