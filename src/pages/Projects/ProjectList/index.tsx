import React from 'react';
import ProjectListItem from '../ProjectListItem';

const ProjectList = ({ projectInfo }: { projectInfo: any[] }) => {
  return (
    <>
      {projectInfo.map((pi, i) => (
        <ProjectListItem key={i} projectDetails={pi} />
      ))}
    </>
  );
};

export default ProjectList;
