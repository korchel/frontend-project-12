/* eslint-disable */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { selectors, setCurrentChannelId } from '../../slices/channelsSlice.js';

const Channel = ({channel, changeChannel, showModal}) => {
  return (
    <li className="nav-item w-100">
      {channel.removable 
        ? (
          <Dropdown key={channel.id} as={ButtonGroup} className="d-flex">
            <Button 
              type="button" 
              onClick={() => changeChannel(channel.id)} 
              variant="light" 
              className="text-start rounded-0 w-100"
            >
              {`# ${channel.name}`}
            </Button>
            <Dropdown.Toggle 
              className="flex-grow-0" 
              variant="light" 
              split 
            />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => showModal('remove', channel.id)}>Удалить</Dropdown.Item>
              <Dropdown.Item onClick={() => showModal('rename', channel.id)}>Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : (<Button 
            type="button" 
            variant="light" 
            key={channel.id} 
            className="rounded-0 text-start d-flex w-100" 
            onClick={() => changeChannel(channel.id)}
          >
            {`# ${channel.name}`}
          </Button>
        )
      }
    </li>
  )
}


const Channels = ({ showModal }) => {
  const channels = useSelector(selectors.selectAll);
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channelsReducer.currentChannelId);

  const changeChannel = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex h-100">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button 
          type="button"
          onClick={() => showModal('add')} 
          variant="group-vertical" 
          className="p-0 text-primary"
        >
          <PlusSquare size="20" />
        </Button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel 
            channel={channel} 
            changeChannel={changeChannel}
            showModal={showModal}
            key={channel.id}
          />
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
