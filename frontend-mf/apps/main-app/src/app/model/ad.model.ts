export class Ad {
    id!: string;
    title!: string;
    description!: string;
    poster_id!: string;
    location!: string;
    category!: string;
    created_at!: string;
    updated_at!: string;

    constructor(id:string, title: string, description: string, poster_id: string, location: string, category: string, created_at: string, updated_at: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.poster_id = poster_id;
        this.location = location;
        this.category = category;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
  
  }