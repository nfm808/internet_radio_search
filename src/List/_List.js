import React from 'react';
import ReactTable from "react-table";
import selectTableHOC from "react-table/lib/hoc/selectTable";
import foldableTable from 'react-table/lib/hoc/foldableTable';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './List.css';

// ***********************************************************
    // TO BE ARCHIVED AND THEN DELETED - ITS A RELIC
***********************************************************

// imports the injected HOC select table
const SelectTable = selectTableHOC(foldableTable(ReactTable));

// sets the column headers on the table
// and the sorting functions
const columns = [
  {
    id: 'homepage',
    Header: "Homepage",
    foldable: true,
    folded: true,
    accessor: props => <a href={props.homepage} target="_blank" rel="noopener noreferrer">{props.name}</a>
  },
  {
    id: 'url',
    Header: "Listen",
    foldable: true,
    folded: true,
    accessor: props => <button value={props.url} type='button' aria-label='play station'>Play Station</button>
  },
  {
    Header: "Country",
    accessor: 'country',
    foldable: true,
    folded: true,
    sortMethod: (a, b) => {
      if (!a && !b) {
        return -1
      }
      if (a.length === b.length) {
        return a > b ? 1 : -1;
      }
      return a.length < b.length ? 1 : -1;
    }
  },
  {
    Header: "Language",
    accessor: 'language',
    foldable: true,
    folded: true,
    sortMethod: (a, b) => {
      if (!a && !b) {
        return -1
      }
      if (a.length === b.length) {
        return a > b ? 1 : -1;
      }
      return a.length < b.length ? 1 : -1;
    }
  },
  {
    Header: "Quality",
    accessor: 'votes',
    foldable: true,
    folded: true,
    sortMethod: (a, b) => {
      return parseInt(a) < parseInt(b) ? 1 : -1
    }
  }
]

class List extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      // if all rows are selected
      selectAll: false,
      // array of selected rows in table
      selection: [],
      // the active station to be played
      // in the player
      activeStation: '',
      folded: true
    };
  }
  
  // starts the audio player
  playTrack = (url) => {
    this.setState({
      activeStation: url
    })
  }

  /**
   * Toggle a single checkbox for select table
   */
  toggleSelection = (key, shift, row) => {
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);

    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  /**
   * Toggle all checkboxes for select table
   */
  toggleAll = () => {
    const { keyField } = this.props;
    const selectAll = !this.state.selectAll;
    const selection = [];

    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(`select-${item._original[keyField]}`);
      });
    }
    this.setState({ selectAll, selection });
  };

  /**
   * Whether or not a row is selected for select table
   */
  isSelected = key => {
    return this.state.selection.includes(`select-${key}`);
  };

  rowFn = (state, rowInfo, column, instance) => {
    const { selection } = this.state;
  

    return {
      onClick: (e, handleOriginal) => {
        console.log(state)
        console.log(column)
        if (column.original_Header === 'Listen') {
          return this.playTrack(rowInfo.original.url);
        } else 
        // IMPORTANT! React-Table uses onClick internally to trigger
        // events like expanding SubComponents and pivots.
        // By default a custom 'onClick' handler will override this functionality.
        // If you want to fire the original onClick handler, call the
        // 'handleOriginal' function.
        if (handleOriginal) {
          handleOriginal();
        }
      },
      style: {
        background:
          rowInfo &&
          selection.includes(`select-${rowInfo.original.stationuuid}`) &&
          "lightgreen"
      }
    };
  };


  addDefaultSrc = (ev) => {
    console.log(ev.src) 
  }

  render() {
    const fallBackImg = '../assets/broken_default.jpg'
    return (
      <section className="List">
        <SelectTable
          {...this.props}
          ref={r => (this.checkboxTable = r)}
          toggleSelection={this.toggleSelection}
          // selectAll={this.state.selection}
          selectType="checkbox"
          // toggleAll={this.toggleAll}
          isSelected={this.isSelected}
          getTdProps={this.rowFn}
          data={this.props.data}
          columns={columns}
          keyField="stationuuid"
        />
        <AudioPlayer 
          url={this.state.activeStation}
        />
        <ul className="List--list-container">
          {this.props.data && this.props.data.map(station => 
            <li 
              key={station.stationuuid} 
              className={(this.state.expandedStation !== station.stationuuid) ? "List--list-item" : "List--list-item expand"}
              onClick={() => this.expandStation(station.stationuuid)}
            >
              <div className={(this.state.expandedStation !== station.stationuuid) ? "List--list-item-favicon-container" : "List--list-item-favicon-container favicon-shrink"}>
                <img className="List--list-item-favicon" src={station.favicon} 
                  onError={(e)=>{e.target.onerror = null; e.target.src=fallBackImg}}
                />
              </div>
              <p className={(this.state.expandedStation !== station.stationuuid) ? 'hidden' : ''}>{station.name}</p>
            </li>
          )}
        </ul>
        
      </section>
    );
  }
}

export default List;