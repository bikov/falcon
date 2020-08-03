import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Loader, Table } from 'semantic-ui-react';

const getStatusIcon = (isExist) =>
    isExist === undefined ? <Icon color='blue' name='question'/> :
    (isExist ? <Icon color='green' name='check'/> : <Icon color='red' name='x'/>);

const PortsTable = ({portStatuses, loading}) => {
    return (
        <Table basic='very' celled collapsing>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Port</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {portStatuses.map((portStatus, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{portStatus.name}</Table.Cell>
                            <Table.Cell>{portStatus.number}</Table.Cell>
                            <Table.Cell>{loading ?  <Loader active inline/> : getStatusIcon(portStatus.isExist)}</Table.Cell>
                        </Table.Row>
                    ),
                )}
            </Table.Body>
        </Table>
    );
};

PortsTable.propTypes = {
    portStatuses: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        number: PropTypes.number,
        isExist: PropTypes.bool,
    })).isRequired,
    loading: PropTypes.bool,
};
PortsTable.defaultProps = {
    portStatuses: [{
        name: 'NOT FOUND',
        number: 69,
    }],
    loading: false,
};

export default PortsTable;
