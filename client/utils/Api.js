import superagent from 'superagent';

export const getProjectList = () => {
    return superagent.get('/project_list/list')
}

export const setProjectVersion = (name, version) => {
    return superagent
            .post('/project_list/set_version')
            .send({
                name: name,
                version: version
            })
}

export default {
    getProjectList: getProjectList,
    setProjectVersion: setProjectVersion
}
