import React, { useState } from 'react';
import { QandAStructure } from './QandAStructure';
import { QuestionAndAnswer } from 'types/projectTypes';
import { formatRelativeDate } from 'utils';
import { fromIso } from 'utils';

export const ReviewBox = ({
  review,
  onAddReview
}: {
  review: QandAStructure;
  onAddReview: (id: string, targetUser: string) => void;
}) => {
  const getUsername = (review: QandAStructure | QuestionAndAnswer) => {
    return review.ownerFirstName || review.ownerLastName
      ? `${review.ownerFirstName} ${review.ownerLastName}`
      : review.ownerAddress;
  };
  const [username] = useState(getUsername(review) ?? 'N/A');
  return (
    <div
      className={`main-review-box ${
        review.isPendingModeration && 'pending-moderation'
      }`}
    >
      <img src={review.ownerImgSrc ?? 'user.jpg'} className='rounded-circle' />
      <div className='username'>{username}</div>
      <div className='timestamp'>
        {formatRelativeDate(fromIso(review.insertDate))}
      </div>
      <div className='question'>{review.text}</div>
      <div
        className='question-link'
        role='button'
        onClick={() => onAddReview(review.id, username)}
      >
        Reply
      </div>
      {review.children.length > 0 && (
        <div className='child'>
          {review.children.map((childReview: QuestionAndAnswer, idx) => (
            <div
              className={`main-review-box ${
                childReview.isPendingModeration && 'pending-moderation'
              }`}
              key={`review-box-children-${review.id}-${idx}-${childReview.id}`}
            >
              <img
                src={review.ownerImgSrc ?? 'user.jpg'}
                className='rounded-circle'
              />
              <div className='username'>{getUsername(childReview)}</div>
              <div className='timestamp'>
                {formatRelativeDate(fromIso(childReview.insertDate))}
              </div>
              <div className='question'>{childReview.text}</div>
              {childReview.isPendingModeration && (
                <div className='question text-primary mt-3'>
                  This message is pending moderation.
                  <br />
                  While this process is ongoing, you are the only one to see
                  this.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
