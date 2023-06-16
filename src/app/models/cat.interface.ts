export interface Cat {
    id: string;
    url: string;
}

export interface CatStateModel {
    cats: Cat[];
    isLoading: boolean;
}