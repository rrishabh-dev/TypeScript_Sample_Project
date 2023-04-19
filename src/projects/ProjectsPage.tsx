import { AnyAction } from 'redux';
import { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '../state';
import ProjectList from './ProjectList';
import { ProjectState } from './state/projectTypes';
import { loadProjects } from './state/projectActions';

const ProjectsPage = () => {
  const loading = useSelector(
    (appState: AppState) => appState.projectState.loading
  );
  const projects = useSelector(
    (appState: AppState) => appState.projectState.projects
  );
  const error = useSelector(
    (appState: AppState) => appState.projectState.error
  );
  const currentPage = useSelector(
    (appState: AppState) => appState.projectState.page
  );

  const dispatch = useDispatch<ThunkDispatch<ProjectState, any, AnyAction>>();

  const handleMoreClick = () => {
    dispatch(loadProjects(currentPage + 1));
  };

  useEffect(() => {
    dispatch(loadProjects(1));
  }, [dispatch]);

  return (
    <div>
      <h1>Projects</h1>
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      <ProjectList projects={projects} />
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
