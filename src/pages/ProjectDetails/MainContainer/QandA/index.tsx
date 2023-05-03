import React from 'react';
import { FullProjectPageDetails } from 'types/projectTypes';
import { MobileCollapsibleSection } from '../MobileCollapsibleSection';
import './style.css';

export const QandA = ({ project }: { project: FullProjectPageDetails }) => {
  const qandaFirst = project.questionsAndAnswers.filter((q) => q.id === '1')[0];
  return (
    <MobileCollapsibleSection
      header='Q&A'
      body={
        <>
          <div className='main-review-box'>
            <img src='user.jpg' className='rounded-circle' />
            <div className='username'>Leona Pop</div>
            <div className='timestamp'>4 days ago</div>
            <div className='question'>
              I would like to know the deadline of the project. Can anyone
              provide this info? Thank you!
            </div>
            <div className='question-link' role='button'>
              Reply
            </div>
          </div>
          <div className='main-review-box'>
            <img src='user.jpg' className='rounded-circle' />
            <div className='username'>Leona Pop</div>
            <div className='timestamp'>4 days ago</div>
            <div className='question'>
              Also I’m interested about the Refracto Rating.
            </div>
            {/* <div className='question-link' role='button'>
              Reply
            </div> */}
            <div className='child'>
              <div className='main-review-box'>
                <img src='user.jpg' className='rounded-circle' />
                <div className='username'>Marius Enache</div>
                <div className='timestamp'>4 days ago</div>
                <div className='question'>
                  I would like to know the deadline of the project. Can anyone
                  provide this info? Thank you!
                </div>
                {/* <div className='question-link' role='button'>
                  Reply
                </div> */}
              </div>
              <div className='main-review-box'>
                <img src='user.jpg' className='rounded-circle' />
                <div className='username'>Marius Enache</div>
                <div className='timestamp'>4 days ago</div>
                <div className='question'>
                  I would like to know the deadline of the project. Can anyone
                  provide this info? Thank you!
                </div>
                <div className='question-link' role='button'>
                  Reply
                </div>
              </div>
            </div>
          </div>
          <div className='basic-form'>
            <div>Replying to @Leona Pop</div>
            <form>
              <div className='mb-3'>
                <textarea
                  className='form-control'
                  rows={6}
                  id='comment'
                ></textarea>
              </div>
            </form>
          </div>
          <div>
            <div className='btn btn-primary w-50' style={{ marginLeft: '50%' }}>
              Reply
            </div>
          </div>
        </>
      }
    />
  );
};
