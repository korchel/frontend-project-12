/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Button, ListGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { selectors } from '../../slices/channelsSlice.js';

const Channels = () => {
  const channels = useSelector(selectors.selectAll);

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button variant="outline-primary" className="border-0 p-0">
          <PlusSquare width="20" height="20" fill="currentColor" />
        </Button>
      </div>
      <ListGroup id="channels-box" variant="flush">
        {channels.map((channel) => (
          <Button variant="light" key={channel.id} className="rounded-0">
            {`# ${channel.name}`}
          </Button>
        ))}
      </ListGroup>
    </Col>
  );
};

export default Channels;
