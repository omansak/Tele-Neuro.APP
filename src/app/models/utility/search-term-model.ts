export class SearchTermModel {
    SearchTerm: string | undefined;
    constructor(searchTerm?: string | undefined) {
        this.SearchTerm = searchTerm;
    }
}