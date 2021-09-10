export interface Batch {
    file?: File;
    type?: string;
    uploadedOn?: Date;
    status?: string;
    currency?: string;
    credits?: number;
    total?: number;
}

export class CSVRecord {
    public cuenta: any;
    public cuentaFinal: any;
    public moneda: any;
    public descripcion: any;
    public deposito: any;
   }
