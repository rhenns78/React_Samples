import React from "react";
import { Button, TextBox, TagBox } from "devextreme-react";
import TableFilterSelect from "./tableFilterSelect";
import RangeFilter from "./rangeFilter";
import { IColumnsItems, filterType, FilterItemsType } from "../../helpers/filterHelper";
import NumberRangeFilter from "./numberRangeFilter";

interface Props {
  placeholder: string;
  onChange: (value: string, filtros: FilterItemsType) => void;
  filters: IColumnsItems;
  showButton?: boolean;
  show?: boolean,
  buttonAction?: () => void;
  buttonText?: string;
}

interface State {
  showFilters: boolean;
  focus: boolean;
  selectedFilters: FilterItemsType;
  textSearch: string;
}

class TableFilter extends React.PureComponent<Props, State> {
  private timeout: any;
  constructor(props: any) {
    super(props);

    this.timeout = 0;

    this.state = {
      showFilters: false,
      focus: false,
      selectedFilters: [],
      textSearch: '',
    };

  }

  showHideFilters = () => {
    const show = !this.state.showFilters;
    this.setState({ showFilters: show, selectedFilters: [] });
    if (!show) {
      this.doFilter();
    }
  }

  handleTextChange = (e: any) => {
    this.setState({ textSearch: e.value });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.doFilter();
    }, 300);
  }

  doFilter = () => {
    this.props.onChange(this.state.textSearch, this.state.selectedFilters);
  }

  handleFiltersChange = (filter: FilterItemsType) => {
    let newFilter = [...this.state.selectedFilters];
    newFilter = newFilter.filter((f) => f.column !== filter[0].column);
    filter.forEach((f) => {
      if (f.value) {
        newFilter.push(f);
      }
    });

    this.setState({ selectedFilters: newFilter });
    this.doFilter();
  }

  handleTagChange = (e: any) => {
    this.setState({ selectedFilters: e.value });
    this.doFilter();
  }

  render() {
    const {
      show,
      placeholder,
    } = this.props;

    const {
      showFilters,
      focus,
    } = this.state;

    if (!show) return null;

    return (
      <div className={`headaer-filter-wrapper ${showFilters ? "show" : "hide"}`}>
        <div className="header-filter-text-wrapper">
          <TextBox
            height={35}
            className={`header-filter-textbox ${showFilters ? "show" : "_"} ${focus ? "dx-state-focused" : "-"}`}
            mode="search"
            onFocusIn={() => {
              this.setState({ focus: true });
            }}
            onFocusOut={() => {
              this.setState({ focus: false });
            }}
            placeholder={placeholder}
            onValueChanged={this.handleTextChange}
            valueChangeEvent="keyup"
          />

          <TagBox
            className={`header-filter-tagbox ${focus ? "dx-state-focused" : "-"}`}
            onInitialized={(e) => {
              e!.component!.option("openOnFieldClick", false);
            }}
            searchEnabled={false}
            multiline
            showClearButton
            displayExpr="value.text"
            items={this.state.selectedFilters}
            onValueChanged={this.handleTagChange}
            value={this.state.selectedFilters}
            onFocusIn={() => {
              this.setState({ focus: true });
            }}
            onFocusOut={() => {
              this.setState({ focus: false });
            }}
            placeholder="Filtros"
          />

          <div className="filters-wrapper">
            {this.props.filters && this.props.filters.map((filtro) => {
              if (filtro.type === filterType.date) {
                return (
                  <RangeFilter
                    key={filtro.column}
                    filterText={filtro.name}
                    column={filtro.column}
                    onFilter={this.handleFiltersChange}
                    selectedValues={this.state.selectedFilters.filter((f) => f.column === filtro.column)}
                  />
                );
              }
              if (filtro.type === filterType.number) {
                return (
                  <NumberRangeFilter
                    key={filtro.column}
                    filterText={filtro.name}
                    column={filtro.column}
                    onFilter={this.handleFiltersChange}
                    selectedValues={this.state.selectedFilters.filter((f) => f.column === filtro.column)}
                  />
                )
              }
              return (<TableFilterSelect
                key={filtro.column}
                filterText={filtro.name}
                column={filtro.column}
                values={filtro.values}
                selectedValues={this.state.selectedFilters.filter((f) => f.column === filtro.column)}
                onFilter={this.handleFiltersChange}
              />);
            })
            }

          </div>
        </div>

        <Button
          height={35}
          icon="filter"
          className={`header-filter-button-filter ${this.state.showFilters ? "active" : "-"}`}
          onClick={this.showHideFilters}
        />

        <Button
          height={35}
        >
          <i className="material-icons" style={{ marginTop: -3 }}>description</i>
        </Button>

        <Button
          height={35}
        >
          <i className="material-icons" style={{ marginTop: -1 }}>get_app</i>
        </Button>
       

        {this.props.showButton && (
          <Button
            height={35}
            text={this.props.buttonText}
            onClick={this.props.buttonAction}
            type="default"
          />
        )
        }
      </div>
    );
  }
}

export default TableFilter;
