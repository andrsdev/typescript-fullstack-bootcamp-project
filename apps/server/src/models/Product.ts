export class Product {
    id: number = 0;
    name: string = '';
    description?: string = '';
    image?: string = '';
    private createdAt?: string = '';
    updatedAt?: string = '';

    constructor({ name, description, image }: { name: string, description?: string, image?: string }) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.createdAt = Date.now().toString();
        this.updatedAt = Date.now().toString();
    }


}