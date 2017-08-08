import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';


class ExperimentsTable extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleToggleResult = this.handleToggleResult.bind(this);
  }

  handleToggleResult(resultId, isToggleed) {
    this.props.onToggleResult(resultId, isToggleed);
  }

  render() {
    const { experiments, selectedResultIds } = this.props;
    let selectedResultIdsSet = {};
    selectedResultIds.forEach((resultId) => { selectedResultIdsSet[resultId] = true; });

    let resultRows = experiments.map((experiment, i) => {
      if (experiment.results.length === 0) {
        // experiment with no results
        const key = 'result-row-' + experiment.id;
        return (<ResultRow xpName={experiment.name} key={key} />);
      }
      return experiment.results.map((result, i) => {
        const key = 'result-row-' + experiment.id + '-' + result.id;
        return (
          <ResultRow
            xpName={experiment.name}
            result={result}
            selected={selectedResultIdsSet[result.id]}
            onToggle={this.handleToggleResult}
            key={key}
          />
        );
      });
    });
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th></th>
            <th>experiment name</th>
            <th>result name</th>
            <th>timestamp</th>
            <th>args</th>
            <th>epoch</th>
            <th>iteration</th>
            <th>elapsed_time</th>
          </tr>
        </thead>
        <tbody>
          { resultRows }
        </tbody>
      </table>
    );
  }

}

ExperimentsTable.propTypes = {
  experiments: PropTypes.array.isRequired,
  selectedResultIds: PropTypes.array,
  onToggleResult: PropTypes.func,
};
ExperimentsTable.defaultProps = {
  selectedResultIds: [],
  onToggleResult: () => {},
}

export default ExperimentsTable;

