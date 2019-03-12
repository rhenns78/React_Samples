import React from "react";
import { Accordion } from "devextreme-react";

class AccordionSections extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: props.defaultItem,
    };
  }

  handleselect = (selectedItem) => {
    this.setState({ selectedItem });
    document.getElementById(`${selectedItem.section}-href`).scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }

  render() {
    return (
      <div className="row zero" style={{ marginTop: 40 }}>
        <div className="col-3 offset-1">
          <div className="faq-index">
            {
              this.props.items.map((item) => (
                <h4
                  key={item.section}

                  className={`accordion-section ${item.section === this.state.selectedItem.section ? "selected" : ""}`}
                  onClickCapture={() => this.handleselect(item)}
                >
                  {item.section}<br />
                </h4>
              ))
            }
          </div>

        </div>

        <div className="col-8">
          {this.props.items.map((item, index) => (
            <React.Fragment key={`${item.section}acc`}>
              <span className="section-title" id={`${item.section}-href`}>{item.section}</span>
              <Accordion
                dataSource={item.faq}
                defaultSelectedIndex={index === 0 ? 0 : null}
                style={{ marginTop: 10, marginBottom: 15 }}
                collapsible
                itemTitleComponent={(data) => <div className="title-accordion">{data.title}</div>}
                itemComponent={(data) => <div>{data.body}</div>}
              />
            </React.Fragment>
          ))}
        </div>

      </div>
    );
  }
}

export default AccordionSections;
