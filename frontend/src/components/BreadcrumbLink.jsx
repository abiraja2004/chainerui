import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import TruncatedResultName from './TruncatedResultName';
import {
  displayProjectName,
  urlForPlot,
  urlForResultDetail
} from '../utils';


const BreadcrumbLink = (props) => {
  const { length, globalConfig, project, result } = props;
  const { isResultNameAlignRight } = globalConfig;
  const items = [(
    <BreadcrumbItem key="home">
      <IndexLink to="/">Home</IndexLink>
    </BreadcrumbItem>
  )];

  if (length >= 2) {
    items.push(
      <BreadcrumbItem key="plot">
        <Link to={urlForPlot(project.id)}>
          {displayProjectName(project)}
        </Link>
      </BreadcrumbItem>
    );
  }
  if (length >= 3) {
    items.push(
      <BreadcrumbItem key="resultDetail">
        <Link to={urlForResultDetail(project.id, result.id)} className="d-inline-block">
          <TruncatedResultName
            project={project}
            result={result}
            isResultNameAlignRight={isResultNameAlignRight}
          />
        </Link>
      </BreadcrumbItem>
    );
  }

  return (
    <Breadcrumb className="breadcrumb-link p-0">
      {items}
    </Breadcrumb>
  );
};

BreadcrumbLink.propTypes = {
  length: PropTypes.number.isRequired,
  globalConfig: PropTypes.shape({
    isResultNameAlignRight: PropTypes.bool
  }).isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  result: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pathName: PropTypes.string
  })
};

BreadcrumbLink.defaultProps = {
  project: {},
  result: {}
};

export default BreadcrumbLink;

