import React, { useState } from 'react';
import { FloatButton, Modal } from 'antd';
import './MapNav.css'

const MapNav = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);   
  };

  return (
    <div className='map-nav'>
      <FloatButton className='map-nav' type="primary" shape="circle" size="large" onClick={showModal}>
        
      </FloatButton>
      <Modal
        title="Imagen"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img
          src="./2.png"
          alt="Imagen"
          style={{ width: '100%', height: '230px' }}
        />
      </Modal>
    </div>
  );
};

export default MapNav;
