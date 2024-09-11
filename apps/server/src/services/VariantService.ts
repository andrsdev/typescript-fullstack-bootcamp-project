import { GenreService } from './GenreService';
import { Variant } from "@repo/schemas";

interface IVariantService {
    ListAll(): void;
    GetById(id: number): void;
    Add(request: Variant): void;
    Update(id: number, request: Variant): void;
    Delete(id: number): void;
}

export class VariantService implements IVariantService{
    ListAll(): void {
        throw new Error('Method not implemented.');
    }
    GetById(id: number): void {
        throw new Error('Method not implemented.');
    }
    Add(request: Variant): void {
        throw new Error('Method not implemented.');
    }
    Update(id: number, request: Variant): void {
        throw new Error('Method not implemented.');
    }
    Delete(id: number): void {
        throw new Error('Method not implemented.');
    }

}