import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const ProjectDetails = (props) => {
    const { auth } = props;
    if (!auth.uid) {
        return <Redirect to="/signin" />;
    }
    const { project } = props;
    if (project) {
        return(
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title"> { project.title } </span>
                        <p>{ project.content }</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted By { project.authorFirstName } { project.authorLastName }</div>
                        <div>{moment(project.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
        )
    } else{
        return (
            <div className="container center">
                <p>Loading Project...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    return {
         project: state.firestore.data.projects && state.firestore.data.projects[id]
         // Not state.firestore.ordered as a single project document will be fetched so technically there is no order needed.
         // If you still want state.firestore.ordered, you can try the following:        
         // project: state.firestore.ordered.project[0]
         // But be aware that ordered will have just one document so you will need extra [0] 
    }
}

export default compose(
    connect(mapStateToProps),
    /*firestoreConnect([
        { collection: 'projects' }
    ])*/ //This fetchs all of the projects from firebase, which is a bit overkill
    firestoreConnect(props => [
        { collection : "projects", doc: props.match.params.id }
    ]) //This fetches only the project needed
)(ProjectDetails)

/*const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
      project: project
    }
}
  
export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'projects'
    }])
)(ProjectDetails)*/