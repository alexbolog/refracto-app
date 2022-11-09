import React from 'react';
const NotificationDropDownContent = () => {
  return (
    <>
      <div className='dropdown-menu dropdown-menu-end of-visible'>
        <div className='dropdown-header'>
          <h4 className='title mb-0'>Notification</h4>
          <a href='javascript:void(0);' className='d-none'>
            <i className='flaticon-381-settings-6'></i>
          </a>
        </div>
        <div
          id='DZ_W_Notification1'
          className='widget-media dlab-scroll p-3'
          style={{ height: '380px' }}
        >
          <ul className='timeline'>
            <li>
              <div className='timeline-panel'>
                <div className='media me-2'>
                  <img alt='image' width='50' src='images/avatar/1.jpg' />
                </div>
                <div className='media-body'>
                  <h6 className='mb-1'>Dr sultads Send you Photo</h6>
                  <small className='d-block'>29 July 2020 - 02:26 PM</small>
                </div>
              </div>
            </li>
            <li>
              <div className='timeline-panel'>
                <div className='media me-2 media-info'>KG</div>
                <div className='media-body'>
                  <h6 className='mb-1'>Resport created successfully</h6>
                  <small className='d-block'>29 July 2020 - 02:26 PM</small>
                </div>
              </div>
            </li>
            <li>
              <div className='timeline-panel'>
                <div className='media me-2 media-success'>
                  <i className='fa fa-home'></i>
                </div>
                <div className='media-body'>
                  <h6 className='mb-1'>Reminder : Treatment Time!</h6>
                  <small className='d-block'>29 July 2020 - 02:26 PM</small>
                </div>
              </div>
            </li>
            <li>
              <div className='timeline-panel'>
                <div className='media me-2'>
                  <img alt='image' width='50' src='images/avatar/1.jpg' />
                </div>
                <div className='media-body'>
                  <h6 className='mb-1'>Dr sultads Send you Photo</h6>
                  <small className='d-block'>29 July 2020 - 02:26 PM</small>
                </div>
              </div>
            </li>
            <li>
              <div className='timeline-panel'>
                <div className='media me-2 media-danger'>KG</div>
                <div className='media-body'>
                  <h6 className='mb-1'>Resport created successfully</h6>
                  <small className='d-block'>29 July 2020 - 02:26 PM</small>
                </div>
              </div>
            </li>
            <li>
              <div className='timeline-panel'>
                <div className='media me-2 media-primary'>
                  <i className='fa fa-home'></i>
                </div>
                <div className='media-body'>
                  <h6 className='mb-1'>Reminder : Treatment Time!</h6>
                  <small className='d-block'>29 July 2020 - 02:26 PM</small>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <a className='all-notification' href='javascript:void(0);'>
          See all notifications <i className='ti-arrow-end'></i>
        </a>
      </div>
    </>
  );
};

export default NotificationDropDownContent;
