export interface SortBy {
    type: number;
    columnName: string;
}

export interface PagingBy {
    take: number;
    skip: number;
}

export interface FilterBy {
    columnName: string;
    typeString: string;
    value: string;
    isAndWithNextFilter: boolean;
    startsParentheses: boolean;
    endParentheses: boolean;
}
export enum OrderType {
    Ascending = 0,
    Descending = 1
}

export enum FilterType {
    Contains = "%%",
    NotContains = "!%%",
    Equal = "==",
    NotEqual = "!=",
    StartsWith = "%=",
    EndWith = "=%",
    LessThan = "<",
    LessEqualThan = "<=",
    GreaterThan = ">",
    GreaterEqualThan = ">="
}

export interface BaseFilterModel {
    sortBy: SortBy[];
    pagingBy: PagingBy;
    filterBy: FilterBy[];
}

export class GenericBaseFilterModel<T> {
    sortBy: SortBy[];
    pagingBy: PagingBy;
    filterBy: FilterBy[];

    setPaging(take: number, skip: number): GenericBaseFilterModel<T> {
        this.pagingBy = { take: take, skip: skip }
        return this;
    }

    addSort(predicate: (column: T) => unknown, type: OrderType): GenericBaseFilterModel<T> {
        let match = predicate.toString().match(/\(?([\w\d]*)\)?\s*=>\s*\1.(.*)/);
        if (match?.length == 3) {
            this.getSortBy().push({ columnName: match[2], type: type })
        }
        else {
            console.warn("Predicate format is invalid.")
        }
        return this;
    }

    addFilter(predicate: (column: T) => unknown, value: any, type: FilterType, isAndWithNextFilter: boolean = false, startsParentheses: boolean = false, endParentheses: boolean = false): GenericBaseFilterModel<T> {
        let match = predicate.toString().match(/\(?([\w\d]*)\)?\s*=>\s*\1.(.*)/);
        if (match?.length == 3) {
            this.getFilterBy().push({
                columnName: match[2],
                value: value,
                isAndWithNextFilter: isAndWithNextFilter,
                typeString: type,
                startsParentheses: startsParentheses,
                endParentheses: endParentheses
            });
        }
        else {
            console.warn("Predicate format is invalid.")
        }
        return this;
    }

    toBaseFilterModel(): BaseFilterModel {
        return { sortBy: this.sortBy, filterBy: this.filterBy, pagingBy: this.pagingBy }
    }

    private getSortBy(): Array<SortBy> {
        if (this.sortBy)
            return this.sortBy;
        this.sortBy = new Array<SortBy>();
        return this.sortBy;
    }

    private getFilterBy(): Array<FilterBy> {
        if (this.filterBy)
            return this.filterBy;
        this.filterBy = new Array<FilterBy>();
        return this.filterBy;
    }
}
