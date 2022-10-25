import { Alert, DataTable } from '@edx/paragon';
import PropTypes from 'prop-types';
import React from 'react';

const BulkEmailTaskManagerTable = (props) => {
  const {
    errorRetrievingData,
    tableData,
    tableDescription,
    alertWarningMessage,
    alertErrorMessage,
    columns,
    additionalColumns,
  } = props;

  /**
   * Sub-render function that creates an Alert component with a specific type and message for display to a user.
   */
  const renderAlert = (alertType, alertMessage) => (
    <div className="pt-1">
      <Alert variant={`${alertType}`}>
        <p className="font-weight-bold">
          {`${alertMessage}`}
        </p>
      </Alert>
    </div>
  );

  /**
   * Responsible for rendering the tables used by the BulkEmailContentHistory, BulkEmailTaskManager, and
   * BulkEmailTaskHistory components. Conditionally renders a table description as well.
   */
  const renderTable = () => (
    <div className="pb-3">
      {tableDescription && (
        <p className="font-italic">
          {tableDescription}
        </p>
      )}
      <DataTable
        itemCount={tableData.length}
        columns={columns}
        data={tableData}
        additionalColumns={additionalColumns}
      />
    </div>
  );

  /**
   * Sub-render function that determines if we can render the DataTable. If not, we will render an Alert component to
   * inform the user why the data/table cannot be displayed.
   */
  const canRenderTable = () => {
    if (errorRetrievingData) {
      return renderAlert('danger', alertErrorMessage);
    }

    if (!tableData.length) {
      return renderAlert('warning', alertWarningMessage);
    }

    return renderTable();
  };

  return (
    <div>
      {canRenderTable()}
    </div>
  );
};

BulkEmailTaskManagerTable.propTypes = {
  errorRetrievingData: PropTypes.bool.isRequired,
  tableData: PropTypes.arrayOf(PropTypes.shape({})),
  tableDescription: PropTypes.string,
  alertWarningMessage: PropTypes.string.isRequired,
  alertErrorMessage: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  additionalColumns: PropTypes.arrayOf(PropTypes.shape({})),
};

BulkEmailTaskManagerTable.defaultProps = {
  tableData: [],
  tableDescription: '',
  additionalColumns: [],
};

export default BulkEmailTaskManagerTable;
