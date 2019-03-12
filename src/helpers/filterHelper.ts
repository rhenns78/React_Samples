import Moment from "moment";

export enum filterType {
  search = "textSearch",
  date = "date",
  number = "number",
}

export interface FilterType {
  column: string;
  type?: string;
  value?: IValues;
};
export interface FilterItemsType extends Array<FilterType> { };

export interface IValues {
  text: string;
  value: any;
}
export interface IValuesItems extends Array<IValues> { };

export interface IColumns {
  column: string;
  name: string;
  customValues?: IValuesItems;
  type?: string;
  values?: IValuesItems;
};
export interface IColumnsItems extends Array<IColumns> { };

export interface IData {
  [key: string]: any;
}

interface IFilter {
  column: string;
  value: IValues;
  type?: string;
};
interface IFilterItems extends Array<IFilter> { };

interface IFilterGroup {
  column: string;
  values: IValuesItems;
  type?: string;
}
interface IFilterGroupItems extends Array<IFilterGroup> { };


export const getFiltros = (columnsTofilter: IColumnsItems, data: Array<IData>) => {
  let filtros = [...columnsTofilter];
  if (data) {
    data.forEach((row) => {
      filtros = filtros.map((filterItem) => {
        const filtro = { ...filterItem };
        if (filtro.type) return filtro;
        if (filtro.values == null) filtro.values = [];

        const valueNotInFilter = filtro.values.findIndex(item => item.value === row[filtro.column]) === -1;
        if (valueNotInFilter) {
          if (filtro.customValues) {
            filtro.values = filtro.customValues;
          } else {
            const value = row[filtro.column];
            let text = row[filtro.column];
            if (value === true) text = "Si";
            if (value === false) text = "No";
            if (value == null) text = "N/D";
            filtro.values.push({ text, value });
          }
        }

        return filtro;
      });
    });
  }
  return filtros;
}

const groupFilters = (filters: IFilterItems): IFilterGroupItems => {
  let groupedFilter: IFilterGroupItems = [];
  filters.forEach((item => {
    let filterGroup = filters.filter(f => f.column === item.column);
    if (groupedFilter.findIndex(gf => gf.column === item.column) === -1) {
      groupedFilter.push({ type: item.type, column: item.column, values: filterGroup.map(item => item.value) });
    }
  }));

  return groupedFilter;
}

export const filterData = (data: Array<IData>, filter: any[]) => {
  let newData = [...data];
  let customFilters: IFilterItems = filter;
  if (filter[1] === "and") {
    customFilters = [...filter[2]];
  }

  const filterGroup = groupFilters(customFilters);
  const filterSelect = filterGroup.filter(f => f.type !== filterType.search);
  const filterSeach = filterGroup.filter(f => f.type === filterType.search);


  newData = newData.filter(row =>
    filterSelect.every(filterItem => {
      if (!filterItem.values.length) {
        return true;
      }

      if (filterItem.type === filterType.number) {
        return filterItem.values.some(f => row[filterItem.column] >= f.value.from && row[filterItem.column] <= f.value.to);
      }

      if (filterItem.type === filterType.date) {
        const rowDate = Moment(row[filterItem.column]);
        return filterItem.values.some(f => rowDate.isSameOrAfter(f.value.from) && rowDate.isSameOrBefore(f.value.to));
      }

      return filterItem.values.some(f => f.value === row[filterItem.column])

    })
  );

  if (filterSeach.length) {
    newData = newData.filter(row =>
      filterSeach.some(filter => {
        return filter.values.some(f => row[filter.column].indexOf(f.value) !== -1);
      })
    )
  }

  return newData;
}