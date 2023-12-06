import React, { useEffect, useState } from 'react';
import { FullProjectPageDetails, QuestionAndAnswer } from 'types/projectTypes';
import { MobileCollapsibleSection } from '../MobileCollapsibleSection';
import './style.css';
import { QandAStructure } from './QandAStructure';
import { ReviewBox } from './ReviewBox';

export const QandA = ({ project }: { project: FullProjectPageDetails }) => {
  const [selectedMessageId, setSelectedMessageId] = useState<string>();
  const [replyTargetUser, setReplyTargetUser] = useState<string>();
  const [shouldShowInputBox, setShouldShowInputBox] = useState(false);

  const parseQandAs = (data: QuestionAndAnswer[]): QandAStructure[] => {
    const parsed = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].parentId !== undefined) {
        // only pick parents
        continue;
      }

      const children = data.filter((d) => d.parentId === data[i].id);
      const newObj = data[i] as QandAStructure;
      newObj.children = children;
      parsed.push(newObj);
    }
    return parsed;
  };
  useEffect(() => {
    setQandAs(parseQandAs(project.questionsAndAnswers));
  }, [project, project.questionsAndAnswers]);

  const [qandas, setQandAs] = useState<QandAStructure[]>();

  const handleOnAddReview = (id: string, targetUser: string) => {
    setSelectedMessageId(id);
    setReplyTargetUser(targetUser);
    setShouldShowInputBox(true);
  };

  const handleToggleAskAQuestion = () => {
    setSelectedMessageId(undefined);
    setReplyTargetUser(undefined);
    setShouldShowInputBox(!shouldShowInputBox);
  };

  return (
    <MobileCollapsibleSection
      header='Q&A'
      body={
        <>
          {qandas &&
            qandas.length > 0 &&
            qandas.map((review, idx) => (
              <ReviewBox
                key={`review-box-${idx}-${review.id}`}
                review={review}
                onAddReview={handleOnAddReview}
              />
            ))}
          <div className='basic-form'>
            {replyTargetUser !== undefined && replyTargetUser !== '' && (
              <div>Replying to @{replyTargetUser}</div>
            )}
            {shouldShowInputBox && (
              <form>
                <div className='mb-3'>
                  <textarea
                    className='form-control'
                    rows={6}
                    id='comment'
                  ></textarea>
                </div>
              </form>
            )}
            {(selectedMessageId === undefined || selectedMessageId === '') &&
              !shouldShowInputBox && (
                <div className='w-100 d-flex justify-content-center mt-5'>
                  <div
                    className='btn btn-primary w-50 mt-5'
                    onClick={handleToggleAskAQuestion}
                  >
                    Ask a Question
                  </div>
                </div>
              )}
            {shouldShowInputBox && (
              <div className='d-flex justify-content-end align-items-center'>
                <div
                  className='btn btn-secondary mr-3'
                  onClick={handleToggleAskAQuestion}
                >
                  Cancel
                </div>
                <div className='btn btn-primary'>Submit</div>
              </div>
            )}
          </div>
        </>
      }
    />
  );
};
